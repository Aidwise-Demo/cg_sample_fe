import Image from "next/image";
import React from "react";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = [
  "Strategic Alignment Defined",
  "Milestones Outlined",
  "Creating Deliverables",
];

const Loading = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );

    return () => {
      clearTimeout(intervalId);
    };
  }, []);
  return (
    <div className="fixed backdrop-blur-md top-20 left-0 z-50   bg-[#FFFFFFC7] w-full h-full ">
      <div className="text-center font-normal text-darkBlack700 text-3xl mt-16">
        .DotZ is <span className="font-semibold">generating</span> your project
        charter
      </div>
      <div className="max-w-5xl relative flex justify-between  m-auto mt-24 px-[89px]">
    
        <div>
          <TextTransition
            springConfig={presets.wobbly}
            className="text-xl text-darkBlack700 font-normal"
          >
            {TEXTS[index % TEXTS.length]}
          </TextTransition>
        </div>
        <div>
          <Image src={"/assets/tick.svg"} width={20} height={20} alt="Tick" />
        </div>
      
        <Image src={"/assets/load_img.svg"} className="absolute -right-64 top-3" width={480} height={330} alt="Tick" />

      </div>
    </div>
  );
};

export default Loading;
