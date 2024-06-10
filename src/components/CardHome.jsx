import React from 'react'
import { RiTeamFill, RiTaxiFill, RiGroupFill } from "react-icons/ri";

const CardHome = ({type, numberActive, lastRegistrations}) => {
  return (
    <div
        className='hover:text-gray-200 text-white bg-zinc-600 dark:bg-zinc-800 dark:text-gray-300 dark:hover:text-white w-full lg:w-[90%] h-[220px] rounded-xl shadow-2xl px-8 py-5 flex flex-col justify-between transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer'
    >
        <div className='w-full flex justify-between items-center'>
            {
                type == "Customers" ? (
                    <RiGroupFill className='text-[50px]'/>
                ) : type == "Technicians" ? (
                    <RiTaxiFill className='text-[50px]'/>
                ) : (
                    <RiTeamFill className='text-[50px]'/>
                )
            }
            
            <h3 className='text-[50px] font-bold'>{numberActive}</h3>
        </div>
        <div className='w-full flex justify-between items-center'>
            <p className='font-bold text-base'>{type}</p>
            {
                type == "Customers" ? (
                    <p className='text-sm text-center'>Last Customers: +{lastRegistrations}</p>
                ) : type == "Technicians" ? (
                    <p className='text-sm text-center'>Last Technicians: +{lastRegistrations}</p>
                ) : (
                    <p className='text-sm text-center'>Last Users: +{lastRegistrations}</p>
                )
            }
        </div>
    </div>
  )
}

export default CardHome