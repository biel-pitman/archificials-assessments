/**
 * Deployment Scenarios Prompt Builder — v2 (Expert-Grade)
 *
 * Generates 6 deployment scenarios (up from 4) based on:
 * - Assessment scores and answers
 * - Market analysis from previous Claude call
 * - Organization profile (size, type, maturity)
 * - Vertical-specific tool recommendations
 * - Archificials engagement model and pricing
 *
 * Scenarios:
 * A: Off-the-Shelf AI Stack — Quick, low-risk, fastest ROI
 * B: Custom AI Platform — Long-term, bespoke, Archificials builds
 * C: Hybrid Approach (Recommended) — Best blend of speed + customization
 * D: AI-First Transformation — Full organizational transformation
 * E: AI-Powered Client Acquisition & SEO — External growth focus
 * F: AEO & GEO Infrastructure — Own AI-mediated search
 *
 * Quality baseline: client-a/4_Deployment_Scenarios_HowryBreen.docx
 */

const { VERTICAL_KNOWLEDGE, ARCHIFICIALS_POSITIONING } = require('./market-analysis.js');

/**
 * Build prompt for Claude to generate deployment scenarios
 */
function buildDeploymentScenariosPrompt(assessmentData, searchResults, marketAnalysis) {
  const vertical = assessmentData.vertical || 'law-firm';
  const vk = VERTICAL_KNOWLEDGE[vertical] || VERTICAL_KNOWLEDGE['law-firm'];
  const industry = assessmentData.inst_type || assessmentData.firm_type || vk.label;
  const orgName = assessmentData.inst_name || assessmentData.firm_name || 'Organization';
  const orgSize = assessmentData.inst_size || assessmentData.firm_size || 'medium';

  const scores = {
    operational: assessmentData.scores?.operational || 50,
    acquisition: assessmentData.scores?.acquisition || 50,
    digital: assessmentData.scores?.digital || 50,
    practice_readiness: assessmentData.scores?.practice_readiness || 50
  };
  const overallScore = Math.round((scores.operational + scores.acquisition + scores.digital + scores.practice_readiness) / 4);

  // Build tool names for scenario references
  const toolsByCategory = {};
  vk.knownTools.forEach(t => {
    if (!toolsByCategory[t.category]) toolsByCategory[t.category] = [];
    toolsByCategory[t.category].push(t);
  });

  const toolsReference = vk.knownTools.map(t =>
    `- ${t.name} (${t.category}): ${t.pricing} — ${t.description}`
  ).join('\n');

  const acquisitionToolsRef = (vk.acquisitionTools || []).map(t =>
    `- ${t.name}: ${t.description}`
  ).join('\n');

  const engagementTiersRef = ARCHIFICIALS_POSITIONING.engagementTiers.map(t =>
    `- ${t.tier} (${t.price} | ${t.duration}): ${t.description}`
  ).join('\n');

  // Extract market context from the market analysis
  let marketContextBlock = '';
  if (marketAnalysis && typeof marketAnalysis === 'object' && !marketAnalysis.raw) {
    const ma = marketAnalysis;
    marketContextBlock = `
MARKET INTELLIGENCE (from prior analysis):
- Executive Summary: ${ma.executiveSummary?.marketSize || 'Available from market research'}
- Adoption Trend: ${ma.executiveSummary?.adoptionTrend || 'High and accelerating'}
- Mid-Market Gap: ${ma.competitorLandscape?.midMarketGap || vk.midMarketGap}
- Tool Landscape: ${ma.toolLandscape?.summary?.substring(0, 500) || 'Comprehensive tool landscape analyzed'}
- AEO/GEO Opportunity: ${ma.aiSearchRevolution?.marketShift?.substring(0, 300) || 'AI search is transforming discovery'}
    `;
  } else {
    marketContextBlock = `
MARKET INTELLIGENCE:
- Market Size: ${vk.marketData.marketSize}
- Growth Rate: ${vk.marketData.growthRate}
- Adoption Rate: ${vk.marketData.adoptionRate}
- Mid-Market Gap: ${vk.midMarketGap}
    `;
  }

  const systemPrompt = `You are a senior AI strategy architect at Archificials, designing deployment pathways for a prospective client. You are preparing a document that will be shared with C-level decision makers.

CRITICAL QUALITY STANDARDS:
- Write with the authority of a consultant who has deployed AI across dozens of ${vk.label.toLowerCase()} organizations.
- Every scenario must include SPECIFIC TOOL NAMES, SPECIFIC COSTS, SPECIFIC TIMELINES, and SPECIFIC DELIVERABLES.
- Do NOT use generic descriptions like "AI tool for research." Name the actual product, its pricing, and what it does.
- Include realistic strengths AND weaknesses for every scenario. Executives respect honesty, not salesmanship.
- Costs must be realistic and detailed — break down by software, services, training, and ongoing.
- Timelines must include specific phases with concrete deliverables per phase.
- Training requirements should be role-specific, not generic.
- Each scenario's "Fit for ${orgName}" assessment must reference their actual scores and what those scores imply.
- Write substantive paragraphs (3-5 sentences), not surface-level bullets.
- The recommended scenario (C) should be clearly the most compelling, but present all options honestly.

Output only valid JSON with the structure specified. Include ALL fields for ALL 6 scenarios.`;

  const userPrompt = `Design 6 AI deployment scenarios for "${orgName}", a ${orgSize} ${industry} organization.

═══════════════════════════════════════════════
ASSESSMENT SCORES
═══════════════════════════════════════════════
- Operational Efficiency: ${scores.operational}/100
- Client/Student Acquisition: ${scores.acquisition}/100
- Digital Visibility: ${scores.digital}/100
- Practice/Institutional Readiness: ${scores.practice_readiness}/100
- Overall Readiness: ${overallScore}/100

Score Interpretation:
${scores.operational < 50 ? '⚠ LOW operational efficiency — significant room for AI workflow automation' : scores.operational < 70 ? '⬆ MODERATE operational efficiency — targeted improvements possible' : '✓ STRONG operational efficiency — optimize and extend'}
${scores.acquisition < 50 ? '⚠ LOW acquisition score — client/student pipeline needs AI-driven growth' : scores.acquisition < 70 ? '⬆ MODERATE acquisition — specific funnel improvements available' : '✓ STRONG acquisition — optimize conversion and retention'}
${scores.digital < 50 ? '⚠ LOW digital visibility — near-zero digital baseline, massive upside' : scores.digital < 70 ? '⬆ MODERATE digital presence — SEO and content gaps exist' : '✓ STRONG digital visibility — maintain and extend advantage'}
${scores.practice_readiness < 50 ? '⚠ LOW readiness — will need significant change management support' : scores.practice_readiness < 70 ? '⬆ MODERATE readiness — can absorb AI with proper training' : '✓ HIGH readiness — can move quickly on implementation'}

${marketContextBlock}

═══════════════════════════════════════════════
REFERENCE: AVAILABLE ${vk.label.toUpperCase()} AI TOOLS (use these in scenarios)
═══════════════════════════════════════════════
${toolsReference}

═══════════════════════════════════════════════
REFERENCE: CLIENT ACQUISITION TOOLS
═══════════════════════════════════════════════
${acquisitionToolsRef}

═══════════════════════════════════════════════
REFERENCE: ARCHIFICIALS ENGAGEMENT MODEL
═══════════════════════════════════════════════
${engagementTiersRef}

Pricing Philosophy: ${ARCHIFICIALS_POSITIONING.pricingPhilosophy}

═══════════════════════════════════════════════
SCENARIO REQUIREMENTS — Generate all 6 with expert-level detail
═══════════════════════════════════════════════

SCENARIO A: "Off-the-Shelf AI Stack"
- Deploy 3-5 SPECIFIC NAMED TOOLS (from the reference list) configured for ${orgName}
- Each tool recommendation must include: name, what it does for THIS org, specific pricing
- Timeline: 10-14 weeks with specific phases
- Cost: Itemized (software licenses, Archificials configuration, training)
- Training: Role-specific requirements (partners/admins, associates/staff, paralegals/support)
- 5 specific strengths (proven, fast, predictable, supported, purpose-built)
- 5 specific weaknesses (not customized, multiple vendors, no integration, generic, compounding costs)
- Fit assessment: Why this is specifically GOOD or NOT for ${orgName} given their scores

SCENARIO B: "Custom AI Platform (Archificials Build)"
- Archificials designs and builds a BESPOKE platform with 4-6 NAMED CUSTOM MODULES
- Each module must have a specific name, purpose, and capability description
- Architecture: Private deployment, firm-controlled data, integration with existing systems
- Timeline: 20-24 weeks with specific phases and deliverables
- Cost: Project fee + ongoing maintenance
- Training: Structured onboarding program with specific time commitments
- 5+ specific strengths (customized, data control, lower long-term cost, competitive moat, evolves)
- 5+ specific weaknesses (longer timeline, higher upfront cost, requires involvement, dependency)
- Fit assessment: Why this is EXCELLENT for long-term but requires commitment

SCENARIO C: "Hybrid Approach (RECOMMENDED)"
- THIS IS THE RECOMMENDED SCENARIO — make it the most compelling
- Phase 1 (Months 1-3): Deploy NAMED off-the-shelf tools for immediate wins
- Phase 2 (Months 4-8): Build NAMED custom modules for highest-value workflows
- Phase 3 (Months 9-12): Advanced capabilities and full integration
- Each phase has specific deliverables, costs, and expected outcomes
- Total cost: Broken down by phase
- Show how value delivery begins in Month 1
- 5+ strengths (immediate ROI, manageable pace, discovery-driven, best 2-3 year ROI)
- 3-4 weaknesses (complexity, longer total timeline, sustained engagement, change fatigue)
- Fit assessment: Why this is the BEST FIT for ${orgName} — be specific about their scores

SCENARIO D: "AI-First Transformation"
- Full organizational reimagination around AI
- 4-5 major business processes redesigned with specifics
- Claude or similar AI as persistent work partner
- Timeline: 18-24 months
- Highest investment estimate
- New governance roles and decision-making frameworks
- 5+ strengths (maximum advantage, future-proof, industry leadership)
- 4+ weaknesses (cost, timeline, disruption, execution risk)

SCENARIO E: "AI-Powered Client Acquisition & SEO"
- EXTERNAL GROWTH focus — client/student acquisition, not internal workflow
- Track 1: SEO & Content — specific tools, content strategy, timeline
- Track 2: Intake Automation — chatbots, CRM, follow-up sequences
- Track 3: Paid Acquisition — LSAs or equivalent, optimization
- Timeline: 12-16 weeks across all tracks
- Cost: Archificials engagement fee + monthly tool subscriptions
- Expected ROI: Quantified (e.g., one additional case/enrollment per month = $X revenue)
- Can be sold standalone OR bundled with C or D

SCENARIO F: "AEO & GEO Infrastructure"
- AI search optimization — own the AI-mediated search landscape
- Track 1: Authority Asset Activation (Months 1-2) — structured data, directories, press
- Track 2: AEO Content Architecture (Months 2-4) — Q&A pages, schema markup, topical clusters
- Track 3: GEO Citation Building (Months 3-6+) — bylines, media, third-party presence
- Investment and timeline per track
- Why acting NOW creates compounding, structural advantage
- Complementary to Scenario E (E captures intent, F ensures visibility)

OUTPUT FORMAT - Return valid JSON only (no markdown):
{
  "overview": {
    "clientProfile": "2-3 sentence profile of ${orgName} and their readiness level",
    "keyPrinciple": "Even imperfect AI deployment executed with confidence delivers more value than perfect planning that never launches",
    "whyMultipleScenarios": "paragraph explaining why different organizations need different approaches"
  },
  "scenarioA": {
    "label": "Off-the-Shelf AI Stack",
    "philosophy": "Deploy and configure existing, proven AI tools without custom development",
    "bestFor": "who this scenario is ideal for",
    "recommendedTools": [
      {
        "name": "specific tool name",
        "category": "category",
        "purpose": "what it does for THIS org",
        "estimatedCost": "specific annual cost"
      }
    ],
    "timeline": [
      {
        "phase": "Phase 1 (Weeks 1-4)",
        "focus": "description",
        "deliverables": ["deliverable 1", "deliverable 2"]
      }
    ],
    "totalDuration": "10-14 weeks",
    "costs": {
      "softwareLicenses": "annual estimate",
      "archificialsServices": "configuration and setup fee",
      "training": "training cost estimate",
      "totalYear1": "total first year",
      "yearTwoPlus": "recurring annual cost"
    },
    "trainingRequirements": [
      {
        "role": "role name",
        "hours": "X hours",
        "content": "what they learn"
      }
    ],
    "strengths": ["specific strength 1", "specific strength 2", "specific strength 3", "specific strength 4", "specific strength 5"],
    "weaknesses": ["specific weakness 1", "specific weakness 2", "specific weakness 3", "specific weakness 4"],
    "roiProjection": {
      "metric": "productivity improvement or cost savings",
      "estimate": "specific 12-month projection",
      "paybackPeriod": "estimated months to ROI"
    },
    "fitAssessment": "2-3 sentence assessment of fit for THIS organization referencing their scores"
  },
  "scenarioB": {
    "label": "Custom AI Platform (Archificials Build)",
    "philosophy": "Archificials designs and builds a custom AI platform tailored specifically to your workflows",
    "bestFor": "who this scenario is ideal for",
    "customModules": [
      {
        "name": "Module Name",
        "purpose": "what it does",
        "capabilities": ["capability 1", "capability 2"]
      }
    ],
    "architecture": "deployment architecture description — private, secure, integrated",
    "timeline": [],
    "totalDuration": "20-24 weeks",
    "costs": {
      "projectFee": "Archificials build cost",
      "ongoingMaintenance": "monthly maintenance",
      "totalYear1": "total first year",
      "yearTwoPlus": "ongoing cost (substantially lower than Scenario A)"
    },
    "trainingRequirements": [],
    "strengths": [],
    "weaknesses": [],
    "roiProjection": {
      "metric": "metric",
      "estimate": "24-month projection",
      "paybackPeriod": "months"
    },
    "fitAssessment": "assessment for THIS organization"
  },
  "scenarioC": {
    "label": "Hybrid Approach (Recommended)",
    "philosophy": "Deploy off-the-shelf for immediate wins while building custom for highest-value workflows",
    "bestFor": "most organizations — this is typically Archificials' recommendation",
    "phases": [
      {
        "name": "Phase 1: Quick Wins (Months 1-3)",
        "description": "deploy NAMED tools for immediate value",
        "tools": ["tool 1", "tool 2"],
        "deliverables": ["deliverable 1", "deliverable 2"],
        "cost": "phase cost"
      }
    ],
    "totalDuration": "12 months (but value begins Month 1)",
    "costs": {
      "phase1": "cost",
      "phase2": "cost",
      "phase3": "cost",
      "archificialsTotal": "total Archificials engagement",
      "softwareTotal": "total software costs",
      "totalYear1": "total investment"
    },
    "trainingRequirements": [],
    "strengths": [],
    "weaknesses": [],
    "roiProjection": {
      "metric": "combined approach improvement",
      "estimate": "12-month projection",
      "paybackPeriod": "months"
    },
    "fitAssessment": "why this is the BEST FIT for THIS organization — reference specific scores"
  },
  "scenarioD": {
    "label": "AI-First Transformation",
    "philosophy": "Reimagine the entire organization around AI as a persistent work partner",
    "bestFor": "well-funded, innovative leaders ready for radical transformation",
    "transformationAreas": [
      {
        "area": "business process",
        "currentState": "how it works now",
        "aiState": "how it works after transformation"
      }
    ],
    "timeline": [],
    "totalDuration": "18-24 months",
    "costs": {
      "consulting": "Archificials engagement",
      "customBuilds": "platform development",
      "changeManagement": "training and adoption",
      "totalYear1": "year 1 estimate",
      "totalProgram": "full program cost"
    },
    "governance": "new roles, steering committee, decision frameworks",
    "strengths": [],
    "weaknesses": [],
    "roiProjection": {
      "metric": "transformational impact",
      "estimate": "24-month projection",
      "paybackPeriod": "months"
    },
    "fitAssessment": "assessment for THIS organization"
  },
  "scenarioE": {
    "label": "AI-Powered Client Acquisition & SEO",
    "philosophy": "Deploy AI to transform external client/student acquisition, digital visibility, and intake automation",
    "bestFor": "organizations with low digital visibility scores seeking measurable growth",
    "tracks": [
      {
        "name": "Track name",
        "timeline": "weeks X-Y",
        "activities": ["activity 1", "activity 2"],
        "tools": ["tool with pricing"],
        "deliverables": ["deliverable 1"]
      }
    ],
    "totalDuration": "12-16 weeks",
    "costs": {
      "archificialsEngagement": "engagement fee",
      "monthlyTools": "tool subscriptions per month",
      "totalYear1": "total estimate"
    },
    "expectedROI": {
      "scenario": "quantified revenue impact from acquisition improvements",
      "paybackPeriod": "estimated days/months",
      "comparison": "comparison to internal workflow ROI timeline"
    },
    "canBundleWith": "Scenario C or D as the growth track alongside efficiency track",
    "fitAssessment": "assessment based on acquisition and digital scores"
  },
  "scenarioF": {
    "label": "AEO & GEO Infrastructure",
    "philosophy": "Ensure AI search engines cite and recommend this organization by name",
    "bestFor": "organizations with strong track records but weak digital presence seeking compounding advantage",
    "coreProblem": "what problem this solves — AI handling 30-40% of high-intent queries",
    "tracks": [
      {
        "name": "Track name",
        "timeline": "Months X-Y",
        "activities": ["activity 1", "activity 2"],
        "deliverables": ["deliverable 1"]
      }
    ],
    "totalDuration": "6+ months (compounds over time)",
    "costs": {
      "implementation": "setup and content creation",
      "ongoing": "monthly monitoring and expansion",
      "totalYear1": "total estimate"
    },
    "expectedROI": {
      "scenario": "quantified impact from AI search visibility",
      "timeToFirstResults": "days/months",
      "compoundingEffect": "why early action creates structural advantage"
    },
    "complementsScenarioE": "how E and F work together — E captures intent, F ensures visibility",
    "fitAssessment": "assessment based on digital visibility score and organizational assets"
  }
}`;

  return {
    system: systemPrompt,
    user: userPrompt
  };
}

module.exports = {
  buildDeploymentScenariosPrompt
};
