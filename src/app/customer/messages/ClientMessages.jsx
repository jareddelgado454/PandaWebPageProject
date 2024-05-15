import React from 'react'
import Image from 'next/image';
import ChatSelected from '@/components/customer/components/Chat/ChatSelected';

export default function ClientMessages() {
  const numbers = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className='p-4 h-full'>
      <div className='flex flex-col gap-4 lg:flex-row h-full'>
        <div className='flex flex-col gap-6 w-full'>
          <div className='w-full'>
            <input
              type="text"
              className='dark:bg-zinc-700 dark:text-white dark:line shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Search a technician...'
            />
          </div>
          <div className='flex flex-col gap-2 w-full overflow-y-auto'>
            {numbers.map((item) => (
              <div id="chat_technician" className='flex flex-row justify-between gap-2 dark:hover:bg-zinc-700 hover:rounded-lg transition-all duration-300 ease-in cursor-pointer p-3'>
                <div className='flex flex-row gap-2'>
                  <Image
                    src={`/logo.jpg`}
                    width={100}
                    height={100}
                    alt='technician_profile_picture'
                    className='w-[3.5rem] h-[3.5] rounded-full'
                  />
                  <div className='flex flex-col justify-center'>
                    <p className='font-bold'>Elio David Saavedra Sanchez</p>
                    <p className='text-sm dark:text-zinc-400'>Hi. I'm on my way.</p>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <p>14:54</p>
                  <div className='flex justify-center items-center'>
                    <p className='font-light flex justify-center items-center dark:bg-green-panda rounded-full w-[1.5rem] h-[1.5rem] text-xs'>
                      +1
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='w-full border-l-2 dark:border-zinc-700 px-2'>
          <ChatSelected />
        </div>
      </div>
    </div>
  )
}
