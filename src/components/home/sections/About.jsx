import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div
      className="flex justify-center py-2 px-4 w-full md:mb-10 mb-6 md:pt-2 pt-8"
      id="About-section"
    >
      <div className="md:w-[80%] md:px-0 px-4 w-full flex flex-col md:flex-row flex-wrap  gap-[50px]">
        <div className="flex flex-1  flex-col items-center justify-start">
          <p className="bg-gradient-to-r from-lightWhite md:to-darkGray to-midGray bg-clip-text text-transparent font-black font-chackra tracking-[3px] text-4xl 2xl:text-6xl w-full text-center md:text-left">
            Let us introduce ourselves{" "}
            <span className="text-meant">About </span>Us
          </p>
        </div>
        <div className="w-full md:w-[30%] text-lightWhite flex flex-col gap-6">
          <p className="text-justify tracking-wider text-sm leading-6">
            {`Our founders have a long family history in the auto industry and a deep empathy for small business owners and barriers to success. We combined those two areas that we are highly passionate about and came to this wonderful conclusion. We care deeply about people and strongly believe that our experiences and expertise can help to empower people.`}
          </p>
        </div>
        <div className="h-[1px] flex w-full bg-gradient-to-r from-darkGray to-raisinBlack mb-4 md:mt-6 mt-3">
          a
        </div>
      </div>
    </div>
  );
};
export default About;
