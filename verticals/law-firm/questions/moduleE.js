/**
 * Module E: Employment & Labor Law
 * QE1-QE8 - Wrongful termination, discrimination, harassment, wage/hour, trade secrets, Title IX.
 */
export const MODULE_KEY = "E";
export const MODULE_NAME = "Employment & Labor Law";

export const QUESTIONS = [
  {
    id: "practice_model_emp",
    label: "QE1",
    category: "CASE PROFILE",
    question: "How would you describe your employment practice model?",
    type: "single-select",
    required: true,
    options: [
      "Primarily plaintiff-side: representing employees and workers",
      "Primarily defense-side: representing employers and companies",
      "Both plaintiff and defense, depending on the matter",
      "Primarily Title IX investigations and institutional compliance",
    ],
  },
  {
    id: "case_mix_emp",
    label: "QE2",
    category: "CASE PROFILE",
    question: "What types of employment matters make up the majority of your work?",
    type: "single-select",
    required: true,
    options: [
      "Wrongful termination, retaliation, and discrimination claims",
      "Sexual harassment and hostile workplace claims",
      "Wage and hour disputes and class actions",
      "Trade secret misappropriation and non-compete enforcement",
      "FMLA, ADA, and leave law compliance and disputes",
      "Title IX investigations and institutional defense",
      "A mix across employment law categories",
    ],
  },
  {
    id: "doc_review_emp",
    label: "QE3",
    category: "OPERATIONS",
    question: "When you take on a new matter, how do you review communications, emails, or documents for evidence?",
    subtitle: "Employment cases are often won or lost on documentary evidence.",
    type: "single-select",
    required: true,
    options: [
      "Attorneys manually review all relevant communications and documents",
      "Paralegals do an initial review and flag items for attorney attention",
      "We use tools that help organize and search through large document sets",
      "Our document review process varies and is not standardized",
    ],
  },
  {
    id: "drafting_emp",
    label: "QE4",
    category: "OPERATIONS",
    question: "How do you handle demand letters, EEOC responses, and administrative agency filings?",
    type: "single-select",
    required: true,
    options: [
      "Primarily from scratch, drawing on attorney knowledge and experience",
      "Using templates that attorneys customize for each matter",
      "Associates draft; partners review and finalize",
      "Process varies by attorney and matter type",
    ],
  },
  {
    id: "regulatory_emp",
    label: "QE5",
    category: "OPERATIONS",
    question: "How do you stay current on employment law changes at federal, state, and local levels?",
    subtitle: "Employment law changes frequently and varies by jurisdiction.",
    type: "single-select",
    required: true,
    options: [
      "Dedicated legal news and regulatory alert subscriptions",
      "Active bar association and employment law group involvement",
      "Relying on our existing expertise and practitioner network",
      "Tracking employment law changes across jurisdictions is challenging for us",
    ],
  },
  {
    id: "client_comm_emp",
    label: "QE6",
    category: "OPERATIONS",
    question: "How do you communicate with clients through emotionally complex and lengthy proceedings?",
    type: "single-select",
    required: true,
    options: [
      "Direct attorney communication at all key stages",
      "Regular updates via email, portal, or structured check-ins",
      "Staff or paralegals handle routine client contact",
      "Client communication is ad hoc and varies by matter",
    ],
  },
  {
    id: "preventive_emp",
    label: "QE7",
    category: "CLIENT ACQUISITION",
    question: "Do you provide preventive services to employer clients \u2014 training, handbook review, compliance audits?",
    type: "single-select",
    required: true,
    options: [
      "Yes, preventive services are a significant part of our practice",
      "We offer this occasionally but it is not a core service",
      "We provide informal advice but do not formalize training or audits",
      "No: we focus on dispute resolution, not prevention",
    ],
  },
  {
    id: "bottleneck_emp",
    label: "QE8",
    category: "OPERATIONS",
    question: "What is the primary bottleneck in your employment practice today?",
    type: "single-select",
    required: true,
    options: [
      "Managing high volumes of documents and communications evidence",
      "Keeping pace with regulatory complexity across jurisdictions",
      "Client communication and expectation management",
      "Business development and new matter intake",
      "Drafting quality briefs, motions, and correspondence efficiently",
    ],
  },
];
