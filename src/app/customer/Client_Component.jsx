import React from 'react'
import { BlockOneComponent, BlockTreeComponent, BlockTwoComponent } from '@/components/customer';
export default function Client_Component() {
  return (
    <div className='h-full flex flex-col p-4 overflow-hidden animate__animated animate__fadeInLeft'>
      <div className='flex flex-col md:flex-row gap-2 h-[50%] w-full '>
        <div
          className="transition-all ease-in-out duration-200 shadow w-full lg:w-[70%] h-full col-span-3 2xl:col-span-2 bg-green-700/15 dark:bg-zinc-900 rounded-lg"
        >
          <BlockOneComponent />
        </div>
        <div
          className={`transition-all ease-in-out duration-200 col-span-3 2xl:col-span-0 shadow w-full lg:w-[30%] 2xl:h-full bg-green-700/15 dark:bg-zinc-900 rounded-lg overflow-y-scroll p-4 cursor-pointer`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        > 
          <BlockTwoComponent />
        </div>
      </div>
      <div className='w-full h-[60%]'>
        <div
          className={`transition-all ease-in-out duration-200 shadow col-span-3 bg-green-700/15 dark:bg-zinc-900 rounded-lg h-full`}
        >
          <BlockTreeComponent />
        </div>
      </div>
    </div>
  )
}