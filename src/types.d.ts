import { STEPS } from "./lib/constants";
export interface Risks {
  id: number;
  Riskname: string;
  Impact_score: string;
  isDeleted: boolean;
}

export interface BusinessFormProps {
  setDescription: (description: string) => void;
  setDeliverables: (deliverables: DeliverablesData[]) => void;
  deliverables: DeliverablesData[];
  setStep: (step: STEPS) => void;
  description: string;
  setRisksData: (risks: string[]) => void;
  setMilestoneOutcomeData: (data: MilestoneOutcomeData[]) => void;
  setIsGenerating: (value: boolean) => void;
  isGenerating: boolean;
  setActiveBar: (activeBar: "basic_details") => void;
  handleDeliverableUpdate: (
    idx: number,
    action: "delete" | "edit",
    value?: string
  ) => void;
  projectQuestions: ProjectQuestion;
}

export interface Milestone {
  status: string;
  weight?: string;
  benefit: string;
  end_date: string;
  timeline: string;
  start_date: string;
  milestoneID: number;
  milestone_name: string;
  budget_estimates?: string;
  reference_duration: string;
  responsible_function?: string;
  reference_project_name?: string;
  reference_project_outcome: string;
  reference_project_milestone: string;
  isAccepted: boolean;
  isDeleted: boolean;
}

export interface MilestoneOutcomeData {
  outcomeID: number;
  outcome_name: string;
  milestones: Milestone[];
  isDeleted: boolean;
  isAccepted: boolean;
}

export interface TransformedMilestoneOutcomeData {
  outcomeID: number;
  outcome_name: string;
  status: string;
  weight?: string;
  benefit: string;
  end_date: string;
  timeline: string;
  start_date: string;
  milestoneID: number;
  milestone_name: string;
  budget_estimates?: string;
  reference_duration: string;
  responsible_function?: string;
  reference_project_name?: string;
  reference_project_outcome: string;
  reference_project_milestone: string;
  outcomeIsAccepted: boolean;
  milestoneIsAccepted: boolean;
  outcomeIsDeleted: boolean;
  milestoneIsDeleted: boolean;
}

export interface DeliverablesData {
  id: number;
  isDeleted: boolean;
  name: string;
}

export interface ProjectCharterProps {
  description: string;
  deliverables: DeliverablesData[];
  projectName: string;
  risksData: Risks[];
  milestoneOutcomeData: TransformedMilestoneOutcomeData[];
  kpiData: KPI[];
  projectDetails: ProjectDetails;
  interdependencies: Interdepencies[];
  alignment: Alignment;
  isEditing: boolean;
  isFocused: boolean;
  isChatbotOpen: boolean;
  setIsChatbotOpen: (value: boolean) => void;
  setIsFocused: (focused: boolean) => void;
  setIsEditing: (editing: boolean) => void;
  setMilestoneOutcomeData: (
    milestoneOutcomeData: TransformedMilestoneOutcomeData[]
  ) => void;
  getStatusColor: (status: statusColor) => string;
  updateDescription: (description: string) => void;
  updateAlignment: (key: updateAlignmentKeyArguments, content: string) => void;
  updateProjectDetails: (
    key: updateProjectDetailsKeyArguments,
    content: string
  ) => void;
  updateDeliverables: (index: number, content: string) => void;
  updateKpiData: (index: number, key: string, content: string) => void;
  updateRiskData: (
    index: number,
    key: updateRisksKeyArguments,
    content: string
  ) => void;
  updateInterdependencies: (
    index: number,
    key: updateInterdependenciesKeyArguments,
    content: string
  ) => void;
  updateMilestoneOutcomeData: (
    index: number,
    key: updateMilestoneOutcomeDataKeyArguments,
    content: string,
  ) => void;
  projectQuestions: ProjectQuestion;
  fetchCharterById: () => void;
  addDeliverables: () => void;
  deleteDeliverables: (index: number) => void;
  addRiskData: () => void;
  deleteRiskData: (index: number) => void;
  addInterdependencies: () => void;
  deleteInterdependencies: (index: number) => void;
  undoDeliverables: (index: number) => void;
  undoRiskData: (index: number) => void;
  undoInterdependencies: (index: number) => void;
  addKpiData: () => void;
  deleteKpiData: (index: number) => void;
  undoKpiData: (index: number) => void;
  deleteOutcomeData: (outcomeIndex: number) => void;
  addOutcomeData: () => void;
  // addMilestoneData: (outcomeIndex: number) => void;
  undoOutcome: (outcome: number) => void;
  // deleteMilestone: (
  //   outcomeIndex: number,
  //   milestoneID: number,
  //   milestoneIndex: number
  // ) => void;
  // undoMilestone: (
  //   outcomeIndex: number,
  //   milestoneID: number,
  //   milestoneIndex: number
  // ) => void;
  toggleDeliverableDeletedRecords: () => void,
  deletedDeliverableToggle: boolean,
  setDeletedDeliverableToggle: (toggle: boolean) => void
  deletedRiskToggle: boolean,
  setDeletedRiskToggle: (toggle: boolean) => void
  deletedMilestoneOutcomeToggle: boolean
  setDeletedMilestoneOutcomeToggle: (toggle: boolean) => void
  deletedKpiToggle: boolean,
  setDeletedKpiToggle: (toggle: boolean) => void,
  deletedDeliverables: DeliverablesData[],
  deletedRisksData: Risks[],
  deletedMilestoneOutcomeData: TransformedMilestoneOutcomeData[],
  deletedKpiData: KPI[],
  deletedInterdependencies: Interdepencies[],
  toggleInterdependenciesDeletedRecords: () => void
  toggleRisksDeletedRecords: () => void
  toggleKpiDeletedRecords: () => void
  toggleMilestoneOutcomeDeletedRecords: () => void
  deletedInterdependenciesToggle: boolean,
  setDeletedInterdependenciesToggle: (toggle: boolean) => void
  charterId: string

}
export type statusColor = "Draft" | "On Hold" | "Submitted";
export interface StatusColorMap {
  draft: string;
  onhold: string;
  submitted: string;
  assessed: string;
  [key: string]: string; // Add an index signature
}
export interface GenerationStatusColorMap {
  Generating: string;
  NewlyGenerated: string;
  Draft: string;
  Published: string;
  [key: string]: string;
}

export interface StatusTypes {
  key: string;
  value: string;
}

export interface RiskTypes {
  value: string,
  label: string
}

interface AuthorProps {
  author: string;
  owner: string;
  manager: string;
  target_group: string;
  stakeholder: string;
}

export interface CharterProps {
  id: string;
  isChatbotOpen: boolean;
  setIsChatbotOpen: (value: boolean) => void;
  newMilestoneOutcomeData: MilestoneOutcomeData[];
  isSubmitted: boolean;
  setNewMilestoneOutcomeData: (
    milestoneOutcomeData: MilestoneOutcomeData[]
  ) => void;
  setIsSubmitted: (isAccepted: boolean) => void;
}

export interface KPI {
  kpiid: number;
  kpi_name: string;
  isDeleted: boolean;
  [year: string]: any; // This allows for dynamic year keys
}

export interface ProjectDetails {
  owner?: string;
  author?: string;
  status: statusColor;
  manager?: string;
  created_on: string;
  stakeholder?: string;
  target_group?: string;
  estimated_cost?: string;
  estimated_benefit?: [string];
  estimated_timeline?: string;
}

export interface Interdepencies {
  id: number;
  external_entity: string;
  required_support: string;
  isDeleted: boolean;
}
export interface Alignment {
  strategic_program: string;
  strategic_objective: string;
}

interface ProjectDetail {
  alignment: Alignment;
  response_kpi: KPI[];
  response_risk: RisksType;
  response_theme: MilestoneOutcomeData[];
  project_details: ProjectDetails;
  interdependencies?: Interdepencies[];
}
interface ProjectQuestion {
  sector: string;
  theme_list: string[];
  description: string;
  deliverables: DeliverablesData[];
  project_name: string;
  risk_category: string[];
  budget: string,
  other_desc: string,
  timeline: string
}

export interface CharterApiData {
  project_details: ProjectDetail[];
  project_questions: ProjectQuestion[];
}
export interface DashboardApiData {
  project_details: Projects[];
}
export interface Projects {
  ProjectId: string;
  ProjectName: string;
  CreatedBy: string;
  CreatedDate: string;
  ProjectStatus: string;
  overallStatus: string;
  Type: string;
}

export interface DragEvent {
  draggableId: string;
  type: string;
  source: {
    index: number;
    droppableId: string;
  };
  reason: string;
  mode: string;
  destination: {
    droppableId: string;
    index: number;
  } | null;
  combine: any;
}

export interface ChatbotProps {
  value: string;
  setValue: (value: string) => void;
  fetchNewMilestonesData: (res: string) => void;
  newMilestoneOutcomeData: MilestoneOutcomeData[];
  setIsChatbotOpen: (value: boolean) => void;
  setNewMilestoneOutcomeData: (
    milestoneOutcomeData: MilestoneOutcomeData[]
  ) => void;
  setIsSubmitted: (isAccepted: boolean) => void;
}

export type updateAlignmentKeyArguments =
  | "strategic_program"
  | "strategic_objective";
export type updateRisksKeyArguments = "Riskname" | "Impact_score";
export type updateInterdependenciesKeyArguments =
  | "external_entity"
  | "required_support";
export type updateProjectDetailsKeyArguments =
  | "owner"
  | "author"
  | "status"
  | "manager"
  | "created_on"
  | "stakeholder"
  | "target_group"
  | "estimated_cost"
  | "estimated_benefit"
  | "estimated_timeline";
export type updateMilestoneOutcomeDataKeyArguments =
  | "outcome_name"
  | "status"
  | "weight"
  | "end_date"
  | "timeline"
  | "start_date"
  | "milestone_name"
  | "budget_estimates"
  | "responsible_function" | "milestone_name";
