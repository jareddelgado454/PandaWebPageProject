import Image from 'next/image'
import React from 'react'

const Team = () => {
  return (
    <div className='py-2 px-4' id="Team-Section">
      <div className='flex justify-center items-center flex-wrap text-[#E6D5C9] xl:mt-16'>
        <div className='w-full flex flex-col gap-2 items-center mt-16 mb-16'>
          <p className='text-[#E6D5C9]/60 font-semibold text-xs xl:text-lg'>Look Our</p>
          <p className='text-2xl xl:text-6xl 2xl:text-7xl font-black tracking-wider'>Team</p>
        </div>
        <div className='flex flex-col md:flex-row flex-wrap gap-y-8 justify-between w-full md:w-[50%]'>
          <div className='flex flex-col gap-4 items-center'>
            <Image
              src={'/image/Team/Charles.jpg'}
              width={450}
              height={450}
              alt='Panda_Charles_Mims'
              className='rounded-full w-[10rem] h-[10rem] xl:w-[12rem] xl:h-[12rem] border-3 border-[#C0B2A9]'
            />
            <p className='bg-zinc-900/50 px-16 py-4 rounded-3xl text-lg font-semibold tracking-wider text-center'>Charles Mims</p>
            <p className='tracking-widest'>CEO</p>
          </div>
          <div className='flex flex-col gap-4 items-center'>
            <Image
              src={'/image/Team/Neil.jpg'}
              width={450}
              height={450}
              alt='Panda_Neil_Brown'
              className='rounded-full w-[10rem] h-[10rem] xl:w-[12rem] xl:h-[12rem] border-3 border-[#C0B2A9]'
            />
             <p className='bg-zinc-900/50 px-16 py-4 rounded-3xl text-lg font-semibold tracking-wider text-center'>Neil Brown</p>
             <p className='tracking-widest'>CTO</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team