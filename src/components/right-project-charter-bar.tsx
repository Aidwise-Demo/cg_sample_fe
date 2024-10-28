/* eslint-disable react/no-unescaped-entities */
"use client"
import { sidebarActivities } from "@/lib/constants";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "./ui/input";

const RightProjectCharterBar = () => {
  return (
    <div className="pl-8 space-y-3 w-[30%]">
      
      <div className="bg-[#1F2C56] rounded-md p-3 py-2">
        <div className="flex items-center justify-between w-full">
          <span className="text-[#FFFFFF] font-medium">AI Recommendations</span>
          <Image src={"/assets/stars.svg"} width={58} height={58} alt="Stars" />
        </div>
        <Image
          className="m-auto"
          src={"/assets/line.svg"}
          width={258}
          height={2}
          alt="lines"
        />
        <div className="flex flex-col gap-3 my-5">
          <span className="text-white">Currently Under Development...</span>
        </div>
      </div>
      
    </div>
  );
};

export default RightProjectCharterBar;
