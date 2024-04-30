"use client";

import "aws-amplify/auth/enable-oauth-listener";
import React, { useEffect, useState } from "react";
import {
  RiTeamFill,
  RiToolsFill,
  RiCheckboxCircleFill,
  RiVipCrownFill,
} from "react-icons/ri";
import {
  getCurrentUser,
  fetchUserAttributes,
  fetchAuthSession,
  updateUserAttributes,
} from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
import { handleCreateTechnicianOnDataBase } from "@/api";
Amplify.configure(config);

const CallbackPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const retrieveDataUser = async () => {
      try {
        console.log("before query");
        const fetchedUser = await fetchUserAttributes();
        console.log(fetchedUser.name);
        const userRole = fetchedUser["custom:role"];
        console.log(fetchedUser);
        setUser(fetchedUser);
        if (userRole) {
          console.log("Is stored in database");
          const { tokens } = await fetchAuthSession({ forceRefresh: true });
          const expiredAt = tokens.accessToken.payload.exp;
          Cookies.set(
            "currentUser",
            JSON.stringify({ role: userRole, expiredAt })
          );
          switch (userRole) {
            case "technician":
              router.push("/user");
              break;
            case "customer":
              router.push("/user");
              break;
            case "admin":
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
    setSelecting(true);
    try {
      const { data } = await handleCreateTechnicianOnDataBase({
        id: user?.sub,
        email: user?.email,
        fullName: user?.name,
      });
      console.log("Stored in database")

      await updateUserAttributes({
        userAttributes: {
          "custom:role": "technician",
        },
      });
      console.log("Stored role in cognito")

      const { tokens } = await fetchAuthSession({ forceRefresh: true });
      const expiredAt = tokens.accessToken.payload.exp;

      Cookies.set("currentUser", JSON.stringify({ role : "technician" , expiredAt }));
      setSelecting(false);
      router.replace("/user");

    } catch (error) {
      console.log(error);
      setSelecting(false);
    }
  };

  return (
    <div className="bg-zinc-900 h-[calc(100vh-80px)] text-white ">
      {loading ? (
        <h4>Preparing your account...</h4>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full text-center text-zinc-300 font-semibold mb-8 pt-4 text-[30px]">
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
                  Jkafjals asndb adsmn alsd
                </span>
                <span className="flex gapx-x-3 text-[15px] mb-2">
                  {" "}
                  <RiCheckboxCircleFill className="text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 " />{" "}
                  Jkafjals jfaskdasg .
                </span>
                <span className="flex gapx-x-3 text-[15px] mb-2">
                  {" "}
                  <RiCheckboxCircleFill className="text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 " />{" "}
                  Jkafjals jfaskdasg kajsdg ioasdv ajhsdasj faksjd ahmgsdv asd.
                </span>
              </div>
              <button
                className={`bg-emerald-200 hover:bg-emerald-300 transition-colors text-emerald-800 w-full font-bold rounded-xl text-center py-3`}
              >
                Continue
              </button>
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
                  Jkafjals ahjsd jnd asjdkg{" "}
                </span>
                <span className="flex gapx-x-3 text-[15px] mb-2">
                  {" "}
                  <RiCheckboxCircleFill className="text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 " />{" "}
                  Jkafjals jfaskdasg .
                </span>
                <span className="flex gapx-x-3 text-[15px] mb-2">
                  {" "}
                  <RiCheckboxCircleFill className="text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 " />{" "}
                  Jkafjals jfaskdasg kajsdg ioasdv ajhsdasj faksjd ahmgsdv asd.
                </span>
              </div>
              <button
                onClick={() => selectTechnicianHandle()}
                className={`bg-zinc-600 hover:bg-zinc-700 transition-colors text-emerald-200 w-full font-bold rounded-xl text-center py-3`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallbackPage;
