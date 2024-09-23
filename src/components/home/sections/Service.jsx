import React from 'react';
import { FaBrain, FaScrewdriverWrench, FaStreetView } from 'react-icons/fa6';
const Service = () => {
  return (
    <div className='py-2 px-4' id="Service-Section">
      <div className='flex justify-center items-center flex-wrap text-[#E6D5C9]'>
        <div className='w-full flex flex-col gap-2 items-center mt-16 mb-16'>
          <p className='text-[#E6D5C9]/60 font-semibold text-xs xl:text-lg'>¿What do we do?</p>
          <p className='text-2xl xl:text-6xl 2xl:text-7xl font-black tracking-wider'>Our Services</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-y-7'>
          <div className='w-full xl:w-[32rem]'>
            <div className='flex flex-col items-center gap-10'>
              <FaStreetView className='text-4xl xl:text-6xl 2xl:text-9xl' />
              <div className='flex flex-col gap-3'>
                <p className='font-semibold tracking-widest text-center 2xl:text-xl'>Customer App</p>
                <p className='text-xs xl:text-base font-medium tracking-widest text-center text-[#E6D5C9]/70 px-4'>
                ¡The easiest way to request vehicle repair services right from your location!
                </p>
              </div>
            </div>
          </div>
          <div className='w-full xl:w-[32rem]'>
            <div className='flex flex-col items-center gap-10'>
              <FaScrewdriverWrench className='text-4xl xl:text-6xl 2xl:text-9xl' />
              <div className='flex flex-col gap-3'>
                <p className='font-semibold tracking-widest text-center 2xl:text-xl'>Customer App</p>
                <p className='text-xs xl:text-base font-medium tracking-widest text-center text-[#E6D5C9]/70 px-4'>
                  The most efficient platform for providing vehicle repair services directly where the customer needs you.
                </p>
              </div>
            </div>
          </div>
          <div className='w-full xl:w-[32rem]'>
            <div className='flex flex-col items-center gap-10'>
              <FaBrain className='text-4xl xl:text-6xl 2xl:text-9xl' />
              <div className='flex flex-col gap-3'>
                <p className='font-semibold tracking-widest text-center 2xl:text-xl'>Customer App</p>
                <p className='text-xs xl:text-base font-medium tracking-widest text-center text-[#E6D5C9]/70 px-4'>
                  Generative A.I Project to create personalized, step-by-step repair guides tailored to individual skill levels, learning preferences and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Service