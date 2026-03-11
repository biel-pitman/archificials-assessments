/**
 * Core questions Q1-Q5: Firm profile + practice area routing.
 * These appear for every respondent.
 */
export const CORE_QUESTIONS = [
  {
    id: "firm_name",
    label: "Q1",
    category: "FIRM PROFILE",
    question: "What is the name of your firm?",
    type: "text",
    required: true,
    placeholder: "",
  },
  {
    id: "contact_name",
    label: "Q2",
    category: "FIRM PROFILE",
    question: "Your name and title",
    type: "text",
    required: true,
    placeholder: "e.g. Jane Smith, Managing Partner",
  },
  {
    id: "contact_email",
    label: "Q3",
    category: "FIRM PROFILE",
    question: "Your email address",
    subtitle: "We'll send your personalized readiness report here.",
    type: "email",
    required: true,
    placeholder: "",
  },
  {
    id: "firm_size",
    label: "Q4",
    category: "FIRM PROFILE",
    question: "How many attorneys are at your firm?",
    type: "single-select",
    required: true,
    options: [
      "Solo (1)",
      "Small (2-5)",
      "Mid-size (6-20)",
      "Large (21-50)",
      "Enterprise (51+)",
    ],
  },
  {
    id: "practice_area",
    label: "Q5",
    category: "ROUTING",
    question: "What best describes your firm's primary area of practice?",
    subtitle: "If your firm spans more than one, select the area that generates most of your work.",
    type: "single-select",
    required: true,
    autoAdvance: true, // Auto-advance on selection for fluid UX
    options: [
      { label: "Personal injury, wrongful death, or mass tort", route: "A" },
      { label: "Criminal defense, DWI, or civil rights", route: "B" },
      { label: "Commercial litigation or business disputes", route: "C" },
      { label: "Intellectual property, technology, or data privacy", route: "D" },
      { label: "Employment law, labor, or workplace disputes", route: "E" },
      { label: "Estate planning, trusts, wills, or probate", route: "F" },
      { label: "Real estate, property transactions, or eminent domain", route: "G" },
      { label: "Family law, divorce, or custody matters", route: "H" },
      { label: "We have a mixed or multi-practice firm", route: "I" },
    ],
  },
];
