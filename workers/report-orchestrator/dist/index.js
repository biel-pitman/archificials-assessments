var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// reports/research/market-analysis.js
var require_market_analysis = __commonJS({
  "reports/research/market-analysis.js"(exports, module) {
    var VERTICAL_KNOWLEDGE = {
      "law-firm": {
        label: "Law Firm",
        entityType: "firm",
        searchTerms: ["legal AI", "law firm AI", "legal technology", "legaltech"],
        knownTools: [
          { name: "Harvey AI", category: "Legal Research & Analysis", pricing: "$30,000-$300,000+/year (enterprise)", description: "Enterprise GenAI for legal research, contract drafting, due diligence, document analysis. Fine-tuned on legal documents with proprietary LLM. Targets AmLaw 100 firms." },
          { name: "Westlaw AI / CoCounsel", category: "Legal Research", pricing: "$200-$500/user/month (bundled with Westlaw)", description: "Thomson Reuters AI overlay on Westlaw research. CoCounsel handles document summarization, analysis, deposition preparation. Transparent reasoning chains." },
          { name: "Lexis+ AI (Prot\xE9g\xE9)", category: "Legal Research", pricing: "$175-$400/user/month (bundled with Lexis+)", description: "LexisNexis conversational AI research with natural language queries. Renamed Prot\xE9g\xE9 in February 2026." },
          { name: "Ironclad", category: "Contract Lifecycle Management", pricing: "$50,000-$200,000+/year", description: "AI-powered CLM \u2014 create, review, redline, risk analysis. Gartner Magic Quadrant Leader for CLM (2025). Enterprise-focused." },
          { name: "Spellbook", category: "Contract Drafting", pricing: "$99-$399/user/month", description: "AI contract drafting in Microsoft Word. GPT-4 trained on legal documents. Most accessible option for small-to-mid firms." },
          { name: "Luminance", category: "Contract Analysis", pricing: "$100,000-$500,000+/year", description: "AI contract management for high-stakes M&A negotiations. Proprietary LLM trained on 150M+ legal documents." },
          { name: "Everlaw", category: "E-Discovery", pricing: "$50-$150/GB/month", description: "Cloud-native e-discovery with AI document review and analysis. Predictable pricing based on data volume." },
          { name: "Relativity (RelativityOne)", category: "E-Discovery", pricing: "Custom enterprise pricing", description: "Industry-standard e-discovery for complex large-scale litigation and investigations. Deep customization." },
          { name: "EvenUp", category: "Personal Injury AI", pricing: "$500-$2,000/demand letter", description: "AI demand letters and medical record analysis specifically for PI firms. Directly relevant to personal injury practices." },
          { name: "Clio (Manage AI / Clio Duo)", category: "Practice Management", pricing: "$49-$149/user/month", description: "Most widely adopted practice management for mid-size firms. AI features include drafting, summarization, time tracking." },
          { name: "Lawmatics", category: "Legal CRM & Marketing", pricing: "$199-$399/month", description: "AI-powered legal CRM: automated lead follow-up, intake workflows, email/text nurture sequences, referral tracking." },
          { name: "Smith.ai", category: "Virtual Receptionist", pricing: "$300-$600/month", description: "AI-powered live chat and virtual receptionist. Handles after-hours inquiries, qualifies leads, schedules consultations." }
        ],
        acquisitionTools: [
          { name: "Google Local Services Ads (LSAs)", description: "Pay-per-lead model ($50-$150 per qualified PI lead). Google Guaranteed badge. Highest-ROI paid acquisition for PI firms." },
          { name: "Semrush / Ahrefs", description: "SEO platforms with AI-enhanced keyword research, competitor analysis, rank tracking. $130-$450/month." },
          { name: "SurferSEO", description: "AI content optimization scoring against top-ranking competitors. $89-$219/month." }
        ],
        regulations: [
          "ABA Formal Opinion 512 (July 2024): Establishes standards for AI use in legal practice \u2014 competence, confidentiality, supervision, and client communication",
          "Attorney-client privilege risk: SDNY ruled (2025) AI conversations are not protected by attorney-client privilege",
          "Data breach average cost for law firms: $4.88M (2024), up 10% from 2023",
          "81% of in-house counsel worried about AI impact on privilege protection"
        ],
        marketData: {
          marketSize: "$26.28B (2025), projected $35.11B (2026)",
          growthRate: "33.63% CAGR through 2035",
          techSpendingGrowth: "9.7% in 2025 \u2014 fastest growth ever recorded",
          adoptionRate: "Jumped from 19% (2023) to 79% (2024)",
          policyGap: "Only 10% of firms have formal AI policies despite massive adoption"
        },
        midMarketGap: "Enterprise tools (Harvey, Luminance, Ironclad) operate on $50K-$300K+ annual contracts designed for AmLaw 100 firms. Inaccessible to firms with 10-50 attorneys. Basic mid-market tools (Spellbook, Clio) have limited functionality. The gap is significant and represents Archificials' primary opportunity."
      },
      "architecture": {
        label: "Architecture Firm",
        entityType: "firm",
        searchTerms: ["architecture firm AI", "AEC AI", "building design AI", "BIM AI"],
        knownTools: [
          { name: "Autodesk Forma (Spacemaker)", category: "Generative Design", pricing: "$300-$600/user/month", description: "AI-powered site analysis, generative design for buildings, environmental analysis, and urban planning." },
          { name: "Midjourney / DALL-E", category: "Visual Ideation", pricing: "$10-$60/month", description: "AI image generation for concept visualization, mood boards, and client presentations." },
          { name: "Testfit", category: "Building Configurator", pricing: "Custom pricing", description: "AI building configurator for real estate feasibility. Generates building layouts from site constraints." },
          { name: "Hypar", category: "Computational Design", pricing: "Free-$500/month", description: "Cloud-based computational design platform. Parametric building generation." },
          { name: "Delve (Sidewalk Labs)", category: "Generative Urban Design", pricing: "Enterprise pricing", description: "AI generative design for real estate development. Optimizes for multiple objectives simultaneously." },
          { name: "OpenAI Codex / GitHub Copilot", category: "Computational Design Scripting", pricing: "$10-$19/user/month", description: "AI-assisted scripting for Grasshopper, Dynamo, and computational design workflows." },
          { name: "Procore", category: "Project Management", pricing: "$375-$549/month base", description: "Construction management platform with AI document analysis and RFI processing." },
          { name: "Newforma Konekt", category: "Project Information Management", pricing: "$35-$75/user/month", description: "AI-powered project email and document management for AEC firms." }
        ],
        acquisitionTools: [
          { name: "Houzz Pro", description: "Architecture-specific lead generation and project management. $65-$999/month." },
          { name: "Semrush", description: "SEO and content marketing for architecture firms. $130-$450/month." }
        ],
        regulations: [
          "AIA guidelines on AI-generated designs: liability, attribution, and professional responsibility",
          "Building code compliance verification \u2014 AI cannot replace licensed architect stamp",
          "Data security for client project files and confidential building designs",
          "Professional liability insurance implications of AI-assisted design decisions"
        ],
        marketData: {
          marketSize: "$4.2B (2025) for AI in AEC sector",
          growthRate: "28% CAGR through 2030",
          techSpendingGrowth: "12% increase in 2025",
          adoptionRate: "34% of architecture firms using AI in some capacity (2025)",
          policyGap: "Less than 5% have formal AI governance policies"
        },
        midMarketGap: "Enterprise solutions like Autodesk Forma are designed for large practices. Small-to-mid firms (5-30 architects) lack affordable, integrated AI solutions. Custom workflow automation represents the biggest opportunity."
      },
      "higher-ed": {
        label: "Higher Education Institution",
        entityType: "institution",
        searchTerms: ["higher education AI", "university AI", "academic AI tools", "EdTech AI"],
        knownTools: [
          { name: "Canvas (Instructure)", category: "LMS with AI", pricing: "Institutional licensing", description: "LMS with AI-powered analytics, automated grading assistance, and adaptive learning paths." },
          { name: "Anthology (Blackboard)", category: "LMS & Student Analytics", pricing: "Institutional licensing", description: "AI-powered student retention analytics, early alert systems, and personalized learning." },
          { name: "Civitas Learning", category: "Student Success", pricing: "$50,000-$200,000/year", description: "Predictive analytics for student retention and enrollment management." },
          { name: "Salesforce Education Cloud", category: "CRM & Enrollment", pricing: "$100-$300/user/month", description: "AI-driven enrollment management, student lifecycle tracking, and donor engagement." },
          { name: "EAB Navigate", category: "Student Success", pricing: "Custom institutional pricing", description: "AI-powered academic advising, student success platform with predictive analytics." },
          { name: "Grammarly Education", category: "Writing Support", pricing: "$15-$25/user/month", description: "AI writing assistance with plagiarism detection and academic integrity tools." },
          { name: "Turnitin", category: "Academic Integrity", pricing: "$3-$5/student/year", description: "AI-powered plagiarism detection with AI writing detection capabilities." },
          { name: "Ellucian", category: "ERP & Administration", pricing: "Custom institutional pricing", description: "Cloud ERP for higher ed with AI-powered administrative automation and analytics." }
        ],
        acquisitionTools: [
          { name: "EAB / Cappex", description: "Student enrollment marketing and lead generation platforms. Custom pricing." },
          { name: "Mongoose Cadence", description: "AI-powered student engagement via text messaging. $5,000-$25,000/year." }
        ],
        regulations: [
          "FERPA compliance: Student data privacy requirements for AI systems",
          "Title IV implications for AI-assisted instruction and credit hours",
          "Accreditation standards for AI-integrated curriculum delivery",
          "Institutional review board (IRB) considerations for AI research tools",
          "ADA accessibility requirements for AI-powered learning tools"
        ],
        marketData: {
          marketSize: "$6.1B (2025) for AI in higher education",
          growthRate: "36% CAGR through 2030",
          techSpendingGrowth: "8.5% increase in 2025",
          adoptionRate: "55% of institutions using AI in administrative functions (2025)",
          policyGap: "Only 15% have comprehensive AI governance frameworks"
        },
        midMarketGap: "Large universities have IT departments that can implement complex AI solutions. Small-to-mid institutions (1,000-10,000 students) struggle with limited technical staff, tight budgets, and vendor solutions designed for R1 universities."
      }
    };
    var ARCHIFICIALS_POSITIONING = {
      competitiveAdvantage: `Archificials operates in a unique lane: the implementation, integration, and customization layer that neither SaaS vendors nor generic consultants occupy.
- vs. SaaS vendors: They sell licenses but don't map workflows, manage change, configure integrations, or train skeptical users. Archificials is the implementation partner these vendors can't be.
- vs. Big 4 consulting (Deloitte, Accenture): A comparable engagement takes 12-18 months and costs $500K+. Archificials delivers in 8-16 weeks at a fraction of the cost.
- vs. IT shops / MSPs: They bring infrastructure management. Archificials brings AI strategy, workflow design, prompt engineering, and change management.
- vs. Solo AI consultants: Can't sustain 12-month engagements, deliver training at scale, or bring multi-disciplinary teams.`,
      engagementTiers: [
        { tier: "Discovery & Strategy", price: "$7,500-$15,000", duration: "2-4 weeks", description: "End-to-end workflow mapping, AI opportunity identification, prioritized implementation roadmap." },
        { tier: "Implementation Project", price: "$25,000-$90,000", duration: "10-24 weeks", description: "Off-the-shelf configuration, custom build, or hybrid. Fixed scope, defined deliverables." },
        { tier: "Ongoing Optimization Retainer", price: "$2,000-$5,000/month", duration: "Ongoing", description: "Continuous improvement, new use cases, performance tuning, additional training." },
        { tier: "Training & Change Management", price: "$5,000-$20,000", duration: "Standalone or bundled", description: "AI literacy workshops, governance policy development, role-specific training, internal champion development." }
      ],
      pricingPhilosophy: "Archificials charges for expertise and outcomes, not hours. Scope is defined upfront. Deliverables are contractual. Adoption metrics and working systems are the measure of success.",
      vendorAgnostic: "No commissions on software sales. Revenue comes from engagement fees, not vendor referrals. Recommendations based on actual needs, budget, and risk tolerance."
    };
    function buildSearchQueries(assessmentData) {
      const industry = assessmentData.inst_type || assessmentData.firm_type || "higher education";
      const name = assessmentData.inst_name || assessmentData.firm_name || "this organization";
      const vertical = assessmentData.vertical || "law-firm";
      const vk = VERTICAL_KNOWLEDGE[vertical] || VERTICAL_KNOWLEDGE["law-firm"];
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
      return results.map((item, idx) => {
        const lines = [];
        lines.push(`
[Result ${idx + 1}]`);
        lines.push(`Title: ${item.title}`);
        lines.push(`URL: ${item.url}`);
        lines.push(`Description: ${item.description}`);
        if (item.age) {
          lines.push(`Published: ${item.age}`);
        }
        return lines.join("\n");
      }).join("\n");
    }
    function buildMarketAnalysisPrompt(assessmentData, searchResults) {
      const vertical = assessmentData.vertical || "law-firm";
      const vk = VERTICAL_KNOWLEDGE[vertical] || VERTICAL_KNOWLEDGE["law-firm"];
      const industry = assessmentData.inst_type || assessmentData.firm_type || vk.label;
      const orgName = assessmentData.inst_name || assessmentData.firm_name || "the organization";
      const orgSize = assessmentData.inst_size || assessmentData.firm_size || "unknown size";
      const allResults = searchResults.flat().slice(0, 25);
      const resultsText = formatSearchResults(allResults);
      const toolsReference = vk.knownTools.map(
        (t) => `- ${t.name} (${t.category}): ${t.description} Pricing: ${t.pricing}`
      ).join("\n");
      const acquisitionToolsRef = vk.acquisitionTools.map(
        (t) => `- ${t.name}: ${t.description}`
      ).join("\n");
      const regulationsRef = vk.regulations.map((r) => `- ${r}`).join("\n");
      const engagementTiersRef = ARCHIFICIALS_POSITIONING.engagementTiers.map(
        (t) => `- ${t.tier} (${t.price} | ${t.duration}): ${t.description}`
      ).join("\n");
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

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REFERENCE: KNOWN ${vk.label.toUpperCase()} AI TOOLS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
${toolsReference}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REFERENCE: CLIENT ACQUISITION & SEO TOOLS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
${acquisitionToolsRef}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REFERENCE: REGULATORY & COMPLIANCE LANDSCAPE
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
${regulationsRef}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REFERENCE: MARKET DATA POINTS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
- Market Size: ${vk.marketData.marketSize}
- Growth Rate: ${vk.marketData.growthRate}
- Tech Spending Growth: ${vk.marketData.techSpendingGrowth}
- AI Adoption Rate: ${vk.marketData.adoptionRate}
- Policy Gap: ${vk.marketData.policyGap}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REFERENCE: MID-MARKET OPPORTUNITY
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
${vk.midMarketGap}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REFERENCE: ARCHIFICIALS COMPETITIVE POSITIONING
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
${ARCHIFICIALS_POSITIONING.competitiveAdvantage}

Engagement Tiers:
${engagementTiersRef}

Pricing Philosophy: ${ARCHIFICIALS_POSITIONING.pricingPhilosophy}
Vendor Agnostic: ${ARCHIFICIALS_POSITIONING.vendorAgnostic}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
SUPPLEMENTAL: RECENT SEARCH RESULTS (cite with [Source: URL] where used)
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
${resultsText}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
ANALYSIS REQUIREMENTS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

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
  }
});

// reports/engine/prompt-generator.js
var require_prompt_generator = __commonJS({
  "reports/engine/prompt-generator.js"(exports, module) {
    var { VERTICAL_KNOWLEDGE, ARCHIFICIALS_POSITIONING } = require_market_analysis();
    function scoreLabel(score) {
      if (score < 40) return "WEAK";
      if (score < 65) return "MODERATE";
      return "STRONG";
    }
    function scoreEmoji(score) {
      if (score < 40) return "\u26A0";
      if (score < 65) return "\u2B06";
      return "\u2713";
    }
    function scorePriority(score) {
      if (score < 40) return "HIGH PRIORITY \u2014 significant room for improvement";
      if (score < 65) return "MEDIUM PRIORITY \u2014 targeted improvements available";
      return "LOWER PRIORITY \u2014 maintain and extend advantage";
    }
    function buildHeader(ad) {
      const orgName = ad.inst_name || ad.firm_name || "Client";
      const date = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
      return `# AI Readiness Research Brief: ${orgName}
## Prepared by Archificials Assessment Pipeline v1.0 | ${date}

---

> **How to use this document:** Copy this entire document into Claude Cowork (or any AI tool with web search enabled and extended thinking). The AI will execute all research sections, produce cited findings, and output a structured report ready for presentation assembly.

---`;
    }
    function buildRoleBlock(vertical) {
      const vk = VERTICAL_KNOWLEDGE[vertical] || VERTICAL_KNOWLEDGE["law-firm"];
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
      const orgName = ad.inst_name || ad.firm_name || "Organization";
      const orgType = ad.inst_type || ad.firm_type || "Unknown";
      const orgSize = ad.inst_size || ad.firm_size || "Unknown";
      const contact = ad.contact_name || "Not provided";
      const contactTitle = ad.contact_title || "";
      const contactEmail = ad.contact_email || "";
      const s = ad.scores || {};
      const overall = s.overall || Math.round(((s.operational || 0) + (s.acquisition || 0) + (s.digital || 0) + (s.practice_readiness || 0)) / 4);
      return `
# PART 1: CLIENT CONTEXT & RESEARCH INSTRUCTIONS

## 1.1 Client Profile

| Field | Value |
|-------|-------|
| **Organization** | ${orgName} |
| **Type** | ${orgType} |
| **Size** | ${orgSize} |
| **Contact** | ${contact}${contactTitle ? `, ${contactTitle}` : ""} |
| **Email** | ${contactEmail || "Not provided"} |

## 1.2 Assessment Scores

| Dimension | Score | Rating | Priority | Insight |
|-----------|-------|--------|----------|---------|
| Operational Efficiency | ${s.operational || 0}/100 | ${scoreEmoji(s.operational || 0)} ${scoreLabel(s.operational || 0)} | ${scorePriority(s.operational || 0)} | ${s.insight_operational || "No insight available"} |
| Client/Student Acquisition | ${s.acquisition || 0}/100 | ${scoreEmoji(s.acquisition || 0)} ${scoreLabel(s.acquisition || 0)} | ${scorePriority(s.acquisition || 0)} | ${s.insight_acquisition || "No insight available"} |
| Digital Visibility | ${s.digital || 0}/100 | ${scoreEmoji(s.digital || 0)} ${scoreLabel(s.digital || 0)} | ${scorePriority(s.digital || 0)} | ${s.insight_digital || "No insight available"} |
| Practice/Institutional Readiness | ${s.practice_readiness || 0}/100 | ${scoreEmoji(s.practice_readiness || 0)} ${scoreLabel(s.practice_readiness || 0)} | ${scorePriority(s.practice_readiness || 0)} | ${s.insight_practice_readiness || "No insight available"} |
| **Overall Readiness** | **${overall}/100** | | | ${s.overall_summary || ""} |

**Recommended First Step:** ${s.recommended_first_step || "See analysis below"}

${Array.isArray(s.top_opportunities) && s.top_opportunities.length > 0 ? `**Top Opportunities:**
${s.top_opportunities.map((o) => `- ${o}`).join("\n")}` : ""}

## 1.3 Client Signals

| Signal | Response |
|--------|----------|
| **Investment Appetite** | ${ad.investment_question || "Not specified"} |
| **Urgency Level** | ${ad.urgency_question || "Not specified"} |
${ad.open_ended_response ? `| **Open-Ended Response** | "${ad.open_ended_response}" |` : ""}

> **Use these scores and signals throughout your research.** Every section should be personalized to this client's specific maturity level, gaps, and stated priorities. Reference their scores when making recommendations.
`;
    }
    function buildGeographicIntelligence(ad) {
      const orgName = ad.inst_name || ad.firm_name || "Organization";
      const orgType = ad.inst_type || ad.firm_type || "organization";
      return `
## 1.4 Geographic Intelligence

> **CRITICAL \u2014 EXECUTE BEFORE SECTION 5**
>
> The assessment data does not include the client's geographic location. You MUST determine it before conducting competitor research.
>
> **Step 1:** Examine the organization name "${orgName}" for geographic clues (city, state, region in the name).
>
> **Step 2:** If the name is ambiguous, search for: \`"${orgName}" ${orgType} location address\`
>
> **Step 3:** Identify the **metro area and state** where this organization operates.
>
> **Step 4:** Use this location to scope ALL competitor research in Section 5 to the same metro area / state. A client in Austin, TX must hear about Austin competitors \u2014 NOT firms in Seattle or New York.
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

### Reference Data (starting point \u2014 verify and update via web search)

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
A reader should walk away knowing the exact market size, how fast it's growing, what percentage of peers are adopting, and why the window to act is closing. Vague statements like "AI is growing rapidly" are insufficient \u2014 use specific numbers.
`;
    }
    function buildResearchSection_ToolLandscape(vk) {
      const toolsTable = vk.knownTools.map(
        (t) => `| ${t.name} | ${t.category} | ${t.pricing} | ${t.description.substring(0, 80)}... |`
      ).join("\n");
      return `
## SECTION 2: AI Tool Landscape (${vk.label}-Specific)

### Objective
Provide a comprehensive review of AI tools available to ${vk.label.toLowerCase()} organizations, organized by category, with verified current pricing and relevance assessment for THIS client.

### Research Queries
1. \`best AI tools for ${vk.searchTerms[0]} 2025 2026 comparison\`
2. \`${vk.searchTerms[0]} software pricing review\`
3. \`new AI tools ${vk.searchTerms[0]} launched 2025 2026\`

### Reference Data (known tools \u2014 verify pricing is current, add any new tools discovered)

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
An executive should be able to use this section to understand exactly what tools exist, what they cost, and which ones matter for their organization. Generic descriptions are insufficient \u2014 include specific pricing tiers, feature differentiators, and honest assessments of limitations.
`;
    }
    function buildResearchSection_ClientAcquisition(vk) {
      const acqToolsList = (vk.acquisitionTools || []).map(
        (t) => `- **${t.name}:** ${t.description}`
      ).join("\n");
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
Explain the paradigm shift from traditional SEO to AI-mediated search (Answer Engine Optimization and Generative Engine Optimization). This is a first-mover-advantage opportunity \u2014 organizations that act now build a structural moat.

### Research Queries
1. \`answer engine optimization AEO ${vk.searchTerms[0]} 2025 2026\`
2. \`generative engine optimization GEO strategy guide\`
3. \`AI search market share ChatGPT Perplexity Google AI overview statistics 2026\`
4. \`${vk.searchTerms[0]} AI search visibility strategy\`

### Minimum Sources
Cite at least **4 sources** \u2014 this is a rapidly evolving space.

### Deliverables
- **Market shift analysis**: What percentage of queries are now AI-mediated? How fast is this growing?
- **AEO strategy**: Specific tactics for ${vk.label.toLowerCase()} organizations (structured data, FAQ pages, schema markup)
- **GEO strategy**: How to ensure AI platforms (ChatGPT, Perplexity, Gemini, Copilot) recommend this organization by name
- **Measurement tools**: What tools monitor AI search visibility (list with pricing)
- **Urgency case**: Why acting NOW creates compounding advantage \u2014 include specific data on first-mover benefits
- **Competitive gap**: How many ${vk.label.toLowerCase()} organizations currently have AEO/GEO strategies (likely <5%)

### Quality Bar
The reader should understand that AI search is not a future trend but a present reality, with specific market share data. They should have 3-5 concrete tactical steps they can take immediately.
`;
    }
    function buildResearchSection_CompetitorLandscape(vk, ad) {
      const orgName = ad.inst_name || ad.firm_name || "Organization";
      const orgType = ad.inst_type || ad.firm_type || vk.label;
      const orgSize = ad.inst_size || ad.firm_size || "medium";
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
      const regsRef = vk.regulations.map((r) => `- ${r}`).join("\n");
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
An executive should be able to hand this section to their compliance officer and have a clear starting point. Include specific regulation names, dates, and requirements \u2014 not vague references to "ethical considerations."
`;
    }
    function buildResearchSection_PricingAnalysis(vk, ad) {
      const orgSize = ad.inst_size || ad.firm_size || "medium";
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
      const tiers = ARCHIFICIALS_POSITIONING.engagementTiers.map(
        (t) => `| ${t.tier} | ${t.price} | ${t.duration} | ${t.description} |`
      ).join("\n");
      return `
## SECTION 8: Strategic Positioning & Archificials Fit

### Objective
Position Archificials as the ideal implementation partner for this organization. This section is about WHY the client needs a partner (not just tools) and why Archificials specifically.

### Reference Data (use as-is \u2014 this is Archificials' positioning, not research)

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
      const orgName = ad.inst_name || ad.firm_name || "Organization";
      const orgSize = ad.inst_size || ad.firm_size || "medium";
      const s = ad.scores || {};
      const toolsList = vk.knownTools.map(
        (t) => `- ${t.name} (${t.category}): ${t.pricing}`
      ).join("\n");
      const acqToolsList = (vk.acquisitionTools || []).map(
        (t) => `- ${t.name}: ${t.description}`
      ).join("\n");
      const tiers = ARCHIFICIALS_POSITIONING.engagementTiers.map(
        (t) => `- ${t.tier}: ${t.price} (${t.duration})`
      ).join("\n");
      return `
## SECTION 9: Deployment Scenarios (A through F)

### Objective
Design 6 AI deployment scenarios of increasing complexity and investment, each tailored to ${orgName}'s specific assessment scores. Every scenario must include SPECIFIC NAMED TOOLS with SPECIFIC PRICING and REALISTIC TIMELINES.

### Client Score Context (use this to customize each scenario)
- Operational Efficiency: ${s.operational || 0}/100 \u2014 ${scoreLabel(s.operational || 0)}. ${(s.operational || 0) < 50 ? "Significant room for AI workflow automation. Prioritize in Scenarios A and C." : (s.operational || 0) < 65 ? "Targeted improvements possible. Include workflow tools in most scenarios." : "Already strong. Focus scenarios on extending advantage rather than basic automation."}
- Client/Student Acquisition: ${s.acquisition || 0}/100 \u2014 ${scoreLabel(s.acquisition || 0)}. ${(s.acquisition || 0) < 50 ? "Major growth opportunity. Scenario E is critical." : (s.acquisition || 0) < 65 ? "Room for AI-powered growth. Include acquisition tools in C and E." : "Strong pipeline. Optimize rather than build from scratch."}
- Digital Visibility: ${s.digital || 0}/100 \u2014 ${scoreLabel(s.digital || 0)}. ${(s.digital || 0) < 50 ? "Near-zero digital presence. AEO/GEO (Scenario F) has massive upside." : (s.digital || 0) < 65 ? "Digital gaps exist. SEO and AEO improvements in Scenarios E and F." : "Strong digital presence. Scenario F for compounding returns and moat building."}
- Practice/Institutional Readiness: ${s.practice_readiness || 0}/100 \u2014 ${scoreLabel(s.practice_readiness || 0)}. ${(s.practice_readiness || 0) < 50 ? "Will need significant change management support. Budget extra training time in all scenarios." : (s.practice_readiness || 0) < 65 ? "Can absorb AI with proper training. Standard onboarding sufficient." : "High readiness. Can move quickly on implementation."}

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
6. **Weaknesses** (4 specific limitations \u2014 be honest)
7. **ROI projection** with metric, 12-month estimate, and payback period in months
8. **Fit assessment** for ${orgName} specifically, referencing their scores above

**Scenario A: "Off-the-Shelf AI Stack"** \u2014 Deploy 3-5 proven tools, configured by Archificials. Quick wins, lowest risk. Timeline: 10-14 weeks. Best for organizations wanting immediate results.

**Scenario B: "Custom AI Platform (Archificials Build)"** \u2014 Bespoke platform with 4-6 custom modules. Private deployment, firm-controlled data. Timeline: 20-24 weeks. Best for organizations wanting competitive differentiation.

**Scenario C: "Hybrid Approach" (RECOMMENDED)** \u2014 THIS IS THE RECOMMENDED SCENARIO. Phase 1 (months 1-3): deploy named off-the-shelf tools. Phase 2 (months 4-8): build custom modules for highest-value workflows. Phase 3 (months 9-12): advanced capabilities. Make this the MOST COMPELLING option. Show how value delivery begins Month 1.

**Scenario D: "AI-First Transformation"** \u2014 Full organizational reimagination. 4-5 major business processes redesigned. Timeline: 18-24 months. Highest investment. Include new governance roles and decision-making frameworks.

**Scenario E: "AI-Powered Client Acquisition & SEO"** \u2014 External growth focus with 3 tracks: (1) SEO & Content, (2) Intake Automation, (3) Paid Acquisition. Timeline: 12-16 weeks. Include quantified expected ROI (e.g., one additional case/enrollment per month = $X revenue). Can bundle with C or D.

**Scenario F: "AEO & GEO Infrastructure"** \u2014 AI search optimization with 3 tracks: (1) Authority Asset Activation (months 1-2), (2) AEO Content Architecture (months 2-4), (3) GEO Citation Building (months 3-6+). First-mover advantage creates compounding, structural moat. Complements Scenario E. Include expected ROI with compounding effect explanation.
`;
    }
    function buildMeetingBrief(ad) {
      const orgName = ad.inst_name || ad.firm_name || "Organization";
      const orgSize = ad.inst_size || ad.firm_size || "medium";
      const orgType = ad.inst_type || ad.firm_type || "organization";
      const contact = ad.contact_name || "Contact";
      const contactTitle = ad.contact_title || "";
      const s = ad.scores || {};
      const overall = s.overall || Math.round(((s.operational || 0) + (s.acquisition || 0) + (s.digital || 0) + (s.practice_readiness || 0)) / 4);
      const dims = [
        { name: "Operational Efficiency", score: s.operational || 0 },
        { name: "Client/Student Acquisition", score: s.acquisition || 0 },
        { name: "Digital Visibility", score: s.digital || 0 },
        { name: "Practice/Institutional Readiness", score: s.practice_readiness || 0 }
      ];
      dims.sort((a, b) => a.score - b.score);
      return `
## SECTION 10: Internal Meeting Brief (for Archificials Team Only)

### Objective
Prepare an internal strategy brief for the upcoming client meeting with ${orgName}. This is NOT client-facing \u2014 be direct, strategic, and tactical.

### Client Quick Profile
- **${orgName}** \u2014 ${orgSize} ${orgType}, overall readiness ${overall}/100
- **Contact:** ${contact}${contactTitle ? ` (${contactTitle})` : ""}
- **Weakest dimension:** ${dims[0].name} (${dims[0].score}/100)
- **Strongest dimension:** ${dims[3].name} (${dims[3].score}/100)
- **Investment appetite:** ${ad.investment_question || "Unknown"}
- **Urgency:** ${ad.urgency_question || "Unknown"}
${ad.open_ended_response ? `- **Open-ended response:** "${ad.open_ended_response}"` : ""}

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
- **Flag explicitly:** Any data older than 24 months with a note: "(Note: 2023 data \u2014 verify for updates)"
- **Tool pricing:** Must be verified against current vendor websites or recent (2025-2026) reviews

## Geographic Relevance
- **Section 5 (Competitor Landscape):** MUST use geographically relevant data (see Section 1.4)
- **All sections:** Prefer regional/national data for the client's country; flag international data clearly

## Image & Visual Requirements
- Include URLs for relevant images found during research (charts, infographics, logos)
- Attribution required for all images
- Prefer high-resolution sources (official publications, vendor materials)

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
    function generatePromptDocument(assessmentData) {
      const vertical = assessmentData.vertical || "law-firm";
      const vk = VERTICAL_KNOWLEDGE[vertical] || VERTICAL_KNOWLEDGE["law-firm"];
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
      return sections.join("\n");
    }
    module.exports = { generatePromptDocument };
  }
});

// workers/report-orchestrator/index.js
async function validateToken(id, token, timestamp, secret) {
  try {
    const message = `${id}:${timestamp}`;
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const signature = new Uint8Array(
      token.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
    );
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      signature,
      new TextEncoder().encode(message)
    );
    return valid && Date.now() - parseInt(timestamp) < 7 * 24 * 60 * 60 * 1e3;
  } catch (e) {
    console.error("Token validation error:", e);
    return false;
  }
}
async function fetchAssessmentRecord(baseId, tableName, recordId, apiKey) {
  try {
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}/${recordId}`;
    const res = await fetch(url, { headers: { "Authorization": `Bearer ${apiKey}` } });
    if (!res.ok) {
      console.error(`Airtable fetch error: ${res.status} - ${await res.text()}`);
      return null;
    }
    return (await res.json()).fields || null;
  } catch (e) {
    console.error("Airtable fetch error:", e);
    return null;
  }
}
async function sendNotificationEmail(to, subject, htmlContent, resendApiKey) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Archificials <reports@archificials.com>",
        to,
        subject,
        html: htmlContent
      })
    });
    if (!res.ok) {
      console.error(`Resend API error: ${res.status}`);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Email send error:", e);
    return false;
  }
}
function buildPromptReadyEmail(clientName, scores, promptUrl) {
  function scoreLabel(s) {
    return s < 40 ? "Weak" : s < 65 ? "Moderate" : "Strong";
  }
  function scoreColor(s) {
    return s < 40 ? "#dc3545" : s < 65 ? "#e27308" : "#28a745";
  }
  const dims = [
    { name: "Operational Efficiency", score: scores.operational },
    { name: "Client Acquisition", score: scores.acquisition },
    { name: "Digital Visibility", score: scores.digital },
    { name: "Practice Readiness", score: scores.practice_readiness }
  ];
  const scoreRows = dims.map(
    (d) => `<tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e0e0e0;font-weight:500;">${d.name}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e0e0e0;text-align:center;">
        <span style="color:${scoreColor(d.score)};font-weight:700;">${d.score}/100</span>
      </td>
      <td style="padding:10px 12px;border-bottom:1px solid #e0e0e0;color:${scoreColor(d.score)};">${scoreLabel(d.score)}</td>
    </tr>`
  ).join("");
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#333;margin:0;padding:0;">
<div style="max-width:600px;margin:0 auto;padding:20px;">

  <div style="background:#1a1a2e;color:white;padding:24px;border-radius:8px 8px 0 0;">
    <h1 style="margin:0 0 4px 0;font-size:22px;">Research Prompt Ready</h1>
    <p style="margin:0;color:#ccc;font-size:14px;">${clientName} | AI Readiness Assessment</p>
  </div>

  <div style="background:#f8f9fa;padding:24px;border-radius:0 0 8px 8px;">

    <div style="margin-bottom:24px;">
      <h2 style="color:#1a1a2e;font-size:16px;margin:0 0 4px 0;">Overall Score</h2>
      <p style="font-size:32px;font-weight:700;color:${scoreColor(scores.overall)};margin:0;">${scores.overall}/100
        <span style="font-size:14px;font-weight:400;color:#666;"> \u2014 ${scoreLabel(scores.overall)}</span>
      </p>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr style="background:#1a1a2e;color:white;">
        <th style="padding:10px 12px;text-align:left;">Dimension</th>
        <th style="padding:10px 12px;text-align:center;">Score</th>
        <th style="padding:10px 12px;text-align:left;">Rating</th>
      </tr>
      ${scoreRows}
    </table>

    <div style="background:#fff;border:2px solid #e27308;border-radius:8px;padding:20px;text-align:center;margin-bottom:24px;">
      <p style="margin:0 0 12px 0;font-size:14px;color:#666;">Research prompt document is ready</p>
      <a href="${promptUrl}" style="display:inline-block;background:#e27308;color:white;text-decoration:none;padding:12px 32px;border-radius:6px;font-weight:600;font-size:16px;">
        Download Prompt
      </a>
    </div>

    <div style="background:#fff;border-radius:6px;padding:16px;border:1px solid #e0e0e0;">
      <h3 style="margin:0 0 8px 0;font-size:14px;color:#1a1a2e;">How to use:</h3>
      <ol style="margin:0;padding-left:20px;font-size:13px;color:#555;">
        <li style="margin-bottom:6px;">Open the prompt link above and copy the full document</li>
        <li style="margin-bottom:6px;">Open <strong>Claude Cowork</strong> (ensure web search is enabled)</li>
        <li style="margin-bottom:6px;">Paste the prompt and let Claude execute the research</li>
        <li>Use the output to build the client presentation</li>
      </ol>
    </div>

    <p style="margin-top:20px;font-size:12px;color:#999;text-align:center;">
      Generated by Archificials Assessment Pipeline v5.0 | Internal use only
    </p>
  </div>
</div>
</body>
</html>`;
}
var index_default = {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok", version: "5.0.0-prompt" }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    if (request.method === "GET" && url.pathname.startsWith("/status/")) {
      return new Response(JSON.stringify({ status: "pending", message: "Not yet implemented" }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    if ((request.method === "GET" || request.method === "POST") && url.pathname === "/generate") {
      const recordId = url.searchParams.get("id");
      const vertical = url.searchParams.get("vertical") || "law-firm";
      const token = url.searchParams.get("token");
      const timestamp = url.searchParams.get("t");
      const testMode = url.searchParams.get("test") === "true";
      if (!recordId) {
        return new Response(JSON.stringify({ error: "Missing required parameter: id" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      if (!testMode && (!token || !timestamp)) {
        return new Response(JSON.stringify({ error: "Missing required parameters: token, t" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      if (!testMode) {
        const isValid = await validateToken(recordId, token, timestamp, env.REPORT_SECRET);
        if (!isValid) {
          return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
          });
        }
      }
      const pipelineStart = Date.now();
      try {
        const tableMap = { "law-firm": "V2 Assessments", "architecture": "V2 Assessments", "higher-ed": "Higher Ed V2 Assessments" };
        const baseMap = { "law-firm": "apph2tKtp5MCF8cGT", "architecture": "appB7PmFnNvV3085q", "higher-ed": "appB7PmFnNvV3085q" };
        const tableName = tableMap[vertical] || "V2 Assessments";
        const baseId = baseMap[vertical] || env.AIRTABLE_BASE_ID;
        console.log(`[1/3] Fetching record ${recordId}`);
        const assessmentData = await fetchAssessmentRecord(baseId, tableName, recordId, env.AIRTABLE_API_KEY);
        if (!assessmentData) {
          return new Response(JSON.stringify({ error: "Failed to fetch assessment record" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
        const scores = {
          operational: assessmentData.score_operational || 0,
          acquisition: assessmentData.score_acquisition || 0,
          digital: assessmentData.score_digital || 0,
          practice_readiness: assessmentData.score_practice_readiness || 0,
          overall: assessmentData.score_overall || 0,
          insight_operational: assessmentData.insight_operational || "",
          insight_acquisition: assessmentData.insight_acquisition || "",
          insight_digital: assessmentData.insight_digital || "",
          insight_practice_readiness: assessmentData.insight_practice_readiness || "",
          overall_summary: assessmentData.overall_summary || "",
          recommended_first_step: assessmentData.recommended_first_step || "",
          top_opportunities: assessmentData.top_opportunities || []
        };
        assessmentData.scores = scores;
        assessmentData.vertical = vertical;
        console.log("[2/3] Generating prompt document");
        const { generatePromptDocument } = await Promise.resolve().then(() => __toESM(require_prompt_generator()));
        const promptDocument = generatePromptDocument(assessmentData);
        console.log(`[2/3] Prompt document generated: ${promptDocument.length} chars`);
        const clientName = assessmentData.inst_name || assessmentData.firm_name || "Client";
        const clientSlug = clientName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        const now = /* @__PURE__ */ new Date();
        const slugDate = `${clientSlug}-${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
        await env.REPORTS_BUCKET.put(`prompts/${slugDate}/prompt.md`, promptDocument, {
          httpMetadata: { contentType: "text/plain; charset=utf-8" },
          customMetadata: { clientName, vertical, generated: now.toISOString() }
        });
        console.log(`[3/3] Prompt uploaded: prompts/${slugDate}/prompt.md`);
        const gatewayHost = url.host.replace("report-orchestrator", "report-gateway");
        const promptUrl = `https://${gatewayHost}/p/${slugDate}`;
        const emailHtml = buildPromptReadyEmail(clientName, scores, promptUrl);
        await sendNotificationEmail(
          env.NOTIFY_EMAIL,
          `Prompt Ready: ${clientName}`,
          emailHtml,
          env.RESEND_API_KEY
        );
        const totalElapsed = Date.now() - pipelineStart;
        console.log(`Pipeline complete in ${(totalElapsed / 1e3).toFixed(1)}s. Slug: ${slugDate}`);
        return new Response(JSON.stringify({
          status: "complete",
          slug: slugDate,
          promptUrl,
          elapsed_ms: totalElapsed
        }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } catch (error) {
        console.error("Pipeline error:", error.message || error);
        return new Response(JSON.stringify({
          error: "Pipeline failed",
          detail: error.message || String(error),
          elapsed_ms: Date.now() - pipelineStart
        }), { status: 500, headers: { "Content-Type": "application/json" } });
      }
    }
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
};
export {
  index_default as default
};
