/**
 * Module D: Intellectual Property & Technology Law
 * QD1-QD8 - Patents, trademarks, copyrights, tech transactions, data privacy, OGC for tech cos.
 */
export const MODULE_KEY = "D";
export const MODULE_NAME = "IP & Technology Law";

export const QUESTIONS = [
  {
    id: "case_mix_ip",
    label: "QD1",
    category: "CASE PROFILE",
    question: "What best describes your IP and technology practice?",
    type: "single-select",
    required: true,
    options: [
      "IP litigation (patent, trademark, copyright enforcement and defense)",
      "IP prosecution and portfolio management (filings, registrations, strategy)",
      "Technology transactions (SaaS agreements, licensing, development contracts)",
      "Outside general counsel for technology companies and startups",
      "Data privacy, cybersecurity compliance, and breach response",
      "A combination of IP advisory and litigation work",
    ],
  },
  {
    id: "research_ip",
    label: "QD2",
    category: "OPERATIONS",
    question: "How does your team handle prior art searches, trademark clearance, or freedom-to-operate analysis?",
    subtitle: "Research-intensive tasks that are often bottlenecks in IP prosecution and litigation.",
    type: "single-select",
    required: true,
    options: [
      "Manually through patent databases, trademark registers, and research tools",
      "Through specialized outside research vendors",
      "Using technology tools integrated into our research workflow",
      "Relying primarily on attorney expertise and judgment",
      "Each matter is handled differently depending on client and complexity",
    ],
  },
  {
    id: "portfolio_ip",
    label: "QD3",
    category: "OPERATIONS",
    question: "How do you manage IP portfolios for clients with many patents, trademarks, or copyrights?",
    type: "single-select",
    required: true,
    options: [
      "Through dedicated IP portfolio management software",
      "In spreadsheets or custom internal tracking systems",
      "Within our case or matter management software",
      "Portfolio management at this scale is not a major need for us currently",
    ],
  },
  {
    id: "contracts_ip",
    label: "QD4",
    category: "OPERATIONS",
    question: "How do you draft and review technology contracts, licensing agreements, and privacy policies?",
    type: "single-select",
    required: true,
    options: [
      "From scratch, relying on attorney knowledge and prior work product",
      "Using templates that attorneys customize for each matter",
      "Using contract review tools to flag key terms and deviations",
      "Associates draft; partners review and finalize",
    ],
  },
  {
    id: "regulatory_ip",
    label: "QD5",
    category: "OPERATIONS",
    question: "How do you track regulatory developments in privacy law, cybersecurity standards, and technology legislation?",
    subtitle: "This area changes faster than any other. Staying current is a core competency for IP and tech firms.",
    type: "single-select",
    required: true,
    options: [
      "Through dedicated legal news subscriptions and regulatory alert services",
      "Through bar association and industry group involvement",
      "Relying on existing expertise and informal monitoring",
      "Tracking regulatory changes systematically is a gap for us",
    ],
  },
  {
    id: "ogc_delivery_ip",
    label: "QD6",
    category: "CLIENT ACQUISITION",
    question: "For clients you serve as outside general counsel, how do you communicate and deliver advice efficiently?",
    type: "single-select",
    required: true,
    options: [
      "We have a dedicated matter management and reporting system",
      "Regular check-ins and formal written advice memos",
      "Primarily through email and calls as matters arise",
      "We are building out this service capability",
    ],
  },
  {
    id: "digital_presence_ip",
    label: "QD7",
    category: "DIGITAL VISIBILITY",
    question: "How visible is your firm in the technology and IP legal market?",
    type: "single-select",
    required: true,
    options: [
      "Well recognized: ranked, awarded, and cited in our target market",
      "Visible through some directories and peer recognition",
      "We have a website and basic directory listings but limited active visibility",
      "Digital visibility is not a current priority for our practice",
    ],
  },
  {
    id: "bottleneck_ip",
    label: "QD8",
    category: "OPERATIONS",
    question: "What is the biggest constraint on your IP or technology practice right now?",
    type: "single-select",
    required: true,
    options: [
      "Keeping up with the pace of legal change in tech, privacy, and AI law",
      "Managing research and analysis efficiently across many matters",
      "Capacity constraints \u2014 too much work, not enough hours",
      "Client business development in a competitive market",
      "Expanding the team's knowledge base in emerging technology law",
    ],
  },
];
