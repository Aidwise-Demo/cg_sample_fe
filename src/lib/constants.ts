import { GenerationStatusColorMap, StatusColorMap, StatusTypes } from "@/types";

export const optionRisks = [
  { label: "Perception Risk", value: "Perception Risk" },
  { label: "Financial Risk", value: "Financial Risk" },
  { label: "Stakeholder Risk", value: "Stakeholder Risk" },
  { label: "Social Risk", value: "Social Risk" },
  { label: "Human Resource Risk", value: "Human Resource Risk" },
  { label: "Market Risk", value: "Market Risk" },
  { label: "Governance Risk", value: "Governance Risk" },
  { label: "Technology Risk", value: "Technology Risk" },
  { label: "Legal Risk", value: "Legal Risk" },
  { label: "Project Management Risk", value: "Project Management Risk" },
];

export const sectors = [
  { label: "ADPHC", value: "ADPHC" },
  { label: "HECM", value: "HECM" },
  { label: "Digital Health", value: "Digital Health" },
  { label: "CEPAR", value: "CEPAR" },
  { label: "RIC", value: "RIC" },
  { label: "Health Workforce", value: "Health Workforce" },
  { label: "Payers", value: "Payers" },
  { label: "Facilities", value: "facilities" },
];

export const optionThemes = [
  {
    label: "Strategic Collaborative Partnerships",
    value: "strategic_collaborative_partnerships",
  },
  {
    label: "Policy Development and Implementation",
    value: "policy_development_and_implementation",
  },
  {
    label: "Organizational Restructuring and Empowerment",
    value: "organizational_restructuring_and_empowerment",
  },
  {
    label: "Agile Operational Transformation",
    value: "agile_operational_transformation",
  },
  {
    label: "Continuity and Sustainability Planning",
    value: "continuity_and_sustainability_planning",
  },
  { label: "Public Awareness Campaigns", value: "public_awareness_campaigns" },
  {
    label: "Tailored Intervention Strategies",
    value: "tailored_intervention_strategies",
  },
  {
    label: "Capacity Building Initiatives",
    value: "capacity_building_initiatives",
  },
  {
    label: "Pilot Program Implementation",
    value: "pilot_program_implementation",
  },
  {
    label: "Research Advancement and Development",
    value: "research_advancement_and_development",
  },
];

export const budgetOptions = [
  {
    label: "Under AED 5,000",
    value: "Under AED 5,000",
  },
  {
    label: "AED 5,000 - AED 10,000",
    value: "AED 5,000 - AED 10,000",
  },
  {
    label: "AED 10,000 - AED 25,000",
    value: "AED 10,000 - AED 25,000",
  },
  {
    label: "AED 25,000 - AED 50,000",
    value: "AED 25,000 - AED 50,000",
  },
  {
    label: "AED 50,000 - AED 100,000",
    value: "AED 50,000 - AED 100,000",
  },
  {
    label: "Over AED 100,000",
    value: "Over AED 100,000",
  },
];

export const timelineOptions = [
  {
    label: "1 - 3 months",
    value: "1 - 3 months",
  },
  {
    label: "3 - 6 months",
    value: "3 - 6 months",
  },
  {
    label: "6 - 9 months",
    value: "6 - 9 months",
  },
  {
    label: "9 - 12 months",
    value: "9 - 12 months",
  },
  {
    label: "12 - 18 months",
    value: "12 - 18 months",
  },
  {
    label: "Over 18 months",
    value: "Over 18 months",
  },
];

export enum STEPS {
  MENU = 0,
  BUSINESS_CASE_INPUT = 1,
}

export const staticInfo = [
  // {
  //   key: "Author",
  //   value: "",
  //   // img: "/assets/author.svg",
  //   className: "text-primaryPurple700 font-normal text-xs",
  // },
  {
    key: "Status",
    value: "Draft",
    className: "px-5 py-1 rounded-lg text-darkBlack700 bg-darkBlack300 ",
  },
  {
    key: "Created On",
    value: "15th Nov 2023",
    className: "text-darkBlack600 font-normal text-xs",
  },
  {
    key: "Estimated Cost",
    value: "AED 3M to AED 5M",
    className: "text-darkBlack600 font-normal text-xs",
  },
  {
    key: "Estimated Timeline",
    value: "1 week",
    className: "text-darkBlack600 font-normal text-xs",
  },

  {
    key: "Estimated Benefits",
    value: [
      "Improved Newborn Health",
      "Parental Support and Education",
      "Long-term Healthcare Cost Savings",
    ],
    className: "px-3 py-2 ",
  },
];

export const risksLevel = [
  {
    risk: "Default",
    color: "#b7b7b7",
  },
  {
    risk: "High",
    color: "#FF0000",
  },
  {
    risk: "Medium",
    color: "#FAA160",
  },
  {
    risk: "Low",
    color: "#10C400",
  },
];

export const registerBusinessCasesData = [
  {
    name: "Sales Comparison Report",
    type: "Business Case",
    createdBy: "Jennifer Lawernce",
    createdOn: "08",
    stage: "08",
    status: "endorsed",
  },
  {
    name: "Skill Development Training",
    type: "Concept",
    createdBy: "Adam Smith",
    createdOn: "07",
    stage: "08",
    status: "onhold",
  },
  {
    name: "Customer Feedback Assessment",
    type: "Concept",
    createdBy: "Vikas Seth",
    createdOn: "06",
    stage: "08",
    status: "submitted",
  },
  {
    name: "KRA Refinements",
    type: "Business Case",
    createdBy: "Charles Schwas",
    createdOn: "06",
    stage: "08",
    status: "endorsed",
  },
  {
    name: "Mobile App Enhancements",
    type: "Business Case",
    createdBy: "Jennifer Lawernce",
    createdOn: "05",
    stage: "08",
    status: "assessed",
  },
];

export const riskOptions = [
  { value: 'default', label: 'Default' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

export const statusColorMap: StatusColorMap = {
  draft: "#D8D9E4",
  onhold: "#FCC7C3",
  submitted: "#E6F3E5",
  assessed: "#E9E9F0",
};

export const statusTypes: StatusTypes[] = [
  {
    key: 'Generating',
    value: 'Generating...'
  },
  {
    key: 'NewlyGenerated',
    value: 'Newly Generated'
  },
  {
    key: 'Draft',
    value: 'Draft'
  },
  {
    key: 'Published',
    value: 'Published'
  },
]

export const generationStatusColorMap: GenerationStatusColorMap = {
  "Generating": "#deecff",
  "NewlyGenerated": "#dcbee8",
  "Draft": "#fff4ab",
  "Published": "#3ee618"
};
export const sidebarActivities = [
  "Overall Activities might exceed budget",
  "Overall timelines may exceed expected timelines",
  `AI Recommendation: Top Project Risk Identified as "..."`,
  "Project is associated with following strategic objectives",
  "N Similar Projects Identified",
  `Project Probability to complete within "time and budget"`,
];
export const BASE_URL = "http://127.0.0.1:8000";

export const searchOptions = [
  {
    label: 'Public Health thematic strategy',
    value: 'Public Health thematic strategy',
    link: 'https://res.cloudinary.com/di6jo7bwd/image/upload/v1721821417/Public_Health_thematic_strategy_b6rc7m.pdf'
  },
  {
    label: 'Tackling obesity through behavior change',
    value: 'Tackling obesity through behavior change',
    link: 'https://res.cloudinary.com/di6jo7bwd/image/upload/v1721821719/Tackling_obesity_through_behavior_change_jkhmhz.pdf'
  },
  {
    label: 'Injury prevention',
    value: 'Injury prevention'
  },
  {
    label: 'Comprehensive screenings',
    value: 'Comprehensive screenings'
  },
  {
    label: 'Infectious disease preparedness and response',
    value: 'Infectious disease preparedness and response'
  },
  {
    label: 'Environmental adaptation for public health',
    value: 'Environmental adaptation for public health'
  },
  {
    label: 'Health keeper',
    value: 'Health keeper'
  },
  {
    label: 'Mental health model of care',
    value: 'Mental health model of care'
  },
  {
    label: "Women & children's health model of care",
    value: "Women & children's health model of care"
  },
  {
    label: 'Centers of excellence',
    value: 'Centers of excellence'
  },
  {
    label: 'Muashir Expansion',
    value: 'Muashir Expansion'
  },
  {
    label: 'Data, Infrastructure and AI',
    value: 'Data, Infrastructure and AI'
  },
  {
    label: 'Digital governance',
    value: 'Digital governance'
  },
  {
    label: 'Population health intelligence',
    value: 'Population health intelligence'
  },
  {
    label: 'Digital ecosystem orchestration',
    value: 'Digital ecosystem orchestration'
  },
  {
    label: 'Healthcare Cyber Security Excellence Hub',
    value: 'Healthcare Cyber Security Excellence Hub'
  },
  {
    label: 'Reimbursement reform',
    value: 'Reimbursement reform'
  },
  {
    label: 'Tariff commission',
    value: 'Tariff commission'
  },
  {
    label: 'Unified medical operations command',
    value: 'Unified medical operations command'
  },
  {
    label: 'Emergency preparedness trainings and public awareness',
    value: 'Emergency preparedness trainings and public awareness'
  },
  {
    label: 'DoH transformation',
    value: 'DoH transformation'
  },
  {
    label: 'Health regulatory advancement',
    value: 'Health regulatory advancement'
  },
  {
    label: 'Tawteen and workforce regulation reform',
    value: 'Tawteen and workforce regulation reform'
  },
  {
    label: 'Health workforce upskilling',
    value: 'Health workforce upskilling'
  },
  {
    label: 'Global groundbreaking clinical trials from Abu Dhabi',
    value: 'Global groundbreaking clinical trials from Abu Dhabi'
  },
  {
    label: 'Research & innovation funding',
    value: 'Research & innovation funding'
  },
  {
    label: 'Personalized health & precision medicine',
    value: 'Personalized health & precision medicine'
  },
  {
    label: 'The national biobank',
    value: 'The national biobank'
  },
]