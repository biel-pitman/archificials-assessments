/**
 * Module G: Real Estate & Transactional
 * QG1-QG8 - Commercial/residential RE, land development, eminent domain, renewables, HOA.
 */
export const MODULE_KEY = "G";
export const MODULE_NAME = "Real Estate & Transactional";

export const QUESTIONS = [
  {
    id: "case_mix_re",
    label: "QG1",
    category: "CASE PROFILE",
    question: "What types of real estate or transactional work does your firm primarily handle?",
    type: "single-select",
    required: true,
    options: [
      "Commercial property acquisition, sale, and leasing",
      "Residential real estate closings and transactions",
      "Real estate development, land use, and entitlements",
      "Eminent domain, condemnation, or government taking defense",
      "Renewable energy leasing (wind, solar) or conservation easements",
      "HOA, condominium, or community association law",
      "A mix across real estate categories",
    ],
  },
  {
    id: "title_review_re",
    label: "QG2",
    category: "OPERATIONS",
    question: "How does your team handle title examination and transaction due diligence?",
    type: "single-select",
    required: true,
    options: [
      "Attorney personally reviews title commitments and due diligence materials",
      "Paralegals do the initial review; attorney reviews identified issues",
      "A title company handles examination; we review the commitment for legal issues",
      "We use tools or checklists to standardize the due diligence process",
    ],
  },
  {
    id: "contract_drafting_re",
    label: "QG3",
    category: "OPERATIONS",
    question: "How do you draft and review contracts, purchase agreements, and commercial leases?",
    type: "single-select",
    required: true,
    options: [
      "From prior matter templates that attorneys update for each deal",
      "From scratch based on the specific terms and deal structure",
      "Associates draft; partners review and negotiate",
      "We use contract management tools to track key terms and deadlines",
    ],
  },
  {
    id: "concurrent_mgmt_re",
    label: "QG4",
    category: "OPERATIONS",
    question: "How do you manage multiple transactions or closings running simultaneously?",
    type: "single-select",
    required: true,
    options: [
      "Through our case or matter management software with deadline tracking",
      "Through a shared firm calendar and standardized checklists",
      "Through individual attorney tracking \u2014 no firm-wide system",
      "Managing concurrent transactions is an area where we want better process",
    ],
  },
  {
    id: "party_coord_re",
    label: "QG5",
    category: "OPERATIONS",
    question: "How do you coordinate communication between clients, lenders, title companies, and other parties?",
    type: "single-select",
    required: true,
    options: [
      "Primarily by direct email and phone with all parties",
      "Through a deal room or shared document portal",
      "Our paralegal team manages day-to-day communication",
      "Communication is attorney-managed and varies by deal",
    ],
  },
  {
    id: "client_source_re",
    label: "QG6",
    category: "CLIENT ACQUISITION",
    question: "How do most new matters originate for your firm?",
    type: "single-select",
    required: true,
    options: [
      "Referrals from real estate brokers, developers, or lenders",
      "Past client referrals and repeat business",
      "Attorney and professional network referrals",
      "Online visibility and directory presence",
    ],
  },
  {
    id: "regulatory_re",
    label: "QG7",
    category: "OPERATIONS",
    question: "How do you stay current on zoning, entitlement regulations, and market changes in your area?",
    type: "single-select",
    required: true,
    options: [
      "Through active monitoring of local planning boards and government filings",
      "Through bar association and real estate law group involvement",
      "Through our existing local knowledge and professional network",
      "Tracking these changes proactively is a challenge for us",
    ],
  },
  {
    id: "bottleneck_re",
    label: "QG8",
    category: "OPERATIONS",
    question: "What is the biggest constraint on your real estate or transactional practice right now?",
    type: "single-select",
    required: true,
    options: [
      "Transaction volume and capacity during peak cycles",
      "Contract drafting, review, and negotiation speed",
      "Title and due diligence work on complex or high-volume matters",
      "Multi-party communication and coordination across a deal",
      "Regulatory research and staying current on market changes",
    ],
  },
];
