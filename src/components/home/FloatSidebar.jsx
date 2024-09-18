'use client';
import React from 'react'
import { Tooltip, useDisclosure } from '@nextui-org/react';
import Link from 'next/link';
import { FaBrain, FaMoneyCheckDollar, FaScrewdriverWrench, FaStreetView } from 'react-icons/fa6';
import { PlansModal } from './modals/PlansModal';

export const FloatSidebar = () => {
  const {
    isOpen: isPlansModalOpen,
    onOpen: onPlansModalOpen,
    onOpenChange: onPlansModalOpenChange,
  } = useDisclosure();
  return (
    <div className='fixed bg-[#18181B]/60 rounded-lg shadow-lg px-5 py-5 text-[#E6D5C9] right-4 top-[35%] z-20'>
      <PlansModal isOpen={isPlansModalOpen} onOpenChange={onPlansModalOpenChange} />
      <div className='flex flex-col gap-6'>
        <Link href={'/home/customer'}>
          <FaStreetView className='text-2xl cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300' />
        </Link>
        <Link href={'/home/technician'}>
          <FaScrewdriverWrench className='text-2xl cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300' />
        </Link>
        <Link href={'/home/generative'}>
          <FaBrain className='text-2xl cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300' />
        </Link>
        <FaMoneyCheckDollar onClick={onPlansModalOpen} className='text-2xl cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300' />
      </div>
    </div>
  )
}
