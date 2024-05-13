"use client"

import {
    RiArrowRightSLine  , RiMapPin2Fill,
    RiCarFill ,
  } from "react-icons/ri";
import React from "react";

const ServiceRequest = ({id, showDetailRequest}) => {
  return (
    <div onClick={()=>showDetailRequest(id)} className="w-full flex border-[1px] border-zinc-600 rounded-lg p-3 justify-between cursor-pointer">
      <div className="flex flex-1 flex-col">
        <div className="w-full flex items-center justify-between gap-x-3 mb-2">
          <div className="flex gap-x-4 items-center">
            <span className="text-[19px] font-bold">1902 W 35th St</span>
            <span className="text-[15px] bg-zinc-700 py-1 px-2 rounded-md text-zinc-300">
              Car repairing
            </span>
            <div className="flex items-center py-1 px-3  gap-x-1 text-zinc-300 ">
              <RiMapPin2Fill className="text-emerald-600 text-[16px] " />1 miles
            </div>
          </div>
        </div>
        <div className="w-full flex ">
          <div className="flex items-center py-1 px-3 border-transparent border-r-[1px] border-r-zinc-500 gap-x-1 text-zinc-200 ">
            <RiCarFill className="text-emerald-600 text-[16px] " />
            Mercedes A-class Sedan 2018
          </div>
          <div className="flex px-3 gap-x-3">
            <div className="py-1 px-2 bg-emerald-600 rounded-md text-white">
              Motor
            </div>
            <div className="py-1 px-2 bg-emerald-600 rounded-md text-white">
              Tires
            </div>
          </div>
        </div>
      </div>
      <div className="w-[30px] flex items-center justify-center ">
        <RiArrowRightSLine className="text-zinc-500 text-[30px]" />
      </div>
    </div>
  );
};

export default ServiceRequest;
