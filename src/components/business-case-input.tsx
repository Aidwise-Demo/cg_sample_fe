"use client";
import React, { FC, useEffect, useState } from "react";
import BusinessSideBar from "./business-sidebar";
import BusinessForm from "./business-form";
import { STEPS } from "@/lib/constants";
import Loading from "./loading";
import RightBasicDetailsBar from "./right-basic-details-bar";
import { DeliverablesData, MilestoneOutcomeData, ProjectQuestion } from "@/types";

export interface BusinessCaseInputProps {
  setStep: (step: STEPS) => void;
  projectQuestions: ProjectQuestion
}
const BusinessCaseInput: FC<BusinessCaseInputProps> = ({ setStep, projectQuestions }) => {
  const [activeBar, setActiveBar] = useState<"basic_details">("basic_details");

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [description, setDescription] = useState<string>();
  const [deliverables, setDeliverables] = useState<DeliverablesData[]>();
  const [risksData, setRisksData] = useState<string[]>();
  const [milestoneOutcomeData, setMilestoneOutcomeData] =
    useState<MilestoneOutcomeData[]>();

  const handleDeliverableUpdate = (
    idx: number,
    action: "delete" | "edit",
    value?: string
  ) => {
    if (deliverables && deliverables?.length > 0) {
      if (value && action === "edit") {
        deliverables[idx].name = value;
        setDeliverables(deliverables);
        return;
      }
      if (action === "delete") {
        setDeliverables((prev) =>
          prev?.filter((item) => prev.indexOf(item) !== idx)
        );
        return;
      }
    }
  };

  return (
    <div className="m-4">
      {isGenerating && <Loading />}
      {activeBar === "basic_details" && (
        <div className="flex justify-between">
          <BusinessForm
            setStep={setStep}
            setDescription={setDescription}
            setDeliverables={setDeliverables}
            deliverables={deliverables || []}
            description={description || ""}
            setRisksData={setRisksData}
            setMilestoneOutcomeData={setMilestoneOutcomeData}
            setIsGenerating={setIsGenerating}
            isGenerating={isGenerating}
            setActiveBar={setActiveBar}
            handleDeliverableUpdate={handleDeliverableUpdate}
            projectQuestions={projectQuestions}
          />
          <div className="w-[28%]">
            <RightBasicDetailsBar />
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessCaseInput;
