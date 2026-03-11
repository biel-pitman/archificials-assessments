/**
 * Module H: Family Law & Domestic Relations
 * QH1-QH8 - Divorce, property division, custody, support, protective orders, prenups.
 */
export const MODULE_KEY = "H";
export const MODULE_NAME = "Family Law & Domestic Relations";

export const QUESTIONS = [
  {
    id: "case_mix_family",
    label: "QH1",
    category: "CASE PROFILE",
    question: "What types of family law matters make up the majority of your caseload?",
    type: "single-select",
    required: true,
    options: [
      "Divorce and property division (primary focus)",
      "Child custody and parenting plan disputes",
      "Child support and spousal maintenance matters",
      "Protective orders and domestic violence matters",
      "Post-decree modifications and enforcement",
      "Prenuptial or postnuptial agreements",
      "A mix across family law categories",
    ],
  },
  {
    id: "financial_gathering_family",
    label: "QH2",
    category: "OPERATIONS",
    question: "How do you gather and organize financial information from clients in divorce matters?",
    subtitle: "Financial disclosure is one of the most time-consuming phases of a divorce matter.",
    type: "single-select",
    required: true,
    options: [
      "The client provides documents and the attorney or paralegal organizes them",
      "We send clients a structured financial questionnaire before the first meeting",
      "We use a client portal for document collection and organization",
      "Our financial document process could be significantly more consistent",
    ],
  },
  {
    id: "doc_drafting_family",
    label: "QH3",
    category: "OPERATIONS",
    question: "How do you draft parenting plans, settlement agreements, and proposed orders?",
    type: "single-select",
    required: true,
    options: [
      "From scratch, based on client and case facts each time",
      "Using templates that attorneys customize for each matter",
      "Associates draft; partners review and finalize",
      "Process varies significantly by attorney",
    ],
  },
  {
    id: "client_comm_family",
    label: "QH4",
    category: "OPERATIONS",
    question: "How do you manage client communication through emotionally intense and lengthy proceedings?",
    subtitle: "Family law clients often contact the office frequently and may have unrealistic timeline expectations.",
    type: "single-select",
    required: true,
    options: [
      "Direct attorney communication throughout the matter",
      "Paralegals handle day-to-day client questions",
      "We set clear communication expectations and schedules at intake",
      "Client communication volume is a significant time demand on attorneys",
    ],
  },
  {
    id: "mediation_family",
    label: "QH5",
    category: "OPERATIONS",
    question: "How does your firm approach mediation and alternative dispute resolution?",
    type: "single-select",
    required: true,
    options: [
      "Most matters go through mediation as standard practice",
      "We use mediation selectively based on the dynamics of each case",
      "We prefer to resolve matters through negotiation before court",
      "We refer mediation to outside neutrals when it is required",
    ],
  },
  {
    id: "client_source_family",
    label: "QH6",
    category: "CLIENT ACQUISITION",
    question: "How do most of your family law clients find you?",
    type: "single-select",
    required: true,
    options: [
      "Past client referrals and word of mouth",
      "Attorney referrals from other practices",
      "Online reviews, Google search, or legal directories",
      "Community involvement and local reputation",
    ],
  },
  {
    id: "digital_presence_family",
    label: "QH7",
    category: "DIGITAL VISIBILITY",
    question: "How would you describe your firm's online presence and reputation in your market?",
    type: "single-select",
    required: true,
    options: [
      "Strong: active reviews, attorney profiles, and clear messaging by case type",
      "Moderate: listed on directories but profiles are not fully developed",
      "Minimal: basic website, few reviews, limited visibility",
      "Digital presence is not something we have focused on yet",
    ],
  },
  {
    id: "bottleneck_family",
    label: "QH8",
    category: "OPERATIONS",
    question: "What is the biggest operational challenge in your family law practice today?",
    type: "single-select",
    required: true,
    options: [
      "Managing high client contact volume and emotional intensity",
      "Financial analysis and document gathering in complex divorces",
      "Drafting agreements, parenting plans, and court documents efficiently",
      "Managing case timelines and court deadlines across a full docket",
      "Keeping billing efficient when client needs vary widely",
    ],
  },
];
