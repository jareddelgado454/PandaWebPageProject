'use client';
import { CustomerBar } from '@/components/customer'
import React, { useEffect, useState } from 'react'
import { FaMoon } from 'react-icons/fa6';
import 'animate.css';
export default function layout({ children }) {
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
  return (
    <div className='min-h-screen h-full bg-stone-200 dark:bg-zinc-700'>
      <div className='flex flex-row items-center h-screen px-4 gap-2'>
        <CustomerBar />
        <div className='w-full bg-white dark:bg-zinc-800 md:h-[calc(100vh-50px)] 2xl:h-[calc(100vh-100px)] shadow-lg rounded-lg relative overflow-hidden'>
          {children}
        </div>
        <button
          type="button"
          className="absolute z-50 dark:bg-zinc-600 bg-white text-zinc-600 dark:text-white bottom-20 right-10 rounded-full p-4 shadow-md transition-all ease-in-out hover:-translate-y-1 hover:scale-110"
          onClick={handleChangeTheme}
        >
          <FaMoon className="text-2xl" />
        </button>
      </div>
    </div>
  )
}
