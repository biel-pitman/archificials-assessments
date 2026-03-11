/**
 * Module A: Research University (R1/R2)
 * QA1-QA8 — Data integration, grant admin, advising, enrollment, compliance, prospect engagement, digital presence, change readiness
 */
export const MODULE_KEY = "A";
export const MODULE_NAME = "Research University (R1/R2)";

export const QUESTIONS = [
  {
    id: "research_data_integration_r1",
    label: "QA1",
    category: "OPERATIONS",
    question: "How does your institution connect data across admissions, student records, financial aid, and advancement?",
    type: "single-select",
    required: true,
    options: [
      "Each office maintains its own records with no shared system",
      "Some systems share data through manual exports or batch uploads",
      "We have a data warehouse that pulls from most major systems, but real-time access is limited",
      "Enterprise data platform with dashboards accessible to leadership across divisions",
      "Integrated data ecosystem with predictive models informing decisions across the student lifecycle",
    ],
  },
  {
    id: "research_grant_admin_r1",
    label: "QA2",
    category: "OPERATIONS",
    question: "How does your institution manage the pre-award and post-award research administration process?",
    type: "single-select",
    required: true,
    options: [
      "Faculty handle most grant preparation and compliance tracking themselves",
      "Central office manages submissions but post-award monitoring is largely manual",
      "Grant management system (Cayuse, Kuali) handles submissions and basic compliance tracking",
      "Integrated research administration with automated compliance checks and reporting",
      "End-to-end research management with automated effort reporting, cost allocation, and sponsor compliance",
    ],
  },
  {
    id: "research_advising_load_r1",
    label: "QA3",
    category: "OPERATIONS",
    question: "How are academic advising assignments managed for your undergraduate population?",
    type: "single-select",
    required: true,
    options: [
      "Advisors are assigned by alphabet or department with no workload balancing",
      "Assignments are reviewed periodically, but caseloads vary significantly",
      "Advising platform (EAB Navigate, Starfish) tracks assignments and basic student interactions",
      "Caseload balancing with early alert flags and advisor dashboards",
      "Predictive advising model that routes students to specialized support based on risk factors and academic trajectory",
    ],
  },
  {
    id: "research_enrollment_forecast_r1",
    label: "QA4",
    category: "OPERATIONS",
    question: "How does your enrollment management team forecast enrollment and tuition revenue?",
    type: "single-select",
    required: true,
    options: [
      "Projections are based on prior year trends and leadership judgment",
      "Spreadsheet models with historical data and basic demographic inputs",
      "Statistical models incorporating admit rate, yield rate, and retention data",
      "Multi-variable forecasting with scenario modeling for financial aid strategies",
      "Real-time enrollment dashboards with predictive models that adjust weekly based on application and deposit behavior",
    ],
  },
  {
    id: "research_compliance_r1",
    label: "QA5",
    category: "OPERATIONS",
    question: "How does your institution track and prepare for compliance requirements (FERPA, Title IV, accreditation, research protocols)?",
    type: "single-select",
    required: true,
    options: [
      "Compliance is tracked by individual offices with no centralized view",
      "Shared calendar of deadlines with manual tracking of deliverables",
      "Compliance management system with assigned owners and status tracking",
      "Integrated compliance platform with automated reminders, document collection, and audit trails",
      "Proactive compliance monitoring with automated policy checks and continuous readiness assessment",
    ],
  },
  {
    id: "research_prospect_engagement_r1",
    label: "QA6",
    category: "STUDENT ACQUISITION",
    question: "How does your admissions office engage prospective students from first inquiry through enrollment?",
    type: "single-select",
    required: true,
    options: [
      "Counselors manage communication individually using email and phone",
      "CRM (Slate) tracks inquiries but outreach sequences are largely manual",
      "Automated communication flows in Slate with basic segmentation by program interest",
      "Personalized multi-channel campaigns with behavior-triggered messaging and yield prediction",
      "Dynamic engagement engine that adapts messaging based on student interaction patterns, competitive set, and financial aid modeling",
    ],
  },
  {
    id: "research_digital_presence_r1",
    label: "QA7",
    category: "DIGITAL VISIBILITY",
    question: "How does your institution present its academic programs, research impact, and campus life online?",
    type: "single-select",
    required: true,
    options: [
      "Department websites are maintained independently with inconsistent quality and outdated content",
      "Central marketing team manages the main website, but program pages are maintained by departments",
      "Unified web platform with content management system, regular updates, and basic analytics",
      "Data-driven web presence with program-specific landing pages, SEO strategy, and conversion tracking",
      "Integrated digital ecosystem with personalized content, virtual campus experiences, and real-time program outcome data",
    ],
  },
  {
    id: "research_change_readiness_r1",
    label: "QA8",
    category: "INSTITUTIONAL READINESS",
    question: "When your institution last rolled out a major enterprise system (SIS migration, new LMS, ERP upgrade), how did the process go?",
    type: "single-select",
    required: true,
    options: [
      "We have not undertaken a major system change in recent memory",
      "It was significantly over timeline and budget, with ongoing adoption challenges",
      "Completed on a reasonable timeline but required extensive workarounds and manual processes",
      "Generally successful with strong project management, though some departments lagged in adoption",
      "Smooth rollout with clear governance, faculty/staff training, and measurable adoption targets met on schedule",
    ],
  },
];
