"use client"
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link';
import { FaBars } from 'react-icons/fa6';
import { useWindowSize } from 'react-use';
import { useDisclosure } from '@nextui-org/react';
import AuthOption from './modalLanding/AuthOption';
import { signOut } from "aws-amplify/auth";
import { RiCloseFill } from "react-icons/ri";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import Image from 'next/image';
import { UserContext } from '@/contexts/user/UserContext';
import AmplifyContext from '@/contexts/AmplifyContext';

const LandingNavBar = () => {
    const { user, logout } = useContext(UserContext);
    const {
        isOpen: isAuthOptionsModalOpen,
        onOpen: onAuthOptionsModalOpen,
        onOpenChange: onAuthOptionsModalOpenChange,
    } = useDisclosure();
    const [pictureUser, setPictureUser] = useState(null);
    const { width } = useWindowSize();
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = (action) => {
        setShowMenu(action);
        if (!showMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    useEffect(() => {
        if (width >= 1024) {
            setShowMenu(false);
            document.body.style.overflow = 'auto';
        }
    }, [width]);
    return (
        <AmplifyContext>

            <nav className='relative w-full  p-3 py-4 flex justify-between z-40'>
                <div className="flex gap-x-2 items-center order-1 lg:order-2">
                    <Image width={150} height={150} src="/panda.png" className="w-[4rem] h-[3rem] drop-shadow-lg" alt="panda_logo" />
                    <p className="font-bold drop-shadow-xl tracking-wider text-white">Panda CMS</p>
                </div>
                <div className='flex items-center lg:hidden'>
                    {
                        showMenu
                            ? <RiCloseFill className='text-white hover:text-emerald-400 transition-colors text-[40px] cursor-pointer' onClick={() => toggleMenu(false)} />
                            : <FaBars className='text-white hover:text-emerald-400 transition-colors text-3xl cursor-pointer' onClick={() => toggleMenu(true)} />
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
                        <div className='lg:w-auto w-full'>
                            {user.id ? (
                                <Dropdown placement="bottom-start" className='bg-zinc-800'>
                                    <DropdownTrigger>
                                        <Avatar
                                            as="button"
                                            className='transition-transform'
                                            src={pictureUser ? pictureUser : user && user.profilePicture ? user.profilePicture : "/image/defaultProfilePicture.jpg"}
                                        >
                                        </Avatar>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="User Actions" variant="flat" className='bg-zinc-800 text-white '>
                                        {/* <DropdownItem key="profile" className="h-14 gap-2">
                                            <p className="font-bold">Signed in as</p>
                                            <p className="font-extralight text-sm">{user?.email}</p>
                                        </DropdownItem> */}
                                        <DropdownItem key="settings" textValue='My Profile'>
                                            <Link href={``}>
                                                My Profile
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem key="support">
                                            Contact Support
                                        </DropdownItem>
                                        <DropdownItem key="review">
                                            Review & Feedback
                                        </DropdownItem>
                                        <DropdownItem key="logout" className='text-emerald-400' onClick={() => {
                                            signOut();
                                            logout();
                                        }}>
                                            Log Out
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            ) : (
                                <div className=' lg:w-auto w-full flex flex-col lg:flex-row gap-4 items-center justify-around pr-4'>
                                    <button onClick={() => {onAuthOptionsModalOpen(); localStorage.clear()}} className='lg:w-auto w-full px-5 lg:py-1 py-3 font-semibold border-[2px] rounded-lg text-white border-emerald-500 bg-emerald-500 text-center text-[18px] hover:bg-emerald-300 hover:border-emerald-300 hover:text-zinc-950 transition delay-50'>
                                        Get into
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                <AuthOption isOpen={isAuthOptionsModalOpen} onOpenChange={onAuthOptionsModalOpenChange} />
            </nav>
        </AmplifyContext>
    )
}

export default LandingNavBar