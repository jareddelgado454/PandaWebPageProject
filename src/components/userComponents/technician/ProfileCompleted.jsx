"use client";

import React, { useEffect, useState } from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { statesUSA } from "@/assets/data/StatesUSA";
import { client } from "@/contexts/AmplifyContext";
import { updatePersonalInformationTechnician } from "@/graphql/users/mutation/technicians";

const ProfileCompleted = ({ userDataBase, setUserDataBase }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [infoEditing, setInfoEditing] = useState({ field: "", value: "" });
  const [selectedState, setSelectedState] = useState(new Set([]));

  useEffect(()=>{
    const stateIndex = statesUSA.findIndex((state) => state === userDataBase?.state);

    if (stateIndex !== -1) {
      setSelectedState(new Set([stateIndex]));
    }
  },[userDataBase]);

  const handleUpdateInfo = async () => {
    if(infoEditing.field && infoEditing.field === "state"){
      console.log("estas editando el estado perri", statesUSA[Number(infoEditing.value)])
      try {
        await client.graphql({
          query : updatePersonalInformationTechnician,
          variables : {
            id : userDataBase.id,
            input : {
              id : userDataBase.id,
              state : statesUSA[Number(infoEditing.value)]
            }
          }
        });
        console.log("se actualizo el state");
        setUserDataBase({...userDataBase, state : statesUSA[Number(infoEditing.value)]});
      } catch (error) {
        console.log(error);
      }
    }else{
      console.log("Editando otra cosa: ", infoEditing);
      try {
        await client.graphql({
          query : updatePersonalInformationTechnician,
          variables : {
            id : userDataBase.id,
            input : {
              id : userDataBase.id,
              [infoEditing.field]: infoEditing.value
            }
          }
        });
        console.log("editando", infoEditing.field, "valor:", infoEditing.value);
        setUserDataBase({...userDataBase, [infoEditing.field]: infoEditing.value});
      } catch (error) {
        console.log(error);
      }
    }
    setIsEditing(null);
    setInfoEditing({ field: "", value: "" });
  };

  const handleSelectionChange = (e) => {
    setSelectedState([e.target.value]);
    console.log("editando",e.target.value);
    setInfoEditing({
        field: "state",
        value: e.target.value,
    });
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* State */}
      <div className="flex flex-col text-white border-b-[2px] border-zinc-700 pb-3">
        <div className="pt-3">Your state:</div>
        {isEditing === "state" ? (
          <div className="w-full flex gap-x-2 h-[50px]">
            <div className="flex-1">
              <Select
                variant={"bordered"}
                label="Complete this field"
                className="w-full text-white h-[40px]"
                selectedKeys={selectedState}
                onChange={handleSelectionChange}
              >
                {statesUSA.map((stateUSA, index) => (
                  <SelectItem
                    key={index}
                    value={stateUSA}
                    style={{ color: "#E1E0DD" }}
                  >
                    {stateUSA}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex gap-x-2 items-center">
              <button
                onClick={() => {
                  setIsEditing(null);
                  setInfoEditing({ field: "", value: "" });
                }}
                className="h-[40px] w-[80px] rounded-md bg-zinc-700 cursor-pointer hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateInfo}
                className="h-[40px] w-[80px] rounded-md bg-emerald-500 cursor-pointer hover:bg-emerald-600 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-between md:mb-0 h-[50px] ">
            <div className="pt-1 text-zinc-400">{userDataBase?.state}</div>
            <div className="flex justify-end items-end ">
              <button
                onClick={() => {
                  setIsEditing("state");
                  setInfoEditing({ field: "state", value: userDataBase?.state });
                }}
                className="h-[40px] w-[80px] rounded-md bg-zinc-700 cursor-pointer hover:bg-zinc-600 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* City */}
      <div className="flex flex-col text-white border-b-[2px] border-zinc-700 pb-3">
        <div className="pt-3">Your city:</div>
        {isEditing === "city" ? (
          <div className="w-full flex gap-x-2 h-[50px]">
            <div className="flex-1 pt-1">
              <input
                type="text"
                className="w-full rounded-lg bg-transparent border-[1px] border-zinc-500 p-2"
                placeholder="Enter your city"
                value={infoEditing.value}
                onChange={(e) =>
                  setInfoEditing({ field: "city", value: e.target.value })
                }
              />
            </div>
            <div className="flex gap-x-2 items-center">
              <button
                onClick={() => {
                  setIsEditing(null);
                  setInfoEditing({ field: "", value: "" });
                }}
                className="h-[40px] w-[80px] rounded-md bg-zinc-700 cursor-pointer hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateInfo}
                className="h-[40px] w-[80px] rounded-md bg-emerald-500 cursor-pointer hover:bg-emerald-600 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-between md:mb-0 h-[50px]">
            <div className="pt-1 text-zinc-400 ">{userDataBase?.city}</div>
            <div className="flex justify-end items-end ">
              <button
                onClick={() => {
                  setIsEditing("city");
                  setInfoEditing({ field: "city", value: userDataBase?.city });
                }}
                className="h-[40px] w-[80px] rounded-md bg-zinc-700 cursor-pointer hover:bg-zinc-600 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Address */}
      <div className="flex flex-col text-white border-b-[2px] border-zinc-700 pb-3">
        <div className="pt-3">Your address:</div>
        {isEditing === "address" ? (
          <div className="w-full flex gap-x-2 h-[50px]">
            <div className="flex-1 pt-1">
              <input
                type="text"
                className="w-full rounded-lg bg-transparent border-[1px] border-zinc-500 p-2"
                placeholder="Enter your address"
                value={infoEditing.value}
                onChange={(e) =>
                  setInfoEditing({ field: "address", value: e.target.value })
                }
              />
            </div>
            <div className="flex gap-x-2 items-center">
              <button
                onClick={() => {
                  setIsEditing(null);
                  setInfoEditing({ field: "", value: "" });
                }}
                className="h-[40px] w-[80px] rounded-md bg-zinc-700 cursor-pointer hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateInfo}
                className="h-[40px] w-[80px] rounded-md bg-emerald-500 cursor-pointer hover:bg-emerald-600 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-between md:mb-0 h-[50px]">
            <div className="pt-1 text-zinc-400">{userDataBase?.address}</div>
            <div className="flex justify-end items-end ">
              <button
                onClick={() => {
                  setIsEditing("address");
                  setInfoEditing({
                    field: "address",
                    value: userDataBase?.address,
                  });
                }}
                className="h-[40px] w-[80px] rounded-md bg-zinc-700 cursor-pointer hover:bg-zinc-600 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col text-white border-b-[2px] border-zinc-700 pb-3">
        <div className="pt-3 ">Your email:</div>
        <div className="w-full flex justify-between md:mb-0 h-[50px]">
          <div className="pt-1 text-zinc-400">{userDataBase?.email}</div>
          <div className="flex justify-end items-end "></div>
        </div>
      </div>

      {/* Contact Number */}
      <div className="flex flex-col text-white border-b-[2px] border-zinc-700 pb-3">
        <div className="pt-3">Your contact number:</div>
        {isEditing === "contactNumber" ? (
          <div className="w-full flex gap-x-2 h-[50px]">
            <div className="flex-1 pt-1">
              <input
                type="text"
                className="w-full rounded-lg bg-transparent border-[1px] border-zinc-500 p-2"
                placeholder="Enter your contact number"
                value={infoEditing.value}
                onChange={(e) =>
                  setInfoEditing({
                    field: "contactNumber",
                    value: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-x-2 items-center">
              <button
                onClick={() => {
                  setIsEditing(null);
                  setInfoEditing({ field: "", value: "" });
                }}
                className="h-[40px] w-[80px] rounded-md bg-zinc-700 cursor-pointer hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateInfo}
                className="h-[40px] w-[80px] rounded-md bg-emerald-500 cursor-pointer hover:bg-emerald-600 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-between md:mb-0 h-[50px]">
            <div className="pt-1 text-zinc-400">
              {userDataBase?.contactNumber}
            </div>
            <div className="flex justify-end items-end ">
              <button
                onClick={() => {
                  setIsEditing("contactNumber");
                  setInfoEditing({
                    field: "contactNumber",
                    value: userDataBase?.contactNumber,
                  });
                }}
                className="h-[40px] w-[80px] rounded-md bg-zinc-700 cursor-pointer hover:bg-zinc-600 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Zip Code */}
      <div className="flex flex-col text-white border-b-[2px] border-zinc-700 pb-3">
        <div className="pt-3">Your zip code:</div>
        {isEditing === "zipCode" ? (
          <div className="w-full flex gap-x-2 h-[50px]">
            <div className="flex-1 pt-1">
              <input
                type="text"
                className="w-full rounded-lg bg-transparent border-[1px] border-zinc-500 p-2"
                placeholder="Enter your zip code"
                value={infoEditing.value}
                onChange={(e) =>
                  setInfoEditing({ field: "zipCode", value: e.target.value })
                }
              />
            </div>
            <div className="flex gap-x-2 items-center">
              <button
                onClick={() => {
                  setIsEditing(null);
                  setInfoEditing({ field: "", value: "" });
                }}
                className="h-[40px] w-[80px] rounded-md bg-zinc-700 cursor-pointer hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateInfo}
                className="h-[40px] w-[80px] rounded-md bg-emerald-500 cursor-pointer hover:bg-emerald-600 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-between md:mb-0 h-[50px]">
            <div className="pt-1 text-zinc-400">{userDataBase?.zipCode}</div>
            <div className="flex justify-end items-end ">
              <button
                onClick={() => {
                  setIsEditing("zipCode");
                  setInfoEditing({
                    field: "zipCode",
                    value: userDataBase?.zipCode,
                  });
                }}
                className="h-[40px] w-[80px] rounded-md bg-zinc-700 cursor-pointer hover:bg-zinc-600 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCompleted;