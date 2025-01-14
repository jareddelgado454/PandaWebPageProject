"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { TbUserSquare, TbCertificate2, TbId, TbTool } from "react-icons/tb";
import { RiEditBoxLine, RiChat2Line,RiStarSFill, RiFileCheckFill, RiFeedbackFill,  RiAddFill, RiEdit2Line , RiQuestionFill, RiLinkM , RiArrowRightLine , RiTimer2Line  } from "react-icons/ri";
import { Contexto } from "../layout";

const Settings = () => {
  const { user } = useContext(Contexto);
  console.log("este es el useer", user);
  return (
    <div className="w-full sm:h-[calc(100vh-80px)] h-[calc(100vh-120px)] relative sm:px-8 px-3 lg:pl-8 sm:pl-[105px] pl-3 pt-4 pb-4  overflow-y-auto">
      <div className="w-full  flex flex-row rounded-xl pt-4 gap-x-6 mb-5">
        {/* <div className="w-full mb-6">
                <div className="w-[270px] bg-zinc-800 rounded-2xl flex items-center justify-center p-2 ">
                    <Link href={'/user'} className="text-zinc-400">
                        Technician panel
                    </Link>
                    <RiArrowDropRightLine className="text-zinc-400 text-[25px] " />
                    <Link href={'user/settings'} className="text-white">
                        Settings
                    </Link>
                </div>
            </div> */}
        <div className="w-full flex flex-col ">
          <div className="w-full flex-1 bg-zinc-900 rounded-lg p-6 flex-row flex">
            <img
              src={
                user["custom:profilePicture"]
                  ? user["custom:profilePicture"]
                  : "/image/defaultProfilePicture.jpg"
              }
              className="rounded-full w-[4rem] h-[4rem] md:w-[7rem] md:h-[7rem] cursor-pointer border-[3px] dark:border-zinc-600/60 border-zinc-300"
              alt="Profile Picture "
            />
            <div className="flex flex-col justify-center flex-1 px-4">
              <div className=" text-[25px] font-bold mb-5">
                {user["custom:fullName"] ? user["custom:fullName"] : user?.name}
              </div>
              <div className="dark:text-gray-200 text-zinc-600 mb-2">
                <span className="text-gray-400 mr-2">Email:</span>
                {user?.email}
              </div>
              <div className="dark:text-gray-200 text-zinc-600 mb-2">
                <span className="text-gray-400 mr-2">Location:</span>
                {user["custom:city"].concat(", ").concat(user["custom:state"])}
              </div>
              <div className="dark:text-gray-200 text-zinc-600 mb-2">
                <span className="text-gray-400 mr-2">Phone Number:</span>
                {user["custom:phoneNumber"]}
              </div>
            </div>
            <div className="w-[30px] flex justify-center">
              <RiEditBoxLine className="text-white text-[23px] cursor-pointer" />
            </div>
          </div>
          <div className="w-full flex flex-row py-4 ">
            <div className="w-full rounded-lg  flex flex-row py-3 gap-3">
              <Link
                href={"/user/chats"}
                className="  border-meant  border-[2px] cursor-pointer flex flex-row items-center p-2 shadow-lg transition-all rounded-xl"
              >
                <RiStarSFill className="text-[18px] dark:text-emerald-400 text-emerald-200 mr-3" />
                <div className="flex flex-col">
                  <h4 className="flex gap-x-1 items-center  text-[16px] font-bold text-meant">
                    My Rates
                  </h4>
                </div>
              </Link>
              <Link
                href={"/user/chats"}
                className="  border-meant  border-[2px] cursor-pointer flex flex-row items-center p-2 shadow-lg transition-all rounded-xl"
              >
                <RiChat2Line className="text-[18px] dark:text-emerald-400 text-emerald-200 mr-3" />
                <div className="flex flex-col">
                  <h4 className="flex gap-x-1 items-center  text-[16px] font-bold text-meant">
                    My Chats
                  </h4>
                </div>
              </Link>
              <Link
                href={"/user/chats"}
                className="  border-meant  border-[2px] cursor-pointer flex flex-row items-center p-2 shadow-lg transition-all rounded-xl"
              >
                <RiFileCheckFill  className="text-[18px] dark:text-emerald-400 text-emerald-200 mr-3" />
                <div className="flex flex-col">
                  <h4 className="flex gap-x-1 items-center  text-[16px] font-bold text-meant">
                    Services Completed
                  </h4>
                </div>
              </Link>
              <Link
                href={"/user/chats"}
                className="  border-meant  border-[2px] cursor-pointer flex flex-row items-center p-2 shadow-lg transition-all rounded-xl"
              >
                <RiFeedbackFill  className="text-[18px] dark:text-emerald-400 text-emerald-200 mr-3" />
                <div className="flex flex-col">
                  <h4 className="flex gap-x-1 items-center  text-[16px] font-bold text-meant">
                    Reports
                  </h4>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-[50%] bg-zinc-900 rounded-lg mb-4">
            <div className="w-full flex justify-between mb-3 p-3">
              <div className="text-[19px] font-semibold">My Certifications</div>
              <div className="flex flex-row gap-4">
                <div className=" p-1">
                  <RiAddFill  className="text-[22px]"/>
                </div>
                <div className=" p-1">
                  <RiEdit2Line   className="text-[22px]"/>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3 border-b-[2px] border-b-zinc-700 pb-3 mb-3 mx-3">
              <RiQuestionFill className="text-meant text-[33px]"/>
              <div className="flex flex-1 flex-col gap-2">
                <div className="font-semibold text-[17px]">Certification technician</div>
                <div className="font-semibold text-[16px]">The Panda</div>
                <div className=" text-[14px] text-zinc-400">Issued Jan 2025</div>
                <div className=" text-[14px] text-zinc-400">Credential Id ed4ef262-cfad-47b2-88c8-2b28d1d35cf7</div>
                <div className="w-[180px] flex flex-row border-[2px] border-white rounded-xl items-center p-2 justify-center text-[15px]">
                  Show Credential
                  <RiLinkM className="text-[18px] ml-2"/>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3  pb-3 mx-3">
              <RiQuestionFill className="text-meant text-[33px]"/>
              <div className="flex flex-1 flex-col gap-2">
                <div className="font-semibold text-[17px]">Technician pro 2</div>
                <div className="font-semibold text-[16px]">The Panda</div>
                <div className=" text-[14px] text-zinc-400">Issued Jan 2025</div>
                <div className=" text-[14px] text-zinc-400">Credential Id ed4ef262-cfad-47b2-88c8-2b28d1d35cf7</div>
                <div className="w-[180px] flex flex-row border-[2px] border-white rounded-xl items-center p-2 justify-center text-[15px]">
                  Show Credential
                  <RiLinkM className="text-[18px] ml-2"/>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center p-2 border-t-[2px] border-t-zinc-700 font-semibold">
              Show All Certifications
              <RiArrowRightLine  className="ml-3"/>
            </div>
          </div>
          <div className="w-[50%] bg-zinc-900 rounded-lg ">
            <div className="w-full flex justify-between mb-3 p-3">
              <div className="text-[19px] font-semibold">My Schedule</div>
              <div className="flex flex-row gap-4">
                <div className=" p-1">
                  <RiEdit2Line   className="text-[22px]"/>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3  pb-6 mx-3">
              <RiTimer2Line  className="text-zinc-500 text-[33px]"/>
              <div className="flex flex-1 flex-col gap-2">
                <div className=" text-[17px] text-zinc-100 flex w-full">
                  <div className="w-[180px] font-semibold">Sunday</div>
                  <div className="font-semibold">Closed</div>
                </div>
                <div className=" text-[17px] text-zinc-100 flex w-full">
                  <div className="w-[180px] font-semibold">Monday</div>
                  <div className="font-semibold flex flex-col">
                    <div>9:00 a.m. -</div>
                    <div>6:00 p.m.</div>
                  </div>
                </div>
                <div className=" text-[17px] text-zinc-100 flex w-full">
                  <div className="w-[180px] font-semibold">Tuesday</div>
                  <div className="font-semibold flex flex-col">
                    <div>9:00 a.m. -</div>
                    <div>6:00 p.m.</div>
                  </div>
                </div>
                <div className=" text-[17px] text-zinc-100 flex w-full">
                  <div className="w-[180px] font-semibold">Wednesday</div>
                  <div className="font-semibold flex flex-col">
                    <div>9:00 a.m. -</div>
                    <div>6:00 p.m.</div>
                  </div>
                </div>
                <div className=" text-[17px] text-zinc-100 flex w-full">
                  <div className="w-[180px] font-semibold">Thursday</div>
                  <div className="font-semibold flex flex-col">
                    <div>9:00 a.m. -</div>
                    <div>6:00 p.m.</div>
                  </div>
                </div>
                <div className=" text-[17px] text-zinc-100 flex w-full">
                  <div className="w-[180px] font-semibold">Friday</div>
                  <div className="font-semibold flex flex-col">
                    <div>9:00 a.m. -</div>
                    <div>6:00 p.m.</div>
                  </div>
                </div>
                <div className=" text-[17px] text-zinc-100 flex w-full">
                  <div className="w-[180px] font-semibold">Saturday</div>
                  <div className="font-semibold">Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[300px] bg-red-500">Panel Derecho</div>
      </div>
    </div>
  );
};

export default Settings;
