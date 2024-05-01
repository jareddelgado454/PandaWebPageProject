'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { FaCircleExclamation, FaKey, FaUserXmark } from "react-icons/fa6";
import { RiUserFill, RiLogoutCircleLine, RiSettings4Fill } from "react-icons/ri";
import { useDisclosure } from "@nextui-org/react";
import { DeleteUserModal, PassWordModal, SendReportModal } from '@/components/modalUser';
export default function CustomerSidebar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    <div className="w-2/12 h-[calc(100vh-100px)] rounded-2xl bg-white shadow-lg dark:bg-zinc-800 flex flex-col items-center justify-between gap-2 overflow-y-auto">
      <DeleteUserModal isOpen={isDeleteUserModalOpen} onOpenChange={onDeleteUserModalChange} user={user} />
      <PassWordModal isOpen={isChangePasswordModalOpen} onOpenChange={onChangePasswordModalChange} />
      <SendReportModal isOpen={isSendReportModalOpen} onOpenChange={onSendReportModalChange} />
      <div className="w-full flex flex-col items-center p-4 ">
        <h4 className='font-bold text-[#40C48E] dark:text-gray-200 w-full text-left mb-2'>Main Menu</h4>
        <div className='w-full flex flex-col gap-y-2 border-b-[2px] border-zinc-700 pb-4 mb-4'>
          <Link href={'/user'} className={`w-full  rounded-md transition-all hover:bg-emerald-500 flex gap-x-2 hover:text-white text-[16px] items-center p-2 px-3 cursor-pointer`}>
            <RiUserFill />
            Profile
          </Link>
        </div>
        <h4 className='font-bold text-[#40C48E] dark:text-gray-200 w-full text-left mb-2'>Account</h4>
        <div className='w-full flex flex-col gap-y-2  mb-4'>
          <Link href={'/customer/settings'} className={`w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
            <RiSettings4Fill />
            Settings
          </Link>
        </div>
        <h4 className='font-bold text-[#40C48E] dark:text-gray-200 w-full text-left mb-2'>Additional</h4>
        <div className='w-full flex flex-col gap-y-2  mb-4'>
          <div onClick={onDeleteUserModalOpen} className={`text-rose-600 w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
            <FaUserXmark />
            Delete Account
          </div>
        </div>
        <div className='w-full flex flex-col gap-y-2  mb-4'>
          <div onClick={onChangePasswordModalOpen} className={`text-cyan-600 w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
            <FaKey />
            Change Password
          </div>
        </div>
        <div className='w-full flex flex-col gap-y-2  mb-4'>
          <div onClick={onSendReportModalOpen} className={`text-amber-400 w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
            <FaCircleExclamation />
            Report an issue
          </div>
        </div>
      </div>
      <div className="w-full flex items-center p-4 ">
        <div
          onClick={() => {
            Cookies.remove("currentUser");
            signOut();
            router.replace("/");
          }}
          className={`w-full rounded-md  flex gap-x-2 text-[16px] items-center p-2 pt-4 cursor-pointer border-t-[2px] border-zinc-700 `}
        >
          <RiLogoutCircleLine />
          Logout
        </div>
      </div>
    </div>
  )
}
