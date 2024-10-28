"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import BusinessCase from "./business-case";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BASE_URL,
  generationStatusColorMap,
  statusTypes,
} from "@/lib/constants";
import Image from "next/image";
import axios from "axios";
import { DashboardApiData, ProjectQuestion, Projects } from "@/types";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { handleExportToPpt } from "@/lib/utils";

interface ConceptRegisterProps {
  type: string;
  projectQuestions: ProjectQuestion
}

const ConceptRegister: FC<ConceptRegisterProps> = ({ type, projectQuestions }) => {
  const [data, setData] = useState<Projects[]>();
  const [polling, setPolling] = useState(false);
  const [totalProjects, setTotalProjects] = useState<number>()
  const [projectsInDraft, setProjectsInDraft] = useState<number>()
  const [publishedProjects, setPublishedProjects] = useState<number>()
  const [newlyGeneratedProjects, setNewlyGeneratedProjects] = useState<number>()

  const router = useRouter();
  const { toast } = useToast()

  const handleNavigation = useCallback(
    (id: string) => {
      router.push(`/project-charter/${id}`);
    },
    [router]
  );

  const getDashboardData = async () => {
    try {
      const { data }: { data: DashboardApiData } = await axios.get(
        `${BASE_URL}/get/MainData`
      );
      setData(data.project_details);
      setTotalProjects(data.project_details.length)
      const draftProjects = data.project_details.filter((item) => item.overallStatus === "Draft")
      setProjectsInDraft(draftProjects.length)
      const projectsPublished = data.project_details.filter((item) => item.overallStatus === "Published")
      setPublishedProjects(projectsPublished.length)
      const generatedProjects = data.project_details.filter((item) => item.overallStatus === "NewlyGenerated")
      setNewlyGeneratedProjects(generatedProjects.length)
      const allTrue = data.project_details.every(
        (project) => project.overallStatus === 'Generated'
      );
      if (allTrue) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log("Error while fetching data", err);
    }
  };

  const handleProjectActions = useCallback(async (project_id: string, action: 'draft' | 'published' | 'delete') => {
    try {
      const { data } = await axios.post(`${BASE_URL}/Action/Project`, {
        "project_id": project_id,
        "option": action
      })
      toast({
        title: "Project saved successfully",
        variant: "success",
      });
      getDashboardData()
    } catch (error) {
      console.log("Error while performing action", error)
    }
  }, [toast])

  useEffect(() => {
    getDashboardData();
    const startPolling = () => {

      const interval = setInterval(async () => {
        const allCompleted = await getDashboardData();
        if (allCompleted) {
          clearInterval(interval);
        }
      }, 60000);
      setPolling(true);
      return () => clearInterval(interval);
    };
    if (!polling) {
      startPolling();
    }
  }, [polling]);

  if (type === "new_business_case") {
    return <BusinessCase projectQuestions={projectQuestions} />;
  }

  const giveStatusTypeValue = (type: string) => {
    const obj = statusTypes.find((item) => item.key == type)
    return obj?.value
  }

  return (
    <div className="p-3 space-y-3 m-auto">
      <div className="gap-4 space-x-1 w-full place-content-center">
        <div className="bg-lightWhite400 py-4 space-y-1 rounded-md px-3 col-span-1 ">
          <h1 className="text-darkBlack700 text-sm font-medium">Summary</h1>

          <div className="flex items-center  justify-between p-3 ">
            <div className="flex flex-col gap-3 text-sm">
              <span className="text-[#6F6F8D]">Total</span>
              <span className="text-sdzBlue800 text-2xl font-semibold"> {totalProjects} </span>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <span className="text-[#6F6F8D]">Newly Generated</span>
              <span className="text-sdzBlue800 text-2xl font-semibold"> {newlyGeneratedProjects} </span>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <span className="text-[#6F6F8D]">Draft</span>
              <span className="text-sdzBlue800 text-2xl font-semibold">{projectsInDraft}</span>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <span className="text-[#6F6F8D]">Published</span>
              <span className="text-sdzBlue800 text-2xl font-semibold">{publishedProjects}</span>
            </div>
          </div>
        </div>
        {/* <div className="bg-lightWhite400 py-4 space-y-1 rounded-md px-3 col-span-1 ">
          <h1 className="text-darkBlack700 text-sm font-medium">Impact</h1>

          <div className="flex items-center  justify-between p-3 ">
            <div className="flex flex-col gap-3 text-sm">
              <span className="text-[#6F6F8D]">Estimated Cost</span>
              <span className="text-darkBlack700 text-2xl font-semibold">
                $127.8k
              </span>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <span className="text-[#6F6F8D]"> Estimated Benefits</span>
              <span className="text-darkBlack700 text-2xl font-semibold">
                07
              </span>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <span className="text-[#6F6F8D]">Estimated Time</span>
              <span className="text-darkBlack700 text-2xl font-semibold">
                12 Months
              </span>
            </div>
          </div>
        </div> */}
      </div>
      <Table className="mb-6">
        <TableHeader>
          <TableRow className="bg-lightWhite300 font-medium text-sm">
            <TableHead className="w-[450px]">Project</TableHead>
            <TableHead className="w-[250px]">Created By</TableHead>
            <TableHead className="w-[250px]">Created On</TableHead>
            {/* <TableHead>Stage</TableHead> */}
            <TableHead className="w-[250px]">Status</TableHead>
            <TableHead className="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((project, idx) => (
            <TableRow
              key={idx}
              className="font-normal text-sm text-darkBlack600"
            >
              <TableCell className="text-sdzBlueInteractive w-[150px]">
                {project.overallStatus !== "Generating" ? (
                  <Link
                    className=" hover:bg-blue-200"
                    href={`/project-charter/${project.ProjectId}`}
                  >
                    {project.ProjectName}
                  </Link>
                ) : (
                  project.ProjectName
                )}
              </TableCell>
              <TableCell>{project.CreatedBy}</TableCell>
              <TableCell>
                <div className="flex">
                  {project.CreatedDate.split('T').map((item, idx) => (
                    <div key={idx} className="pr-2">
                      {item}
                    </div>
                  ))}
                </div>
              </TableCell>
              {/* <TableCell>Mohammad Saif</TableCell> */}
              <TableCell className="capitalize">
                <span
                  className=" py-1 flex w-[61%] justify-center px-6 rounded-lg"
                  style={{
                    backgroundColor: `${generationStatusColorMap[project.overallStatus]}`,
                  }}
                >
                  {giveStatusTypeValue(project.overallStatus)}
                  {project.overallStatus === 'Generating' && (
                    <Image
                      src={"/assets/gears.svg"}
                      width={20}
                      height={20}
                      alt="Gears"
                      className="text-center animate-spin"
                    />)}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Image
                      src={"/assets/action.svg"}
                      width={4}
                      height={20}
                      alt="Action button"
                      className="text-center cursor-pointer"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleNavigation(project.ProjectId)}>
                      View/Edit
                    </DropdownMenuItem>
                    {(project.overallStatus === 'Draft' || project.overallStatus === "Published") && (
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <span>Change Status</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => { handleProjectActions(project.ProjectId, "draft") }} disabled={project.overallStatus === 'Draft'}>
                              {project.overallStatus === 'Draft' && (
                                <Check className="w-4 h-4 mr-2" />
                              )}
                              <span>Draft</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => { handleProjectActions(project.ProjectId, "published") }} disabled={project.overallStatus === 'Published'}>
                              {project.overallStatus === 'Published' && (
                                <Check className="w-4 h-4 mr-2" />
                              )}
                              <span>Published</span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    )}

                    <DropdownMenuItem disabled>
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <span>Export</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => { handleExportToPpt(project.ProjectId, project.ProjectName) }}>
                              <span>as PPT</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="italic text-gray-600" disabled>
                              <span>as PDF</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="italic text-gray-600" disabled>
                              <span>as Excel</span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => { handleProjectActions(project.ProjectId, "delete") }}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConceptRegister;
