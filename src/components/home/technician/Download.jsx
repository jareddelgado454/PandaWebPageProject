"use client";

import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import { FaAppStore, FaGooglePlay } from "react-icons/fa6";
import { RiStarFill, RiDownloadFill } from "react-icons/ri";
import logo from "../../../../public/panda.webp";
import app from "../../../../public/image/app.png";
import { useDisclosure } from "@nextui-org/react";
import DownloadApp from "@/components/modalLanding/DownloadApp";

const DownloadTechnician = () => {
    const {
        isOpen: isDownloadAppModalOpen,
        onOpen: onDownloadAppModalOpen,
        onOpenChange: onDownloadAppModalOpenChange,
    } = useDisclosure();
    const [modeApp, setModeApp] = useState("technician");

    const handleDownloadClick = (mode) => {
        setModeApp(mode);
        onDownloadAppModalOpen();
      }
    
  return (
    <div className="w-full flex flex-col items-center  relative mb-20 ">
      <div className="flex flex-col md:w-[80%] w-full md:px-0 px-4">
        <div className="h-[1px] flex w-full bg-gradient-to-r from-darkGray to-raisinBlack mb-14 md:mt-6 mt-2 text-transparent select-none">
          a
        </div>
        <h3 className="w-full px-2 text-gray-200 md:text-[50px] text-[30px] font-bold font-chackra  mb-5">
          We are constantly{" "}
          <span className="font-extrabold text-white">Improving</span> to give
          you the best experience
        </h3>
        <div
          className="bg-zinc-900 hover:bg-zinc-900 rounded-3xl w-full flex lg:flex-row flex-col shadow-xl "
          style={{ transition: "background-color 1.2s ease" }}
        >
          <div className="lg:w-[50%] w-full flex flex-col p-8">
            <div className="flex gap-x-3 mb-5">
              <div className="rounded-3xl w-[80px] h-[80px] overflow-hidden bg-white">
                <Image
                  alt="logo"
                  src={logo}
                  placeholder="blur"
                  quality={100}
                  sizes="100vw"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col ">
                <h4 className="text-white font-chackra h-[40px] text-[20px] font-semibold">
                  The Panda Technician 
                </h4>
                <div className="flex gap-x-1">
                  <RiStarFill className="text-yellow-400 text-[30px]" />
                  <RiStarFill className="text-yellow-400 text-[30px]" />
                  <RiStarFill className="text-yellow-400 text-[30px]" />
                  <RiStarFill className="text-yellow-400 text-[30px]" />
                  <RiStarFill className="text-yellow-400 text-[30px]" />
                </div>
              </div>
            </div>
            <h2 className="text-[50px] text-white font-bold mb-2 ">
              Mobile App
            </h2>
            <p className="text-[20px] text-gray-200 mb-8">
              Freedom of choice and price – an app to find the best option to
              repair your car.
            </p>
            <div className="flex lg:flex-row flex-col gap-2">
              <button
                onClick={() => handleDownloadClick("technician")}
                className="flex items-center justify-center lg:w-1/2 w-full py-3 rounded-2xl bg-meant hover:bg-emerald-400 transition-colors text-[20px] font-bold font-chackra cursor-pointer"
              >
                <RiDownloadFill className="text-[22px] mr-2" />
                Download app
              </button>
            </div>
          </div>
          <div className="lg:w-[50%] w-full flex flex-col justify-center items-center">
            <Image
              alt="app"
              src={app}
              placeholder="blur"
              quality={100}
              sizes="100vw"
              className="sm:w-[400px] w-[300px] h-full object-cover"
            />
          </div>
        </div>
      </div>
      <DownloadApp isOpen={isDownloadAppModalOpen} onOpenChange={onDownloadAppModalOpenChange} mode={modeApp}/>
    </div>
  );
};

export default DownloadTechnician;
