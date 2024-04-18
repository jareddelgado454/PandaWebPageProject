"use client";

import React, { useState } from "react";
import UserProfile from "../UserProfile";
import SubscriptionTechnician from "./SubscriptionTechnician";
import Availability from "./Availability";

const TechnicianContent = ({ user, retrieveOneUser }) => {
  const [optionSelected, setOptionSelected] = useState("profile");
  const renderingContent = () => {
      switch(optionSelected){
          case "profile" : return <UserProfile user={user} retrieveOneUser={retrieveOneUser}/>;
          case "subscription" : return <SubscriptionTechnician />;
          case "availability" : return <Availability />
      }
  }
  return (
    <div className="relative w-full overflow-y-auto md:w-2/4 bg-zinc-800 text-white rounded-lg shadow-lg p-4 h-5/6 order-2">
        <div className="bg-zinc-700 h-[40px] w-[600px] flex rounded-xl mb-10">
          <div onClick={()=>setOptionSelected("profile")} className={` ${optionSelected === "profile" ? "bg-emerald-600 transform scale-105 duration-150 delay-150 shadow-lg text-[18px] font-bold " : "bg-transparent hover:bg-zinc-600 "} w-1/3 rounded-xl text-center flex items-center justify-center transition-colors cursor-pointer`}>
            My profile
          </div>
          <div onClick={()=>setOptionSelected("subscription")} className={` ${optionSelected === "subscription" ? "bg-emerald-600 transform scale-105 duration-150 delay-150 shadow-lg text-[18px] font-bold" : "bg-transparent hover:bg-zinc-600"} w-1/3 rounded-xl text-center  flex items-center justify-center transition-colors cursor-pointer`}>
            My subscription
          </div>
          <div
            onClick={()=>setOptionSelected("availability")}
            className={` ${optionSelected === "availability" ? "bg-emerald-600 transform scale-105 duration-150 delay-150 shadow-lg text-[18px] font-bold" : "bg-transparent hover:bg-zinc-600"} w-1/3 rounded-xl text-center  flex items-center justify-center transition-colors cursor-pointer`}
          >
            My availability
          </div>
        </div>
        {
            renderingContent()
        }
    </div>
  );
};

export default TechnicianContent;
