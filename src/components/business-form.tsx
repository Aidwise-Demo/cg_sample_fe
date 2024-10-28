"use client";

import {
  optionRisks,
  sectors,
  optionThemes,
  BASE_URL,
  STEPS,
  timelineOptions,
  budgetOptions,
  riskOptions,
} from "@/lib/constants";
import React, { FC, useCallback, useEffect, useState } from "react";

import Select from "react-select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Delete, Loader, X } from "lucide-react";
import { useToast } from "./ui/use-toast";
import axios from "axios";

import { BusinessFormProps, CharterApiData } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "./loading";
export interface options {
  label: string;
  value: string;
}
const BusinessForm: FC<BusinessFormProps> = ({
  deliverables,
  setDeliverables,
  setDescription,
  description,
  isGenerating,
  setIsGenerating,
  handleDeliverableUpdate,
  projectQuestions
}) => {
  const [sector, setSector] = useState<options>();
  const [themes, setThemes] = useState<options[]>();
  const [risks, setRisks] = useState<options[]>();
  const [initiative, setInitiative] = useState<string>();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [currentDeliverable, setCurrentDeliverable] = useState<string>();
  const [timeline, setTimeline] = useState<options>({ value: "", label: "" });
  const [budget, setBudget] = useState<options>({ value: "", label: "" });
  const [otherDetails, setOtherDetails] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");

  const { toast } = useToast();
  const searchParams = useSearchParams();
  const charterId = searchParams.get('charterId')
  useEffect(() => {
    if (projectQuestions) {
      setDeliverables(projectQuestions.deliverables)
      setSector(sectors.find((sector) => sector.value === projectQuestions.sector))
      setThemes(optionThemes.filter((theme) => projectQuestions.theme_list.includes(theme.label)))
      setRisks(optionRisks.filter((risk) => projectQuestions.risk_category.includes(risk.value)))
      setInitiative(projectQuestions.project_name)
      setDescription(projectQuestions.description)
      setBudget(budgetOptions.find((budget) => projectQuestions.budget === budget.value) || { label: "", value: "" })
      setTimeline(timelineOptions.find((timeline) => projectQuestions.timeline === timeline.value) || { label: "", value: "" })
      setOtherDetails(projectQuestions.other_desc)
    }
  }, [projectQuestions, setDeliverables, setDescription])
  const handleAddDeliverable = () => {
    let id = 1
    if (currentDeliverable) {
      setDeliverables([...(deliverables), { ["id"]: id++, ["name"]: currentDeliverable, isDeleted: false }]);
      setCurrentDeliverable("");
    } else {
      toast({
        title: "Deliverables is missing",
        variant: "destructive",
        success: false,
      });
    }
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>, projectId: string) => {
    e.preventDefault()
    setIsGenerating(true)
    let unique_id;
    let theme = themes?.map(ele => ele.label)
    let risk = risks?.map(ele => ele.label)
    try {
      setIsGenerating(true)
      const response = await axios.post(`${BASE_URL}/Get/ALL`, {
        "project_name": initiative,
        "theme_list": theme?.join(','),
        "risk_category": risk?.join(','),
        "description": description,
        "sector": sector?.value,
        "deliverables": deliverables.map(item => item.name).join(";"),
        "username": "User1",
        "budget": budget?.value,
        "timeline": timeline?.value,
        "other_desc": otherDetails,
        "project_id": projectId
      })
      unique_id = response.data.unique_id
      setProjectId(unique_id)
      if (unique_id) {
        setTimeout(() => {
          setIsGenerating(false)
        }, 15000)
        setTimeout(() => {
          toast({
            description: "Your Project Charter is Under Generation. Redirecting to Dashboard...",
            variant: "success"
          })
        }, 16000);
        setTimeout(() => {
          window?.location?.replace("/")
        }, 17000)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const redirectToHomePage = useCallback(() => {
    window?.location?.replace("/")
  }, []);
  return (
    <div>
      {!projectQuestions && (
        <form
          onSubmit={(e) => { handleFormSubmit(e, "") }}
          className="w-[57vw] p-4 bg-sdzBlue100 space-y-6 rounded-md"
        >
          <h2 className="font-semibold text-lg">
            To generate a Charter, provide us with some basic details:
          </h2>
          <div className="space-y-5 text-sm font-medium bg-[#FFFFFF] p-6 rounded-md">
            <div className="flex flex-col gap-2 font-medium">
              <label htmlFor="Sector">
                Select the relevant Sector for your project charter from the list below: <span className="text-red-600">*</span>
              </label>
              <Select
                name="sectors"
                onChange={(value) => setSector(value as options)}
                options={sectors}
                className="basic-multi-select font-normal"
                required
              />
            </div>
            <div className="flex flex-col gap-2 font-medium">
              <label htmlFor="initiative">
                Enter a Project Name: <span className="text-red-600">*</span>
              </label>
              <Input
                className="font-normal"
                onChange={(e) => setInitiative(e.target.value)} placeholder="Input"
                required
              />
            </div>
            <div className="flex flex-col gap-2 font-medium">
              <label htmlFor="description">Provide a brief description of the Project: <span className="text-red-600">*</span></label>
              <Textarea
                className="resize-none font-normal"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2 font-medium">
              <label htmlFor="Themes">
                Select the relevant Delivery Theme(s) for the project from the list below: <span className="text-red-600">*</span>
              </label>
              <Select
                isMulti
                name="themes"
                onChange={(value) => setThemes(value as options[])}
                options={optionThemes}
                className="basic-multi-select font-normal"
                required
              />
            </div>
            <div className="flex flex-col gap-2 font-medium">
              <label htmlFor="Risks">
                Select the relevant Risk categories you think will be associated
                with the project: <span className="text-red-600">*</span>
              </label>
              <Select
                isMulti
                name="risks"
                onChange={(value) => setRisks(value as options[])}
                options={optionRisks}
                className="basic-multi-select "
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="deliverables">
                List out the most likely deliverables for this Project: <span className="text-red-600">*</span>
                <span className="text-xs flex text-gray-400">For example, tell us if you are creating an organizational structure, supporting a new core pathway, building a new task force</span>
              </label>
              <div className="flex items-center gap-2">
                <Input
                  onChange={(e) => setCurrentDeliverable(e.target.value)}
                  value={currentDeliverable}
                  className="font-normal"
                />
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={handleAddDeliverable}
                >
                  Add
                </Button>
              </div>
              {deliverables && deliverables?.length > 0 && (
                <div className="flex flex-col gap-2 text-sm">
                  {deliverables?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between space-x-2"
                    >
                      <span className="text-justify w-[70%] font-normal">
                        {item.name}
                      </span>
                      <div onClick={() => handleDeliverableUpdate(idx, "delete")}>
                        <X className="text-rose-500 ml-auto w-5 h-5 cursor-pointer" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <hr className="border  border-darkBlack400" />
            <div className="flex flex-col space-y-3">
              <div className="flex w-full justify-between items-center">
                <span className="text-darkBlack700 italic">
                  To create a Project Charter with more relevant information provide
                  more details:
                </span>
                <span
                  className="text-primaryPurple700 underline cursor-pointer"
                  onClick={() => setShowDetails((prev) => !prev)}
                >
                  {showDetails ? "Show Less" : "Show More"}
                </span>
              </div>
              {showDetails && (
                <div className="flex flex-col gap-2 font-medium">
                  <label htmlFor="timeline">Proposed Timeline: <span className="text-red-600">*</span></label>
                  <Select
                    name="timeline"
                    onChange={(value) => setTimeline(value as options)}
                    options={timelineOptions}
                    placeholder="Choose Timeline"
                    className="basic-multi-select "
                    required
                  />
                </div>
              )}
              {showDetails && (
                <div className="flex flex-col gap-2 font-medium">
                  <label htmlFor="budget">Proposed Budget: <span className="text-red-600">*</span></label>
                  <Select
                    name="budget"
                    placeholder="Choose Budget"
                    onChange={(value) => setBudget(value as options)}
                    options={budgetOptions}
                    className="basic-multi-select"
                    required
                  />
                </div>
              )}
              {showDetails && (
                <div className="flex flex-col gap-2 font-medium">
                  <label htmlFor="description">
                    Any other details/relevant artefacts, you would like to provide <span className="italic text-gray-400">(Optional)</span> :
                  </label>
                  <Textarea
                    className="resize-none font-normal"
                    onChange={(e) => setOtherDetails(e.target.value)}
                    placeholder="Provide Details"
                    cols={2}
                  />
                </div>
              )}
              {showDetails && (
                <div className="p-2 text-xs italic">*These inputs of budget and timelines are solely for the guidance of the Language Model (LLM). They do not optimize or determine the milestones and outcomes plan in any way. Budget and milestones need to be reviewed separately to finalize the charter.</div>
              )}
            </div>
          </div>
          <div className="flex items-center text-sm bg-lightWhite400 justify-between font-medium text-darkBlack600">
            <Button
              className="bg-lightWhite400 px-6 py-0"
              variant={"outline"}
              type="button"
              onClick={redirectToHomePage}
            >
              Cancel
            </Button>
            <div className="flex items-center gap-5 ">
              <Button
                variant={"outline"}
                type="button"
                className="bg-lightWhite400 px-6 py-0"
                onClick={redirectToHomePage}
              >{`<<Back`}</Button>
              {/* <Button
              variant={"outline"}
              className="bg-lightWhite400 px-6 py-0"
              type="button"
              onClick={redirectToHomePage}
            >
              Save & Exit
            </Button> */}
              <Button
                variant={"primary"}
                type="submit"
                className="text-sm px-11 text-lightWhite200"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader />
                ) : (
                  "Generate"
                )}
              </Button>
            </div>
          </div>
        </form>
      )}
      {projectQuestions && (
        <form
          onSubmit={(e) => handleFormSubmit(e, charterId!)}
          className="w-[57vw] p-4 bg-sdzBlue100 space-y-6 rounded-md"
        >
          <h2 className="font-semibold text-lg">
            To generate a Charter, provide us with some basic details:
          </h2>
          <div className="space-y-5 text-sm font-medium bg-[#FFFFFF] p-6 rounded-md">
            <div className="flex flex-col gap-2 font-medium">
              <label htmlFor="Sector">
                Select the relevant Sector for your project charter from the list below: <span className="text-red-600">*</span>
              </label>
              <Select
                name="sectors"
                onChange={(value) => setSector(value as options)}
                value={sector}
                options={sectors}
                className="basic-multi-select font-normal"
                required
              />
            </div>
            <div className="flex flex-col gap-2 font-medium">
              <label htmlFor="initiative">
                Enter a Project Name: <span className="text-red-600">*</span>
              </label>
              <Input
                className="font-normal"
                value={initiative}
                onChange={(e) => console.log(e.target.value)} placeholder="Input"
                required
              />
            </div>
            <div className="flex flex-col gap-2 font-medium">
              <label htmlFor="description">Provide a brief description of the Project: <span className="text-red-600">*</span></label>
              <Textarea
                className="resize-none font-normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2 font-medium">
              <label htmlFor="Themes">
                Select the relevant Delivery Theme(s) for the project from the list below: <span className="text-red-600">*</span>
              </label>
              <Select
                isMulti
                name="themes"
                onChange={(value) => setThemes(value as options[])}
                value={themes}
                options={optionThemes}
                className="basic-multi-select font-normal"
                required
              />
            </div>
            <div className="flex flex-col gap-2 font-medium">
              <label htmlFor="Risks">
                Select the relevant Risk categories you think will be associated
                with the project: <span className="text-red-600">*</span>
              </label>
              <Select
                isMulti
                name="risks"
                onChange={(value) => setRisks(value as options[])}
                value={risks}
                options={optionRisks}
                className="basic-multi-select "
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="deliverables">
                List out the most likely deliverables for this Project: <span className="text-red-600">*</span>
                <span className="text-xs flex text-gray-400">For example, tell us if you are creating an organizational structure, supporting a new core pathway, building a new task force</span>
              </label>
              <div className="flex items-center gap-2">
                <Input
                  onChange={(e) => setCurrentDeliverable(e.target.value)}
                  value={currentDeliverable}
                  className="font-normal"
                />
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={handleAddDeliverable}
                >
                  Add
                </Button>
              </div>
              {deliverables && deliverables?.length > 0 && (
                <div className="flex flex-col gap-2 text-sm">
                  {deliverables?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between space-x-2"
                    >
                      <span className="text-justify w-[70%] font-normal">
                        {item.name}
                      </span>
                      <div onClick={() => handleDeliverableUpdate(idx, "delete")}>
                        <X className="text-rose-500 ml-auto w-5 h-5 cursor-pointer" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <hr className="border  border-darkBlack400" />
            <div className="flex flex-col space-y-3">
              <div className="flex w-full justify-between items-center">
                <span className="text-darkBlack700 italic">
                  To create a Project Charter with more relevant information provide
                  more details:
                </span>
                <span
                  className="text-primaryPurple700 underline cursor-pointer"
                  onClick={() => setShowDetails((prev) => !prev)}
                >
                  {showDetails ? "Show Less" : "Show More"}
                </span>
              </div>
              {showDetails && (
                <div className="flex flex-col gap-2 font-medium">
                  <label htmlFor="timeline">Proposed Timeline: <span className="text-red-600">*</span></label>
                  <Select
                    name="timeline"
                    onChange={(value) => setTimeline(value as options)}
                    options={timelineOptions}
                    value={timeline}
                    placeholder="Choose Timeline"
                    className="basic-multi-select "
                    required
                  />
                </div>
              )}
              {showDetails && (
                <div className="flex flex-col gap-2 font-medium">
                  <label htmlFor="budget">Proposed Budget: <span className="text-red-600">*</span></label>
                  <Select
                    name="budget"
                    value={budget}
                    placeholder="Choose Budget"
                    onChange={(value) => setBudget(value as options)}
                    options={budgetOptions}
                    className="basic-multi-select"
                    required
                  />
                </div>
              )}
              {showDetails && (
                <div className="flex flex-col gap-2 font-medium">
                  <label htmlFor="description">
                    Any other details/relevant artefacts, you would like to provide <span className="italic text-gray-400">(Optional)</span> :
                  </label>
                  <Textarea
                    className="resize-none font-normal"
                    onChange={(e) => setOtherDetails(e.target.value)}
                    placeholder="Provide Details"
                    cols={2}
                  />
                </div>
              )}
              {showDetails && (
                <div className="p-2 text-xs italic">*These inputs of budget and timelines are solely for the guidance of the Language Model (LLM). They do not optimize or determine the milestones and outcomes plan in any way. Budget and milestones need to be reviewed separately to finalize the charter.</div>
              )}
            </div>
          </div>
          <div className="flex items-center text-sm bg-lightWhite400 justify-between font-medium text-darkBlack600">
            <Button
              className="bg-lightWhite400 px-6 py-0"
              variant={"outline"}
              type="button"
              onClick={redirectToHomePage}
            >
              Cancel
            </Button>
            <div className="flex items-center gap-5 ">
              <Button
                variant={"outline"}
                type="button"
                className="bg-lightWhite400 px-6 py-0"
                onClick={redirectToHomePage}
              >{`<<Back`}</Button>
              <Button
                variant={"primary"}
                type="submit"
                className="text-sm px-11 text-lightWhite200"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader />
                ) : (
                  "Generate"
                )}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>


  );
};

export default BusinessForm;
