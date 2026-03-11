/**
 * Module A: Personal Injury & Mass Tort
 * QA1-QA8 - Contingency-based PI, wrongful death, premises, products, mass tort.
 */
export const MODULE_KEY = "A";
export const MODULE_NAME = "Personal Injury & Mass Tort";

export const QUESTIONS = [
  {
    id: "case_mix_pi",
    label: "QA1",
    category: "CASE PROFILE",
    question: "What types of cases make up the majority of your docket?",
    type: "single-select",
    required: true,
    options: [
      "Auto accidents and general negligence",
      "Catastrophic or traumatic injury (brain, spine, burn)",
      "Medical malpractice or pharmaceutical liability",
      "Premises liability or product defects",
      "Mass tort or multi-district litigation",
      "A mix across several case types",
    ],
  },
  {
    id: "medical_records_pi",
    label: "QA2",
    category: "OPERATIONS",
    question: "How does your team currently handle medical record and evidence review?",
    subtitle: "This is typically one of the most time-consuming tasks in PI practice.",
    type: "single-select",
    required: true,
    options: [
      "An attorney reviews every record personally",
      "Paralegals create summaries for attorney review",
      "We use an outside vendor to organize and summarize records",
      "We have a tool or system that assists with summaries",
      "We don't have a consistent process",
    ],
  },
  {
    id: "case_timeline_pi",
    label: "QA3",
    category: "OPERATIONS",
    question: "From the date a case is retained to a demand package or court filing, what is your typical timeline?",
    type: "single-select",
    required: true,
    options: [
      "Fast: most cases wrapped within 6 months",
      "Moderate: 6-18 months depending on injury complexity",
      "Extended: most cases run longer than 18 months",
      "Our case timelines vary significantly with no consistent pattern",
    ],
  },
  {
    id: "case_status_pi",
    label: "QA4",
    category: "OPERATIONS",
    question: "How do you keep clients informed during the lifecycle of their case?",
    subtitle: "Contingency clients are often anxious and have long wait times between updates.",
    type: "single-select",
    required: true,
    options: [
      "Attorneys call or email clients directly, as needed",
      "Paralegals handle routine updates and status calls",
      "We use a client portal or software that sends automated status updates",
      "Client communication is a known gap for our firm",
    ],
  },
  {
    id: "client_source_pi",
    label: "QA5",
    category: "CLIENT ACQUISITION",
    question: "Where do most of your new cases come from today?",
    type: "single-select",
    required: true,
    options: [
      "Referrals from other attorneys (primary)",
      "Past client referrals and word of mouth",
      "Medical providers, clinics, or healthcare networks",
      "Google search, paid ads, or digital marketing",
      "A consistent mix of referral and digital sources",
    ],
  },
  {
    id: "demand_letters_pi",
    label: "QA6",
    category: "CLIENT ACQUISITION",
    question: "How do you evaluate case value and advise clients on settlement vs. going to trial?",
    type: "single-select",
    required: true,
    options: [
      "Attorney judgment based on experience and gut instinct",
      "We review comparable verdicts in our jurisdiction informally",
      "We analyze comparable verdicts, medical costs, and economic loss systematically",
      "We rely heavily on expert recommendations to guide this decision",
    ],
  },
  {
    id: "digital_presence_pi",
    label: "QA7",
    category: "DIGITAL VISIBILITY",
    question: "Does your firm publish verdicts, settlements, or notable case results publicly?",
    subtitle: "Published results help search engines and AI tools surface your firm to prospective clients.",
    type: "single-select",
    required: true,
    options: [
      "Yes: we have a dedicated results page with specific figures",
      "We mention outcomes in attorney bios or a news section",
      "Press has covered our cases but we have not published our own",
      "No: results are not published anywhere",
    ],
  },
  {
    id: "bottleneck_pi",
    label: "QA8",
    category: "OPERATIONS",
    question: "What is the biggest obstacle to handling more cases or resolving them faster?",
    type: "single-select",
    required: true,
    options: [
      "Not enough qualified intake leads coming through",
      "Medical record and evidence review takes too long",
      "Drafting demands, motions, and briefs is a bottleneck",
      "Client communication volume overwhelms the team",
      "Case management and deadline tracking is inconsistent",
    ],
  },
];
