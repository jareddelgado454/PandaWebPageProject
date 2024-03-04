"use client";
import React from "react";
import {  } from "@apollo/experimental-nextjs-app-support/ssr";
import LandingNavBar from "../components/LandingNavBar";
import {
  RiGoogleFill,
} from "react-icons/ri";
import LoginFormLanding from "@/components/LoginRegister/Login/LoginFormLanding";

import RegisterFormLanding from "../components/LoginRegister/Register/RegisterFormLanding"
import Link from "next/link";

const Home = () => {

  return (
    <div className="flex flex-col w-full h-screen p-0 overflow-hidden relative">
      <div className="w-full h-full relative overflow-hidden">
        <div className="w-full h-full relative">
          <div className="absolute w-full h-screen bg-gray-800 opacity-70"></div>
          <img
            className="w-full h-full object-cover"
            src="https://cdna.artstation.com/p/assets/images/images/040/174/900/large/fabian-geyer-wideshotright.jpg?1628083532"
          />
        </div>

        <div className="absolute top-0 left-0 w-full h-full custom-gradient">
          <LandingNavBar />
          <div className="flex  w-full px-8 py-10 lg:py-1 text-left ">
            <div className="w-[60%]  flex flex-col text-left">
              <h1 className=" text-[40px] text-left mb-8 text-white/90 font-extrabold shadow-xl">
                <span className="text-emerald-400/90 text-[80px]">Getting</span>{" "}
                your car repaired
              </h1>
              <p className=" mb-10 text-left  text-[30px] text-white/90">
                Has never been{" "}
                <span className="text-emerald-400/90 font-extrabold text-[40px]">
                  EASIER
                </span>
              </p>
            </div>
            <div className="flex flex-1 justify-center">
                <div className="bg-green-panda opacity-90 md:flex-row flex-col flex  border-[1px] border-white/10   rounded-3xl  w-[400px] items-center justify-center">
                  <div className="w-[100%] flex-1 flex flex-col items-center justify-center pt-8 py-4">
                    <h2 className=" text-[32px] text-zinc-800  mb-5 font-extrabold">
                      <span className="text-emerald-900">LOGIN</span> to see more
                    </h2>
                    <button className="w-[50%] bg-emerald-600 hover:bg-emerald-700 transition-colors delay-50  mb-2  hover:text-white text-white rounded-2xl flex gap-x-2 items-center justify-center py-2 px-5">
                      <RiGoogleFill /> Enter with Google
                    </button>
                    <p className="mb-4">Or Sign in with your account</p>            

                    <LoginFormLanding />
        
                    <p className="text-white mb-6 font-bold hover:text-zinc-700 hover:font-bold cursor-pointer transition-colors">
                      Have you forgotten the password?
                    </p>
                    <div className=" border-transparent border-r-[1px] border-r-white/10 flex flex-col items-center justify-center text-center px-8 ">
                      <p className="text-white mb-6">
                        Don't have an account? <Link className="hover:text-zinc-700 text-[18px] font-bold hover:font-bold cursor-pointer" href="/auth" >Sign up free</Link>
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
