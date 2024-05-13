import { CustomerBar } from '@/components/customer'
import React from 'react'
import 'animate.css';
import '@/app/app.css';
import DarkModeButton from '@/components/DarkModeButton';
import { PlaceProvider } from '@/contexts/place/PlaceProvider';
import { MapProvider } from '@/contexts/map/MapProvider';
import { ServiceProvider } from '@/contexts/service/ServiceProvider';
export default function layout({ children }) {
  return (
    <div className=' bg-stone-300 dark:bg-zinc-700'>
      <div className='flex flex-row items-center xl:h-screen px-4 gap-2'>
        <CustomerBar />
        <div className='w-full bg-white dark:bg-zinc-800 md:h-[calc(100vh-50px)] 2xl:h-[calc(100vh-100px)] shadow-lg rounded-lg relative overflow-hidden'>
          <PlaceProvider>
            <MapProvider>
              <ServiceProvider>
                {children}
              </ServiceProvider>
            </MapProvider>
          </PlaceProvider>
        </div>
        <DarkModeButton />
      </div>
    </div>
  )
}
