"use client";

import React, { useState, useEffect } from "react";
import {
  RiSearchLine,
  RiNotification3Fill,
  RiSunFill,
  RiMoonFill,
  RiCalendarTodoFill,
} from "react-icons/ri";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import { signOut } from "aws-amplify/auth";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { updateUserAttributes } from "aws-amplify/auth";
import { usePathname } from "next/navigation";

const UserNavBar = ({
  user,
  isOnline,
  handleChangeStatus,
  theme,
  setTheme,
}) => {
  const [pathname, setPathname] = useState(null);
  const thepathName = usePathname();
  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    setPathname(thepathName);
    return () => setPathname(null);
  }, [thepathName]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const getCurrentDate = () => {
    const today = new Date();
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(today);
  };

  return (
    <div className="w-full sm:h-[80px] h-[60px] sm:bg-transparent sm:dark:bg-transparent dark:bg-zinc-900 bg-emerald-600 flex items-center justify-between sm:px-8 px-3 lg:pl-8 sm:pl-[105px] pl-3">
      {!pathname ? (
        <div>loading</div>
      ) : pathname === "/user/requests" ? 
          <div className="text-[20px] flex justify-center font-bold dark:text-white sm:dark:text-white sm:text-black text-white">
            Requests
          </div> :  pathname === "/user/finances" ? <div className="text-[20px] flex justify-center font-bold dark:text-white sm:dark:text-white sm:text-black text-white">
            Finances
          </div> : (
        <div className="text-[20px] flex flex-col justify-center font-bold dark:text-white sm:dark:text-white sm:text-black text-white">
          <span className="text-[13px]">Dashboard</span>
          <div>
            Welcome Back,{" "}
            <span className="ml-1">
              {user["custom:fullName"]
                ? user["custom:fullName"].split(" ").slice(0, 1)
                : user.name.split(" ").slice(0, 1)}
            </span>
            !
          </div>
        </div>
      )}

      <div className="flex gap-x-3 items-center ">
        <div className="lg:flex hidden">
          {isOnline ? (
            <span className="dark:text-emerald-300 text-emerald-800 text-[17px]  font-bold">
              Online
            </span>
          ) : (
            <span className="dark:text-zinc-400 text-zinc-950 font-bold text-[16px]">
              Off-Line
            </span>
          )}
        </div>
        <div
          onClick={() => handleChangeStatus()}
          className={`w-[55px] h-[30px] lg:flex hidden items-center rounded-full ${
            isOnline
              ? "dark:bg-emerald-500 bg-zinc-700 border-[2px] darK:border-emerald-500 border-zinc-800 justify-end p-[2px]"
              : "border-[2px] dark:border-zinc-500 border-zinc-700 dark:bg-zinc-700 bg-zinc-400/50 justify-start p-[4px]"
          }  cursor-pointer`}
        >
          <motion.div
            transition={{ type: "spring", damping: 30, stiffness: 700 }}
            animate={{
              height: isOnline ? "26px" : "15px",
              width: isOnline ? "26px" : "15px",
              backgroundColor:
                theme === "dark"
                  ? isOnline
                    ? "#191C1F"
                    : "#61666C"
                  : isOnline
                  ? "#FFFFFF"
                  : "#61666C",
            }}
            className="rounded-full"
          />
        </div>

        <div className="rounded-full w-[45px] h-[45px] dark:bg-zinc-800/80 bg-zinc-400/70 lg:flex hidden items-center justify-center cursor-pointer">
          <RiNotification3Fill className="text-[20px] dark:text-white text-zinc-800" />
        </div>
        <div
          onClick={handleChangeTheme}
          className="rounded-full w-[45px] h-[45px] sm:dark:bg-zinc-800/80 dark:bg-zinc-700/80 sm:bg-zinc-400/70 bg-emerald-300/60 flex items-center justify-center cursor-pointer mr-[10px]"
        >
          {theme === "dark" ? (
            <RiSunFill className="text-[20px] dark:text-white text-zinc-800" />
          ) : (
            <RiMoonFill className="text-[20px] dark:text-white text-zinc-800" />
          )}
        </div>
        {/* <div className="border-l-[2px] border-zinc-700 flex items-center justify-center pl-3">
          <Dropdown placement="bottom-start" className="">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: `${user.profilePictureUrl ? user.profilePictureUrl :"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}`,
                }}
                className="transition-transform "
                description={user['custom:role']}
                name={user["custom:fullName"] ? user["custom:fullName"].split(' ').slice(0, 2).join(' ') : user.name.split(' ').slice(0, 2).join(' ')}
              ></User>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="User Actions"
              variant="flat"
              className=" "
            >
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-extralight text-sm">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">
                <Link
                  href={"/user"}
                >
                  My Profile
                </Link>
              </DropdownItem>
              <DropdownItem key="support">Contact Support</DropdownItem>
              <DropdownItem key="review">Review & Feedback</DropdownItem>
              <DropdownItem
                key="logout"
                className="dark:text-emerald-400 text-emerald-500"
                onClick={() => {
                  signOut();
                  // setIsLoggedIn(false);
                  Cookies.remove("currentUser");
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div> */}
        <div className="md:flex hidden w-[150px]  justify-center items-center dark:bg-zinc-800/80 bg-zinc-300 rounded-full h-[45px] transition-all">
          <div className="w-[45px] h-[45px] border-[2px] transition-all dark:border-emerald-600 border-zinc-200 text-white dark:bg-emerald-600 bg-zinc-900 rounded-full flex items-center justify-center">
            <RiCalendarTodoFill className="text-[30px]" />
          </div>
          <div className="flex-1 justify-center items-center text-[14px] font-bold  text-center">
            {getCurrentDate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavBar;
