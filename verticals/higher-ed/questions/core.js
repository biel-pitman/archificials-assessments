/**
 * Core questions Q1-Q5 (all respondents).
 * Q5 routes to the appropriate institution type module (A-H).
 */
export const CORE_QUESTIONS = [
  {
    id: "inst_name",
    label: "Q1",
    question: "What is the name of your institution?",
    type: "text",
    required: true,
    placeholder: "e.g. Lakewood State University",
  },
  {
    id: "contact_name",
    label: "Q2",
    question: "Your name and title",
    type: "text",
    required: true,
    placeholder: "e.g. Dr. Maria Lopez, Provost / e.g. James Park, CIO",
  },
  {
    id: "contact_email",
    label: "Q3",
    question: "Your email address",
    subtitle: "We'll send your AI Readiness Report here.",
    type: "email",
    required: true,
    placeholder: "you@institution.edu",
  },
  {
    id: "inst_size",
    label: "Q4",
    question: "How many students does your institution serve (total headcount, including part-time)?",
    type: "single-select",
    required: true,
    options: [
      "Fewer than 1,000 students",
      "1,000 to 5,000 students",
      "5,000 to 15,000 students",
      "15,000 to 30,000 students",
      "More than 30,000 students",
    ],
  },
  {
    id: "inst_type",
    label: "Q5",
    question: "Which best describes your institution?",
    subtitle: "Pick the closest match. This determines which questions come next.",
    type: "single-select",
    required: true,
    autoAdvance: true,
    options: [
      { label: "Research university (R1 or R2, public or private, doctoral-granting)", route: "A" },
      { label: "Regional public university (state system, primarily master's-granting)", route: "B" },
      { label: "Private comprehensive university (nonprofit, multiple programs, undergraduate through graduate)", route: "C" },
      { label: "Liberal arts college (small, primarily undergraduate, residential)", route: "D" },
      { label: "Community or technical college (2-year, open admission)", route: "E" },
      { label: "For-profit or career-focused institution", route: "F" },
      { label: "Online or distance-first institution (primarily serves non-traditional students)", route: "G" },
      { label: "Specialized professional school (medical, law, art/design, engineering, theology)", route: "H" },
    ],
  },
];
