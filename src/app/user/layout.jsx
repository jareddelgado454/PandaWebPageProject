"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import UserSidebar from "@/components/userComponents/userSideBar/UserSideBar";
import { updateUserAttributes, fetchUserAttributes } from "aws-amplify/auth";
import UserNavBar from "@/components/userComponents/userNavBar/UserNavBar";

export const Contexto = createContext();

const UserLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(null);
  const [technicianActivityStatus, setTechnicianActivityStatus] = useState(null);

  const handleChangeStatus = async () => {
    try {
      const attributes = await updateUserAttributes({
        userAttributes: {
          ["custom:isOnline"]: isOnline ? "false" : "true",
        },
      });
      setIsOnline(!isOnline);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveOneUser = async () => {
    setLoading(true);
    try {
      const userInfo = await fetchUserAttributes();
      setUser({ ...userInfo });
      console.log("Este es el coso del tecnico", userInfo.sub);
      setIsOnline(userInfo["custom:isOnline"] === "true" ? true : false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  useEffect(() => {
    retrieveOneUser();
  }, []);

  return (
    <div className="w-full h-screen bg-zinc-900">
      {loading ? (
        <div className="text-white"></div>
      ) : (
        user && (
          <div className={`w-full h-full flex justify-center items-center p-0 ${technicianActivityStatus === "waitingResponse" ? "relative" : ""}`}>
            {
                technicianActivityStatus === "waitingResponse" &&
                <div className="text-white font-bold text-[17px] flex flex-col absolute bottom-3 right-3 border-[2px] border-emerald-400 bg-emerald-600 shadow-emerald-500/20 shadow-lg w-[250px] h-[80px] z-50 rounded-md p-3">
                    <div className="flex w-full gap-x-2 items-center">Client reviewing offer <img src="/loading/loading4.gif" className="w-[25px] h-[25px]"/></div>
                    <u className="cursor-pointer text-[15px] text-zinc-100">Go to the Offer</u>
                </div>
            }
            <UserSidebar user={user} />
            <div className="flex-1 flex flex-col h-screen">
              <UserNavBar
                user={user}
                isOnline={isOnline}
                handleChangeStatus={handleChangeStatus}
              />
              <Contexto.Provider
                value={{
                  user,
                  loading,
                  isOnline,
                  handleChangeStatus,
                  retrieveOneUser,
                  setTechnicianActivityStatus
                }}
              >
                {children}
              </Contexto.Provider>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default UserLayout;
