"use client";
import { ChevronDown, Plus } from "lucide-react";
import Image from "next/image";
import React, { FC, useCallback } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Select } from "./ui/select";

const MenuOptions = () => {
  const router = useRouter();

  const handleNavigation = useCallback(
    (link: string) => {
      router.push(`?type=${link}`);
    },
    [router]
  );

  return (
    <div className="flex items-center w-[28%] justify-end">
      {/* <div className="p-3 bg-gray-100 border border-gray-300 text-center rounded-md cursor-pointer">
        <Image src={"/assets/search.svg"} width={16} height={16} alt="search" />
      </div>
      <div className="p-2 bg-gray-100 border border-gray-300 flex items-center gap-2 text-center rounded-md cursor-pointer">
        <Image
          src={"/assets/filters.svg"}
          width={24}
          height={24}
          alt="filters"
        />
        <span className="text-[#555770] font-semibold">Filters</span>
        <ChevronDown className="text-[#555770] w-5 h-5" />
      </div> */}
      <div className="flex items-center relative">
        <Button
          variant={"primary"}
          className="p-3 flex items-center space-x-3"
          onClick={() => handleNavigation("new_business_case")}
        >
          <Plus className="w-5 h-5 text-white mr-2" />
          New Project Charter
        </Button>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"primary"}
              className="p-3 flex items-center space-x-3"
            >
              <Image
                src={"/assets/add.svg"}
                alt="Add button"
                width={16}
                className="mr-2"
                height={16}
              />
              New
              <Separator orientation="vertical" style={{ height: "inherit" }} />
              <Image
                src={"/assets/arrowDown.svg"}
                alt="Add button"
                width={16}
                height={16}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleNavigation("new_concept")}>
              New Concept
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleNavigation("new_business_case")}
            >
              New Project Charter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  );
};

export default MenuOptions;
