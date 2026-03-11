/**
 * Module B: Criminal Defense & Civil Rights
 * QB1-QB8 - Felony, DWI/DUI, Title IX, white collar, civil rights.
 */
export const MODULE_KEY = "B";
export const MODULE_NAME = "Criminal Defense & Civil Rights";

export const QUESTIONS = [
  {
    id: "case_mix_crim",
    label: "QB1",
    category: "CASE PROFILE",
    question: "What types of matters make up most of your caseload?",
    type: "single-select",
    required: true,
    options: [
      "Felony criminal defense (state and federal courts)",
      "DWI, DUI, or traffic-related criminal offenses",
      "Sex offense or Title IX defense",
      "White collar crime or financial fraud defense",
      "Civil rights and Section 1983 claims",
      "A mix across criminal defense categories",
    ],
  },
  {
    id: "intake_speed_crim",
    label: "QB2",
    category: "OPERATIONS",
    question: "When a new criminal matter comes in, how quickly can your team assess whether and how to help?",
    subtitle: "Clients facing criminal charges need a fast response. Speed of triage matters significantly to case outcomes and client trust.",
    type: "single-select",
    required: true,
    options: [
      "Same day: we assess and advise immediately",
      "Within 24-48 hours",
      "Within the week",
      "It varies depending on attorney availability",
    ],
  },
  {
    id: "discovery_crim",
    label: "QB3",
    category: "OPERATIONS",
    question: "How does your team handle discovery review for a complex matter?",
    subtitle: "Criminal discovery can include police reports, body camera footage, forensic evidence, and witness statements.",
    type: "single-select",
    required: true,
    options: [
      "The lead attorney reviews all discovery personally",
      "A paralegal does the initial review; attorney reviews flagged items",
      "We use technology or tools to organize and index materials",
      "We don't have a consistent process for discovery organization",
    ],
  },
  {
    id: "sentencing_research_crim",
    label: "QB4",
    category: "OPERATIONS",
    question: "How do you research sentencing ranges, comparable cases, or local jury patterns?",
    type: "single-select",
    required: true,
    options: [
      "Through Westlaw, LexisNexis, or a formal research service",
      "Through our network of local practitioners who share this knowledge",
      "Relying on attorney experience and professional judgment",
      "We don't have a systematic approach to this research",
    ],
  },
  {
    id: "client_comm_crim",
    label: "QB5",
    category: "OPERATIONS",
    question: "How do you keep clients informed through long proceedings?",
    subtitle: "Criminal defense clients face immense anxiety and need regular contact to maintain trust in their representation.",
    type: "single-select",
    required: true,
    options: [
      "Direct attorney communication at all key stages",
      "Paralegals or staff handle routine status communication",
      "We have a structured communication schedule from the start",
      "Client communication is ad hoc \u2014 clients reach out when they need to",
    ],
  },
  {
    id: "client_source_crim",
    label: "QB6",
    category: "CLIENT ACQUISITION",
    question: "Where do most of your new clients come from?",
    type: "single-select",
    required: true,
    options: [
      "Attorney referrals and professional networks (primary)",
      "Past client referrals and word of mouth",
      "Online reviews, Google search, or legal directories",
      "A consistent mix of referral and digital sources",
    ],
  },
  {
    id: "digital_presence_crim",
    label: "QB7",
    category: "DIGITAL VISIBILITY",
    question: "How would you describe your firm's online reputation and public-facing presence?",
    subtitle: "Criminal defense clients often search online during high-stress moments. First impressions matter enormously.",
    type: "single-select",
    required: true,
    options: [
      "Strong: we have reviews, case mentions, and active directory profiles",
      "Moderate: we are listed but profiles are not fully built out",
      "Minimal: basic website, limited reviews, little directory presence",
      "We haven't focused on our online reputation yet",
    ],
  },
  {
    id: "bottleneck_crim",
    label: "QB8",
    category: "OPERATIONS",
    question: "What is the primary bottleneck in your caseload today?",
    type: "single-select",
    required: true,
    options: [
      "Initial case evaluation and intake decision-making",
      "Reviewing and organizing discovery materials efficiently",
      "Legal research, brief writing, and motion practice",
      "Managing client communication and expectations",
      "Court filings, deadline tracking, and calendar management",
    ],
  },
];
