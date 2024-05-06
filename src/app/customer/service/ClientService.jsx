'use client';
import React, { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import Map from '@/components/Map';
import LocationButton from '@/components/customer/components/LocationButton';

export default function ClientService() {
  const [myLocation, setMyLocation] = useState([-123.1187, 49.2819]);
  return (
    <div className='w-full h-full p-4'>
      <div className='w-full h-full rounded-lg bg-stone-200 dark:bg-zinc-900 relative'>
        <div className='flex justify-center items-center h-full'>
          <Map myLocation={myLocation} />
        </div>
        <div className='absolute bottom-5 left-5'>
          <LocationButton setMyLocation={setMyLocation} />
        </div>
        <div className='transtion-all duration-300 absolute -bottom-6 left-2/4 -translate-y-1/2'>
          <div className='w-[3rem] h-[3rem] bg-zinc-900 rounded-t-full cursor-pointer'>
            <div className='flex justify-center items-center w-full h-full'>
              <FaArrowUp />
            </div>
          </div>
        </div>
        {/* <div className='absolute bottom-5 left-0 w-full'>
          <div className='flex justify-between items-center px-2'>

            <div className='dark:bg-zinc-800 bg-white p-4 rounded-lg w-2/4'>
              <input
                type="text"
                className='dark:bg-zinc-900 bg-stone-200 p-2 w-full rounded'
                placeholder='Search'
              />
            </div>
            <p>03</p>
          </div>
        </div> */}
      </div>
    </div>
  )
}
