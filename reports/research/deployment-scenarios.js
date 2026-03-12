/**
 * Deployment Scenarios Prompt Builder
 * 
 * Generates 4 deployment scenarios based on:
 * - Assessment scores and answers
 * - Market analysis from Brave search
 * - Organization profile (size, type, maturity)
 * 
 * Scenarios:
 * A: Off-the-Shelf AI Stack - Quick, low-risk, fastest ROI
 * B: Custom AI Platform - Long-term, bespoke, Archificials builds
 * C: Hybrid Approach - Recommended blend of quick wins + custom
 * D: AI-First Transformation - Full org transformation
 */

/**
 * Build prompt for Claude to generate deployment scenarios
 * @param {Object} assessmentData - Assessment responses
 * @param {Array} searchResults - Brave search results (unused in prompt but kept for API compatibility)
 * @param {Object} marketAnalysis - Output from market analysis Claude call
 * @returns {Object} { system, user } prompt object
 */
function buildDeploymentScenariosPrompt(assessmentData, searchResults, marketAnalysis) {
  const industry = assessmentData.inst_type || assessmentData.firm_type || 'higher education';
  const orgName = assessmentData.inst_name || assessmentData.firm_name || 'Organization';
  const orgSize = assessmentData.inst_size || assessmentData.firm_size || 'medium';
  
  // Extract scores from assessment data (these should be in the answers)
  const scores = {
    operational: assessmentData.scores?.operational || 50,
    acquisition: assessmentData.scores?.acquisition || 50,
    digital: assessmentData.scores?.digital || 50,
    practice_readiness: assessmentData.scores?.practice_readiness || 50
  };
  
  const systemPrompt = `You are an enterprise AI strategy consultant for Archificials. Your role is to design realistic, cost-effective AI deployment pathways tailored to each organization's maturity level and budget.

You will generate 4 distinct scenarios with implementation timelines, cost estimates, and ROI projections. Every cost estimate and timeline should be realistic for the industry and organization size described.

Output only valid JSON with the structure specified. Include all fields.`;

  const userPrompt = `Design 4 AI deployment scenarios for "${orgName}", a ${orgSize} ${industry} organization.

ASSESSMENT INSIGHTS:
- Operational Efficiency Score: ${scores.operational}/100
- Client/Student Acquisition Score: ${scores.acquisition}/100
- Digital Visibility Score: ${scores.digital}/100
- Practice/Institutional Readiness Score: ${scores.practice_readiness}/100
- Overall Readiness: ${Math.round((scores.operational + scores.acquisition + scores.digital + scores.practice_readiness) / 4)}/100 (average)

MARKET CONTEXT:
${marketAnalysis ? `- Market trends: ${marketAnalysis.industryOverview?.summary?.substring(0, 200) || 'Reference provided'}` : '- Market context available from search phase'}
${marketAnalysis?.toolLandscape?.tools?.length ? `- Available tools in market: ${marketAnalysis.toolLandscape.tools.map(t => t.name).join(', ')}` : ''}

Generate 4 scenarios:

SCENARIO A: "Off-the-Shelf AI Stack"
- Philosophy: Deploy existing, proven tools quickly. Build internal expertise. Focus on high-ROI early wins.
- Best for: Orgs with low readiness, tight budgets, need quick proof-of-value
- Tools: List 3-4 specific existing AI platforms suitable for ${industry}
- Timeline: 3-month implementation phases (months 1-3, 4-6, 7-9, 10-12)
- Cost: Provide estimated annual software costs, internal training costs, professional services
- Implementation approach: What to automate first, team structure needed, success metrics
- Strengths: List 4-5 realistic strengths
- Weaknesses: List 3-4 realistic weaknesses
- 12-month ROI projection: Estimated EBITDA or productivity improvement %

SCENARIO B: "Custom AI Platform"
- Philosophy: Archificials designs and builds a bespoke system optimized for this organization. Highest investment, highest long-term value.
- Best for: Well-funded orgs serious about AI, want differentiation, can invest 12+ months
- Architecture: Describe a custom platform for this industry
- Timeline: 4 phases with realistic month ranges
- Cost: Project cost + ongoing maintenance, team aug with Archificials
- Implementation: What gets custom-built vs integrated, governance model, data strategy
- Strengths: List 4-5 compelling strengths (differentiation, perfect fit, etc.)
- Weaknesses: List 3-4 (cost, timeline, complexity)
- 24-month ROI projection: Estimated revenue or efficiency improvements

SCENARIO C: "Hybrid Approach (Recommended)"
- Philosophy: Start fast with off-the-shelf for immediate wins (months 1-6), then layer custom modules (months 6-12+). Best balance of speed and differentiation.
- Best for: Most organizations - this is typically Archificials' recommendation
- Phase 1 (Months 1-3): Quick wins with existing tools
- Phase 2 (Months 4-6): Expand existing tools to new use cases
- Phase 3 (Months 7-12): Archificials builds custom modules for high-value workflows
- Phase 4 (Months 13+): Platform maturity and optimization
- Total Cost: Break down by phase, total 12-month investment
- Strengths: List 4-5 (quick initial ROI, lower risk, customization, flexibility)
- Weaknesses: List 2-3 (complexity, requires good change management)
- 12-month ROI projection: Estimated improvements from combined approach

SCENARIO D: "AI-First Transformation"
- Philosophy: Reimagine the entire organization around AI. Requires executive commitment, long timeline, high investment.
- Best for: Well-funded, innovative leaders ready for radical transformation
- Transformation areas: List 4-5 major business processes that get redesigned
- Timeline: 18-24 months through 4-5 transformation phases
- Cost: Highest estimate, includes consulting, custom builds, change management, training at scale
- Governance: Describe new roles, decision-making frameworks, AI steering committee
- Strengths: List 4-5 (maximum competitive advantage, future-proofed, industry leadership)
- Weaknesses: List 3-4 (cost, timeline, organizational disruption, execution risk)
- 24-month ROI projection: Transformational impact estimate

OUTPUT FORMAT - Return valid JSON only (no markdown):
{
  "scenarioA": {
    "label": "Off-the-Shelf AI Stack",
    "philosophy": "string",
    "bestFor": "string describing ideal client profile",
    "tools": [
      {
        "name": "tool name",
        "category": "category",
        "estimatedCost": "$X/year",
        "purpose": "what it does for this org"
      }
    ],
    "timeline": [
      {
        "phase": "1 (Months 1-3)",
        "focus": "description",
        "deliverables": ["item1", "item2"]
      }
    ],
    "costs": {
      "softwareLicenses": "annual estimate",
      "internalTraining": "estimate",
      "professionalServices": "estimate",
      "totalYear1": "total estimate"
    },
    "implementationApproach": "narrative description",
    "strengths": ["strength1", "strength2"],
    "weaknesses": ["weakness1", "weakness2"],
    "roiProjection": {
      "metric": "metric (% productivity improvement, $X annual savings, etc)",
      "estimate": "12-month projection"
    }
  },
  "scenarioB": { /* same structure */ },
  "scenarioC": { /* same structure */ },
  "scenarioD": { /* same structure */ }
}`;

  return {
    system: systemPrompt,
    user: userPrompt
  };
}

module.exports = {
  buildDeploymentScenariosPrompt
};
