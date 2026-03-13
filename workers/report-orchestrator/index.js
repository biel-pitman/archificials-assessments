/**
 * Report Orchestrator Worker v4.2.0
 *
 * Runs the full report generation pipeline synchronously in the handler.
 * Uses Claude streaming API to avoid Cloudflare's 120s subrequest proxy timeout.
 * Runs deployment scenarios + meeting brief in parallel to stay under ~300s wall-clock limit.
 *
 * Pipeline: Airtable → Brave Search → Claude (market analysis) → Claude x2 parallel (scenarios + brief) → Assemble → R2 → Email
 * Total time: ~250s (130s market + 120s parallel + 10s assembly/email)
 */

// Helper: Validate HMAC token
async function validateToken(id, token, timestamp, secret) {
  try {
    const message = `${id}:${timestamp}`;
    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    );
    const signature = new Uint8Array(
      token.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
    );
    const valid = await crypto.subtle.verify(
      'HMAC', key, signature, new TextEncoder().encode(message)
    );
    return valid && (Date.now() - parseInt(timestamp)) < 7 * 24 * 60 * 60 * 1000;
  } catch (e) {
    console.error('Token validation error:', e);
    return false;
  }
}

// Helper: Run Brave Search query
async function braveSearch(query, apiKey) {
  try {
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=10`;
    const res = await fetch(url, { headers: { 'X-Subscription-Token': apiKey } });
    if (!res.ok) { console.error(`Brave API error: ${res.status}`); return []; }
    const data = await res.json();
    return data.web?.results?.map(r => ({
      title: r.title, url: r.url, description: r.description, age: r.age
    })) || [];
  } catch (e) { console.error('Brave search error:', e); return []; }
}

// Helper: Fetch assessment record from Airtable
async function fetchAssessmentRecord(baseId, tableName, recordId, apiKey) {
  try {
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}/${recordId}`;
    const res = await fetch(url, { headers: { 'Authorization': `Bearer ${apiKey}` } });
    if (!res.ok) {
      console.error(`Airtable fetch error: ${res.status} - ${await res.text()}`);
      return null;
    }
    return (await res.json()).fields || null;
  } catch (e) { console.error('Airtable fetch error:', e); return null; }
}

// Helper: Call Claude API using STREAMING to avoid Cloudflare 524 proxy timeout.
// With streaming, each SSE chunk resets the idle timeout, so total time can exceed 120s.
async function callClaudeAPI(systemPrompt, userPrompt, apiKey, maxTokens = 4096) {
  // Force raw JSON output (no markdown wrapping)
  const enhancedSystem = systemPrompt + '\n\nCRITICAL: Output ONLY raw JSON. No markdown, no ```json blocks, no text before or after. Start with { and end with }.';

  const body = JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: maxTokens,
    stream: true,
    system: enhancedSystem,
    messages: [{ role: 'user', content: userPrompt }]
  });
  console.log(`Claude API call (streaming): ${body.length} bytes, maxTokens=${maxTokens}`);

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const start = Date.now();
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body
      });

      if (res.status === 524 || res.status === 502 || res.status === 503) {
        const elapsed = Date.now() - start;
        console.log(`Claude API stream error: ${res.status} in ${elapsed}ms (attempt ${attempt})`);
        if (attempt < 2) { console.log('Retrying...'); continue; }
        return { _error: `Claude API ${res.status} after ${attempt} attempts` };
      }

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Claude API error: ${res.status} — ${errorText}`);
        return { _error: `Claude API ${res.status}: ${errorText}` };
      }

      // Read SSE stream and accumulate text content
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let content = '';
      let stopReason = null;
      let outputTokens = 0;
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // keep incomplete last line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;

          try {
            const event = JSON.parse(data);
            if (event.type === 'content_block_delta' && event.delta?.text) {
              content += event.delta.text;
            } else if (event.type === 'message_delta') {
              stopReason = event.delta?.stop_reason || stopReason;
              outputTokens = event.usage?.output_tokens || outputTokens;
            } else if (event.type === 'error') {
              console.error('Stream error event:', JSON.stringify(event.error));
              return { _error: `Stream error: ${event.error?.message || 'unknown'}` };
            }
          } catch {} // skip non-JSON lines (event: lines, empty lines)
        }
      }

      const elapsed = Date.now() - start;
      console.log(`Claude API streamed: ${elapsed}ms, stop=${stopReason}, tokens=${outputTokens}, chars=${content.length}`);

      if (!content) {
        console.error('No content accumulated from stream');
        return { _error: 'No content in Claude stream response' };
      }

      if (stopReason === 'max_tokens') {
        console.warn('Claude response was TRUNCATED (hit max_tokens)');
      }

      // Parse JSON from accumulated content
      try {
        return JSON.parse(content);
      } catch {
        // Try multiple extraction strategies
        const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (codeBlockMatch) {
          try { return JSON.parse(codeBlockMatch[1].trim()); } catch {}
        }
        const firstBrace = content.indexOf('{');
        const lastBrace = content.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace > firstBrace) {
          try { return JSON.parse(content.substring(firstBrace, lastBrace + 1)); } catch {}
        }
        const firstBracket = content.indexOf('[');
        const lastBracket = content.lastIndexOf(']');
        if (firstBracket !== -1 && lastBracket > firstBracket) {
          try { return JSON.parse(content.substring(firstBracket, lastBracket + 1)); } catch {}
        }
        console.error('Failed to parse Claude response as JSON. First 500 chars:', content.substring(0, 500));
        return { raw: content, _error: 'JSON parse failed' };
      }
    } catch (e) {
      console.error(`Claude API exception (attempt ${attempt}):`, e.message || e);
      if (attempt >= 2) return { _error: `Exception: ${e.message || e}` };
    }
  }
}

// Helper: Generate meeting brief email HTML
function generateMeetingBriefEmail(clientName, meetingBrief) {
  const agenda = meetingBrief.meetingAgenda || [];
  const investment = meetingBrief.investment || {};
  const rec = meetingBrief.recommendedScenario || {};
  const agendaHtml = agenda.map(item =>
    `<tr><td style="padding:8px;border-bottom:1px solid #e0e0e0;"><strong>${item.timeSlot}</strong></td><td style="padding:8px;border-bottom:1px solid #e0e0e0;">${item.topic}</td></tr>`
  ).join('');
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:#1a1a2e;color:white;padding:20px;border-radius:8px 8px 0 0}.content{background:#f8f9fa;padding:20px;border-radius:0 0 8px 8px}.section{margin-bottom:24px}.section-title{color:#1a1a2e;font-size:18px;font-weight:600;margin-bottom:12px;border-bottom:2px solid #e27308;padding-bottom:8px}table{width:100%;border-collapse:collapse}.subtle{color:#6c757d;font-size:14px}</style></head><body><div class="container"><div class="header"><h1>Meeting Brief: ${clientName}</h1><p class="subtle">Prepared by Archificials Research Pipeline</p></div><div class="content"><div class="section"><div class="section-title">Executive Summary</div><p>${meetingBrief.executiveSummary || 'See full brief'}</p></div><div class="section"><div class="section-title">Key Pain Points</div>${meetingBrief.painPoints?.map(p => `<p><strong>${p.point}</strong> (Severity: ${p.severity}/10)</p>`).join('') || '<p>See full brief</p>'}</div><div class="section"><div class="section-title">Recommended Scenario</div><p><strong>Lead with: Scenario ${rec.scenario}</strong></p><p>${rec.hook || ''}</p></div><div class="section"><div class="section-title">Investment Range</div><p><strong>First year:</strong> ${investment.recommendedRange || 'See full brief'}</p><p><strong>Payback:</strong> ${investment.paybackPeriod || 'See full brief'}</p></div><div class="section"><div class="section-title">Meeting Agenda (60 min)</div><table>${agendaHtml || '<tr><td colspan="2">See full brief</td></tr>'}</table></div><div class="section"><p class="subtle">Full research includes market analysis, 6 deployment scenarios, and meeting strategy. Internal use only.</p></div></div></div></body></html>`;
}

// Helper: Send notification email
async function sendNotificationEmail(to, subject, htmlContent, resendApiKey) {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Archificials <reports@archificials.com>',
        to, subject, html: htmlContent
      })
    });
    if (!res.ok) { console.error(`Resend API error: ${res.status}`); return false; }
    return true;
  } catch (e) { console.error('Email send error:', e); return false; }
}

// ========================= MAIN HANDLER =========================

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    const url = new URL(request.url);

    // Health check
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', version: '4.2.0-stream' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Status check placeholder
    if (request.method === 'GET' && url.pathname.startsWith('/status/')) {
      return new Response(JSON.stringify({ status: 'pending', message: 'Not yet implemented' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Main generate endpoint — runs entire pipeline synchronously
    if ((request.method === 'GET' || request.method === 'POST') && url.pathname === '/generate') {
      const recordId = url.searchParams.get('id');
      const vertical = url.searchParams.get('vertical') || 'law-firm';
      const token = url.searchParams.get('token');
      const timestamp = url.searchParams.get('t');
      const testMode = url.searchParams.get('test') === 'true';

      if (!recordId) {
        return new Response(JSON.stringify({ error: 'Missing required parameter: id' }), {
          status: 400, headers: { 'Content-Type': 'application/json' }
        });
      }

      if (!testMode && (!token || !timestamp)) {
        return new Response(JSON.stringify({ error: 'Missing required parameters: token, t' }), {
          status: 400, headers: { 'Content-Type': 'application/json' }
        });
      }

      if (!testMode) {
        const isValid = await validateToken(recordId, token, timestamp, env.REPORT_SECRET);
        if (!isValid) {
          return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
            status: 401, headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      const pipelineStart = Date.now();

      try {
        // === STEP 1: Fetch assessment data ===
        const tableMap = { 'law-firm': 'V2 Assessments', 'architecture': 'V2 Assessments', 'higher-ed': 'Higher Ed V2 Assessments' };
        const baseMap = { 'law-firm': 'apph2tKtp5MCF8cGT', 'architecture': 'appB7PmFnNvV3085q', 'higher-ed': 'appB7PmFnNvV3085q' };
        const tableName = tableMap[vertical] || 'V2 Assessments';
        const baseId = baseMap[vertical] || env.AIRTABLE_BASE_ID;

        console.log(`[1/7] Fetching record ${recordId}`);
        const assessmentData = await fetchAssessmentRecord(baseId, tableName, recordId, env.AIRTABLE_API_KEY);
        if (!assessmentData) {
          return new Response(JSON.stringify({ error: 'Failed to fetch assessment record' }), {
            status: 500, headers: { 'Content-Type': 'application/json' }
          });
        }

        const scores = {
          operational: assessmentData.score_operational || 0,
          acquisition: assessmentData.score_acquisition || 0,
          digital: assessmentData.score_digital || 0,
          practice_readiness: assessmentData.score_practice_readiness || 0,
          overall: assessmentData.score_overall || 0,
          insight_operational: assessmentData.insight_operational || '',
          insight_acquisition: assessmentData.insight_acquisition || '',
          insight_digital: assessmentData.insight_digital || '',
          insight_practice_readiness: assessmentData.insight_practice_readiness || '',
          overall_summary: assessmentData.overall_summary || '',
          recommended_first_step: assessmentData.recommended_first_step || '',
          top_opportunities: assessmentData.top_opportunities || []
        };
        assessmentData.scores = scores;
        assessmentData.vertical = vertical;

        // === STEP 2: Brave Search ===
        console.log('[2/7] Running Brave Search');
        const { buildSearchQueries } = await import('../../reports/research/market-analysis.js');
        const queries = buildSearchQueries(assessmentData);
        const searchResults = await Promise.all(
          queries.map(q => braveSearch(q, env.BRAVE_API_KEY))
        );
        console.log(`[2/7] Got ${searchResults.flat().length} search results`);

        // === STEP 3: Market Analysis (Claude call 1) ===
        console.log('[3/7] Generating market analysis');
        const { buildMarketAnalysisPrompt } = await import('../../reports/research/market-analysis.js');
        const marketPrompt = buildMarketAnalysisPrompt(assessmentData, searchResults);
        const marketAnalysis = await callClaudeAPI(
          marketPrompt.system, marketPrompt.user, env.ANTHROPIC_API_KEY, 8000
        );
        if (!marketAnalysis || marketAnalysis._error) {
          console.error('[3/7] Market analysis failed:', marketAnalysis?._error);
          return new Response(JSON.stringify({
            error: 'Market analysis failed', detail: marketAnalysis?._error,
            elapsed_ms: Date.now() - pipelineStart
          }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
        console.log(`[3/7] Market analysis complete at ${((Date.now() - pipelineStart) / 1000).toFixed(1)}s`);

        // === STEPS 4+5: Deployment Scenarios + Meeting Brief (PARALLEL) ===
        // Run in parallel to stay under Worker wall-clock limit (~300s).
        // Meeting brief uses market analysis only (scenarios passed as null — fallback text in prompt).
        console.log('[4-5/7] Generating scenarios + meeting brief IN PARALLEL');
        const { buildDeploymentScenariosPrompt } = await import('../../reports/research/deployment-scenarios.js');
        const { buildMeetingBriefPrompt } = await import('../../reports/research/meeting-brief.js');

        const scenariosPrompt = buildDeploymentScenariosPrompt(assessmentData, searchResults, marketAnalysis);
        const briefPrompt = buildMeetingBriefPrompt(assessmentData, marketAnalysis, null);

        const [deploymentScenarios, meetingBrief] = await Promise.all([
          callClaudeAPI(scenariosPrompt.system, scenariosPrompt.user, env.ANTHROPIC_API_KEY, 8000),
          callClaudeAPI(briefPrompt.system, briefPrompt.user, env.ANTHROPIC_API_KEY, 8000)
        ]);

        if (!deploymentScenarios || deploymentScenarios._error) {
          console.error('[4/7] Scenarios failed:', deploymentScenarios?._error);
          return new Response(JSON.stringify({
            error: 'Deployment scenarios failed', detail: deploymentScenarios?._error,
            elapsed_ms: Date.now() - pipelineStart
          }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }

        if (!meetingBrief || meetingBrief._error) {
          console.error('[5/7] Meeting brief failed:', meetingBrief?._error);
          return new Response(JSON.stringify({
            error: 'Meeting brief failed', detail: meetingBrief?._error,
            elapsed_ms: Date.now() - pipelineStart
          }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
        console.log(`[4-5/7] Parallel calls done at ${((Date.now() - pipelineStart) / 1000).toFixed(1)}s`);

        // === STEP 6: Assemble & Upload ===
        console.log('[6/7] Assembling presentation');
        const clientName = assessmentData.inst_name || assessmentData.firm_name || 'Client';
        const clientSlug = clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const now = new Date();
        const slugDate = `${clientSlug}-${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
        const friendlyDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        // Store research JSON
        const results = {
          assessmentId: recordId, vertical,
          generatedAt: now.toISOString(),
          marketAnalysis, deploymentScenarios, meetingBrief
        };
        await env.REPORTS_BUCKET.put(`reports/${clientSlug}/research.json`, JSON.stringify(results, null, 2), {
          contentType: 'application/json',
          metadata: { generated: now.toISOString(), vertical }
        });

        // Assemble HTML presentation
        const { assemblePresentation } = await import('../../reports/engine/assembler.js');
        const reportHtml = assemblePresentation({
          assessment: assessmentData, scores,
          marketAnalysis, deploymentScenarios, meetingBrief,
          vertical, clientName, date: friendlyDate
        });

        // Generate password
        const password = Math.random().toString(36).substring(2, 10);
        const pwHashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
        const pwHash = Array.from(new Uint8Array(pwHashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

        // Upload to R2
        await env.REPORTS_BUCKET.put(`reports/${slugDate}/index.html`, reportHtml, {
          httpMetadata: { contentType: 'text/html' },
          customMetadata: { passwordHash: pwHash, clientName }
        });
        console.log(`[6/7] Report uploaded: ${slugDate}`);

        // === STEP 7: Send email ===
        console.log('[7/7] Sending notification email');
        let emailHtml = generateMeetingBriefEmail(clientName, meetingBrief);
        const gatewayHost = url.host.replace('report-orchestrator', 'report-gateway');
        const reportUrl = `https://${gatewayHost}/r/${slugDate}`;
        emailHtml += `<hr/><p><strong>Report URL:</strong> <a href="${reportUrl}">${reportUrl}</a></p><p><strong>Password:</strong> ${password}</p>`;

        await sendNotificationEmail(
          env.NOTIFY_EMAIL,
          `Report Ready: ${clientName}`,
          emailHtml,
          env.RESEND_API_KEY
        );

        const totalElapsed = Date.now() - pipelineStart;
        console.log(`Pipeline complete in ${(totalElapsed / 1000).toFixed(1)}s. Slug: ${slugDate}, Password: ${password}`);

        return new Response(JSON.stringify({
          status: 'complete',
          slug: slugDate,
          password,
          reportUrl,
          elapsed_ms: totalElapsed
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      } catch (error) {
        console.error('Pipeline error:', error.message || error);
        return new Response(JSON.stringify({
          error: 'Pipeline failed',
          detail: error.message || String(error),
          elapsed_ms: Date.now() - pipelineStart
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404, headers: { 'Content-Type': 'application/json' }
    });
  }
};
