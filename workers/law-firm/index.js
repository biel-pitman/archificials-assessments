// Law Firm AI Scorer - v2
// Cloudflare Worker: receives assessment answers, scores via Claude, stores in Airtable, emails notification

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

// vertical-specific constants for report trigger
const VERTICAL_SLUG = "law-firm";
const REPORT_ORCHESTRATOR_URL = "https://report-orchestrator.<your-subdomain>.workers.dev";

// helper to generate HMAC token for report trigger
async function generateReportToken(recordId, secret) {
  const timestamp = Date.now().toString();
  const message = `${recordId}:${timestamp}`;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(message)
  );
  const token = Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return { token, timestamp };
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

// ─── Scoring Prompt ─────────────────────────────────────────────────────────

function buildScoringPrompt(a) {
  const pa = a.practice_area || "";
  const mk = a.module_key || "";

  // Build practice-area-specific context block using module_key for reliable routing
  let moduleContext = "";

  if (mk === "A") {
    moduleContext = `
Practice Area Module: Personal Injury / Mass Tort
- Case mix: ${a.case_mix_pi || "N/A"}
- Medical record review: ${a.medical_records_pi || "N/A"}
- Case timeline: ${a.case_timeline_pi || "N/A"}
- Client status updates: ${a.case_status_pi || "N/A"}
- Client source: ${a.client_source_pi || "N/A"}
- Case valuation approach: ${a.demand_letters_pi || "N/A"}
- Digital presence: ${a.digital_presence_pi || "N/A"}
- Biggest bottleneck: ${a.bottleneck_pi || "N/A"}`;
  } else if (mk === "B") {
    moduleContext = `
Practice Area Module: Criminal Defense & Civil Rights
- Case mix: ${a.case_mix_crim || "N/A"}
- Intake speed: ${a.intake_speed_crim || "N/A"}
- Discovery review: ${a.discovery_crim || "N/A"}
- Sentencing research: ${a.sentencing_research_crim || "N/A"}
- Client communication: ${a.client_comm_crim || "N/A"}
- Client source: ${a.client_source_crim || "N/A"}
- Digital presence: ${a.digital_presence_crim || "N/A"}
- Biggest bottleneck: ${a.bottleneck_crim || "N/A"}`;
  } else if (mk === "C") {
    moduleContext = `
Practice Area Module: Business & Commercial Litigation
- Case mix: ${a.case_mix_comm || "N/A"}
- Discovery process: ${a.discovery_comm || "N/A"}
- Research strategy: ${a.research_comm || "N/A"}
- Client communication: ${a.client_comm_comm || "N/A"}
- Drafting process: ${a.drafting_comm || "N/A"}
- Client source: ${a.client_source_comm || "N/A"}
- Budget tracking: ${a.budget_tracking_comm || "N/A"}
- Biggest bottleneck: ${a.bottleneck_comm || "N/A"}`;
  } else if (mk === "D") {
    moduleContext = `
Practice Area Module: IP & Technology Law
- Case mix: ${a.case_mix_ip || "N/A"}
- Research process: ${a.research_ip || "N/A"}
- Portfolio management: ${a.portfolio_ip || "N/A"}
- Contract drafting: ${a.contracts_ip || "N/A"}
- Regulatory tracking: ${a.regulatory_ip || "N/A"}
- OGC delivery: ${a.ogc_delivery_ip || "N/A"}
- Digital presence: ${a.digital_presence_ip || "N/A"}
- Biggest bottleneck: ${a.bottleneck_ip || "N/A"}`;
  } else if (mk === "E") {
    moduleContext = `
Practice Area Module: Employment & Labor Law
- Practice model: ${a.practice_model_emp || "N/A"}
- Case mix: ${a.case_mix_emp || "N/A"}
- Document review: ${a.doc_review_emp || "N/A"}
- Drafting process: ${a.drafting_emp || "N/A"}
- Regulatory tracking: ${a.regulatory_emp || "N/A"}
- Client communication: ${a.client_comm_emp || "N/A"}
- Preventive services: ${a.preventive_emp || "N/A"}
- Biggest bottleneck: ${a.bottleneck_emp || "N/A"}`;
  } else if (mk === "F") {
    moduleContext = `
Practice Area Module: Estate Planning, Trusts & Probate
- Case mix: ${a.case_mix_estate || "N/A"}
- Intake process: ${a.intake_estate || "N/A"}
- Document drafting: ${a.doc_drafting_estate || "N/A"}
- Plan review: ${a.plan_review_estate || "N/A"}
- Advisor coordination: ${a.advisor_coord_estate || "N/A"}
- Client source: ${a.client_source_estate || "N/A"}
- Client education: ${a.client_education_estate || "N/A"}
- Biggest bottleneck: ${a.bottleneck_estate || "N/A"}`;
  } else if (mk === "G") {
    moduleContext = `
Practice Area Module: Real Estate & Transactional
- Transaction types: ${a.case_mix_re || "N/A"}
- Title review: ${a.title_review_re || "N/A"}
- Contract drafting: ${a.contract_drafting_re || "N/A"}
- Concurrent management: ${a.concurrent_mgmt_re || "N/A"}
- Party coordination: ${a.party_coord_re || "N/A"}
- Client source: ${a.client_source_re || "N/A"}
- Regulatory tracking: ${a.regulatory_re || "N/A"}
- Biggest bottleneck: ${a.bottleneck_re || "N/A"}`;
  } else if (mk === "H") {
    moduleContext = `
Practice Area Module: Family Law & Domestic Relations
- Case mix: ${a.case_mix_family || "N/A"}
- Financial gathering: ${a.financial_gathering_family || "N/A"}
- Document drafting: ${a.doc_drafting_family || "N/A"}
- Client communication: ${a.client_comm_family || "N/A"}
- Mediation approach: ${a.mediation_family || "N/A"}
- Client source: ${a.client_source_family || "N/A"}
- Digital presence: ${a.digital_presence_family || "N/A"}
- Biggest bottleneck: ${a.bottleneck_family || "N/A"}`;
  } else {
    // Module I: Multi-Practice / General Counsel
    moduleContext = `
Practice Area Module: Multi-Practice & General Counsel
- Practice areas: ${a.case_mix_multi || "N/A"}
- Matter management: ${a.matter_mgmt_multi || "N/A"}
- Cross-practice coordination: ${a.cross_practice_multi || "N/A"}
- Client communication: ${a.client_comm_multi || "N/A"}
- Billing tracking: ${a.billing_multi || "N/A"}
- Client source: ${a.client_source_multi || "N/A"}
- Knowledge management: ${a.knowledge_mgmt_multi || "N/A"}
- Biggest bottleneck: ${a.bottleneck_multi || "N/A"}`;
  }

  const firmName = a.firm_name || "your firm";
  const contactFirst = (a.contact_name || "").split(" ")[0] || "";

  return `You are writing the results section of an AI readiness assessment for a law firm. Your audience is ${contactFirst || "the person"} at ${firmName}. They just completed the assessment and will read your analysis immediately.

TONE AND VOICE RULES (follow strictly):
- Write as if you are speaking directly to ${contactFirst || "them"}. Use "you" and "your" naturally. Occasionally reference "${firmName}" by name instead of "you/your" for variety, but never say "the firm" or "the practice."
- ${contactFirst ? `Use "${contactFirst}" by name once or twice across all your text, placed naturally (not forced), to make the report feel personal. Vary where you use it so it does not feel templated.` : "Do not reference any name since none was provided."}
- Be warm, direct, and conversational. Write the way a trusted advisor would speak in a strategy meeting, not a corporate report. Avoid stiff or clinical phrasing.
- ABSOLUTE RULE: Never use em dashes. Not a single one. Use commas, periods, semicolons, or rewrite the sentence instead. This is non-negotiable.
- Never use hype words (revolutionary, cutting-edge, game-changing, transformative, unlock, supercharge, leverage, etc.). Stick to plain, specific language.
- Keep sentences short and concrete. Ground every observation in something they actually said in their answers.

Firm Profile:
- Firm name: ${a.firm_name || "N/A"}
- Contact: ${a.contact_name || "N/A"} (${a.contact_email || "N/A"})
- Firm size: ${a.firm_size || "N/A"}
- Practice area: ${pa || "N/A"}
${moduleContext}

Closing Questions:
- After-hours intake: ${a.after_hours || "N/A"}
- Intake speed: ${a.intake_speed || "N/A"}
- Urgency (1-5): ${a.urgency || "N/A"}
- Investment appetite: ${a.investment || "N/A"}
- Success vision: ${a.success_vision || "N/A"}
- Additional context: ${a.anything_else || "N/A"}

Score on four dimensions (0-100 each):
1. Operational Efficiency (35% weight): How well workflows, case tracking, document handling, and internal processes are managed. Consider bottlenecks, intake speed, and module-specific operational answers.
2. Client Acquisition (25% weight): How effectively new clients are attracted and converted. Consider client sources, after-hours availability, and intake processes.
3. Digital Visibility (20% weight): Online presence, digital marketing maturity, and discoverability. Consider digital presence answers and practice-area-specific indicators.
4. Practice Readiness (20% weight): How prepared the practice is to adopt AI and modern tools. Consider current processes, technology comfort, and openness to change.

Overall = weighted average of the four scores.

CRITICAL RULES FOR DIMENSION INSIGHTS (insight_operational, insight_acquisition, insight_digital, insight_practice_readiness):
- Each of the four dimension insights MUST start with a DIFFERENT opener. You have four insights; use four distinct sentence structures. NEVER start two insights the same way.
- BANNED first words: Do NOT start any insight with "You", "Your", or "You've". These are overused and feel robotic when repeated across four cards.
- Instead, vary openers across these categories (pick one from each category for each insight, never repeating a category):
  * Start with the firm name: "${firmName} has built...", "${firmName} is already ahead on...", "${firmName}'s approach to..."
  ${contactFirst ? `* Start with the contact's name: "${contactFirst}, the way you handle...", "${contactFirst}, one area worth looking at..."` : ""}
  * Start with a specific observation: "The after-hours intake process here is...", "Having templates in place for...", "A week-long intake cycle means..."
  * Start with a strength: "Strong use of technology in...", "Having an emergency line already gives...", "Template-based drafting is a solid foundation..."
  * Start with the gap or opportunity: "The biggest bottleneck right now is...", "Without active digital outreach...", "Portfolio management is the missing piece..."
  * Start with a contrast: "On one hand, the research workflow is solid. On the other...", "While intake is covered after hours, the speed of..."
- Each insight should still reference something specific from their answers and describe what is working and what the gap is.
- In the executive summary (overall_summary), mention Archificials once naturally, for example: "Working with a team like Archificials on [specific area] could help you [specific outcome]." Do not make it sound like an ad. It should read like a helpful suggestion from an advisor.
- CRITICAL RULE FOR top_opportunities: Every single opportunity MUST start by positioning Archificials (or "we" / "our team") as the one helping. Vary the phrasing across the three items so it feels natural, not templated. Examples of good openers: "Archificials can help you consolidate...", "We can help you reduce...", "Our team excels at building...", "Archificials specializes in setting up...", "We can work with you to streamline...". Never start an opportunity with a generic imperative like "Build..." or "Reduce..." or "Consolidate..." directed at the client alone. Archificials is always part of the action.
- Each opportunity should still be specific, actionable, and grounded in their actual answers.
- The recommended_first_step should be a single, concrete action they could take in the next two weeks, and it should mention Archificials as the partner to help execute it.
- After the three top_opportunities, include a "cta_line" field: a warm, conversational one-liner inviting them to schedule a free consultation to discuss their pain points and opportunities in more depth. This should feel like a friend suggesting a coffee chat, not a sales pitch. Vary the wording every time; never use the same phrasing twice. Examples of the right feel: "We would love to walk through these findings with you over a quick call, no strings attached.", "Let us set up a free 30-minute session to dig into what matters most for ${firmName}." Do not use hype words or corporate stiffness.
- Never be generic. If you do not have enough information to be specific, say so honestly rather than padding with filler.

Return ONLY valid JSON (no markdown, no code fences):
{
  "operational": <int 0-100>,
  "acquisition": <int 0-100>,
  "digital": <int 0-100>,
  "practice_readiness": <int 0-100>,
  "overall": <int 0-100>,
  "insight_operational": "<1-2 sentences, NEVER start with You/Your/You've, use a unique opener>",
  "insight_acquisition": "<1-2 sentences, DIFFERENT opener from operational, no You/Your/You've>",
  "insight_digital": "<1-2 sentences, DIFFERENT opener from the above two, no You/Your/You've>",
  "insight_practice_readiness": "<1-2 sentences, DIFFERENT opener from all above, no You/Your/You've>",
  "recommended_first_step": "<specific action mentioning Archificials as partner>",
  "overall_summary": "<2-3 sentence executive summary, mention Archificials once naturally>",
  "top_opportunities": ["<opportunity starting with Archificials/we helping>", "<opportunity starting with Archificials/we helping>", "<opportunity starting with Archificials/we helping>"],
  "cta_line": "<warm one-liner inviting a free consultation, varied each time>"
}

Remember: no em dashes anywhere in your output. Not one. Use commas, periods, or semicolons instead.`;
}

// ─── Score Tier ──────────────────────────────────────────────────────────────

function scoreTier(n) {
  if (n < 40) return "Significant Opportunity";
  if (n < 65) return "Strong Opportunity";
  if (n < 80) return "Building Readiness";
  return "AI-Advanced Firm";
}

// ─── Module field map (for email answer table) ──────────────────────────────

const MODULE_FIELDS = {
  A: [
    ["Case Mix (PI)", "case_mix_pi"],
    ["Medical Records", "medical_records_pi"],
    ["Case Timeline", "case_timeline_pi"],
    ["Client Status", "case_status_pi"],
    ["Client Source", "client_source_pi"],
    ["Case Valuation", "demand_letters_pi"],
    ["Digital Presence", "digital_presence_pi"],
    ["Bottleneck", "bottleneck_pi"],
  ],
  B: [
    ["Case Mix (Criminal)", "case_mix_crim"],
    ["Intake Speed", "intake_speed_crim"],
    ["Discovery Review", "discovery_crim"],
    ["Sentencing Research", "sentencing_research_crim"],
    ["Client Communication", "client_comm_crim"],
    ["Client Source", "client_source_crim"],
    ["Digital Presence", "digital_presence_crim"],
    ["Bottleneck", "bottleneck_crim"],
  ],
  C: [
    ["Case Mix (Business)", "case_mix_comm"],
    ["Discovery", "discovery_comm"],
    ["Research Strategy", "research_comm"],
    ["Client Communication", "client_comm_comm"],
    ["Drafting Process", "drafting_comm"],
    ["Client Source", "client_source_comm"],
    ["Budget Tracking", "budget_tracking_comm"],
    ["Bottleneck", "bottleneck_comm"],
  ],
  D: [
    ["Case Mix (IP)", "case_mix_ip"],
    ["Research Process", "research_ip"],
    ["Portfolio Mgmt", "portfolio_ip"],
    ["Contract Drafting", "contracts_ip"],
    ["Regulatory Tracking", "regulatory_ip"],
    ["OGC Delivery", "ogc_delivery_ip"],
    ["Digital Presence", "digital_presence_ip"],
    ["Bottleneck", "bottleneck_ip"],
  ],
  E: [
    ["Practice Model", "practice_model_emp"],
    ["Case Mix (Employment)", "case_mix_emp"],
    ["Document Review", "doc_review_emp"],
    ["Drafting Process", "drafting_emp"],
    ["Regulatory Tracking", "regulatory_emp"],
    ["Client Communication", "client_comm_emp"],
    ["Preventive Services", "preventive_emp"],
    ["Bottleneck", "bottleneck_emp"],
  ],
  F: [
    ["Case Mix (Estate)", "case_mix_estate"],
    ["Intake Process", "intake_estate"],
    ["Document Drafting", "doc_drafting_estate"],
    ["Plan Review", "plan_review_estate"],
    ["Advisor Coordination", "advisor_coord_estate"],
    ["Client Source", "client_source_estate"],
    ["Client Education", "client_education_estate"],
    ["Bottleneck", "bottleneck_estate"],
  ],
  G: [
    ["Transaction Types", "case_mix_re"],
    ["Title Review", "title_review_re"],
    ["Contract Drafting", "contract_drafting_re"],
    ["Concurrent Mgmt", "concurrent_mgmt_re"],
    ["Party Coordination", "party_coord_re"],
    ["Client Source", "client_source_re"],
    ["Regulatory Tracking", "regulatory_re"],
    ["Bottleneck", "bottleneck_re"],
  ],
  H: [
    ["Case Mix (Family)", "case_mix_family"],
    ["Financial Gathering", "financial_gathering_family"],
    ["Document Drafting", "doc_drafting_family"],
    ["Client Communication", "client_comm_family"],
    ["Mediation", "mediation_family"],
    ["Client Source", "client_source_family"],
    ["Digital Presence", "digital_presence_family"],
    ["Bottleneck", "bottleneck_family"],
  ],
  I: [
    ["Practice Areas", "case_mix_multi"],
    ["Matter Management", "matter_mgmt_multi"],
    ["Cross-Practice", "cross_practice_multi"],
    ["Client Communication", "client_comm_multi"],
    ["Billing Tracking", "billing_multi"],
    ["Client Source", "client_source_multi"],
    ["Knowledge Mgmt", "knowledge_mgmt_multi"],
    ["Bottleneck", "bottleneck_multi"],
  ],
};

// ─── Notification Email ─────────────────────────────────────────────────────

async function buildNotificationEmail(answers, scores, recordId, env) {
  const firm = answers.firm_name || "Unknown Firm";
  const tier = scoreTier(scores.overall);
  const mk = answers.module_key || "I";

  const row = (label, score, insight) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;">${label}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;font-weight:700;color:#1a1a2e;">${score}/100</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;">${insight || ""}</td>
    </tr>`;

  // Build answer rows
  const coreRows = [
    ["Firm Name", answers.firm_name],
    ["Contact", answers.contact_name],
    ["Email", answers.contact_email],
    ["Firm Size", answers.firm_size],
    ["Practice Area", answers.practice_area],
    ["Module", mk],
  ];

  // Get module-specific fields
  const fields = MODULE_FIELDS[mk] || MODULE_FIELDS.I;
  const moduleRows = fields.map(([label, key]) => [label, answers[key]]);

  const closingRows = [
    ["After-Hours Intake", answers.after_hours],
    ["Intake Speed", answers.intake_speed],
    ["Urgency", answers.urgency],
    ["Investment Appetite", answers.investment],
    ["Success Vision", answers.success_vision],
    ["Additional Context", answers.anything_else],
  ];

  const allAnswerRows = [...coreRows, ...moduleRows, ...closingRows];

  const answerTable = allAnswerRows
    .filter(([, v]) => v)
    .map(([label, val]) => `<tr><td style="padding:6px 12px;border-bottom:1px solid #f0f0f0;font-weight:600;width:35%;">${label}</td><td style="padding:6px 12px;border-bottom:1px solid #f0f0f0;">${val}</td></tr>`)
    .join("");

  const opportunitiesList = (scores.top_opportunities || [])
    .map(o => `<li style="margin-bottom:6px;">${o}</li>`)
    .join("");

  let reportRow = "";
  if (recordId && env && env.REPORT_SECRET) {
    const { token, timestamp } = await generateReportToken(recordId, env.REPORT_SECRET);
    const reportUrl = `${REPORT_ORCHESTRATOR_URL}/generate?id=${recordId}&vertical=${VERTICAL_SLUG}&t=${timestamp}&token=${token}`;
    reportRow = `
    <tr>
      <td colspan="2" style="padding: 30px 0; text-align: center; border-top: 2px solid #e27308;">
        <a href="${reportUrl}"
           style="display: inline-block; background-color: #e27308; color: #ffffff;
                  padding: 16px 32px; text-decoration: none; border-radius: 6px;
                  font-size: 18px; font-weight: bold; font-family: Arial, sans-serif;">
          Generate Full Report
        </a>
        <p style="margin-top: 12px; font-size: 13px; color: #6c757d; font-family: Arial, sans-serif;">
          Click to generate a detailed AI readiness presentation for this client
        </p>
      </td>
    </tr>`;
  }

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:700px;margin:0 auto;color:#1a1a2e;">
  <div style="background:#1a1a2e;color:#fff;padding:24px 32px;border-radius:8px 8px 0 0;">
    <h1 style="margin:0;font-size:22px;">New Assessment: ${firm}</h1>
    <p style="margin:8px 0 0;opacity:0.85;font-size:15px;">Overall Score: ${scores.overall}/100 (${tier})</p>
  </div>
  <div style="padding:24px 32px;background:#fff;border:1px solid #e0e0e0;">
    <h2 style="font-size:18px;margin:0 0 12px;">Score Breakdown</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <thead><tr style="background:#f8f8fa;">
        <th style="padding:8px 12px;text-align:left;">Dimension</th>
        <th style="padding:8px 12px;text-align:center;">Score</th>
        <th style="padding:8px 12px;text-align:left;">Insight</th>
      </tr></thead>
      <tbody>
        ${row("Operational Efficiency", scores.operational, scores.insight_operational)}
        ${row("Client Acquisition", scores.acquisition, scores.insight_acquisition)}
        ${row("Digital Visibility", scores.digital, scores.insight_digital)}
        ${row("Practice Readiness", scores.practice_readiness, scores.insight_practice_readiness)}
      </tbody>
    </table>

    ${scores.overall_summary ? `<h2 style="font-size:18px;margin:24px 0 8px;">Summary</h2><p style="color:#555;line-height:1.6;">${scores.overall_summary}</p>` : ""}

    ${scores.recommended_first_step ? `<h2 style="font-size:18px;margin:24px 0 8px;">Recommended First Step</h2><p style="color:#555;line-height:1.6;">${scores.recommended_first_step}</p>` : ""}

    ${opportunitiesList ? `<h2 style="font-size:18px;margin:24px 0 8px;">Top Opportunities</h2><ol style="color:#555;line-height:1.6;">${opportunitiesList}</ol>` : ""}

    <h2 style="font-size:18px;margin:24px 0 12px;">Assessment Answers</h2>
    <table style="width:100%;border-collapse:collapse;">${answerTable}${reportRow}</table>
  </div>
  <div style="padding:16px 32px;background:#f8f8fa;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;text-align:center;color:#888;font-size:13px;">
    Archificials Assessment System v2
  </div>
</body>
</html>`;

  return { html, subject: `[Assessment] ${firm} | ${scores.overall}/100 (${tier}) | Module ${mk}` };
}

// ─── Send Email via Resend ──────────────────────────────────────────────────

async function sendNotificationEmail(env, answers, scores, recordId) {
  const { html, subject } = await buildNotificationEmail(answers, scores, recordId, env);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Archificials Assessments <assessments@archificials.com>",
        to: [env.NOTIFY_EMAIL],
        subject,
        html
      })
    });
    if (!res.ok) {
      const errBody = await res.text();
      console.error("Resend error:", res.status, errBody);
    }
  } catch (err) {
    console.error("Resend send failed:", err);
  }
}

// ─── Main Handler ───────────────────────────────────────────────────────────

var index_default = {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    let answers;
    try {
      answers = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON" }, 400);
    }

    if (!answers.firm_name) {
      return jsonResponse({ error: "firm_name is required" }, 400);
    }

    // Prepare Airtable fields - strip internal fields, keep answer data
    const airtableFields = { ...answers };
    delete airtableFields.version;
    delete airtableFields.timestamp;

    // Convert urgency to number if present
    if (airtableFields.urgency) {
      airtableFields.urgency = Number(airtableFields.urgency) || airtableFields.urgency;
    }

    // ── Step 1: Create Airtable record with answers ──
    let recordId = null;
    try {
      const atRes = await fetch(
        `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(env.AIRTABLE_TABLE)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ fields: airtableFields })
        }
      );
      const atData = await atRes.json();
      if (!atRes.ok) {
        console.error("Airtable POST error:", atRes.status, JSON.stringify(atData));
      } else {
        recordId = atData.id;
      }
    } catch (err) {
      console.error("Airtable POST failed:", err);
    }

    // ── Step 2: Score via Claude ──
    let scores = null;
    try {
      const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": env.CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1536,
          messages: [{ role: "user", content: buildScoringPrompt(answers) }]
        })
      });
      const claudeData = await claudeRes.json();
      if (!claudeRes.ok) {
        console.error("Claude API error", claudeRes.status, JSON.stringify(claudeData));
      } else if (claudeData.content && claudeData.content[0]) {
        const text = claudeData.content[0].text.trim();
        const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
        scores = JSON.parse(cleaned);
      }
    } catch (err) {
      console.error("Claude scoring failed:", err);
    }

    // ── Step 3: Update Airtable with scores + send email ──
    const tasks = [];

    if (scores && recordId) {
      tasks.push(
        fetch(
          `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(env.AIRTABLE_TABLE)}/${recordId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              fields: {
                score_operational: scores.operational,
                score_acquisition: scores.acquisition,
                score_digital: scores.digital,
                score_practice_readiness: scores.practice_readiness,
                score_overall: scores.overall,
                insight_operational: scores.insight_operational,
                insight_acquisition: scores.insight_acquisition,
                insight_digital: scores.insight_digital,
                insight_practice_readiness: scores.insight_practice_readiness,
                recommended_first_step: scores.recommended_first_step,
                overall_summary: scores.overall_summary
              }
            })
          }
        ).catch((err) => console.error("Airtable score update failed:", err))
      );
    }

    if (scores) {
      tasks.push(sendNotificationEmail(env, answers, scores, recordId));
    }

    await Promise.all(tasks);

    // Reshape for the frontend UI (expects nested dimension objects)
    if (scores) {
      const shaped = {
        overall_score: scores.overall ?? 0,
        operational: { score: scores.operational ?? 0, insight: scores.insight_operational || "" },
        acquisition: { score: scores.acquisition ?? 0, insight: scores.insight_acquisition || "" },
        digital: { score: scores.digital ?? 0, insight: scores.insight_digital || "" },
        practice_readiness: { score: scores.practice_readiness ?? 0, insight: scores.insight_practice_readiness || "" },
        executive_summary: scores.overall_summary || "",
        top_opportunities: scores.top_opportunities || [],
        recommended_next_steps: scores.recommended_next_steps || [],
        recommended_first_step: scores.recommended_first_step || "",
      };
      return jsonResponse(shaped);
    }

    return jsonResponse({ fallback: true });
  }
};

export { index_default as default };
