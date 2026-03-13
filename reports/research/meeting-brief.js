/**
 * Meeting Brief Prompt Builder — v2 (Expert-Grade)
 *
 * Generates an internal meeting brief for Biel before the client meeting.
 * This is NOT client-facing — it's strategy, preparation, and talking points.
 *
 * Now includes:
 * - Deeper pain point analysis tied to specific scores
 * - Scenario E & F awareness (client acquisition, AEO/GEO)
 * - Pre-meeting preparation checklist
 * - Post-meeting follow-up plan
 * - Discovery questions tailored to assessment gaps
 *
 * Quality baseline: client-a strategic implications sections
 */

const { ARCHIFICIALS_POSITIONING } = require('./market-analysis.js');

/**
 * Build prompt for Claude to generate meeting brief
 */
function buildMeetingBriefPrompt(assessmentData, marketAnalysis, deploymentScenarios) {
  const vertical = assessmentData.vertical || 'law-firm';
  const industry = assessmentData.inst_type || assessmentData.firm_type || 'Organization';
  const orgName = assessmentData.inst_name || assessmentData.firm_name || 'Organization';
  const orgSize = assessmentData.inst_size || assessmentData.firm_size || 'medium';

  const contactName = assessmentData.contact_name || 'Contact';
  const contactTitle = assessmentData.contact_title || 'Unknown role';
  const contactEmail = assessmentData.contact_email || '';
  const investmentLevel = assessmentData.investment_question || 'unknown';
  const urgency = assessmentData.urgency_question || 'unknown';
  const openEndedResponse = assessmentData.open_ended_response || '';

  const scores = {
    operational: assessmentData.scores?.operational || 50,
    acquisition: assessmentData.scores?.acquisition || 50,
    digital: assessmentData.scores?.digital || 50,
    practice_readiness: assessmentData.scores?.practice_readiness || 50
  };
  const overallScore = Math.round((scores.operational + scores.acquisition + scores.digital + scores.practice_readiness) / 4);

  // Score interpretation helpers
  const weakestDimension = Object.entries(scores).sort((a, b) => a[1] - b[1])[0];
  const strongestDimension = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];

  // Extract market and scenario context
  let marketContext = 'Market analysis available from research phase.';
  if (marketAnalysis && typeof marketAnalysis === 'object' && !marketAnalysis.raw) {
    marketContext = `
- Market Overview: ${marketAnalysis.executiveSummary?.marketSize || 'Large and growing rapidly'}
- Adoption Trend: ${marketAnalysis.executiveSummary?.adoptionTrend || 'Accelerating'}
- Competitor Activity: ${marketAnalysis.competitorLandscape?.peerActivity || 'Peers are actively deploying AI'}
- Key Gap: ${marketAnalysis.competitorLandscape?.midMarketGap || 'Mid-market organizations are underserved'}
- AEO/GEO Opportunity: ${marketAnalysis.aiSearchRevolution?.urgencyCase || 'AI search is transforming discovery'}`;
  }

  let scenarioContext = '4-6 deployment scenarios designed.';
  if (deploymentScenarios && typeof deploymentScenarios === 'object' && !deploymentScenarios.raw) {
    const ds = deploymentScenarios;
    const recScenario = ds.scenarioC || {};
    scenarioContext = `
- Scenario A (Off-the-Shelf): ${ds.scenarioA?.costs?.totalYear1 || 'Estimated'} Year 1
- Scenario B (Custom Build): ${ds.scenarioB?.costs?.totalYear1 || 'Estimated'} Year 1
- Scenario C (Hybrid - RECOMMENDED): ${ds.scenarioC?.costs?.totalYear1 || 'Estimated'} Year 1
- Scenario D (Transformation): ${ds.scenarioD?.costs?.totalYear1 || 'Estimated'} Year 1
- Scenario E (Acquisition & SEO): ${ds.scenarioE?.costs?.totalYear1 || 'Estimated'} Year 1
- Scenario F (AEO & GEO): ${ds.scenarioF?.costs?.totalYear1 || 'Estimated'} Year 1
- Recommended Lead: Scenario C (Hybrid) — immediate wins + long-term advantage
- Fit Assessment: ${recScenario.fitAssessment || 'Best fit for most organizations'}`;
  }

  const engagementTiersRef = ARCHIFICIALS_POSITIONING.engagementTiers.map(t =>
    `- ${t.tier}: ${t.price} (${t.duration})`
  ).join('\n');

  const systemPrompt = `You are Archificials' head strategist preparing a comprehensive, candid meeting brief for Biel before a client call. This brief is INTERNAL ONLY — be direct, strategic, and tactical.

CRITICAL QUALITY STANDARDS:
- This is a strategy document for an experienced sales leader, not a generic template.
- Be SPECIFIC. Reference the client's actual scores, their stated investment appetite, and their urgency signals.
- Be CANDID. If their scores suggest they'll be resistant to change, say so and recommend how to handle it.
- Be TACTICAL. Give Biel exact opening lines, exact questions to ask, exact phrases for handling objections.
- Include discovery questions that probe the GAPS revealed by their assessment scores.
- The goal: Biel walks into this meeting feeling like he already knows the client. He has a clear narrative, a plan B, and confidence.
- Include a pre-meeting preparation checklist and a post-meeting follow-up plan.

Output only valid JSON with the structure specified.`;

  const userPrompt = `Prepare a comprehensive meeting brief for Biel's call with "${orgName}".

═══════════════════════════════════════════════
CLIENT PROFILE
═══════════════════════════════════════════════
- Organization: ${orgName} (${orgSize} ${industry})
- Contact: ${contactName}, ${contactTitle}
- Email: ${contactEmail || 'Not provided'}
- Assessment Score: ${overallScore}/100 overall readiness
  - Operational Efficiency: ${scores.operational}/100 ${scores.operational < 50 ? '⚠ WEAK' : scores.operational < 70 ? '⬆ MODERATE' : '✓ STRONG'}
  - Client/Student Acquisition: ${scores.acquisition}/100 ${scores.acquisition < 50 ? '⚠ WEAK' : scores.acquisition < 70 ? '⬆ MODERATE' : '✓ STRONG'}
  - Digital Visibility: ${scores.digital}/100 ${scores.digital < 50 ? '⚠ WEAK' : scores.digital < 70 ? '⬆ MODERATE' : '✓ STRONG'}
  - Practice/Institutional Readiness: ${scores.practice_readiness}/100 ${scores.practice_readiness < 50 ? '⚠ WEAK' : scores.practice_readiness < 70 ? '⬆ MODERATE' : '✓ STRONG'}
- Weakest dimension: ${weakestDimension[0]} (${weakestDimension[1]}/100)
- Strongest dimension: ${strongestDimension[0]} (${strongestDimension[1]}/100)

═══════════════════════════════════════════════
CLIENT SIGNALS
═══════════════════════════════════════════════
- Investment appetite: ${investmentLevel}
- Urgency indicated: ${urgency}
${openEndedResponse ? `- Open-ended response: "${openEndedResponse}"` : ''}

═══════════════════════════════════════════════
MARKET INTELLIGENCE
═══════════════════════════════════════════════
${marketContext}

═══════════════════════════════════════════════
DEPLOYMENT SCENARIOS AVAILABLE
═══════════════════════════════════════════════
${scenarioContext}

═══════════════════════════════════════════════
ARCHIFICIALS ENGAGEMENT TIERS
═══════════════════════════════════════════════
${engagementTiersRef}
Entry Point Recommendation: Discovery & Strategy ($7,500-$15,000)

═══════════════════════════════════════════════
BRIEF REQUIREMENTS
═══════════════════════════════════════════════

1. EXECUTIVE SUMMARY (3-4 sentences)
   - Who they are, their maturity level, and what they need most urgently
   - What their scores tell us about their readiness and biggest gaps
   - The strategic opportunity for Archificials

2. PAIN POINTS & MOTIVATION (4-5 pain points)
   - Each pain point must reference a SPECIFIC score dimension and what it implies
   - Include who in their organization cares most about each pain point
   - Rate severity 1-10 based on their actual scores
   - Include what's driving urgency (or explain their lack of urgency and how to create it)

3. COMPETITIVE POSITIONING
   - Are they under competitive pressure? What are peers doing?
   - How to frame Archificials' unique advantage for THIS client
   - Specific talking points about vendor-agnostic approach and mid-market focus

4. PRE-MEETING PREPARATION (before the call)
   - 3-4 specific things Biel should research or prepare
   - Look up recent news about ${orgName}
   - Review relevant compliance/regulatory updates
   - Decide which scenario to open with based on their scores

5. RECOMMENDED CONVERSATION ARC (60 minutes)
   - Opening hook (relate to their SPECIFIC weakest score area)
   - Discovery questions (8-10 targeted questions based on assessment gaps)
   - Market validation (use competitor data to create urgency)
   - Scenario presentation (lead with recommended, have fallbacks ready)
   - Close (next steps, investment range, timeline)

6. RECOMMENDED LEAD SCENARIO
   - Which of A/B/C/D/E/F should Biel lead with? Why?
   - What's the opening hook for THIS organization?
   - How does it address their specific pain points?
   - What's the expected investment range?

7. ALTERNATIVE SCENARIOS (fallback strategy)
   - If they push back on COST → fall back to [which scenario] and how to position it
   - If they push back on TIMELINE → fall back to [which scenario]
   - If they want to FOCUS ON GROWTH → pivot to Scenario E or F
   - If they're AMBITIOUS → upgrade to [which scenario]

8. LIKELY OBJECTIONS & RESPONSES (5-6 objections)
   - Each objection should be realistic for a ${orgSize} ${industry}
   - Each response must include a specific proof point, data point, or reframe
   - Include a backup response if they push back further
   - Common objections: budget constraints, internal skepticism, security/compliance concerns, timeline, "we're already using ChatGPT"

9. BUDGET & INVESTMENT POSITIONING
   - Interpret their stated investment appetite: "${investmentLevel}"
   - Recommended entry point: Discovery & Strategy engagement
   - How to position the price (value framing, not cost framing)
   - ROI messaging with quantified payback period
   - Payment flexibility options to mention

10. DISCOVERY QUESTIONS (10-12 targeted questions)
    - Questions specifically designed to probe the gaps their scores reveal
    - Each question should have a strategic purpose (why you're asking)
    - Questions about decision-making structure, budget process, existing technology
    - Questions that naturally lead into scenario presentation

11. POST-MEETING FOLLOW-UP PLAN
    - Email template outline (within 24-48 hours)
    - What to mirror back from the conversation
    - Recommended next step: Discovery Engagement proposal
    - Follow-up timeline (5-7 business days)

12. SUCCESS CRITERIA
    - What constitutes a successful meeting (3-4 measurable outcomes)
    - The meeting is NOT about closing — it's about earning the right to send a proposal

OUTPUT FORMAT - Valid JSON only:
{
  "executiveSummary": "3-4 sentences summarizing the client, their readiness, and the opportunity",
  "painPoints": [
    {
      "point": "specific pain point",
      "dimension": "which score dimension this relates to",
      "score": "the actual score",
      "severity": "1-10",
      "affectedPerson": "who in the org cares most",
      "implication": "what this score means operationally"
    }
  ],
  "competitiveContext": {
    "peerActivity": "what peers are doing with AI",
    "urgency": "why they need to act soon (or how to create urgency if they don't feel it)",
    "archificialsAdvantage": "specific advantage for THIS client"
  },
  "preMeetingChecklist": [
    {
      "task": "what to do",
      "why": "why it matters"
    }
  ],
  "conversationArc": {
    "opening": "specific opening hook tied to their weakest score",
    "discoveryPhase": "how to structure the discovery conversation",
    "marketValidation": "how to use market data to create urgency",
    "scenarioPresentation": "how to present the recommended scenario",
    "close": "how to close toward next steps"
  },
  "recommendedScenario": {
    "scenario": "A/B/C/D/E/F label",
    "reasoning": "why this specific client fits this scenario based on their scores",
    "hook": "the opening pitch for this scenario",
    "investmentRange": "expected investment",
    "expectedReaction": "how they'll likely respond"
  },
  "alternatives": [
    {
      "trigger": "condition (cost pushback, timeline concern, growth focus, ambition)",
      "fallback": "scenario label",
      "pitch": "how to position the fallback"
    }
  ],
  "objections": [
    {
      "objection": "what they'll likely say",
      "response": "Biel's response with specific proof/data",
      "backup": "if they push back further"
    }
  ],
  "investment": {
    "statedAppetite": "${investmentLevel}",
    "interpretation": "what this likely means for their budget",
    "recommendedEntry": "Discovery & Strategy ($7,500-$15,000)",
    "fullEngagementRange": "range if they commit to recommended scenario",
    "paybackPeriod": "estimated months to ROI",
    "roiMessage": "quantified benefit to use in conversation",
    "flexibilityOptions": "payment flexibility to mention if needed"
  },
  "discoveryQuestions": [
    {
      "question": "the question to ask",
      "purpose": "why you're asking this (strategic intent)",
      "expectedInsight": "what the answer reveals"
    }
  ],
  "postMeetingPlan": {
    "emailOutline": "what the follow-up email should cover",
    "mirrorBack": "reflect their stated pain points back to them",
    "proposedNextStep": "Discovery & Strategy engagement proposal",
    "followUpTimeline": "when to follow up",
    "materialsToSend": ["what documents/scenarios to attach"]
  },
  "successCriteria": [
    "measurable outcome 1",
    "measurable outcome 2",
    "measurable outcome 3",
    "measurable outcome 4"
  ],
  "meetingAgenda": [
    {
      "timeSlot": "0-5min",
      "topic": "topic",
      "goal": "what to accomplish",
      "talkingPoints": ["point 1", "point 2"]
    }
  ]
}`;

  return {
    system: systemPrompt,
    user: userPrompt
  };
}

module.exports = {
  buildMeetingBriefPrompt
};
