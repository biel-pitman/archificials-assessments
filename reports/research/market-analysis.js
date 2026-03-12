/**
 * Market Analysis Prompt Builder
 * 
 * Constructs a prompt for Claude to analyze:
 * - Industry overview and AI adoption trends
 * - Competitor landscape
 * - Market size and growth projections
 * - AI tool landscape in the industry
 * - Market gaps and opportunities
 * - Regulatory and compliance considerations
 */

function buildSearchQueries(assessmentData) {
  const industry = assessmentData.inst_type || assessmentData.firm_type || 'higher education';
  const name = assessmentData.inst_name || assessmentData.firm_name || 'this organization';
  
  return [
    `AI adoption ${industry} 2025 2026 trends statistics`,
    `${name} ${industry} overview market position`,
    `AI tools software ${industry} market size pricing landscape`,
    `${industry} AI implementation challenges regulations compliance`,
    `AI competitive advantage ${industry} case studies ROI results`
  ];
}

function formatSearchResults(results) {
  return results
    .map((item, idx) => {
      const lines = [];
      lines.push(`\n[Result ${idx + 1}]`);
      lines.push(`Title: ${item.title}`);
      lines.push(`URL: ${item.url}`);
      lines.push(`Description: ${item.description}`);
      if (item.age) {
        lines.push(`Published: ${item.age}`);
      }
      return lines.join('\n');
    })
    .join('\n');
}

/**
 * Build a prompt for Claude to generate market analysis
 * @param {Object} assessmentData - Assessment responses with firm/inst info
 * @param {Array} searchResults - Brave search results (array of result arrays per query)
 * @returns {Object} { system, user } prompt object
 */
function buildMarketAnalysisPrompt(assessmentData, searchResults) {
  const industry = assessmentData.inst_type || assessmentData.firm_type || 'higher education';
  const orgName = assessmentData.inst_name || assessmentData.firm_name || 'the organization';
  const orgSize = assessmentData.inst_size || assessmentData.firm_size || 'unknown size';
  
  // Flatten search results
  const allResults = searchResults.flat().slice(0, 50); // Cap at 50 results
  const resultsText = formatSearchResults(allResults);
  
  const systemPrompt = `You are an expert AI readiness analyst for Archificials, a consulting firm specializing in enterprise AI strategy. Your role is to synthesize real-time market research into actionable insights for organizational leaders.

Your analysis must be grounded exclusively in the provided search results. Every factual claim must have a [Source: URL] citation. Do not speculate or include information not found in the search results.

Output only valid JSON with the structure specified.`;

  const userPrompt = `Analyze the AI landscape for a ${orgSize} ${industry} organization named "${orgName}".

Based ONLY on the search results below, provide a structured market analysis covering:

1. **Industry Overview** - Current state of AI adoption, key trends, and transformation drivers in ${industry}
2. **Competitor Landscape** - Peer institutions/firms using AI, what they're doing, competitive risks
3. **Market Size & Growth** - TAM/SAM estimates, growth projections, market momentum
4. **Tool Landscape** - Existing AI solutions for ${industry}, pricing models, strengths/weaknesses
5. **Gaps & Opportunities** - Underserved needs, emerging problems, market white space
6. **Regulatory & Compliance** - Industry-specific AI regulations, data privacy concerns, governance frameworks

SEARCH RESULTS:
${resultsText}

OUTPUT FORMAT - Return valid JSON only (no markdown, no explanation):
{
  "industryOverview": {
    "summary": "paragraph with sources",
    "trends": ["trend 1 [Source: URL]", "trend 2 [Source: URL]"],
    "adoptionRate": "percentage with source"
  },
  "competitorLandscape": {
    "summary": "paragraph describing what peers are doing",
    "examples": [
      {
        "organization": "name",
        "initiative": "what they're doing",
        "source": "URL"
      }
    ]
  },
  "marketSize": {
    "tam": "TAM estimate with source",
    "sam": "SAM estimate with source",
    "growth": "projected growth rate with source"
  },
  "toolLandscape": {
    "summary": "overview of available solutions",
    "tools": [
      {
        "name": "tool name",
        "category": "category",
        "pricing": "pricing model with source",
        "strengths": ["strength 1", "strength 2"],
        "weaknesses": ["weakness 1"]
      }
    ]
  },
  "gapsOpportunities": [
    "opportunity 1 [Source: URL]",
    "opportunity 2 [Source: URL]"
  ],
  "regulatoryCompliance": {
    "regulations": ["regulation 1 [Source: URL]"],
    "dataPrivacy": "concerns with source",
    "governance": "governance considerations with source"
  }
}`;

  return {
    system: systemPrompt,
    user: userPrompt
  };
}

module.exports = {
  buildSearchQueries,
  buildMarketAnalysisPrompt
};
