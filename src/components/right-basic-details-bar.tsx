"use client"
import { searchOptions, sidebarActivities } from "@/lib/constants";
import Image from "next/image";
import React, { useState } from "react";
import Select from "react-select";
import { options } from "./business-form";

const RightBasicDetailsBar = () => {
    const [seachInput, setSeachInput] = useState<string>()
    const handleSearch = (value: string, link: string) => {
        if(link !== ''){
            setSeachInput(value)
            window.open(link, '_blank')
        }
    }
    return (
        <div className="bg-[#1F2C56] rounded-xl p-3 py-2">
            <div className="flex items-center justify-between w-full">
                <span className="text-[#FFFFFF] font-medium">Project Charter Library</span>
                <Image src={"/assets/stars.svg"} width={58} height={58} alt="Stars" />
            </div>
            <div className="text-[#FFFFFF] py-3 text-xs">
                Search and Draw input from previous project charters to create a new charter...
            </div>
            <Image
                className="m-auto"
                src={"/assets/line.svg"}
                width={258}
                height={2}
                alt="lines"
            />
            <div className="flex flex-col gap-3 my-5">
                <Select
                    name="sectors"
                    onChange={(value) => handleSearch(value?.value || '', value?.link || '')}
                    options={searchOptions}
                    className="basic-multi-select font-normal"
                    placeholder="Search"
                    required
                    isClearable
                />
                {/* <span className="bg-zinc-400/10 px-3 py-4 rounded-md font-medium text-[#ffffff] text-sm">
                    Coming Soon...
                </span> */}
            </div>
        </div>
    )
}

export default RightBasicDetailsBar;