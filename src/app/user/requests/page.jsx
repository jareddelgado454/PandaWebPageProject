"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import {
  RiArrowDropRightLine,
  RiMailOpenFill,
  RiAlertFill,
  RiErrorWarningFill,
} from "react-icons/ri";
import { Contexto } from "../layout";

const Requests = () => {
  const { isOnline, handleChangeStatus } = useContext(Contexto);
  return (
    <div className="w-full h-[calc(100vh-100px)] relative pr-[20px]">
      <div className="w-full h-[calc(100vh-100px)] flex flex-col px-4 bg-zinc-800 rounded-xl pt-4">
        <div className="w-full mb-6">
          <div className="w-[250px] bg-zinc-700 rounded-2xl flex items-center justify-center p-2 ">
            <Link href={"/user"} className="text-zinc-400">
              Technician panel
            </Link>
            <RiArrowDropRightLine className="text-zinc-400 text-[25px] " />
            <Link href={"user/requests"} className="text-white">
              Requests
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col mb-4">
          <span className="w-full text-white text-[30px] font-bold">
            Real-time car repair requests
          </span>
          <span className="w-full text-zinc-400 text-[17px] font-semibold">
            Increase the efficiency of your work, finding here the current
            requests of clients who are looking for technicians immediately.
          </span>
        </div>
        <div className="text-white w-full">
          {isOnline ? (
            <div>We are Online dude</div>
          ) : (
            <div className="w-1/2 rounded-md border-[2px] gap-y-3 bg-zinc-900/40 border-zinc-600 p-4 flex flex-col justify-center items-center">
              <span className="flex gap-x-1">
                <RiErrorWarningFill className="w-[35px] text-[35px] text-zinc-600" />{" "}
                In order to access the list of requests and start interacting
                with them, you need to be in Online mode, you can change here
              </span>
              <button onClick={()=>handleChangeStatus()} className="py-2 px-5 rounded-md bg-emerald-500">
                Online Mode
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
