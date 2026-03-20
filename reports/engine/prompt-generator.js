/**
 * Prompt Document Generator v1.0.0
 *
 * Replaces the expensive automated research pipeline (Brave Search + Claude API ≈ $5/report)
 * with a comprehensive, meticulously structured prompt document that can be pasted into
 * Claude Cowork (or similar AI tool with web search) for vastly superior research at $0 cost.
 *
 * Input: assessmentData object from Airtable (with .scores and .vertical attached)
 * Output: A single Markdown string — the complete research prompt document
 */

const { VERTICAL_KNOWLEDGE, ARCHIFICIALS_POSITIONING } = require('../research/market-analysis.js');

// ─── Score interpretation ──────────────────────────────────────────

function scoreLabel(score) {
  if (score < 40) return 'WEAK';
  if (score < 65) return 'MODERATE';
  return 'STRONG';
}

function scoreEmoji(score) {
  if (score < 40) return '⚠';
  if (score < 65) return '⬆';
  return '✓';
}

function scorePriority(score) {
  if (score < 40) return 'HIGH PRIORITY — significant room for improvement';
  if (score < 65) return 'MEDIUM PRIORITY — targeted improvements available';
  return 'LOWER PRIORITY — maintain and extend advantage';
}

// ─── Builder functions ─────────────────────────────────────────────

function buildHeader(ad) {
  const orgName = ad.inst_name || ad.firm_name || 'Client';
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return `# AI Readiness Research Brief: ${orgName}
## Prepared by Archificials Assessment Pipeline v1.0 | ${date}

---

> **How to use this document:** Copy this entire document into Claude Cowork (or any AI tool with web search enabled and extended thinking). The AI will execute all research sections, produce cited findings, and output a structured report ready for presentation assembly.

---`;
}

function buildRoleBlock(vertical) {
  const vk = VERTICAL_KNOWLEDGE[vertical] || VERTICAL_KNOWLEDGE['law-firm'];
  return `
# INSTRUCTIONS FOR AI AGENT

You are a **senior AI strategy consultant at Archificials**, a consulting firm specializing in enterprise AI readiness and implementation for ${vk.label.toLowerCase()} organizations.

You are preparing a **comprehensive, publication-quality research report** for a prospective client. This report will be presented to C-level executives and must demonstrate expert-level knowledge that earns trust and drives action.

## Your Mandate

1. **Use web search extensively.** Every section requires live research. Search for current data, verify pricing, find recent case studies, and discover competitor activity.
2. **Cite everything.** Every claim, statistic, and data point must include an inline citation: \`[Source: URL]\`. No unsourced claims.
3. **Be specific.** Include exact tool names, exact pricing, exact market figures. Executives need precision, not generalities.
4. **Be opinionated.** Tell the client what matters and what doesn't. Don't hedge. Recommend with confidence.
5. **Write substantively.** Each section should contain multiple detailed paragraphs (3-5 sentences minimum per paragraph), not surface-level bullets.
6. **Produce your output in the structured format specified in Part 2** at the end of this document.

---`;
}

function buildClientContext(ad) {
  const orgName = ad.inst_name || ad.firm_name || 'Organization';
  const orgType = ad.inst_type || ad.firm_type || 'Unknown';
  const orgSize = ad.inst_size || ad.firm_size || 'Unknown';
  const contact = ad.contact_name || 'Not provided';
  const contactTitle = ad.contact_title || '';
  const contactEmail = ad.contact_email || '';
  const s = ad.scores || {};

  const overall = s.overall || Math.round(((s.operational||0)+(s.acquisition||0)+(s.digital||0)+(s.practice_readiness||0))/4);

  return `
# PART 1: CLIENT CONTEXT & RESEARCH INSTRUCTIONS

## 1.1 Client Profile

| Field | Value |
|-------|-------|
| **Organization** | ${orgName} |
| **Type** | ${orgType} |
| **Size** | ${orgSize} |
| **Contact** | ${contact}${contactTitle ? `, ${contactTitle}` : ''} |
| **Email** | ${contactEmail || 'Not provided'} |

## 1.2 Assessment Scores

| Dimension | Score | Rating | Priority | Insight |
|-----------|-------|--------|----------|---------|
| Operational Efficiency | ${s.operational || 0}/100 | ${scoreEmoji(s.operational||0)} ${scoreLabel(s.operational||0)} | ${scorePriority(s.operational||0)} | ${s.insight_operational || 'No insight available'} |
| Client/Student Acquisition | ${s.acquisition || 0}/100 | ${scoreEmoji(s.acquisition||0)} ${scoreLabel(s.acquisition||0)} | ${scorePriority(s.acquisition||0)} | ${s.insight_acquisition || 'No insight available'} |
| Digital Visibility | ${s.digital || 0}/100 | ${scoreEmoji(s.digital||0)} ${scoreLabel(s.digital||0)} | ${scorePriority(s.digital||0)} | ${s.insight_digital || 'No insight available'} |
| Practice/Institutional Readiness | ${s.practice_readiness || 0}/100 | ${scoreEmoji(s.practice_readiness||0)} ${scoreLabel(s.practice_readiness||0)} | ${scorePriority(s.practice_readiness||0)} | ${s.insight_practice_readiness || 'No insight available'} |
| **Overall Readiness** | **${overall}/100** | | | ${s.overall_summary || ''} |

**Recommended First Step:** ${s.recommended_first_step || 'See analysis below'}

${Array.isArray(s.top_opportunities) && s.top_opportunities.length > 0 ? `**Top Opportunities:**\n${s.top_opportunities.map(o => `- ${o}`).join('\n')}` : ''}

## 1.3 Client Signals

| Signal | Response |
|--------|----------|
| **Investment Appetite** | ${ad.investment_question || 'Not specified'} |
| **Urgency Level** | ${ad.urgency_question || 'Not specified'} |
${ad.open_ended_response ? `| **Open-Ended Response** | "${ad.open_ended_response}" |` : ''}

> **Use these scores and signals throughout your research.** Every section should be personalized to this client's specific maturity level, gaps, and stated priorities. Reference their scores when making recommendations.
`;
}

function buildGeographicIntelligence(ad) {
  const orgName = ad.inst_name || ad.firm_name || 'Organization';
  const orgType = ad.inst_type || ad.firm_type || 'organization';
  return `
## 1.4 Geographic Intelligence

> **CRITICAL — EXECUTE BEFORE SECTION 5**
>
> The assessment data does not include the client's geographic location. You MUST determine it before conducting competitor research.
>
> **Step 1:** Examine the organization name "${orgName}" for geographic clues (city, state, region in the name).
>
> **Step 2:** If the name is ambiguous, search for: \`"${orgName}" ${orgType} location address\`
>
> **Step 3:** Identify the **metro area and state** where this organization operates.
>
> **Step 4:** Use this location to scope ALL competitor research in Section 5 to the same metro area / state. A client in Austin, TX must hear about Austin competitors — NOT firms in Seattle or New York.
>
> **Step 5:** If location truly cannot be determined after searching, default to national-level analysis and explicitly note: "Geographic location could not be determined; competitor analysis is national-level."
>
> **Record the determined location here in your output:** _[City, State]_

---`;
}

function buildResearchSection_ExecutiveSummary(vk) {
  return `
## SECTION 1: Executive Summary & Market Overview

### Objective
Produce a data-rich market overview that establishes the urgency and scale of AI adoption in the ${vk.label.toLowerCase()} industry. This section sets the stage for every subsequent recommendation.

### Research Queries (execute these web searches)
1. \`AI adoption ${vk.searchTerms[0]} statistics market size 2025 2026\`
2. \`${vk.searchTerms[0]} market growth forecast CAGR\`
3. \`AI ${vk.searchTerms[0]} governance policy gap statistics\`

### Reference Data (starting point — verify and update via web search)

| Metric | Known Value (verify current) |
|--------|------------------------------|
| Market Size | ${vk.marketData.marketSize} |
| Growth Rate | ${vk.marketData.growthRate} |
| Tech Spending Growth | ${vk.marketData.techSpendingGrowth} |
| AI Adoption Rate | ${vk.marketData.adoptionRate} |
| Policy Gap | ${vk.marketData.policyGap} |

### Minimum Sources
Cite at least **3 sources** published after January 2025.

### Deliverables
- 3-5 key market metrics with citations
- Market size figure and growth projection
- Adoption rate with year-over-year trend
- The critical gap between adoption speed and governance readiness
- Why this matters specifically for a firm of this client's size

### Quality Bar
A reader should walk away knowing the exact market size, how fast it's growing, what percentage of peers are adopting, and why the window to act is closing. Vague statements like "AI is growing rapidly" are insufficient — use specific numbers.
`;
}

function buildResearchSection_ToolLandscape(vk) {
  const toolsTable = vk.knownTools.map(t =>
    `| ${t.name} | ${t.category} | ${t.pricing} | ${t.description.substring(0, 80)}... |`
  ).join('\n');

  return `
## SECTION 2: AI Tool Landscape (${vk.label}-Specific)

### Objective
Provide a comprehensive review of AI tools available to ${vk.label.toLowerCase()} organizations, organized by category, with verified current pricing and relevance assessment for THIS client.

### Research Queries
1. \`best AI tools for ${vk.searchTerms[0]} 2025 2026 comparison\`
2. \`${vk.searchTerms[0]} software pricing review\`
3. \`new AI tools ${vk.searchTerms[0]} launched 2025 2026\`

### Reference Data (known tools — verify pricing is current, add any new tools discovered)

| Tool | Category | Pricing | Description |
|------|----------|---------|-------------|
${toolsTable}

### Minimum Sources
Cite at least **3 sources**. Verify at least 5 tool prices via their official websites or recent reviews.

### Deliverables
- **Tool comparison table** with columns: Tool Name, Category, Pricing (verified), Best For, Relevance to This Client (High/Medium/Low)
- Per-category summary (2-3 sentences each) explaining the category and which tools lead
- At least 8-10 tools covered with substantive descriptions
- Highlight any NEW tools launched in the last 12 months not in the reference data
- For each tool: strengths (2-3), weaknesses (1-2), and specific relevance to THIS client's size and type

### Quality Bar
An executive should be able to use this section to understand exactly what tools exist, what they cost, and which ones matter for their organization. Generic descriptions are insufficient — include specific pricing tiers, feature differentiators, and honest assessments of limitations.
`;
}

function buildResearchSection_ClientAcquisition(vk) {
  const acqToolsList = (vk.acquisitionTools || []).map(t =>
    `- **${t.name}:** ${t.description}`
  ).join('\n');

  return `
## SECTION 3: Client Acquisition & AI-Powered Growth

### Objective
Analyze how AI can transform client/student acquisition, intake, and retention. This section often delivers the fastest ROI argument because it directly impacts revenue.

### Research Queries
1. \`AI client acquisition ${vk.searchTerms[0]} case study ROI\`
2. \`AI chatbot intake automation ${vk.searchTerms[0]} 2025 2026\`
3. \`digital marketing AI tools ${vk.searchTerms[0]} lead generation\`

### Reference Data
${acqToolsList}

### Minimum Sources
Cite at least **3 sources** with real ROI case studies or statistics.

### Deliverables
- Overview paragraph: why client-facing AI often delivers faster ROI than internal workflow AI
- **Tool recommendations table**: tool name, pricing, use case for this client
- At least 1 quantified ROI case study from a similar organization
- Specific intake automation workflow description
- CRM and follow-up sequence recommendations with costs

### Quality Bar
Include at least one concrete example: "A [similar-size firm] implemented [tool] and saw [X%] increase in [metric] within [timeframe]. [Source: URL]"
`;
}

function buildResearchSection_AISearch(vk) {
  return `
## SECTION 4: AI Search Revolution (AEO & GEO)

### Objective
Explain the paradigm shift from traditional SEO to AI-mediated search (Answer Engine Optimization and Generative Engine Optimization). This is a first-mover-advantage opportunity — organizations that act now build a structural moat.

### Research Queries
1. \`answer engine optimization AEO ${vk.searchTerms[0]} 2025 2026\`
2. \`generative engine optimization GEO strategy guide\`
3. \`AI search market share ChatGPT Perplexity Google AI overview statistics 2026\`
4. \`${vk.searchTerms[0]} AI search visibility strategy\`

### Minimum Sources
Cite at least **4 sources** — this is a rapidly evolving space.

### Deliverables
- **Market shift analysis**: What percentage of queries are now AI-mediated? How fast is this growing?
- **AEO strategy**: Specific tactics for ${vk.label.toLowerCase()} organizations (structured data, FAQ pages, schema markup)
- **GEO strategy**: How to ensure AI platforms (ChatGPT, Perplexity, Gemini, Copilot) recommend this organization by name
- **Measurement tools**: What tools monitor AI search visibility (list with pricing)
- **Urgency case**: Why acting NOW creates compounding advantage — include specific data on first-mover benefits
- **Competitive gap**: How many ${vk.label.toLowerCase()} organizations currently have AEO/GEO strategies (likely <5%)

### Quality Bar
The reader should understand that AI search is not a future trend but a present reality, with specific market share data. They should have 3-5 concrete tactical steps they can take immediately.
`;
}

function buildResearchSection_CompetitorLandscape(vk, ad) {
  const orgName = ad.inst_name || ad.firm_name || 'Organization';
  const orgType = ad.inst_type || ad.firm_type || vk.label;
  const orgSize = ad.inst_size || ad.firm_size || 'medium';

  return `
## SECTION 5: Competitor Landscape (GEOGRAPHICALLY TARGETED)

### Objective
Identify what THIS client's actual local competitors are doing with AI. This section MUST use the geographic location determined in Section 1.4.

> **CRITICAL:** Use the client's geographic location from Section 1.4. Do NOT provide generic national competitor data. The client needs to know what firms in THEIR market are doing.

### Research Queries (substitute [CITY/STATE] with determined location)
1. \`"${orgType}" AI adoption [CITY/STATE] 2025 2026\`
2. \`AI technology ${vk.searchTerms[0]} [CITY/STATE] [STATE] market\`
3. \`${orgType} artificial intelligence [CITY/STATE] competitors\`
4. \`top ${orgType} [CITY/STATE] technology innovation\`

### Minimum Sources
Cite at least **3 sources** with geographic relevance. If local sources are scarce, supplement with regional/state-level data.

### Deliverables
- **Competitor matrix table** with columns: Competitor Name, Location, Known AI Tools/Initiatives, Estimated AI Maturity (Early/Developing/Advanced), Source
- At least 3-5 named competitors in the client's geographic market
- **Gap analysis**: Where does ${orgName} stand relative to local competitors?
- **Competitive risks**: 3-4 specific risks of delayed AI adoption in this market
- **Market segmentation**: How ${orgSize} organizations in this market compare to larger/smaller peers
- **Mid-market opportunity**: ${vk.midMarketGap}

### Quality Bar
The client should recognize the competitor names. If you cannot find specific local competitors using AI, note this gap and explain what the general competitive landscape looks like for ${orgSize} ${orgType} organizations in that market. Never fabricate competitor names.
`;
}

function buildResearchSection_RegulatoryCompliance(vk) {
  const regsRef = vk.regulations.map(r => `- ${r}`).join('\n');

  return `
## SECTION 6: Regulatory & Compliance Landscape

### Objective
Document the regulatory framework that governs AI deployment in ${vk.label.toLowerCase()} organizations. Compliance is often the #1 concern for C-level decision makers.

### Research Queries
1. \`AI regulations ${vk.searchTerms[0]} compliance 2025 2026\`
2. \`${vk.searchTerms[0]} AI ethics policy requirements new rules\`
3. \`AI data privacy ${vk.searchTerms[0]} liability 2026\`

### Reference Data (verify and update)
${regsRef}

### Minimum Sources
Cite at least **3 sources** including primary regulatory/standards body publications.

### Deliverables
- **Regulation table** with columns: Regulation/Standard, Issuing Body, Date, Key Requirement, Impact on AI Deployment, Compliance Deadline (if any)
- At least 4-5 regulations/standards covered
- **Security considerations**: Data privacy and confidentiality risks specific to this vertical
- **Governance framework requirements**: What policies and procedures the organization needs
- **Compliance checklist**: 5-7 action items for responsible AI deployment
- **Liability implications**: Professional liability and insurance considerations

### Quality Bar
An executive should be able to hand this section to their compliance officer and have a clear starting point. Include specific regulation names, dates, and requirements — not vague references to "ethical considerations."
`;
}

function buildResearchSection_PricingAnalysis(vk, ad) {
  const orgSize = ad.inst_size || ad.firm_size || 'medium';

  return `
## SECTION 7: Pricing Analysis & Cost Benchmarks

### Objective
Provide realistic cost benchmarks for AI implementation at a ${orgSize} ${vk.label.toLowerCase()} organization. Executives need to understand total cost of ownership, not just subscription fees.

### Research Queries
1. \`AI implementation cost ${vk.searchTerms[0]} ${orgSize} budget 2025 2026\`
2. \`${vk.searchTerms[0]} technology spending benchmarks survey\`
3. \`AI ROI ${vk.searchTerms[0]} payback period case study\`

### Minimum Sources
Cite at least **2 sources** with pricing or cost benchmark data.

### Deliverables
- **Enterprise cost estimate**: Total cost range for comprehensive AI deployment at this organization's size
- **Subscription breakdown**: Itemized annual costs for recommended tool stack (use pricing from Section 2)
- **Implementation vs. SaaS comparison**: Cost comparison of off-the-shelf subscriptions vs. custom implementation over 3 years
- **Key cost insight**: The most important pricing insight for this specific organization (based on their investment appetite signal)
- **Budget recommendation**: Recommended first-year budget range with phased approach

### Quality Bar
Include specific dollar amounts, not ranges so wide they're meaningless. If a tool costs "$49-$149/user/month," calculate what that means for an organization of this size.
`;
}

function buildResearchSection_StrategicPositioning() {
  const tiers = ARCHIFICIALS_POSITIONING.engagementTiers.map(t =>
    `| ${t.tier} | ${t.price} | ${t.duration} | ${t.description} |`
  ).join('\n');

  return `
## SECTION 8: Strategic Positioning & Archificials Fit

### Objective
Position Archificials as the ideal implementation partner for this organization. This section is about WHY the client needs a partner (not just tools) and why Archificials specifically.

### Reference Data (use as-is — this is Archificials' positioning, not research)

**Competitive Advantage:**
${ARCHIFICIALS_POSITIONING.competitiveAdvantage}

**Engagement Tiers:**

| Tier | Price | Duration | Description |
|------|-------|----------|-------------|
${tiers}

**Pricing Philosophy:** ${ARCHIFICIALS_POSITIONING.pricingPhilosophy}

**Vendor Agnostic:** ${ARCHIFICIALS_POSITIONING.vendorAgnostic}

### Deliverables
- **Why a partner, not just tools**: 2-3 paragraphs on why SaaS subscriptions alone fail without implementation expertise
- **Competitive comparisons**: How Archificials competes vs. Big 4 consulting, SaaS vendors, IT shops, and solo consultants
- **Engagement recommendation**: Recommended entry point for THIS organization based on their scores
- **Mid-market fit**: Why Archificials is specifically built for organizations of this size and maturity

### Quality Bar
This should read as strategic insight, not a sales pitch. Show the reader WHY the implementation gap exists and how it specifically affects organizations at their maturity level.
`;
}

function buildDeploymentScenarios(vk, ad) {
  const orgName = ad.inst_name || ad.firm_name || 'Organization';
  const orgSize = ad.inst_size || ad.firm_size || 'medium';
  const s = ad.scores || {};

  const toolsList = vk.knownTools.map(t =>
    `- ${t.name} (${t.category}): ${t.pricing}`
  ).join('\n');

  const acqToolsList = (vk.acquisitionTools || []).map(t =>
    `- ${t.name}: ${t.description}`
  ).join('\n');

  const tiers = ARCHIFICIALS_POSITIONING.engagementTiers.map(t =>
    `- ${t.tier}: ${t.price} (${t.duration})`
  ).join('\n');

  return `
## SECTION 9: Deployment Scenarios (A through F)

### Objective
Design 6 AI deployment scenarios of increasing complexity and investment, each tailored to ${orgName}'s specific assessment scores. Every scenario must include SPECIFIC NAMED TOOLS with SPECIFIC PRICING and REALISTIC TIMELINES.

### Client Score Context (use this to customize each scenario)
- Operational Efficiency: ${s.operational||0}/100 — ${scoreLabel(s.operational||0)}. ${(s.operational||0) < 50 ? 'Significant room for AI workflow automation. Prioritize in Scenarios A and C.' : (s.operational||0) < 65 ? 'Targeted improvements possible. Include workflow tools in most scenarios.' : 'Already strong. Focus scenarios on extending advantage rather than basic automation.'}
- Client/Student Acquisition: ${s.acquisition||0}/100 — ${scoreLabel(s.acquisition||0)}. ${(s.acquisition||0) < 50 ? 'Major growth opportunity. Scenario E is critical.' : (s.acquisition||0) < 65 ? 'Room for AI-powered growth. Include acquisition tools in C and E.' : 'Strong pipeline. Optimize rather than build from scratch.'}
- Digital Visibility: ${s.digital||0}/100 — ${scoreLabel(s.digital||0)}. ${(s.digital||0) < 50 ? 'Near-zero digital presence. AEO/GEO (Scenario F) has massive upside.' : (s.digital||0) < 65 ? 'Digital gaps exist. SEO and AEO improvements in Scenarios E and F.' : 'Strong digital presence. Scenario F for compounding returns and moat building.'}
- Practice/Institutional Readiness: ${s.practice_readiness||0}/100 — ${scoreLabel(s.practice_readiness||0)}. ${(s.practice_readiness||0) < 50 ? 'Will need significant change management support. Budget extra training time in all scenarios.' : (s.practice_readiness||0) < 65 ? 'Can absorb AI with proper training. Standard onboarding sufficient.' : 'High readiness. Can move quickly on implementation.'}

### Available Tools (use these in your scenarios)
${toolsList}

### Client Acquisition Tools
${acqToolsList}

### Archificials Engagement Tiers
${tiers}

### Scenario Requirements

For EACH of the 6 scenarios below, provide:
1. **Label and philosophy** (1-2 sentences)
2. **Recommended tools** with specific names, purposes, and annual costs
3. **Timeline** with specific phases, durations, and deliverables per phase
4. **Total costs** broken down: software licenses, Archificials services, training, Year 1 total, Year 2+ recurring
5. **Strengths** (5 specific advantages)
6. **Weaknesses** (4 specific limitations — be honest)
7. **ROI projection** with metric, 12-month estimate, and payback period in months
8. **Fit assessment** for ${orgName} specifically, referencing their scores above

**Scenario A: "Off-the-Shelf AI Stack"** — Deploy 3-5 proven tools, configured by Archificials. Quick wins, lowest risk. Timeline: 10-14 weeks. Best for organizations wanting immediate results.

**Scenario B: "Custom AI Platform (Archificials Build)"** — Bespoke platform with 4-6 custom modules. Private deployment, firm-controlled data. Timeline: 20-24 weeks. Best for organizations wanting competitive differentiation.

**Scenario C: "Hybrid Approach" (RECOMMENDED)** — THIS IS THE RECOMMENDED SCENARIO. Phase 1 (months 1-3): deploy named off-the-shelf tools. Phase 2 (months 4-8): build custom modules for highest-value workflows. Phase 3 (months 9-12): advanced capabilities. Make this the MOST COMPELLING option. Show how value delivery begins Month 1.

**Scenario D: "AI-First Transformation"** — Full organizational reimagination. 4-5 major business processes redesigned. Timeline: 18-24 months. Highest investment. Include new governance roles and decision-making frameworks.

**Scenario E: "AI-Powered Client Acquisition & SEO"** — External growth focus with 3 tracks: (1) SEO & Content, (2) Intake Automation, (3) Paid Acquisition. Timeline: 12-16 weeks. Include quantified expected ROI (e.g., one additional case/enrollment per month = $X revenue). Can bundle with C or D.

**Scenario F: "AEO & GEO Infrastructure"** — AI search optimization with 3 tracks: (1) Authority Asset Activation (months 1-2), (2) AEO Content Architecture (months 2-4), (3) GEO Citation Building (months 3-6+). First-mover advantage creates compounding, structural moat. Complements Scenario E. Include expected ROI with compounding effect explanation.
`;
}

function buildMeetingBrief(ad) {
  const orgName = ad.inst_name || ad.firm_name || 'Organization';
  const orgSize = ad.inst_size || ad.firm_size || 'medium';
  const orgType = ad.inst_type || ad.firm_type || 'organization';
  const contact = ad.contact_name || 'Contact';
  const contactTitle = ad.contact_title || '';
  const s = ad.scores || {};
  const overall = s.overall || Math.round(((s.operational||0)+(s.acquisition||0)+(s.digital||0)+(s.practice_readiness||0))/4);

  const dims = [
    { name: 'Operational Efficiency', score: s.operational || 0 },
    { name: 'Client/Student Acquisition', score: s.acquisition || 0 },
    { name: 'Digital Visibility', score: s.digital || 0 },
    { name: 'Practice/Institutional Readiness', score: s.practice_readiness || 0 }
  ];
  dims.sort((a, b) => a.score - b.score);

  return `
## SECTION 10: Internal Meeting Brief (for Archificials Team Only)

### Objective
Prepare an internal strategy brief for the upcoming client meeting with ${orgName}. This is NOT client-facing — be direct, strategic, and tactical.

### Client Quick Profile
- **${orgName}** — ${orgSize} ${orgType}, overall readiness ${overall}/100
- **Contact:** ${contact}${contactTitle ? ` (${contactTitle})` : ''}
- **Weakest dimension:** ${dims[0].name} (${dims[0].score}/100)
- **Strongest dimension:** ${dims[3].name} (${dims[3].score}/100)
- **Investment appetite:** ${ad.investment_question || 'Unknown'}
- **Urgency:** ${ad.urgency_question || 'Unknown'}
${ad.open_ended_response ? `- **Open-ended response:** "${ad.open_ended_response}"` : ''}

### Deliverables
1. **Executive summary** (3-4 sentences): who they are, maturity level, biggest gaps, strategic opportunity
2. **Pain points** (4-5): each tied to a specific score dimension with severity rating 1-10
3. **Pre-meeting checklist**: 3-4 things to research/prepare before the call
4. **Conversation arc** (60 minutes): opening hook (tied to weakest score), discovery phase, market validation, scenario presentation, close
5. **Recommended lead scenario**: Which of A-F to lead with and why, with specific opening hook
6. **Alternative scenarios**: Fallback strategy for cost pushback, timeline concerns, growth focus, or ambition
7. **Likely objections** (5-6): Realistic objections for a ${orgSize} ${orgType} with specific responses and backup responses
8. **Budget positioning**: Interpret their investment appetite, recommend entry point (Discovery & Strategy: $7,500-$15,000), ROI framing
9. **Discovery questions** (10-12): Targeted questions that probe assessment gaps, each with strategic purpose
10. **Post-meeting follow-up plan**: Email outline, mirroring, proposed next step, timeline
11. **Success criteria**: 3-4 measurable outcomes (the meeting is about earning the right to send a proposal, NOT closing)
`;
}

function buildOutputFormat() {
  return `
---

# PART 2: OUTPUT FORMAT SPECIFICATION

## Structure

Produce your report as **structured Markdown** with the following exact section hierarchy. Each section header must match exactly for downstream processing.

\`\`\`
# AI Readiness Research Report: [Client Name]

## 1. Executive Summary & Market Overview
[Paragraphs with inline citations]
### Key Metrics
| Metric | Value | Source |
[Table of 3-5 key market metrics]

## 2. AI Tool Landscape
### 2.1 [Category Name]
[Category overview paragraph]
#### Tool Comparison
| Tool | Category | Pricing | Best For | Relevance | Strengths | Weaknesses |
[Comprehensive tool table]

## 3. Client Acquisition & AI-Powered Growth
[Analysis paragraphs with tool recommendations table]

## 4. AI Search Revolution (AEO & GEO)
### 4.1 Market Shift
### 4.2 AEO Strategy
### 4.3 GEO Strategy
### 4.4 Measurement & Tools
### 4.5 Urgency Case

## 5. Competitor Landscape
### Client Location: [City, State]
### Competitor Matrix
| Competitor | Location | AI Tools/Initiatives | Maturity | Source |
### Gap Analysis
### Competitive Risks

## 6. Regulatory & Compliance
### Regulation Table
| Regulation | Body | Date | Requirement | Impact | Deadline |
### Compliance Checklist

## 7. Pricing Analysis
### Cost Benchmarks
### Tool Stack Cost Estimate
| Tool | Annual Cost | Notes |
### Implementation vs. SaaS Comparison (3-year)

## 8. Strategic Positioning
[Archificials positioning analysis]

## 9. Deployment Scenarios
### Scenario A: Off-the-Shelf AI Stack
#### Tools & Costs
| Tool | Purpose | Annual Cost |
#### Timeline
| Phase | Duration | Deliverables |
#### Strengths / Weaknesses
#### ROI Projection
#### Fit Assessment

[Repeat for Scenarios B through F]

### Investment Overview
| Scenario | Year 1 Cost | Payback | Best For |
[Summary comparison table]

## 10. Meeting Brief (Internal)
[Complete meeting preparation document]

## References
[Numbered list of all sources cited]
\`\`\`

## Table Format
Use pipe-delimited Markdown tables. Keep columns aligned. Include headers.

## Chart Data
For any quantitative comparison that would benefit from visualization, include a JSON code block labeled with the chart type:

\`\`\`json:chart-radar
{
  "title": "AI Readiness Scores",
  "dimensions": ["Operational", "Acquisition", "Digital", "Readiness"],
  "values": [35, 62, 71, 45]
}
\`\`\`

Include chart data blocks for:
- Dimension scores radar chart
- Tool cost comparison bar chart
- ROI projection over 24 months (line chart data)
- Scenario cost comparison

## Citation Format
All claims must include inline citations: \`[Source: URL]\`
Include a numbered References section at the end of the report.

## Images
When you find relevant images during research (charts, infographics, tool screenshots), include the image URL with this format:
\`![Description](URL)\`
Include attribution: \`*Source: [Publication Name](URL)*\`

## Visual Presentation Brand Rules (CRITICAL)

If you are asked to create a visual presentation, web page, or infographic from this research, you MUST follow these branding rules EXACTLY. Archificials has a strict brand palette — **NO blues, NO greens, NO reds, NO teals, NO purples** are allowed ANYWHERE.

**Archificials Brand Palette (ONLY these colors):**
| Color Name      | Hex Code   | Usage                                     |
|-----------------|------------|-------------------------------------------|
| Black           | \`#000000\` | Headers, table headers, primary text       |
| Burnt Caramel   | \`#C9640B\` | Primary accent, buttons, highlights, links |
| Grey            | \`#808182\` | Secondary text, captions, borders          |
| Platinum        | \`#EBEBEB\` | Page background, card backgrounds          |
| Graphite        | \`#333333\` | Body text, paragraphs                      |
| White           | \`#FFFFFF\` | Card backgrounds, contrast areas           |

**Orange Gradient Tiers** (for score-based visualization — darker = more urgent):
| Tier            | Hex Code   | When to Use                    |
|-----------------|------------|--------------------------------|
| Critical (0-39) | \`#8B4507\` | Darkest orange, highest urgency |
| Moderate (40-54)| \`#C9640B\` | Primary orange, medium urgency  |
| Developing (55-64)| \`#D4891F\` | Medium-light orange            |
| Strong (65+)    | \`#E8A84C\` | Lightest orange, lowest urgency |
| Tint/Background | \`rgba(201,100,11,0.08)\` | Subtle orange card fills |

**Typography:** Use Inter (sans-serif) for body, Merriweather (serif) for headings.

**Absolute prohibitions:** Do NOT use Tailwind default colors (bg-blue-*, bg-green-*, bg-red-*, etc.). Do NOT use emerald, rose, teal, indigo, or any non-brand hue. If a chart or badge needs color differentiation, use ONLY the orange gradient tiers + grey + black.
`;
}

function buildQualityRequirements() {
  return `
---

# PART 3: SOURCE & QUALITY REQUIREMENTS

## Citation Requirements
- **Every statistic, market figure, and factual claim** must include an inline citation with a clickable URL: \`[Source: URL]\`
- **Minimum sources per section:** 3 (except Section 8 which uses Archificials' own positioning data)
- **Total minimum sources for entire report:** 25+
- Include a numbered References section at the end

## Recency Requirements
- **Preferred:** Sources published after January 2025
- **Acceptable:** Sources from 2024 if more recent data is unavailable
- **Flag explicitly:** Any data older than 24 months with a note: "(Note: 2023 data — verify for updates)"
- **Tool pricing:** Must be verified against current vendor websites or recent (2025-2026) reviews

## Geographic Relevance
- **Section 5 (Competitor Landscape):** MUST use geographically relevant data (see Section 1.4)
- **All sections:** Prefer regional/national data for the client's country; flag international data clearly

## Image & Visual Requirements
- Include URLs for relevant images found during research (charts, infographics, logos)
- Attribution required for all images
- Prefer high-resolution sources (official publications, vendor materials)

## Writing Style
- **NEVER use em dashes (—) or en dashes (–) anywhere in the output.** Use commas, semicolons, colons, or parentheses instead. This is a strict formatting requirement.
- **Do NOT use alarmist or fear-based language.** Avoid phrases like "Action Required", "URGENT", "Critical Warning", or similar pressure tactics. Present findings as professional insights, not threats. The tone should be consultative and confident, not aggressive.

## Quality Standards
- **Substantive paragraphs:** 3-5 sentences minimum per paragraph. No filler.
- **Specific numbers:** "$26.28B" not "billions of dollars"
- **Named tools:** "Harvey AI ($30K-$300K/year)" not "enterprise AI tools"
- **Honest assessment:** Include genuine weaknesses and limitations, not just sales language
- **Personalized:** Reference the client's specific scores and signals throughout
- **Actionable:** Every section should include specific recommendations, not just observations

## Length Guidelines
- **Total report:** 8,000-15,000 words
- **Per section:** 500-1,500 words depending on complexity
- **Tables:** At least 6-8 data tables throughout the report
- **Meeting brief (Section 10):** 1,500-2,500 words (this is the most tactical section)

---

*End of research brief. Begin research execution now.*
`;
}

// ─── Main export ───────────────────────────────────────────────────

function generatePromptDocument(assessmentData) {
  const vertical = assessmentData.vertical || 'law-firm';
  const vk = VERTICAL_KNOWLEDGE[vertical] || VERTICAL_KNOWLEDGE['law-firm'];

  const sections = [
    buildHeader(assessmentData),
    buildRoleBlock(vertical),
    buildClientContext(assessmentData),
    buildGeographicIntelligence(assessmentData),
    buildResearchSection_ExecutiveSummary(vk),
    buildResearchSection_ToolLandscape(vk),
    buildResearchSection_ClientAcquisition(vk),
    buildResearchSection_AISearch(vk),
    buildResearchSection_CompetitorLandscape(vk, assessmentData),
    buildResearchSection_RegulatoryCompliance(vk),
    buildResearchSection_PricingAnalysis(vk, assessmentData),
    buildResearchSection_StrategicPositioning(),
    buildDeploymentScenarios(vk, assessmentData),
    buildMeetingBrief(assessmentData),
    buildOutputFormat(),
    buildQualityRequirements()
  ];

  return sections.join('\n');
}

module.exports = { generatePromptDocument };
