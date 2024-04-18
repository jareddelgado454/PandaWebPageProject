"use client";

import React, { useState } from "react";
import UserProfile from "../UserProfile";
import News from "./News";
import Technicians from "./Technicians";

const CustomerContent = ({ user, retrieveOneUser }) => {
  const [optionSelected, setOptionSelected] = useState("profile");
  const renderingContent = () => {
      switch(optionSelected){
          case "profile" : return <UserProfile user={user} retrieveOneUser={retrieveOneUser}/>;
          case "news" : return <News />;
          case "technicians" : return <Technicians />;
      }
  }
  return (
    <div className="relative w-full overflow-y-auto md:w-2/4 bg-zinc-700 text-white rounded-lg shadow-lg p-4 h-5/6 order-2">
        <div className="bg-zinc-800 h-[40px] w-[600px] flex rounded-xl mb-3">
          <div onClick={()=>setOptionSelected("profile")} className={`w-1/3 rounded-xl text-center hover:bg-gray-400 flex items-center justify-center transition-colors cursor-pointer`}>
            My profile
          </div>
          <div onClick={()=>setOptionSelected("news")} className={`w-1/3 rounded-xl text-center hover:bg-gray-400 flex items-center justify-center transition-colors cursor-pointer`}>
            News & Releases
          </div>
          <div
            onClick={()=>setOptionSelected("technicians")}
            className={`w-1/3 rounded-xl text-center hover:bg-gray-400 flex items-center justify-center transition-colors cursor-pointer`}
          >
            Nearby Technicians
          </div>
        </div>
        {
            renderingContent()
        }
    </div>
  );
};

export default CustomerContent;