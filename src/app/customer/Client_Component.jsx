'use client';
import React, { useState } from 'react'
import { NotificationComponent } from '@/components/customer';
export default function Client_Component() {
    const [notiActive, setNotiActive] = useState(false)
  return (
    <div className='grid grid-rows-2 grid-cols-3 gap-4 p-4 h-full animate__animated animate__fadeInLeft'>
        <div
          className="transition-all ease-in-out duration-200 shadow row-span-1 col-span-2 bg-[#E4E6EB] dark:bg-zinc-900 rounded-lg"
          >
        </div>
        <div
          className={`transition-all ease-in-out duration-200  shadow ${notiActive ? 'row-span-2 h-full' : 'row-span-1 h-full'} bg-[#E4E6EB] dark:bg-zinc-900 rounded-lg overflow-y-scroll p-4 cursor-pointer`}
          onClick={() => setNotiActive(!notiActive)}
        >
          <NotificationComponent />
        </div>
        <div
          className={`transition-all ease-in-out duration-200 shadow row-span-1 ${notiActive ? 'col-span-2' : 'col-span-3'}  bg-[#E4E6EB] dark:bg-zinc-900 rounded-lg`}
        >  
          </div>
      </div>
  )
}
