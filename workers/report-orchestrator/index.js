/**
 * Report Orchestrator Worker v5.0.0
 *
 * Generates a structured prompt document from assessment data + domain knowledge.
 * The prompt is designed to be pasted into Claude Cowork (with web search enabled)
 * for vastly superior research at $0 marginal cost.
 *
 * Pipeline: Airtable → Prompt Generator → R2 Markdown → Email with link
 * Total time: <2 seconds
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

// Helper: Build the notification email with prompt link and scores
function buildPromptReadyEmail(clientName, scores, promptUrl) {
  function scoreLabel(s) { return s < 40 ? 'Weak' : s < 65 ? 'Moderate' : 'Strong'; }
  function scoreColor(s) { return s < 40 ? '#dc3545' : s < 65 ? '#e27308' : '#28a745'; }

  const dims = [
    { name: 'Operational Efficiency', score: scores.operational },
    { name: 'Client Acquisition', score: scores.acquisition },
    { name: 'Digital Visibility', score: scores.digital },
    { name: 'Practice Readiness', score: scores.practice_readiness }
  ];

  const scoreRows = dims.map(d =>
    `<tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e0e0e0;font-weight:500;">${d.name}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e0e0e0;text-align:center;">
        <span style="color:${scoreColor(d.score)};font-weight:700;">${d.score}/100</span>
      </td>
      <td style="padding:10px 12px;border-bottom:1px solid #e0e0e0;color:${scoreColor(d.score)};">${scoreLabel(d.score)}</td>
    </tr>`
  ).join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#333;margin:0;padding:0;">
<div style="max-width:600px;margin:0 auto;padding:20px;">

  <div style="background:#1a1a2e;color:white;padding:24px;border-radius:8px 8px 0 0;">
    <h1 style="margin:0 0 4px 0;font-size:22px;">Research Prompt Ready</h1>
    <p style="margin:0;color:#ccc;font-size:14px;">${clientName} | AI Readiness Assessment</p>
  </div>

  <div style="background:#f8f9fa;padding:24px;border-radius:0 0 8px 8px;">

    <div style="margin-bottom:24px;">
      <h2 style="color:#1a1a2e;font-size:16px;margin:0 0 4px 0;">Overall Score</h2>
      <p style="font-size:32px;font-weight:700;color:${scoreColor(scores.overall)};margin:0;">${scores.overall}/100
        <span style="font-size:14px;font-weight:400;color:#666;"> — ${scoreLabel(scores.overall)}</span>
      </p>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr style="background:#1a1a2e;color:white;">
        <th style="padding:10px 12px;text-align:left;">Dimension</th>
        <th style="padding:10px 12px;text-align:center;">Score</th>
        <th style="padding:10px 12px;text-align:left;">Rating</th>
      </tr>
      ${scoreRows}
    </table>

    <div style="background:#fff;border:2px solid #e27308;border-radius:8px;padding:20px;text-align:center;margin-bottom:24px;">
      <p style="margin:0 0 12px 0;font-size:14px;color:#666;">Research prompt document is ready</p>
      <a href="${promptUrl}" style="display:inline-block;background:#e27308;color:white;text-decoration:none;padding:12px 32px;border-radius:6px;font-weight:600;font-size:16px;">
        Download Prompt
      </a>
    </div>

    <div style="background:#fff;border-radius:6px;padding:16px;border:1px solid #e0e0e0;">
      <h3 style="margin:0 0 8px 0;font-size:14px;color:#1a1a2e;">How to use:</h3>
      <ol style="margin:0;padding-left:20px;font-size:13px;color:#555;">
        <li style="margin-bottom:6px;">Open the prompt link above and copy the full document</li>
        <li style="margin-bottom:6px;">Open <strong>Claude Cowork</strong> (ensure web search is enabled)</li>
        <li style="margin-bottom:6px;">Paste the prompt and let Claude execute the research</li>
        <li>Use the output to build the client presentation</li>
      </ol>
    </div>

    <p style="margin-top:20px;font-size:12px;color:#999;text-align:center;">
      Generated by Archificials Assessment Pipeline v5.0 | Internal use only
    </p>
  </div>
</div>
</body>
</html>`;
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
      return new Response(JSON.stringify({ status: 'ok', version: '5.0.0-prompt' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Status check placeholder
    if (request.method === 'GET' && url.pathname.startsWith('/status/')) {
      return new Response(JSON.stringify({ status: 'pending', message: 'Not yet implemented' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Main generate endpoint
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

        console.log(`[1/3] Fetching record ${recordId}`);
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

        // === STEP 2: Generate prompt document ===
        console.log('[2/3] Generating prompt document');
        const { generatePromptDocument } = await import('../../reports/engine/prompt-generator.js');
        const promptDocument = generatePromptDocument(assessmentData);
        console.log(`[2/3] Prompt document generated: ${promptDocument.length} chars`);

        // === STEP 3: Upload to R2 + Send email ===
        const clientName = assessmentData.inst_name || assessmentData.firm_name || 'Client';
        const clientSlug = clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const now = new Date();
        const slugDate = `${clientSlug}-${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;

        await env.REPORTS_BUCKET.put(`prompts/${slugDate}/prompt.md`, promptDocument, {
          httpMetadata: { contentType: 'text/plain; charset=utf-8' },
          customMetadata: { clientName, vertical, generated: now.toISOString() }
        });
        console.log(`[3/3] Prompt uploaded: prompts/${slugDate}/prompt.md`);

        // Send email
        const gatewayHost = url.host.replace('report-orchestrator', 'report-gateway');
        const promptUrl = `https://${gatewayHost}/p/${slugDate}`;
        const emailHtml = buildPromptReadyEmail(clientName, scores, promptUrl);

        await sendNotificationEmail(
          env.NOTIFY_EMAIL,
          `Prompt Ready: ${clientName}`,
          emailHtml,
          env.RESEND_API_KEY
        );

        const totalElapsed = Date.now() - pipelineStart;
        console.log(`Pipeline complete in ${(totalElapsed / 1000).toFixed(1)}s. Slug: ${slugDate}`);

        return new Response(JSON.stringify({
          status: 'complete',
          slug: slugDate,
          promptUrl,
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
