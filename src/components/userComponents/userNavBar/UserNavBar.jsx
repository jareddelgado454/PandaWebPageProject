import React from "react";
import { RiSearchLine, RiNotification3Fill, RiSunFill } from "react-icons/ri";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import Link from "next/link";

const UserNavBar = ({user}) => {
  return (
    <div className="w-full h-[80px] flex items-center justify-between ">
      <div className="text-[20px] flex justify-center items-center text-white font-bold">
        Dashboard
      </div>
      <div className="flex gap-x-3 items-center pr-5">
        <div className="relative ">
          <RiSearchLine className="absolute left-2 top-3 text-zinc-400" />
          <input
            type="text"
            name="search"
            className="py-2 pl-8 pr-4 bg-zinc-800 border-[1px] text-white border-zinc-600 focus:border-zinc-300 outline-none rounded-2xl "
            placeholder="Search here..."
          />
        </div>
        <div className="rounded-full w-[45px] h-[45px] bg-zinc-700 flex items-center justify-center cursor-pointer">
          <RiNotification3Fill className="text-[20px] text-white" />
        </div>
        <div className="rounded-full w-[45px] h-[45px] bg-zinc-700 flex items-center justify-center cursor-pointer mr-[10px]">
          <RiSunFill className="text-[20px] text-white" />
        </div>
        <div className="border-l-[2px] border-zinc-700 flex items-center justify-center pl-3">
          <Dropdown placement="bottom-start" className="bg-zinc-800">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                }}
                className="transition-transform text-white"
                description={user['custom:role']}
                name={user['custom:fullName']}
              ></User>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="User Actions"
              variant="flat"
              className="bg-zinc-800 text-white "
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
                className="text-emerald-400"
                onClick={() => {
                  signOut();
                  setIsLoggedIn(false);
                  Cookies.remove("currentUser");
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default UserNavBar;
