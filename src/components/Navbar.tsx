// import { Bell, ChevronDown, Menu } from "lucide-react";
// import React from "react";
// import Image from "next/image";
// const Navbar = () => {
//   return (
//     <div className="bg-bgPrimary p-4 text-white  sticky top-0 z-20">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <Menu className="w-5 h-5" />
//           <Image
//             src={"/assets/Aarogya_Ganit_Logo-removebg-preview.png"}
//             width={150}
//             height={150}
//             alt="Strategy dot zero"
//           />
//         </div>
//         <div className=" flex items-center space-x-6">
//           <Bell className="w-5 h-5 fill-slate-100" />

//           <div className="flex items-center gap-2">
//             Swadeep Singh
//             <ChevronDown className="w-5 h-5" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import { Bell, ChevronDown, Menu } from "lucide-react";
import React from "react";
import Image from "next/image";
const Navbar = () => {
  return (
    <div className="bg-[#121c53] p-4 text-white   sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Menu className="w-5 h-5" />
          <Image
            src={"/assets/Aarogya_Ganit_Logo-removebg-preview.png"}
            width={150}
            height={150}
            alt="Aarogya Ganit"
          />
        </div>
        <div className=" flex items-center space-x-6">
          <Bell className="w-5 h-5 fill-slate-100" />

          <div className="flex items-center gap-2">
            Swadeep Singh
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
