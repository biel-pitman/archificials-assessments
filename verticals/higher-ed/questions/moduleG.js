/**
 * Module G: Online or Distance-First Institution
 * QG1-QG8 — Student support, course quality, engagement monitoring, assessment integrity, content accessibility, student acquisition, findability, scalability
 */
export const MODULE_KEY = "G";
export const MODULE_NAME = "Online or Distance-First Institution";

export const QUESTIONS = [
  {
    id: "online_student_support_online",
    label: "QG1",
    category: "OPERATIONS",
    question: "How does your institution provide student support (advising, tutoring, counseling) to a distributed student body?",
    type: "single-select",
    required: true,
    options: [
      "Support services are available during business hours via phone and email",
      "Online scheduling for virtual advising with some self-service resources",
      "Multi-channel support with chat, video, phone, and a knowledge base for common questions",
      "Tiered support model with self-service for routine needs, live agents for complex issues, and proactive outreach for at-risk students",
      "24/7 intelligent support ecosystem with instant responses for common questions, seamless escalation to human advisors, and proactive interventions based on student engagement data",
    ],
  },
  {
    id: "online_course_quality_online",
    label: "QG2",
    category: "OPERATIONS",
    question: "How does your institution ensure consistent course quality across sections and instructors?",
    type: "single-select",
    required: true,
    options: [
      "Course design is left to individual instructors with general guidelines",
      "Master course templates exist, but instructors have significant latitude to modify",
      "Standardized course shells with quality rubric review, but updates happen on a fixed schedule",
      "Continuous course improvement with student feedback, learning analytics, and regular design reviews",
      "Data-driven quality assurance with automated analysis of student outcomes by section, engagement metrics, and peer review integrated into course iteration cycles",
    ],
  },
  {
    id: "online_engagement_monitoring_online",
    label: "QG3",
    category: "OPERATIONS",
    question: "How does your institution monitor whether online students are actively engaged in their coursework?",
    type: "single-select",
    required: true,
    options: [
      "Engagement is measured by assignment submission; students who stop submitting are contacted",
      "LMS login frequency and assignment completion are tracked, with manual follow-up for disengaged students",
      "Learning analytics dashboard tracks multiple engagement indicators (login patterns, discussion participation, time-on-task)",
      "Automated alerts when engagement drops below thresholds, triggering coordinated outreach",
      "Predictive engagement model that identifies disengagement patterns early and initiates personalized re-engagement before students fall behind",
    ],
  },
  {
    id: "online_assessment_integrity_online",
    label: "QG4",
    category: "OPERATIONS",
    question: "How does your institution approach assessment integrity in a fully online environment?",
    type: "single-select",
    required: true,
    options: [
      "Standard academic integrity policy with honor code; detection relies on instructor judgment",
      "Proctoring for high-stakes exams (ProctorU, Examity) with Turnitin for written assignments",
      "Varied assessment design (authentic assessments, portfolios, oral exams) to reduce reliance on proctoring",
      "Multi-modal assessment strategy with design-level integrity (unique prompts, application-based questions) and targeted proctoring",
      "Comprehensive integrity framework combining assessment design, learning analytics, and process-based evaluation that minimizes opportunities for dishonesty without over-surveilling students",
    ],
  },
  {
    id: "online_content_accessibility_online",
    label: "QG5",
    category: "OPERATIONS",
    question: "How does your institution ensure course content meets accessibility standards (ADA, Section 508)?",
    type: "single-select",
    required: true,
    options: [
      "Accessibility is addressed when students request accommodations",
      "Guidelines exist for accessible content creation, but compliance varies by instructor",
      "Centralized accessibility review for new courses with remediation support",
      "Automated accessibility checking integrated into course development with training for all content creators",
      "Universal design for learning (UDL) embedded in course development process, with automated compliance monitoring and continuous improvement",
    ],
  },
  {
    id: "online_student_acquisition_online",
    label: "QG6",
    category: "STUDENT ACQUISITION",
    question: "How does your institution attract and enroll new students in a competitive online education market?",
    type: "single-select",
    required: true,
    options: [
      "Paid search and display advertising drive most inquiries",
      "Multi-channel digital marketing with organic content, social media, and employer partnerships",
      "Targeted campaigns with persona-based messaging, landing page optimization, and conversion tracking",
      "Data-driven enrollment marketing with attribution modeling, lifetime value analysis, and channel ROI optimization",
      "Integrated demand engine with personalized prospect journeys, predictive enrollment modeling, and continuous creative optimization based on enrollment outcomes",
    ],
  },
  {
    id: "online_findability_online",
    label: "QG7",
    category: "DIGITAL VISIBILITY",
    question: "How do prospective students find and evaluate your institution's programs compared to competitors?",
    type: "single-select",
    required: true,
    options: [
      "Website ranks for branded search terms, but organic visibility for program-specific searches is limited",
      "SEO strategy exists with program pages optimized for key terms",
      "Strong organic search presence with comparison tools, outcome data, and student reviews prominently featured",
      "Multi-platform visibility with organic search, review sites, employer directories, and content marketing",
      "Dominant digital presence in target program categories with personalized content, social proof, and seamless application pathways from every touchpoint",
    ],
  },
  {
    id: "online_scalability_online",
    label: "QG8",
    category: "INSTITUTIONAL READINESS",
    question: "How well does your institution's current technology infrastructure support growth?",
    type: "single-select",
    required: true,
    options: [
      "Current systems are near capacity; significant growth would require major investment",
      "Systems can handle moderate growth, but manual processes would become bottlenecks",
      "Cloud-based infrastructure scales well, though some support processes are still manual",
      "Scalable platform with automated processes for most student-facing and administrative functions",
      "Fully elastic infrastructure with automated scaling, real-time monitoring, and continuous capacity planning integrated into growth strategy",
    ],
  },
];
