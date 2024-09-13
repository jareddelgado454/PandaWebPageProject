import Image from 'next/image';
import React from 'react'

const About = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap py-2 px-4' id="About-section">
      <div className='w-full md:w-[45%]'>
        <Image src={'/panda.webp'} alt='Panda_Logo' width={600} height={600} className='h-[12rem] w-[12rem] xl:h-[22rem] xl:w-[24rem] drop-shadow-xl mx-auto' />
      </div>
      <div className='w-full md:w-[55%] text-[#E6D5C9] flex flex-col gap-6'>
        <p className='text-center text-[#E6D5C9]/60 font-semibold text-xs xl:text-lg'>Let us introduce ourselves</p>
        <p className='text-center text-3xl xl:text-6xl 2xl:text-8xl font-black tracking-wider'>About Us</p>
        <p className='text-justify tracking-wider text-sm leading-9'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </div>
  )
}
export default About;