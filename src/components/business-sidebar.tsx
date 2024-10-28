"use client";

import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface BusinessSidebarProps {
  activeBar: "basic_details";
  setActiveBar: (bar: "basic_details") => void;
}

const BusinessSideBar: FC<BusinessSidebarProps> = ({
  activeBar,
  setActiveBar,
}) => {
  return (
    <div className="sticky flex flex-col w-[238px] h-[540px] px-[23px] py-[20px] left-0  backdrop-blur-sm    bg-[#FFFFFF] shadow-md rounded-md shadow-[#0000000F] p-5">
      <div className="flex flex-col space-y-3">
        <h2 className="text-base text-[#28293D]">New Business Case</h2>
        <div className="flex flex-col space-y-2 text-sm text-[#555770] font-medium p-3">
          <span
            className={cn(
              "px-5 py-2 rounded-md w-full transition-all cursor-pointer duration-200 ease-linear",
              activeBar === "basic_details" &&
              "bg-indigo-200 text-[#25357E]"
            )}
            onClick={() => setActiveBar("basic_details")}
          >
            Basic Details
          </span>
        </div>
      </div>
    </div>
  );
};

export default BusinessSideBar;
