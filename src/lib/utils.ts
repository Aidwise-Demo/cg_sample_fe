import { options } from "@/components/business-form";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BASE_URL } from "./constants";
import { MilestoneOutcomeData, TransformedMilestoneOutcomeData } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getConcatnatedStringsFromArray = (arr: options[]) => {
  return arr.map((item) => item.value).join(",");
};

export const handleExportToPpt = async (id: string, name: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/Get/PPT/${id}`, {
      responseType: 'blob',
    });
    const blob = new Blob([response.data], { type: 'application/vnd.ms-powerpoint' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${name}.ppt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading the PPT file', error);
  }
}

export const transformData = (data: MilestoneOutcomeData[]): TransformedMilestoneOutcomeData[] => {
  return data.flatMap(outcome => {
    return outcome.milestones.map((milestone, index) => ({
      outcomeIsDeleted: outcome.isDeleted,
      milestoneIsDeleted: milestone.isDeleted,
      outcomeID: outcome.outcomeID,
      outcome_name: outcome.outcome_name,
      status: milestone.status,
      weight: milestone.weight,
      benefit: milestone.benefit,
      end_date: milestone.end_date,
      timeline: milestone.timeline,
      start_date: milestone.start_date,
      milestoneID: milestone.milestoneID,
      milestone_name: milestone.milestone_name,
      budget_estimates: milestone.budget_estimates,
      reference_duration: milestone.reference_duration,
      responsible_function: milestone.responsible_function,
      reference_project_name: milestone.reference_project_name,
      reference_project_outcome: milestone.reference_project_outcome,
      reference_project_milestone: milestone.reference_project_milestone,
      outcomeIsAccepted: false,
      milestoneIsAccepted: false
    }));
  });
}

export const retransformData = (data: TransformedMilestoneOutcomeData[]): MilestoneOutcomeData[] => {
  const outcomeMap = new Map<number, MilestoneOutcomeData>();

  data.forEach(item => {
    if (!outcomeMap.has(item.outcomeID)) {
      outcomeMap.set(item.outcomeID, {
        isDeleted: item.outcomeIsDeleted,
        outcomeID: item.outcomeID,
        outcome_name: item.outcome_name,
        milestones: [],
        isAccepted: item.outcomeIsAccepted
      });
    }

    const outcome = outcomeMap.get(item.outcomeID);
    if (outcome) {
      outcome.milestones.push({
        status: item.status,
        weight: item.weight,
        benefit: item.benefit,
        end_date: item.end_date,
        timeline: item.timeline,
        isDeleted: item.milestoneIsDeleted,
        start_date: item.start_date,
        milestoneID: item.milestoneID,
        milestone_name: item.milestone_name,
        budget_estimates: item.budget_estimates,
        reference_duration: item.reference_duration,
        responsible_function: item.responsible_function,
        reference_project_name: item.reference_project_name,
        reference_project_outcome: item.reference_project_outcome,
        reference_project_milestone: item.reference_project_milestone,
        isAccepted: item.milestoneIsAccepted
      });
    }
  });

  return Array.from(outcomeMap.values());
}