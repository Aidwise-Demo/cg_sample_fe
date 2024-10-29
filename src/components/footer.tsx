import Image from "next/image";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full fixed bottom-0  p-1 bg-[#f7f7f7] shadow-md">
      <div className="flex items-center space-x-2 text-xs  ">
        <Image
          src={"/assets/Aarogya_Ganit_Logo-removebg-preview.png"}
          width={180}
          height={180}
          alt="Stratrgy dot zero"
        />

        <div className="flex items-center space-x-2 text-[10px] text-zinc-400">
          &copy; {currentYear} <strong>Strategy zero</strong>. All Rights
          Reserved.v23.3.0.1
        </div>
      </div>
    </div>
  );
};

export default Footer;
