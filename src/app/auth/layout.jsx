"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
const AuthLayout = ({ children }) => {
  const pathname = usePathname();
  const isCallbackPage = pathname === "/auth/callback-page";
  return (
    <div className="h-full">
      <nav className="bg-zinc-900 top-0 w-full p-3 py-4 flex justify-center z-40">
        <div className="md:flex hidden items-center">
          <div className="flex gap-x-2 items-center">
            <Image
              src="/panda.png"
              className="w-[4rem] h-[3rem] drop-shadow-lg"
              width={50}
              height={50}
              priority
              alt="panda_logo"
            />
            <p className="font-bold drop-shadow-xl tracking-wider text-[22px] text-white text-center">
              Panda Admins
            </p>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default AuthLayout;
