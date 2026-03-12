/**
 * Report Orchestrator Worker
 * 
 * Orchestrates the full report generation pipeline:
 * 1. Validates HMAC token
 * 2. Fetches assessment record from Airtable
 * 3. Runs Brave Search queries
 * 4. Calls Claude API for 3 research outputs (market analysis, scenarios, meeting brief)
 * 5. Stores results in R2
 * 6. Sends notification email
 */

// Helper: Validate HMAC token
async function validateToken(id, token, timestamp, secret) {
  try {
    const message = `${id}:${timestamp}`;
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    // Convert hex string to Uint8Array
    const signature = new Uint8Array(
      token.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
    );
    
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      new TextEncoder().encode(message)
    );
    
    // Check if token is within 7 days
    const age = Date.now() - parseInt(timestamp);
    const isExpired = age > 7 * 24 * 60 * 60 * 1000;
    
    return valid && !isExpired;
  } catch (e) {
    console.error('Token validation error:', e);
    return false;
  }
}

// Helper: Run Brave Search query
async function braveSearch(query, apiKey) {
  try {
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=10`;
    const res = await fetch(url, {
      headers: { 'X-Subscription-Token': apiKey }
    });
    
    if (!res.ok) {
      console.error(`Brave API error: ${res.status}`);
      return [];
    }
    
    const data = await res.json();
    return data.web?.results?.map(r => ({
      title: r.title,
      url: r.url,
      description: r.description,
      age: r.age
    })) || [];
  } catch (e) {
    console.error('Brave search error:', e);
    return [];
  }
}

// Helper: Fetch assessment record from Airtable
async function fetchAssessmentRecord(baseId, tableName, recordId, apiKey) {
  try {
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}/${recordId}`;
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    
    if (!res.ok) {
      console.error(`Airtable fetch error: ${res.status}`);
      return null;
    }
    
    const record = await res.json();
    return record.fields || null;
  } catch (e) {
    console.error('Airtable fetch error:', e);
    return null;
  }
}

// Helper: Call Claude API
async function callClaudeAPI(systemPrompt, userPrompt, apiKey, maxTokens = 8000) {
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    });
    
    if (!res.ok) {
      console.error(`Claude API error: ${res.status}`);
      const error = await res.json();
      console.error('Claude error details:', error);
      return null;
    }
    
    const data = await res.json();
    const content = data.content?.[0]?.text;
    
    if (!content) {
      console.error('No content in Claude response');
      return null;
    }
    
    // Try to parse as JSON
    try {
      return JSON.parse(content);
    } catch {
      console.error('Failed to parse Claude response as JSON');
      return { raw: content };
    }
  } catch (e) {
    console.error('Claude API error:', e);
    return null;
  }
}

// Helper: Generate meeting brief email HTML
function generateMeetingBriefEmail(clientName, meetingBrief) {
  const agenda = meetingBrief.meetingAgenda || [];
  const investment = meetingBrief.investment || {};
  const recommendedScenario = meetingBrief.recommendedScenario || {};
  
  const agendaHtml = agenda
    .map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">
          <strong>${item.timeSlot}</strong>
        </td>
        <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">
          ${item.topic}
        </td>
      </tr>
    `)
    .join('');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a1a2e; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
        .section { margin-bottom: 24px; }
        .section-title { color: #1a1a2e; font-size: 18px; font-weight: 600; margin-bottom: 12px; border-bottom: 2px solid #e27308; padding-bottom: 8px; }
        table { width: 100%; border-collapse: collapse; }
        .cta { background: #e27308; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 12px; }
        .subtle { color: #6c757d; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 Meeting Brief: ${clientName}</h1>
          <p class="subtle">Prepared by Archificials Research Pipeline</p>
        </div>
        
        <div class="content">
          <div class="section">
            <div class="section-title">Executive Summary</div>
            <p>${meetingBrief.executiveSummary || 'See full brief for details'}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Key Pain Points</div>
            ${meetingBrief.painPoints?.map(p => `<p><strong>${p.point}</strong> (Severity: ${p.severity}/10)</p>`).join('') || '<p>See full brief</p>'}
          </div>
          
          <div class="section">
            <div class="section-title">Recommended Scenario</div>
            <p><strong>Lead with: Scenario ${recommendedScenario.scenario}</strong></p>
            <p>${recommendedScenario.hook || ''}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Investment Range</div>
            <p><strong>Estimated first year:</strong> ${investment.recommendedRange || 'See full brief'}</p>
            <p><strong>Expected payback:</strong> ${investment.paybackPeriod || 'See full brief'}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Meeting Agenda (60 minutes)</div>
            <table>
              ${agendaHtml || '<tr><td colspan="2">See full brief for details</td></tr>'}
            </table>
          </div>
          
          <div class="section">
            <p class="subtle">Full research data includes market analysis, 4 deployment scenarios, and detailed meeting strategy. This brief is for internal use only.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Helper: Send notification email
async function sendNotificationEmail(to, subject, htmlContent, resendApiKey) {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Archificials <reports@archificials.com>',
        to: to,
        subject: subject,
        html: htmlContent
      })
    });
    
    if (!res.ok) {
      console.error(`Resend API error: ${res.status}`);
      return false;
    }
    
    return true;
  } catch (e) {
    console.error('Email send error:', e);
    return false;
  }
}

// Helper: Store results in R2
async function storeResultsInR2(bucket, slug, results) {
  try {
    const key = `reports/${slug}/research.json`;
    await bucket.put(key, JSON.stringify(results, null, 2), {
      contentType: 'application/json',
      metadata: {
        generated: new Date().toISOString(),
        vertical: slug
      }
    });
    return true;
  } catch (e) {
    console.error('R2 storage error:', e);
    return false;
  }
}

// Main handler
export default {
  async fetch(request, env, ctx) {
    // Enable CORS for preflight
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
      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // GET /status/:id - Check generation status
    if (request.method === 'GET' && url.pathname.startsWith('/status/')) {
      const recordId = url.pathname.split('/').pop();
      // TODO: Implement status checking from KV store
      return new Response(JSON.stringify({ 
        status: 'pending',
        message: 'Status checking not yet implemented'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // POST /generate - Main orchestrator endpoint
    if (request.method === 'POST' && url.pathname === '/generate') {
      const recordId = url.searchParams.get('id');
      const vertical = url.searchParams.get('vertical') || 'law-firm';
      const token = url.searchParams.get('token');
      const timestamp = url.searchParams.get('t');
      const testMode = url.searchParams.get('test') === 'true';
      
      // Validate required parameters
      if (!recordId || !token || !timestamp) {
        return new Response(JSON.stringify({
          error: 'Missing required parameters: id, token, t'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Validate HMAC token (unless test mode)
      if (!testMode) {
        const isValid = await validateToken(recordId, token, timestamp, env.REPORT_SECRET);
        if (!isValid) {
          return new Response(JSON.stringify({
            error: 'Invalid or expired token'
          }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
      
      try {
        // Map vertical to table name
        const tableMap = {
          'law-firm': 'V2 Assessments',
          'architecture': 'Architecture V2 Assessments',
          'higher-ed': 'Higher Ed V2 Assessments'
        };
        const tableName = tableMap[vertical] || 'V2 Assessments';
        
        // Step 1: Fetch assessment record
        console.log(`Fetching assessment record ${recordId} from table ${tableName}`);
        const assessmentData = await fetchAssessmentRecord(
          env.AIRTABLE_BASE_ID,
          tableName,
          recordId,
          env.AIRTABLE_API_KEY
        );
        
        if (!assessmentData) {
          return new Response(JSON.stringify({
            error: 'Failed to fetch assessment record'
          }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Step 2: Run Brave Search queries
        console.log('Running Brave Search queries');
        const { buildSearchQueries } = await import('../../../reports/research/market-analysis.js');
        const queries = buildSearchQueries(assessmentData);
        const searchResults = await Promise.all(
          queries.map(q => braveSearch(q, env.BRAVE_API_KEY))
        );
        
        // Step 3: Generate market analysis
        console.log('Generating market analysis');
        const { buildMarketAnalysisPrompt } = await import('../../../reports/research/market-analysis.js');
        const marketPrompt = buildMarketAnalysisPrompt(assessmentData, searchResults);
        const marketAnalysis = await callClaudeAPI(
          marketPrompt.system,
          marketPrompt.user,
          env.ANTHROPIC_API_KEY,
          parseInt(env.MAX_TOKENS)
        );
        
        if (!marketAnalysis) {
          return new Response(JSON.stringify({
            error: 'Failed to generate market analysis'
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Step 4: Generate deployment scenarios
        console.log('Generating deployment scenarios');
        const { buildDeploymentScenariosPrompt } = await import('../../../reports/research/deployment-scenarios.js');
        const scenariosPrompt = buildDeploymentScenariosPrompt(assessmentData, searchResults, marketAnalysis);
        const deploymentScenarios = await callClaudeAPI(
          scenariosPrompt.system,
          scenariosPrompt.user,
          env.ANTHROPIC_API_KEY,
          parseInt(env.MAX_TOKENS)
        );
        
        if (!deploymentScenarios) {
          return new Response(JSON.stringify({
            error: 'Failed to generate deployment scenarios'
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Step 5: Generate meeting brief
        console.log('Generating meeting brief');
        const { buildMeetingBriefPrompt } = await import('../../../reports/research/meeting-brief.js');
        const briefPrompt = buildMeetingBriefPrompt(assessmentData, marketAnalysis, deploymentScenarios);
        const meetingBrief = await callClaudeAPI(
          briefPrompt.system,
          briefPrompt.user,
          env.ANTHROPIC_API_KEY,
          parseInt(env.MAX_TOKENS)
        );
        
        if (!meetingBrief) {
          return new Response(JSON.stringify({
            error: 'Failed to generate meeting brief'
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // Step 6: Store results in R2
        console.log('Storing results in R2');
        const clientSlug = (assessmentData.inst_name || assessmentData.firm_name || 'client')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        
        const results = {
          assessmentId: recordId,
          vertical: vertical,
          generatedAt: new Date().toISOString(),
          marketAnalysis,
          deploymentScenarios,
          meetingBrief
        };
        
        await storeResultsInR2(env.REPORTS_BUCKET, clientSlug, results);
        
        // Step 7: Send notification email
        console.log('Sending notification email');
        const clientName = assessmentData.inst_name || assessmentData.firm_name || 'Client';
        const emailHtml = generateMeetingBriefEmail(clientName, meetingBrief);
        
        const emailSent = await sendNotificationEmail(
          env.NOTIFY_EMAIL,
          `📊 Report Ready: ${clientName}`,
          emailHtml,
          env.RESEND_API_KEY
        );
        
        // Return success response
        return new Response(JSON.stringify({
          status: 'success',
          message: 'Report generation complete',
          recordId: recordId,
          vertical: vertical,
          clientSlug: clientSlug,
          timestamp: new Date().toISOString(),
          results: {
            hasMarketAnalysis: !!marketAnalysis,
            hasDeploymentScenarios: !!deploymentScenarios,
            hasMeetingBrief: !!meetingBrief,
            emailSent: emailSent
          }
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
        
      } catch (error) {
        console.error('Orchestration error:', error);
        return new Response(JSON.stringify({
          error: 'Internal server error',
          message: error.message
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    return new Response(JSON.stringify({
      error: 'Not found'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
