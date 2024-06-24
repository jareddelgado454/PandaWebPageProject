"use client";
import React, { useContext, useEffect, useState } from "react";
import { TbUserSquare, TbCertificate2, TbId, TbTool } from "react-icons/tb";
import Link from "next/link";
import {
  RiArrowDropRightLine,
  RiMailOpenFill,
  RiAlertFill,
  RiArrowDownSLine,
  RiCheckboxCircleFill 
} from "react-icons/ri";
import { client } from "@/contexts/AmplifyContext";
import profileDefaultPicture from "../../../public/image/defaultProfilePicture.jpg";
import { Contexto } from "./layout";
import Image from "next/image";
import loading3 from "../../../public/loading/loading3.gif"
import RepairRequestModal from "@/components/modalServices/modalServicesTechnician/RepairRequestModal";
import { useDisclosure } from "@nextui-org/react";
const Page = () => {
  const { user, loading } = useContext(Contexto);
  console.log("useeeeeer",user);
  const {
    isOpen: isRequestServiceModalOpen,
    onOpen: onRequestServiceModalOpen,
    onOpenChange: onRequestServiceModalOpenChange,
  } = useDisclosure();

  useEffect(()=>{
    onRequestServiceModalOpen();
  },[]);

  return (
    <div className="w-full h-[calc(100vh-100px)] relative pr-[20px]">
      {/* <RepairRequestModal isOpen={isRequestServiceModalOpen} onOpenChange={onRequestServiceModalOpenChange}/> */}
      {loading ? (
        <div className="w-full h-full flex flex-col justify-center pb-[200px] items-center">
          <div className="relative w-[600px] h-[200px]  flex items-center justify-center">
            <Image 
              src={loading3}
              quality={100}
              className="w-[100px] h-[100px]"
            />
            <h3 className="text-[40px] text-center font-bold text-gray-100 absolute bottom-2 left-0 w-full">Almost done! wait please.</h3>
          </div>
        </div>
      )  : (
        user && (
          <div className="w-full h-[calc(100vh-100px)] flex flex-col px-4 dark:bg-zinc-800 bg-zinc-100 dark:shadow-none  shadow-lg shadow-zinc-400 rounded-xl pt-4">
            <div className="w-full mb-6">
              <div className="w-[250px] dark:bg-zinc-700 bg-zinc-300 rounded-2xl flex items-center justify-center p-2 ">
                <Link href={"/user"} className="dark:text-zinc-400 text-zinc-600 text-[15px]">
                  Technician panel
                </Link>
                <RiArrowDropRightLine className="dark:text-zinc-400 text-zinc-600 text-[25px] " />
                <Link href={"/user"} className="dark:text-white text-black text-[15px]">
                  Profile
                </Link>
              </div>
            </div>

            <div className="w-full flex mb-8 gap-x-[20px]">
              <div className="w-[70%] flex rounded-xl dark:bg-zinc-700/70 bg-emerald-600/60 p-4 gap-x-3">
                <Image
                  src={user.profilePictureUrl ? user.profilePictureUrl : profileDefaultPicture}
                  alt={`profile picture`}
                  width={170}
                  height={170}
                  className="rounded-full object-cover border-zinc-600/50 border-[5px] shadow-md"
                />
                <div className="flex-1 ">
                  <div className="w-full dark:text-white text-emerald-100 text-[40px] font-bold">
                    Welcome again{" "}
                    <span className="dark:text-emerald-400 text-zinc-900">
                      {user["custom:fullName"] ? user["custom:fullName"].split(' ').slice(0, 2).join(' ') : user.name.split(' ').slice(0, 2).join(' ')}!
                    </span>
                  </div>
                  <div className="w-full flex items-center gap-x-1 dark:text-gray-400 text-zinc-900 text-[18px] mb-4">
                    <RiMailOpenFill className="text-gray-200 text-[25px]" />{" "}
                    {user?.email}
                  </div>
                  <div className="w-full flex gap-x-2">
                    <div
                      className={`w-[95px] p-2 relative border-[1px] rounded-md ${user["custom:infoCompleted"] === "true" ? 'border-green-400' : 'border-red-400'}  bg-zinc-800`}
                    >
                      {
                        user["custom:infoCompleted"] === "true" ? <RiCheckboxCircleFill className="absolute -top-2 -right-2 w-[22px] h-[22px] flex justify-center items-center text-green-500"/>
                        :<RiAlertFill className="absolute -top-2 -right-2 w-[22px] h-[22px] flex justify-center items-center text-red-500" />
                      }
                      <div className="w-full flex flex-col">
                        <span className="w-full text-left text-[11px] text-zinc-300">
                          Profile:
                        </span>
                        <span
                          className={`w-full text-left text-[13px] ${user["custom:infoCompleted"] === "true" ? 'text-green-400' : 'text-red-400'} `}
                        > 
                          {
                            user["custom:infoCompleted"] === "true" ? 'Complete' : 'Incomplete'
                          }
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-[95px] p-2 relative border-[1px] rounded-md ${user["custom:stripeAccountStatus"] && user["custom:stripeAccountStatus"]==="verified" ? "border-green-400" : "border-red-400"} bg-zinc-800`}
                    >
                      {
                        user["custom:stripeAccountStatus"] && user["custom:stripeAccountStatus"] == "verified" ? <RiCheckboxCircleFill className="absolute -top-2 -right-2 w-[22px] h-[22px] flex justify-center items-center text-green-500"/> 
                        : <RiAlertFill className="absolute -top-2 -right-2 w-[22px] h-[22px] flex justify-center items-center text-red-500" />
                      }
                      
                      <div className="w-full flex flex-col">
                        <span className="w-full text-left text-[11px] text-zinc-300">
                          Stripe acct:
                        </span>
                        <span
                          className={`w-full text-left text-[13px]  ${user["custom:stripeAccountStatus"] && user["custom:stripeAccountStatus"]==="verified" ? "text-green-400" : "text-red-400"}`}
                        >
                          {
                            !user["custom:stripeId"] ? "none" :  user["custom:stripeAccountStatus"] == "verified" ? "Verified" : "incomplete"
                          }
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-[95px] p-2 relative border-[1px] rounded-md border-red-400 bg-zinc-800`}
                    >
                      <RiAlertFill className="absolute -top-2 -right-2 w-[22px] h-[22px] flex justify-center items-center text-red-500" />
                      <div className="w-full flex flex-col">
                        <span className="w-full text-left text-[11px] text-zinc-300">
                          Schedule:
                        </span>
                        <span
                          className={`w-full text-left text-[13px] text-red-400`}
                        >
                          Incomplete
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 rounded-xl bg-zinc-700/70">Panel derecho</div>
            </div>

            <div className="text-[30px] flex items-center gap-x-1  font-bold mb-4">
              Complete the fields{" "}
              <RiArrowDownSLine className="dark:text-emerald-400 text-emerald-600" />
            </div>
            <div className="w-full grid grid-cols-3 gap-4">
              <Link
                href={"/user/personal-information"}
                className="rounded-xl dark:bg-zinc-900/60 dark:border-emerald-500/10 dark:hover:border-zinc-700/70 bg-zinc-300/70 border-zinc-300  border-[2px] cursor-pointer flex flex-row items-center p-4 pr-5 shadow-lg transition-all "
              >
                <div className="w-[80px] flex items-center justify-center dark:bg-zinc-700/60 bg-zinc-400 rounded-lg px-2 py-3 mr-3">
                  <TbUserSquare className="text-[30px] dark:text-emerald-400 text-emerald-200" />
                </div>
                <div className="flex flex-col">
                  <h4 className="flex gap-x-1 items-center  text-[20px] font-bold">
                    PROFILE INFORMATION
                  </h4>
                  <p className="dark:text-gray-300 text-zinc-900 text-[14px]">
                    Here you can access and complete your personal information,
                    such as name, city, phone number, etc. You can also edit.
                  </p>
                </div>
              </Link>
              <Link
                href={"/user/specialization-area"}
                className=" rounded-xl dark:bg-zinc-900/60 dark:border-emerald-500/10 dark:hover:border-zinc-700/70 bg-zinc-300/70 border-zinc-300 border-[2px] cursor-pointer flex flex-row items-center p-4 pr-5 shadow-lg  transition-all "
              >
                <div className="w-[80px] flex items-center justify-center dark:bg-zinc-700/60 bg-zinc-400 rounded-lg px-2 py-3 mr-3">
                  <TbTool className="text-[30px] dark:text-emerald-400 text-emerald-200" />
                </div>
                <div className="flex flex-col">
                  <h4 className="flex gap-x-1 items-center   text-[20px] font-bold">
                    SPECIALIZATION AREA
                  </h4>
                  <p className="dark:text-gray-300 text-zinc-900 text-[14px]">
                    Here you can complete the information about the cars you
                    specialize in repairing, so we can recommend you.
                  </p>
                </div>
              </Link>
              <Link
                href={"/user/certifications"}
                className="rounded-xl dark:bg-zinc-900/60 dark:border-emerald-500/10 dark:hover:border-zinc-700/70 bg-zinc-300/70 border-zinc-300 border-[2px] cursor-pointer flex flex-row items-center p-4 pr-5 shadow-lg  transition-all "
              >
                <div className="w-[80px] flex items-center justify-center dark:bg-zinc-700/60 bg-zinc-400 rounded-lg px-2 py-3 mr-3">
                  <TbCertificate2 className="text-[30px] dark:text-emerald-400 text-emerald-200" />
                </div>
                <div className="flex flex-col">
                  <h4 className="flex gap-x-1 items-center   text-[20px] font-bold">
                    CERTIFICATIONS
                  </h4>
                  <p className="dark:text-gray-300 text-zinc-900 text-[14px]">
                    Here you can upload the certifications you have, if you have
                    them, certifications in the field of mechanics.
                  </p>
                </div>
              </Link>
              <Link
                href={"/user/profile-card"}
                className="rounded-xl dark:bg-zinc-900/60 dark:border-emerald-500/10 dark:hover:border-zinc-700/70 bg-zinc-300/70 border-zinc-300 border-[2px] cursor-pointer flex flex-row items-center p-4 pr-5 shadow-lg  transition-all "
              >
                <div className="w-[80px] flex items-center justify-center dark:bg-zinc-700/60 bg-zinc-400 rounded-lg px-2 py-3 mr-3">
                  <TbId className="text-[30px] dark:text-emerald-400 text-emerald-200" />
                </div>
                <div className="flex flex-col">
                  <h4 className="flex gap-x-1 items-center text-[20px] font-bold">
                    PROFILE CARD
                  </h4>
                  <p className="dark:text-gray-300 text-zinc-900 text-[14px]">
                    Here you can see your profile card, it is how potential
                    clients see you and can interact with your information.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  );
};
export default Page;
