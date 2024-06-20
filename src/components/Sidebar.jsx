"use client";
import React, { useContext, useEffect, useState } from "react";
import { signOut } from "aws-amplify/auth";
import Link from "next/link";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaUserGear,
  FaChartSimple,
  FaGear,
  FaBars,
  FaFlag,
  FaRightFromBracket,
  FaComments,
  FaRegMoon,
  FaHouse,
  FaUserGroup,
} from "react-icons/fa6";
import { getUserByMail } from "@/api";
import Image from "next/image";
import { UserContext } from "@/contexts/user/UserContext";
export const Sidebar = () => {

  const { logout } = useContext(UserContext);
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    profilePictire: ""
  });
  const [theme, setTheme] = useState("light");
  useEffect(() => {

    if (theme === "dark") {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark')
    }

  }, [theme]);

  const handleChangeTheme = () => {

    setTheme(prevTheme => prevTheme === "light" ? "dark" : 'light');

  };
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
      className={`sidebar bg-gray-100 dark:bg-zinc-800 text-white transition-all ease-out duration-500 ${active ? "active" : null
        }`}
    >
      <div className="flex flex-col items-center py-4 relative h-full px-4 font-semibold">
        <div
          className={`w-full flex flex-row items-center ${active ? "justify-between" : "justify-center"
            }`}
        >
          <FaBars
            id="btn"
            onClick={toggleSidebar}
            className="text-xl cursor-pointer transition-all ease-in-out hover:-translate-y-1 hover:scale-110 text-zinc-600 dark:text-white font-black"
          />
          <p
            className={`font-black text-lg tracking-normal text-zinc-600 dark:text-white ${active ? "block" : "hidden"
              }`}
          >
            Panda CMS
          </p>
          <Image
            src="/panda.png"
            className={`w-[3rem] h-[3rem] drop-shadow-lg  ${active ? "block" : "hidden"
              }`}
            width={150}
            height={150}
            alt="panda_logo"
          />
        </div>
        <p className="my-4 tracking-[0.5em] text-zinc-600 font-black dark:text-white">
          ACE{active ? "SS" : ""}
        </p>
        <Separator />
        <ul
          className={`bg-zinc-600 dark:bg-green-panda shadow-sm transition-all rounded-md p-3 mt-4 ${active && "w-full"
            }`}
        >
          <Link
            href={`/admin-dashboard/customers`}
            className="flex gap-3 items-center"
          >
            <FaUser className="text-xs 2xl:text-base transition-all ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
            <p className={`text-xs 2xl:text-base  ${!active && "hidden"}`}>
              Customers
            </p>
          </Link>
          <Link
            href={`/admin-dashboard/technicians`}
            className="flex gap-3 items-center mt-5"
          >
            <FaUserGear className="text-xs 2xl:text-base transition-all ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
            <p className={`text-xs 2xl:text-base ${!active && "hidden"}`}>
              Technicians
            </p>
          </Link>
          <Link
            href={`/admin-dashboard/admins`}
            className="flex gap-3 items-center mt-5"
          >
            <FaUserGroup className="text-xs 2xl:text-base transition-all ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
            <p className={`text-xs 2xl:text-base  ${!active && "hidden"}`}>
              Admins
            </p>
          </Link>
        </ul>
        <div className="w-full px-4 absolute bottom-4 transition-all">
          <div className="bg-zinc-600 dark:bg-green-panda shadow-sm p-3 rounded-md my-4">
            <ul className="flex flex-col flex-wrap gap-4">
              <Link href={`/admin-dashboard`} className="flex gap-3 items-center">
                <FaHouse className="text-xs 2xl:text-base transition-all ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
                <p className={`text-xs 2xl:text-base  ${!active && "hidden"}`}>
                  Home
                </p>
              </Link>
              <Link href={`/admin-dashboard/messages`} className="flex gap-3 items-center">
                <FaComments className="text-xs 2xl:text-base transition-all ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
                <p className={`text-xs 2xl:text-base  ${!active && "hidden"}`}>
                  Messages
                </p>
              </Link>
              <Link href={`/admin-dashboard/issues`} className="flex gap-3 items-center">
                <FaFlag className="text-xs 2xl:text-base transition-all ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
                <p className={`text-xs 2xl:text-base  ${!active && "hidden"}`}>
                  Issues
                </p>
              </Link>
              <Link
                href={`/admin-dashboard/graphs`}
                className="flex gap-3 items-center"
              >
                <FaChartSimple className="text-xs 2xl:text-base transition-all ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
                <p className={`text-xs 2xl:text-base  ${!active && "hidden"}`}>
                  Charts
                </p>
              </Link>
              <Link
                href={`/admin-dashboard/settings`}
                className="flex gap-3 items-center"
              >
                <FaGear className="text-xs 2xl:text-base transition-all ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
                <p
                  className={`text-xs 2xl:text-base  transition-all ${!active && "hidden"
                    }`}
                >
                  Configuration
                </p>
              </Link>
              <div onClick={handleChangeTheme} className="flex gap-3 items-center cursor-pointer">
                <FaRegMoon className="text-xs 2xl:text-base transition-all ease-in-out hover:-translate-y-1 hover:scale-110" />
                <p className={`text-xs 2xl:text-base  ${!active && "hidden"}`}>
                  {theme === 'light' ? 'Dark' : 'Light'} Mode
                </p>
              </div>
            </ul>
          </div>

          <div
            className={`bg-zinc-600 dark:bg-green-panda shadow-sm p-3 rounded-md mt-4 transition-all w-full ${active ? "h-[5rem] 2xl:h-[7rem]" : "h-[3rem]"
              }`}
          >
            <div className="flex items-center w-full h-full gap-2">
              <Image
                src={user && user.profilePicture ? user.profilePicture : "/image/defaultProfilePicture.jpg"}
                alt="user_logo"
                width={350}
                height={350}
                className={`rounded-full bg-cover bg-center ${active ? "w-[3rem] h-[3rem]" : "w-[1.8rem] h-[1.5rem]"
                  }`}
              />
              <div className="overflow-hidden flex flex-col gap-1 2xl:gap-2 w-full">
                <p className={` text-sm line-clamp-1 tracking-wider ${!active && "hidden"}`}>{user && reduceName(user?.fullName)}</p>
                <p
                  className={`text-xs text-zinc-300 dark:text-zinc-200 tracking-wider line-clamp-1 ${!active && "hidden"
                    }`}
                >
                  {user && user.email}
                </p>
                <p
                  className={`text-[17px] font-extrabold cursor-pointer ${!active && "hidden"
                    }`}
                  onClick={() => {
                    router.replace("/");
                    signOut();
                    logout();
                  }}
                >
                  <FaRightFromBracket className="rotate-180" />
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
