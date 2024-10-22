'use client';
import React from 'react';
import { Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { FaBrain, FaScrewdriverWrench, FaStreetView } from 'react-icons/fa6';

export const FloatSidebar = () => {
  return (
    <div className='dark fixed bg-zinc-900 border-[1px] border-raisinBlack rounded-lg shadow-lg px-5 py-5 text-lightWhite right-4 top-[35%] z-20'>
      <div className='flex flex-col gap-8'>
        {/* Customer App Tooltip */}
        <Tooltip content="Customer App" delay={0} closeDelay={0} placement='left-start' className='bg-meant text-darkBlack font-semibold'>
          <Link href={'/home/customer'}>
            <FaStreetView className='text-2xl cursor-pointer ease-in-out hover:font-semibold hover:text-meant hover:-translate-y-1 hover:scale-110 duration-300' />
          </Link>
        </Tooltip>

        {/* Technician App Tooltip */}
        <Tooltip content="Technician App" delay={0} closeDelay={0} placement='left-start' className='bg-meant text-darkBlack font-semibold'>
          <Link href={'/home/technician'}>
            <FaScrewdriverWrench className='text-2xl cursor-pointer ease-in-out hover:font-semibold hover:text-meant  hover:-translate-y-1 hover:scale-110 duration-300' />
          </Link>
        </Tooltip>

        {/* GenAI Panda Tooltip */}
        <Tooltip content="GenAI Panda" delay={0} closeDelay={0} placement='left-start' className='bg-meant text-darkBlack font-semibold'>
          <Link href={'/home/generative'}>
            <FaBrain className='text-2xl cursor-pointer ease-in-out hover:font-semibold hover:text-meant  hover:-translate-y-1 hover:scale-110 duration-300' />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};
