'use client';
import React, { useEffect, useState } from 'react'
import { FaMoon } from 'react-icons/fa6';
export default function DarkModeButton() {
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
    return (
        <button
            type="button"
            className="absolute z-50 dark:bg-zinc-900 bg-white text-zinc-600 dark:border-2 dark:border-zinc-800 dark:text-white bottom-12 right-10 rounded-full p-4 shadow-md transition-all ease-in-out hover:-translate-y-1 hover:scale-110"
            onClick={handleChangeTheme}
        >
            <FaMoon className="text-2xl" />
        </button>
    )
}
