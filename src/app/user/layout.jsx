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
import ServiceAssignedProvider from "@/contexts/serviceAssigned/ServiceAssignedProvider";
import { ServiceAssignedContext } from "@/contexts/serviceAssigned/ServiceAssignedContext";
import { getProfilePicture } from "@/graphql/users/query/technician";
import UserMobileBar from "@/components/userComponents/userMobileBar/UserMobileBar";

export const Contexto = createContext();

const UserLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [technicianActivityStatus, setTechnicianActivityStatus] =
    useState(null);

  const {
      serviceAssigned,
      setServiceAssigned,
      setTechnicianActivityStatus: setContextTechnicianActivityStatus,
      setLoading: setContextLoading,
  } = useContext(ServiceAssignedContext);

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
      const {data} = await client.graphql({
        query: getProfilePicture,
        variables: {
          id: userInfo.sub,
        },
      });
      const profilePictureUrl = data?.getTechnician?.profilePicture;
      setUser({ ...userInfo, profilePictureUrl: profilePictureUrl });
      console.log("Este es el coso del tecnico", userInfo.sub);
      setIsOnline(userInfo["custom:isOnline"] === "true" ? true : false);
    } catch (error) {
      console.log("error", error);
      // setError(error);
    }
  };

  useEffect(() => {
    setContextLoading(true);
    setLoading(true);
    retrieveOneUser();
    const storedService = localStorage.getItem("serviceAssigned");
    if (storedService) {
      setServiceAssigned(JSON.parse(storedService));
      setTechnicianActivityStatus("assigned");
      onAssignedTechnicianModalOpen();
    }
    setContextLoading(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!user) {
      console.log("No hay user o servicioAssigned");
      return;
    }
  
    console.log("este es el id del tecnico", user.sub);
    console.log("Este es el id del servicio asignado", serviceAssigned?.id);
  
    const subscription = client
      .graphql({
        query: listenUpdateService,
        variables: { serviceId: serviceAssigned?.id, technicianId: user.sub },
      })
      .subscribe({
        next: ({ data }) => {
          console.log("este es el id del tecnico dentro de la suscripcion", user.sub);
          console.log("Este es el id del servicio asignado dentro de la suscripcion", serviceAssigned?.id);
          console.log("data recibida en suscripción", data);
          if (data?.onUpdateService) {
            setServiceAssigned(data.onUpdateService);
            setTechnicianActivityStatus("assigned");
            onAssignedTechnicianModalOpen();
          } else {
            console.log("No se recibieron datos de actualización");
          }
        },
        error: (error) => console.log("error en la suscripción", error),
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [user, serviceAssigned?.id]); 

  return (
    <div className="w-full h-screen dark:bg-zinc-900 bg-zinc-100 ">
      <Contexto.Provider
        value={{
          user,
          loading,
          isOnline,
          handleChangeStatus,
          retrieveOneUser,
          setTechnicianActivityStatus,
          theme
        }}
      >
          <PlaceTechnicianProvider>
            {loading ? (
              <div className="text-white dark:bg-zinc-900 bg-zinc-900 w-full h-screen"></div>
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
                  <div className="flex-1 flex flex-col h-screen dark:bg-zinc-950 bg-zinc-100 transition-all">
                    <UserNavBar
                      user={user}
                      isOnline={isOnline}
                      handleChangeStatus={handleChangeStatus}
                      theme={theme}
                      setTheme={setTheme}
                    />
                    {children}
                    <UserMobileBar user={user}/>
                  </div>
                  <AssignedTechnicianModal
                    isOpen={isAssignedTechnicianModalOpen}
                    onOpenChange={onAssignedTechnicianModalOpenChange}
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
