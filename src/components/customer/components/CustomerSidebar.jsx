'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { FaCircleExclamation, FaComments, FaHandPointUp, FaHouse, FaKey, FaListCheck, FaRegMoon, FaUserXmark } from "react-icons/fa6";
import { RiUserFill, RiLogoutCircleLine } from "react-icons/ri";
import { Badge, useDisclosure } from "@nextui-org/react";
import { DeleteUserModal, PassWordModal, SendReportModal } from '@/components/modalUser';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { fetchUserAttributes, signOut } from 'aws-amplify/auth';
export default function CustomerSidebar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const { isOpen: isDeleteUserModalOpen, onOpen: onDeleteUserModalOpen, onOpenChange: onDeleteUserModalChange } = useDisclosure();
  const { isOpen: isChangePasswordModalOpen, onOpen: onChangePasswordModalOpen, onOpenChange: onChangePasswordModalChange } = useDisclosure();
  const { isOpen: isSendReportModalOpen, onOpen: onSendReportModalOpen, onOpenChange: onSendReportModalChange } = useDisclosure();
  const retrieveOneUser = async () => {
    setLoading(true);
    try {
      const userInfo = await fetchUserAttributes();
      setUser({ ...userInfo });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }
  useEffect(() => { retrieveOneUser(); }, []);
  return (
    <div
      className="w-full md:w-[21%] 2xl:w-2/12 md:h-[calc(100vh-50px)] 2xl:h-[calc(100vh-100px)] rounded-2xl bg-white shadow-lg dark:bg-zinc-800 flex flex-row lg:flex-col items-center justify-between gap-2 overflow-x-auto md:overflow-x-hidden overflow-y-hidden"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {loading ? (
        <div className='transition-all absolute w-full h-full flex justify-center items-center bg-white/35 top-0'>
          <div className='loader bg-green-pan' />
        </div>
      ) : (
        <>
          <DeleteUserModal isOpen={isDeleteUserModalOpen} onOpenChange={onDeleteUserModalChange} user={user} />
          <PassWordModal isOpen={isChangePasswordModalOpen} onOpenChange={onChangePasswordModalChange} />
          <SendReportModal isOpen={isSendReportModalOpen} onOpenChange={onSendReportModalChange} />

          <div className="w-full flex flex-row lg:flex-col items-center p-4 gap-2 font-medium">
            <h4 className='font-bold text-[#40C48E] w-full text-left mb-2 hidden md:block'>Main Menu</h4>
            <div className='w-full flex flex-col gap-y-2'>
              <Link href={'/customer'} className={`w-full  rounded-md transition-all hover:bg-emerald-500 flex gap-x-2 hover:text-white text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <FaHouse />
                Home
              </Link>
            </div>
            <div className='w-full flex flex-col gap-y-2'>
              <Link href={'/customer/profile'} className={`w-full  rounded-md transition-all hover:bg-emerald-500 flex gap-x-2 hover:text-white text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <RiUserFill />
                Profile
              </Link>
            </div>
            <div className='w-full flex flex-col gap-y-2 '>
              <Link href={'/customer/service'} className={`w-full  rounded-md transition-all hover:bg-emerald-500 flex gap-x-2 hover:text-white text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <FaHandPointUp />
                Service Request
              </Link>
            </div>
            {/* <div className='w-full flex flex-col gap-y-2'>
            <Link href={'/customer/reports'} className={`w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
              <FaBug />
              My Reports
            </Link>
          </div> */}
            <div className='w-full flex flex-col gap-y-2'>
              <Link href={'/customer/request'} className={`w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <FaListCheck />
                My Requests
              </Link>
            </div>
            <div className='w-full flex flex-col gap-y-2'>
              <Link href={'/customer/messages'} className={`w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <Badge color="default" size={'sm'} content={0} shape="circle">
                  <FaComments />
                </Badge>
                Messages
              </Link>
            </div>
            <h4 className='font-bold text-[#40C48E] w-full text-left mb-2 hidden md:block'>Additional</h4>
            <div className='w-full flex flex-col gap-y-2'>
              <div onClick={onDeleteUserModalOpen} className={`text-rose-600 w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <FaUserXmark />
                Delete Account
              </div>
            </div>
            <div className='w-full flex flex-col gap-y-2'>
              <div onClick={onChangePasswordModalOpen} className={`text-cyan-600 w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <FaKey />
                Change Password
              </div>
            </div>
            <div className='w-full flex flex-col gap-y-2'>
              <div onClick={onSendReportModalOpen} className={`text-amber-400 w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <FaCircleExclamation />
                Report
              </div>
            </div>
            <div className='w-full flex flex-col gap-y-2'>
              <div onClick={handleChangeTheme} className={`text-zinc-950 dark:text-white w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <FaRegMoon />
                {theme === 'light' ? 'Dark' : 'Light'} Mode
              </div>
            </div>
            <div className="w-full flex items-center p-4 ">
              <div
                onClick={() => {
                  Cookies.remove("currentUser");
                  signOut();
                  router.replace("/");
                }}
                className={`w-full rounded-md  flex gap-x-2 text-[16px] items-center p-2 pt-4 cursor-pointer border-t-[2px] border-[#40C48E] dark:border-zinc-700 `}
              >
                <RiLogoutCircleLine />
                Logout
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
