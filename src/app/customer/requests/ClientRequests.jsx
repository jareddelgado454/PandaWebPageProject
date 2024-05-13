'use client';
import OfferSidebar from '@/components/customer/components/request/OfferSidebar'
import React, { useState } from 'react'

export default function ClientRequests() {
  const [sideActive, setSideActive] = useState(false);
  const list = [1,2,3,4,5,6,7,8,9];
  return (
    <div className='h-full relative'>
      <OfferSidebar />
      <div className='p-4 h-full overflow-y-scroll'>
        <p>My Requests</p>
        <div className='my-8 grid grid-cols-4 gap-8'>
          {list.map((item) => (
            <div key={item} className='bg-stone-100 dark:bg-zinc-900 h-[22rem] rounded-lg p-4 shadow-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer'>
              Request {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
