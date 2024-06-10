"use client"

import React from 'react'
import Link from 'next/link'
import { useContext } from 'react';
import { RiArrowDropRightLine, RiMailOpenFill, RiAlertFill, RiMapPin2Fill   } from "react-icons/ri";
import { RiStarLine } from "react-icons/ri";
import Image from 'next/image';
import profileTechnician2 from "../../../../public/image/profileTechnician2.webp"
import { Contexto } from "../layout";

const ProfileCard = () => {
    const { user } = useContext(Contexto);
  return (
    <div className="w-full h-[calc(100vh-100px)] relative pr-[20px]">
        <div className="w-full h-[calc(100vh-100px)] flex flex-col px-4 bg-zinc-800 rounded-xl pt-4">  
            <div className="w-full mb-8">
                <div className="w-[300px] bg-zinc-700 rounded-2xl flex items-center justify-center p-2 ">
                    <Link href={'/user'} className="text-zinc-400">
                        Technician panel
                    </Link>
                    <RiArrowDropRightLine className="text-zinc-400 text-[25px] " />
                    <Link href={'/user'} className="text-zinc-400">
                        Profile
                    </Link>
                    <RiArrowDropRightLine className="text-zinc-400 text-[25px] " />
                    <Link href={'/user/personal-information'} className="text-white">
                        Card
                    </Link>
                </div>
            </div>
            <div className='w-full h-[600px]  flex flex-col items-center justify-center relative'>
                <div className='absolute top-[20%] left-[40%] flex flex-wrap gap-x-4 w-[400px] h-[600px] blur-[20px]'>
                    <div className='h-[200px] w-[350px] rounded-full shadow-3xl shadow-emerald-400 bg-emerald-500'></div>
                    <div className='h-[200px] w-[350px] rounded-full shadow-3xl shadow-emerald-400 bg-emerald-500'></div>
                    {/* <div className='h-[100px] w-[100px] rounded-full shadow-3xl shadow-emerald-400 bg-zinc-500'></div>
                    <div className='h-[100px] w-[100px] rounded-full shadow-3xl shadow-emerald-400 bg-emerald-200'></div> */}
                </div>
                <h3 className='text-white text-[30px] font-bold mb-4'>My Profile Card</h3>
                <div className='w-[450px] h-[700px] border-[2px] border-zinc-500 rounded-3xl backdrop-blur-[50px] flex flex-col p-6 shadow-xl'>
                    <div className=' flex items-center text-zinc-200 p-2 font-bold mb-6 text-[17px] gap-x-1'>
                        <RiMapPin2Fill />
                        <span>{user["custom:city"] ? user["custom:city"] : "Austin, Texas"}</span>
                    </div>
                    <div className='h-[510px] w-full bg-gradient-to-b from-zinc-500 to-zinc-900 rounded-3xl shadow-lg p-[2px]'>
                        <div className='bg-zinc-900 w-full h-[506px] relative rounded-3xl flex'>
                            <div className='absolute -top-8 right-6 w-[60px] h-[60px] z-40 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-400 flex items-center justify-center'>
                                <div className='w-[56px] h-[56px] rounded-full bg-emerald-500 flex items-center justify-center'>
                                    <RiStarLine className='text-white text-[19px]'/>
                                    <span className='text-white text-[24px] font-bold'>5</span>
                                </div>
                            </div>
                            <Image 
                                src={profileTechnician2}
                                placeholder='blur'
                                quality={100}
                                className='w-[full] h-[370px] object-cover z-30 rounded-3xl'
                            />
                            <div className='absolute bottom-0 left-0 w-full h-[250px] custom-gradient-profilePicture z-40 rounded-b-3xl flex flex-col p-6'>
                                <h4 className='text-white text-[25px] font-bold'>{user["custom:fullName"] ? user["custom:fullName"].split(' ').slice(0, 2).join(' ') : user.name.split(' ').slice(0, 2).join(' ')}</h4>
                                <span></span>
                            </div>
                        </div>         
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileCard