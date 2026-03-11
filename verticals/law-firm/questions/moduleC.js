/**
 * Module C: Business & Commercial Litigation
 * QC1-QC8 - Contract claims, shareholder disputes, employment lit, RE disputes, IP disputes, gov enforcement.
 */
export const MODULE_KEY = "C";
export const MODULE_NAME = "Business & Commercial Litigation";

export const QUESTIONS = [
  {
    id: "case_mix_comm",
    label: "QC1",
    category: "CASE PROFILE",
    question: "What types of commercial disputes make up most of your work?",
    type: "single-select",
    required: true,
    options: [
      "Breach of contract and business tort claims",
      "Shareholder, partnership, or internal business disputes",
      "Employment and workplace litigation",
      "Real estate or construction disputes",
      "IP, trade secret, or technology-related disputes",
      "Government or regulatory enforcement matters",
      "A mix across commercial litigation categories",
    ],
  },
  {
    id: "discovery_comm",
    label: "QC2",
    category: "OPERATIONS",
    question: "How does your team handle large document productions in discovery?",
    subtitle: "Commercial litigation often involves high document volume. Review process significantly affects matter economics.",
    type: "single-select",
    required: true,
    options: [
      "Attorneys and paralegals review all documents manually",
      "We use an outside vendor for large-volume document review",
      "We have software tools that help organize and categorize documents",
      "We haven't had to handle large-volume discovery recently",
    ],
  },
  {
    id: "research_comm",
    label: "QC3",
    category: "OPERATIONS",
    question: "How do you develop legal theory and build the research strategy for a new matter?",
    type: "single-select",
    required: true,
    options: [
      "The lead partner researches and builds the theory personally",
      "Associates research and draft; partners review and direct",
      "We use a combination of research services and internal research",
      "We leverage our experience in similar matters and supplement with research",
    ],
  },
  {
    id: "client_comm_comm",
    label: "QC4",
    category: "OPERATIONS",
    question: "How do you keep business clients informed on complex matters?",
    subtitle: "Business clients expect regular updates and are often reporting to boards or leadership internally.",
    type: "single-select",
    required: true,
    options: [
      "Regular written status reports and strategy memos",
      "Periodic calls or meetings as milestones arise",
      "A client portal where they can access matter information",
      "Attorney-driven updates on an ad hoc basis",
    ],
  },
  {
    id: "drafting_comm",
    label: "QC5",
    category: "OPERATIONS",
    question: "How do you develop and produce motions, briefs, and client correspondence?",
    type: "single-select",
    required: true,
    options: [
      "Partners draft most substantive work directly",
      "Associates draft; partners review, edit, and finalize",
      "We use templates for routine documents; custom work for complex matters",
      "Each attorney has their own drafting workflow",
    ],
  },
  {
    id: "client_source_comm",
    label: "QC6",
    category: "CLIENT ACQUISITION",
    question: "How do most of your new matters originate?",
    type: "single-select",
    required: true,
    options: [
      "Attorney referrals from other firms (primary)",
      "Business client referrals from existing relationships",
      "In-house counsel recommendations and referrals",
      "Digital visibility, directories, and online reputation",
    ],
  },
  {
    id: "budget_tracking_comm",
    label: "QC7",
    category: "OPERATIONS",
    question: "How do you track matter budgets, billing, and profitability by client?",
    type: "single-select",
    required: true,
    options: [
      "We track this carefully in our billing software with matter-level reporting",
      "We have general oversight but limited granularity per matter",
      "Attorneys track their own matters independently",
      "Matter budget tracking is an area we know needs improvement",
    ],
  },
  {
    id: "bottleneck_comm",
    label: "QC8",
    category: "OPERATIONS",
    question: "What is the most significant constraint on growing or improving your commercial practice?",
    type: "single-select",
    required: true,
    options: [
      "Business development and bringing in new matters",
      "Managing multiple complex matters simultaneously",
      "Associate leverage, quality supervision, and output consistency",
      "Administrative overhead, billing, and collection efficiency",
      "Keeping up with legal research across evolving areas of law",
    ],
  },
];
