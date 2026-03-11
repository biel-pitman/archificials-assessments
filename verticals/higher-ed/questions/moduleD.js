/**
 * Module D: Liberal Arts College
 * QD1-QD8 — Small team ops, financial aid modeling, faculty support, student engagement, donor pipeline, applicant reach, web storytelling, pilot willingness
 */
export const MODULE_KEY = "D";
export const MODULE_NAME = "Liberal Arts College";

export const QUESTIONS = [
  {
    id: "lac_small_team_ops_lib",
    label: "QD1",
    category: "OPERATIONS",
    question: "With a small administrative team, how does your college handle routine operational tasks (transcript requests, enrollment verifications, form processing)?",
    type: "single-select",
    required: true,
    options: [
      "Staff handle each request manually; during peak periods, backlogs are common",
      "Some forms are digitized, but most processing still requires staff intervention",
      "Student-facing portal handles common requests, with staff reviewing exceptions",
      "Automated workflows for routine requests, freeing staff for complex cases and student interaction",
      "Self-service systems handle the majority of routine operations, with staff focused entirely on high-value work and student support",
    ],
  },
  {
    id: "lac_financial_aid_modeling_lib",
    label: "QD2",
    category: "OPERATIONS",
    question: "How does your financial aid office balance institutional aid (merit and need-based) against net revenue targets?",
    type: "single-select",
    required: true,
    options: [
      "Aid decisions follow standard formulas with limited consideration of institutional revenue impact",
      "The CFO and aid director discuss targets annually, but in-cycle adjustments are rare",
      "Aid leveraging model estimates yield and net revenue impact of different packaging strategies",
      "Scenario modeling with multiple financial aid strategies tested against enrollment and revenue goals before awards go out",
      "Continuous optimization where deposit behavior and competitive offers inform real-time aid adjustments within the cycle",
    ],
  },
  {
    id: "lac_faculty_support_lib",
    label: "QD3",
    category: "OPERATIONS",
    question: "How does your college support faculty in incorporating new teaching tools and approaches?",
    type: "single-select",
    required: true,
    options: [
      "Faculty are largely self-directed; support is available on request from IT",
      "Center for teaching and learning offers occasional workshops, but attendance varies",
      "Regular professional development programming with peer mentoring and course design support",
      "Structured onboarding for new tools with faculty champions, release time for innovation, and assessment of impact",
      "Embedded instructional design support with ongoing faculty collaboration, learning analytics, and evidence-based iteration on teaching practices",
    ],
  },
  {
    id: "lac_student_engagement_lib",
    label: "QD4",
    category: "OPERATIONS",
    question: "How does your college track student engagement beyond the classroom (advising, co-curricular, wellness)?",
    type: "single-select",
    required: true,
    options: [
      "Faculty and staff notice disengaged students through personal observation",
      "Advisors track meeting attendance; student life tracks event participation, but systems are not connected",
      "Early alert system allows faculty and staff to flag concerns, with coordinated follow-up",
      "Integrated student engagement platform that connects academic, social, and wellness indicators",
      "Holistic student success model where academic advisors, student life, and counseling share a unified view and collaborate on interventions",
    ],
  },
  {
    id: "lac_donor_pipeline_lib",
    label: "QD5",
    category: "OPERATIONS",
    question: "How does your advancement office identify and cultivate potential major gift donors from your alumni base?",
    type: "single-select",
    required: true,
    options: [
      "Advancement officers rely on personal relationships and reunion attendance to identify prospects",
      "Donor database tracks giving history, but prospect research is largely manual",
      "Wealth screening tools identify capacity, and giving patterns inform outreach timing",
      "Prospect scoring model that combines capacity, affinity, and engagement data to prioritize cultivation",
      "Predictive giving model integrated with engagement data that identifies emerging prospects and recommends cultivation strategies",
    ],
  },
  {
    id: "lac_applicant_reach_lib",
    label: "QD6",
    category: "STUDENT ACQUISITION",
    question: "How does your college reach prospective students who may not already know your institution?",
    type: "single-select",
    required: true,
    options: [
      "Recruitment relies on college fairs, high school visits, and word-of-mouth from current families",
      "Digital advertising supplements traditional outreach, primarily through search ads and social media",
      "Targeted digital campaigns using purchased prospect lists with segmentation by academic interest and geography",
      "Multi-channel prospect engagement with content marketing, virtual events, and data-driven targeting",
      "Strategic market expansion with new geographic and demographic markets identified through data analysis, with personalized digital pathways for each segment",
    ],
  },
  {
    id: "lac_web_storytelling_lib",
    label: "QD7",
    category: "DIGITAL VISIBILITY",
    question: "How effectively does your college's website tell the story of its academic programs and student outcomes?",
    type: "single-select",
    required: true,
    options: [
      "Website has basic program descriptions with limited outcome data or student perspectives",
      "Program pages include some testimonials and career pathway information",
      "Rich content with student stories, outcome statistics, and faculty profiles organized by program",
      "Dynamic content with video, interactive features, and clear pathways from exploration to application",
      "Personalized web experience where prospective students see relevant content based on their interests, with transparent outcome data and financial planning tools",
    ],
  },
  {
    id: "lac_pilot_willingness_lib",
    label: "QD8",
    category: "INSTITUTIONAL READINESS",
    question: "How open is your campus community (faculty, staff, students) to trying new approaches to how the college operates?",
    type: "single-select",
    required: true,
    options: [
      "Community is skeptical of change and prefers established processes",
      "Openness varies; some faculty and staff are enthusiastic, but institutional inertia is strong",
      "Leadership supports innovation, and pilot projects are welcomed as long as they are faculty-involved",
      "Culture of experimentation with defined pilot frameworks, low-risk testing environments, and regular review",
      "Innovation is embedded in institutional culture with designated time, funding, and recognition for trying new approaches",
    ],
  },
];
