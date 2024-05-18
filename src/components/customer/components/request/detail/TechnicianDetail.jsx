import { ThirdDateFormatter } from '@/utils/parseDate'
import Image from 'next/image'
import React from 'react'
import { FaCommentSms, FaPhoneVolume, FaStar } from 'react-icons/fa6'

export default function TechnicianDetail({ technician }) {
  return (
    <div className='w-full h-full p-4'>
      <div className='flex flex-col lg:flex-row gap-2 gap-y-4 items-center h-full'>
        <div className='w-full lg:w-[90%] flex flex-row gap-4 items-center'>
          <Image
            src={`/image/defaultProfilePicture.jpg`}
            alt='image_technician_profile_picture'
            width={100}
            height={100}
            className='rounded-full w-[4.5rem] h-[4.5rem] lg:w-[6.5rem] lg:h-[6.5rem] border-2 border-[#40C48E]'
            priority
          />
          <div className='flex flex-col gap-1 h-full'>
            <p className='text-md lg:text-base 2xl:text-2xl'>{technician.fullName}</p>
            <p className='text-xs lg:text-sm text-zinc-500 dark:text-zinc-300'>{ThirdDateFormatter(technician.createdAt)}</p>
            <div className='flex flex-row gap-1 items-center'>
              <p className='text-xs lg:text-base'>Rate:</p> <FaStar className='text-amber-500' /><FaStar className='text-amber-500' /><FaStar className='text-amber-500' /><FaStar className='text-amber-500' />
            </div>
          </div>
        </div>
        <div className='w-full lg:w-[10%] flex flex-row h-full gap-4 justify-center'>
          <div className='bg-white dark:bg-zinc-800 p-4 w-[3rem] h-[3rem] rounded-full shadow-lg cursor-pointer'>
            <FaPhoneVolume className='text-lg' />
          </div>
          <div className='bg-white dark:bg-zinc-800 p-4 w-[3rem] h-[3rem] rounded-full shadow-lg cursor-pointer'>
            <FaCommentSms className='text-lg' />
          </div>
        </div>
      </div>
    </div>
  )
}
