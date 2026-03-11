/**
 * Module B: Regional Public University
 * QB1-QB8 — Advising capacity, transfer eval, state reporting, scheduling, retention, recruitment, program visibility, change capacity
 */
export const MODULE_KEY = "B";
export const MODULE_NAME = "Regional Public University";

export const QUESTIONS = [
  {
    id: "regional_advising_capacity_reg",
    label: "QB1",
    category: "OPERATIONS",
    question: "How does your institution handle academic advising given current staffing levels?",
    type: "single-select",
    required: true,
    options: [
      "Advisors carry caseloads of 500+ students and primarily handle registration holds",
      "Caseloads are high but advisors try to do proactive outreach for at-risk students",
      "Advising platform helps prioritize outreach, but capacity still limits depth of engagement",
      "Tiered advising model with technology-assisted triage for routine questions and human advisors for complex needs",
      "Integrated student success platform where advisors focus on high-impact conversations while routine guidance is handled by self-service tools",
    ],
  },
  {
    id: "regional_transfer_eval_reg",
    label: "QB2",
    category: "OPERATIONS",
    question: "How does your institution evaluate transfer credits from community colleges and other institutions?",
    type: "single-select",
    required: true,
    options: [
      "Each transcript is reviewed manually by the registrar or department chair",
      "We have articulation agreements on file but still review most transcripts case-by-case",
      "Transfer equivalency database covers common courses; unusual transfers are reviewed manually",
      "Automated credit evaluation for courses covered by articulation agreements, with exceptions flagged for review",
      "Comprehensive transfer portal where students can see credit equivalencies before applying, with automated evaluation upon enrollment",
    ],
  },
  {
    id: "regional_state_reporting_reg",
    label: "QB3",
    category: "OPERATIONS",
    question: "How does your institution prepare required reports for your state system or governing board?",
    type: "single-select",
    required: true,
    options: [
      "Reports are assembled manually from multiple sources before each deadline",
      "Institutional research office pulls data from the SIS and formats reports, but it takes significant time",
      "Reporting templates are pre-built but data validation and reconciliation are still manual",
      "Automated data pulls with standardized report generation, requiring only review and sign-off",
      "Continuous reporting dashboard that state system can access directly, with automated data quality checks",
    ],
  },
  {
    id: "regional_course_scheduling_reg",
    label: "QB4",
    category: "OPERATIONS",
    question: "How does your institution build the course schedule each term?",
    type: "single-select",
    required: true,
    options: [
      "Department chairs propose sections based on historical patterns and faculty preferences",
      "Centralized scheduling office coordinates, but the process is negotiation-heavy and time-consuming",
      "Scheduling software (Ad Astra, CollegeNET) optimizes room assignments, but section offerings are still manually determined",
      "Data-informed scheduling that analyzes enrollment patterns, waitlist data, and student demand to recommend section counts",
      "Dynamic scheduling model that adjusts section offerings based on real-time registration data and student degree pathway analysis",
    ],
  },
  {
    id: "regional_retention_tracking_reg",
    label: "QB5",
    category: "OPERATIONS",
    question: "How does your institution identify students who are at risk of dropping out or stopping out?",
    type: "single-select",
    required: true,
    options: [
      "We learn about struggling students when they miss registration or fail courses",
      "Faculty can submit early alerts, but the process is inconsistent and follow-up varies",
      "Early alert system with defined triggers (missed classes, low midterm grades) and assigned follow-up",
      "Predictive model using multiple data points (grades, engagement, financial aid status) to identify risk before performance declines",
      "Integrated student success ecosystem where risk indicators trigger coordinated outreach from advising, financial aid, and student life",
    ],
  },
  {
    id: "regional_recruitment_reach_reg",
    label: "QB6",
    category: "STUDENT ACQUISITION",
    question: "How does your institution attract students beyond your traditional geographic service area?",
    type: "single-select",
    required: true,
    options: [
      "We primarily serve students from our immediate region through local reputation",
      "Some targeted recruitment in neighboring states or for specific programs",
      "Digital marketing campaigns for high-demand programs with geographic targeting",
      "Multi-channel recruitment with program-specific landing pages, virtual events, and yield optimization by market",
      "Strategic enrollment management with market analysis, program-market fit assessment, and personalized digital engagement by prospect segment",
    ],
  },
  {
    id: "regional_program_visibility_reg",
    label: "QB7",
    category: "DIGITAL VISIBILITY",
    question: "How easy is it for a prospective student to find your institution's programs, costs, and outcomes online?",
    type: "single-select",
    required: true,
    options: [
      "Basic website with program listings, but detailed information requires contacting the admissions office",
      "Program pages exist with descriptions, but cost calculators and outcome data are not prominently featured",
      "Net price calculator, program pages with career outcomes, and clear application pathways",
      "SEO-optimized program pages with cost transparency, graduate outcomes, student testimonials, and comparison tools",
      "Personalized digital experience where prospective students see relevant programs, financial scenarios, and career pathways based on their profile",
    ],
  },
  {
    id: "regional_change_capacity_reg",
    label: "QB8",
    category: "INSTITUTIONAL READINESS",
    question: "How does your institution typically handle the introduction of new technology or operational processes?",
    type: "single-select",
    required: true,
    options: [
      "Changes happen when forced (vendor sunsets a product, state mandates a system)",
      "We adopt new tools when budget allows, but training is limited and adoption is uneven",
      "IT leads implementation with a project plan, but competing priorities slow rollout",
      "Cross-functional implementation teams with defined timelines, training, and success metrics",
      "Established change management framework with pilot programs, faculty/staff input, and post-implementation review",
    ],
  },
];
