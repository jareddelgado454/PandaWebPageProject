"use client";
import React from "react";
import {
  RiUserFill,
  RiCalendarTodoFill,
  RiDashboardFill,
  RiLogoutCircleLine,
  RiSettings4Fill,
  RiArrowDownSFill,
  RiArrowRightCircleLine,
  RiHome3Fill,
  RiArrowRightSLine,
} from "react-icons/ri";
import Image from "next/image";
import { signOut } from "aws-amplify/auth";
import { usePathname } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import Link from "next/link";
import userDefaultProfilePicture from "../../../../public/image/defaultProfilePicture.jpg"

const UserMobileBar = ({ user }) => {
  const pathname = usePathname();
  return (
    <div className="w-full sm:hidden flex items-center justify-center h-[60px] min-h-[60px] dark:bg-zinc-900 bg-zinc-100 transition-all">
      <Link href={"/user"} className="w-1/4 flex flex-col justify-center items-center">
        <div className={`w-[35px] h-[22px] ${pathname === "/user" ? "dark:bg-zinc-700 bg-zinc-300" : "" } rounded-lg flex items-center justify-center`}>
          <RiHome3Fill className="text-[17px] cursor-pointer" />
        </div>  
        <span className="text-[10px]">Home</span>
      </Link>
      <Link href={"/user/requests"} className="w-1/4 flex flex-col justify-center items-center">
        <div className={`w-[35px] h-[22px] ${pathname === "/user/requests" ? "dark:bg-zinc-700 bg-zinc-300" : "" } rounded-lg flex items-center justify-center`}>
          <RiArrowRightCircleLine className="text-[17px] cursor-pointer" />
        </div>   
        <span className="text-[10px]">Requests</span>
      </Link>
      <Link href={"/user/finances"} className="w-1/4 flex flex-col justify-center items-center">
        <div className={`w-[35px] h-[22px] ${pathname === "/user/finances" ? "dark:bg-zinc-700 bg-zinc-300" : "" } rounded-lg flex items-center justify-center`}>
          <RiDashboardFill className="text-[17px] cursor-pointer" />
        </div>
        <span className="text-[10px]">Finances</span>
      </Link>
      <div className="w-1/4 flex flex-col justify-center items-center">
        <Dropdown>
          <DropdownTrigger>
            <Image
              src={
                user.profilePictureUrl
                  ? user.profilePictureUrl
                  : userDefaultProfilePicture
              }
              alt={`profile picture`}
              width={30}
              height={30}
              className="rounded-full object-cover shadow-md cursor-pointer"
            />
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownSection title="Actions" showDivider>
              <DropdownItem
                key="new"
                description="Go to the profile page"
                startContent={<RiUserFill className="text-[19px]"/>}
              >
                <Link href={"/user/personal-information"}>
                    My Profile
                </Link>
              </DropdownItem>
              <DropdownItem
                key="copy"
                description="Go to my schedule"
                startContent={<RiCalendarTodoFill className="text-[19px]"/>}
              >
                <Link href={"/user/schedule"}>
                    My Schedule
                </Link>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Exit">
              <DropdownItem
                key="delete"
                className="text-emerald-500"
                description="End the session"
                startContent={<RiLogoutCircleLine className="text-[19px] text-emerald-500"/>}
                onClick={async()=>await signOut()}
              >
                Logout
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default UserMobileBar;
