import React from 'react';
import { FaCircleCheck, FaRegStar, FaStar } from 'react-icons/fa6';
import Image from 'next/image';
export default function InformationHeader({ user }) {
  return (
    <div
      className="bg-cover h-[10.5rem] w-full md:w-full bg-fixed bg-bottom rounded-t-lg bg-[#E4E6EB] dark:bg-zinc-900 relative"
    >
      <div className='absolute top-3'>
        <div className='flex items-center gap-5 h-full px-8'>
          
          <Image
            src={`https://d3nqi6yd86hstw.cloudfront.net/public/user-profile-pictures/ded0fd80-2ab7-4a57-92eb-4440987a358f.jpg`}
            width={400}
            height={400}
            className='rounded-full h-[9rem] w-[9rem] border-emerald-600 border-3'
            alt='profile_customer_picture'
            priority
          />
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
              <p>Welcome back, <strong className='text-[#40C48E]'>{user && user['custom:fullName']  ? user['custom:fullName'] : (user && user.name)}</strong></p>
              <FaStar className='text-amber-500' /><FaStar className='text-amber-500' /><FaStar className='text-amber-500' /><FaStar className='text-amber-500' />
              <FaRegStar className='text-amber-500' />
              <p>4 stars</p>
            </div>
            <p className=''>{user && user.email}</p>
            {user && user.email_verified && <div className='flex items-center gap-1'><p className='text-[#40C48E]'>Verified </p><FaCircleCheck className='text-[#40C48E]' /></div>}
          </div>
        </div>
      </div>
    </div>
  )
}
