/**
 * Module F: Estate Planning, Trusts & Probate
 * QF1-QF8 - Wills, trusts, POA, probate, business succession, tax planning.
 */
export const MODULE_KEY = "F";
export const MODULE_NAME = "Estate Planning, Trusts & Probate";

export const QUESTIONS = [
  {
    id: "case_mix_estate",
    label: "QF1",
    category: "CASE PROFILE",
    question: "What types of matters make up the majority of your estate planning work?",
    type: "single-select",
    required: true,
    options: [
      "Estate planning: wills, trusts, and powers of attorney",
      "Trust administration and probate proceedings",
      "Estate and gift tax planning and optimization",
      "Business succession and ownership transition planning",
      "Charitable giving and foundation formation",
      "Pre- and post-marital agreements",
      "A mix across estate planning and related areas",
    ],
  },
  {
    id: "intake_estate",
    label: "QF2",
    category: "OPERATIONS",
    question: "How do you conduct the initial estate planning interview with a new client?",
    subtitle: "The quality of intake directly affects how quickly you can produce accurate documents.",
    type: "single-select",
    required: true,
    options: [
      "Attorney meets with the client and takes manual notes",
      "We send a written questionnaire before the first meeting",
      "We have a structured intake interview that feeds directly into document drafting",
      "Process varies by attorney and client situation",
    ],
  },
  {
    id: "doc_drafting_estate",
    label: "QF3",
    category: "OPERATIONS",
    question: "How do you produce estate planning documents \u2014 wills, trusts, and powers of attorney?",
    type: "single-select",
    required: true,
    options: [
      "Largely from scratch, based on interview notes and attorney knowledge",
      "Using templates that attorneys populate and customize by client",
      "Using specialized estate planning document drafting software",
      "Associates draft; partners review and finalize",
    ],
  },
  {
    id: "plan_review_estate",
    label: "QF4",
    category: "OPERATIONS",
    question: "When a client's estate plan needs to be reviewed or updated, how does that happen?",
    subtitle: "Estate plans can quickly become outdated after life events, tax law changes, or asset changes.",
    type: "single-select",
    required: true,
    options: [
      "We proactively reach out to clients at regular intervals",
      "We contact clients after significant tax law changes",
      "Clients contact us when a life event occurs \u2014 we respond reactively",
      "We do not have a structured ongoing client relationship process",
    ],
  },
  {
    id: "advisor_coord_estate",
    label: "QF5",
    category: "OPERATIONS",
    question: "How do you coordinate with a client's other advisors: CPA, financial planner, wealth manager?",
    type: "single-select",
    required: true,
    options: [
      "Formal advisor coordination meetings with shared documentation",
      "Ad hoc calls and emails as matters require",
      "We work independently \u2014 the client handles advisor coordination",
      "Cross-advisor coordination is an area we want to improve",
    ],
  },
  {
    id: "client_source_estate",
    label: "QF6",
    category: "CLIENT ACQUISITION",
    question: "How do most of your new estate planning clients find you?",
    type: "single-select",
    required: true,
    options: [
      "Referrals from other advisors (CPAs, financial planners, wealth managers)",
      "Past client referrals and word of mouth",
      "Bar association and community involvement",
      "Online search, directories, or digital presence",
    ],
  },
  {
    id: "client_education_estate",
    label: "QF7",
    category: "OPERATIONS",
    question: "How do you help clients understand complex structures like irrevocable trusts, FLPs, or charitable vehicles?",
    subtitle: "Estate planning clients are often highly educated but unfamiliar with legal and tax structure terminology.",
    type: "single-select",
    required: true,
    options: [
      "In-depth attorney explanation during meetings",
      "We use written summaries, diagrams, or visual aids",
      "We provide educational materials along with the documents",
      "We rely on the client's financial advisor to explain tax implications",
    ],
  },
  {
    id: "bottleneck_estate",
    label: "QF8",
    category: "OPERATIONS",
    question: "What is the biggest operational challenge in your estate planning practice?",
    type: "single-select",
    required: true,
    options: [
      "Producing complex documents consistently and efficiently",
      "Staying current on estate and tax law changes",
      "Educating clients on complex planning structures",
      "Coordinating across CPAs, financial advisors, and family members",
      "Building ongoing relationships that bring clients back through life events",
    ],
  },
];
