import { CustomerBar } from '@/components/customer'
import React from 'react'
import 'animate.css';
import '@/app/app.css';
import DarkModeButton from '@/components/DarkModeButton';
import { PlaceProvider } from '@/contexts/place/PlaceProvider';
import { MapProvider } from '@/contexts/map/MapProvider';
import { ServiceProvider } from '@/contexts/service/ServiceProvider';
import { UserProvider } from '@/contexts/user/UserProvider';
export default function layout({ children }) {
  return (
    <div className=' bg-stone-300 dark:bg-zinc-700 h-full'>
      <div className='flex flex-col lg:flex-row items-center h-full xl:h-screen px-4 py-4 lg:py-0 gap-2'>
        <CustomerBar />
        <div className='w-full bg-white dark:bg-zinc-800 h-full md:h-[calc(100vh-50px)] 2xl:h-[calc(100vh-100px)] shadow-lg rounded-lg relative xl:overflow-hidden'>
          <UserProvider>
            <PlaceProvider>
              <MapProvider>
                <ServiceProvider>
                  {children}
                </ServiceProvider>
              </MapProvider>
            </PlaceProvider>
          </UserProvider>
        </div>
      </div>
    </div>
  )
}
