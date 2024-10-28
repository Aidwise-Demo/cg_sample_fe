import React, { FC } from "react";

interface TopheaderProps {
  text: string;
  subtext: string;
  companyName: string;
}
const Topheader: FC<TopheaderProps> = ({ text, subtext, companyName }) => {
  return (
    <div className="flex flex-col w-1/2 font-medium p-2">
      <div className="text-2xl">
        <span className="font-semibold pr-2">
          {text},
        </span>
        <span className="text-gray-500"> {companyName} </span>
      </div>
      <div className="text-sm text-gray-500 py-2"> {subtext} </div>
    </div>
  );
};

export default Topheader;
