'use client';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { uploadData } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { signOut,getCurrentUser } from "aws-amplify/auth";
import Cookies from "js-cookie";
import { FaCamera } from "react-icons/fa6";
import { RiVipCrownFill, RiAlertFill } from "react-icons/ri";
import { Progress, useDisclosure } from "@nextui-org/react";
import { client } from '@/contexts/AmplifyContext';
import { SubscriptionPlanModal } from '../modalUser';
import { updateInformation } from '@/graphql/users/mutation/users';
function UserInformation({ user }) {
    const router = useRouter();
    const [photograph, setPhotograph] = useState(null);
    const [percent, setPercent] = useState(0)
    const { isOpen: isSubscriptionModalOpen, onOpen: onSubscriptionModalOpen, onOpenChange: onSubscriptionModalChange } = useDisclosure();
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
                            setPercent(Math.round((transferredBytes / totalBytes) * 100))
                        }
                    }
                }
            }).result;
            toast.success(`Upload successfully`);
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
            console.log(error);
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
            <div className="bg-zinc-800 text-white rounded-lg shadow-lg w-full h-5/6 md:w-[21%] 2xl:w-2/12 relative overflow-y-auto order-1">
                <div className="flex flex-row md:flex-col gap-6 items-center justify-center mb-10 p-4">
                    <div className="relative w-[6rem] h-[6rem] md:w-[10rem] md:h-[10rem] overflow-hidden rounded-full shadow-md group">
                        <div className="absolute bg-black group-hover:opacity-60 opacity-0 w-full h-full transition-all">
                            <div className="flex justify-center items-center h-full">
                                <FaCamera className="text-white text-xl md:text-4xl" />
                            </div>
                        </div>
                        <img
                            src={
                                photograph ? photograph : (user.profilePicture ? user.profilePicture : "/image/defaultProfilePicture.jpg")
                            }
                            className="rounded-full w-[6rem] h-[6rem] md:w-[10rem] md:h-[10rem] cursor-pointer "
                            alt="Fotografía de perfil"
                        />
                        <input
                            id="file-upload"
                            type="file"
                            name=""
                            accept="image/gif, image/jpeg, image/png"
                            className="absolute top-0 right-0 min-w-full min-h-full opacity-0 cursor-pointer bg-center object-cover object-center"
                            onChange={(event) => {
                                handleChangePhotograph(event);
                            }}
                        />
                    </div>

                    <div className="flex flex-col justify-center gap-2 items-center mb-6">
                        <p className="text-center text-[25px]">
                            {
                                user['custom:fullName'] ? user['custom:fullName'] : "Personal Information"
                            }
                        </p>
                        <p className="text-gray-300 mb-2 font-bold text-[17px]">{user.email}</p>
                        <div className=" flex justify-center items-center  mb-6 p-0">
                            <div className="w-full text-center text-sm p-1 rounded-lg border-[1px] border-green-500 bg-green-500 text-white">Account Verified</div>
                        </div>
                        <div className="w-full bg-zinc-700 border-[1px] border-zinc-700 rounded-xl flex flex-col  p-2 mb-2">
                            <span className="text-gray-400 text-[13px]">Role:</span><span className="text-emerald-400 font-bold uppercase text-[16px]">{user['custom:role']}</span>
                        </div>
                        <div className="w-full bg-zinc-700 border-[1px] border-zinc-700 rounded-xl flex flex-col  p-2 mb-2">
                            <span className="text-gray-400 text-[13px]">Status: </span><span className={`uppercase text-[16px] font-semibold ${user['custom:status'] === 'active' ? 'text-[#40C48E]' : 'text-rose-400'}`}>{user['custom:status']}</span>
                        </div>
                        {
                            user['custom:role'] === "technician" && <div className="w-full bg-zinc-700 border-[1px] border-zinc-700 rounded-xl flex flex-col  p-2">
                                <span className="text-gray-400 text-[13px]">Subscription: </span>
                                <p className="text-zinc-100 font-semibold">
                                    {
                                        user['custom:subscription'] !== "pending" ? (<span className="flex gap-x-1 items-center">Business pro {`${user['custom:subscription']}`} <RiVipCrownFill className="text-emerald-400" /></span>) : <span className="flex gap-x-1 items-center"><RiAlertFill className="text-emerald-600 text-[19px]" /> Choose a plan <button onClick={() => handleSubscriptionModal()} className="text-emerald-500 hover:text-emerald-700 transition-colors"><u>here</u></button></span>
                                    }
                                </p>
                            </div>
                        }
                    </div>
                </div>

                <div className="2xl:absolute 2xl:bottom-0 w-full">
                    <div className="flex flex-col">
                        <button
                            onClick={() => {
                                Cookies.remove("currentUser");
                                signOut();
                                router.replace("/");
                            }}
                            className="rounded-b-lg bg-emerald-500 h-[2.5rem] md:h-[3.5rem] font-bold text-white flex justify-center items-center"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
            {
                percent > 0 && <Progress className='absolute z-20 bottom-0' color={`${percent >= 95 ? 'success' : 'primary'}`} aria-label="Loading..." value={percent} />
            }
        </>
    )
}

export default UserInformation