import React from "react";
import { Wave } from "../Wave";
import { NavbarSection } from "..";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url('/image/LandingMainBack.png')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="h-full w-full relative "
      id="Home-Section"
    >
      <div className="bg-darkBlack/30 inset-0 w-full h-full flex flex-col items-center">
        <NavbarSection />
        <div className="flex flex-row justify-center items-center w-full xl:w-[80%] relative z-0 flex-wrap">
          <div className="w-full xl:w-1/2 flex flex-col items-center gap-2 h-[65%] select-none">
            <p className="text-lightWhite mb-6 font-bold font-chackra tracking-wider text-md 2xl:text-lg text-center">
              Easily find a reliable mobile mechanic near you
            </p>
            <p className="bg-gradient-to-r from-lightWhite to-midGray bg-clip-text text-transparent font-black font-chackra tracking-[3px] text-xl 2xl:text-4xl w-full xl:w-[420px] text-center">
              Mobile Auto repairs
            </p>
            <p className="text-meant font-black font-chackra tracking-[4px] text-xl 2xl:text-6xl">
              {" "}
              The Panda M.A.R.S.
            </p>
            <p className="bg-gradient-to-r from-midGray to-lightWhite bg-clip-text text-transparent font-black font-chackra tracking-[3px] text-2xl 2xl:text-4xl w-[300px] text-center">
              and services !
            </p>

            <div className="h-[1px] flex w-full bg-gradient-to-r from-lightGray to-raisinBlack mb-6 mt-6">
              a
            </div>

            {/* <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                    <div className="w-12 h-12 border-2 border-meant rounded-full flex justify-center items-center relative">
                    <div className="w-11 h-11 bg-meant rounded-full flex justify-center items-center absolute -top-2 -right-4 z-10">
                        <FiArrowUpRight className="text-darkBlack" size={28} />
                    </div>
                    </div>
                </div>
              <p className="text-lightWhite text-[14px] leading-loose tracking-widest">
                Embrace technology integration for a seamless and efficient auto repair experience
                <strong className="text-lightWhite">
                  {" "}
                  Our goal is to be the best customer relationship management tool any mobile mechanic could need
                </strong>
              </p>
            </div> */}
            <div className="flex flex-row gap-5 group">
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLScSmzQFA-dctzv8iXYSACm8-d8Q_5e5VyEcUoNURB8pxlwLTA/viewform"
                className="border-2 border-[#40c48e] text-darkBlack font-jost font-semibold rounded-3xl px-8 py-2 cursor-pointer transition-all ease-in-out bg-meant hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300"
              >
                Sign Up Form
              </Link>
            </div>
          </div>
          <div className="w-full xl:w-1/2">
          </div>
        </div>
        <Wave />
      </div>
    </div>
  );
};
export default Banner;
