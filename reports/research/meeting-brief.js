/**
 * Meeting Brief Prompt Builder
 * 
 * Generates an internal brief for Biel before the client meeting.
 * This is NOT client-facing - it's strategy, preparation, and talking points.
 * 
 * Includes:
 * - Client background & pain points
 * - Conversation starters
 * - Recommended scenario to lead with
 * - Anticipated objections and responses
 * - Competitive pressure points
 * - Budget sensitivity assessment
 * - Recommended agenda
 */

/**
 * Build prompt for Claude to generate meeting brief
 * @param {Object} assessmentData - Assessment responses
 * @param {Object} marketAnalysis - Output from market analysis Claude call
 * @param {Object} deploymentScenarios - Output from deployment scenarios Claude call
 * @returns {Object} { system, user } prompt object
 */
function buildMeetingBriefPrompt(assessmentData, marketAnalysis, deploymentScenarios) {
  const industry = assessmentData.inst_type || assessmentData.firm_type || 'higher education';
  const orgName = assessmentData.inst_name || assessmentData.firm_name || 'Organization';
  const orgSize = assessmentData.inst_size || assessmentData.firm_size || 'medium';
  
  // Extract key insights from assessment
  const contactName = assessmentData.contact_name || 'Contact';
  const contactTitle = assessmentData.contact_title || 'Unknown role';
  const investmentLevel = assessmentData.investment_question || 'unknown';
  const urgency = assessmentData.urgency_question || 'unknown';
  
  // Extract scores
  const scores = {
    operational: assessmentData.scores?.operational || 50,
    acquisition: assessmentData.scores?.acquisition || 50,
    digital: assessmentData.scores?.digital || 50,
    practice_readiness: assessmentData.scores?.practice_readiness || 50
  };
  const overallScore = Math.round((scores.operational + scores.acquisition + scores.digital + scores.practice_readiness) / 4);
  
  const systemPrompt = `You are Archificials' head strategist preparing a concise, actionable meeting brief for Biel before a client call. This brief is for internal use only and should be candid, strategic, and tactical.

Your goal is to help Biel:
1. Understand this client's specific pain points and readiness level
2. Approach the meeting with confidence and a clear narrative
3. Anticipate objections and have strong responses ready
4. Recommend which scenario to lead with and why
5. Manage expectations around investment and timeline
6. Position Archificials as the obvious choice

Be concise, direct, and strategic. Assume Biel is an experienced sales leader who wants insights, not lengthy explanations.`;

  const userPrompt = `Prepare a concise meeting brief for Biel before the call with "${orgName}".

CLIENT PROFILE:
- Organization: ${orgName} (${orgSize} ${industry})
- Contact: ${contactName}, ${contactTitle}
- Assessment Score: ${overallScore}/100 overall readiness
  - Operational Efficiency: ${scores.operational}/100
  - Acquisition Focus: ${scores.acquisition}/100
  - Digital Visibility: ${scores.digital}/100
  - Readiness: ${scores.practice_readiness}/100

CLIENT SIGNALS:
- Investment appetite: ${investmentLevel}
- Urgency indicated: ${urgency}

MARKET INTELLIGENCE:
${marketAnalysis ? `- Industry context: ${marketAnalysis.industryOverview?.summary?.substring(0, 300) || 'From market research'}` : ''}
${marketAnalysis?.competitorLandscape?.examples?.length ? `- Competitor activity: ${marketAnalysis.competitorLandscape.examples.length} peers identified as active with AI` : ''}

DEPLOYMENT OPTIONS AVAILABLE:
${deploymentScenarios ? `- 4 scenarios have been designed (A: Off-the-shelf, B: Custom, C: Hybrid, D: Transformation)` : ''}

GENERATE A MEETING BRIEF WITH:

1. **Executive Summary** (2-3 sentences)
   - Who they are, their maturity level, and what they need

2. **Pain Points & Motivation**
   - What are their 3-4 core pain points based on assessment scores?
   - What's driving urgency? (or lack thereof)
   - Who in their org cares most about each pain point?

3. **Competitive Positioning**
   - Are they under pressure from peers/competitors?
   - What AI initiatives are peer organizations running?
   - Frame Archificials' advantage

4. **Recommended Conversation Arc**
   - Opening: Hook (relate to their specific pain point)
   - Middle: Validate their situation with market data
   - Present: [Recommended scenario - see below] as the natural fit
   - Close: Next steps and investment range

5. **Recommended Lead Scenario**
   - Which of A/B/C/D should Biel lead with? Why?
   - What's the hook for THIS organization?
   - How does it address their pain points?
   - Be explicit about why this scenario fits them

6. **Alternative Scenarios**
   - If they push back on cost: Fall back to [which scenario]
   - If they push back on timeline: Fall back to [which scenario]
   - If they're aggressive: Upgrade to [which scenario]

7. **Likely Objections & Responses**
   - Objection 1 (common for ${industry}): Response with proof point
   - Objection 2 (based on their readiness): Response with data
   - Objection 3 (budget or timeline): Response with flexibility
   - Objection 4 (competitive concern): Response with market advantage

8. **Budget & Investment Positioning**
   - Their indicated budget: ${investmentLevel} (interpret this)
   - Recommended investment range for lead scenario: $X-Y in year 1, Z for implementation
   - Payment flexibility options to mention
   - ROI messaging: Quantify payback period

9. **Team & Staffing**
   - Who on their team should be involved going forward?
   - Who has decision authority?
   - Who are champions vs. skeptics?

10. **Meeting Agenda (60 minutes suggested)**
    - 0-5min: Welcome, scope setting
    - 5-10min: Discovery question about [their main pain]
    - 10-20min: Market context and what peers are doing
    - 20-35min: Assessment results and scenarios
    - 35-50min: Deep dive on recommended scenario
    - 50-60min: Next steps, timeline, and investment

OUTPUT FORMAT - Valid JSON only:
{
  "executiveSummary": "string",
  "painPoints": [
    {
      "point": "pain point",
      "severity": "1-10 based on scores",
      "affectedPerson": "who cares about this",
      "reference": "assessment data showing this"
    }
  ],
  "competitiveContext": {
    "peerActivity": "what peers are doing",
    "urgency": "why they need to act soon",
    "archificialsAdvantage": "what we offer they don't"
  },
  "recommendedScenario": {
    "scenario": "A/B/C/D label",
    "reasoning": "why this specific client fits this scenario",
    "hook": "how to present it to them",
    "expectedReaction": "how they'll likely respond"
  },
  "alternatives": [
    {
      "if": "condition (cost, timeline, ambition)",
      "fallback": "scenario A/B/C/D",
      "pitch": "how to position it"
    }
  ],
  "objections": [
    {
      "objection": "what they'll likely say",
      "response": "Biel's response with proof/data",
      "backup": "if they push back further"
    }
  ],
  "investment": {
    "indicatedBudget": "${investmentLevel}",
    "interpretation": "what this likely means for them",
    "recommendedRange": "$X-Y first year, $Z implementation",
    "paybackPeriod": "estimated months to ROI",
    "roiMessage": "quantified benefit summary"
  },
  "staffing": {
    "champions": ["person 1", "person 2"],
    "skeptics": ["person 1"],
    "decisionMaker": "name/title",
    "teamToEngage": "who else to involve"
  },
  "meetingAgenda": [
    {
      "timeSlot": "0-5min",
      "topic": "topic",
      "goal": "what to accomplish",
      "talkingPoints": ["point1", "point2"]
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
