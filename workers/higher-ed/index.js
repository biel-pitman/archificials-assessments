// Higher Education AI Scorer - v2
// Cloudflare Worker: receives assessment answers, scores via Claude, stores in Airtable, emails notification

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

// vertical-specific constants for report trigger
const VERTICAL_SLUG = "higher-ed";
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
  const instType = a.inst_type || "";
  const mk = a.module_key || "";

  // Build institution-type-specific context block using module_key for reliable routing
  let moduleContext = "";

  if (mk === "A") {
    moduleContext = `
Institution Type Module: Research University (R1/R2)
- Data integration: ${a.research_data_integration_r1 || "N/A"}
- Grant administration: ${a.research_grant_admin_r1 || "N/A"}
- Advising load: ${a.research_advising_load_r1 || "N/A"}
- Enrollment forecasting: ${a.research_enrollment_forecast_r1 || "N/A"}
- Compliance tracking: ${a.research_compliance_r1 || "N/A"}
- Prospect engagement: ${a.research_prospect_engagement_r1 || "N/A"}
- Digital presence: ${a.research_digital_presence_r1 || "N/A"}
- Change readiness: ${a.research_change_readiness_r1 || "N/A"}`;
  } else if (mk === "B") {
    moduleContext = `
Institution Type Module: Regional Public University
- Advising capacity: ${a.regional_advising_capacity_reg || "N/A"}
- Transfer evaluation: ${a.regional_transfer_eval_reg || "N/A"}
- State reporting: ${a.regional_state_reporting_reg || "N/A"}
- Course scheduling: ${a.regional_course_scheduling_reg || "N/A"}
- Retention tracking: ${a.regional_retention_tracking_reg || "N/A"}
- Recruitment reach: ${a.regional_recruitment_reach_reg || "N/A"}
- Program visibility: ${a.regional_program_visibility_reg || "N/A"}
- Change capacity: ${a.regional_change_capacity_reg || "N/A"}`;
  } else if (mk === "C") {
    moduleContext = `
Institution Type Module: Private Comprehensive University
- Net revenue modeling: ${a.private_net_revenue_comp || "N/A"}
- Graduate enrollment: ${a.private_grad_enrollment_comp || "N/A"}
- Accreditation prep: ${a.private_accreditation_prep_comp || "N/A"}
- Alumni engagement: ${a.private_alumni_engagement_comp || "N/A"}
- Faculty workload: ${a.private_faculty_workload_comp || "N/A"}
- Prospect conversion: ${a.private_prospect_conversion_comp || "N/A"}
- Online reputation: ${a.private_online_reputation_comp || "N/A"}
- Tech governance: ${a.private_tech_governance_comp || "N/A"}`;
  } else if (mk === "D") {
    moduleContext = `
Institution Type Module: Liberal Arts College
- Small team ops: ${a.lac_small_team_ops_lib || "N/A"}
- Financial aid modeling: ${a.lac_financial_aid_modeling_lib || "N/A"}
- Faculty support: ${a.lac_faculty_support_lib || "N/A"}
- Student engagement: ${a.lac_student_engagement_lib || "N/A"}
- Donor pipeline: ${a.lac_donor_pipeline_lib || "N/A"}
- Applicant reach: ${a.lac_applicant_reach_lib || "N/A"}
- Web storytelling: ${a.lac_web_storytelling_lib || "N/A"}
- Pilot willingness: ${a.lac_pilot_willingness_lib || "N/A"}`;
  } else if (mk === "E") {
    moduleContext = `
Institution Type Module: Community or Technical College
- Student services access: ${a.cc_student_services_access_cc || "N/A"}
- Workforce alignment: ${a.cc_workforce_alignment_cc || "N/A"}
- Enrollment tracking: ${a.cc_enrollment_tracking_cc || "N/A"}
- Dual enrollment: ${a.cc_dual_enrollment_cc || "N/A"}
- Adjunct coordination: ${a.cc_adjunct_coordination_cc || "N/A"}
- Community awareness: ${a.cc_community_awareness_cc || "N/A"}
- Program findability: ${a.cc_program_findability_cc || "N/A"}
- Resource readiness: ${a.cc_resource_readiness_cc || "N/A"}`;
  } else if (mk === "F") {
    moduleContext = `
Institution Type Module: For-Profit or Career-Focused Institution
- Enrollment funnel: ${a.fp_enrollment_funnel_fp || "N/A"}
- Student completion: ${a.fp_student_completion_fp || "N/A"}
- Career placement: ${a.fp_career_placement_fp || "N/A"}
- Compliance/audit: ${a.fp_compliance_audit_fp || "N/A"}
- Program ROI: ${a.fp_program_roi_fp || "N/A"}
- Lead generation: ${a.fp_lead_generation_fp || "N/A"}
- Outcomes transparency: ${a.fp_outcomes_transparency_fp || "N/A"}
- Speed to change: ${a.fp_speed_to_change_fp || "N/A"}`;
  } else if (mk === "G") {
    moduleContext = `
Institution Type Module: Online or Distance-First Institution
- Student support: ${a.online_student_support_online || "N/A"}
- Course quality: ${a.online_course_quality_online || "N/A"}
- Engagement monitoring: ${a.online_engagement_monitoring_online || "N/A"}
- Assessment integrity: ${a.online_assessment_integrity_online || "N/A"}
- Content accessibility: ${a.online_content_accessibility_online || "N/A"}
- Student acquisition: ${a.online_student_acquisition_online || "N/A"}
- Findability: ${a.online_findability_online || "N/A"}
- Scalability: ${a.online_scalability_online || "N/A"}`;
  } else {
    // Module H: Specialized Professional School (default fallback)
    moduleContext = `
Institution Type Module: Specialized Professional School
- Clinical placement: ${a.spec_clinical_placement_spec || "N/A"}
- Accreditation compliance: ${a.spec_accreditation_compliance_spec || "N/A"}
- Outcomes tracking: ${a.spec_outcomes_tracking_spec || "N/A"}
- Simulation/lab: ${a.spec_simulation_lab_spec || "N/A"}
- Faculty practice balance: ${a.spec_faculty_practice_spec || "N/A"}
- Applicant selection: ${a.spec_applicant_selection_spec || "N/A"}
- Reputation visibility: ${a.spec_reputation_visibility_spec || "N/A"}
- Innovation capacity: ${a.spec_innovation_capacity_spec || "N/A"}`;
  }

  const instName = a.inst_name || "your institution";
  const contactFirst = (a.contact_name || "").split(" ")[0] || "";

  const systemPrompt = `You are a higher education operations strategist at Archificials, a consulting firm that helps colleges and universities streamline their operations, enrollment management, and student experience. You have just received completed assessment data from an institutional leader. Your analysis must be:

- Specific to their institution type, size, and the answers they gave
- Written for a provost, dean, VP, or president who is an education professional, not a technologist
- Direct and confident, not generic or hedging
- Free of all technology jargon
- Respectful of institutional culture: acknowledge governance, faculty involvement, and mission

NEVER use: 'AI', 'machine learning', 'LLM', 'automation', 'workflow', 'deploy', 'implement', 'integrate', 'algorithm', 'model', 'prompt', 'pipeline', 'vector', 'training data', 'fine-tuning', 'natural language', 'RAG', 'agent', 'chatbot', or any similar terms.

USE INSTEAD: 'tools that handle [specific task]', 'systems that read and organize [specific data]', 'processes that run without staff time', 'smart tools that [specific outcome]', 'technology that [specific benefit]', 'your team spends fewer hours on [task]', 'reports assembled from your existing data', 'student inquiries answered around the clock from your own information'.

Frame every insight in terms higher education leaders care about:
1. Reducing time staff spend on repetitive administrative tasks
2. Catching at-risk students earlier and intervening more effectively
3. Strengthening enrollment yield without increasing discount rates
4. Preparing for accreditation reviews with less manual effort
5. Making better decisions with connected institutional data
6. Reaching prospective students more effectively in competitive markets
7. Freeing faculty time for teaching and mentorship`;

  return `${systemPrompt}

Now analyze this higher education institution submission. Your audience is ${contactFirst || "the person"} at ${instName}. They just completed the assessment and will read your analysis immediately.

TONE AND VOICE RULES (follow strictly):
- Write as if you are speaking directly to ${contactFirst || "them"}. Use "you" and "your" naturally. Occasionally reference "${instName}" by name instead of "you/your" for variety, but never say "the institution" or "the school."
- ${contactFirst ? `Use "${contactFirst}" by name once or twice across all your text, placed naturally (not forced), to make the report feel personal. Vary where you use it so it does not feel templated.` : "Do not reference any name since none was provided."}
- Be warm, direct, and conversational. Write the way a trusted advisor would speak in a strategy meeting, not a corporate report. Avoid stiff or clinical phrasing.
- ABSOLUTE RULE: Never use em dashes. Not a single one. Use commas, periods, semicolons, or rewrite the sentence instead. This is non-negotiable.
- Never use hype words (revolutionary, cutting-edge, game-changing, transformative, unlock, supercharge, leverage, etc.). Stick to plain, specific language.
- Keep sentences short and concrete. Ground every observation in something they actually said in their answers.

Institution Profile:
- Institution name: ${a.inst_name || "N/A"}
- Contact: ${a.contact_name || "N/A"} (${a.contact_email || "N/A"})
- Institution size: ${a.inst_size || "N/A"}
- Institution type: ${instType || "N/A"}
${moduleContext}

Closing Questions:
- After-hours contact: ${a.after_hours || "N/A"}
- Intake speed: ${a.intake_speed || "N/A"}
- Urgency (1-5): ${a.urgency || "N/A"}
- Investment appetite: ${a.investment || "N/A"}
- Success vision: ${a.success_vision || "N/A"}
- Additional context: ${a.anything_else || "N/A"}

Score on four dimensions (0-100 each):
1. Operational Efficiency (35% weight): Score lower if processes are manual, data lives in silos, compliance prep is reactive, advising is overwhelmed, scheduling is negotiation-heavy. Score higher if systems are connected, reporting is automated, advising uses technology for triage, operations run with minimal manual effort.
2. Student Acquisition & Retention (25% weight): Score lower if recruitment is geographically limited, conversion relies on events and calls alone, retention is reactive, no yield modeling. Score higher if multi-channel recruitment, predictive yield, proactive retention, data-driven enrollment management.
3. Digital Visibility (20% weight): Score lower if website is outdated or inconsistent, program information is hard to find, no outcome data visible, limited SEO. Score higher if program pages are rich and current, outcome data is transparent, personalized digital experiences exist. Calibrate expectations by institution type.
4. Institutional Readiness (20% weight): Score lower if change is resisted, no governance framework for technology, no pilot culture, budget fully committed. Score higher if innovation is supported, pilot frameworks exist, cross-functional teams evaluate new tools, designated resources for improvement.

Overall = weighted average using 35/25/20/20 weights.

CRITICAL RULES FOR DIMENSION INSIGHTS (insight_operational, insight_acquisition, insight_digital, insight_practice_readiness):
- Each of the four dimension insights MUST start with a DIFFERENT opener. You have four insights; use four distinct sentence structures. NEVER start two insights the same way.
- BANNED first words: Do NOT start any insight with "You", "Your", or "You've". These are overused and feel robotic when repeated across four cards.
- Instead, vary openers across these categories (pick one from each category for each insight, never repeating a category):
  * Start with the institution name: "${instName} has built...", "${instName} is already ahead on...", "${instName}'s approach to..."
  ${contactFirst ? `* Start with the contact's name: "${contactFirst}, the way you handle...", "${contactFirst}, one area worth looking at..."` : ""}
  * Start with a specific observation: "The after-hours response process here is...", "Having a transfer credit database in place for...", "A multi-week intake cycle means..."
  * Start with a strength: "Strong use of early alerts in...", "Having advising technology in place gives...", "Centralized enrollment management is a solid foundation..."
  * Start with the gap or opportunity: "The biggest gap right now is...", "Without active digital outreach...", "Cross-department data sharing is the missing piece..."
  * Start with a contrast: "On one hand, the student support is solid. On the other...", "While admissions is data-driven, the back office is..."
- Each insight should still reference something specific from their answers and describe what is working and what the gap is.
- In the executive summary (overall_summary), mention Archificials once naturally, for example: "Working with a team like Archificials on [specific area] could help you [specific outcome]." Do not make it sound like an ad. It should read like a helpful suggestion from an advisor.
- CRITICAL RULE FOR top_opportunities: Every single opportunity MUST start by positioning Archificials (or "we" / "our team") as the one helping. Vary the phrasing across the three items so it feels natural, not templated. Examples of good openers: "Archificials can help you build...", "We can help you reduce...", "Our team excels at setting up...", "Archificials specializes in building...", "We can work with you to streamline...". Never start an opportunity with a generic imperative like "Build..." or "Reduce..." directed at the client alone. Archificials is always part of the action.
- Each opportunity should still be specific, actionable, and grounded in their actual answers.
- The recommended_first_step should be a single, concrete action they could take in the next two weeks, and it should mention Archificials as the partner to help execute it.
- After the three top_opportunities, include a "cta_line" field: a warm, conversational one-liner inviting them to schedule a free consultation to discuss their pain points and opportunities in more depth. This should feel like a friend suggesting a coffee chat, not a sales pitch. Vary the wording every time; never use the same phrasing twice.
- Never be generic. If you do not have enough information to be specific, say so honestly rather than padding with filler.
- NEVER use technology jargon. No AI, ML, automation, workflow, deploy, integrate, algorithm, model, prompt, pipeline, or similar terms. Write about business outcomes only.

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

Remember: no em dashes anywhere in your output. Not one. Use commas, periods, or semicolons instead. No technology jargon whatsoever.`;
}

// ─── Score Tier ──────────────────────────────────────────────────────────────

function scoreTier(n) {
  if (n < 25) return "Getting Started";
  if (n < 50) return "Building Foundations";
  if (n < 75) return "Accelerating";
  return "Leading";
}

// ─── Module field map (for email answer table) ──────────────────────────────

const MODULE_FIELDS = {
  A: [
    ["Data Integration", "research_data_integration_r1"],
    ["Grant Administration", "research_grant_admin_r1"],
    ["Advising Load", "research_advising_load_r1"],
    ["Enrollment Forecasting", "research_enrollment_forecast_r1"],
    ["Compliance Tracking", "research_compliance_r1"],
    ["Prospect Engagement", "research_prospect_engagement_r1"],
    ["Digital Presence", "research_digital_presence_r1"],
    ["Change Readiness", "research_change_readiness_r1"],
  ],
  B: [
    ["Advising Capacity", "regional_advising_capacity_reg"],
    ["Transfer Evaluation", "regional_transfer_eval_reg"],
    ["State Reporting", "regional_state_reporting_reg"],
    ["Course Scheduling", "regional_course_scheduling_reg"],
    ["Retention Tracking", "regional_retention_tracking_reg"],
    ["Recruitment Reach", "regional_recruitment_reach_reg"],
    ["Program Visibility", "regional_program_visibility_reg"],
    ["Change Capacity", "regional_change_capacity_reg"],
  ],
  C: [
    ["Net Revenue Modeling", "private_net_revenue_comp"],
    ["Graduate Enrollment", "private_grad_enrollment_comp"],
    ["Accreditation Prep", "private_accreditation_prep_comp"],
    ["Alumni Engagement", "private_alumni_engagement_comp"],
    ["Faculty Workload", "private_faculty_workload_comp"],
    ["Prospect Conversion", "private_prospect_conversion_comp"],
    ["Online Reputation", "private_online_reputation_comp"],
    ["Tech Governance", "private_tech_governance_comp"],
  ],
  D: [
    ["Small Team Ops", "lac_small_team_ops_lib"],
    ["Financial Aid Modeling", "lac_financial_aid_modeling_lib"],
    ["Faculty Support", "lac_faculty_support_lib"],
    ["Student Engagement", "lac_student_engagement_lib"],
    ["Donor Pipeline", "lac_donor_pipeline_lib"],
    ["Applicant Reach", "lac_applicant_reach_lib"],
    ["Web Storytelling", "lac_web_storytelling_lib"],
    ["Pilot Willingness", "lac_pilot_willingness_lib"],
  ],
  E: [
    ["Student Services Access", "cc_student_services_access_cc"],
    ["Workforce Alignment", "cc_workforce_alignment_cc"],
    ["Enrollment Tracking", "cc_enrollment_tracking_cc"],
    ["Dual Enrollment", "cc_dual_enrollment_cc"],
    ["Adjunct Coordination", "cc_adjunct_coordination_cc"],
    ["Community Awareness", "cc_community_awareness_cc"],
    ["Program Findability", "cc_program_findability_cc"],
    ["Resource Readiness", "cc_resource_readiness_cc"],
  ],
  F: [
    ["Enrollment Funnel", "fp_enrollment_funnel_fp"],
    ["Student Completion", "fp_student_completion_fp"],
    ["Career Placement", "fp_career_placement_fp"],
    ["Compliance/Audit", "fp_compliance_audit_fp"],
    ["Program ROI", "fp_program_roi_fp"],
    ["Lead Generation", "fp_lead_generation_fp"],
    ["Outcomes Transparency", "fp_outcomes_transparency_fp"],
    ["Speed to Change", "fp_speed_to_change_fp"],
  ],
  G: [
    ["Student Support", "online_student_support_online"],
    ["Course Quality", "online_course_quality_online"],
    ["Engagement Monitoring", "online_engagement_monitoring_online"],
    ["Assessment Integrity", "online_assessment_integrity_online"],
    ["Content Accessibility", "online_content_accessibility_online"],
    ["Student Acquisition", "online_student_acquisition_online"],
    ["Findability", "online_findability_online"],
    ["Scalability", "online_scalability_online"],
  ],
  H: [
    ["Clinical Placement", "spec_clinical_placement_spec"],
    ["Accreditation Compliance", "spec_accreditation_compliance_spec"],
    ["Outcomes Tracking", "spec_outcomes_tracking_spec"],
    ["Simulation/Lab", "spec_simulation_lab_spec"],
    ["Faculty Practice Balance", "spec_faculty_practice_spec"],
    ["Applicant Selection", "spec_applicant_selection_spec"],
    ["Reputation Visibility", "spec_reputation_visibility_spec"],
    ["Innovation Capacity", "spec_innovation_capacity_spec"],
  ],
};

// ─── Notification Email ─────────────────────────────────────────────────────

async function buildNotificationEmail(answers, scores, recordId, env) {
  const inst = answers.inst_name || "Unknown Institution";
  const tier = scoreTier(scores.overall);
  const mk = answers.module_key || "H";

  const row = (label, score, insight) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;">${label}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;font-weight:700;color:#1a1a2e;">${score}/100</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;">${insight || ""}</td>
    </tr>`;

  // Build answer rows
  const coreRows = [
    ["Institution Name", answers.inst_name],
    ["Contact", answers.contact_name],
    ["Email", answers.contact_email],
    ["Institution Size", answers.inst_size],
    ["Institution Type", answers.inst_type],
    ["Module", mk],
  ];

  // Get module-specific fields
  const fields = MODULE_FIELDS[mk] || MODULE_FIELDS.H;
  const moduleRows = fields.map(([label, key]) => [label, answers[key]]);

  const closingRows = [
    ["After-Hours Contact", answers.after_hours],
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
    <h1 style="margin:0;font-size:22px;">New Assessment: ${inst}</h1>
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
        ${row("Student Acquisition & Retention", scores.acquisition, scores.insight_acquisition)}
        ${row("Digital Visibility", scores.digital, scores.insight_digital)}
        ${row("Institutional Readiness", scores.practice_readiness, scores.insight_practice_readiness)}
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

  return { html, subject: `[Assessment] ${inst} | ${scores.overall}/100 (${tier}) | Module ${mk}` };
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

    if (!answers.inst_name) {
      return jsonResponse({ error: "inst_name is required" }, 400);
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
