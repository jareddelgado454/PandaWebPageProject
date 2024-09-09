import { Tooltip } from '@nextui-org/react';
import React from 'react'
import { FaBrain, FaMoneyCheckDollar, FaScrewdriverWrench, FaStreetView } from 'react-icons/fa6';

export const FloatSidebar = () => {
  return (
    <div className='fixed bg-[#18181B]/60 rounded-lg shadow-lg px-5 py-5 text-[#E6D5C9] right-4 top-[35%] z-10'>
        <div className='flex flex-col gap-6'>
            <Tooltip placement='left' content="Customer Page">
              <FaStreetView className='text-2xl cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300' />
            </Tooltip>
            <Tooltip placement='left' content="Technician Page">
            <FaScrewdriverWrench className='text-2xl cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300' />
            </Tooltip>
            <Tooltip placement='left' content="Generative A.I Page">
              <FaBrain className='text-2xl cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300' />
            </Tooltip>
            <Tooltip placement='left' content="Plans & Prices">
              <FaMoneyCheckDollar className='text-2xl cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300' />
            </Tooltip>
        </div>
    </div>
  )
}
