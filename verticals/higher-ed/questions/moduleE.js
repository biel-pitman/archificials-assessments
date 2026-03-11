/**
 * Module E: Community or Technical College
 * QE1-QE8 — Student services access, workforce alignment, enrollment tracking, dual enrollment, adjunct coordination, community awareness, program findability, resource readiness
 */
export const MODULE_KEY = "E";
export const MODULE_NAME = "Community or Technical College";

export const QUESTIONS = [
  {
    id: "cc_student_services_access_cc",
    label: "QE1",
    category: "OPERATIONS",
    question: "How do students at your college access advising, financial aid, and registration services?",
    type: "single-select",
    required: true,
    options: [
      "Students must visit campus during business hours for most services",
      "Some services are available online (registration), but advising and financial aid require in-person or phone contact",
      "Student portal handles routine transactions, with online scheduling for advising appointments",
      "Comprehensive online services with virtual advising, chatbot for common questions, and mobile-friendly access",
      "24/7 digital student services with proactive outreach (registration reminders, financial aid deadlines, course recommendations) complementing in-person support",
    ],
  },
  {
    id: "cc_workforce_alignment_cc",
    label: "QE2",
    category: "OPERATIONS",
    question: "How does your college align its program offerings with local employer needs?",
    type: "single-select",
    required: true,
    options: [
      "Program development is faculty-driven based on disciplinary expertise",
      "Advisory boards meet periodically, but translating employer input into curriculum changes is slow",
      "Regular labor market analysis informs new program proposals, with employer advisory input",
      "Active employer partnerships with co-developed curricula, work-based learning placements, and shared outcome data",
      "Real-time labor market intelligence platform that informs program development, credential stacking, and student career advising",
    ],
  },
  {
    id: "cc_enrollment_tracking_cc",
    label: "QE3",
    category: "OPERATIONS",
    question: "How does your college track students who stop attending before completing a credential?",
    type: "single-select",
    required: true,
    options: [
      "We know students have left when they do not register for the next term",
      "Attendance and grade data flag non-returning students, but outreach is inconsistent",
      "Re-enrollment campaigns target recent stop-outs with financial aid and program information",
      "Predictive model identifies students at risk of stopping out before they leave, triggering proactive intervention",
      "Comprehensive student persistence system that monitors engagement indicators, coordinates outreach across departments, and tracks re-enrollment outcomes",
    ],
  },
  {
    id: "cc_dual_enrollment_cc",
    label: "QE4",
    category: "OPERATIONS",
    question: "How does your college manage dual enrollment partnerships with local high schools?",
    type: "single-select",
    required: true,
    options: [
      "Dual enrollment is managed on a case-by-case basis with individual high schools",
      "Standard agreements exist, but registration, advising, and transcript sharing are largely manual",
      "Centralized dual enrollment office with streamlined registration and academic support for high school students",
      "Integrated dual enrollment platform with automated registration, academic progress monitoring, and pathway advising",
      "Strategic dual enrollment program with data-driven high school partnerships, embedded advising, and seamless transition to full enrollment",
    ],
  },
  {
    id: "cc_adjunct_coordination_cc",
    label: "QE5",
    category: "OPERATIONS",
    question: "How does your college coordinate with adjunct faculty, who may teach at multiple institutions?",
    type: "single-select",
    required: true,
    options: [
      "Adjuncts receive a syllabus and access to the LMS; ongoing support is minimal",
      "Department chairs check in periodically, but adjuncts are largely self-directed",
      "Structured onboarding for new adjuncts with teaching resources and a faculty mentor",
      "Regular professional development, shared teaching materials, and inclusion in department planning",
      "Adjunct engagement program with ongoing training, curriculum input opportunities, and recognition that builds connection to the institution",
    ],
  },
  {
    id: "cc_community_awareness_cc",
    label: "QE6",
    category: "STUDENT ACQUISITION",
    question: "How does your community know about the programs and services your college offers?",
    type: "single-select",
    required: true,
    options: [
      "Community awareness comes primarily from being the local college; active marketing is limited",
      "Basic website, social media, and seasonal advertising for registration periods",
      "Targeted outreach for specific programs (nursing, trades, IT) with employer and community partnerships",
      "Multi-channel marketing with program-specific campaigns, community events, and clear career pathway messaging",
      "Data-driven community engagement with neighborhood-level targeting, multilingual outreach, and personalized program recommendations based on career interest assessments",
    ],
  },
  {
    id: "cc_program_findability_cc",
    label: "QE7",
    category: "DIGITAL VISIBILITY",
    question: "How easy is it for someone in your community to find information about your programs, costs, and how to enroll?",
    type: "single-select",
    required: true,
    options: [
      "Website exists but navigation is confusing and information is buried in multiple clicks",
      "Program pages are available with basic information, but the enrollment process is not clearly explained",
      "Clear program pages with costs, schedules, career outcomes, and a straightforward application link",
      "Streamlined digital enrollment pathway from program discovery to class registration with progress tracking",
      "Fully guided digital experience with program finder tools, cost estimators, enrollment checklists, and support chat at every step",
    ],
  },
  {
    id: "cc_resource_readiness_cc",
    label: "QE8",
    category: "INSTITUTIONAL READINESS",
    question: "Given your college's current budget and staffing, how realistic is it to take on new operational tools or processes in the next 12 months?",
    type: "single-select",
    required: true,
    options: [
      "Budget is fully committed; any new initiative would require cutting something else",
      "Small discretionary budget exists, but staffing capacity to implement changes is the real constraint",
      "Leadership has identified operational improvement as a priority and allocated some resources",
      "Dedicated budget and a point person for operational technology projects, with pilot-before-commit approach",
      "Innovation fund with cross-functional team empowered to evaluate, pilot, and scale new approaches",
    ],
  },
];
