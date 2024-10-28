"use client";

import { cn, handleExportToPpt, retransformData } from "@/lib/utils";
import { DeliverablesData, ProjectCharterProps } from "@/types";
import Image from "next/image";
import { act, FC, useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./custom-droppable";
import axios from "axios";
import { BASE_URL, riskOptions, risksLevel } from "@/lib/constants";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useToast } from "./ui/use-toast";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useSearchParams, useRouter } from 'next/navigation';

const ProjectCharter: FC<ProjectCharterProps> = ({
  description,
  deliverables,
  projectName,
  risksData,
  milestoneOutcomeData,
  kpiData,
  projectDetails,
  interdependencies,
  alignment,
  isEditing,
  isFocused,
  projectQuestions,
  setIsEditing,
  setIsFocused,
  getStatusColor,
  updateAlignment,
  updateDescription,
  updateDeliverables,
  updateInterdependencies,
  updateKpiData,
  updateProjectDetails,
  updateRiskData,
  updateMilestoneOutcomeData,
  charterId,
  fetchCharterById,
  setMilestoneOutcomeData,
  addDeliverables,
  deleteDeliverables,
  addRiskData,
  deleteRiskData,
  addInterdependencies,
  deleteInterdependencies,
  setIsChatbotOpen,
  isChatbotOpen,
  undoDeliverables,
  undoInterdependencies,
  undoRiskData,
  addKpiData,
  deleteKpiData,
  undoKpiData,
  addOutcomeData,
  deleteOutcomeData,
  // addMilestoneData,
  // deleteMilestone,
  // undoMilestone,
  undoOutcome,
  toggleDeliverableDeletedRecords,
  deletedDeliverableToggle,
  deletedKpiToggle,
  deletedMilestoneOutcomeToggle,
  deletedRiskToggle,
  setDeletedDeliverableToggle,
  setDeletedKpiToggle,
  setDeletedMilestoneOutcomeToggle,
  setDeletedRiskToggle,
  deletedDeliverables,
  deletedKpiData,
  deletedMilestoneOutcomeData,
  deletedRisksData,
  deletedInterdependencies,
  toggleInterdependenciesDeletedRecords,
  toggleKpiDeletedRecords,
  toggleMilestoneOutcomeDeletedRecords,
  toggleRisksDeletedRecords,
  deletedInterdependenciesToggle,
  setDeletedInterdependenciesToggle,
}) => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleRegenerateCharter = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('type', 'new_business_case');
    newSearchParams.append('charterId', charterId);
    router.push(`/?${newSearchParams.toString()}`);
  }, [charterId, router, searchParams])

  const years = Object.keys(kpiData[0] || {}).filter((key) =>
    key.match(/^\d{4}$/)
  );

  const handleProjectActions = useCallback(
    async (project_id: string, action: "draft" | "published") => {
      try {
        const { data } = await axios.post(`${BASE_URL}/Action/Project`, {
          project_id: project_id,
          option: action,
        });
        toast({
          title: "Project saved successfully",
          variant: "success",
        });
      } catch (error) {
        console.log("Error while performing action", error);
      }
    },
    [toast]
  );

  const handleUpdateCharter = useCallback(async () => {
    const charterRequestBody = {
      project_id: charterId,
      username: "Sidhant",
      json_data: {
        project_questions: [
          {
            sector: projectQuestions?.sector,
            theme_list: projectQuestions?.theme_list,
            description: description,
            deliverables: deliverables,
            project_name: projectQuestions?.project_name,
            risk_category: projectQuestions?.risk_category,
          },
        ],
        project_details: [
          {
            alignment,
            response_kpi: kpiData,
            response_risk: risksData,
            response_theme: retransformData(milestoneOutcomeData),
            project_details: projectDetails,
            interdependencies,
          },
        ],
      },
    };

    try {
      const { data } = await axios.post(
        `${BASE_URL}/Update/Project`,
        charterRequestBody
      );
      setIsEditing(false);
      handleProjectActions(charterId, "draft");
      fetchCharterById();
    } catch (error) {
      console.log("Error while sending charter data", error);
    }
  }, [
    charterId,
    projectQuestions?.sector,
    projectQuestions?.theme_list,
    projectQuestions?.project_name,
    projectQuestions?.risk_category,
    description,
    deliverables,
    alignment,
    kpiData,
    risksData,
    milestoneOutcomeData,
    projectDetails,
    interdependencies,
    setIsEditing,
    handleProjectActions,
    fetchCharterById,
  ]);
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (shouldUpdate) {
      handleUpdateCharter();
      setShouldUpdate(false);
    }
  }, [shouldUpdate, handleUpdateCharter]);

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(milestoneOutcomeData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setMilestoneOutcomeData(items);
  }, [milestoneOutcomeData, setMilestoneOutcomeData]);

  // useEffect(()=>{
  //   setCount(1)
  // },[onDragEnd])

  return (
    <div className="space-y-2 bg-[#FAFBFB] w-[70%]">
      <div className="flex items-center justify-between text-xs px-3 py-1 border-b-[1.5px] border-b-[#5F30E2]">
        <span className="font-semibold text-2xl">Project Charter</span>
        <Image
          src={"/assets/doh.svg"}
          alt="Department of health"
          width={120}
          height={120}
        />
      </div>
      <div className="flex items-center px-2 w-full justify-between" style={{ margin: "6px" }}>
        <span className="text-[20px] font-semibold">{projectName}</span>
        <div className="flex flex-col items-center space-x-4">
          {isEditing ? (
            <div className="flex items-center gap-6">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleUpdateCharter}
              >
                <Image
                  src={"/assets/accept.svg"}
                  alt="Edit"
                  width={18}
                  height={18}
                />
                <span className="font-normal text-darkBlack700 text-xs">
                  Save
                </span>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsEditing(false)}
              >
                <Image
                  src={"/assets/cancel.svg"}
                  alt="Edit"
                  width={18}
                  height={18}
                />
                <span className="font-normal text-darkBlack700 text-xs">
                  Cancel
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleRegenerateCharter}
              >
                <Image
                  src={"/assets/regenerate.svg"}
                  alt="Edit"
                  width={18}
                  height={18}
                />
                <span className="font-normal text-darkBlack700 text-xs">
                  Regenerate Charter
                </span>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  handleProjectActions(charterId, "published");
                }}
              >
                <Image
                  src={"/assets/accept.svg"}
                  alt="Edit"
                  width={18}
                  height={18}
                />
                <span className="font-normal text-darkBlack700 text-xs">
                  Publish
                </span>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                <Image
                  src={"/assets/pencil.svg"}
                  alt="Edit"
                  width={18}
                  height={18}
                />
                <span className="font-normal text-darkBlack700 text-xs">
                  Edit Charter
                </span>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleRegenerateCharter}
              >
                <Image
                  src={"/assets/icons8-home.svg"}
                  alt="Edit"
                  width={18}
                  height={18}
                />
                <span className="font-normal text-darkBlack700 text-xs">
                  Home
                </span>
              </div>

              {!isEditing && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center cursor-pointer gap-2">
                      <Image src={"/assets/share.svg"} alt="share" width={15} height={15} />
                      <span className="font-normal text-darkBlack700 text-xs">
                        Export
                      </span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border" sideOffset={10}>
                    <DropdownMenuItem className="p-2 text-xs cursor-pointer" onClick={() => { handleExportToPpt(charterId, projectName) }}>
                      as PPT
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-2 text-xs italic text-gray-500" disabled>
                      as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-2 text-xs italic text-gray-500" disabled>
                      as Excel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
          <div className="italic text-gray-400 text-xs pt-2">
            Click on Edit Charter to enter your inputs
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 hide-scrollbar max-h-[100vh] h-[388px] overflow-y-auto text-xs w-full gap-3">
        <div className="flex flex-col min-h-[200px] overflow-y-auto space-y-3 bg-[#ffffff] shadow-md backdrop:blur-md rounded-md px-6 py-4">
          <h2 className="text-[13px]  font-semibold">Project Descripiton</h2>
          {isEditing ? (
            <div className="flex items-center gap-5">
              <Textarea
                value={description}
                className="h-6"
                onChange={(e) => {
                  updateDescription(e.target.value);
                }}
              />
              {/* <Input
                value={description}
                className="h-6"
                onChange={(e) => {
                  updateDescription(e.target.value);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              /> */}
            </div>
          ) : (
            <p className="text-darkBlack600 text-xs text-justify font-normal">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col min-h-[200px]  overflow-y-auto space-y-3 bg-[#ffffff] shadow-md backdrop:blur-md rounded-md px-6 py-4">
          <div className="flex items-center justify-between ">
            <span className="text-[13px] font-bold">Alignment</span>
          </div>
          <div className="flex flex-col items-center space-y-2 justify-between">
            <div
              className={cn(
                "flex w-full justify-between",
                isFocused ? "items-baseline" : "items-center"
              )}
            >
              <span className="text-xs font-medium">Strategic Objective:</span>
              <div className="flex flex-col">
                {isEditing ? (
                  <div>
                    <Input
                      value={alignment?.strategic_objective}
                      className="h-6"
                      onChange={(e) => {
                        updateAlignment("strategic_objective", e.target.value);
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                  </div>
                ) : (
                  <span className="text-xs font-normal text-darkBlack600">
                    {alignment?.strategic_objective}
                  </span>
                )}
                {isFocused && (
                  <div className="pt-2">
                    <span>{alignment.strategic_objective}</span>
                  </div>
                )}
              </div>
            </div>
            <div
              className={cn(
                "flex w-full justify-between",
                isFocused ? "items-baseline" : "items-center"
              )}
            >
              <span className="text-xs font-medium">Strategic Program:</span>
              <div className="flex flex-col">
                {isEditing ? (
                  <div>
                    <Input
                      className="h-6"
                      value={alignment?.strategic_program}
                      onChange={(e) => {
                        updateAlignment("strategic_program", e.target.value);
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                  </div>
                ) : (
                  <span className="text-xs font-normal text-darkBlack600">
                    {alignment?.strategic_program}
                  </span>
                )}
                {isFocused && (
                  <div className="pt-2">
                    <span>{alignment.strategic_program}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-[#ffffff] shadow-md backdrop:blur-md space-y-2 rounded-md px-3 py-4">
          <h2 className="font-semibold px-2">Project Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-md p-2 flex flex-col gap-3">
              <div className="flex w-full items-center justify-between">
                <span className="text-darkBlack700 font-medium">Author:</span>
                <span className="text-darkBlack600 font-normal pr-3">
                  {isEditing ? (
                    <div className="flex items-center gap-5">
                      <Input
                        defaultValue={projectDetails?.author}
                        className="h-6"
                        onChange={(e) => {
                          updateProjectDetails("author", e.target.value);
                        }}
                      />
                    </div>
                  ) : (
                    projectDetails?.author
                  )}
                </span>
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="text-darkBlack700 font-medium">Owner:</span>
                <span className="text-darkBlack600 font-normal pr-3">
                  {isEditing ? (
                    <div className="flex items-center gap-5">
                      <Input
                        defaultValue={projectDetails?.owner}
                        className="h-6"
                        onChange={(e) => {
                          updateProjectDetails("owner", e.target.value);
                        }}
                      />
                    </div>
                  ) : (
                    projectDetails?.owner
                  )}
                </span>
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="text-darkBlack700 font-medium">Manager:</span>
                <span className="text-darkBlack600 font-normal pr-3">
                  {isEditing ? (
                    <div className="flex items-center gap-5">
                      <Input
                        defaultValue={projectDetails?.manager}
                        className="h-6"
                        onChange={(e) => {
                          updateProjectDetails("manager", e.target.value);
                        }}
                      />
                    </div>
                  ) : (
                    projectDetails?.manager
                  )}
                </span>
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="text-darkBlack700 font-medium">
                  Target Group:
                </span>
                <span className="text-darkBlack600 font-normal pr-3">
                  {isEditing ? (
                    <div className="flex items-center gap-5">
                      <Input
                        defaultValue={projectDetails?.target_group}
                        className="h-6"
                        onChange={(e) => {
                          updateProjectDetails("target_group", e.target.value);
                        }}
                      />
                    </div>
                  ) : (
                    projectDetails?.target_group
                  )}
                </span>
              </div>
              <div className="flex w-full items-center justify-between gap-3">
                <span className="text-darkBlack700 font-medium">
                  Stakeholder:
                </span>
                <span className="text-darkBlack600 gap-3 rounded-md pr-3 font-normal border-[#F0F0F0]">
                  {isEditing ? (
                    <div className="flex items-center gap-5">
                      <Input
                        value={projectDetails?.stakeholder}
                        className="h-6"
                        onChange={(e) => {
                          updateProjectDetails("stakeholder", e.target.value);
                        }}
                      />
                    </div>
                  ) : projectDetails?.stakeholder ? (
                    projectDetails?.stakeholder
                      .split(",")
                      .map((item: string, idx: number) => (
                        <span key={idx}>{item}</span>
                      ))
                  ) : (
                    projectDetails?.stakeholder
                  )}
                </span>
              </div>
            </div>
            <div className="rounded-md p-2 flex flex-col gap-3">
              <div className="flex w-full items-center justify-between pl-5">
                <span className="text-darkBlack700 font-medium">Status:</span>
                <span className="text-darkBlack600 font-normal">
                  {isEditing ? (
                    <div className="flex items-center gap-5">
                      <Input
                        className="h-6"
                        value={projectDetails?.status}
                        onChange={(e) => {
                          updateProjectDetails("status", e.target.value);
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="flex items-center px-5 bg-gray-200 text-darkBlack600 h-5 rounded-md"
                      style={{
                        backgroundColor: getStatusColor(projectDetails?.status),
                      }}
                    >
                      {projectDetails?.status}
                    </div>
                  )}
                </span>
              </div>
              <div className="flex w-full items-center justify-between pl-5">
                <span className="text-darkBlack700 font-medium">
                  Created On:
                </span>
                <span className="text-darkBlack600 font-normal">
                  {isEditing ? (
                    <div className="flex items-center gap-5">
                      <Input
                        type="date"
                        className="h-6 w-[188px] justify-start"
                        value={projectDetails?.created_on}
                        onChange={(e) => {
                          updateProjectDetails("created_on", e.target.value);
                        }}
                      />
                    </div>
                  ) : (
                    projectDetails?.created_on
                  )}
                </span>
              </div>
              <div className="flex w-full items-center justify-between pl-5">
                <span className="text-darkBlack700 font-medium">
                  Estimated Cost:
                </span>
                <span className="text-darkBlack600 font-normal">
                  {isEditing ? (
                    <div className="flex items-center gap-5">
                      <Input
                        value={projectDetails?.estimated_cost}
                        className="h-6"
                        onChange={(e) => {
                          updateProjectDetails(
                            "estimated_cost",
                            e.target.value
                          );
                        }}
                      />
                    </div>
                  ) : (
                    projectDetails?.estimated_cost
                  )}
                </span>
              </div>
              <div className="flex w-full items-center justify-between pl-5">
                <span className="text-darkBlack700 font-medium">
                  Estimated Timeline:
                </span>
                <span className="text-darkBlack600 font-normal">
                  {isEditing ? (
                    <div className="flex items-center gap-5">
                      <Input
                        value={projectDetails?.estimated_timeline}
                        className="h-6"
                        onChange={(e) => {
                          updateProjectDetails(
                            "estimated_timeline",
                            e.target.value
                          );
                        }}
                      />
                    </div>
                  ) : (
                    projectDetails?.estimated_timeline
                  )}
                </span>
              </div>
              <div className="flex w-full items-center justify-between pl-5 gap-3">
                <span className="text-darkBlack700 font-medium">
                  Estimated Benefits:
                </span>
                <span className="text-darkBlack600 flex gap-3 rounded-md font-normal border-[#F0F0F0]">
                  {isEditing ? (
                    <div className="flex items-center gap-5">
                      <Input
                        value={projectDetails?.estimated_benefit}
                        className="h-6"
                        onChange={(e) => {
                          updateProjectDetails(
                            "estimated_benefit",
                            e.target.value
                          );
                        }}
                      />
                    </div>
                  ) : projectDetails?.estimated_benefit ? (
                    projectDetails?.estimated_benefit.map(
                      (item: string, idx: number) => (
                        <span key={idx}>{item}</span>
                      )
                    )
                  ) : (
                    projectDetails?.estimated_benefit
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#ffffff] min-h-[200px] overflow-y-auto  shadow-md backdrop-brightness-50 rounded-md backdrop-blur-md px-6 py-4 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-darkBlack700 text-[13px] font-bold">
              Key Deliverables
            </span>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Switch
                  onCheckedChange={(e) => {
                    if (e) {
                      toggleDeliverableDeletedRecords();
                      setDeletedDeliverableToggle(e);
                    } else {
                      setDeletedDeliverableToggle(false);
                    }
                  }}
                />
                <Label>Deleted Records</Label>
              </div>
              {isEditing && (
                <Image
                  onClick={() => {
                    addDeliverables();
                  }}
                  className="cursor-pointer"
                  src={"/assets/add.svg"}
                  width={20}
                  height={20}
                  alt="add"
                />
              )}
            </div>
          </div>
          {!deletedDeliverableToggle &&
            deliverables &&
            deliverables?.map((item: DeliverablesData, idx: number) => (
              <div key={idx}>
                {isEditing ? (
                  <div className="flex items-center gap-5">
                    <Input
                      defaultValue={item.name}
                      value={item.name}
                      onChange={(e) => {
                        updateDeliverables(idx, e.target.value);
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                    {item.isDeleted ? (
                      <Image
                        onClick={() => {
                          undoDeliverables(idx);
                        }}
                        className="cursor-pointer"
                        src={"/assets/undo.svg"}
                        width={23}
                        height={23}
                        alt="undo"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Image
                          onClick={() => {
                            deleteDeliverables(idx);
                          }}
                          className="cursor-pointer"
                          src={"/assets/delete.svg"}
                          width={23}
                          height={23}
                          alt="delete"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <span
                    key={idx}
                    className={cn(
                      "text-darkBlack700 text-xs",
                      item.isDeleted &&
                      "text-red-500"
                    )}
                  >
                    {idx + 1}. {item.name}
                  </span>
                )}
                {isFocused && (
                  <div className="flex items-center pt-2 gap-5">
                    <span>{item.name}</span>
                  </div>
                )}
              </div>
            ))}
          {deletedDeliverableToggle &&
            deletedDeliverables?.map((item: DeliverablesData, idx: number) => (
              <div key={idx}>
                {isEditing ? (
                  <div className="flex items-center gap-5">
                    <Input
                      defaultValue={item.name}
                      value={item.name}
                      onChange={(e) => {
                        updateDeliverables(idx, e.target.value);
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                    {item.isDeleted ? (
                      <Image
                        onClick={() => {
                          undoDeliverables(idx);
                        }}
                        className="cursor-pointer"
                        src={"/assets/undo.svg"}
                        width={23}
                        height={23}
                        alt="undo"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Image
                          onClick={() => {
                            deleteDeliverables(idx);
                          }}
                          className="cursor-pointer"
                          src={"/assets/delete.svg"}
                          width={23}
                          height={23}
                          alt="delete"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <span key={idx} className="text-darkBlack700 text-xs">
                    {idx + 1}. {item.name}
                  </span>
                )}
                {isFocused && (
                  <div className="flex items-center pt-2 gap-5">
                    <span>{item.name}</span>
                  </div>
                )}
              </div>
            ))}
        </div>

        <div className="bg-[#ffffff] min-h-[200px] overflow-y-auto hide-scrollbar shadow-md backdrop-brightness-50  py-4 rounded-md backdrop-blur-md  flex flex-col space-y-1">
          <div className="flex items-center justify-between pb-2 px-4 w-full bg-white">
            <span className="text-darkBlack700 font-bold text-[13px]">
              Interdependencies
            </span>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Switch
                  onCheckedChange={(e) => {
                    if (e) {
                      toggleInterdependenciesDeletedRecords();
                      setDeletedInterdependenciesToggle(e);
                    } else {
                      setDeletedInterdependenciesToggle(false);
                    }
                  }}
                />
                <Label>Deleted Records</Label>
              </div>
              {isEditing && (
                <Image
                  onClick={() => {
                    addInterdependencies();
                  }}
                  className="cursor-pointer"
                  src={"/assets/add.svg"}
                  width={20}
                  height={20}
                  alt="add"
                />
              )}
            </div>
          </div>
          <div className={cn(isEditing && "overflow-x-auto")}>
            <Table className={cn(isEditing && "min-w-[600px]")}>
              <TableHeader>
                <TableRow className="font-semibold text-xs border-t-[1.5px] border-b-2  border-[#ACACAC] text-darkBlack700">
                  <TableHead>#</TableHead>
                  <TableHead className={cn(isEditing && "min-w-[250px]")}>
                    External Entity
                  </TableHead>
                  <TableHead className={cn(isEditing && "min-w-[250px]")}>
                    Required support to implement the project
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!deletedInterdependenciesToggle &&
                  interdependencies?.map((item, idx) => (
                    <TableRow
                      key={idx}
                      className={cn(
                        "font-normal text-[11px] text-darkBlack600 leading-none",
                        item.isDeleted &&
                        !isEditing &&
                        "text-red-500"
                      )}
                    >
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell className="font-medium">
                        {isEditing ? (
                          <div className="flex items-center gap-5">
                            <Input
                              defaultValue={item.external_entity}
                              value={item.external_entity}
                              onChange={(e) => {
                                updateInterdependencies(
                                  idx,
                                  "external_entity",
                                  e.target.value
                                );
                              }}
                              onFocus={() => setIsFocused(true)}
                              onBlur={() => setIsFocused(false)}
                            />
                          </div>
                        ) : (
                          item.external_entity
                        )}
                        {isFocused && (
                          <div className="flex items-center pt-3 gap-5">
                            <span>{item.external_entity}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {isEditing ? (
                          <div className="flex items-center gap-5">
                            <Input
                              defaultValue={item.required_support}
                              value={item.required_support}
                              onChange={(e) => {
                                updateInterdependencies(
                                  idx,
                                  "required_support",
                                  e.target.value
                                );
                              }}
                              onFocus={() => setIsFocused(true)}
                              onBlur={() => setIsFocused(false)}
                            />
                          </div>
                        ) : (
                          item.required_support
                        )}
                        {isFocused && (
                          <div className="flex items-center pt-3 gap-5">
                            <span>{item.required_support}</span>
                          </div>
                        )}
                      </TableCell>
                      {isEditing && (
                        <TableCell>
                          {item.isDeleted ? (
                            <Image
                              onClick={() => {
                                undoInterdependencies(idx);
                              }}
                              className="cursor-pointer"
                              src={"/assets/undo.svg"}
                              width={23}
                              height={23}
                              alt="undo"
                            />
                          ) : (
                            <div className="flex items-center gap-2">
                              <Image
                                onClick={() => {
                                  deleteInterdependencies(idx);
                                }}
                                className="cursor-pointer"
                                src={"/assets/delete.svg"}
                                width={23}
                                height={23}
                                alt="delete"
                              />
                            </div>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                {deletedInterdependenciesToggle &&
                  deletedInterdependencies?.map((item, idx) => (
                    <TableRow
                      key={idx}
                      className="font-normal text-[11px] text-darkBlack600 "
                    >
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell className="font-medium">
                        {isEditing ? (
                          <div className="flex items-center gap-5">
                            <Input
                              defaultValue={item.external_entity}
                              value={item.external_entity}
                              onChange={(e) => {
                                updateInterdependencies(
                                  idx,
                                  "external_entity",
                                  e.target.value
                                );
                              }}
                              onFocus={() => setIsFocused(true)}
                              onBlur={() => setIsFocused(false)}
                            />
                          </div>
                        ) : (
                          item.external_entity
                        )}
                        {isFocused && (
                          <div className="flex items-center pt-3 gap-5">
                            <span>{item.external_entity}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {isEditing ? (
                          <div className="flex items-center gap-5">
                            <Input
                              defaultValue={item.required_support}
                              value={item.required_support}
                              onChange={(e) => {
                                updateInterdependencies(
                                  idx,
                                  "required_support",
                                  e.target.value
                                );
                              }}
                              onFocus={() => setIsFocused(true)}
                              onBlur={() => setIsFocused(false)}
                            />
                          </div>
                        ) : (
                          item.required_support
                        )}
                        {isFocused && (
                          <div className="flex items-center pt-3 gap-5">
                            <span>{item.required_support}</span>
                          </div>
                        )}
                      </TableCell>
                      {isEditing && (
                        <TableCell>
                          {item.isDeleted ? (
                            <Image
                              onClick={() => {
                                undoInterdependencies(idx);
                              }}
                              className="cursor-pointer"
                              src={"/assets/undo.svg"}
                              width={23}
                              height={23}
                              alt="undo"
                            />
                          ) : (
                            <div className="flex items-center gap-2">
                              <Image
                                onClick={() => {
                                  deleteInterdependencies(idx);
                                }}
                                className="cursor-pointer"
                                src={"/assets/delete.svg"}
                                width={23}
                                height={23}
                                alt="delete"
                              />
                            </div>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="col-span-2 min-h-[200px] overflow-auto">
          <div className="bg-[#ffffff] shadow-md backdrop-brightness-50 px-6 py-4 rounded-md backdrop-blur-md flex flex-col space-y-1">
            <div className="flex items-center justify-between w-full sticky top-0 bg-white z-50 p-2">
              <span className="text-darkBlack700 font-bold text-[13px]">
                Key Performance Indicator
              </span>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(e) => {
                      if (e) {
                        toggleKpiDeletedRecords();
                        setDeletedKpiToggle(e);
                      } else {
                        setDeletedKpiToggle(false);
                      }
                    }}
                  />
                  <Label>Deleted Records</Label>
                </div>
                {isEditing && (
                  <Image
                    onClick={() => {
                      addKpiData();
                    }}
                    className="cursor-pointer"
                    src={"/assets/add.svg"}
                    width={20}
                    height={20}
                    alt="add"
                  />
                )}
              </div>
            </div>
            <div className={cn(isEditing && "overflow-x-auto")}>
              <Table className={cn(isEditing && "min-w-[600px]")}>
                <TableHeader className={cn("sticky top-[30px] z-40 rounded-xl w-full bg-white font-bold rounded-tl-lg rounded-tr-lg mx-0", isEditing && "top-0")}>
                  <TableRow className="font-semibold text-xs border-t-[1.5px] border-b-2 border-[#ACACAC] text-darkBlack700">
                    <TableHead>#</TableHead>
                    <TableHead className={cn(isEditing && "min-w-[400px]")}>
                      Main KPI
                    </TableHead>
                    {years.map((year, idx) => (
                      <TableHead key={idx}>{year} Target</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!deletedKpiToggle &&
                    kpiData &&
                    kpiData.map((kpi, idx) => (
                      <TableRow
                        key={idx}
                        className={cn(
                          "font-normal text-[11px] text-darkBlack600 leading-none",
                          kpi.isDeleted &&
                          !isEditing &&
                          "text-red-500"
                        )}
                      >
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>
                          {isEditing ? (
                            <div className="flex items-center gap-5">
                              <Input
                                defaultValue={kpi.kpi_name}
                                value={kpi.kpi_name}
                                onChange={(e) => {
                                  updateKpiData(
                                    idx,
                                    "kpi_name",
                                    e.target.value
                                  );
                                }}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                              />
                            </div>
                          ) : (
                            kpi.kpi_name
                          )}
                          {isFocused && (
                            <div className="flex items-center pt-3 gap-5">
                              <span>{kpi.kpi_name}</span>
                            </div>
                          )}
                        </TableCell>
                        {years.map((year, idx) => (
                          <TableCell key={idx}>
                            {isEditing ? (
                              <div className="flex items-center gap-5">
                                <Input
                                  defaultValue={kpi[year]}
                                  value={kpi[year]}
                                  onChange={(e) => {
                                    updateKpiData(idx, year, e.target.value);
                                  }}
                                  onFocus={() => setIsFocused(true)}
                                  onBlur={() => setIsFocused(false)}
                                />
                              </div>
                            ) : (
                              kpi[year]
                            )}
                            {isFocused && (
                              <div className="flex items-center gap-5">
                                <span>{kpi[year]}</span>
                              </div>
                            )}
                          </TableCell>
                        ))}
                        {isEditing && (
                          <TableCell>
                            {kpi.isDeleted ? (
                              <Image
                                onClick={() => {
                                  undoKpiData(idx);
                                }}
                                className="cursor-pointer"
                                src={"/assets/undo.svg"}
                                width={25}
                                height={25}
                                alt="undo"
                              />
                            ) : (
                              <div className="flex items-center gap-2">
                                <Image
                                  onClick={() => {
                                    deleteKpiData(idx);
                                  }}
                                  className="cursor-pointer"
                                  src={"/assets/delete.svg"}
                                  width={40}
                                  height={40}
                                  alt="delete"
                                />
                              </div>
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    ))}

                  {deletedKpiToggle &&
                    deletedKpiData.map((kpi, idx) => (
                      <TableRow
                        key={idx}
                        className="font-normal text-[11px] text-darkBlack600"
                      >
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>
                          {isEditing ? (
                            <div className="flex items-center gap-5">
                              <Input
                                defaultValue={kpi.kpi_name}
                                value={kpi.kpi_name}
                                onChange={(e) => {
                                  updateKpiData(
                                    idx,
                                    "kpi_name",
                                    e.target.value
                                  );
                                }}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                              />
                            </div>
                          ) : (
                            kpi.kpi_name
                          )}
                          {isFocused && (
                            <div className="flex items-center pt-3 gap-5">
                              <span>{kpi.kpi_name}</span>
                            </div>
                          )}
                        </TableCell>
                        {years.map((year, idx) => (
                          <TableCell key={idx}>
                            {isEditing ? (
                              <div className="flex items-center gap-5">
                                <Input
                                  defaultValue={kpi[year]}
                                  value={kpi[year]}
                                  onChange={(e) => {
                                    updateKpiData(idx, year, e.target.value);
                                  }}
                                  onFocus={() => setIsFocused(true)}
                                  onBlur={() => setIsFocused(false)}
                                />
                              </div>
                            ) : (
                              kpi[year]
                            )}
                            {isFocused && (
                              <div className="flex items-center gap-5">
                                <span>{kpi[year]}</span>
                              </div>
                            )}
                          </TableCell>
                        ))}
                        {isEditing && (
                          <TableCell>
                            {kpi.isDeleted ? (
                              <Image
                                onClick={() => {
                                  undoKpiData(idx);
                                }}
                                className="cursor-pointer"
                                src={"/assets/undo.svg"}
                                width={25}
                                height={25}
                                alt="undo"
                              />
                            ) : (
                              <div className="flex items-center gap-2">
                                <Image
                                  onClick={() => {
                                    deleteKpiData(idx);
                                  }}
                                  className="cursor-pointer"
                                  src={"/assets/delete.svg"}
                                  width={40}
                                  height={40}
                                  alt="delete"
                                />
                              </div>
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div className="col-span-2 min-h-[200px] overflow-auto ">
          <div className="bg-[#ffffff] shadow-md backdrop-brightness-50 px-6 py-4 rounded-md backdrop-blur-md  flex flex-col space-y-1">
            <div className="flex items-baseline justify-between w-full sticky top-0 z-50 bg-white p-2">
              <span className="text-darkBlack700 font-bold text-[13px]">
                Risks
              </span>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {risksLevel.map((item, idx) => (
                    <div key={idx} className="px-2">
                      <span
                        className="font-bold text-5xl"
                        style={{ color: `${item.color}`, lineHeight: "0" }}
                      >
                        .
                      </span>
                      <span>{item.risk}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(e) => {
                      if (e) {
                        toggleRisksDeletedRecords();
                        setDeletedRiskToggle(e);
                      } else {
                        setDeletedRiskToggle(false);
                      }
                    }}
                  />
                  <Label>Deleted Records</Label>
                </div>
                {isEditing && (
                  <Image
                    onClick={() => {
                      addRiskData();
                    }}
                    className="cursor-pointer"
                    src={"/assets/add.svg"}
                    width={20}
                    height={20}
                    alt="add"
                  />
                )}
              </div>
            </div>
            <div className={cn(isEditing && "overflow-auto")}>
              <Table className={cn(isEditing && "min-w-[600px] overflow-auto")}>
                <TableHeader className={cn("sticky z-40 rounded-xl w-full bg-white font-bold rounded-tl-lg rounded-tr-lg mx-0", isEditing ? "top-0" : "top-[35px]")}>
                  <TableRow className="font-semibold table-fixed text-xs border-t-[1.5px] border-b-2 border-[#ACACAC] text-darkBlack700">
                    <TableHead>#</TableHead>
                    <TableHead className={cn(isEditing && "min-w-[450px]")}>
                      Risks
                    </TableHead>
                    <TableHead>Impact Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!deletedRiskToggle &&
                    risksData &&
                    risksData.map((item, idx) => {
                      const impactLevel =
                        item["Impact_score"] ||
                        item["Impact_score"] ||
                        "default"; // Provide a default value

                      return (
                        <TableRow
                          key={idx}
                          className={cn(
                            "font-normal text-[11px] text-darkBlack600 leading-[0]",
                            item.isDeleted && "text-red-500"
                          )}
                        >
                          <TableCell className="font-medium">{idx + 1}</TableCell>
                          <TableCell>
                            {isEditing ? (
                              <div className="flex items-center gap-5">
                                <Input
                                  defaultValue={item.Riskname}
                                  value={item.Riskname}
                                  onChange={(e) => {
                                    updateRiskData(
                                      idx,
                                      "Riskname",
                                      e.target.value
                                    );
                                  }}
                                  onFocus={() => setIsFocused(true)}
                                  onBlur={() => setIsFocused(false)}
                                />
                              </div>
                            ) : (
                              item.Riskname
                            )}
                            {isFocused && (
                              <div className="flex items-center pt-3 gap-5">
                                <span>{item.Riskname}</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {isEditing ? (
                              <div className="flex items-center gap-5">
                                <Select
                                  defaultValue={impactLevel}
                                  onValueChange={(
                                    value: "default" | "low" | "medium" | "high"
                                  ) => {
                                    updateRiskData(idx, "Impact_score", value || "");
                                  }}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Impact Level" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="default">Default</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            ) : (
                              <span
                                className="font-bold text-5xl"
                                style={{
                                  color: `${risksLevel.find(
                                    (ele) =>
                                      ele.risk.toLocaleLowerCase() ==
                                      item.Impact_score
                                  )?.color}`,
                                  lineHeight: "0",
                                }}
                              >
                                .
                              </span>
                            )}
                          </TableCell>
                          {isEditing && (
                            <TableCell>
                              {item.isDeleted ? (
                                <Image
                                  onClick={() => {
                                    undoRiskData(idx);
                                  }}
                                  className="cursor-pointer"
                                  src={"/assets/undo.svg"}
                                  width={25}
                                  height={25}
                                  alt="undo"
                                />
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Image
                                    onClick={() => {
                                      deleteRiskData(idx);
                                    }}
                                    className="cursor-pointer"
                                    src={"/assets/delete.svg"}
                                    width={20}
                                    height={20}
                                    alt="delete"
                                  />
                                </div>
                              )}
                            </TableCell>
                          )}
                        </TableRow>
                      )
                    })}
                  {deletedRiskToggle &&
                    deletedRisksData.map((item, idx) => {
                      const impactLevel =
                        item["Impact_score"] ||
                        item["Impact_score"] ||
                        "default"; // Provide a default value
                      return (
                        <TableRow
                          key={idx}
                          className="font-normal text-[11px] text-darkBlack600 "
                        >
                          <TableCell className="font-medium">{idx + 1}</TableCell>
                          <TableCell>
                            {isEditing ? (
                              <div className="flex items-center gap-5">
                                <Input
                                  defaultValue={item.Riskname}
                                  value={item.Riskname}
                                  onChange={(e) => {
                                    updateRiskData(
                                      idx,
                                      "Riskname",
                                      e.target.value
                                    );
                                  }}
                                  onFocus={() => setIsFocused(true)}
                                  onBlur={() => setIsFocused(false)}
                                />
                              </div>
                            ) : (
                              item.Riskname
                            )}
                            {isFocused && (
                              <div className="flex items-center pt-3 gap-5">
                                <span>{item.Riskname}</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {isEditing ? (
                              <div className="flex items-center gap-5">
                                <Select
                                  defaultValue={impactLevel}
                                  onValueChange={(
                                    value: "default" | "low" | "medium" | "high"
                                  ) => {
                                    updateRiskData(idx, "Impact_score", value || "");
                                  }}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Impact Level" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="default">Default</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            ) : (
                              <span
                                className="font-bold text-5xl"
                                style={{
                                  color: `${risksLevel.find(
                                    (ele) =>
                                      ele.risk.toLocaleLowerCase() ==
                                      item.Impact_score
                                  )?.color}`,
                                  lineHeight: "0",
                                }}
                              >
                                .
                              </span>
                            )}
                          </TableCell>
                          {isEditing && (
                            <TableCell>
                              {item.isDeleted ? (
                                <Image
                                  onClick={() => {
                                    undoRiskData(idx);
                                  }}
                                  className="cursor-pointer"
                                  src={"/assets/undo.svg"}
                                  width={25}
                                  height={25}
                                  alt="undo"
                                />
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Image
                                    onClick={() => {
                                      deleteRiskData(idx);
                                    }}
                                    className="cursor-pointer"
                                    src={"/assets/delete.svg"}
                                    width={20}
                                    height={20}
                                    alt="delete"
                                  />
                                </div>
                              )}
                            </TableCell>
                          )}
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>

            </div>
          </div>
        </div>

        <div className="col-span-2 text-xs bg-[#ffffff] hide-scrollbar shadow-md space-y-2 rounded-md h-[300px] overflow-y-auto overflow-x-auto relative">
          <div className="flex w-full items-center justify-between sticky top-0 left-0 bg-white z-50 p-4">
            <h2 className="text-darkBlack700 font-bold text-[13px]">
              Milestones
            </h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Switch
                  onCheckedChange={(e) => {
                    if (e) {
                      toggleMilestoneOutcomeDeletedRecords();
                      setDeletedMilestoneOutcomeToggle(e);
                    } else {
                      setDeletedMilestoneOutcomeToggle(false);
                    }
                  }}
                />
                <Label>Deleted Records</Label>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsChatbotOpen(!isChatbotOpen)}
              >
                <div className="text-darkBlack700 font-bold text-[13px]">
                  Click here for AI Assist
                </div>
                <Image
                  src={"/assets/twinkle.svg"}
                  width={25}
                  height={25}
                  alt="twinkle"
                />
              </div>
            </div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="milestones">
              {(provided) => (
                <Table
                  className="p-4 w-[100vw]"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <TableHeader className="sticky top-[50px] z-40 rounded-xl w-full bg-white border-t border-b-2 border-black font-bold rounded-tl-lg rounded-tr-lg mx-0">
                    <TableRow className="rounded-xl table-fixed text-xs w-full">
                      <TableHead>#</TableHead>
                      <TableHead className="w-[250px]">
                        <div className="flex items-center gap-2">
                          Outcome
                          {isEditing && (
                            <Image
                              onClick={() => {
                                addOutcomeData();
                              }}
                              className="cursor-pointer"
                              src={"/assets/add.svg"}
                              width={15}
                              height={15}
                              alt="add"
                            />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="w-[250px]">Milestone</TableHead>
                      <TableHead>Time Estimate</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Budget Estimate (AED)</TableHead>
                      <TableHead>Responsible Function</TableHead>
                      <TableHead>Status</TableHead>
                      {/* {isEditing && <TableHead>Action</TableHead>} */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!deletedMilestoneOutcomeToggle &&
                      milestoneOutcomeData &&
                      milestoneOutcomeData.map((item, idx) => (
                        <Draggable key={idx} draggableId={`${idx}`} index={idx}>
                          {(provided) => (
                            <TableRow
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={cn(
                                "font-normal text-[11px] text-darkBlack600 rounded-bl-md rounded-br-md shadow-sm",
                                item.outcomeIsDeleted &&
                                "text-red-500"
                              )}
                            >
                              <TableCell className="font-medium align-baseline">
                                {idx + 1}.
                              </TableCell>
                              <TableCell className="align-baseline p-1">
                                {isEditing ? (
                                  <div className="flex items-center">
                                    <Input
                                      defaultValue={item.outcome_name}
                                      value={item.outcome_name}
                                      className="text-sm text-darkBlack600"
                                      onChange={(e) =>
                                        updateMilestoneOutcomeData(
                                          idx,
                                          "outcome_name",
                                          e.target.value
                                        )
                                      }
                                    />
                                    {/* {item.outcomeIsDeleted ? (
                                      <Image
                                        onClick={() => {
                                          undoOutcome(idx);
                                        }}
                                        className="cursor-pointer pl-2"
                                        src={"/assets/undo.svg"}
                                        width={25}
                                        height={25}
                                        alt="delete"
                                      />
                                    ) : (
                                      <Image
                                        onClick={() => {
                                          deleteOutcomeData(idx);
                                        }}
                                        className="cursor-pointer pl-2"
                                        src={"/assets/delete.svg"}
                                        width={25}
                                        height={25}
                                        alt="delete"
                                      />
                                    )} */}
                                  </div>
                                ) : (
                                  item.outcome_name
                                )}
                              </TableCell>

                              <TableCell className="align-baseline p-1">
                                <div className="flex">
                                  {isEditing && (
                                    <Input
                                      defaultValue={
                                        item.milestone_name
                                      }
                                      className="text-sm text-darkBlack600"
                                      value={item.milestone_name}
                                      onChange={(e) =>
                                        updateMilestoneOutcomeData(
                                          idx,
                                          "milestone_name",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  )}
                                  {!isEditing && (
                                    <div className="flex p-2 w-full items-center justify-between">
                                      <span
                                        className={cn(
                                          "pr-2",
                                          item.milestoneIsDeleted &&
                                          "text-red-500"
                                        )}
                                      >
                                        {item.milestone_name}
                                      </span>
                                      <Image
                                        className="cursor-pointer"
                                        src={"/assets/drag.svg"}
                                        width={25}
                                        height={25}
                                        alt="drag"
                                      />
                                    </div>
                                  )}
                                  {/* {isEditing && (
                                    <div className="flex pt-[10px] ml-3 items-start">
                                      <Image
                                        onClick={() => addMilestoneData(idx)}
                                        className="cursor-pointer"
                                        src={"/assets/add.svg"}
                                        width={20}
                                        height={20}
                                        alt="add"
                                      />
                                    </div>
                                  )} */}
                                </div>
                              </TableCell>
                              <TableCell className="align-baseline p-1">
                                {isEditing && (
                                  <Input
                                    defaultValue={item.timeline}
                                    className="text-sm text-darkBlack600"
                                    value={item.timeline}
                                    onChange={(e) =>
                                      updateMilestoneOutcomeData(
                                        idx,
                                        "timeline",
                                        e.target.value,
                                      )
                                    }
                                  />
                                )}
                                {!isEditing && (
                                  <div className="flex">
                                    <span
                                      className={cn(
                                        "pr-2",
                                        item.milestoneIsDeleted &&
                                        "text-red-500"
                                      )}
                                    >
                                      {item.timeline}
                                    </span>
                                    <HoverCard>
                                      <HoverCardTrigger asChild>
                                        <Image
                                          className="cursor-pointer"
                                          src={"/assets/info.svg"}
                                          width={15}
                                          height={15}
                                          alt="info"
                                        />
                                      </HoverCardTrigger>
                                      <HoverCardContent className="w-[600px] px-0 pt-1">
                                        <Table>
                                          <TableHeader className="border-b-2">
                                            <TableRow className="text-xs">
                                              <TableHead className="w-[150px]">
                                                Reference Project
                                              </TableHead>
                                              <TableHead className="w-[100px]">
                                                Timeline
                                              </TableHead>
                                              <TableHead className="w-[150px]">
                                                Outcome
                                              </TableHead>
                                              <TableHead className="w-[150px]">
                                                Milestone
                                              </TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                            <TableRow className="text-xs">
                                              <TableCell>
                                                {
                                                  item.reference_project_name
                                                }
                                              </TableCell>
                                              <TableCell>
                                                {item.timeline}
                                              </TableCell>
                                              <TableCell>
                                                {
                                                  item.reference_project_outcome
                                                }
                                              </TableCell>
                                              <TableCell>
                                                {
                                                  item.reference_project_milestone
                                                }
                                              </TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                        <div className="px-4">
                                          The time estimates are generated
                                          using machine learning
                                          algorithms that assess your past
                                          data.
                                        </div>
                                      </HoverCardContent>
                                    </HoverCard>
                                  </div>
                                )}
                              </TableCell>
                              <TableCell className="align-baseline p-1">
                                {isEditing ? (
                                  <Input
                                    defaultValue={item.start_date}
                                    value={item.start_date}
                                    className="text-sm text-darkBlack600"
                                    onChange={(e) =>
                                      updateMilestoneOutcomeData(
                                        idx,
                                        "start_date",
                                        e.target.value,
                                      )
                                    }
                                  />
                                ) : (
                                  <span
                                    className={cn(
                                      "pr-2",
                                      item.milestoneIsDeleted &&
                                      "text-red-500"
                                    )}
                                  >
                                    {item.start_date}
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="align-baseline p-1">
                                {isEditing ? (
                                  <Input
                                    defaultValue={item.end_date}
                                    value={item.end_date}
                                    className="text-sm text-darkBlack600"
                                    onChange={(e) =>
                                      updateMilestoneOutcomeData(
                                        idx,
                                        "end_date",
                                        e.target.value,
                                      )
                                    }
                                  />
                                ) : (
                                  <span
                                    className={cn(
                                      "pr-2",
                                      item.milestoneIsDeleted &&
                                      "text-red-500"
                                    )}
                                  >
                                    {item.end_date}
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="align-baseline p-1">
                                {isEditing ? (
                                  <Input
                                    defaultValue={item.weight}
                                    value={item.weight}
                                    className="text-sm text-darkBlack600"
                                    onChange={(e) =>
                                      updateMilestoneOutcomeData(
                                        idx,
                                        "weight",
                                        e.target.value,
                                      )
                                    }
                                  />
                                ) : (
                                  <span>{item.weight}</span>
                                )}
                              </TableCell>
                              <TableCell className="align-baseline p-2">
                                {isEditing ? (
                                  <Input
                                    defaultValue={
                                      item.budget_estimates
                                    }
                                    value={item.budget_estimates}
                                    className="text-sm text-darkBlack600"
                                    onChange={(e) =>
                                      updateMilestoneOutcomeData(
                                        idx,
                                        "budget_estimates",
                                        e.target.value,
                                      )
                                    }
                                  />
                                ) : (
                                  <div className="flex">
                                    <span
                                      className={cn(
                                        "pr-2",
                                        item.milestoneIsDeleted &&
                                        "text-red-500"
                                      )}
                                    >
                                      {item.budget_estimates}
                                    </span>
                                    <HoverCard>
                                      <HoverCardTrigger asChild>
                                        <Image
                                          className="cursor-pointer"
                                          src={"/assets/info.svg"}
                                          width={15}
                                          height={15}
                                          alt="info"
                                        />
                                      </HoverCardTrigger>
                                      <HoverCardContent className="w-[400px]">
                                        The budget estimates are generated
                                        using machine learning algorithms
                                        that assess your past data.
                                      </HoverCardContent>
                                    </HoverCard>
                                  </div>
                                )}
                              </TableCell>
                              <TableCell className="align-baseline p-1">
                                {isEditing ? (
                                  <Input
                                    defaultValue={
                                      item.responsible_function
                                    }
                                    value={item.responsible_function}
                                    className="text-sm text-darkBlack600"
                                    onChange={(e) =>
                                      updateMilestoneOutcomeData(
                                        idx,
                                        "responsible_function",
                                        e.target.value,
                                      )
                                    }
                                  />
                                ) : (
                                  <span
                                    className={cn(
                                      "pr-2",
                                      item.milestoneIsDeleted &&
                                      "text-red-500"
                                    )}
                                  >
                                    {item.responsible_function}
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="align-baseline p-1">

                                {isEditing ? (
                                  <div className="flex items-center gap-1">
                                    <Input
                                      defaultValue={item.status}
                                      value={item.status}
                                      className="text-sm text-darkBlack600"
                                      onChange={(e) =>
                                        updateMilestoneOutcomeData(
                                          idx,
                                          "status",
                                          e.target.value,
                                        )
                                      }
                                    />
                                    {item.milestoneIsDeleted ? (
                                      <Image
                                        className="cursor-pointer"
                                        src={"/assets/undo.svg"}
                                        width={25}
                                        height={25}
                                        alt="delete"
                                        onClick={() => {
                                          undoOutcome(idx)
                                        }}
                                      />
                                    ) : (
                                      <Image
                                        onClick={() => {
                                          deleteOutcomeData(idx);
                                        }}
                                        className="cursor-pointer"
                                        src={"/assets/delete.svg"}
                                        width={25}
                                        height={25}
                                        alt="delete"
                                      />
                                    )}
                                  </div>
                                ) : (
                                  <span className="bg-gray-300 px-4 py-1 font-semibold text-xs rounded-full">
                                    {item.status}
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          )}
                        </Draggable>
                      ))}

                    {deletedMilestoneOutcomeToggle &&
                      deletedMilestoneOutcomeData.map((item, idx) => (
                        <Draggable key={idx} draggableId={`${idx}`} index={idx}>
                          {(provided) => (
                            <TableRow
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="font-normal text-[11px] text-darkBlack600 rounded-bl-md rounded-br-md shadow-sm"
                            >
                              <TableCell className="font-medium">
                                {idx + 1}.
                              </TableCell>
                              <TableCell className="align-baseline p-1">
                                {isEditing ? (
                                  <div className="flex items-center">
                                    <Input
                                      defaultValue={item.outcome_name}
                                      value={item.outcome_name}
                                      className="text-sm text-darkBlack600"
                                      onChange={(e) =>
                                        updateMilestoneOutcomeData(
                                          idx,
                                          "outcome_name",
                                          e.target.value
                                        )
                                      }
                                    />
                                    {item.outcomeIsDeleted ? (
                                      <Image
                                        onClick={() => {
                                          undoOutcome(idx);
                                        }}
                                        className="cursor-pointer pl-2"
                                        src={"/assets/undo.svg"}
                                        width={25}
                                        height={25}
                                        alt="delete"
                                      />
                                    ) : (
                                      <Image
                                        onClick={() => {
                                          deleteOutcomeData(idx);
                                        }}
                                        className="cursor-pointer pl-2"
                                        src={"/assets/delete.svg"}
                                        width={25}
                                        height={25}
                                        alt="delete"
                                      />
                                    )}
                                  </div>
                                ) : (
                                  item.outcome_name
                                )}
                              </TableCell>

                              <TableCell className="align-baseline p-1">
                                <div className="flex justify-between">
                                  {isEditing && (
                                    <Input
                                      defaultValue={
                                        item.milestone_name
                                      }
                                      className="text-sm text-darkBlack600"
                                      value={item.milestone_name}
                                      onChange={(e) =>
                                        updateMilestoneOutcomeData(
                                          idx,
                                          "milestone_name",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  )}
                                  {!isEditing && (
                                    <div className="flex p-2 w-full items-center justify-between">
                                      <span className="pr-2">
                                        {item.milestone_name}
                                      </span>
                                      <Image
                                        className="cursor-pointer"
                                        src={"/assets/drag.svg"}
                                        width={25}
                                        height={25}
                                        alt="drag"
                                      />
                                    </div>
                                  )}
                                  {/* {isEditing && (
                                    <div className="flex pt-[10px] items-start">
                                      <Image
                                        onClick={() => addMilestoneData(idx)}
                                        className="cursor-pointer"
                                        src={"/assets/add.svg"}
                                        width={20}
                                        height={20}
                                        alt="add"
                                      />
                                    </div>
                                  )} */}
                                </div>
                              </TableCell>
                              <TableCell className="align-baseline p-1">
                                {isEditing && (
                                  <Input
                                    defaultValue={item.timeline}
                                    className="text-sm text-darkBlack600"
                                    value={item.timeline}
                                    onChange={(e) =>
                                      updateMilestoneOutcomeData(
                                        idx,
                                        "timeline",
                                        e.target.value,
                                      )
                                    }
                                  />
                                )}
                                {!isEditing && (
                                  <div className="flex">
                                    <span
                                      className={cn(
                                        "pr-2",
                                        item.milestoneIsDeleted &&
                                        "text-red-500"
                                      )}
                                    >
                                      {item.timeline}
                                    </span>
                                    <HoverCard>
                                      <HoverCardTrigger asChild>
                                        <Image
                                          className="cursor-pointer"
                                          src={"/assets/info.svg"}
                                          width={15}
                                          height={15}
                                          alt="info"
                                        />
                                      </HoverCardTrigger>
                                      <HoverCardContent className="w-[600px] px-0 pt-1">
                                        <Table>
                                          <TableHeader className="border-b-2">
                                            <TableRow className="text-xs">
                                              <TableHead className="w-[150px]">
                                                Reference Project
                                              </TableHead>
                                              <TableHead className="w-[100px]">
                                                Timeline
                                              </TableHead>
                                              <TableHead className="w-[150px]">
                                                Outcome
                                              </TableHead>
                                              <TableHead className="w-[150px]">
                                                Milestone
                                              </TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                            <TableRow className="text-xs">
                                              <TableCell>
                                                {item.reference_project_name}
                                              </TableCell>
                                              <TableCell>
                                                {item.timeline}
                                              </TableCell>
                                              <TableCell>
                                                {item.reference_project_outcome}
                                              </TableCell>
                                              <TableCell>
                                                {item.reference_project_milestone}
                                              </TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                        <div className="px-4">
                                          The time estimates are generated
                                          using machine learning
                                          algorithms that assess your past
                                          data.
                                        </div>
                                      </HoverCardContent>
                                    </HoverCard>
                                  </div>
                                )}
                              </TableCell>
                              <TableCell className="align-baseline p-1">
                                {isEditing ? (
                                  <Input
                                    defaultValue={item.start_date}
                                    value={item.start_date}
                                    className="text-sm text-darkBlack600"
                                    onChange={(e) =>
                                      updateMilestoneOutcomeData(
                                        idx,
                                        "start_date",
                                        e.target.value,
                                      )
                                    }
                                  />
                                ) : (
                                  <span
                                    className={cn(
                                      "pr-2",
                                      item.milestoneIsDeleted &&
                                      "text-red-500"
                                    )}
                                  >
                                    {item.start_date}
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="align-baseline p-1">
                                {isEditing ? (
                                  <Input
                                    defaultValue={item.end_date}
                                    value={item.end_date}
                                    className="text-sm text-darkBlack600"
                                    onChange={(e) =>
                                      updateMilestoneOutcomeData(
                                        idx,
                                        "end_date",
                                        e.target.value,
                                      )
                                    }
                                  />
                                ) : (
                                  <span
                                    className={cn(
                                      "pr-2",
                                      item.milestoneIsDeleted &&
                                      "text-red-500"
                                    )}
                                  >
                                    {item.end_date}
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="align-baseline p-1">

                                {isEditing ? (
                                  <Input
                                    defaultValue={item.weight}
                                    value={item.weight}
                                    className="text-sm text-darkBlack600"
                                    onChange={(e) =>
                                      updateMilestoneOutcomeData(
                                        idx,
                                        "weight",
                                        e.target.value,
                                      )
                                    }
                                  />
                                ) : (
                                  <span
                                    className={cn(
                                      "pr-2",
                                      item.milestoneIsDeleted &&
                                      "text-red-500"
                                    )}
                                  >
                                    {item.weight}
                                  </span>
                                )}

                              </TableCell>
                              <TableCell className="align-baseline p-2">
                                {isEditing ? (
                                  <Input
                                    defaultValue={
                                      item.budget_estimates
                                    }
                                    value={item.budget_estimates}
                                    className="text-sm text-darkBlack600"
                                    onChange={(e) =>
                                      updateMilestoneOutcomeData(
                                        idx,
                                        "budget_estimates",
                                        e.target.value,
                                      )
                                    }
                                  />
                                ) : (
                                  <div className="flex">
                                    <span className="pr-2">
                                      {item.budget_estimates}
                                    </span>
                                    <HoverCard>
                                      <HoverCardTrigger asChild>
                                        <Image
                                          className="cursor-pointer"
                                          src={"/assets/info.svg"}
                                          width={15}
                                          height={15}
                                          alt="info"
                                        />
                                      </HoverCardTrigger>
                                      <HoverCardContent className="w-[400px]">
                                        The budget estimates are generated
                                        using machine learning algorithms
                                        that assess your past data.
                                      </HoverCardContent>
                                    </HoverCard>
                                  </div>
                                )}
                              </TableCell>
                              <TableCell className="align-baseline p-1">
                                {isEditing ? (
                                  <Input
                                    defaultValue={
                                      item.responsible_function
                                    }
                                    value={item.responsible_function}
                                    className="text-sm text-darkBlack600"
                                    onChange={(e) =>
                                      updateMilestoneOutcomeData(
                                        idx,
                                        "responsible_function",
                                        e.target.value,
                                      )
                                    }
                                  />
                                ) : (
                                  <span>
                                    {item.responsible_function}
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="align-baseline p-1">
                                {isEditing ? (
                                  <div className="flex items-center gap-1">
                                    <Input
                                      defaultValue={item.status}
                                      value={item.status}
                                      className="text-sm text-darkBlack600"
                                      onChange={(e) =>
                                        updateMilestoneOutcomeData(
                                          idx,
                                          "status",
                                          e.target.value,
                                        )
                                      }
                                    />

                                    {/* {item.milestoneIsDeleted ? (
                                      <Image
                                        className="cursor-pointer"
                                        src={"/assets/undo.svg"}
                                        width={25}
                                        height={25}
                                        alt="delete"
                                        onClick={() => {
                                          undoMilestone(
                                            idx,
                                            item.milestoneID,
                                            index
                                          );
                                        }}
                                      />
                                    ) : (
                                      <Image
                                        onClick={() => {
                                          deleteMilestone(
                                            idx,
                                            item.milestoneID,
                                            index
                                          );
                                        }}
                                        className="cursor-pointer"
                                        src={"/assets/delete.svg"}
                                        width={25}
                                        height={25}
                                        alt="delete"
                                      />
                                    )} */}
                                  </div>
                                ) : (
                                  <span className="bg-gray-300 px-4 py-1 font-semibold text-xs rounded-full">
                                    {item.status}
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </TableBody>
                </Table>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};
export default ProjectCharter;
