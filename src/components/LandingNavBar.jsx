"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { RiCloseFill } from "react-icons/ri";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Amplify } from "aws-amplify";
import { client } from "@/contexts/AmplifyContext";
import config from "@/amplifyconfiguration.json";
import { signOut } from "aws-amplify/auth";
import { getUserByCognitoID } from "@/graphql/custom-queries";
import { FaBars } from 'react-icons/fa6';
import { useWindowSize } from 'react-use';
import useMedia from 'use-media';
Amplify.configure(config);

const LandingNavBar = () => {
    const [user,setUser] = useState({});
    const [pictureUser, setPictureUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { width } = useWindowSize();
    const isLGScreen = useMedia({ minWidth: '1024px' }); 
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = (action) => {
        setShowMenu(action);
        if (!showMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };
    const currentAuthenticatedUser = async () => {
        try {
            const { sub, picture } = await fetchUserAttributes();
            if (picture) setPictureUser(picture);
            if(sub){
                setIsLoggedIn(true);
                const { data } = await client.graphql({
                    query: getUserByCognitoID,
                    variables: {
                        cognitoId: sub,
                    },
                });
                console.log(data)
                setUser(data.listUsers.items[0]);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        currentAuthenticatedUser();
        return () => document.body.style.overflow = 'auto';
    },[]);

    useEffect(() => {
        if (width >= 1024) {
            setShowMenu(false);
            document.body.style.overflow = 'auto';
        }
    }, [width]);

  return (
    <nav className='relative w-full  p-3 py-4 flex justify-between z-40'>
        <div className="flex gap-x-2 items-center order-1 lg:order-2">
            <img src="/panda.png" className="w-[4rem] h-[3rem] drop-shadow-lg" alt="panda_logo" />
            <p className="font-bold drop-shadow-xl tracking-wider text-white">Panda CMS</p> 
        </div>
        <div className='flex items-center lg:hidden'>
            {
                showMenu 
                ?<RiCloseFill className='text-white hover:text-emerald-400 transition-colors text-[40px] cursor-pointer' onClick={()=>toggleMenu(false)} />
                :<FaBars className='text-white hover:text-emerald-400 transition-colors text-3xl cursor-pointer' onClick={()=>toggleMenu(true)} />
            }
        </div>
        <div className={`${showMenu ? ' h-[1000px] absolute inset-0 z-50 top-[5rem] w-full flex justify-center' : 'hidden'} lg:flex lg:order-2`}>
            <div className='lg:p-0 p-4 flex flex-col lg:justify-center justify-normal lg:items-center items-start gap-6 bg-zinc-900 w-full rounded-lg lg:flex-row lg:bg-transparent lg:w-full lg:gap-8'>
                <Link href="" className='lg:w-auto w-full text-gray-200 font-bold text-[17px] hover:text-emerald-300 transition delay-50 '>
                    Why the Panda?
                </Link>

                <Link href="" className='lg:w-auto w-full text-gray-200 font-bold text-[17px] hover:text-emerald-300 transition delay-50'>
                    Services
                </Link>

                <Link href="" className='lg:w-auto w-full text-gray-200 font-bold text-[17px] hover:text-emerald-300 transition delay-50'>
                    Security
                </Link>

                <Link href="" className='lg:w-auto w-full text-gray-200 font-bold text-[17px] hover:text-emerald-300 transition delay-50'>
                    About us
                </Link>
                {isLoading ?
                (
                    <div className='w-[150px] animate-pulse rounded shadow-xl flex gap-1 items-center'>
                        <div className='w-[48px] h-[48px] rounded-full bg-zinc-600/60'></div>
                        <div className='w-[100px] h-[40px] flex flex-col gap-y-2'>
                            <div className='bg-zinc-600/60 h-[22px] w-full rounded-md'></div>
                            <div className='bg-zinc-600/60 h-[12px] w-full rounded-md'></div>
                        </div>
                    </div>
                ): 
                (
                    <div className='lg:w-auto w-full'>
                            {isLoggedIn ? (
                                <Dropdown placement="bottom-start" className='bg-zinc-800'>
                                    <DropdownTrigger>
                                        <User
                                            as="button"
                                            avatarProps={{
                                                isBordered: false,
                                                src: `${pictureUser ? pictureUser : user && user.profilePicture ? user.profilePicture : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }`,
                                                
                                            }}
                                            className="transition-transform text-white w-[12rem] h-full"
                                            description={`${user?.rol}`}
                                            name={`${user?.fullName}`}
                                        />
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="User Actions" variant="flat" className='bg-zinc-800 text-white '>
                                        <DropdownItem key="profile" className="h-14 gap-2">
                                            <p className="font-bold">Signed in as</p>
                                            <p className="font-extralight text-sm">{user?.email}</p>
                                        </DropdownItem>
                                        <DropdownItem key="settings">
                                            My Profile
                                        </DropdownItem>
                                        <DropdownItem key="support">
                                            Contact Support
                                        </DropdownItem>
                                        <DropdownItem key="review">
                                            Review & Feedback
                                        </DropdownItem>
                                        <DropdownItem key="logout" className='text-emerald-400' onClick={()=>{signOut(); setIsLoggedIn(false)}}>
                                            Log Out
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            ) : (
                                <div className=' lg:w-auto w-full flex flex-col lg:flex-row gap-4 items-center justify-around gap-x-4'>
                                    <Link href="/auth/signin" className='lg:w-auto w-full px-5 lg:py-1 py-3 font-semibold border-[2px] rounded-lg lg:text-emerald-300 text-black border-emerald-500 lg:bg-transparent bg-white text-center text-[18px] hover:bg-emerald-300 hover:border-emerald-300 hover:text-zinc-950 transition delay-50'>
                                        Log In 
                                    </Link>   

                                    <Link href="/auth/signup" className='lg:w-auto w-full px-5 lg:py-1 py-3 font-semibold border-[2px] rounded-lg text-white border-emerald-500 bg-emerald-500 text-center text-[18px] hover:bg-emerald-300 hover:border-emerald-300 hover:text-zinc-950 transition delay-50'>
                                        Sign Up 
                                    </Link>  
                                </div>
                            )}
                        </div>
                )}
            </div>
        </div>               
    </nav>
  )
}

export default LandingNavBar