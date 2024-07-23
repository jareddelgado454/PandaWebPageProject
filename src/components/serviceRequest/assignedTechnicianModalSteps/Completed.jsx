"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  RiAlertFill,
  RiMapPin2Fill,
  RiToolsFill,
  RiMoneyDollarCircleFill,
  RiCheckFill,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { onUpdateStatusServiceSubscription } from "@/graphql/services/subscriptions/subscription";
import { Contexto } from "@/app/user/layout";
import { client } from "@/contexts/AmplifyContext";
import { ServiceAssignedContext } from "@/contexts/serviceAssigned/ServiceAssignedContext";

const Completed = ({ isOpen, onOpenChange }) => {
  const { user } = useContext(Contexto);
  const {clearServiceAssigned} = useContext(ServiceAssignedContext);

  const handleClose = () => {
    clearServiceAssigned();
    onOpenChange(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 items-center p-3 gap-y-4">
      <div className="md:w-[500px] sm:w-[80%] w-[95%] h-[80px] flex justify-center items-center shadow-lg bg-zinc-800/90 z-50 rounded-xl mb-4">
        <div className="flex flex-col items-center justify-center">
          <div className="w-[40px] h-[40px] border-[2px] flex items-center justify-center border-emerald-400 rounded-full">
            <div className="w-[30px] h-[30px] bg-emerald-400 rounded-full flex justify-center items-center">
              <RiCheckFill className="text-zinc-700 text-[23px] font-bold" />
            </div>
          </div>
          <span className="text-zinc-200 sm:text-[14px] text-[11px]">On my Way</span>
        </div>
        <div className="w-[30px] h-[25px] border-t-[2px] border-emerald-500 "></div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-[40px] h-[40px] border-[2px] flex items-center justify-center border-emerald-400 rounded-full">
            <div className="w-[30px] h-[30px] bg-emerald-400 rounded-full flex justify-center items-center">
              <RiCheckFill className="text-zinc-700 text-[20px]" />
            </div>
          </div>
          <span className="text-zinc-200 sm:text-[14px] text-[11px]">On Service</span>
        </div>
        <div className="w-[30px] h-[25px] border-t-[2px] border-emerald-500 "></div>
        <div className="flex flex-col items-center justify-center ">
          <div className="w-[40px] h-[40px] border-[2px] flex items-center justify-center border-emerald-400 rounded-full">
            <div className="w-[30px] h-[30px] bg-emerald-400 rounded-full flex justify-center items-center">
                <RiCheckFill className="text-zinc-700 text-[20px]" />
            </div>
          </div>
          <span className="text-zinc-200 sm:text-[14px] text-[11px]">Payment</span>
        </div>
      </div>
      <div className="flex-1 w-full flex flex-col justify-center items-center gap-y-2">
        <RiCheckboxCircleFill className="text-[100px] text-emerald-500"/>
        <div className="text-zinc-400 md:text-[22px] text-[19px] mb-4 text-center flex flex-col">
          <span className="text-zinc-100 md:text-[35px] text-[30px] font-bold">
            Payment Completed
          </span>{" "}
            The service has been completed successfully!
        </div>
        <button onClick={handleClose} className="px-4 py-2 md:text-[17px] text-[15px] rounded-md bg-emerald-500 text-white">
            Exit Service
        </button>
      </div>
    </div>
  );
};

export default Completed;
