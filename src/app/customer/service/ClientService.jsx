import React from 'react';

import Map from '@/components/Map';
import LocationButton from '@/components/customer/components/LocationButton';
import RequestInput from '@/components/customer/components/Map/RequestInput';
export default function ClientService() {
  return (
    <div className='w-full h-full p-4'>
      <div className='w-full h-full rounded-lg bg-stone-200 dark:bg-zinc-900 relative overflow-hidden'>
        <div className='flex justify-center items-center h-full'>
          <Map />
        </div>
        <div className='absolute bottom-5 left-5 z-20'>
          <LocationButton />
        </div>
        <RequestInput />
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
