"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  RiAlertFill,
  RiMapPin2Fill,
  RiToolsFill,
  RiMoneyDollarCircleFill,
  RiCheckFill,
} from "react-icons/ri";
import { onUpdateStatusServiceSubscription } from "@/graphql/services/subscriptions/subscription";
import { Contexto } from "@/app/user/layout";
import { client } from "@/contexts/AmplifyContext";

const Payment = ({ serviceAssigned, isOpen, onOpenChange }) => {
  const { user } = useContext(Contexto);

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
              <RiMoneyDollarCircleFill className="text-zinc-700 text-[22px]" />
            </div>
          </div>
          <span className="text-zinc-200 sm:text-[14px] text-[11px]">Payment</span>
        </div>
      </div>
      <div className="flex-1 w-full flex flex-col justify-center items-center gap-y-2">
        <img
          src="/image/CardPaymentImage.png"
          alt="Reparación en curso"
          className="md:w-[500px] sm:w-[70%] w-[90%] md:h-[500px] object-cover rounded-lg mb-4"
        />
        <div className="text-zinc-400 md:text-[22px] sm:text-[18px] text-[16px] mb-4 text-center flex flex-col">
          <span className="text-zinc-100 md:text-[35px] sm:text-[25px] text-[20px] font-bold">
            Payment Process
          </span>{" "}
          The customer is making the payment, waiting to complete the service.
        </div>
        <img
          src="/loading/loading4.gif"
          alt="Reparación en curso"
          className="md:w-[60px] md:h-[60px] w-[40px] h-[40px] object-cover rounded-lg mb-4"
        />
      </div>
    </div>
  );
};

export default Payment;
