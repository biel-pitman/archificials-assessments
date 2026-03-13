/**
 * Market Analysis Prompt Builder — v2 (Expert-Grade)
 *
 * Generates deep, expert-level market analysis combining:
 * - Claude's domain expertise (primary source)
 * - Brave Search results (supplemental current data)
 * - Vertical-specific tool landscapes with pricing
 * - Client acquisition, SEO, and AI search (AEO/GEO) strategies
 * - Archificials competitive positioning
 *
 * Quality baseline: client-a/2_AI_Market_Analysis_LawFirms.docx
 */

// ─── Vertical-specific knowledge bases ───────────────────────────────

const VERTICAL_KNOWLEDGE = {
  'law-firm': {
    label: 'Law Firm',
    entityType: 'firm',
    searchTerms: ['legal AI', 'law firm AI', 'legal technology', 'legaltech'],
    knownTools: [
      { name: 'Harvey AI', category: 'Legal Research & Analysis', pricing: '$30,000-$300,000+/year (enterprise)', description: 'Enterprise GenAI for legal research, contract drafting, due diligence, document analysis. Fine-tuned on legal documents with proprietary LLM. Targets AmLaw 100 firms.' },
      { name: 'Westlaw AI / CoCounsel', category: 'Legal Research', pricing: '$200-$500/user/month (bundled with Westlaw)', description: 'Thomson Reuters AI overlay on Westlaw research. CoCounsel handles document summarization, analysis, deposition preparation. Transparent reasoning chains.' },
      { name: 'Lexis+ AI (Protégé)', category: 'Legal Research', pricing: '$175-$400/user/month (bundled with Lexis+)', description: 'LexisNexis conversational AI research with natural language queries. Renamed Protégé in February 2026.' },
      { name: 'Ironclad', category: 'Contract Lifecycle Management', pricing: '$50,000-$200,000+/year', description: 'AI-powered CLM — create, review, redline, risk analysis. Gartner Magic Quadrant Leader for CLM (2025). Enterprise-focused.' },
      { name: 'Spellbook', category: 'Contract Drafting', pricing: '$99-$399/user/month', description: 'AI contract drafting in Microsoft Word. GPT-4 trained on legal documents. Most accessible option for small-to-mid firms.' },
      { name: 'Luminance', category: 'Contract Analysis', pricing: '$100,000-$500,000+/year', description: 'AI contract management for high-stakes M&A negotiations. Proprietary LLM trained on 150M+ legal documents.' },
      { name: 'Everlaw', category: 'E-Discovery', pricing: '$50-$150/GB/month', description: 'Cloud-native e-discovery with AI document review and analysis. Predictable pricing based on data volume.' },
      { name: 'Relativity (RelativityOne)', category: 'E-Discovery', pricing: 'Custom enterprise pricing', description: 'Industry-standard e-discovery for complex large-scale litigation and investigations. Deep customization.' },
      { name: 'EvenUp', category: 'Personal Injury AI', pricing: '$500-$2,000/demand letter', description: 'AI demand letters and medical record analysis specifically for PI firms. Directly relevant to personal injury practices.' },
      { name: 'Clio (Manage AI / Clio Duo)', category: 'Practice Management', pricing: '$49-$149/user/month', description: 'Most widely adopted practice management for mid-size firms. AI features include drafting, summarization, time tracking.' },
      { name: 'Lawmatics', category: 'Legal CRM & Marketing', pricing: '$199-$399/month', description: 'AI-powered legal CRM: automated lead follow-up, intake workflows, email/text nurture sequences, referral tracking.' },
      { name: 'Smith.ai', category: 'Virtual Receptionist', pricing: '$300-$600/month', description: 'AI-powered live chat and virtual receptionist. Handles after-hours inquiries, qualifies leads, schedules consultations.' }
    ],
    acquisitionTools: [
      { name: 'Google Local Services Ads (LSAs)', description: 'Pay-per-lead model ($50-$150 per qualified PI lead). Google Guaranteed badge. Highest-ROI paid acquisition for PI firms.' },
      { name: 'Semrush / Ahrefs', description: 'SEO platforms with AI-enhanced keyword research, competitor analysis, rank tracking. $130-$450/month.' },
      { name: 'SurferSEO', description: 'AI content optimization scoring against top-ranking competitors. $89-$219/month.' }
    ],
    regulations: [
      'ABA Formal Opinion 512 (July 2024): Establishes standards for AI use in legal practice — competence, confidentiality, supervision, and client communication',
      'Attorney-client privilege risk: SDNY ruled (2025) AI conversations are not protected by attorney-client privilege',
      'Data breach average cost for law firms: $4.88M (2024), up 10% from 2023',
      '81% of in-house counsel worried about AI impact on privilege protection'
    ],
    marketData: {
      marketSize: '$26.28B (2025), projected $35.11B (2026)',
      growthRate: '33.63% CAGR through 2035',
      techSpendingGrowth: '9.7% in 2025 — fastest growth ever recorded',
      adoptionRate: 'Jumped from 19% (2023) to 79% (2024)',
      policyGap: 'Only 10% of firms have formal AI policies despite massive adoption'
    },
    midMarketGap: 'Enterprise tools (Harvey, Luminance, Ironclad) operate on $50K-$300K+ annual contracts designed for AmLaw 100 firms. Inaccessible to firms with 10-50 attorneys. Basic mid-market tools (Spellbook, Clio) have limited functionality. The gap is significant and represents Archificials\' primary opportunity.'
  },
  'architecture': {
    label: 'Architecture Firm',
    entityType: 'firm',
    searchTerms: ['architecture firm AI', 'AEC AI', 'building design AI', 'BIM AI'],
    knownTools: [
      { name: 'Autodesk Forma (Spacemaker)', category: 'Generative Design', pricing: '$300-$600/user/month', description: 'AI-powered site analysis, generative design for buildings, environmental analysis, and urban planning.' },
      { name: 'Midjourney / DALL-E', category: 'Visual Ideation', pricing: '$10-$60/month', description: 'AI image generation for concept visualization, mood boards, and client presentations.' },
      { name: 'Testfit', category: 'Building Configurator', pricing: 'Custom pricing', description: 'AI building configurator for real estate feasibility. Generates building layouts from site constraints.' },
      { name: 'Hypar', category: 'Computational Design', pricing: 'Free-$500/month', description: 'Cloud-based computational design platform. Parametric building generation.' },
      { name: 'Delve (Sidewalk Labs)', category: 'Generative Urban Design', pricing: 'Enterprise pricing', description: 'AI generative design for real estate development. Optimizes for multiple objectives simultaneously.' },
      { name: 'OpenAI Codex / GitHub Copilot', category: 'Computational Design Scripting', pricing: '$10-$19/user/month', description: 'AI-assisted scripting for Grasshopper, Dynamo, and computational design workflows.' },
      { name: 'Procore', category: 'Project Management', pricing: '$375-$549/month base', description: 'Construction management platform with AI document analysis and RFI processing.' },
      { name: 'Newforma Konekt', category: 'Project Information Management', pricing: '$35-$75/user/month', description: 'AI-powered project email and document management for AEC firms.' }
    ],
    acquisitionTools: [
      { name: 'Houzz Pro', description: 'Architecture-specific lead generation and project management. $65-$999/month.' },
      { name: 'Semrush', description: 'SEO and content marketing for architecture firms. $130-$450/month.' }
    ],
    regulations: [
      'AIA guidelines on AI-generated designs: liability, attribution, and professional responsibility',
      'Building code compliance verification — AI cannot replace licensed architect stamp',
      'Data security for client project files and confidential building designs',
      'Professional liability insurance implications of AI-assisted design decisions'
    ],
    marketData: {
      marketSize: '$4.2B (2025) for AI in AEC sector',
      growthRate: '28% CAGR through 2030',
      techSpendingGrowth: '12% increase in 2025',
      adoptionRate: '34% of architecture firms using AI in some capacity (2025)',
      policyGap: 'Less than 5% have formal AI governance policies'
    },
    midMarketGap: 'Enterprise solutions like Autodesk Forma are designed for large practices. Small-to-mid firms (5-30 architects) lack affordable, integrated AI solutions. Custom workflow automation represents the biggest opportunity.'
  },
  'higher-ed': {
    label: 'Higher Education Institution',
    entityType: 'institution',
    searchTerms: ['higher education AI', 'university AI', 'academic AI tools', 'EdTech AI'],
    knownTools: [
      { name: 'Canvas (Instructure)', category: 'LMS with AI', pricing: 'Institutional licensing', description: 'LMS with AI-powered analytics, automated grading assistance, and adaptive learning paths.' },
      { name: 'Anthology (Blackboard)', category: 'LMS & Student Analytics', pricing: 'Institutional licensing', description: 'AI-powered student retention analytics, early alert systems, and personalized learning.' },
      { name: 'Civitas Learning', category: 'Student Success', pricing: '$50,000-$200,000/year', description: 'Predictive analytics for student retention and enrollment management.' },
      { name: 'Salesforce Education Cloud', category: 'CRM & Enrollment', pricing: '$100-$300/user/month', description: 'AI-driven enrollment management, student lifecycle tracking, and donor engagement.' },
      { name: 'EAB Navigate', category: 'Student Success', pricing: 'Custom institutional pricing', description: 'AI-powered academic advising, student success platform with predictive analytics.' },
      { name: 'Grammarly Education', category: 'Writing Support', pricing: '$15-$25/user/month', description: 'AI writing assistance with plagiarism detection and academic integrity tools.' },
      { name: 'Turnitin', category: 'Academic Integrity', pricing: '$3-$5/student/year', description: 'AI-powered plagiarism detection with AI writing detection capabilities.' },
      { name: 'Ellucian', category: 'ERP & Administration', pricing: 'Custom institutional pricing', description: 'Cloud ERP for higher ed with AI-powered administrative automation and analytics.' }
    ],
    acquisitionTools: [
      { name: 'EAB / Cappex', description: 'Student enrollment marketing and lead generation platforms. Custom pricing.' },
      { name: 'Mongoose Cadence', description: 'AI-powered student engagement via text messaging. $5,000-$25,000/year.' }
    ],
    regulations: [
      'FERPA compliance: Student data privacy requirements for AI systems',
      'Title IV implications for AI-assisted instruction and credit hours',
      'Accreditation standards for AI-integrated curriculum delivery',
      'Institutional review board (IRB) considerations for AI research tools',
      'ADA accessibility requirements for AI-powered learning tools'
    ],
    marketData: {
      marketSize: '$6.1B (2025) for AI in higher education',
      growthRate: '36% CAGR through 2030',
      techSpendingGrowth: '8.5% increase in 2025',
      adoptionRate: '55% of institutions using AI in administrative functions (2025)',
      policyGap: 'Only 15% have comprehensive AI governance frameworks'
    },
    midMarketGap: 'Large universities have IT departments that can implement complex AI solutions. Small-to-mid institutions (1,000-10,000 students) struggle with limited technical staff, tight budgets, and vendor solutions designed for R1 universities.'
  }
};

// ─── Archificials positioning (used across all verticals) ─────────────

const ARCHIFICIALS_POSITIONING = {
  competitiveAdvantage: `Archificials operates in a unique lane: the implementation, integration, and customization layer that neither SaaS vendors nor generic consultants occupy.
- vs. SaaS vendors: They sell licenses but don't map workflows, manage change, configure integrations, or train skeptical users. Archificials is the implementation partner these vendors can't be.
- vs. Big 4 consulting (Deloitte, Accenture): A comparable engagement takes 12-18 months and costs $500K+. Archificials delivers in 8-16 weeks at a fraction of the cost.
- vs. IT shops / MSPs: They bring infrastructure management. Archificials brings AI strategy, workflow design, prompt engineering, and change management.
- vs. Solo AI consultants: Can't sustain 12-month engagements, deliver training at scale, or bring multi-disciplinary teams.`,

  engagementTiers: [
    { tier: 'Discovery & Strategy', price: '$7,500-$15,000', duration: '2-4 weeks', description: 'End-to-end workflow mapping, AI opportunity identification, prioritized implementation roadmap.' },
    { tier: 'Implementation Project', price: '$25,000-$90,000', duration: '10-24 weeks', description: 'Off-the-shelf configuration, custom build, or hybrid. Fixed scope, defined deliverables.' },
    { tier: 'Ongoing Optimization Retainer', price: '$2,000-$5,000/month', duration: 'Ongoing', description: 'Continuous improvement, new use cases, performance tuning, additional training.' },
    { tier: 'Training & Change Management', price: '$5,000-$20,000', duration: 'Standalone or bundled', description: 'AI literacy workshops, governance policy development, role-specific training, internal champion development.' }
  ],

  pricingPhilosophy: 'Archificials charges for expertise and outcomes, not hours. Scope is defined upfront. Deliverables are contractual. Adoption metrics and working systems are the measure of success.',

  vendorAgnostic: 'No commissions on software sales. Revenue comes from engagement fees, not vendor referrals. Recommendations based on actual needs, budget, and risk tolerance.'
};

// ─── Search query builder ────────────────────────────────────────────

function buildSearchQueries(assessmentData) {
  const industry = assessmentData.inst_type || assessmentData.firm_type || 'higher education';
  const name = assessmentData.inst_name || assessmentData.firm_name || 'this organization';
  const vertical = assessmentData.vertical || 'law-firm';
  const vk = VERTICAL_KNOWLEDGE[vertical] || VERTICAL_KNOWLEDGE['law-firm'];

  // More targeted queries that supplement Claude's knowledge with current data
  return [
    `"${name}" ${industry} recent news 2025 2026`,
    `AI adoption ${vk.searchTerms[0]} statistics market size 2025 2026`,
    `${vk.searchTerms[0]} implementation ROI case study results`,
    `${industry} AI compliance regulations ethics 2025 2026 new rules`,
    `AI search AEO GEO answer engine optimization ${industry} 2026`,
    `${industry} AI competitive landscape trends disruption 2026`,
    `mid-market ${industry} AI tools pricing comparison 2025 2026`
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

// ─── Market analysis prompt builder ──────────────────────────────────

function buildMarketAnalysisPrompt(assessmentData, searchResults) {
  const vertical = assessmentData.vertical || 'law-firm';
  const vk = VERTICAL_KNOWLEDGE[vertical] || VERTICAL_KNOWLEDGE['law-firm'];
  const industry = assessmentData.inst_type || assessmentData.firm_type || vk.label;
  const orgName = assessmentData.inst_name || assessmentData.firm_name || 'the organization';
  const orgSize = assessmentData.inst_size || assessmentData.firm_size || 'unknown size';

  // Flatten and cap search results — keep lean to fit Worker timing constraints
  const allResults = searchResults.flat().slice(0, 25);
  const resultsText = formatSearchResults(allResults);

  // Build known tools reference for the prompt
  const toolsReference = vk.knownTools.map(t =>
    `- ${t.name} (${t.category}): ${t.description} Pricing: ${t.pricing}`
  ).join('\n');

  const acquisitionToolsRef = vk.acquisitionTools.map(t =>
    `- ${t.name}: ${t.description}`
  ).join('\n');

  const regulationsRef = vk.regulations.map(r => `- ${r}`).join('\n');

  const engagementTiersRef = ARCHIFICIALS_POSITIONING.engagementTiers.map(t =>
    `- ${t.tier} (${t.price} | ${t.duration}): ${t.description}`
  ).join('\n');

  const systemPrompt = `You are a senior AI strategy consultant at Archificials, a consulting firm specializing in enterprise AI readiness and implementation. You are preparing a comprehensive, publication-quality market analysis for a prospective client.

Your expertise spans AI tools, market dynamics, pricing models, competitive landscapes, regulatory frameworks, and strategic positioning across ${vk.label.toLowerCase()} organizations. You have deep knowledge of the AI vendor landscape, deployment patterns, and ROI benchmarks.

CRITICAL QUALITY STANDARDS:
- Write with authority and specificity. Every claim should include specific numbers, tool names, pricing, or concrete examples.
- This analysis will be presented to C-level executives. It must demonstrate expert-level knowledge that earns trust.
- Use your own domain expertise as the PRIMARY source. The search results SUPPLEMENT your knowledge with current data points.
- Where search results provide current statistics or news, cite them with [Source: URL]. Where you use your own expertise (tool descriptions, known pricing, market dynamics), no citation needed.
- Be OPINIONATED. Tell the client what matters and what doesn't. Don't hedge unnecessarily.
- Include specific pricing for every tool mentioned. Executives need to understand cost implications.
- Write detailed, substantive paragraphs (3-5 sentences minimum), not surface-level bullets.

Output only valid JSON with the structure specified.`;

  const userPrompt = `Produce a comprehensive AI market analysis for "${orgName}", a ${orgSize} ${industry} organization.

═══════════════════════════════════════════════
REFERENCE: KNOWN ${vk.label.toUpperCase()} AI TOOLS
═══════════════════════════════════════════════
${toolsReference}

═══════════════════════════════════════════════
REFERENCE: CLIENT ACQUISITION & SEO TOOLS
═══════════════════════════════════════════════
${acquisitionToolsRef}

═══════════════════════════════════════════════
REFERENCE: REGULATORY & COMPLIANCE LANDSCAPE
═══════════════════════════════════════════════
${regulationsRef}

═══════════════════════════════════════════════
REFERENCE: MARKET DATA POINTS
═══════════════════════════════════════════════
- Market Size: ${vk.marketData.marketSize}
- Growth Rate: ${vk.marketData.growthRate}
- Tech Spending Growth: ${vk.marketData.techSpendingGrowth}
- AI Adoption Rate: ${vk.marketData.adoptionRate}
- Policy Gap: ${vk.marketData.policyGap}

═══════════════════════════════════════════════
REFERENCE: MID-MARKET OPPORTUNITY
═══════════════════════════════════════════════
${vk.midMarketGap}

═══════════════════════════════════════════════
REFERENCE: ARCHIFICIALS COMPETITIVE POSITIONING
═══════════════════════════════════════════════
${ARCHIFICIALS_POSITIONING.competitiveAdvantage}

Engagement Tiers:
${engagementTiersRef}

Pricing Philosophy: ${ARCHIFICIALS_POSITIONING.pricingPhilosophy}
Vendor Agnostic: ${ARCHIFICIALS_POSITIONING.vendorAgnostic}

═══════════════════════════════════════════════
SUPPLEMENTAL: RECENT SEARCH RESULTS (cite with [Source: URL] where used)
═══════════════════════════════════════════════
${resultsText}

═══════════════════════════════════════════════
ANALYSIS REQUIREMENTS
═══════════════════════════════════════════════

Produce a DEEP, EXPERT-LEVEL analysis covering these sections. Each section must be substantive (multiple detailed paragraphs, not surface-level summaries).

SECTION 1: EXECUTIVE SUMMARY
- Market size, growth trajectory, and adoption velocity (with specific numbers)
- The critical gap between adoption and governance
- Why this matters specifically for a ${orgSize} ${industry} organization
- The window of opportunity and urgency to act

SECTION 2: AI TOOL LANDSCAPE (${vk.label.toUpperCase()}-SPECIFIC)
For each major tool category, provide detailed reviews including:
- What it does and who it serves best
- Specific pricing (per-user, per-seat, enterprise tiers)
- Strengths and limitations
- Relevance to THIS organization specifically
- Cover at least 8-10 tools with substantive descriptions

SECTION 3: CLIENT ACQUISITION, SEO & INTAKE AI
- Digital acquisition tools specific to ${industry}
- SEO and content optimization platforms
- AI chatbots and intake automation
- Why client-facing AI often delivers faster ROI than internal workflow AI
- Specific tools with pricing

SECTION 4: AI SEARCH REVOLUTION (AEO & GEO)
- Answer Engine Optimization: how AI search engines choose cited sources
- Generative Engine Optimization: ensuring AI platforms recommend this organization
- The market shift from traditional search to AI-mediated discovery
- Specific tactics for ${industry} organizations
- Measurement and monitoring tools
- Why acting NOW creates compounding advantage

SECTION 5: MARKET SEGMENTS & COMPETITIVE DYNAMICS
- How the market segments by organization size, budget, and maturity
- What peer organizations are doing with AI
- Competitive risks of delayed adoption
- The mid-market gap and why it matters for this organization

SECTION 6: SECURITY, ETHICS & COMPLIANCE
- Industry-specific AI regulations and ethical frameworks
- Data privacy and security concerns
- Professional liability implications
- Governance requirements

SECTION 7: PRICING LANDSCAPE & COST ANALYSIS
- Total cost of enterprise AI for a ${orgSize} organization
- Subscription vs. implementation cost comparison
- Where custom implementation delivers superior value vs. off-the-shelf

SECTION 8: STRATEGIC IMPLICATIONS FOR ARCHIFICIALS
- How Archificials competes vs. SaaS vendors, Big 4, MSPs, and solo consultants
- The mid-market sweet spot
- Engagement tiers and pricing philosophy
- Why Archificials is the right partner for THIS organization

OUTPUT FORMAT - Return valid JSON only (no markdown, no explanation):
{
  "executiveSummary": {
    "marketSize": "detailed market size with numbers and growth projections",
    "adoptionTrend": "specific adoption statistics and trajectory",
    "criticalGap": "the governance/policy gap creating opportunity",
    "urgency": "why acting now matters for this specific organization"
  },
  "toolLandscape": {
    "summary": "2-3 paragraph overview of the tool landscape",
    "categories": [
      {
        "name": "category name",
        "tools": [
          {
            "name": "tool name",
            "description": "detailed 2-3 sentence description",
            "pricing": "specific pricing with tiers",
            "strengths": ["strength 1", "strength 2", "strength 3"],
            "weaknesses": ["weakness 1", "weakness 2"],
            "relevance": "specific relevance to this organization"
          }
        ]
      }
    ]
  },
  "clientAcquisition": {
    "summary": "2-3 paragraph overview of client-facing AI opportunity",
    "tools": [
      {
        "name": "tool name",
        "description": "what it does",
        "pricing": "specific pricing",
        "useCase": "how this organization should use it"
      }
    ],
    "roiCase": "why acquisition AI often delivers faster ROI than internal workflow AI"
  },
  "aiSearchRevolution": {
    "marketShift": "2-3 paragraphs on AEO/GEO transformation",
    "aeoStrategy": "specific AEO tactics for this industry",
    "geoStrategy": "specific GEO tactics for this industry",
    "measurementTools": ["tool 1", "tool 2"],
    "urgencyCase": "why acting now creates compounding advantage"
  },
  "competitorLandscape": {
    "summary": "detailed paragraph on market segmentation and competitive dynamics",
    "peerActivity": "what similar organizations are doing with AI",
    "competitiveRisks": ["risk 1 with specifics", "risk 2 with specifics"],
    "midMarketGap": "detailed description of the mid-market opportunity"
  },
  "regulatoryCompliance": {
    "summary": "overview of regulatory landscape",
    "regulations": [
      {
        "regulation": "specific regulation or standard",
        "impact": "how it affects AI deployment",
        "requirement": "what the organization must do"
      }
    ],
    "securityConsiderations": "data security and privacy concerns with specifics",
    "governanceRequirements": "what governance framework is needed"
  },
  "pricingAnalysis": {
    "enterpriseCost": "total cost estimate for full enterprise AI deployment",
    "subscriptionBreakdown": "itemized annual subscription costs",
    "implementationAlternative": "how custom implementation compares on cost",
    "costInsight": "key insight about pricing that matters for this organization"
  },
  "strategicPositioning": {
    "archificialsAdvantage": "detailed competitive positioning",
    "competitiveComparisons": "how Archificials competes vs. alternatives",
    "engagementRecommendation": "recommended entry point for this organization",
    "midMarketFit": "why Archificials is built for organizations like this"
  }
}`;

  return {
    system: systemPrompt,
    user: userPrompt
  };
}

module.exports = {
  buildSearchQueries,
  buildMarketAnalysisPrompt,
  VERTICAL_KNOWLEDGE,
  ARCHIFICIALS_POSITIONING
};
