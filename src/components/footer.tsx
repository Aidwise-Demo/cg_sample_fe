import Image from "next/image";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full fixed bottom-0  p-1 bg-[#f7f7f7] shadow-md">
      <div className="flex items-center space-x-2 text-xs  ">
        <Image
          src={"/assets/Aidwise Logo_WhiteBG.png"}
          width={180}
          height={180}
          alt="Aroghya Ganit"
        />

        <div className="flex items-center space-x-2 text-[10px] text-zinc-400">
          &copy; {currentYear} <strong>Aroghya Ganit</strong>. All Rights
          Reserved.v23.3.0.1
        </div>
      </div>
    </div>
  );
};

export default Footer;
