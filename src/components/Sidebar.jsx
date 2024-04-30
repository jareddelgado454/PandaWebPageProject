"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "aws-amplify/auth";
import Link from "next/link";
import Cookies from "js-cookie";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaUserGear,
  FaUserPen,
  FaChartSimple,
  FaGear,
  FaBars,
  FaFlag,
} from "react-icons/fa6";
import { getUserByMail } from "@/api";
export const Sidebar = () => {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    profilePictire: ""
  });
  const toggleSidebar = () => {
    setActive(!active);
  };
  function reduceName(name) {
    if (name.length > 10) { 
      return name.slice(0, 17) + '...';
    } else {
      return name;
    }
  }
  const handleFetchUserAttributes = async () => {
    try {
      const { email } = await fetchUserAttributes();
      const userDB = await getUserByMail(email);
      await setUser(userDB);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFetchUserAttributes();
  }, []);
  return (
    <div
      className={`sidebar bg-gray-100 dark:bg-zinc-800 text-white transition-all ease-out duration-500 ${
        active ? "active" : null
      }`}
    >
      <div className="flex flex-col items-center py-4 relative h-full px-4">
        <div
          className={`w-full flex flex-row items-center ${
            active ? "justify-between" : "justify-center"
          }`}
        >
          <FaBars
            id="btn"
            onClick={toggleSidebar}
            className="text-xl cursor-pointer transition-all ease-in-out hover:-translate-y-1 hover:scale-110 text-zinc-600 dark:text-white font-black"
          />
          <p
            className={`font-black drop-shadow-xl tracking-wider text-zinc-600 dark:text-white ${
              active ? "block" : "hidden"
            }`}
          >
            Panda CMS
          </p>
          <img
            src="/panda.png"
            className={`w-[5rem] h-[4rem] drop-shadow-lg  ${
              active ? "block" : "hidden"
            }`}
            alt="panda_logo"
          />
        </div>
        <p className="my-4 tracking-[0.5em] text-zinc-600 font-bold dark:text-white">
          ACE{active ? "SS" : ""}
        </p>
        <Separator />
        <ul
          className={`bg-zinc-600 dark:bg-green-panda shadow-xl transition-all rounded-md p-3 mt-4 ${
            active && "w-full"
          }`}
        >
          <Link
            href={`/admin-dashboard/customers`}
            className="flex gap-3 items-center"
          >
            <FaUser className="text-xl transition-all ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
            <p className={`text-xl font-medium ${!active && "hidden"}`}>
              Customers
            </p>
          </Link>
          <Link
            href={`/admin-dashboard/technicians`}
            className="flex gap-3 items-center mt-5"
          >
            <FaUserGear className="text-xl transition-all ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
            <p className={`text-xl font-medium ${!active && "hidden"}`}>
              Technicians
            </p>
          </Link>
          <Link
            href={`/admin-dashboard/users`}
            className="flex gap-3 items-center mt-5"
          >
            <FaUserPen className="text-xl transition-all ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
            <p className={`text-xl font-medium ${!active && "hidden"}`}>
              Users
            </p>
          </Link>
        </ul>
        <div className="w-full px-4 absolute bottom-4 transition-all">
          <div className="bg-zinc-600 dark:bg-green-panda shadow-xl p-3 rounded-md mb-4">
            <ul className="flex flex-col flex-wrap gap-4">
              <Link href={`/admin-dashboard/issues`} className="flex gap-3 items-center">
                <FaFlag className="text-xl transition-all ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
                <p className={`text-xl font-medium ${!active && "hidden"}`}>
                  Issues
                </p>
              </Link>
              <Link
                href={`/admin-dashboard/graphs`}
                className="flex gap-3 items-center"
              >
                <FaChartSimple className="text-xl transition-all ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
                <p className={`text-xl font-medium ${!active && "hidden"}`}>
                  Charts
                </p>
              </Link>
              <Link
                href={`/admin-dashboard/settings`}
                className="flex gap-3 items-center"
              >
                <FaGear className="text-xl transition-all ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
                <p
                  className={`text-xl font-medium transition-all ${
                    !active && "hidden"
                  }`}
                >
                  Configuration
                </p>
              </Link>
            </ul>
          </div>
          <Separator />
          <div
            className={`bg-zinc-600 dark:bg-green-panda shadow-xl p-3 rounded-md mt-4 transition-all w-full ${
              active ? "h-[7rem]" : "h-[3rem]"
            }`}
          >
            <div className="flex items-center w-full h-full gap-2">
              <img
                src={user && user.profilePicture ? user.profilePicture : "/image/defaultProfilePicture.jpg"}
                alt="user_logo"
                className={`rounded-full ${
                  active ? "w-[4rem] h-[3rem]" : "w-[2rem] h-[1.8rem]"
                }`}
              />
              <div className="overflow-hidden flex flex-col gap-1 w-full">
                <p className={`font-medium text-sm ${!active && "hidden"}`}>{user && reduceName(user?.fullName)}</p>
                <p
                  className={`text-xs text-gray-100 tracking-wide ${
                    !active && "hidden"
                  }`}
                >
                  {user && user.email}
                </p>
                <p
                  className={`text-[17px] font-extrabold cursor-pointer ${
                    !active && "hidden"
                  }`}
                  onClick={() => {
                    signOut();
                    Cookies.remove("currentUser");
                  }}
                >
                  logout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Separator = () => {
  return <div className="w-full h-[2px] bg-zinc-600 dark:bg-white" />;
};
