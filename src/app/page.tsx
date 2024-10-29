"use client"
import Topheader from "@/components/Topheader";
import HeaderOptions from "@/components/header-options";
import { BASE_URL } from "@/lib/constants";
import { CharterApiData, ProjectQuestion } from "@/types";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { FC, useCallback, useEffect, useState } from "react";

interface PageProps {
  searchParams: {
    type: string;
  };
}
const Page: FC<PageProps> = ({ searchParams: { type } }) => {
  let subtext = "The SDZ charter generator at strives to offer smart suggestions through the power of AI to create a project charter with minimal input, creating efficiencies for our PMO teams."
  const searchParams = useSearchParams();
  const charterId = searchParams.get('charterId')
  const [projectQuestions, setProjectQuestions] = useState<ProjectQuestion>()

  const fetchProjectDataById = useCallback(async () => {
    try {
      const { data }: { data: CharterApiData } = await axios.get(
        `${BASE_URL}/Get/Project/${charterId}`
      );
      setProjectQuestions(data.project_questions[0])
    } catch (error) {
      console.log(error)
    }
  }, [charterId])

  useEffect(() => {
    if (charterId) {
      fetchProjectDataById()
    }
  }, [charterId, fetchProjectDataById])
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[90%] p-5 space-y-4 overflow-hiddenr">
        <Topheader text="Aroghya Ganit Project Charter Generator" subtext={subtext} companyName="powered by Aidwise AI" />
        <HeaderOptions type={type} projectQuestions={projectQuestions!} />
      </div>
    </div>
  );
};

export default Page;
function setSector(arg0: { label: string; value: string; }) {
  throw new Error("Function not implemented.");
}

function setInitiative(project_name: string) {
  throw new Error("Function not implemented.");
}

function setDescription(description: string) {
  throw new Error("Function not implemented.");
}

