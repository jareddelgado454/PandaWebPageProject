"use client";

import "aws-amplify/auth/enable-oauth-listener";
import React, { useContext, useEffect, useState } from "react";
import {
  RiTeamFill,
  RiToolsFill,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import {
  fetchUserAttributes,
  fetchAuthSession,
  updateUserAttributes,
} from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import loading3 from "../../../../public/loading/loading3.gif"
import { Button } from "@nextui-org/react";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
import { getCustomerById, getTechnicianById, handleCreateCustomerOnDataBase, handleCreateTechnicianOnDataBase } from "@/api";
import Image from "next/image";
import { UserContext } from "@/contexts/user/UserContext";
Amplify.configure(config);
const CallbackPage = () => {
  const { login } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectingCustomer, setSelectingCustomer] = useState(false);
  const [selectingTechnician, setSelectingTechnician] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const retrieveDataUser = async () => {
      try {
        const fetchedUser = await fetchUserAttributes();
        const userRole = fetchedUser["custom:role"];
        setUser(fetchedUser);
        if (userRole) {
          const { tokens, userSub } = await fetchAuthSession({ forceRefresh: true });
          const expiredAt = tokens.accessToken.payload.exp;
          let data;
          switch (userRole) {
            case "technician":
              console.log("Antes de tecnico")
              data = await getTechnicianById(userSub);
              login({ role:userRole , expiredAt, id: userSub, ...data });
              router.push("/user");
              break;
            case "customer":
              console.log("Antes de Cliente")
              data = await getCustomerById(userSub);
              login({ role: userRole, expiredAt, id: userSub, ...data });
              router.push("/customer");
              break;
            case "admin":
              console.log("Antes de Admin")
              login({ role: userRole, expiredAt, id: userSub })
              router.push("/admin-dashboard");
              break;
            default:
              router.push("/");
              break;
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    retrieveDataUser();
  }, []);

  const selectTechnicianHandle = async () => {
    setSelectingTechnician(true);
    try {
      const { data } = await handleCreateTechnicianOnDataBase({
        id: user?.sub,
        email: user?.email,
        fullName: user?.name,
      });
      await updateUserAttributes({
        userAttributes: {
          "custom:role": "technician",
          "custom:infoCompleted" : "false",
          "custom:termsAccepted": "false",
          "custom:profileCompleted": "false",
          "custom:subscription" : "free",
          "custom:fee" : "10"
        },
      });
      const { tokens, userSub } = await fetchAuthSession({ forceRefresh: true });
      const expiredAt = tokens.accessToken.payload.exp;
      login({ role: "technician", expiredAt, id: userSub });
      router.replace("/user");
      setSelectingTechnician(false);
    } catch (error) {
      console.log(error);
      setSelectingTechnician(false);
    }
  };

  const selectCustomerHandle = async () => {
    setSelectingCustomer(true);
    try {
      
      const result = await handleCreateCustomerOnDataBase({
        id: user?.sub,
        email: user?.email,
        fullName: user?.name,
      });

      await updateUserAttributes({
        userAttributes: {
          "custom:role": "customer",
          "custom:termsAccepted": "false",
          "custom:profileCompleted": "false"
        },
      });
      const { tokens } = await fetchAuthSession({ forceRefresh: true });
      const expiredAt = tokens.accessToken.payload.exp;
      login({ role : "customer" , expiredAt, id: result.createCustomer.id })
      router.replace("/customer");
      setSelectingCustomer(false);
    } catch (error) {
      console.log(error);
      setSelectingCustomer(false);
    }
  };



  return (
    <div className="bg-gradient-to-b from-zinc-900 to-zinc-800 h-[calc(100vh-80px)] text-white ">
      {loading ? (
        <div className="w-full h-full flex flex-col justify-center pb-[200px] items-center">
          <div className="relative w-[600px] h-[200px]  flex items-center justify-center">
            <Image 
              src={loading3}
              quality={100}
              alt="loading_image"
              unoptimized
              className="w-[100px] h-[100px]"
            />
            <h3 className="text-[40px] text-center font-bold text-gray-100 absolute bottom-2 left-0 w-full">Almost done! wait please.</h3>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full text-center text-zinc-300 font-semibold mb-8 pt-6 text-[30px]">
            Welcome{" "}
            <span className="text-white font-extrabold">
              {user.name ? user.name : ""}
            </span>{" "}
            to THE PANDA, choose your account type to continue.
          </div>
          <div className="w-[900px] flex justify-around">
            <div className="w-[400px] flex flex-col p-3 h-[500px] bg-emerald-600 border-[2px] border-emerald-600 rounded-3xl shadow-lg hover:scale-110 transform transition duration-500 ease-in-out">
              <div className="w-full text-center text-[25px] pt-4 font-bold text-white">
                CUSTOMER
              </div>
              <div className="w-full text-center text-[13px] font-bold text-emerald-200 mb-4">
                The panda account
              </div>
              <div className="w-full flex justify-center mb-4">
                <RiTeamFill className="text-[120px] text-emerald-400" />
              </div>
              <div className="mb-6">
                <span className="flex gapx-x-3 text-[15px] mb-2">
                  {" "}
                  <RiCheckboxCircleFill className="text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 " />{" "}
                  Repair your car.
                </span>
                <span className="flex gapx-x-3 text-[15px] mb-2">
                  {" "}
                  <RiCheckboxCircleFill className="text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 " />{" "}
                  Request towing Service .
                </span>
                <span className="flex gapx-x-3 text-[15px] mb-2">
                  {" "}
                  <RiCheckboxCircleFill className="text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 " />{" "}
                  Choose between the offers of the best technicians.
                </span>
              </div>
              <Button
                isDisabled = {selectingTechnician || selectingCustomer}
                isLoading = {selectingCustomer}
                onClick={()=>selectCustomerHandle()}
                className={`bg-emerald-200 hover:bg-emerald-300 transition-colors text-emerald-800 w-full font-bold rounded-xl text-center py-3`}
              >
                Continue
              </Button>
            </div>
            <div className="w-[400px] h-[500px] p-3 flex flex-col bg-zinc-800 border-[2px] border-zinc-800 rounded-3xl shadow-lg hover:scale-110 transform transition duration-500 ease-in-out">
              <div className="w-full text-center text-[25px] pt-4 text-emerald-300 font-bold">
                TECHNICIAN
              </div>
              <div className="w-full text-center text-[13px] font-bold text-zinc-300 mb-4">
                The panda account
              </div>
              <div className="w-full flex justify-center mb-4">
                <RiToolsFill className="text-[120px] text-zinc-600" />
              </div>
              <div className="mb-6">
                <span className="flex gapx-x-3 text-[15px] mb-2">
                  {" "}
                  <RiCheckboxCircleFill className="text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 " />{" "}
                  The best app for your bussiness{" "}
                </span>
                <span className="flex gapx-x-3 text-[15px] mb-2">
                  {" "}
                  <RiCheckboxCircleFill className="text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 " />{" "}
                  Maximize the efficiency of your business .
                </span>
                <span className="flex gapx-x-3 text-[15px] mb-2">
                  {" "}
                  <RiCheckboxCircleFill className="text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 " />{" "}
                  Quickly contact people who need to repair their car.
                </span>
              </div>
              <Button
                isDisabled = {selectingTechnician || selectingCustomer}
                isLoading = {selectingTechnician}
                onClick={() => selectTechnicianHandle()}
                className={`bg-zinc-600 hover:bg-zinc-700 transition-colors text-emerald-200 w-full font-bold rounded-xl text-center py-3`}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallbackPage;
