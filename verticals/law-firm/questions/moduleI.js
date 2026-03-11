/**
 * Module I: Multi-Practice & General Counsel
 * QI1-QI8 - Cross-practice coordination, knowledge management, billing, OGC delivery.
 */
export const MODULE_KEY = "I";
export const MODULE_NAME = "Multi-Practice & General Counsel";

export const QUESTIONS = [
  {
    id: "case_mix_multi",
    label: "QI1",
    category: "CASE PROFILE",
    question: "Which practice areas generate the most work at your firm?",
    type: "single-select",
    required: true,
    options: [
      "Business formation, transactions, and corporate governance",
      "Civil litigation: commercial, employment, or property disputes",
      "Estate planning, probate, and wealth transfer",
      "Real estate and development",
      "Government, regulatory, or administrative matters",
      "A roughly equal mix across all practice areas",
    ],
  },
  {
    id: "matter_mgmt_multi",
    label: "QI2",
    category: "OPERATIONS",
    question: "How do you manage matters across different practice areas within the same firm?",
    type: "single-select",
    required: true,
    options: [
      "Each attorney manages their own matters independently",
      "We have a shared matter management system used firm-wide",
      "We cross-refer between practice groups with a coordinating attorney",
      "Matter management consistency across practice areas is a known challenge",
    ],
  },
  {
    id: "cross_practice_multi",
    label: "QI3",
    category: "OPERATIONS",
    question: "When a client brings a matter involving multiple practice areas, how do you coordinate internally?",
    type: "single-select",
    required: true,
    options: [
      "Formal internal collaboration with a designated lead attorney",
      "Informal coordination through email and calls between attorneys",
      "We assign it to the most senior relevant attorney",
      "We refer out to specialists for areas outside our strongest competencies",
    ],
  },
  {
    id: "client_comm_multi",
    label: "QI4",
    category: "OPERATIONS",
    question: "How do you keep clients informed when matters span long periods or multiple practice areas?",
    type: "single-select",
    required: true,
    options: [
      "Comprehensive status reports and regular scheduled check-ins",
      "Updates provided when there is something material to report",
      "Each attorney manages their own client relationships independently",
      "Client communication quality is inconsistent across the firm",
    ],
  },
  {
    id: "billing_multi",
    label: "QI5",
    category: "OPERATIONS",
    question: "How do you track time, billing, and profitability across different matter types?",
    type: "single-select",
    required: true,
    options: [
      "We track carefully with matter-level reporting in our billing system",
      "We have general oversight but limited granularity per matter or practice area",
      "Attorneys track their own matters without firm-wide visibility",
      "Billing and profitability tracking is an area that needs improvement",
    ],
  },
  {
    id: "client_source_multi",
    label: "QI6",
    category: "CLIENT ACQUISITION",
    question: "How do most of your new clients and matters originate?",
    type: "single-select",
    required: true,
    options: [
      "Referrals from existing clients and professional networks",
      "Reputation and word of mouth in our local market",
      "Attorney referrals across practice areas",
      "Online visibility and directory presence",
    ],
  },
  {
    id: "knowledge_mgmt_multi",
    label: "QI7",
    category: "OPERATIONS",
    question: "How do attorneys stay current across multiple areas of law simultaneously?",
    subtitle: "In multi-practice firms, knowledge management is a significant challenge.",
    type: "single-select",
    required: true,
    options: [
      "We have formal knowledge management systems or practice libraries",
      "We rely on individual attorney expertise and peer consultation",
      "We use external research services when a matter requires it",
      "Knowledge management is an area we know we need to invest in",
    ],
  },
  {
    id: "bottleneck_multi",
    label: "QI8",
    category: "OPERATIONS",
    question: "What is the biggest operational challenge in running a multi-practice firm?",
    type: "single-select",
    required: true,
    options: [
      "Coordinating across practice areas without matters falling through gaps",
      "Keeping attorneys current across multiple legal areas simultaneously",
      "Business development across a diverse range of practice types",
      "Billing and matter management consistency across the firm",
      "Client communication quality across different matter types and attorneys",
    ],
  },
];
