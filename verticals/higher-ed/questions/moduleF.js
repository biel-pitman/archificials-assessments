/**
 * Module F: For-Profit or Career-Focused Institution
 * QF1-QF8 — Enrollment funnel, student completion, career placement, compliance/audit, program ROI, lead generation, outcomes transparency, speed to change
 */
export const MODULE_KEY = "F";
export const MODULE_NAME = "For-Profit or Career-Focused Institution";

export const QUESTIONS = [
  {
    id: "fp_enrollment_funnel_fp",
    label: "QF1",
    category: "OPERATIONS",
    question: "How does your institution manage the enrollment funnel from lead to enrolled student?",
    type: "single-select",
    required: true,
    options: [
      "Enrollment counselors manage inquiries individually with basic CRM tracking",
      "CRM automates initial follow-up, but conversion management is largely manual",
      "Structured enrollment funnel with defined stages, conversion metrics, and counselor performance tracking",
      "Data-driven enrollment operation with lead scoring, automated nurture sequences, and conversion optimization",
      "Predictive enrollment engine that scores leads, optimizes counselor assignment, and dynamically adjusts outreach cadence based on prospect behavior",
    ],
  },
  {
    id: "fp_student_completion_fp",
    label: "QF2",
    category: "OPERATIONS",
    question: "How does your institution track and support students toward program completion?",
    type: "single-select",
    required: true,
    options: [
      "Completion is tracked at term end; students who fall behind are counseled reactively",
      "Academic advisors monitor grades and attendance, reaching out when problems appear",
      "Early alert system flags at-risk students based on attendance, grades, and engagement",
      "Proactive student success model with dedicated support staff, milestone tracking, and intervention protocols",
      "Predictive completion model that identifies risk factors at enrollment and provides personalized support plans throughout the student journey",
    ],
  },
  {
    id: "fp_career_placement_fp",
    label: "QF3",
    category: "OPERATIONS",
    question: "How does your institution connect graduates with employment opportunities?",
    type: "single-select",
    required: true,
    options: [
      "Career services maintains a job board and offers resume help upon request",
      "Program-specific employer relationships provide some placement pathways",
      "Structured career services with employer partnerships, interview preparation, and placement tracking",
      "Integrated career outcomes operation with employer advisory input, job matching, and tracked placement rates by program",
      "Career success platform with labor market intelligence, employer matching algorithms, and longitudinal outcome tracking that feeds back into program design",
    ],
  },
  {
    id: "fp_compliance_audit_fp",
    label: "QF4",
    category: "OPERATIONS",
    question: "How does your institution prepare for Title IV audits and gainful employment reporting?",
    type: "single-select",
    required: true,
    options: [
      "Compliance documentation is assembled when audits are announced",
      "Compliance officer maintains records, but pulling together audit packages is time-intensive",
      "Compliance management system tracks requirements with assigned owners and deadline monitoring",
      "Automated compliance reporting with data feeds from SIS, financial aid, and career services",
      "Continuous compliance monitoring with real-time dashboards, automated document assembly, and proactive issue identification",
    ],
  },
  {
    id: "fp_program_roi_fp",
    label: "QF5",
    category: "OPERATIONS",
    question: "How does your institution evaluate the return on investment of its academic programs?",
    type: "single-select",
    required: true,
    options: [
      "Program viability is assessed based on enrollment numbers and tuition revenue",
      "Basic cost-per-student and revenue analysis by program",
      "Program review includes enrollment trends, completion rates, placement rates, and student satisfaction",
      "Comprehensive program ROI model incorporating marketing cost, student lifetime value, placement outcomes, and alumni earning data",
      "Dynamic program portfolio management with real-time ROI dashboards, labor market alignment scoring, and automated recommendations for program investment or sunset",
    ],
  },
  {
    id: "fp_lead_generation_fp",
    label: "QF6",
    category: "STUDENT ACQUISITION",
    question: "How does your institution generate and qualify prospective student inquiries?",
    type: "single-select",
    required: true,
    options: [
      "Leads come primarily from paid digital advertising with basic demographic targeting",
      "Multi-channel lead generation with landing pages, social media, and search, tracked by source",
      "Lead scoring model prioritizes inquiries based on program fit, engagement signals, and likelihood to enroll",
      "Integrated demand generation with content marketing, programmatic advertising, and attribution modeling",
      "Predictive lead generation with lookalike modeling, dynamic budget allocation by channel ROI, and automated qualification based on behavioral scoring",
    ],
  },
  {
    id: "fp_outcomes_transparency_fp",
    label: "QF7",
    category: "DIGITAL VISIBILITY",
    question: "How does your institution present program outcomes (completion rates, job placement, earnings) to prospective students?",
    type: "single-select",
    required: true,
    options: [
      "Outcomes data is available in disclosures but not prominently featured in marketing",
      "Program pages include basic outcome statistics (completion rate, placement rate)",
      "Detailed outcome dashboards by program with comparison to industry benchmarks",
      "Transparent outcomes with graduate testimonials, employer endorsements, and third-party validated data",
      "Interactive outcomes explorer where prospective students can see results by program, cohort, and career pathway, with salary projections based on labor market data",
    ],
  },
  {
    id: "fp_speed_to_change_fp",
    label: "QF8",
    category: "INSTITUTIONAL READINESS",
    question: "How quickly can your institution implement operational changes when a business need is identified?",
    type: "single-select",
    required: true,
    options: [
      "Changes require multi-level approval and typically take 6+ months to implement",
      "Urgent changes can be fast-tracked, but routine improvements move slowly",
      "Standard implementation timeline of 2-3 months for most operational changes",
      "Agile operational model with rapid prototyping, pilot testing, and iterative improvement",
      "Continuous improvement culture with empowered teams, rapid deployment capability, and data-driven decision-making at every level",
    ],
  },
];
