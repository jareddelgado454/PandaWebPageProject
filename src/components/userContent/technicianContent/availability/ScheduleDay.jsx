"use client";

import React, { useEffect, useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";
import { motion } from "framer-motion";

const ScheduleDay = ({ daySchedule, onChange }) => {
  const [toggle, setToggle] = useState(false);
  const [selectedOpeningTime, setSelectedOpeningTime] = useState(null);
  const [selectedClosingTime, setSelectedClosingTime] = useState(null);

  const handleOpeningTimeChange  = (time) => {
    setSelectedOpeningTime(time);
    console.log("Selected Opening Time:", time.format("HH:mm"));
    onChange( time.format("HH:mm"), selectedClosingTime ? selectedClosingTime.format("HH:mm") : null);
  };

  const handleClosingTimeChange = (time) => {
    setSelectedClosingTime(time);
    onChange( selectedOpeningTime ? selectedOpeningTime.format("HH:mm") : null, time.format("HH:mm"));
  };

  useEffect(()=>{
    if(daySchedule?.opening === "closed"){
        setToggle(false);
    }else{
        setToggle(true);
        setSelectedOpeningTime(dayjs(`2024-04-19T${daySchedule.opening}`));
        setSelectedClosingTime(dayjs(`2024-04-19T${daySchedule.closing}`));
    }

  },[]);

  return (
    <div className="flex items-center gap-x-2 mb-2 px-3">
      <h4 className="w-[150px] text-[18px] text-zinc-300 font-bold">{daySchedule?.day}:</h4>
      {
          !toggle
          ? <div className="w-[500px] py-4 text-[18px] font-bold pl-3 tracking-[2px] text-gray-300">Closed</div>
          : <div className="w-[500px] flex items-center">
              <DemoContainer components={["MobileTimePicker"]}>
                <DemoItem label="">
                  <MobileTimePicker defaultValue={dayjs("2022-04-17T15:30")} value={selectedOpeningTime} onChange={handleOpeningTimeChange} />
                </DemoItem>
                <div className="text-emerald-400  flex items-center">-</div>
                <DemoItem label="">
                  <MobileTimePicker defaultValue={dayjs("2022-04-17T15:30")} value={selectedClosingTime} onChange={handleClosingTimeChange}/>
                </DemoItem>
              </DemoContainer>
            </div>
      }
      <div
        onClick={() => setToggle(!toggle)}
        className={`w-[55px] h-[30px] flex items-center rounded-full ${
          toggle
            ? "bg-emerald-500 border-[2px] border-emerald-500 justify-end p-[2px]"
            : "border-[2px] border-zinc-500 bg-zinc-700 justify-start p-[4px]"
        }  cursor-pointer`}
      >
        <motion.div
          transition={{ type: "spring", damping: 30, stiffness: 700 }}
          animate={{ height: toggle ? "26px" : "15px", width: toggle ? "26px" : "15px", backgroundColor: toggle ? "#2C3137" : "#61666C" }}
          className= "rounded-full"
        />
      </div>
    </div>
  );
};

export default ScheduleDay;
