var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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

// reports/research/deployment-scenarios.js
var require_deployment_scenarios = __commonJS({
  "reports/research/deployment-scenarios.js"(exports, module) {
    var { VERTICAL_KNOWLEDGE, ARCHIFICIALS_POSITIONING } = require_market_analysis();
    function buildDeploymentScenariosPrompt(assessmentData, searchResults, marketAnalysis) {
      const vertical = assessmentData.vertical || "law-firm";
      const vk = VERTICAL_KNOWLEDGE[vertical] || VERTICAL_KNOWLEDGE["law-firm"];
      const industry = assessmentData.inst_type || assessmentData.firm_type || vk.label;
      const orgName = assessmentData.inst_name || assessmentData.firm_name || "Organization";
      const orgSize = assessmentData.inst_size || assessmentData.firm_size || "medium";
      const scores = {
        operational: assessmentData.scores?.operational || 50,
        acquisition: assessmentData.scores?.acquisition || 50,
        digital: assessmentData.scores?.digital || 50,
        practice_readiness: assessmentData.scores?.practice_readiness || 50
      };
      const overallScore = Math.round((scores.operational + scores.acquisition + scores.digital + scores.practice_readiness) / 4);
      const toolsByCategory = {};
      vk.knownTools.forEach((t) => {
        if (!toolsByCategory[t.category]) toolsByCategory[t.category] = [];
        toolsByCategory[t.category].push(t);
      });
      const toolsReference = vk.knownTools.map(
        (t) => `- ${t.name} (${t.category}): ${t.pricing} \u2014 ${t.description}`
      ).join("\n");
      const acquisitionToolsRef = (vk.acquisitionTools || []).map(
        (t) => `- ${t.name}: ${t.description}`
      ).join("\n");
      const engagementTiersRef = ARCHIFICIALS_POSITIONING.engagementTiers.map(
        (t) => `- ${t.tier} (${t.price} | ${t.duration}): ${t.description}`
      ).join("\n");
      let marketContextBlock = "";
      if (marketAnalysis && typeof marketAnalysis === "object" && !marketAnalysis.raw) {
        const ma = marketAnalysis;
        marketContextBlock = `
MARKET INTELLIGENCE (from prior analysis):
- Executive Summary: ${ma.executiveSummary?.marketSize || "Available from market research"}
- Adoption Trend: ${ma.executiveSummary?.adoptionTrend || "High and accelerating"}
- Mid-Market Gap: ${ma.competitorLandscape?.midMarketGap || vk.midMarketGap}
- Tool Landscape: ${ma.toolLandscape?.summary?.substring(0, 500) || "Comprehensive tool landscape analyzed"}
- AEO/GEO Opportunity: ${ma.aiSearchRevolution?.marketShift?.substring(0, 300) || "AI search is transforming discovery"}
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
- Costs must be realistic and detailed \u2014 break down by software, services, training, and ongoing.
- Timelines must include specific phases with concrete deliverables per phase.
- Training requirements should be role-specific, not generic.
- Each scenario's "Fit for ${orgName}" assessment must reference their actual scores and what those scores imply.
- Write substantive paragraphs (3-5 sentences), not surface-level bullets.
- The recommended scenario (C) should be clearly the most compelling, but present all options honestly.

Output only valid JSON with the structure specified. Include ALL fields for ALL 6 scenarios.`;
      const userPrompt = `Design 6 AI deployment scenarios for "${orgName}", a ${orgSize} ${industry} organization.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
ASSESSMENT SCORES
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
- Operational Efficiency: ${scores.operational}/100
- Client/Student Acquisition: ${scores.acquisition}/100
- Digital Visibility: ${scores.digital}/100
- Practice/Institutional Readiness: ${scores.practice_readiness}/100
- Overall Readiness: ${overallScore}/100

Score Interpretation:
${scores.operational < 50 ? "\u26A0 LOW operational efficiency \u2014 significant room for AI workflow automation" : scores.operational < 70 ? "\u2B06 MODERATE operational efficiency \u2014 targeted improvements possible" : "\u2713 STRONG operational efficiency \u2014 optimize and extend"}
${scores.acquisition < 50 ? "\u26A0 LOW acquisition score \u2014 client/student pipeline needs AI-driven growth" : scores.acquisition < 70 ? "\u2B06 MODERATE acquisition \u2014 specific funnel improvements available" : "\u2713 STRONG acquisition \u2014 optimize conversion and retention"}
${scores.digital < 50 ? "\u26A0 LOW digital visibility \u2014 near-zero digital baseline, massive upside" : scores.digital < 70 ? "\u2B06 MODERATE digital presence \u2014 SEO and content gaps exist" : "\u2713 STRONG digital visibility \u2014 maintain and extend advantage"}
${scores.practice_readiness < 50 ? "\u26A0 LOW readiness \u2014 will need significant change management support" : scores.practice_readiness < 70 ? "\u2B06 MODERATE readiness \u2014 can absorb AI with proper training" : "\u2713 HIGH readiness \u2014 can move quickly on implementation"}

${marketContextBlock}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REFERENCE: AVAILABLE ${vk.label.toUpperCase()} AI TOOLS (use these in scenarios)
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
${toolsReference}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REFERENCE: CLIENT ACQUISITION TOOLS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
${acquisitionToolsRef}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REFERENCE: ARCHIFICIALS ENGAGEMENT MODEL
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
${engagementTiersRef}

Pricing Philosophy: ${ARCHIFICIALS_POSITIONING.pricingPhilosophy}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
SCENARIO REQUIREMENTS \u2014 Generate all 6 with expert-level detail
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

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
- THIS IS THE RECOMMENDED SCENARIO \u2014 make it the most compelling
- Phase 1 (Months 1-3): Deploy NAMED off-the-shelf tools for immediate wins
- Phase 2 (Months 4-8): Build NAMED custom modules for highest-value workflows
- Phase 3 (Months 9-12): Advanced capabilities and full integration
- Each phase has specific deliverables, costs, and expected outcomes
- Total cost: Broken down by phase
- Show how value delivery begins in Month 1
- 5+ strengths (immediate ROI, manageable pace, discovery-driven, best 2-3 year ROI)
- 3-4 weaknesses (complexity, longer total timeline, sustained engagement, change fatigue)
- Fit assessment: Why this is the BEST FIT for ${orgName} \u2014 be specific about their scores

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
- EXTERNAL GROWTH focus \u2014 client/student acquisition, not internal workflow
- Track 1: SEO & Content \u2014 specific tools, content strategy, timeline
- Track 2: Intake Automation \u2014 chatbots, CRM, follow-up sequences
- Track 3: Paid Acquisition \u2014 LSAs or equivalent, optimization
- Timeline: 12-16 weeks across all tracks
- Cost: Archificials engagement fee + monthly tool subscriptions
- Expected ROI: Quantified (e.g., one additional case/enrollment per month = $X revenue)
- Can be sold standalone OR bundled with C or D

SCENARIO F: "AEO & GEO Infrastructure"
- AI search optimization \u2014 own the AI-mediated search landscape
- Track 1: Authority Asset Activation (Months 1-2) \u2014 structured data, directories, press
- Track 2: AEO Content Architecture (Months 2-4) \u2014 Q&A pages, schema markup, topical clusters
- Track 3: GEO Citation Building (Months 3-6+) \u2014 bylines, media, third-party presence
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
    "architecture": "deployment architecture description \u2014 private, secure, integrated",
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
    "bestFor": "most organizations \u2014 this is typically Archificials' recommendation",
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
    "fitAssessment": "why this is the BEST FIT for THIS organization \u2014 reference specific scores"
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
    "coreProblem": "what problem this solves \u2014 AI handling 30-40% of high-intent queries",
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
    "complementsScenarioE": "how E and F work together \u2014 E captures intent, F ensures visibility",
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
  }
});

// reports/research/meeting-brief.js
var require_meeting_brief = __commonJS({
  "reports/research/meeting-brief.js"(exports, module) {
    var { ARCHIFICIALS_POSITIONING } = require_market_analysis();
    function buildMeetingBriefPrompt(assessmentData, marketAnalysis, deploymentScenarios) {
      const vertical = assessmentData.vertical || "law-firm";
      const industry = assessmentData.inst_type || assessmentData.firm_type || "Organization";
      const orgName = assessmentData.inst_name || assessmentData.firm_name || "Organization";
      const orgSize = assessmentData.inst_size || assessmentData.firm_size || "medium";
      const contactName = assessmentData.contact_name || "Contact";
      const contactTitle = assessmentData.contact_title || "Unknown role";
      const contactEmail = assessmentData.contact_email || "";
      const investmentLevel = assessmentData.investment_question || "unknown";
      const urgency = assessmentData.urgency_question || "unknown";
      const openEndedResponse = assessmentData.open_ended_response || "";
      const scores = {
        operational: assessmentData.scores?.operational || 50,
        acquisition: assessmentData.scores?.acquisition || 50,
        digital: assessmentData.scores?.digital || 50,
        practice_readiness: assessmentData.scores?.practice_readiness || 50
      };
      const overallScore = Math.round((scores.operational + scores.acquisition + scores.digital + scores.practice_readiness) / 4);
      const weakestDimension = Object.entries(scores).sort((a, b) => a[1] - b[1])[0];
      const strongestDimension = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
      let marketContext = "Market analysis available from research phase.";
      if (marketAnalysis && typeof marketAnalysis === "object" && !marketAnalysis.raw) {
        marketContext = `
- Market Overview: ${marketAnalysis.executiveSummary?.marketSize || "Large and growing rapidly"}
- Adoption Trend: ${marketAnalysis.executiveSummary?.adoptionTrend || "Accelerating"}
- Competitor Activity: ${marketAnalysis.competitorLandscape?.peerActivity || "Peers are actively deploying AI"}
- Key Gap: ${marketAnalysis.competitorLandscape?.midMarketGap || "Mid-market organizations are underserved"}
- AEO/GEO Opportunity: ${marketAnalysis.aiSearchRevolution?.urgencyCase || "AI search is transforming discovery"}`;
      }
      let scenarioContext = "4-6 deployment scenarios designed.";
      if (deploymentScenarios && typeof deploymentScenarios === "object" && !deploymentScenarios.raw) {
        const ds = deploymentScenarios;
        const recScenario = ds.scenarioC || {};
        scenarioContext = `
- Scenario A (Off-the-Shelf): ${ds.scenarioA?.costs?.totalYear1 || "Estimated"} Year 1
- Scenario B (Custom Build): ${ds.scenarioB?.costs?.totalYear1 || "Estimated"} Year 1
- Scenario C (Hybrid - RECOMMENDED): ${ds.scenarioC?.costs?.totalYear1 || "Estimated"} Year 1
- Scenario D (Transformation): ${ds.scenarioD?.costs?.totalYear1 || "Estimated"} Year 1
- Scenario E (Acquisition & SEO): ${ds.scenarioE?.costs?.totalYear1 || "Estimated"} Year 1
- Scenario F (AEO & GEO): ${ds.scenarioF?.costs?.totalYear1 || "Estimated"} Year 1
- Recommended Lead: Scenario C (Hybrid) \u2014 immediate wins + long-term advantage
- Fit Assessment: ${recScenario.fitAssessment || "Best fit for most organizations"}`;
      }
      const engagementTiersRef = ARCHIFICIALS_POSITIONING.engagementTiers.map(
        (t) => `- ${t.tier}: ${t.price} (${t.duration})`
      ).join("\n");
      const systemPrompt = `You are Archificials' head strategist preparing a comprehensive, candid meeting brief for Biel before a client call. This brief is INTERNAL ONLY \u2014 be direct, strategic, and tactical.

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

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
CLIENT PROFILE
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
- Organization: ${orgName} (${orgSize} ${industry})
- Contact: ${contactName}, ${contactTitle}
- Email: ${contactEmail || "Not provided"}
- Assessment Score: ${overallScore}/100 overall readiness
  - Operational Efficiency: ${scores.operational}/100 ${scores.operational < 50 ? "\u26A0 WEAK" : scores.operational < 70 ? "\u2B06 MODERATE" : "\u2713 STRONG"}
  - Client/Student Acquisition: ${scores.acquisition}/100 ${scores.acquisition < 50 ? "\u26A0 WEAK" : scores.acquisition < 70 ? "\u2B06 MODERATE" : "\u2713 STRONG"}
  - Digital Visibility: ${scores.digital}/100 ${scores.digital < 50 ? "\u26A0 WEAK" : scores.digital < 70 ? "\u2B06 MODERATE" : "\u2713 STRONG"}
  - Practice/Institutional Readiness: ${scores.practice_readiness}/100 ${scores.practice_readiness < 50 ? "\u26A0 WEAK" : scores.practice_readiness < 70 ? "\u2B06 MODERATE" : "\u2713 STRONG"}
- Weakest dimension: ${weakestDimension[0]} (${weakestDimension[1]}/100)
- Strongest dimension: ${strongestDimension[0]} (${strongestDimension[1]}/100)

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
CLIENT SIGNALS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
- Investment appetite: ${investmentLevel}
- Urgency indicated: ${urgency}
${openEndedResponse ? `- Open-ended response: "${openEndedResponse}"` : ""}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
MARKET INTELLIGENCE
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
${marketContext}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
DEPLOYMENT SCENARIOS AVAILABLE
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
${scenarioContext}

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
ARCHIFICIALS ENGAGEMENT TIERS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
${engagementTiersRef}
Entry Point Recommendation: Discovery & Strategy ($7,500-$15,000)

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
BRIEF REQUIREMENTS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

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
   - If they push back on COST \u2192 fall back to [which scenario] and how to position it
   - If they push back on TIMELINE \u2192 fall back to [which scenario]
   - If they want to FOCUS ON GROWTH \u2192 pivot to Scenario E or F
   - If they're AMBITIOUS \u2192 upgrade to [which scenario]

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
    - The meeting is NOT about closing \u2014 it's about earning the right to send a proposal

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
  }
});

// reports/engine/charts.js
function createDimensionRadarChart(data) {
  const dimensions = [
    "Operational\nEfficiency",
    "Client/Student\nAcquisition",
    "Digital\nVisibility",
    "Practice/Institutional\nReadiness"
  ];
  const values = [
    data.operational || 68,
    data.acquisition || 52,
    data.digital || 45,
    data.practice_readiness || 71
  ];
  const plotData = [
    {
      type: "scatterpolar",
      r: values,
      theta: dimensions,
      fill: "toself",
      name: "Current Score",
      line: { color: ARCHIFICIALS_COLORS.accent },
      fillcolor: "rgba(226, 115, 8, 0.2)",
      marker: { size: 8, color: ARCHIFICIALS_COLORS.accent }
    },
    {
      type: "scatterpolar",
      r: [100, 100, 100, 100],
      theta: dimensions,
      fill: "toself",
      name: "Target Score",
      line: { color: ARCHIFICIALS_COLORS.textLight, dash: "dash" },
      fillcolor: "transparent",
      marker: { size: 0 }
    }
  ];
  const layout = {
    ...PLOTLY_LAYOUT_DEFAULTS,
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 100],
        tickcolor: ARCHIFICIALS_COLORS.border,
        gridcolor: ARCHIFICIALS_COLORS.border,
        tickfont: { size: 11 }
      },
      angularaxis: {
        tickfont: { size: 12 }
      }
    },
    height: 500
  };
  return { data: plotData, layout, config: PLOTLY_CONFIG };
}
function createDimensionBarChart(data) {
  const dimensions = ["Operational Efficiency", "Client/Student Acquisition", "Digital Visibility", "Practice/Institutional Readiness"];
  const values = [data.operational || 68, data.acquisition || 52, data.digital || 45, data.practice_readiness || 71];
  const tierThresholds = {
    1: { max: 24, color: ARCHIFICIALS_COLORS.tier1 },
    2: { max: 49, color: ARCHIFICIALS_COLORS.tier2 },
    3: { max: 74, color: ARCHIFICIALS_COLORS.tier3 },
    4: { max: 100, color: ARCHIFICIALS_COLORS.tier4 }
  };
  const colors = values.map((v) => {
    if (v <= 24) return tierThresholds[1].color;
    if (v <= 49) return tierThresholds[2].color;
    if (v <= 74) return tierThresholds[3].color;
    return tierThresholds[4].color;
  });
  const plotData = [
    {
      type: "bar",
      orientation: "h",
      y: dimensions,
      x: values,
      marker: { color: colors },
      text: values.map((v) => `${v}/100`),
      textposition: "outside",
      textfont: { color: ARCHIFICIALS_COLORS.text, weight: "bold" },
      hovertemplate: "<b>%{y}</b><br>Score: %{x}/100<extra></extra>"
    }
  ];
  const layout = {
    ...PLOTLY_LAYOUT_DEFAULTS,
    xaxis: {
      title: "Score",
      range: [0, 100],
      gridcolor: ARCHIFICIALS_COLORS.border
    },
    yaxis: {
      title: ""
    },
    height: 350,
    margin: { l: 250, r: 80, t: 20, b: 60 }
  };
  return { data: plotData, layout, config: PLOTLY_CONFIG };
}
function createTierGaugeChart(data) {
  const overallScore = Math.round(
    (data.operational + data.acquisition + data.digital + data.practice_readiness) / 4
  );
  let tierLabel = "Getting Started";
  let tierColor = ARCHIFICIALS_COLORS.tier1;
  if (overallScore > 24) tierLabel = "Building Foundations";
  tierColor = ARCHIFICIALS_COLORS.tier2;
  if (overallScore > 49) tierLabel = "Accelerating";
  tierColor = ARCHIFICIALS_COLORS.tier3;
  if (overallScore > 74) tierLabel = "Leading";
  tierColor = ARCHIFICIALS_COLORS.tier4;
  const plotData = [
    {
      type: "indicator",
      mode: "gauge+number+delta",
      value: overallScore,
      title: { text: "Overall AI Readiness Score", font: { size: 16 } },
      gauge: {
        axis: { range: [0, 100], tickwidth: 2, tickcolor: ARCHIFICIALS_COLORS.border },
        bar: { color: tierColor, thickness: 20 },
        bgcolor: ARCHIFICIALS_COLORS.bgLight,
        borderwidth: 2,
        bordercolor: ARCHIFICIALS_COLORS.border,
        steps: [
          { range: [0, 24], color: "rgba(244, 192, 137, 0.2)" },
          { range: [24, 49], color: "rgba(240, 160, 80, 0.2)" },
          { range: [49, 74], color: "rgba(226, 115, 8, 0.2)" },
          { range: [74, 100], color: "rgba(168, 82, 6, 0.2)" }
        ],
        threshold: {
          line: { color: "red", width: 0 },
          thickness: 0.75,
          value: 90
        }
      },
      number: {
        font: { size: 40, color: tierColor, family: "-apple-system, sans-serif" }
      },
      suffix: " / 100",
      textfont: { size: 14 }
    }
  ];
  const layout = {
    ...PLOTLY_LAYOUT_DEFAULTS,
    height: 400,
    margin: { l: 20, r: 20, t: 80, b: 20 }
  };
  layout.annotations = [
    {
      text: `<b>Tier: ${tierLabel}</b>`,
      xref: "paper",
      yref: "paper",
      x: 0.5,
      y: -0.1,
      showarrow: false,
      font: { size: 14, color: tierColor }
    }
  ];
  return { data: plotData, layout, config: PLOTLY_CONFIG };
}
function createMarketComparisonChart(data) {
  const categories = data.categories || [
    "Platform Maturity",
    "Data Integration",
    "AI Capability",
    "Team Readiness",
    "Investment Level"
  ];
  const clientScores = data.clientScores || [62, 48, 55, 71, 38];
  const industryAverage = data.industryAverage || [72, 65, 68, 64, 55];
  const plotData = [
    {
      name: "{{CLIENT_NAME}}",
      x: categories,
      y: clientScores,
      type: "bar",
      marker: { color: ARCHIFICIALS_COLORS.accent }
    },
    {
      name: "Industry Average",
      x: categories,
      y: industryAverage,
      type: "bar",
      marker: { color: ARCHIFICIALS_COLORS.textLight, opacity: 0.5 }
    }
  ];
  const layout = {
    ...PLOTLY_LAYOUT_DEFAULTS,
    barmode: "group",
    xaxis: { title: "" },
    yaxis: {
      title: "Score",
      range: [0, 100],
      gridcolor: ARCHIFICIALS_COLORS.border
    },
    height: 400,
    hovermode: "x unified"
  };
  return { data: plotData, layout, config: PLOTLY_CONFIG };
}
function createROIProjectionChart(data) {
  const months = data.months || ["Month 0", "Month 3", "Month 6", "Month 12", "Month 18", "Month 24"];
  const roiValues = data.roi || [-100, -60, -20, 150, 350, 600];
  const investmentLine = data.investment || [-100, -100, -100, -100, -100, -100];
  const plotData = [
    {
      name: "Cumulative ROI",
      x: months,
      y: roiValues,
      type: "scatter",
      mode: "lines+markers",
      line: { color: ARCHIFICIALS_COLORS.success, width: 3 },
      marker: { size: 8, color: ARCHIFICIALS_COLORS.success }
    },
    {
      name: "Investment Level",
      x: months,
      y: investmentLine,
      type: "scatter",
      mode: "lines",
      line: { color: ARCHIFICIALS_COLORS.textLight, width: 2, dash: "dash" },
      marker: { size: 0 }
    }
  ];
  const layout = {
    ...PLOTLY_LAYOUT_DEFAULTS,
    xaxis: { title: "Timeline" },
    yaxis: {
      title: "Value ($K)",
      gridcolor: ARCHIFICIALS_COLORS.border,
      zeroline: true,
      zerolinecolor: ARCHIFICIALS_COLORS.border
    },
    height: 400,
    hovermode: "x unified"
  };
  return { data: plotData, layout, config: PLOTLY_CONFIG };
}
function createImplementationGanttChart(data) {
  const phases = data.phases || [
    "Requirements & Planning",
    "Infrastructure Setup",
    "Core Integration",
    "Testing & QA",
    "Deployment",
    "Training & Support"
  ];
  const startDates = data.startDates || [
    "2026-04-01",
    "2026-05-01",
    "2026-06-01",
    "2026-08-01",
    "2026-09-01",
    "2026-10-01"
  ];
  const endDates = data.endDates || [
    "2026-04-30",
    "2026-05-31",
    "2026-07-31",
    "2026-08-31",
    "2026-09-30",
    "2026-11-30"
  ];
  const plotData = [];
  phases.forEach((phase, idx) => {
    const start = new Date(startDates[idx]);
    const end = new Date(endDates[idx]);
    const duration = (end - start) / (1e3 * 60 * 60 * 24);
    plotData.push({
      x: [start, end],
      y: [phase, phase],
      mode: "lines",
      line: { color: ARCHIFICIALS_COLORS.accent, width: 20 },
      hovertemplate: `<b>${phase}</b><br>Start: ${startDates[idx]}<br>End: ${endDates[idx]}<br>Duration: ${duration} days<extra></extra>`,
      showlegend: false
    });
  });
  const layout = {
    ...PLOTLY_LAYOUT_DEFAULTS,
    xaxis: {
      title: "Timeline",
      type: "date",
      gridcolor: ARCHIFICIALS_COLORS.border
    },
    yaxis: {
      title: ""
    },
    height: 400,
    margin: { l: 200, r: 40, t: 20, b: 60 }
  };
  return { data: plotData, layout, config: PLOTLY_CONFIG };
}
function createCostComparisonChart(data) {
  const scenarios = data.scenarios || {
    A: { label: "Rapid MVP", cost: 35e3, timeline: "3 months", roi_month: 9 },
    B: { label: "Balanced Growth", cost: 75e3, timeline: "6 months", roi_month: 12 },
    C: { label: "Enterprise Scale", cost: 15e4, timeline: "12 months", roi_month: 15 },
    D: { label: "Custom Build", cost: 2e5, timeline: "18 months", roi_month: 18 }
  };
  let tableHTML = `
        <table style="width: 100%; border-collapse: collapse; font-family: -apple-system, sans-serif;">
            <thead>
                <tr style="background: #1a1a2e; color: white;">
                    <th style="padding: 12px; text-align: left; border: 1px solid #e0e0e0;">Scenario</th>
                    <th style="padding: 12px; text-align: right; border: 1px solid #e0e0e0;">Investment</th>
                    <th style="padding: 12px; text-align: left; border: 1px solid #e0e0e0;">Timeline</th>
                    <th style="padding: 12px; text-align: right; border: 1px solid #e0e0e0;">ROI Month</th>
                </tr>
            </thead>
            <tbody>
    `;
  const scenarioOrder = ["scenarioA", "scenarioB", "scenarioC", "scenarioD", "scenarioE", "scenarioF", "A", "B", "C", "D", "E", "F"];
  const sortedKeys = Object.keys(scenarios).sort((a, b) => {
    const ai = scenarioOrder.indexOf(a);
    const bi = scenarioOrder.indexOf(b);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
  sortedKeys.forEach((key) => {
    const scenario = scenarios[key];
    if (!scenario || !scenario.label) return;
    const isRecommended = key === "scenarioC" || key === "C";
    const costRaw = scenario.costs?.totalYear1 || scenario.costs?.total || scenario.cost || "";
    const costDisplay = typeof costRaw === "number" ? `$${(costRaw / 1e3).toFixed(0)}K` : costRaw;
    const timelineDisplay = typeof scenario.timeline === "string" ? scenario.timeline : scenario.timeline?.total || "";
    const roiDisplay = scenario.roiProjection?.estimate || scenario.roiProjection?.paybackPeriod || scenario.roi_month || "";
    tableHTML += `
            <tr style="background: ${isRecommended ? "rgba(226, 115, 8, 0.08)" : "transparent"}; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 12px; font-weight: 600;">${isRecommended ? "\u2605 " : ""}${scenario.label}</td>
                <td style="padding: 10px 12px; text-align: right;">${costDisplay}</td>
                <td style="padding: 10px 12px;">${timelineDisplay}</td>
                <td style="padding: 10px 12px; text-align: right; color: #28a745; font-weight: 600;">${roiDisplay}</td>
            </tr>
        `;
  });
  tableHTML += `
            </tbody>
        </table>
    `;
  return {
    type: "html",
    html: tableHTML
  };
}
function initializeCharts() {
  const chartData = {
    operational: 68,
    acquisition: 52,
    digital: 45,
    practice_readiness: 71
  };
  if (document.getElementById("dimension-radar")) {
    const radarChart = createDimensionRadarChart(chartData);
    Plotly.newPlot("dimension-radar", radarChart.data, radarChart.layout, radarChart.config);
  }
  if (document.getElementById("market-comparison")) {
    const marketChart = createMarketComparisonChart({});
    Plotly.newPlot("market-comparison", marketChart.data, marketChart.layout, marketChart.config);
  }
  if (document.getElementById("implementation-gantt")) {
    const ganttChart = createImplementationGanttChart({});
    Plotly.newPlot("implementation-gantt", ganttChart.data, ganttChart.layout, ganttChart.config);
  }
}
var ARCHIFICIALS_COLORS, PLOTLY_LAYOUT_DEFAULTS, PLOTLY_CONFIG;
var init_charts = __esm({
  "reports/engine/charts.js"() {
    ARCHIFICIALS_COLORS = {
      primary: "#1a1a2e",
      accent: "#e27308",
      accentHover: "#c96407",
      bgLight: "#f8f9fa",
      card: "#ffffff",
      text: "#1a1a2e",
      textLight: "#6c757d",
      border: "#e0e0e0",
      success: "#28a745",
      // Tier colors
      tier1: "#f4c089",
      // Getting Started
      tier2: "#f0a050",
      // Building Foundations
      tier3: "#e27308",
      // Accelerating
      tier4: "#a85206"
      // Leading
    };
    PLOTLY_LAYOUT_DEFAULTS = {
      font: {
        family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: ARCHIFICIALS_COLORS.text,
        size: 12
      },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      margin: { l: 60, r: 40, t: 40, b: 60 },
      showlegend: true,
      legend: {
        orientation: "h",
        y: -0.15,
        x: 0.5,
        xanchor: "center"
      },
      hovermode: "closest"
    };
    PLOTLY_CONFIG = {
      responsive: true,
      displayModeBar: true,
      displaylogo: false,
      modeBarButtonsToRemove: ["pan2d", "lasso2d"]
    };
    if (typeof document !== "undefined") {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeCharts);
      } else {
        initializeCharts();
      }
    }
  }
});

// reports/engine/assembler.js
var assembler_exports = {};
__export(assembler_exports, {
  assemblePresentation: () => assemblePresentation
});
function generateChartsUtilities() {
  const parts = [];
  parts.push("const ARCHIFICIALS_COLORS = " + JSON.stringify(ARCHIFICIALS_COLORS) + ";");
  parts.push("const PLOTLY_LAYOUT_DEFAULTS = " + JSON.stringify(PLOTLY_LAYOUT_DEFAULTS) + ";");
  parts.push("const PLOTLY_CONFIG = " + JSON.stringify(PLOTLY_CONFIG) + ";");
  parts.push(createDimensionRadarChart.toString());
  parts.push(createDimensionBarChart.toString());
  parts.push(createTierGaugeChart.toString());
  parts.push(createMarketComparisonChart.toString());
  parts.push(createROIProjectionChart.toString());
  parts.push(createImplementationGanttChart.toString());
  parts.push(createCostComparisonChart.toString());
  parts.push(`
function initializeCharts(){
    document.querySelectorAll('[data-chart]').forEach(el=>{
        try{
            const cfg = JSON.parse(el.getAttribute('data-chart'));
            Plotly.newPlot(el.id, cfg.data, cfg.layout, cfg.config);
        }catch(e){console.error('Chart init error',e);}
    });
}
if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', initializeCharts);
}else{
    initializeCharts();
}
`);
  return parts.join("\n");
}
function normalizeClaudeResponse(response) {
  if (!response) return {};
  if (response.raw) {
    const match = response.raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) {
      try {
        return JSON.parse(match[1]);
      } catch (e) {
      }
    }
    try {
      return JSON.parse(response.raw);
    } catch (e) {
    }
    return {};
  }
  return response;
}
function esc(str) {
  if (!str) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function titleSlide(text, subtext, date) {
  return `
<section class="slide-title">
    <div class="slide-title-content">
        <div class="logo-anchor">ARCHIFICIALS</div>
        <h1>${esc(text)}</h1>
        ${subtext ? `<p class="subtitle">${esc(subtext)}</p>` : ""}
        ${date ? `<div class="meta">
            <div class="meta-item"><span class="meta-label">Report Generated:</span> ${esc(date)}</div>
            <div class="meta-item"><span class="meta-label">Status:</span> Confidential</div>
        </div>` : ""}
    </div>
</section>
`;
}
function dividerSlide(title, subtitle = "", sectionNum = "") {
  return `
<section class="slide-divider">
    ${sectionNum ? `<div class="section-number">${esc(sectionNum)}</div>` : ""}
    <h1>${esc(title)}</h1>
    ${subtitle ? `<p>${esc(subtitle)}</p>` : ""}
</section>
`;
}
function contentSlide(title, bullets = [], description = "") {
  const validBullets = bullets.filter((b) => b && String(b).trim());
  let bodyHtml = "";
  if (description) {
    bodyHtml += `<p>${description}</p>`;
  }
  if (validBullets.length === 1) {
    bodyHtml += `<p>${validBullets[0]}</p>`;
  } else if (validBullets.length > 1) {
    bodyHtml += `<ul>${validBullets.slice(0, 8).map((b) => `<li>${b}</li>`).join("")}</ul>`;
  }
  if (!bodyHtml) {
    bodyHtml = '<p style="color: var(--text-light); font-style: italic;">Content pending research data.</p>';
  }
  return `
<section class="slide-content">
    <h2>${esc(title)}</h2>
    ${bodyHtml}
</section>
`;
}
function chartSlide(title, chartId, description = "") {
  return `
<section class="slide-content">
    <h2>${esc(title)}</h2>
    <div class="chart-container">
        <div id="${chartId}" class="plotly-graph-div"></div>
        ${description ? `<div class="chart-source">${esc(description)}</div>` : ""}
    </div>
</section>
`;
}
function splitSlide(title, leftHtml, rightHtml) {
  return `
<section class="slide-content">
    <h2>${esc(title)}</h2>
    <div class="grid-2">
        <div>${leftHtml}</div>
        <div>${rightHtml}</div>
    </div>
</section>
`;
}
function scoreCardsSlide(title, cards) {
  const cardsHtml = cards.map((c) => {
    const tierClass = c.score <= 24 ? "tier-1" : c.score <= 49 ? "tier-2" : c.score <= 74 ? "tier-3" : "tier-4";
    return `<div class="score-card ${tierClass}">
            <div class="score-label">${esc(c.label)}</div>
            <div class="score-value">${c.score}<span class="score-suffix">/100</span></div>
            <div class="score-tier">${esc(c.tier)}</div>
        </div>`;
  }).join("");
  return `
<section class="slide-content">
    <h2>${esc(title)}</h2>
    <div class="grid-${Math.min(cards.length, 4)}">
        ${cardsHtml}
    </div>
</section>
`;
}
function scenarioSlide(letter, scenario) {
  if (!scenario) return "";
  const isRecommended = letter === "C";
  const tools = scenario.recommendedTools || scenario.tools || [];
  const toolsList = Array.isArray(tools) ? tools.map((t) => typeof t === "string" ? t : t.name || t.tool || "").filter(Boolean).slice(0, 4) : [];
  const tracks = scenario.tracks || [];
  const tracksList = Array.isArray(tracks) ? tracks.map((t) => typeof t === "string" ? t : t.name || t.track || "").filter(Boolean).slice(0, 4) : [];
  let detailHtml = "";
  if (tracksList.length) {
    detailHtml = `<h3 style="margin-top:16px;">Implementation Tracks</h3><ul>${tracksList.map((t) => `<li>${t}</li>`).join("")}</ul>`;
  } else if (toolsList.length) {
    detailHtml = `<h3 style="margin-top:16px;">Key Tools</h3><ul>${toolsList.map((t) => `<li>${t}</li>`).join("")}</ul>`;
  }
  const leftHtml = `
        <div>
            <h3>Philosophy</h3>
            <p>${scenario.philosophy || scenario.description || ""}</p>
            ${scenario.bestFor ? `<p style="margin-top:12px;"><strong>Best for:</strong> ${scenario.bestFor}</p>` : ""}
            ${detailHtml}
        </div>`;
  const rightHtml = `
        <div class="scenario-card${isRecommended ? " recommended" : ""}">
            <h3>Scenario ${letter}: ${scenario.label || ""}</h3>
            ${scenario.timeline ? `<p><strong>Timeline:</strong> ${typeof scenario.timeline === "string" ? scenario.timeline : scenario.timeline.total || scenario.timeline.length + " phases"}</p>` : ""}
            ${scenario.strengths ? `<p><strong>Strengths:</strong> ${Array.isArray(scenario.strengths) ? scenario.strengths.slice(0, 2).join(", ") : scenario.strengths}</p>` : ""}
            ${scenario.weaknesses ? `<p><strong>Considerations:</strong> ${Array.isArray(scenario.weaknesses) ? scenario.weaknesses.slice(0, 2).join(", ") : scenario.weaknesses}</p>` : ""}
            ${scenario.canBundleWith ? `<p style="font-size:14px; color:var(--accent);"><strong>Bundles with:</strong> ${scenario.canBundleWith}</p>` : ""}
            <div class="cost">${scenario.costs?.totalYear1 || scenario.costs?.total || scenario.cost || "Contact for pricing"}</div>
        </div>`;
  return splitSlide(`Scenario ${letter}: ${scenario.label || ""}`, leftHtml, rightHtml);
}
function assemblePresentation(data) {
  const {
    assessment,
    scores = {},
    vertical,
    clientName,
    date
  } = data;
  const marketAnalysis = normalizeClaudeResponse(data.marketAnalysis);
  const deploymentScenarios = normalizeClaudeResponse(data.deploymentScenarios);
  const meetingBrief = normalizeClaudeResponse(data.meetingBrief);
  function getTierLabel(score) {
    if (score > 74) return "Leading";
    if (score > 49) return "Accelerating";
    if (score > 24) return "Building Foundations";
    return "Getting Started";
  }
  const overallScore = scores.operational && scores.acquisition && scores.digital && scores.practice_readiness ? Math.round((scores.operational + scores.acquisition + scores.digital + scores.practice_readiness) / 4) : scores.overall || 0;
  const execBullets = [];
  if (meetingBrief.executiveSummary) {
    meetingBrief.executiveSummary.split(/\.(?!\d)/).map((s) => s.trim()).filter((s) => s.length > 10).slice(0, 6).forEach((s) => execBullets.push(s + "."));
  }
  const opportunityBullets = (marketAnalysis.gapsOpportunities || []).map(
    (item) => typeof item === "string" ? item : item.opportunity || item.description || item.gap || JSON.stringify(item)
  );
  const slides = [];
  slides.push(titleSlide("AI Readiness Assessment", clientName, date));
  slides.push(dividerSlide("Executive Summary", "Key findings from your AI readiness assessment", "Section 01"));
  if (execBullets.length > 0) {
    slides.push(contentSlide("Key Findings", execBullets));
  } else {
    slides.push(contentSlide("Key Findings", [
      `Overall AI readiness score: ${overallScore}/100 (${getTierLabel(overallScore)})`,
      `Strongest dimension: ${scores.operational >= scores.acquisition && scores.operational >= scores.digital && scores.operational >= scores.practice_readiness ? "Operational Efficiency" : scores.practice_readiness >= scores.acquisition && scores.practice_readiness >= scores.digital ? "Practice Readiness" : scores.acquisition >= scores.digital ? "Client Acquisition" : "Digital Visibility"}`,
      `Primary opportunity area identified for immediate improvement`,
      `Custom deployment scenarios developed based on your profile`
    ]));
  }
  slides.push(dividerSlide("Assessment Results", "Your current AI readiness across 4 strategic dimensions", "Section 02"));
  slides.push(chartSlide("Overall AI Readiness", "overall-gauge", "Based on assessment questionnaire analysis"));
  slides.push(chartSlide("Dimension Scores", "dimension-radar", "Assessment across 4 strategic dimensions"));
  slides.push(scoreCardsSlide("Dimensional Breakdown", [
    { label: "Operational Efficiency", score: scores.operational || 0, tier: getTierLabel(scores.operational || 0) },
    { label: "Client/Student Acquisition", score: scores.acquisition || 0, tier: getTierLabel(scores.acquisition || 0) },
    { label: "Digital Visibility", score: scores.digital || 0, tier: getTierLabel(scores.digital || 0) },
    { label: "Practice/Institutional Readiness", score: scores.practice_readiness || 0, tier: getTierLabel(scores.practice_readiness || 0) }
  ]));
  if (scores.insight_operational || scores.insight_acquisition) {
    const dimInsights = [
      scores.insight_operational,
      scores.insight_acquisition,
      scores.insight_digital,
      scores.insight_practice_readiness
    ].filter(Boolean);
    if (dimInsights.length > 0) {
      slides.push(contentSlide("Dimension Insights", dimInsights));
    }
  }
  if (opportunityBullets.length > 0) {
    slides.push(contentSlide("Top Opportunities", opportunityBullets));
  } else if (scores.top_opportunities && Array.isArray(scores.top_opportunities) && scores.top_opportunities.length > 0) {
    slides.push(contentSlide("Top Opportunities", scores.top_opportunities.map(
      (o) => typeof o === "string" ? o : o.opportunity || o.description || JSON.stringify(o)
    )));
  }
  slides.push(dividerSlide("Market Landscape", "Industry trends and competitive landscape analysis", "Section 03"));
  const industryContent = marketAnalysis.industryOverview?.summary || marketAnalysis.industryOverview?.overview || (typeof marketAnalysis.industryOverview === "string" ? marketAnalysis.industryOverview : "");
  slides.push(contentSlide("Industry AI Adoption", industryContent ? [industryContent] : ["AI adoption trends analysis based on current market research"]));
  const competitorContent = marketAnalysis.competitorLandscape?.summary || marketAnalysis.competitorLandscape?.overview || (typeof marketAnalysis.competitorLandscape === "string" ? marketAnalysis.competitorLandscape : "");
  if (competitorContent) {
    slides.push(contentSlide("Competitive Landscape", [competitorContent]));
  }
  const toolContent = marketAnalysis.toolLandscape?.summary || marketAnalysis.toolLandscape?.overview || (typeof marketAnalysis.toolLandscape === "string" ? marketAnalysis.toolLandscape : "");
  if (toolContent) {
    slides.push(contentSlide("AI Tool Landscape", [toolContent]));
  }
  if (marketAnalysis.toolLandscape?.tools && Array.isArray(marketAnalysis.toolLandscape.tools)) {
    const toolBullets = marketAnalysis.toolLandscape.tools.slice(0, 6).map(
      (t) => typeof t === "string" ? t : `<strong>${t.name || t.tool}</strong> \u2014 ${t.description || t.use || t.category || ""}`
    );
    if (toolBullets.length > 0) {
      slides.push(contentSlide("Key AI Tools in Market", toolBullets));
    }
  }
  if (marketAnalysis.regulatoryCompliance) {
    const regContent = marketAnalysis.regulatoryCompliance.summary || (typeof marketAnalysis.regulatoryCompliance === "string" ? marketAnalysis.regulatoryCompliance : "");
    if (regContent) {
      slides.push(contentSlide("Regulatory & Compliance", [regContent]));
    }
  }
  slides.push(dividerSlide("Deployment Scenarios", "6 implementation pathways tailored to your needs", "Section 04"));
  const scenarioLetters = ["A", "B", "C", "D", "E", "F"];
  const scenarioKeys = ["scenarioA", "scenarioB", "scenarioC", "scenarioD", "scenarioE", "scenarioF"];
  const hasScenarios = scenarioKeys.some((k) => deploymentScenarios[k]);
  if (hasScenarios) {
    scenarioLetters.forEach((letter, idx) => {
      const scenario = deploymentScenarios[scenarioKeys[idx]];
      if (scenario) {
        slides.push(scenarioSlide(letter, scenario));
      }
    });
    slides.push(chartSlide("Investment Comparison", "cost-comparison", "Estimated first-year investment across scenarios"));
    slides.push(chartSlide("ROI Projection", "roi-projection", "Projected return on investment over 24 months"));
    slides.push(chartSlide("Implementation Timeline", "implementation-gantt", "Phased implementation roadmap"));
  } else {
    slides.push(contentSlide("Deployment Scenarios", [
      "Scenario A: Off-the-Shelf AI Stack \u2014 Quick wins with proven tools",
      "Scenario B: Custom AI Platform \u2014 Tailored solution built by Archificials",
      "Scenario C: Hybrid Approach \u2014 Balanced blend of speed and customization",
      "Scenario D: AI-First Transformation \u2014 Full organizational transformation",
      "Scenario E: AI-Powered Client Acquisition & SEO \u2014 External growth focus",
      "Scenario F: AEO & GEO Infrastructure \u2014 Own AI-mediated search"
    ], "Detailed scenarios with timelines and costs will be presented during consultation."));
  }
  slides.push(dividerSlide("Recommended Path Forward", "Our recommendation based on your assessment profile", "Section 05"));
  const recScenario = meetingBrief.recommendedScenario || {};
  if (recScenario.scenario || recScenario.reasoning) {
    slides.push(contentSlide(
      `Recommended: Scenario ${recScenario.scenario || "C"}`,
      [recScenario.reasoning || "Based on your assessment profile, we recommend a balanced approach combining quick wins with strategic custom development."]
    ));
  } else {
    slides.push(contentSlide(
      "Recommended Approach",
      ["Based on your assessment results, we recommend starting with a balanced approach that combines proven tools with targeted custom development to maximize ROI while managing risk."]
    ));
  }
  const agenda = meetingBrief.meetingAgenda || [];
  if (agenda.length > 0) {
    slides.push(contentSlide(
      "Immediate Next Steps",
      agenda.map((item) => typeof item === "string" ? item : item.topic || item.step || item.action || JSON.stringify(item))
    ));
  } else {
    slides.push(contentSlide("Immediate Next Steps", [
      "Schedule a strategy session with our team",
      "Review detailed proposal document",
      "Define success metrics and milestones",
      "Begin phased implementation"
    ]));
  }
  slides.push(contentSlide("What Archificials Delivers", [
    "AI strategy consulting tailored to your industry",
    "Custom platform development and integration",
    "Data pipeline architecture and optimization",
    "Ongoing training, support, and performance monitoring",
    "Measurable ROI tracking and continuous improvement"
  ]));
  slides.push(`
<section class="slide-title">
    <div class="slide-title-content">
        <div class="logo-anchor">ARCHIFICIALS</div>
        <h1>Ready to Transform?</h1>
        <p class="subtitle">Let's discuss which pathway aligns with your vision</p>
        <div class="meta">
            <div class="meta-item"><span class="meta-label">Email:</span> hello@archificials.com</div>
            <div class="meta-item"><span class="meta-label">Web:</span> archificials.com</div>
        </div>
        <div style="margin-top: 40px;">
            <span style="font-size: 13px; color: rgba(255,255,255,0.4);">Confidential \u2014 Prepared for ${esc(clientName)}</span>
        </div>
    </div>
</section>
`);
  const slidesHtml = slides.join("\n");
  const chartConfigs = {
    "overall-gauge": createTierGaugeChart(scores),
    "dimension-radar": createDimensionRadarChart(scores)
  };
  if (hasScenarios) {
    chartConfigs["cost-comparison"] = createCostComparisonChart({ scenarios: deploymentScenarios });
    const scenarioC = deploymentScenarios.scenarioC || deploymentScenarios.scenarioB || {};
    chartConfigs["roi-projection"] = createROIProjectionChart({
      months: scenarioC.timeline?.map?.((t) => t.phase) || [],
      roi: scenarioC.roiProjection ? [parseFloat(scenarioC.roiProjection.estimate || scenarioC.roiProjection) || 0] : [],
      investment: scenarioC.costs ? [parseFloat(scenarioC.costs.totalYear1 || scenarioC.costs.total || 0) || 0] : []
    });
    chartConfigs["implementation-gantt"] = createImplementationGanttChart({
      phases: scenarioC.timeline?.map?.((t) => t.phase) || [],
      startDates: scenarioC.timeline?.map?.((t) => t.start) || [],
      endDates: scenarioC.timeline?.map?.((t) => t.end) || []
    });
  }
  const chartsJsonScript = `(function(){
        var charts = ${JSON.stringify(chartConfigs)};
        Object.entries(charts).forEach(function(entry){
            var id = entry[0], cfg = entry[1];
            var el = document.getElementById(id);
            if(!el || !cfg) return;
            if(cfg.type === 'html' && cfg.html){
                el.innerHTML = cfg.html;
                el.style.overflow = 'auto';
            } else if(cfg.data){
                Plotly.newPlot(id, cfg.data, cfg.layout, cfg.config);
            }
        });
    })();`;
  const chartsUtilities = generateChartsUtilities();
  let html = TEMPLATE_HTML.replace(/\{\{CLIENT_NAME\}\}/g, esc(clientName)).replace(/\{\{DATE\}\}/g, esc(date)).replace("{{SLIDES_HTML}}", slidesHtml).replace("{{CHARTS_UTILITIES}}", chartsUtilities).replace("{{CHARTS_JSON}}", chartsJsonScript);
  return html;
}
var TEMPLATE_HTML;
var init_assembler = __esm({
  "reports/engine/assembler.js"() {
    init_charts();
    TEMPLATE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{CLIENT_NAME}} \u2014 AI Readiness Assessment Report</title>
    <meta name="description" content="Confidential AI readiness assessment and recommendations for {{CLIENT_NAME}}">

    <!-- reveal.js CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/theme/black.css">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Plotly.js -->
    <script src="https://cdn.plot.ly/plotly-latest.min.js"><\/script>

    <style>
        /* ============================================
           Archificials Brand Color Palette
           ============================================ */
        :root {
            --primary: #1a1a2e;
            --primary-light: #2d2d4a;
            --accent: #e27308;
            --accent-hover: #c96407;
            --accent-light: rgba(226, 115, 8, 0.12);
            --bg-light: #f8f9fa;
            --bg-warm: #fefcf9;
            --card: #ffffff;
            --text: #1a1a2e;
            --text-body: #333333;
            --text-light: #6c757d;
            --border: #e0e0e0;
            --border-light: #f0f0f0;
            --success: #28a745;
            --info: #3498db;

            /* Tier Colors */
            --tier-1: #f4c089;
            --tier-2: #f0a050;
            --tier-3: #e27308;
            --tier-4: #a85206;
        }

        /* ============================================
           Base Typography & Layout
           ============================================ */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: var(--primary);
            color: var(--text-body);
        }

        /* ============================================
           Reveal.js Overrides
           ============================================ */
        .reveal {
            width: 100% !important;
            height: 100% !important;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .reveal .slides {
            width: 100%;
            height: 100%;
            text-align: left;
        }

        .reveal section {
            padding: 50px 60px !important;
            height: 100% !important;
            width: 100% !important;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
        }

        /* ============================================
           Slide Backgrounds & Layouts
           ============================================ */
        .slide-content {
            background: var(--card);
            color: var(--text-body);
            padding: 50px 60px;
            border-radius: 12px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
            max-width: 1200px;
            width: 100%;
            position: relative;
            text-align: left;
        }

        .slide-content::before {
            content: 'ARCHIFICIALS';
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 11px;
            font-weight: 700;
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 2px;
            opacity: 0.7;
        }

        .slide-divider {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 60%, #16213e 100%) !important;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
        }

        .slide-divider::before {
            content: '';
            position: absolute;
            top: -30%;
            right: -10%;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(226,115,8,0.08) 0%, transparent 70%);
            pointer-events: none;
        }

        .slide-divider h1 {
            color: var(--card);
            font-size: 52px;
            font-weight: 800;
            margin-bottom: 20px;
            position: relative;
            padding-bottom: 30px;
            letter-spacing: -0.5px;
        }

        .slide-divider h1::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 4px;
            background: var(--accent);
            border-radius: 2px;
        }

        .slide-divider p {
            color: rgba(255,255,255,0.7);
            font-size: 20px;
            max-width: 600px;
            text-align: center;
            font-weight: 300;
            line-height: 1.5;
        }

        .slide-divider .section-number {
            position: absolute;
            top: 40px;
            left: 60px;
            font-size: 13px;
            font-weight: 600;
            color: var(--accent);
            text-transform: uppercase;
            letter-spacing: 3px;
        }

        /* ============================================
           Title Slide
           ============================================ */
        .slide-title {
            background: linear-gradient(135deg, var(--primary) 0%, #0f0f1f 100%) !important;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
        }

        .slide-title::after {
            content: '';
            position: absolute;
            bottom: -50%;
            left: -20%;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(226,115,8,0.06) 0%, transparent 70%);
            pointer-events: none;
        }

        .slide-title-content {
            text-align: center;
            color: var(--card);
            width: 100%;
            position: relative;
            z-index: 1;
        }

        .logo-anchor {
            font-size: 13px;
            color: var(--accent);
            font-weight: 700;
            margin-bottom: 40px;
            text-transform: uppercase;
            letter-spacing: 4px;
        }

        .slide-title h1 {
            font-size: 54px;
            font-weight: 800;
            margin: 20px 0;
            color: var(--card);
            letter-spacing: -1px;
            line-height: 1.1;
        }

        .slide-title .subtitle {
            font-size: 26px;
            color: rgba(255,255,255,0.85);
            margin: 20px 0;
            font-weight: 300;
        }

        .slide-title .meta {
            font-size: 15px;
            color: rgba(255,255,255,0.5);
            margin-top: 50px;
            border-top: 1px solid rgba(255,255,255,0.15);
            padding-top: 25px;
            display: flex;
            justify-content: center;
            gap: 40px;
        }

        .slide-title .meta-item {
            margin: 0;
        }

        .slide-title .meta-label {
            color: var(--accent);
            font-weight: 600;
        }

        /* ============================================
           Content Slide Styles
           ============================================ */
        .slide-content h1,
        .slide-content h2 {
            color: var(--primary);
            font-weight: 700;
            margin-bottom: 24px;
            letter-spacing: -0.3px;
        }

        .slide-content h1 {
            font-size: 38px;
        }

        .slide-content h2 {
            font-size: 30px;
            position: relative;
            padding-bottom: 16px;
        }

        .slide-content h2::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 40px;
            height: 3px;
            background: var(--accent);
            border-radius: 2px;
        }

        .slide-content h3 {
            color: var(--accent);
            font-size: 20px;
            font-weight: 600;
            margin: 20px 0 12px 0;
        }

        .slide-content p {
            color: var(--text-body);
            font-size: 18px;
            line-height: 1.7;
            margin: 12px 0;
        }

        .slide-content li {
            color: var(--text-body);
            font-size: 18px;
            line-height: 1.6;
            margin: 10px 0;
        }

        .slide-content ul,
        .slide-content ol {
            margin-left: 24px;
            margin-top: 16px;
            margin-bottom: 16px;
        }

        .slide-content li {
            margin-bottom: 10px;
            padding-left: 8px;
        }

        .slide-content li::marker {
            color: var(--accent);
            font-weight: 700;
        }

        /* ============================================
           Chart Container
           ============================================ */
        .chart-container {
            margin: 24px 0;
            padding: 24px;
            background: var(--bg-warm);
            border-radius: 10px;
            border: 1px solid var(--border-light);
            width: 100%;
        }

        .chart-title {
            font-size: 18px;
            font-weight: 600;
            color: var(--primary);
            margin-bottom: 12px;
        }

        .plotly-graph-div {
            width: 100% !important;
            height: 450px !important;
        }

        .chart-source {
            font-size: 13px;
            color: var(--text-light);
            margin-top: 12px;
            border-top: 1px solid var(--border-light);
            padding-top: 10px;
            font-style: italic;
        }

        .source-link {
            color: var(--accent);
            text-decoration: none;
        }

        .source-link:hover {
            color: var(--accent-hover);
            text-decoration: underline;
        }

        /* ============================================
           Data Display Cards
           ============================================ */
        .score-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 24px 20px;
            margin: 0;
            text-align: center;
            flex: 1;
            min-width: 200px;
            transition: box-shadow 0.2s ease;
            position: relative;
            overflow: hidden;
        }

        .score-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--border);
        }

        .score-card.tier-1::before { background: var(--tier-1); }
        .score-card.tier-2::before { background: var(--tier-2); }
        .score-card.tier-3::before { background: var(--tier-3); }
        .score-card.tier-4::before { background: var(--tier-4); }

        .score-card.tier-1 { border-color: var(--tier-1); }
        .score-card.tier-2 { border-color: var(--tier-2); }
        .score-card.tier-3 { border-color: var(--tier-3); }
        .score-card.tier-4 { border-color: var(--tier-4); }

        .score-label {
            font-size: 12px;
            font-weight: 700;
            color: var(--text-light);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 10px;
        }

        .score-value {
            font-size: 42px;
            font-weight: 800;
            color: var(--primary);
            margin: 8px 0;
            letter-spacing: -1px;
        }

        .score-tier {
            font-size: 13px;
            font-weight: 600;
            color: var(--accent);
            margin-top: 4px;
        }

        .score-suffix {
            font-size: 18px;
            font-weight: 400;
            color: var(--text-light);
        }

        /* ============================================
           Grid & Flex Utilities
           ============================================ */
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }

        .grid-3 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }

        .grid-4 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 16px;
            margin: 20px 0;
        }

        .flex-row {
            display: flex;
            gap: 15px;
            margin: 15px 0;
        }

        /* ============================================
           Table Styles
           ============================================ */
        .slide-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: var(--card);
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid var(--border);
        }

        .slide-content th {
            background: var(--primary);
            color: var(--card);
            padding: 14px 16px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .slide-content td {
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-light);
            font-size: 15px;
        }

        .slide-content tr:nth-child(even) {
            background: var(--bg-light);
        }

        /* ============================================
           CTA & Buttons
           ============================================ */
        .cta-button {
            display: inline-block;
            background: var(--accent);
            color: var(--card);
            padding: 14px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            margin: 15px 8px;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            letter-spacing: 0.3px;
        }

        .cta-button:hover {
            background: var(--accent-hover);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(226, 115, 8, 0.3);
        }

        .cta-button.secondary {
            background: transparent;
            color: var(--accent);
            border: 2px solid var(--accent);
        }

        .cta-button.secondary:hover {
            background: var(--accent-light);
        }

        /* ============================================
           Scenario Card (special layout)
           ============================================ */
        .scenario-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 24px;
            text-align: left;
        }

        .scenario-card h3 {
            margin: 0 0 8px 0;
            font-size: 18px;
        }

        .scenario-card p {
            font-size: 15px;
            line-height: 1.5;
            margin: 6px 0;
        }

        .scenario-card .cost {
            font-size: 14px;
            font-weight: 600;
            color: var(--accent);
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid var(--border-light);
        }

        .scenario-card.recommended {
            border-color: var(--accent);
            box-shadow: 0 2px 12px rgba(226, 115, 8, 0.1);
        }

        .scenario-card.recommended::before {
            content: 'RECOMMENDED';
            display: block;
            font-size: 10px;
            font-weight: 700;
            color: var(--card);
            background: var(--accent);
            padding: 3px 10px;
            border-radius: 4px;
            margin-bottom: 12px;
            width: fit-content;
            letter-spacing: 1px;
        }

        /* ============================================
           Slide Footer & Header
           ============================================ */
        .reveal .slide-number {
            background: transparent;
            color: rgba(255,255,255,0.3);
            font-size: 12px;
            font-family: 'Inter', sans-serif;
        }

        .slide-footer {
            position: absolute;
            bottom: 16px;
            left: 60px;
            right: 60px;
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: var(--text-light);
            pointer-events: none;
            opacity: 0.6;
        }

        /* ============================================
           Insight/Quote Block
           ============================================ */
        .insight-block {
            background: var(--accent-light);
            border-left: 4px solid var(--accent);
            padding: 16px 20px;
            border-radius: 0 8px 8px 0;
            margin: 16px 0;
        }

        .insight-block p {
            font-size: 16px;
            font-style: italic;
            color: var(--text-body);
            margin: 0;
        }

        /* ============================================
           Key Metric Row
           ============================================ */
        .metric-row {
            display: flex;
            gap: 24px;
            margin: 16px 0;
        }

        .metric-item {
            flex: 1;
            text-align: center;
            padding: 16px;
            background: var(--bg-light);
            border-radius: 8px;
        }

        .metric-item .value {
            font-size: 28px;
            font-weight: 800;
            color: var(--primary);
        }

        .metric-item .label {
            font-size: 12px;
            font-weight: 600;
            color: var(--text-light);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 4px;
        }

        /* ============================================
           Reveal.js Print/PDF Overrides
           ============================================ */
        @media print {
            .reveal section {
                page-break-after: always;
                padding: 40px !important;
            }

            .slide-footer {
                display: none;
            }

            .chart-container {
                page-break-inside: avoid;
            }
        }

        /* ============================================
           Reveal.js Speaker Notes (Hidden)
           ============================================ */
        .notes {
            display: none;
        }
    </style>
</head>
<body>
    <div class="reveal">
        <div class="slides">
            {{SLIDES_HTML}}
        </div>
    </div>

    <!-- Reveal.js -->
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@5"><\/script>

    <!-- Archificials Plotly Chart Utilities -->
    <script>
        {{CHARTS_UTILITIES}}
    <\/script>

    <!-- Initialize Reveal.js -->
    <script>
        Reveal.initialize({
            width: 1920,
            height: 1080,
            margin: 0.04,
            minScale: 0.2,
            maxScale: 2.0,
            hash: true,
            keyboard: true,
            center: true,
            transition: 'slide',
            transitionSpeed: 'default',
            slideNumber: 'c/t',
            overview: true
        });
    <\/script>

    <!-- Chart Data & Population -->
    <script>
        {{CHARTS_JSON}}
    <\/script>
</body>
</html>`;
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
async function braveSearch(query, apiKey) {
  try {
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=10`;
    const res = await fetch(url, { headers: { "X-Subscription-Token": apiKey } });
    if (!res.ok) {
      console.error(`Brave API error: ${res.status}`);
      return [];
    }
    const data = await res.json();
    return data.web?.results?.map((r) => ({
      title: r.title,
      url: r.url,
      description: r.description,
      age: r.age
    })) || [];
  } catch (e) {
    console.error("Brave search error:", e);
    return [];
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
async function callClaudeAPI(systemPrompt, userPrompt, apiKey, maxTokens = 4096) {
  const enhancedSystem = systemPrompt + "\n\nCRITICAL: Output ONLY raw JSON. No markdown, no ```json blocks, no text before or after. Start with { and end with }.";
  const body = JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: maxTokens,
    stream: true,
    system: enhancedSystem,
    messages: [{ role: "user", content: userPrompt }]
  });
  console.log(`Claude API call (streaming): ${body.length} bytes, maxTokens=${maxTokens}`);
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const start = Date.now();
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        },
        body
      });
      if (res.status === 524 || res.status === 502 || res.status === 503) {
        const elapsed2 = Date.now() - start;
        console.log(`Claude API stream error: ${res.status} in ${elapsed2}ms (attempt ${attempt})`);
        if (attempt < 2) {
          console.log("Retrying...");
          continue;
        }
        return { _error: `Claude API ${res.status} after ${attempt} attempts` };
      }
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Claude API error: ${res.status} \u2014 ${errorText}`);
        return { _error: `Claude API ${res.status}: ${errorText}` };
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let content = "";
      let stopReason = null;
      let outputTokens = 0;
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const event = JSON.parse(data);
            if (event.type === "content_block_delta" && event.delta?.text) {
              content += event.delta.text;
            } else if (event.type === "message_delta") {
              stopReason = event.delta?.stop_reason || stopReason;
              outputTokens = event.usage?.output_tokens || outputTokens;
            } else if (event.type === "error") {
              console.error("Stream error event:", JSON.stringify(event.error));
              return { _error: `Stream error: ${event.error?.message || "unknown"}` };
            }
          } catch {
          }
        }
      }
      const elapsed = Date.now() - start;
      console.log(`Claude API streamed: ${elapsed}ms, stop=${stopReason}, tokens=${outputTokens}, chars=${content.length}`);
      if (!content) {
        console.error("No content accumulated from stream");
        return { _error: "No content in Claude stream response" };
      }
      if (stopReason === "max_tokens") {
        console.warn("Claude response was TRUNCATED (hit max_tokens)");
      }
      try {
        return JSON.parse(content);
      } catch {
        const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (codeBlockMatch) {
          try {
            return JSON.parse(codeBlockMatch[1].trim());
          } catch {
          }
        }
        const firstBrace = content.indexOf("{");
        const lastBrace = content.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace > firstBrace) {
          try {
            return JSON.parse(content.substring(firstBrace, lastBrace + 1));
          } catch {
          }
        }
        const firstBracket = content.indexOf("[");
        const lastBracket = content.lastIndexOf("]");
        if (firstBracket !== -1 && lastBracket > firstBracket) {
          try {
            return JSON.parse(content.substring(firstBracket, lastBracket + 1));
          } catch {
          }
        }
        console.error("Failed to parse Claude response as JSON. First 500 chars:", content.substring(0, 500));
        return { raw: content, _error: "JSON parse failed" };
      }
    } catch (e) {
      console.error(`Claude API exception (attempt ${attempt}):`, e.message || e);
      if (attempt >= 2) return { _error: `Exception: ${e.message || e}` };
    }
  }
}
function generateMeetingBriefEmail(clientName, meetingBrief) {
  const agenda = meetingBrief.meetingAgenda || [];
  const investment = meetingBrief.investment || {};
  const rec = meetingBrief.recommendedScenario || {};
  const agendaHtml = agenda.map(
    (item) => `<tr><td style="padding:8px;border-bottom:1px solid #e0e0e0;"><strong>${item.timeSlot}</strong></td><td style="padding:8px;border-bottom:1px solid #e0e0e0;">${item.topic}</td></tr>`
  ).join("");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:#1a1a2e;color:white;padding:20px;border-radius:8px 8px 0 0}.content{background:#f8f9fa;padding:20px;border-radius:0 0 8px 8px}.section{margin-bottom:24px}.section-title{color:#1a1a2e;font-size:18px;font-weight:600;margin-bottom:12px;border-bottom:2px solid #e27308;padding-bottom:8px}table{width:100%;border-collapse:collapse}.subtle{color:#6c757d;font-size:14px}</style></head><body><div class="container"><div class="header"><h1>Meeting Brief: ${clientName}</h1><p class="subtle">Prepared by Archificials Research Pipeline</p></div><div class="content"><div class="section"><div class="section-title">Executive Summary</div><p>${meetingBrief.executiveSummary || "See full brief"}</p></div><div class="section"><div class="section-title">Key Pain Points</div>${meetingBrief.painPoints?.map((p) => `<p><strong>${p.point}</strong> (Severity: ${p.severity}/10)</p>`).join("") || "<p>See full brief</p>"}</div><div class="section"><div class="section-title">Recommended Scenario</div><p><strong>Lead with: Scenario ${rec.scenario}</strong></p><p>${rec.hook || ""}</p></div><div class="section"><div class="section-title">Investment Range</div><p><strong>First year:</strong> ${investment.recommendedRange || "See full brief"}</p><p><strong>Payback:</strong> ${investment.paybackPeriod || "See full brief"}</p></div><div class="section"><div class="section-title">Meeting Agenda (60 min)</div><table>${agendaHtml || '<tr><td colspan="2">See full brief</td></tr>'}</table></div><div class="section"><p class="subtle">Full research includes market analysis, 6 deployment scenarios, and meeting strategy. Internal use only.</p></div></div></div></body></html>`;
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
      return new Response(JSON.stringify({ status: "ok", version: "4.2.0-stream" }), {
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
        console.log(`[1/7] Fetching record ${recordId}`);
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
        console.log("[2/7] Running Brave Search");
        const { buildSearchQueries } = await Promise.resolve().then(() => __toESM(require_market_analysis()));
        const queries = buildSearchQueries(assessmentData);
        const searchResults = await Promise.all(
          queries.map((q) => braveSearch(q, env.BRAVE_API_KEY))
        );
        console.log(`[2/7] Got ${searchResults.flat().length} search results`);
        console.log("[3/7] Generating market analysis");
        const { buildMarketAnalysisPrompt } = await Promise.resolve().then(() => __toESM(require_market_analysis()));
        const marketPrompt = buildMarketAnalysisPrompt(assessmentData, searchResults);
        const marketAnalysis = await callClaudeAPI(
          marketPrompt.system,
          marketPrompt.user,
          env.ANTHROPIC_API_KEY,
          8e3
        );
        if (!marketAnalysis || marketAnalysis._error) {
          console.error("[3/7] Market analysis failed:", marketAnalysis?._error);
          return new Response(JSON.stringify({
            error: "Market analysis failed",
            detail: marketAnalysis?._error,
            elapsed_ms: Date.now() - pipelineStart
          }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
        console.log(`[3/7] Market analysis complete at ${((Date.now() - pipelineStart) / 1e3).toFixed(1)}s`);
        console.log("[4-5/7] Generating scenarios + meeting brief IN PARALLEL");
        const { buildDeploymentScenariosPrompt } = await Promise.resolve().then(() => __toESM(require_deployment_scenarios()));
        const { buildMeetingBriefPrompt } = await Promise.resolve().then(() => __toESM(require_meeting_brief()));
        const scenariosPrompt = buildDeploymentScenariosPrompt(assessmentData, searchResults, marketAnalysis);
        const briefPrompt = buildMeetingBriefPrompt(assessmentData, marketAnalysis, null);
        const [deploymentScenarios, meetingBrief] = await Promise.all([
          callClaudeAPI(scenariosPrompt.system, scenariosPrompt.user, env.ANTHROPIC_API_KEY, 8e3),
          callClaudeAPI(briefPrompt.system, briefPrompt.user, env.ANTHROPIC_API_KEY, 8e3)
        ]);
        if (!deploymentScenarios || deploymentScenarios._error) {
          console.error("[4/7] Scenarios failed:", deploymentScenarios?._error);
          return new Response(JSON.stringify({
            error: "Deployment scenarios failed",
            detail: deploymentScenarios?._error,
            elapsed_ms: Date.now() - pipelineStart
          }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
        if (!meetingBrief || meetingBrief._error) {
          console.error("[5/7] Meeting brief failed:", meetingBrief?._error);
          return new Response(JSON.stringify({
            error: "Meeting brief failed",
            detail: meetingBrief?._error,
            elapsed_ms: Date.now() - pipelineStart
          }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
        console.log(`[4-5/7] Parallel calls done at ${((Date.now() - pipelineStart) / 1e3).toFixed(1)}s`);
        console.log("[6/7] Assembling presentation");
        const clientName = assessmentData.inst_name || assessmentData.firm_name || "Client";
        const clientSlug = clientName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        const now = /* @__PURE__ */ new Date();
        const slugDate = `${clientSlug}-${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
        const friendlyDate = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        const results = {
          assessmentId: recordId,
          vertical,
          generatedAt: now.toISOString(),
          marketAnalysis,
          deploymentScenarios,
          meetingBrief
        };
        await env.REPORTS_BUCKET.put(`reports/${clientSlug}/research.json`, JSON.stringify(results, null, 2), {
          contentType: "application/json",
          metadata: { generated: now.toISOString(), vertical }
        });
        const { assemblePresentation: assemblePresentation2 } = await Promise.resolve().then(() => (init_assembler(), assembler_exports));
        const reportHtml = assemblePresentation2({
          assessment: assessmentData,
          scores,
          marketAnalysis,
          deploymentScenarios,
          meetingBrief,
          vertical,
          clientName,
          date: friendlyDate
        });
        const password = Math.random().toString(36).substring(2, 10);
        const pwHashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
        const pwHash = Array.from(new Uint8Array(pwHashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
        await env.REPORTS_BUCKET.put(`reports/${slugDate}/index.html`, reportHtml, {
          httpMetadata: { contentType: "text/html" },
          customMetadata: { passwordHash: pwHash, clientName }
        });
        console.log(`[6/7] Report uploaded: ${slugDate}`);
        console.log("[7/7] Sending notification email");
        let emailHtml = generateMeetingBriefEmail(clientName, meetingBrief);
        const gatewayHost = url.host.replace("report-orchestrator", "report-gateway");
        const reportUrl = `https://${gatewayHost}/r/${slugDate}`;
        emailHtml += `<hr/><p><strong>Report URL:</strong> <a href="${reportUrl}">${reportUrl}</a></p><p><strong>Password:</strong> ${password}</p>`;
        await sendNotificationEmail(
          env.NOTIFY_EMAIL,
          `Report Ready: ${clientName}`,
          emailHtml,
          env.RESEND_API_KEY
        );
        const totalElapsed = Date.now() - pipelineStart;
        console.log(`Pipeline complete in ${(totalElapsed / 1e3).toFixed(1)}s. Slug: ${slugDate}, Password: ${password}`);
        return new Response(JSON.stringify({
          status: "complete",
          slug: slugDate,
          password,
          reportUrl,
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
