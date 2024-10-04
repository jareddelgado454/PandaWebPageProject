"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { FaBrain, FaScrewdriverWrench, FaStreetView } from 'react-icons/fa6';
import { RiArrowRightLine } from "react-icons/ri";

const Service = () => {
  const [selected, setSelected] = useState('customerApp');

  const services = [
    {
      id: 'customerApp',
      icon: <FaStreetView className='text-[40px] transition-colors duration-150' />,
      title: 'Customer App',
      description: '¡The easiest way to request vehicle repair services right from your location!',
      link: '/home/customer',
    },
    {
      id: 'technicianApp',
      icon: <FaScrewdriverWrench className='text-[40px] transition-colors duration-150' />,
      title: 'Technician App',
      description: 'The most efficient platform for providing vehicle repair services directly where the customer needs you.',
      link: '/home/technician',
    },
    {
      id: 'elearningApp',
      icon: <FaBrain className='text-[40px] transition-colors duration-150' />,
      title: 'Panda AI App',
      description: 'Generative A.I Project to create personalized, step-by-step repair guides tailored to individual skill levels, learning preferences and more.',
      link: '/home/generative',
    },
  ];

  return (
    <div className='py-2 px-4 w-full flex flex-col items-center' id="Service-Section">
      <div className='flex justify-center w-[80%] items-center flex-wrap text-lightWhite mb-6'>
        <div className='w-full flex flex-col gap-2 items-end mt-6 mb-16'>
          {/* <p className='text-meant font-semibold text-xs xl:text-lg text-right'>¿What do we do?</p> */}
          <p className="bg-gradient-to-r from-midGray to-lightWhite bg-clip-text text-transparent font-black font-chackra tracking-[3px] text-3xl 2xl:text-6xl">
            Our Services
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-y-7 gap-x-9 mb-12'>
          {services.map((service) => (
            <div
              key={service.id}
              className='relative w-full xl:w-[25rem] cursor-pointer flex'
              onClick={() => setSelected(service.id)}
            >
              {/* Div detrás simulando el borde */}
              <div
                className={`absolute top-0 left-0 w-full h-full rounded-xl -z-10 transition-all duration-150
                  ${selected === service.id ? 'bg-transparent' : 'bg-gradient-to-br from-midGray to-raisinBlack scale-[1.01]'}
                `}
              ></div>

              {/* Contenedor principal */}
              <div
                className={`relative z-20 flex flex-col justify-center gap-10 p-6 py-10 rounded-xl transition-all duration-150 
                  ${selected === service.id ? 'bg-meant text-darkBlack scale-110' : 'bg-gradient-to-b from-darkGray to-darkBlack'}
                  min-h-[350px] h-full flex-grow group
                `}
              >
                {/* Ícono y texto con transición */}
                <div className={`transition-colors w-[80px] h-[80px] bg-midGray/50 flex items-center justify-center rounded-full duration-150 ${selected === service.id ? 'text-meant' : 'group-hover:text-meant'}`}>
                  <div className='w-[62px] h-[62px] rounded-full bg-raisinBlack flex items-center justify-center'>
                    {service.icon}
                  </div>
                </div>

                <div className='flex flex-col gap-3 flex-grow '>
                  <p className={`font-chackra  font-extrabold  text-[30px] 
                    ${selected === service.id ? 'text-darkBlack' : 'group-hover:text-meant'}
                    transition-colors duration-150
                  `}>
                    {service.title}
                  </p>
                  <p className={`text-[17px] font-jost  
                    ${selected === service.id ? 'text-darkBlack font-normal' : 'text-lightGray group-hover:text-meant'}
                    transition-colors duration-150 
                  `}>
                    {service.description}
                  </p>
                  {selected === service.id && (
                    <Link href={service.link}
                      className='mt-4 bg-darkBlack flex flex-row text-meant px-6 py-3 rounded-full text-xs xl:text-sm font-bold hover:bg-raisinBlack  transition-colors duration-150'
                    >
                      Go to this App
                      <RiArrowRightLine className='text-meant text-[20px]'/>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-[1px] flex w-full bg-gradient-to-r from-darkGray to-raisinBlack mb-4 mt-6 text-transparent select-none">
          a
        </div>
      </div>
    </div>
  );
};

export default Service;
