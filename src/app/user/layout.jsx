"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import UserSidebar from "@/components/userComponents/userSideBar/UserSideBar";
import { updateUserAttributes, fetchUserAttributes } from "aws-amplify/auth";
import UserNavBar from "@/components/userComponents/userNavBar/UserNavBar";
import { listenUpdateService } from "@/graphql/services/subscriptions/subscription";
import AssignedTechnicianModal from "@/components/serviceRequest/AssignedTechnicianModal";
import { useDisclosure } from "@nextui-org/react";
import { client } from "@/contexts/AmplifyContext";
import "@/app/app.css";
import { PlaceTechnicianProvider } from "@/contexts/placeTechnician/PlaceTechnicianProvider";

export const Contexto = createContext();

const UserLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(null);
  const [technicianActivityStatus, setTechnicianActivityStatus] =
    useState(null);
  const [serviceAssigned, setServiceAssigned] = useState(null);
  const [serviceIdWaitingFor, setServiceIdWaitingFor] = useState(null);
  const {
    isOpen: isAssignedTechnicianModalOpen,
    onOpen: onAssignedTechnicianModalOpen,
    onOpenChange: onAssignedTechnicianModalOpenChange,
  } = useDisclosure();

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
    try {
      const userInfo = await fetchUserAttributes();
      setUser({ ...userInfo });
      console.log("Este es el coso del tecnico", userInfo.sub);
      setIsOnline(userInfo["custom:isOnline"] === "true" ? true : false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    retrieveOneUser();
    const storedService = localStorage.getItem("serviceAssigned");
    if (storedService) {
      setServiceAssigned(JSON.parse(storedService));
      setTechnicianActivityStatus("assigned");
      onAssignedTechnicianModalOpen();
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (serviceIdWaitingFor) {
      console.log("este es el id del tecnico", user.sub);
      const subscription = client
        .graphql({
          query: listenUpdateService,
          variables: { serviceId: serviceIdWaitingFor, technicianId: user.sub },
        })
        .subscribe({
          next: ({ data }) => {
            console.log("dataaaaaaaaaaa", data);
            if(data.onUpdateService.status === "completed"){
              console.log("Completeeeeeeeeeeeeed payment");
            }
            else{
              console.log("esta es la data retornadaaa",data);
              setTechnicianActivityStatus("assigned");
              setServiceAssigned(data.onUpdateService);
              localStorage.setItem("serviceAssigned", JSON.stringify(data.onUpdateService));
              onAssignedTechnicianModalOpen();
            }
          },
          error: (error) => console.warn(error),
        });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user, serviceIdWaitingFor]);

  return (
    <div className="w-full h-screen bg-zinc-900 dark">
      <Contexto.Provider
        value={{
          user,
          loading,
          isOnline,
          handleChangeStatus,
          retrieveOneUser,
          setTechnicianActivityStatus,
          setServiceIdWaitingFor,
        }}
      >
        <PlaceTechnicianProvider>
          {loading ? (
            <div className="text-white"></div>
          ) : (
            user && (
              <div
                className={`w-full h-full flex justify-center items-center p-0 ${
                  technicianActivityStatus === "waitingResponse"
                    ? "relative"
                    : ""
                }`}
              >
                {technicianActivityStatus === "waitingResponse" && (
                  <div className="text-white font-bold text-[17px] flex flex-col absolute bottom-3 right-3 border-[2px] border-emerald-400 bg-emerald-600 shadow-emerald-500/20 shadow-lg w-[250px] h-[80px] z-50 rounded-md p-3">
                    <div className="flex w-full gap-x-2 items-center">
                      Client reviewing offer{" "}
                      <img
                        src="/loading/loading4.gif"
                        className="w-[25px] h-[25px]"
                      />
                    </div>
                    <u className="cursor-pointer text-[15px] text-zinc-100">
                      Go to the Offer
                    </u>
                  </div>
                )}
                <UserSidebar user={user} />
                <div className="flex-1 flex flex-col h-screen">
                  <UserNavBar
                    user={user}
                    isOnline={isOnline}
                    handleChangeStatus={handleChangeStatus}
                  />
                  {children}
                </div>
                <AssignedTechnicianModal
                  isOpen={isAssignedTechnicianModalOpen}
                  onOpenChange={onAssignedTechnicianModalOpenChange}
                  serviceAssigned={serviceAssigned}
                />
              </div>
            )
          )}
        </PlaceTechnicianProvider>
      </Contexto.Provider>
    </div>
  );
};

export default UserLayout;
