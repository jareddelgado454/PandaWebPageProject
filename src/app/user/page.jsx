"use client";
import React, { useContext, useEffect, useState } from "react";
import { TbUserSquare, TbCertificate2, TbId, TbTool } from "react-icons/tb";
import Link from "next/link";
import {
  RiArrowDropRightLine,
  RiMailOpenFill,
  RiAlertFill,
  RiArrowDownSLine,
  RiCheckboxCircleFill,
  RiVipCrown2Fill,
  RiCalendarTodoFill,
  RiToolsFill,
  RiTruckFill,
} from "react-icons/ri";
import { client } from "@/contexts/AmplifyContext";
import profileDefaultPicture from "../../../public/image/defaultProfilePicture.jpg";
import { Contexto } from "./layout";
import Image from "next/image";
import carOffer from "../../../public/image/offerTechnician.png";
import advertisementTechnician from "../../../public/image/advertisementTechnician.png"
import advertisementTechnician2 from "../../../public/image/advertisementTechnician2.png"
import loading3 from "../../../public/loading/loading3.gif";
import RepairRequestModal from "@/components/modalServices/modalServicesTechnician/RepairRequestModal";
import { useDisclosure } from "@nextui-org/react";
const Page = () => {
  const { user, loading } = useContext(Contexto);
  console.log("useeeeeer", user);
  const {
    isOpen: isRequestServiceModalOpen,
    onOpen: onRequestServiceModalOpen,
    onOpenChange: onRequestServiceModalOpenChange,
  } = useDisclosure();

  useEffect(() => {
    onRequestServiceModalOpen();
  }, []);

  return (
    <div className="w-full sm:h-[calc(100vh-80px)] h-[calc(100vh-120px)] relative ">
      {/* <RepairRequestModal isOpen={isRequestServiceModalOpen} onOpenChange={onRequestServiceModalOpenChange}/> */}
      {loading ? (
        <div className="w-full h-full flex flex-col justify-center pb-[200px] items-center">
          <div className="relative w-[600px] h-[200px]  flex items-center justify-center">
            <h3 className="text-[40px] text-center font-bold text-zinc-800 absolute bottom-2 left-0 w-full">
              Almost done! wait please.
            </h3>
          </div>
        </div>
      ) : (
        user && (
          <div className="w-full h-full overflow-y-auto flex lg:flex-row flex-col sm:px-8 px-3 lg:pl-8 sm:pl-[105px] pl-2 gap-x-8 pt-4 pb-4">
            <div className="flex-1 flex-col">
              <div className="w-full flex mb-8 gap-x-[20px]">
                <div className="w-full flex justify-between rounded-xl dark:bg-zinc-900 bg-zinc-800 gap-x-10 pt-4 px-4">
                  <div className="flex-1 max-w-[700px] flex-col pb-4">
                    <div className="text-[20px] font-bold text-emerald-300 mb-2 ">
                      Unlock Your Productivity Potential with a ProPlan
                    </div>
                    <div className="mb-2 text-white">
                      Gain unlimited access! Make your repairs without limits
                      with our paid plans, free of commission, what are you
                      waiting for? freedom awaits
                    </div>
                    <button className="flex gap-x-1 items-center justify-center dark:bg-zinc-700 bg-white rounded-xl p-2 text-[15px] font-bold">
                      <RiVipCrown2Fill className="dark:text-yellow-300 text-yellow-500 text-[17px]" />
                      Upgrade Your Plan
                    </button>
                  </div>
                  <div className="md:block w-[250px] min-w-[250px] hidden">
                    <Image
                      alt="Car"
                      src={carOffer}
                      placeholder="blur"
                      quality={100}
                      sizes="100vw"
                      className="object-cover w-[250px]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex md:flex-row flex-col gap-x-4 md:gap-y-0 gap-y-3 mb-4">
                <div className="md:w-[33%] w-full flex rounded-lg p-3 dark:bg-emerald-600 bg-emerald-500 items-center gap-x-2 dark:shadow-none shadow-lg">
                  <div className="w-[40px] h-[40px] rounded-lg bg-emerald-100/70 flex items-center justify-center">
                    <RiCalendarTodoFill className="text-emerald-700 text-[30px]" />
                  </div>
                  <div className="flex flex-col  justify-center">
                    <span className="text-[14px]">Scheduled repairs</span>
                    <span className="font-bold text-[22px]">0</span>
                  </div>
                </div>
                <div className="md:w-[33%] w-full flex rounded-lg p-3 dark:border-zinc-800 border-zinc-400 dark:bg-transparent bg-white border-[1px] items-center gap-x-2 dark:shadow-none shadow-lg">
                  <div className="w-[40px] h-[40px] rounded-lg dark:bg-zinc-600  bg-zinc-400 flex items-center justify-center">
                    <RiToolsFill className="text-zinc-900 text-[30px]" />
                  </div>
                  <div className="flex flex-col  justify-center">
                    <span className="text-[14px]">Repairs completed</span>
                    <span className="font-bold text-[22px]">0</span>
                  </div>
                </div>
                <div className="md:w-[33%] w-full flex rounded-lg p-3 dark:border-zinc-800 border-zinc-400 dark:bg-transparent bg-white border-[1px] items-center gap-x-2 dark:shadow-none shadow-lg">
                  <div className="w-[40px] h-[40px] rounded-lg dark:bg-zinc-600 bg-red-600/40 flex items-center justify-center">
                    <RiTruckFill className="dark:text-zinc-900 text-red-800 text-[30px]" />
                  </div>
                  <div className="flex flex-col  justify-center">
                    <span className="text-[14px]">Tows completed</span>
                    <span className="font-bold text-[22px]">0</span>
                  </div>
                </div>
              </div>

              <div className="text-[30px] flex items-center gap-x-1  font-bold mb-4">
                Complete the fields{" "}
                <RiArrowDownSLine className="dark:text-emerald-400 text-emerald-600" />
              </div>
              <div className="w-full grid  md:grid-cols-2 grid-cols-1 gap-4">
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
                      Here you can access and complete your personal
                      information, such as name, city, phone number, etc. You
                      can also edit.
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
                      Here you can upload the certifications you have, if you
                      have them, certifications in the field of mechanics.
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
            <div className="w-[320px] flex-col gap-y-8 rounded-xl lg:flex hidden">
              <div className="w-full h-[320px] min-h-[320px] bg-zinc-900 rounded-xl overflow-hidden dark:shadow-none shadow-lg">
                <Image
                  alt="Car"
                  src={advertisementTechnician2}
                  placeholder="blur"
                  quality={100}
                  sizes="100vw"
                  className="object-cover w-[320px] h-[320px] min-h-[320px]"
                />
              </div>

              <div className="w-full h-[320px] dark:bg-zinc-900 bg-white rounded-xl flex flex-col p-2 dark:shadow-none shadow-lg">
                <div className="w-full text-[18px] font-bold">
                    Today`s Schedule
                </div>
              </div>
              {/* panel derecho */}
              {/* <div className="flex-1 rounded-xl dark:bg-zinc-800 bg-emerald-600/60">
                <div className="w-full flex items-center gap-x-1 dark:text-gray-400 text-zinc-900 text-[18px] mb-4">
                  <RiMailOpenFill className="text-gray-200 text-[25px]" />{" "}
                  {user?.email}
                </div>
                <div className="w-full flex gap-x-2">
                  <div
                    className={`w-[95px] p-2 relative border-[1px] rounded-md ${
                      user["custom:infoCompleted"] === "true"
                        ? "border-green-400"
                        : "border-red-400"
                    }  bg-zinc-800`}
                  >
                    {user["custom:infoCompleted"] === "true" ? (
                      <RiCheckboxCircleFill className="absolute -top-2 -right-2 w-[22px] h-[22px] flex justify-center items-center text-green-500" />
                    ) : (
                      <RiAlertFill className="absolute -top-2 -right-2 w-[22px] h-[22px] flex justify-center items-center text-red-500" />
                    )}
                    <div className="w-full flex flex-col">
                      <span className="w-full text-left text-[11px] text-zinc-300">
                        Profile:
                      </span>
                      <span
                        className={`w-full text-left text-[13px] ${
                          user["custom:infoCompleted"] === "true"
                            ? "text-green-400"
                            : "text-red-400"
                        } `}
                      >
                        {user["custom:infoCompleted"] === "true"
                          ? "Complete"
                          : "Incomplete"}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-[95px] p-2 relative border-[1px] rounded-md ${
                      user["custom:stripeAccountStatus"] &&
                      user["custom:stripeAccountStatus"] === "verified"
                        ? "border-green-400"
                        : "border-red-400"
                    } bg-zinc-800`}
                  >
                    {user["custom:stripeAccountStatus"] &&
                    user["custom:stripeAccountStatus"] == "verified" ? (
                      <RiCheckboxCircleFill className="absolute -top-2 -right-2 w-[22px] h-[22px] flex justify-center items-center text-green-500" />
                    ) : (
                      <RiAlertFill className="absolute -top-2 -right-2 w-[22px] h-[22px] flex justify-center items-center text-red-500" />
                    )}

                    <div className="w-full flex flex-col">
                      <span className="w-full text-left text-[11px] text-zinc-300">
                        Stripe acct:
                      </span>
                      <span
                        className={`w-full text-left text-[13px]  ${
                          user["custom:stripeAccountStatus"] &&
                          user["custom:stripeAccountStatus"] === "verified"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {!user["custom:stripeId"]
                          ? "none"
                          : user["custom:stripeAccountStatus"] == "verified"
                          ? "Verified"
                          : "incomplete"}
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
              </div> */}
            </div>
          </div>
        )
      )}
    </div>
  );
};
export default Page;
