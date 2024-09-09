import Image from 'next/image';
import React from 'react'

const About = () => {
  return (
    <div className='flex flex-row flex-wrap py-2 px-4'>
      <div className='w-[45%]'>
        <Image src={'/panda.webp'} width={600} height={600} className='h-[22rem] w-[24rem] drop-shadow-xl mx-auto' />
      </div>
      <div className='w-[55%] text-[#E6D5C9] flex flex-col gap-6'>
        <p className='text-center text-sm text-[#E6D5C9]/60 font-semibold'>Let us introduce ourselves</p>
        <p className='text-center text-8xl font-black tracking-wider'>About Us</p>
        <p className='text-justify tracking-wider text-sm leading-9'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </div>
  )
}
export default About;