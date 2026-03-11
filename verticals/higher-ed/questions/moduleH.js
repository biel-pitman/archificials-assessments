/**
 * Module H: Specialized Professional School
 * QH1-QH8 — Clinical placement, accreditation compliance, outcomes tracking, simulation/lab, faculty practice, applicant selection, reputation visibility, innovation capacity
 */
export const MODULE_KEY = "H";
export const MODULE_NAME = "Specialized Professional School";

export const QUESTIONS = [
  {
    id: "spec_clinical_placement_spec",
    label: "QH1",
    category: "OPERATIONS",
    question: "How does your school coordinate clinical rotations, practicum placements, or studio/field assignments?",
    type: "single-select",
    required: true,
    options: [
      "Placements are arranged individually by faculty or a coordinator using spreadsheets and phone calls",
      "Central office manages site relationships, but scheduling and matching are manual",
      "Placement management system tracks sites, preceptors, and student assignments with conflict checking",
      "Automated matching that considers student preferences, site capacity, geographic constraints, and learning objectives",
      "Intelligent placement platform with real-time site availability, competency-based matching, and automated compliance documentation",
    ],
  },
  {
    id: "spec_accreditation_compliance_spec",
    label: "QH2",
    category: "OPERATIONS",
    question: "How does your school maintain compliance with your discipline-specific accreditor (LCME, ABA, ABET, NASAD, etc.)?",
    type: "single-select",
    required: true,
    options: [
      "Compliance is addressed during self-study years with intensive data collection efforts",
      "Accreditation liaison maintains documentation, but evidence gathering is still a major effort each cycle",
      "Ongoing assessment tracking with data collection calendar and assigned responsibilities",
      "Continuous accreditation readiness with automated data feeds, outcome tracking, and real-time compliance dashboards",
      "Embedded quality assurance where accreditation standards are integrated into daily operations, with automated reporting and continuous improvement cycles",
    ],
  },
  {
    id: "spec_outcomes_tracking_spec",
    label: "QH3",
    category: "OPERATIONS",
    question: "How does your school track graduate outcomes (licensure pass rates, board scores, employment, career progression)?",
    type: "single-select",
    required: true,
    options: [
      "We track what accreditors require (pass rates, placement) but do not analyze patterns",
      "Outcome data is collected and reported; some analysis of trends over time",
      "Outcome analytics with cohort comparison, program-level analysis, and identification of at-risk students",
      "Predictive outcome modeling that identifies students unlikely to pass licensure or secure placement, triggering targeted support",
      "Comprehensive outcome intelligence platform with longitudinal tracking, employer feedback integration, and program improvement recommendations based on outcome data",
    ],
  },
  {
    id: "spec_simulation_lab_spec",
    label: "QH4",
    category: "OPERATIONS",
    question: "How does your school use simulation, case-based learning, or studio critique in its curriculum?",
    type: "single-select",
    required: true,
    options: [
      "Experiential learning is instructor-designed and delivered without centralized support",
      "Simulation/studio resources exist, but scheduling and assessment are managed informally",
      "Centralized experiential learning center with dedicated staff, equipment, and scheduling system",
      "Integrated experiential curriculum with standardized assessment rubrics, debrief protocols, and outcome tracking",
      "Advanced experiential learning program with scenario libraries, competency mapping, and data-driven iteration on simulation/studio experiences",
    ],
  },
  {
    id: "spec_faculty_practice_spec",
    label: "QH5",
    category: "OPERATIONS",
    question: "How does your school balance faculty members' teaching responsibilities with their professional practice obligations?",
    type: "single-select",
    required: true,
    options: [
      "Balance is managed individually; some faculty prioritize practice, others teaching",
      "Department policies define expectations, but actual balance varies",
      "Workload framework accounts for clinical/practice time with adjusted teaching loads",
      "Integrated faculty activity system that tracks teaching, practice, scholarship, and service with transparent reporting",
      "Dynamic workload model that optimizes faculty allocation based on student needs, practice commitments, and institutional priorities",
    ],
  },
  {
    id: "spec_applicant_selection_spec",
    label: "QH6",
    category: "STUDENT ACQUISITION",
    question: "How does your school identify and select the most promising applicants from your candidate pool?",
    type: "single-select",
    required: true,
    options: [
      "Committee review of applications using standardized scores and subjective assessment",
      "Structured rubric with defined criteria, but holistic review is still highly manual",
      "Multi-stage selection process with scored criteria, interview protocols, and inter-rater reliability checks",
      "Data-informed selection with historical performance analysis by applicant profile, predicting student success",
      "Comprehensive admissions intelligence that combines academic indicators, non-cognitive assessment, and predictive models validated against graduate outcomes",
    ],
  },
  {
    id: "spec_reputation_visibility_spec",
    label: "QH7",
    category: "DIGITAL VISIBILITY",
    question: "How visible is your school's reputation, program quality, and graduate outcomes to prospective students and employers?",
    type: "single-select",
    required: true,
    options: [
      "Reputation is primarily word-of-mouth within the profession",
      "Website and professional association presence with basic program information",
      "Active digital presence with outcome data, faculty profiles, and alumni success stories",
      "Multi-platform visibility with rankings engagement, media relations, and employer partnership showcases",
      "Comprehensive reputation platform with interactive outcome data, employer testimonials, student journey content, and strategic rankings optimization",
    ],
  },
  {
    id: "spec_innovation_capacity_spec",
    label: "QH8",
    category: "INSTITUTIONAL READINESS",
    question: "How does your school evaluate and adopt innovations in teaching, clinical practice, or professional preparation?",
    type: "single-select",
    required: true,
    options: [
      "Curriculum changes require formal committee approval and typically take 1-2 years",
      "Individual faculty innovate within their courses, but institutional adoption is slow",
      "Curriculum committee is open to evidence-based innovations with defined proposal and pilot processes",
      "Innovation pipeline with pilot funding, assessment framework, and pathway from experiment to standard practice",
      "Culture of continuous improvement with designated innovation time, cross-disciplinary collaboration, and rapid curriculum iteration informed by practice trends and outcome data",
    ],
  },
];
