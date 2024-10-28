"use client";
import React, { FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuOptions from "./menu-options";
import ConceptRegister from "./concept-register";
import { ProjectQuestion } from "@/types";

interface HeaderOptionsProps {
  type: string;
  projectQuestions: ProjectQuestion
}
const HeaderOptions: FC<HeaderOptionsProps> = ({ type, projectQuestions }) => {
  return (
    <Tabs defaultValue="concept_register" className="bg-white" style={{margin: "0"}}>
      <div className="flex justify-between w-[98%]">
        <TabsList className="bg-white space-x-9">
          {/* <TabsTrigger
            value="code_snapshot"
            className={
              "data-[state=active]:border-b-2 data-[state=active]:text-[#354CB5] rounded-none border-b-bgPrimary"
            }
          >
            Code Snapshot
          </TabsTrigger> */}
          {!type &&
            <TabsTrigger
              value="concept_register"
              className={
                "data-[state=active]:border-b-4 data-[state=active]:text-[#354CB5] text-lg rounded-none border-b-bgPrimary"
              }
            >
              Project Charter Register
            </TabsTrigger>
          }
        </TabsList>
        {!type && <MenuOptions />}
      </div>
      {/* <TabsContent value="code_snapshot" asChild>
          Make changes to your account here.
        </TabsContent> */}
      <TabsContent value="concept_register" className="m-0 w-full">
        <ConceptRegister type={type} projectQuestions={projectQuestions} />
      </TabsContent>
    </Tabs>
  );
};

export default HeaderOptions;
