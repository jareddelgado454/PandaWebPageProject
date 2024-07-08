import { CustomerBar } from '@/components/customer'
import React from 'react'
import 'animate.css';
import '@/app/app.css';
import { ServiceProvider } from '@/contexts/service/ServiceProvider';
import MessageNotification from '@/components/customer/components/MessageNotification';
export default function layout({ children }) {
  return (
    <div className=' bg-stone-300 dark:bg-zinc-700 h-full md:max-h-screen'>
      <div className='flex flex-col lg:flex-row items-center h-full md:h-screen px-4 py-4 lg:py-0 gap-2'>
      <ServiceProvider>
        <MessageNotification />
        <CustomerBar />
        <div className='w-full bg-white dark:bg-zinc-800 h-full md:h-[calc(100vh-50px)] 2xl:h-[calc(100vh-100px)] shadow-lg rounded-lg relative overflow-hidden'>
          {children}
        </div>
      </ServiceProvider>
      </div>
    </div>
  )
}
