import Image from 'next/image';
import React from 'react';
import { RiAlertFill } from 'react-icons/ri';

export default function page() {
  return (
    <div className='w-full bg-white dark:bg-zinc-800 h-[calc(100vh-100px)] shadow-lg rounded-lg relative p-4'>
      {/* profile view */}
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='w-full bg-stone-200 h-[12rem] rounded-lg'>
          <div className='flex items-center gap-5 h-full px-8'>
            <Image
              src={`https://d3nqi6yd86hstw.cloudfront.net/public/user-profile-pictures/ded0fd80-2ab7-4a57-92eb-4440987a358f.jpg`}
              width={400}
              height={400}
              className='rounded-full h-[9rem] w-[9rem]'
            />
            <div className='flex flex-col gap-2'>
              <p>Welcome back, <strong className='text-[#40C48E]'>username</strong></p>
              <p className='text-gray-500'>example@gmail.com</p>
              <div className="w-full flex gap-x-2">
                <div
                  className={`w-[95px] p-2 relative border-[1px] rounded-md border-red-400 bg-stone-200 dark:bg-zinc-800`}
                >
                  <RiAlertFill className="absolute -top-2 -right-2 w-[22px] h-[22px] flex justify-center items-center text-red-500" />
                  <div className="w-full flex flex-col">
                    <span className="w-full text-left text-[11px]">
                      Profile:
                    </span>
                    <span
                      className={`w-full text-left text-[15px] text-red-400`}
                    >
                      Incomplete
                    </span>
                  </div>
                </div>
                <div
                  className={`w-[95px] p-2 relative border-[1px] rounded-md border-red-400 bg-stone-200 dark:bg-zinc-800`}
                >
                  <RiAlertFill className="absolute -top-2 -right-2 w-[22px] h-[22px] flex justify-center items-center text-red-500" />
                  <div className="w-full flex flex-col">
                    <span className="w-full text-left text-[11px] ">
                      Subscription:
                    </span>
                    <span
                      className={`w-full text-left text-[15px] text-red-400`}
                    >
                      None
                    </span>
                  </div>
                </div>
                <div
                  className={`w-[95px] p-2 relative border-[1px] rounded-md border-red-400 bg-stone-200 dark:bg-zinc-800`}
                >
                  <RiAlertFill className="absolute -top-2 -right-2 w-[22px] h-[22px] flex justify-center items-center text-red-500" />
                  <div className="w-full flex flex-col">
                    <span className="w-full text-left text-[11px]">
                      Schedule:
                    </span>
                    <span
                      className={`w-full text-left text-[15px] text-red-400`}
                    >
                      Incomplete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full lg:w-2/6 bg-stone-200 h-[12rem] rounded-lg'>
          hola
        </div>
      </div>
    </div>
  )
}
