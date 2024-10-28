/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { FC, useState } from "react";
import BusinessCaseInput from "./business-case-input";
import { STEPS } from "@/lib/constants";
import { useToast } from "./ui/use-toast";
import clsx from "clsx";
import { ProjectQuestion } from "@/types";

interface BusinessCaseProps {
  projectQuestions: ProjectQuestion
}

const BusinessCase: FC<BusinessCaseProps> = ({projectQuestions}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [comingSoonStatus, setComingSoonStatus] = useState(false);

  const [step, setStep] = useState(STEPS.MENU + 1);

  const generatePopup = () => {
    setComingSoonStatus(true)
    setTimeout(()=>{
      setComingSoonStatus(false)
    },3000)
  }

  if (step === STEPS.MENU) {
    return (
      <div className="firstx-w-7xl m-auto space-y-5  w-full mt-10">
        <div className="flex flex-col gap-1 pl-8">
          <div className="flex text-bgPrimary items-center gap-1">
            <Image
              src={"/assets/person.svg"}
              alt="Person"
              height={24}
              width={24}
            />
            <span className="font-semibold text-lg">New Project Charter</span>
          </div>
          <p className="text-md text-gray-500 font-normal">
            A Project Charter is a formal document that authorizes a project. It outlines the project's objectives, scope, stakeholders, and deliverables, and evaluates the benefits, costs, and risks. The charter also designates the project manager and defines their authority.
          </p>
        </div>
        <div className="max-w-[90rem] mb-12 m-auto gap-3 bg-[#F4F6FC] p-6 text-bgPrimary font-medium flex flex-col">
          <h2 className="text-center">Let&apos;s get started!</h2>
          <p className="font-normal text-center">
            To continue, click on any one of the two options below...
          </p>

          <div className="grid grid-cols-2 pt-4 place-items-center gap-5">
            <div
              onClick={() => setStep((prev) => prev + 1)}
              className="flex flex-col bg-[#FFFFFF] border-2 transition-all duration-150 ease-linear cursor-pointer border-transparent space-y-7 py-8 rounded-md items-center justify-center group hover:border-2 hover:border-[#5168CD]"
            >
              <p className="quotes italic font-normal">
                I am not sure how to go about it...
              </p>
              <Image
                src={"/assets/business_case.svg"}
                width={144}
                className="grayscale group-hover:grayscale-0"
                height={144}
                alt="business_case"
              />
              <h3 className="text-[#28293D] text-base">
                Automated Project Charter Generation
              </h3>
              <p className="text-[#555770] text-[14px] font-normal w-[70%] text-center">
                Use SDZ’s intelligent business case development mechanism which
                automates your business case creation.
              </p>
            </div>
            <div onClick={generatePopup} className="flex flex-col bg-[#FFFFFF] border-2 border-transparent transition-all duration-150 ease-linear cursor-pointer  group hover:border-2 hover:border-[#5168CD] rounded-md space-y-7 py-6 items-center justify-center">
              <p className="quotes italic font-normal">
                I know how to go about it and have all the details...
              </p>
              <Image
                src={"/assets/brain.svg"}
                width={144}
                height={144}
                alt="business_case"
                className="grayscale group-hover:grayscale-0"
              />
              <h3 className="text-[#28293D] text-base">
                Business Case Generation Wizard
              </h3>
              <p className="text-[#555770] text-[14px] font-normal w-[70%] text-center">
                SDZ provides a wizard to guide you through the process of
                generating a wizard provided you know the details.
              </p>
            </div>
          </div>

          <div className="items-center grid grid-cols-2 rounded-md py-4 space-x-3">
            <div className="flex items-center">
              <Button
                variant={"ghost"}
                className="border-[1.5px] text-gray-400 hover:border-black px-10 border-[#D8D9E4]"
                onClick={() => router.push("/")}
              >
                Cancel
              </Button>
              <p className="text-md px-4 text-[#86879a]">
                I came here just to check out!
              </p>
            </div>
            <div className={clsx(`px-4 py-2 rounded justify-center flex`, {
        "bg-green-400 text-white": comingSoonStatus,
        "text-[#f6f7ff]": !comingSoonStatus,
      })}>
              Coming Soon...
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (step === STEPS.BUSINESS_CASE_INPUT) {
    return <BusinessCaseInput setStep={setStep} projectQuestions={projectQuestions} />;
  }
};

export default BusinessCase;
