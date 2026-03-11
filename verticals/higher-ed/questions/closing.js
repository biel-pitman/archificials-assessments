/**
 * Closing questions CL1-CL4 + optional OPT1-OPT2.
 * These appear after every institution type module.
 */
export const CLOSING_QUESTIONS = [
  {
    id: "after_hours",
    label: "CL1",
    category: "STUDENT RESPONSIVENESS",
    question: "When a prospective student or applicant contacts your institution outside of business hours, what happens?",
    type: "single-select",
    required: true,
    options: [
      "The inquiry waits until the next business day",
      "An auto-reply confirms receipt, and someone follows up during business hours",
      "Basic information is provided through a website FAQ or chatbot, with complex questions queued for staff",
      "Intelligent response system handles common inquiries (program info, deadlines, next steps) with seamless handoff to staff for complex questions",
    ],
  },
  {
    id: "intake_speed",
    label: "CL2",
    category: "STUDENT RESPONSIVENESS",
    question: "From a prospective student's first inquiry to their enrollment, how long does the typical process take?",
    type: "single-select",
    required: true,
    options: [
      "Several months or longer",
      "4 to 8 weeks",
      "2 to 4 weeks",
      "1 to 2 weeks",
      "A few days or less (for open-admission or rolling enrollment)",
    ],
  },
  {
    id: "urgency",
    label: "CL3",
    category: "INVESTMENT APPETITE",
    question: "How urgently does your institution need to address operational gaps and adopt new tools?",
    type: "scale",
    required: true,
    min: 1,
    max: 5,
    minLabel: "No urgency",
    maxLabel: "Critical priority",
  },
  {
    id: "investment",
    label: "CL4",
    category: "INVESTMENT APPETITE",
    question: "If an outside partner could measurably improve your institution's operational efficiency and enrollment outcomes, what level of annual investment would feel proportionate?",
    type: "single-select",
    required: true,
    options: [
      "Under $10,000",
      "$10,000 to $25,000",
      "$25,000 to $75,000",
      "$75,000 to $150,000",
      "Over $150,000",
    ],
  },
  {
    id: "success_vision",
    label: "OPT1",
    category: "OPEN RESPONSE",
    question: "If you could wave a wand and fix one operational challenge at your institution in the next 12 months, what would it be?",
    type: "textarea",
    required: false,
  },
  {
    id: "anything_else",
    label: "OPT2",
    category: "OPEN RESPONSE",
    question: "Is there anything else about your institution's situation that would help us provide a more useful assessment?",
    subtitle: "A specific challenge, enrollment concern, or context that would be useful to know.",
    type: "textarea",
    required: false,
  },
];
