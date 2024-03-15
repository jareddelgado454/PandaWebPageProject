"use client";
import React, {useState, useEffect} from "react";
import LandingNavBar from "../components/LandingNavBar";
import Link from "next/link";
import { Hub } from "aws-amplify/utils";
import { signInWithRedirect, signOut, getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import SignInModal from "@/components/LoginRegister/modals/SignInModal";
import { useDisclosure } from "@nextui-org/react";
const Home = () => {
  const {isOpen: isSignInModalOpen, onOpen: onSignInModalOpen, onOpenChange: onSignInModalOpenChange} = useDisclosure();
  return (
    <div className="flex flex-col w-full p-0 bg-zinc-800 h-screen">
      <div className="w-full h-full">
        <div className="w-full h-[750px] relative">
          <LandingNavBar onSignInModalOpen={onSignInModalOpen}/>
          <div className="absolute top-[30%] left-[20%] flex flex-col text-left z-30">
              <h1 className=" text-[40px] text-left mb-1 text-white/90 font-extrabold ">
                <span className="text-emerald-400/90 text-[80px]">Getting</span>{" "}
                your car repaired
              </h1>
              <p className=" mb-7 text-left  text-[30px] text-white/90">
                Has never been{" "}
                <span className="text-emerald-400/90 font-extrabold text-[40px]">
                  EASIER
                </span>
              </p>
              <p className="text-gray-100 text-[22px] font-bold">Changing the auto repair industry by</p>
              <p className="text-gray-100 text-[22px] font-bold mb-8">placing power in the small business owner`s hands.</p>
              <div className="flex items-center gap-x-4">
                <Link href="/auth" className='px-9 py-3 font-semibold border-[2px] rounded-lg text-white border-emerald-500 bg-emerald-500 text-[20px] hover:bg-emerald-300 hover:border-emerald-300 hover:text-zinc-950 transition delay-50'>
                    Start here
                </Link>

                <Link href="/auth" className='px-5 py-3 font-semibold border-[2px] rounded-lg text-emerald-300 border-emerald-500 bg-transparent text-[20px] hover:bg-emerald-300 hover:border-emerald-300 hover:text-zinc-950 transition delay-50'>
                  Why the panda? 
                </Link>

              </div>
          </div>
          <div className="absolute w-full h-dvh bg-gray-800 opacity-70"></div>
          <img
            className="w-full h-dvh object-cover"
            src="https://cdna.artstation.com/p/assets/images/images/040/174/900/large/fabian-geyer-wideshotright.jpg?1628083532"
          />
        </div>
      </div>
      <SignInModal isOpen={isSignInModalOpen} onOpenChange={onSignInModalOpenChange}/>
    </div>
  );
}

export default Home;