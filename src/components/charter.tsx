"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import ProjectCharter from "./project-charter";
import {
    Alignment,
    CharterApiData,
    CharterProps,
    DeliverablesData,
    Interdepencies,
    KPI,
    Milestone,
    MilestoneOutcomeData,
    ProjectDetails,
    ProjectQuestion,
    Risks,
    statusColor,
    TransformedMilestoneOutcomeData,
    updateAlignmentKeyArguments,
    updateInterdependenciesKeyArguments,
    updateMilestoneOutcomeDataKeyArguments,
    updateProjectDetailsKeyArguments,
    updateRisksKeyArguments,
} from "@/types";
import axios from "axios";
import { BASE_URL, statusColorMap } from "@/lib/constants";
import { transformData } from "@/lib/utils";

const Charter: FC<CharterProps> = ({
    id,
    setIsChatbotOpen,
    isChatbotOpen,
    newMilestoneOutcomeData,
    isSubmitted,
    setIsSubmitted,
    setNewMilestoneOutcomeData,
}) => {
    const [description, setDescription] = useState<string>();
    const [deliverables, setDeliverables] = useState<DeliverablesData[]>();
    const [deletedDeliverables, setDeletedDeliverables] = useState<DeliverablesData[]>()
    const [projectName, setProjectName] = useState<string>();
    const [risksData, setRisksData] = useState<Risks[]>();
    const [deletedRisksData, setDeletedRisksData] = useState<Risks[]>()
    const [milestoneOutcomeData, setMilestoneOutcomeData] = useState<TransformedMilestoneOutcomeData[]>();
    const [deletedMilestoneOutcomeData, setDeletedMilestoneOutcomeData] = useState<TransformedMilestoneOutcomeData[]>()
    const [kpiData, setKpiData] = useState<KPI[]>();
    const [deletedKpiData, setDeletedKpiData] = useState<KPI[]>()
    const [projectDetails, setProjectDetails] = useState<ProjectDetails>();
    const [interdependencies, setInterdependencies] = useState<Interdepencies[]>();
    const [deletedInterdependencies, setDeletedInterdependencies] = useState<Interdepencies[]>()
    const [alignment, setAlignment] = useState<Alignment>();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState(false);
    const [deletedDeliverableToggle, setDeletedDeliverableToggle] = useState<boolean>(false)
    const [deletedRiskToggle, setDeletedRiskToggle] = useState<boolean>(false)
    const [deletedMilestoneOutcomeToggle, setDeletedMilestoneOutcomeToggle] = useState<boolean>(false)
    const [deletedKpiToggle, setDeletedKpiToggle] = useState<boolean>(false)
    const [deletedInterdependenciesToggle, setDeletedInterdependenciesToggle] = useState<boolean>(false)
    const [projectQuestions, setProjectQuestions] = useState<ProjectQuestion>();
    const fetchCharterById = useCallback(async () => {
        try {
            const { data }: { data: CharterApiData } = await axios.get(
                `${BASE_URL}/Get/Project/${id}`
            );
            setProjectQuestions(data.project_questions[0]);
            setAlignment(data.project_details[0]?.alignment);
            setInterdependencies(
                Array.isArray(data.project_details[0]?.interdependencies)
                    ? data.project_details[0]?.interdependencies
                    : []
            );
            setProjectDetails(data.project_details[0]?.project_details);
            setKpiData(data.project_details[0]?.response_kpi);
            setRisksData(data.project_details[0]?.response_risk);
            const originalMilestoneOutcomeData: MilestoneOutcomeData[] = data.project_details[0]?.response_theme
            setMilestoneOutcomeData(transformData(originalMilestoneOutcomeData));
            setDeliverables(data.project_questions[0]?.deliverables);
            setDescription(data.project_questions[0]?.description);
            setProjectName(data.project_questions[0]?.project_name);
        } catch (error) {
            console.log("Error while fetching data", error);
        }
        
    }, [id]);

    const getStatusColor = (status: statusColor) => {
        switch (status) {
            case "Draft":
                return statusColorMap["draft"];
            case "On Hold":
                return statusColorMap["onhold"];
            case "Submitted":
                return statusColorMap["submitted"];

            default:
                return "pink";
        }
    };

    useEffect(() => {
        fetchCharterById();
    }, [fetchCharterById]);

    //Editing Functions

    const updateDescription = useCallback((description: string) => {
        setDescription(description);
    }, []);

    const updateAlignment = useCallback(
        (key: updateAlignmentKeyArguments, content: string) => {
            setAlignment((prev) => {
                if (!prev) {
                    return prev;
                }
                const newData = {
                    ...prev,
                    [key]: content,
                };
                return newData;
            });
        },
        []
    );

    const updateProjectDetails = useCallback(
        (key: updateProjectDetailsKeyArguments, content: string) => {
            setProjectDetails((prev) => {
                if (!prev) {
                    return prev;
                }
                const newData = {
                    ...prev,
                    [key]: content,
                };
                return newData;
            });
        },
        []
    );

    const updateDeliverables = useCallback((index: number, content: string) => {
        setDeliverables((prev) => {
            if (!prev) {
                return prev;
            }
            const oldData = [...prev];
            const updatedData = oldData[index];
            const newData = {
                ...updatedData,
                ["name"]: content,
            };
            oldData[index] = newData;
            return oldData;
        });
    }, []);

    const updateKpiData = useCallback(
        (index: number, key: string, content: string) => {
            setKpiData((prev) => {
                if (!prev) {
                    return prev;
                }
                const oldData = [...prev];
                const updatedData = oldData[index];
                const newData = {
                    ...updatedData,
                    [key]: content,
                };
                oldData[index] = newData;
                return oldData;
            });
        },
        []
    );

    const updateRisksData = useCallback(
        (index: number, key: updateRisksKeyArguments, content: string) => {
            setRisksData((prev) => {
                if (!prev) {
                    return prev;
                }
                const oldData = [...prev];
                const updatedData = oldData[index];
                const newData = {
                    ...updatedData,
                    [key]: content,
                };
                oldData[index] = newData;
                return oldData;
            });
        },
        []
    );

    const updateInterdependencies = useCallback(
        (
            index: number,
            key: updateInterdependenciesKeyArguments,
            content: string
        ) => {
            setInterdependencies((prev) => {
                if (!prev) {
                    return prev;
                }
                const oldData = [...prev];
                const updatedData = oldData[index];
                const newData = {
                    ...updatedData,
                    [key]: content,
                };
                oldData[index] = newData;
                return oldData;
            });
        },
        []
    );

    const updateMilestoneOutcomeData = useCallback(
        (
            index: number,
            key: updateMilestoneOutcomeDataKeyArguments,
            content: string,
        ) => {
            setMilestoneOutcomeData((prev) => {
                if (!prev) {
                    return prev;
                }
                const oldData = [...prev];
                const updatedData = oldData[index]
                const newOutcome = {
                    ...updatedData,
                    [key]: content,
                };
                oldData[index] = newOutcome;
                return oldData;
            });
        },
        []
    );

    // Add and Delete Functions
    const addDeliverables = useCallback(() => {
        setDeliverables((prev) => {
            if (!prev) {
                return prev;
            }
            const oldData = [...prev];
            const newObj: DeliverablesData = {
                id: 1,
                isDeleted: false,
                name: "",
            };
            const newData = oldData.map((item) => {
                return { ...item, id: item.id + 1 };
            });
            newData?.splice(0, 0, newObj);
            return newData;
        });
    }, []);

    const deleteDeliverables = useCallback((index: number) => {
        setDeliverables((prev) => {
            if (!prev) {
                return prev;
            }
            let oldData = [...prev];
            const updatedDeliverable = oldData[index];
            oldData.splice(index, 1);
            updatedDeliverable.isDeleted = true;
            let deletedDeliverables = [];
            deletedDeliverables.push(updatedDeliverable);

            return [...oldData, ...deletedDeliverables];
        });
    }, []);

    const undoDeliverables = useCallback((index: number) => {
        setDeliverables((prev) => {
            if (!prev) {
                return prev;
            }
            let oldData = [...prev];
            const updatedDeliverable = oldData[index];
            oldData.splice(index, 1);
            updatedDeliverable.isDeleted = false;
            let recoveredDeliverables = [];
            recoveredDeliverables.push(updatedDeliverable);
            return [...recoveredDeliverables, ...oldData];
        });
    }, []);

    const addRiskData = useCallback(() => {
        setRisksData((prev) => {
            if (!prev) {
                return prev;
            }
            const oldData = [...prev];
            const newObj: Risks = {
                id: 1,
                Riskname: "",
                Impact_score: "default",
                isDeleted: false,
            };
            const newData = oldData.map((item) => {
                return { ...item, id: item.id + 1 };
            });
            newData?.splice(0, 0, newObj);
            return newData;
        });
    }, []);

    const deleteRiskData = useCallback((index: number) => {
        setRisksData((prev) => {
            if (!prev) {
                return prev;
            }
            const oldData = [...prev];
            const updatedRisk = oldData[index];
            oldData.splice(index, 1);
            updatedRisk.isDeleted = true;
            let deletedRisks = [];
            deletedRisks.push(updatedRisk);
            return [...oldData, ...deletedRisks];
        });
    }, []);

    const undoRiskData = useCallback((index: number) => {
        setRisksData((prev) => {
            if (!prev) {
                return prev;
            }
            const oldData = [...prev];
            const updatedRisk = oldData[index];
            oldData.splice(index, 1);
            updatedRisk.isDeleted = false;
            let recoveredRisks = [];
            recoveredRisks.push(updatedRisk);
            return [...recoveredRisks, ...oldData];
        });
    }, []);

    const addInterdependencies = useCallback(() => {
        setInterdependencies((prev) => {
            if (!prev) {
                return prev;
            }
            const oldData = [...prev];
            const newObj: Interdepencies = {
                id: 1,
                external_entity: "",
                required_support: "",
                isDeleted: false,
            };
            const newData = oldData.map((item) => {
                return { ...item, id: item.id + 1 };
            });
            newData?.splice(0, 0, newObj);
            return newData;
        });
    }, []);

    const deleteInterdependencies = useCallback((index: number) => {
        setInterdependencies((prev) => {
            if (!prev) {
                return prev;
            }
            const oldData = [...prev];
            const updatedInterdependency = oldData[index];
            oldData.splice(index, 1);
            updatedInterdependency.isDeleted = true;
            let deletedInterdependencies = [];
            deletedInterdependencies.push(updatedInterdependency);

            return [...oldData, ...deletedInterdependencies];
        });
    }, []);

    const undoInterdependencies = useCallback((index: number) => {
        setInterdependencies((prev) => {
            if (!prev) {
                return prev;
            }
            let oldData = [...prev];
            const updatedInterdependency = oldData[index];
            oldData.splice(index, 1);
            updatedInterdependency.isDeleted = false;
            let recoveredInterdependencies = [];
            recoveredInterdependencies.push(updatedInterdependency);
            return [...recoveredInterdependencies, ...oldData];
        });
    }, []);

    const addKpiData = useCallback(() => {
        setKpiData((prev) => {
            if (!prev) {
                return prev;
            }
            const oldData = [...prev];
            const years = Object.keys(oldData[0]).filter(
                (item) => !["kpiid", "kpi_name", "isDeleted"].includes(item)
            );
            const newObj: KPI = {
                kpiid: 1,
                kpi_name: "",
                isDeleted: false,
            };
            years.forEach((year) => {
                newObj[year] = "";
            });
            const newData = oldData.map((item) => {
                return { ...item, kpiid: item.kpiid + 1 };
            });
            newData.splice(0, 0, newObj);
            return newData;
        });
    }, []);

    const deleteKpiData = useCallback((index: number) => {
        setKpiData((prev) => {
            if (!prev) {
                return prev;
            }
            const oldData = [...prev];
            const updatedKpi = oldData[index];
            oldData.splice(index, 1);
            updatedKpi.isDeleted = true;
            let deletedKpi = [];
            deletedKpi.push(updatedKpi);
            return [...oldData, ...deletedKpi];
        });
    }, []);

    const undoKpiData = useCallback((index: number) => {
        setKpiData((prev) => {
            if (!prev) {
                return prev;
            }
            const oldData = [...prev];
            const updatedKpi = oldData[index];
            oldData.splice(index, 1);
            updatedKpi.isDeleted = false;
            let recoveredKpi = [];
            recoveredKpi.push(updatedKpi);
            return [...recoveredKpi, ...oldData];
        });
    }, []);

    const addOutcomeData = useCallback(() => {
        setMilestoneOutcomeData((prev) => {
            if (!prev) {
                return prev;
            }
            const oldData = [...prev];
            const newObj: TransformedMilestoneOutcomeData = {
                outcomeID: 1,
                outcome_name: "",
                benefit: '',
                end_date: '',
                milestone_name: '',
                milestoneID: 1,
                milestoneIsAccepted: false,
                milestoneIsDeleted: false,
                outcomeIsAccepted: false,
                outcomeIsDeleted: false,
                reference_duration: '',
                reference_project_milestone: '',
                reference_project_outcome: '',
                start_date: '',
                status: '',
                timeline: '',
                budget_estimates: '',
                reference_project_name: '',
                responsible_function: '',
                weight: ''
            };
            const newData = oldData.map((item) => {
                return { ...item, outcomeID: item.outcomeID + 1 };
            });
            newData.splice(0, 0, newObj);
            return newData;
        });
    }, []);

    // const addMilestoneData = useCallback((outcomeIndex: number) => {
    //     console.log("called");
    //     setMilestoneOutcomeData((prev) => {
    //         if (!prev) {
    //             return prev;
    //         }

    //         const newObj: Milestone = {
    //             benefit: "",
    //             end_date: "",
    //             isAccepted: false,
    //             isDeleted: false,
    //             milestone_name: "",
    //             milestoneID: 1,
    //             reference_duration: "",
    //             reference_project_milestone: "",
    //             reference_project_outcome: "",
    //             start_date: "",
    //             status: "Not Started",
    //             timeline: "",
    //             budget_estimates: "",
    //             reference_project_name: "",
    //             responsible_function: "",
    //             weight: "",
    //         };

    //         return prev.map((outcome, index) => {
    //             if (index === outcomeIndex) {
    //                 const maxMilestoneID = Math.max(
    //                     0,
    //                     ...outcome.milestones.map((m) => m.milestoneID)
    //                 );
    //                 newObj.milestoneID = maxMilestoneID + 1;

    //                 return {
    //                     ...outcome,
    //                     milestones: [newObj, ...outcome.milestones],
    //                 };
    //             }
    //             return outcome;
    //         });
    //     });
    // }, []);

    const deleteOutcomeData = useCallback((outcomeIndex: number) => {
        setMilestoneOutcomeData((prev) => {
            if (!prev) {
                return prev;
            }
            const oldData = [...prev];
            const updatedOutcome = oldData[outcomeIndex];
            oldData.splice(outcomeIndex, 1);
            updatedOutcome.outcomeIsDeleted = true;
            let deletedOutcomes = [];
            deletedOutcomes.push(updatedOutcome);
            return [...oldData, ...deletedOutcomes];
        });
    }, []);

    // const deleteMilestone = useCallback(
    //     (outcomeIndex: number, milestoneID: number, milestonIdx: number) => {
    //         setMilestoneOutcomeData((prev) => {
    //             if (!prev) {
    //                 return prev;
    //             }

    //             return prev.map((outcome, index) => {
    //                 if (index === outcomeIndex) {
    //                     const updatedMilestones = outcome.milestones.filter(
    //                         (milestone) => milestone.milestoneID !== milestoneID
    //                     );

    //                     const toBeDeletedMilestone =
    //                         milestoneOutcomeData &&
    //                         milestoneOutcomeData[outcomeIndex].milestones[milestonIdx];
    //                     toBeDeletedMilestone!.isDeleted = true;

    //                     // Combine updated milestones with the deleted milestone
    //                     const combinedMilestones = [
    //                         ...updatedMilestones,
    //                         toBeDeletedMilestone!,
    //                     ];

    //                     // Update the IDs based on the new order
    //                     const finalMilestones = combinedMilestones.map(
    //                         (milestone, idx) => ({
    //                             ...milestone,
    //                             milestoneID: idx + 1,
    //                         })
    //                     );

    //                     return {
    //                         ...outcome,
    //                         milestones: finalMilestones,
    //                     };
    //                 }
    //                 return outcome;
    //             });
    //         });
    //     },
    //     [milestoneOutcomeData]
    // );

    // const undoMilestone = useCallback(
    //     (outcomeIndex: number, milestoneID: number, milestonIdx: number) => {
    //         setMilestoneOutcomeData((prev) => {
    //             if (!prev) {
    //                 return;
    //             }
    //             return prev.map((outcome, index) => {
    //                 if (index === outcomeIndex) {
    //                     const updatedMilestones = outcome.milestones.filter(
    //                         (milestone) => milestone.milestoneID !== milestoneID
    //                     );

    //                     const milestoneToBeRecovered =
    //                         milestoneOutcomeData &&
    //                         milestoneOutcomeData[outcomeIndex].milestones[milestonIdx];
    //                     milestoneToBeRecovered!.isDeleted = false;

    //                     // Combine updated milestones with the deleted milestone
    //                     const combinedMilestones = [
    //                         milestoneToBeRecovered!,
    //                         ...updatedMilestones,
    //                     ];

    //                     // Update the IDs based on the new order
    //                     const finalMilestones = combinedMilestones.map(
    //                         (milestone, idx) => ({
    //                             ...milestone,
    //                             milestoneID: idx + 1,
    //                         })
    //                     );

    //                     return {
    //                         ...outcome,
    //                         milestones: finalMilestones,
    //                     };
    //                 }
    //                 return outcome;
    //             });
    //         });
    //     },
    //     [milestoneOutcomeData]
    // );

    const undoOutcome = useCallback((outcomeIndex: number) => {
        setMilestoneOutcomeData((prev) => {
            if (!prev) {
                return prev
            }
            const oldData = [...prev];
            const updatedOutcome = oldData[outcomeIndex];
            oldData.splice(outcomeIndex, 1);
            updatedOutcome.outcomeIsDeleted = false;
            let recoveredOutcome = [];
            recoveredOutcome.push(updatedOutcome);
            return [...recoveredOutcome, ...oldData];
        });
    }, [])

    const toggleDeliverableDeletedRecords = useCallback(() => {
        const filteredData = deliverables?.filter((item) => item.isDeleted)
        setDeletedDeliverables(filteredData)
    }, [deliverables])

    const toggleInterdependenciesDeletedRecords = useCallback(() => {
        const filteredData = interdependencies?.filter((item) => item.isDeleted)
        setDeletedInterdependencies(filteredData)
    }, [interdependencies])

    const toggleRisksDeletedRecords = useCallback(() => {
        const filteredData = risksData?.filter(item => item.isDeleted)
        setDeletedRisksData(filteredData)
    }, [risksData])

    const toggleKpiDeletedRecords = useCallback(() => {
        const filteredData = kpiData?.filter(item => item.isDeleted)
        setDeletedKpiData(filteredData)
    }, [kpiData])

    const toggleMilestoneOutcomeDeletedRecords = useCallback(() => {
        const filteredData = milestoneOutcomeData?.filter(item => item.outcomeIsDeleted)
        setDeletedMilestoneOutcomeData(filteredData)
    }, [milestoneOutcomeData])

    useEffect(() => {
        if (newMilestoneOutcomeData && isSubmitted) {
            const transformedData = transformData(newMilestoneOutcomeData)
            setMilestoneOutcomeData((prev) => {
                if (!prev) {
                    return prev;
                }
                return [...transformedData, ...prev]
            });
            setNewMilestoneOutcomeData([]);
            setIsSubmitted(false)
        }
    }, [isSubmitted, newMilestoneOutcomeData, setIsSubmitted, setNewMilestoneOutcomeData]);
    return (
        <ProjectCharter
            description={description || ""}
            deliverables={deliverables || []}
            projectName={projectName || ""}
            risksData={risksData || []}
            milestoneOutcomeData={milestoneOutcomeData || []}
            kpiData={kpiData || []}
            projectDetails={projectDetails!}
            interdependencies={interdependencies || []}
            alignment={alignment!}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            setMilestoneOutcomeData={setMilestoneOutcomeData}
            getStatusColor={getStatusColor}
            updateAlignment={updateAlignment}
            updateDescription={updateDescription}
            updateDeliverables={updateDeliverables}
            updateInterdependencies={updateInterdependencies}
            updateKpiData={updateKpiData}
            updateProjectDetails={updateProjectDetails}
            updateRiskData={updateRisksData}
            updateMilestoneOutcomeData={updateMilestoneOutcomeData}
            projectQuestions={projectQuestions!}
            charterId={id}
            fetchCharterById={fetchCharterById}
            addDeliverables={addDeliverables}
            deleteDeliverables={deleteDeliverables}
            addRiskData={addRiskData}
            deleteRiskData={deleteRiskData}
            addInterdependencies={addInterdependencies}
            deleteInterdependencies={deleteInterdependencies}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            setIsChatbotOpen={setIsChatbotOpen}
            isChatbotOpen={isChatbotOpen}
            undoDeliverables={undoDeliverables}
            undoInterdependencies={undoInterdependencies}
            undoRiskData={undoRiskData}
            addKpiData={addKpiData}
            deleteKpiData={deleteKpiData}
            undoKpiData={undoKpiData}
            addOutcomeData={addOutcomeData}
            deleteOutcomeData={deleteOutcomeData}
            // addMilestoneData={addMilestoneData}
            // deleteMilestone={deleteMilestone}
            // undoMilestone={undoMilestone}
            undoOutcome={undoOutcome}
            toggleDeliverableDeletedRecords={toggleDeliverableDeletedRecords}
            deletedDeliverableToggle={deletedDeliverableToggle}
            setDeletedDeliverableToggle={setDeletedDeliverableToggle}
            deletedKpiToggle={deletedKpiToggle}
            deletedMilestoneOutcomeToggle={deletedMilestoneOutcomeToggle}
            deletedRiskToggle={deletedRiskToggle}
            setDeletedKpiToggle={setDeletedKpiToggle}
            setDeletedMilestoneOutcomeToggle={setDeletedMilestoneOutcomeToggle}
            setDeletedRiskToggle={setDeletedRiskToggle}
            deletedDeliverables={deletedDeliverables || []}
            deletedKpiData={deletedKpiData || []}
            deletedMilestoneOutcomeData={deletedMilestoneOutcomeData || []}
            deletedRisksData={deletedRisksData || []}
            deletedInterdependencies={deletedInterdependencies || []}
            toggleInterdependenciesDeletedRecords={toggleInterdependenciesDeletedRecords}
            toggleKpiDeletedRecords={toggleKpiDeletedRecords}
            toggleMilestoneOutcomeDeletedRecords={toggleMilestoneOutcomeDeletedRecords}
            toggleRisksDeletedRecords={toggleRisksDeletedRecords}
            deletedInterdependenciesToggle={deletedInterdependenciesToggle}
            setDeletedInterdependenciesToggle={setDeletedInterdependenciesToggle}

        />
    );
};

export default Charter;
