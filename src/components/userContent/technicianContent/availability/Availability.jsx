import React, { useState } from "react";
import ScheduleDay from "./ScheduleDay";
import MaterialUIContext from "@/contexts/mu/MaterialUI";
import { RiEdit2Fill } from "react-icons/ri";

const Availability = () => {
  const [editingSchedule, setEditingSchedule] = useState(false);
  const [updatedSchedules, setUpdatedSchedules] = useState([]);

  const daysSchedule = [
    { day: "Monday", opening: "09:00", closing: "18:00" },
    { day: "Tuesday", opening: "09:00", closing: "18:00" },
    { day: "Wednesday", opening: "09:00", closing: "18:00" },
    { day: "Thursday", opening: "09:00", closing: "18:00" },
    { day: "Friday", opening: "09:00", closing: "18:00" },
    { day: "Saturday", opening: "closed", closing: "closed" },
    { day: "Sunday", opening: "closed", closing: "closed" },
  ];

  const handleUpdateSchedule = () => {
    console.log("pressing button Update", updatedSchedules);
    setEditingSchedule(false);
  };

  const handleScheduleChange = (day, opening, closing) => {
    const index = updatedSchedules.findIndex((item) => item.day === day);
    if (index === -1) {
      setUpdatedSchedules([...updatedSchedules, { day, opening, closing }]);
    } else {
      const updated = [...updatedSchedules];
      updated[index] = { day, opening, closing };
      setUpdatedSchedules(updated);
    }
  };

  return (
    <MaterialUIContext>
      <div className="w-full flex-flex-col">
        <div className="text-white text-[20px] font-bold mb-6 px-3">
          Select you <span className="text-emerald-400">schedule</span>, to be
          able to reach customers faster.
        </div>
        {!editingSchedule ? (
          <div className="w-full flex flex-col">
            {daysSchedule.map((daySchedule, index) => (
              <div key={index} className="flex items-center mb-4 px-3">
                <div className="w-[150px] text-[18px] text-zinc-300 font-bold">
                  {daySchedule?.day}:
                </div>
                {daySchedule.opening === "closed" ? (
                  <div className="py-2">Closed</div>
                ) : (
                  <>
                    <div className="w-[180px] py-2 px-3 border-b-[1px] text-zinc-300 border-zinc-500 mr-3">
                      {daySchedule.opening ? daySchedule.opening : "-"}
                    </div>
                    <div className="mr-3 text-emerald-300 text-[25px]">-</div>
                    <div className="w-[180px] py-2 px-3 border-b-[1px] text-zinc-300 border-zinc-500">
                      {daySchedule.closing ? daySchedule.closing : "-"}
                    </div>
                  </>
                )}
              </div>
            ))}
            <div className="w-full px-3 pt-6">
              <button
                onClick={() => setEditingSchedule(true)}
                className="w-[200px] flex gap-x-1 items-center justify-center px-4 py-2 rounded-lg bg-emerald-500 text-white cursor-pointer hover:bg-emerald-600 transition-colors"
              >
                <RiEdit2Fill /> Edit Schedule
              </button>
            </div>
          </div>
        ) : (
          <>
            {daysSchedule.map((daySchedule, index) => (
              <ScheduleDay
                key={index}
                daySchedule={daySchedule}
                onChange={(opening, closing) =>
                  handleScheduleChange(daySchedule.day, opening, closing)
                }
              />
            ))}
            <div className="w-full px-3 pt-6">
              <button
                onClick={() => handleUpdateSchedule()}
                className="w-[200px] flex gap-x-1 items-center justify-center px-4 py-2 rounded-lg bg-emerald-500 text-white cursor-pointer hover:bg-emerald-600 transition-colors"
              >
                {" "}
                Save Information
              </button>
            </div>
          </>
        )}
      </div>
    </MaterialUIContext>
  );
};

export default Availability;