/**
 * Module C: Private Comprehensive University
 * QC1-QC8 — Net revenue modeling, grad enrollment, accreditation, alumni, faculty workload, prospect conversion, online reputation, tech governance
 */
export const MODULE_KEY = "C";
export const MODULE_NAME = "Private Comprehensive University";

export const QUESTIONS = [
  {
    id: "private_net_revenue_comp",
    label: "QC1",
    category: "OPERATIONS",
    question: "How does your institution model the relationship between tuition discounting, enrollment, and net revenue?",
    type: "single-select",
    required: true,
    options: [
      "Financial aid decisions are made by the aid office; enrollment and finance teams see results after the fact",
      "We track discount rate and net revenue, but financial aid strategy is not tightly integrated with enrollment goals",
      "Enrollment and financial aid collaborate on merit aid strategy using historical yield and discount data",
      "Predictive financial aid modeling that optimizes net revenue by simulating discount scenarios against enrollment targets",
      "Real-time enrollment and revenue dashboard where financial aid, admissions, and finance jointly manage toward net revenue goals with weekly adjustments",
    ],
  },
  {
    id: "private_grad_enrollment_comp",
    label: "QC2",
    category: "OPERATIONS",
    question: "How does your institution manage enrollment for graduate and professional programs (MBA, nursing, education, etc.)?",
    type: "single-select",
    required: true,
    options: [
      "Each program handles its own recruitment with minimal central coordination",
      "Central marketing supports programs, but recruitment strategy and pipeline management vary by program",
      "Unified CRM for graduate programs with shared inquiry management and communication workflows",
      "Centralized graduate enrollment team with program-specific strategies, yield tracking, and ROI analysis by program",
      "Integrated graduate enrollment operation with market demand analysis, program pricing optimization, and lifetime value modeling",
    ],
  },
  {
    id: "private_accreditation_prep_comp",
    label: "QC3",
    category: "OPERATIONS",
    question: "How does your institution prepare for accreditation reviews (regional and programmatic)?",
    type: "single-select",
    required: true,
    options: [
      "Preparation begins 6-12 months before the visit with manual data collection across departments",
      "Self-study committee assembles evidence from various offices, but it is a time-intensive manual process",
      "Institutional effectiveness office maintains an evidence repository, but updates are periodic",
      "Continuous improvement framework with ongoing evidence collection, assessment tracking, and dashboard visibility",
      "Integrated institutional effectiveness platform with automated data feeds, ongoing assessment cycles, and accreditation-ready reporting at any time",
    ],
  },
  {
    id: "private_alumni_engagement_comp",
    label: "QC4",
    category: "OPERATIONS",
    question: "How does your institution track and engage alumni for fundraising, mentoring, and career networking?",
    type: "single-select",
    required: true,
    options: [
      "Alumni records exist but engagement is limited to annual fund mailings and homecoming",
      "Advancement office uses a CRM (Raiser's Edge, Salesforce) for donor tracking, but alumni engagement beyond giving is minimal",
      "Segmented alumni communications with event-based engagement and giving history analytics",
      "Multi-channel alumni engagement with career networking, mentoring programs, and donor pipeline management",
      "Data-driven alumni lifecycle strategy with predictive giving models, engagement scoring, and personalized outreach based on affinity and capacity",
    ],
  },
  {
    id: "private_faculty_workload_comp",
    label: "QC5",
    category: "OPERATIONS",
    question: "How does your institution manage faculty workload across teaching, scholarship, and service obligations?",
    type: "single-select",
    required: true,
    options: [
      "Workload is determined by department norms with no centralized tracking",
      "Course assignments are tracked centrally, but advising, committee work, and scholarship expectations are informal",
      "Workload policy defines expectations, and dean's offices monitor compliance at the department level",
      "Workload management system that tracks all components and flags imbalances",
      "Dynamic workload modeling that factors in class size, modality, student support needs, and scholarly output to optimize faculty allocation",
    ],
  },
  {
    id: "private_prospect_conversion_comp",
    label: "QC6",
    category: "STUDENT ACQUISITION",
    question: "How effectively does your institution convert admitted students into enrolled students?",
    type: "single-select",
    required: true,
    options: [
      "Yield management relies on admitted student events and counselor follow-up calls",
      "Admitted student communication plan with timed emails and campus visit invitations",
      "Yield campaigns segmented by program, geography, and financial need with A/B tested messaging",
      "Predictive yield modeling that identifies high-risk admits and triggers personalized interventions",
      "Dynamic yield management with real-time deposit tracking, competitive intelligence, and personalized content delivery based on student engagement signals",
    ],
  },
  {
    id: "private_online_reputation_comp",
    label: "QC7",
    category: "DIGITAL VISIBILITY",
    question: "How does your institution manage its online reputation and digital presence for prospective students and families?",
    type: "single-select",
    required: true,
    options: [
      "Website is maintained by marketing, but social media and review sites are not actively managed",
      "Social media presence with regular posting, but review sites (Niche, Google) are monitored reactively",
      "Proactive reputation management with monitoring tools, response protocols, and student testimonial strategy",
      "Integrated digital marketing with SEO, paid search, social media, and content marketing aligned to enrollment goals",
      "Comprehensive digital ecosystem with personalized web experiences, attribution tracking, and real-time content optimization based on conversion data",
    ],
  },
  {
    id: "private_tech_governance_comp",
    label: "QC8",
    category: "INSTITUTIONAL READINESS",
    question: "How does your institution make decisions about adopting new technology?",
    type: "single-select",
    required: true,
    options: [
      "Department heads or individual offices acquire tools independently based on immediate needs",
      "IT reviews requests but approval is largely budget-driven with limited strategic evaluation",
      "Technology committee evaluates proposals against institutional priorities, but timelines are long",
      "Governance framework with intake process, pilot protocols, integration requirements, and cost-benefit analysis",
      "Strategic technology roadmap aligned to institutional plan with annual review, vendor assessment, and measurable adoption goals",
    ],
  },
];
