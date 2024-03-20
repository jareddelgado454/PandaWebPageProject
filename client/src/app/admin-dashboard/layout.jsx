"use client";
import React, { useEffect, useState } from "react";
import { sessionsStatus, isAdmin } from '@/utils/session';
import { Sidebar } from "@/components/Sidebar";
import { FaHouse, FaMoon } from "react-icons/fa6";
import Link from "next/link";
import { generateClient } from 'aws-amplify/api';
import { signOut } from 'aws-amplify/auth';
export const client = generateClient();
import { Amplify } from 'aws-amplify';
import config from '@/amplifyconfiguration.json';
Amplify.configure(config);
import AuthGuard from "@/components/authGuard";

function AdminDashboardLayout ({children}) {
    const [theme, setTheme] = useState("light");
    
    useEffect(() => {
        
        if(theme === "dark")
        {
            document.querySelector('html').classList.add('dark');
        }else {
            document.querySelector('html').classList.remove('dark')
        }

    }, [theme]);

    const handleChangeTheme = () => {

        setTheme(prevTheme => prevTheme === "light" ? "dark" : 'light');

    };

    return(
        <>
            {
                sessionsStatus && isAdmin && (
                    <div className="flex w-full h-screen max-h-screen relative bg-zinc-600 dark:bg-zinc-800">
                        <Sidebar signOut={signOut}/>
                        <div className="home_content transition-all ease-out duration-500 md:px-2 py-4">
                            <div className="shadow-xl text-white bg-gray-100 h-full rounded-lg dark:bg-green-panda overflow-y-auto">
                            {
                                children
                            }
                            </div>
                        </div>
                        <Link href={`/admin-dashboard`} className="absolute z-50 bottom-10 right-10 cursor-pointer">
                            <p className="dark:bg-zinc-600 bg-white text-zinc-600 dark:text-white p-4 rounded-full transition-all shadow-md ease-in-out hover:-translate-y-1 hover:scale-110">
                                <FaHouse className="text-2xl" />
                            </p>
                        </Link>
                        <button
                            type="button"
                            className="absolute z-50 dark:bg-zinc-600 bg-white text-zinc-600 dark:text-white bottom-28 right-10 rounded-full p-4 shadow-md transition-all ease-in-out hover:-translate-y-1 hover:scale-110"
                            onClick={handleChangeTheme}
                        >
                            <FaMoon className="text-2xl" />
                        </button>
                    </div>
                )
            }
        </>
    )
}

export default AuthGuard(AdminDashboardLayout);