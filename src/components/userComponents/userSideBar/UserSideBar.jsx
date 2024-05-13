'use client';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { uploadData } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';
import { RiUserFill, RiCalendarTodoFill, RiDashboardFill, RiLogoutCircleLine, RiSettings4Fill , RiArrowDownSFill , RiArrowRightCircleLine  } from "react-icons/ri";
import { TbDiamondFilled } from "react-icons/tb";
import Link from 'next/link';
import { signOut } from "aws-amplify/auth";
import Cookies from "js-cookie";
import { FaCamera, FaCircleExclamation, FaKey, FaUserXmark } from "react-icons/fa6";
import { useDisclosure } from "@nextui-org/react";
import { DeleteUserModal, PassWordModal, SendReportModal, SubscriptionPlanModal } from '@/components/modalUser';
import { getCurrentUser } from "aws-amplify/auth";
function UserSidebar({ user }) {
    const router = useRouter();
    const [photograph, setPhotograph] = useState(null);
    const { isOpen: isSubscriptionModalOpen, onOpen: onSubscriptionModalOpen, onOpenChange: onSubscriptionModalChange } = useDisclosure();
    const { isOpen: isDeleteUserModalOpen, onOpen: onDeleteUserModalOpen, onOpenChange: onDeleteUserModalChange } = useDisclosure();
    const { isOpen: isChangePasswordModalOpen, onOpen: onChangePasswordModalOpen, onOpenChange: onChangePasswordModalChange } = useDisclosure();
    const { isOpen: isSendReportModalOpen, onOpen: onSendReportModalOpen, onOpenChange: onSendReportModalChange } = useDisclosure();
    const [idsPassed, setIdsPassed] = useState({
        idDatabase: "",
        cognitoUsername: ""
    });
    function dataURLtoBlob(dataURL) {
        if (!dataURL) {
            return null;
        }
        var parts = dataURL.split(';base64,');
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);
        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], { type: contentType });
    }
    function handleChangePhotograph(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotograph(reader.result);
                handleUpdatePicture(dataURLtoBlob(reader.result));
            };
            reader.readAsDataURL(file);
        }
    }
    const handleUpdatePicture = async (picture) => {
        const uniqueId = uuidv4();
        const filename = `user-profile-pictures/${uniqueId}.jpg`;
        try {
            const result = await uploadData({
                key: filename,
                data: picture,
                options: {
                    contentType: "image/png",
                    onProgress: ({ transferredBytes, totalBytes }) => {
                        if (totalBytes) {
                            console.log(
                                `Upload progress ${Math.round((transferredBytes / totalBytes) * 100)
                                } %`
                            );
                        }
                    }
                }
            }).result;
            console.log('Succeeded: ', result);
            await client.graphql({
                query: updateInformation,
                variables: {
                    email: user.email,
                    input: {
                        id: user.id,
                        profilePicture: `https://d3nqi6yd86hstw.cloudfront.net/public/${filename}`,
                    },
                },
            });
        } catch (error) {
            console.log(`Error from here : ${error}`);
        }
    }
    const handleSubscriptionModal = async () => {
        const userId = user?.id;
        console.log(user)
        const { username } = await getCurrentUser();
        setIdsPassed({
            idDatabase: userId,
            cognitoUsername: username
        });
        onSubscriptionModalOpen();
    }
    return (
        <>
            <SubscriptionPlanModal isOpen={isSubscriptionModalOpen} onOpenChange={onSubscriptionModalChange} idsPassed={idsPassed} />
            <DeleteUserModal isOpen={isDeleteUserModalOpen} onOpenChange={onDeleteUserModalChange} user={user} />
            <PassWordModal isOpen={isChangePasswordModalOpen} onOpenChange={onChangePasswordModalChange} />
            <SendReportModal isOpen={isSendReportModalOpen} onOpenChange={onSendReportModalChange} />
            <div className=" text-white rounded-lg shadow-lg h-screen  w-[300px] relative">
                <div className="flex flex-row md:flex-col items-center justify-center px-[20px] py-0">
                    <div className="h-[80px] flex gap-x-1 items-center justify-start w-full">
                        <img src="/panda.png" className="w-[65px] h-[50px] drop-shadow-lg" alt="panda_logo" />
                        <p className="font-bold drop-shadow-xl tracking-wider text-white">PANDA <span className='text-emerald-300'>TECHS</span></p> 
                    </div>

                    <div className="w-full h-[calc(100vh-100px)] rounded-2xl bg-zinc-800 flex flex-col items-center justify-between gap-2 overflow-y-auto">
                        
                        <div className="w-full flex flex-col items-center p-4 ">
                            <h4 className='font-bold text-gray-200 w-full text-left mb-2'>Main Menu</h4>
                            <div className='w-full flex flex-col gap-y-2 border-b-[2px] border-zinc-700 pb-4 mb-4'>
                                <Link href={'/user'} className={`w-full rounded-md bg-emerald-500 flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
                                    <RiUserFill />
                                    Profile
                                </Link>
                                <Link href={'/user/subscription'} className={`w-full rounded-md  flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
                                    <TbDiamondFilled />
                                    Subscription
                                </Link>
                                
                            </div> 
                            <h4 className='font-bold text-gray-200 w-full text-left mb-2'>My Work</h4> 
                            <div className='w-full flex flex-col gap-y-2  border-b-[2px] border-zinc-700 pb-4 mb-4'>
                                <Link href={'/user/schedule'} className={`w-full rounded-md  flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
                                    <RiCalendarTodoFill  />
                                    Schedule
                                </Link>
                                <Link href={'/user/requests'} className={`w-full rounded-md  flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
                                    <RiArrowRightCircleLine />
                                    Repair Requests
                                </Link>
                            </div>   
                            <h4 className='font-bold text-gray-200 w-full text-left mb-2'>Finances</h4> 
                            <div className='w-full flex flex-col gap-y-2  border-b-[2px] border-zinc-700 pb-4 mb-4'>
                                <Link href={'/user/finances'} className={`w-full rounded-md  flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
                                    <RiDashboardFill  />
                                    Overview
                                </Link>
                            </div>
                            
                            
                            {/* <h4 className='font-bold text-gray-200 w-full text-left mb-2'>Additional</h4> 
                            <div className='w-full flex flex-col gap-y-2  mb-4'>
                                <div onClick={onDeleteUserModalOpen} className={`text-rose-600 w-full rounded-md  flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
                                    <FaUserXmark />
                                    Delete Account
                                </div>
                            </div>
                            <div className='w-full flex flex-col gap-y-2  mb-4'>
                                <div onClick={onChangePasswordModalOpen} className={`text-cyan-600 w-full rounded-md  flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
                                    <FaKey/>
                                    Change Password
                                </div>
                            </div>
                            <div className='w-full flex flex-col gap-y-2  mb-4'>
                                <div onClick={onSendReportModalOpen} className={`text-amber-400 w-full rounded-md  flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
                                    <FaCircleExclamation />
                                    Report an issue
                                </div>
                            </div> */}
                        </div>
                        <div className="w-full flex flex-col items-center p-4 ">
                            <div className='w-full flex flex-col gap-y-2  mb-4'>
                                <Link href={'/user/settings'} className={`w-full rounded-md  flex gap-x-2 text-[16px] items-center p-2  cursor-pointer`}>
                                    <RiSettings4Fill  className='text-[17px]'/>
                                    Settings
                                </Link>
                            </div>
                            <div 
                                onClick={() => {
                                    Cookies.remove("currentUser");
                                    signOut();
                                    router.replace("/");
                                }} 
                                className={`w-full rounded-md  flex gap-x-2 text-[16px] items-center p-2 pt-4 cursor-pointer border-t-[2px] border-zinc-700 `}
                            >
                                <RiLogoutCircleLine  />
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSidebar