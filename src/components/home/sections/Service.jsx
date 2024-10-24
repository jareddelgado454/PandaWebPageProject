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
      icon: <FaStreetView className='md:text-[40px] text-[30px] transition-colors duration-150' />,
      title: 'Customer App',
      description: '¡The easiest way to request vehicle repair services right from your location!',
      link: '/home/customer',
    },
    {
      id: 'technicianApp',
      icon: <FaScrewdriverWrench className='md:text-[40px] text-[30px] transition-colors duration-150' />,
      title: 'Technician App',
      description: 'The most efficient platform for providing vehicle repair services directly where the customer needs you.',
      link: '/home/technician',
    },
    {
      id: 'elearningApp',
      icon: <FaBrain className='md:text-[40px] text-[30px] transition-colors duration-150' />,
      title: 'Panda AI App',
      description: 'Generative A.I Project to create personalized, step-by-step repair guides tailored to individual skill levels, learning preferences and more.',
      link: '/home/generative',
    },
  ];

  return (
    <div className='py-2 px-4 w-full flex flex-col items-center' id="Service-Section">
      <div className='flex justify-center xl:w-[80%] w-full items-center flex-wrap text-lightWhite mb-6'>
        <div className='w-full flex flex-col gap-2 mt-6 mb-16'>
          <p className="bg-gradient-to-r from-midGray to-lightWhite bg-clip-text text-transparent font-black font-chackra tracking-[3px] text-4xl 2xl:text-6xl text-center">
            Our Services
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-y-7 gap-x-9 mb-12 z-0'>
          {services.map((service) => (
            <div
              key={service.id}
              className='relative w-full xl:w-[25rem] cursor-pointer flex'
              onClick={() => setSelected(service.id)}
            >
              {/* Div detrás simulando el borde */}
              <div
                className={`absolute top-0 left-0 w-full h-full rounded-xl -z-10 transition-all duration-150
                  ${selected === service.id ? 'bg-transparent' : 'bg-gradient-to-br md:from-midGray from-darkGray to-raisinBlack scale-[1.01]'}`}
              ></div>

              {/* Contenedor principal */}
              <div
                className={`relative z-20 flex flex-col justify-center md:gap-10 gap-4 p-6 md:py-10 py-6 rounded-xl transition-all duration-150 
                  ${selected === service.id ? 'bg-meant text-darkBlack md:scale-110' : 'bg-gradient-to-b from-darkGray to-darkBlack'}
                  md:min-h-[350px] min-h-[260px] h-full flex-grow group`}
              >
                {/* Ícono y texto con transición */}
                <div className={`transition-colors md:w-[80px] w-[60px] md:h-[80px] h-[60px] bg-midGray/50 flex items-center justify-center rounded-full duration-150 ${selected === service.id ? 'text-meant' : 'group-hover:text-meant'}`}>
                  <div className='md:w-[62px] w-[48px] md:h-[62px] h-[48px] rounded-full bg-raisinBlack flex items-center justify-center'>
                    {service.icon}
                  </div>
                </div>

                <div className='flex flex-col gap-3 flex-grow '>
                  <p className={`font-chackra font-extrabold text-[30px] 
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

                  {/* Botón siempre visible con estilos condicionales */}
                  <Link href={service.link}
                    className={`mt-4 flex flex-row px-6 py-3 rounded-full text-xs xl:text-sm font-bold transition-colors duration-150
                      ${selected === service.id ? 'bg-darkBlack text-meant hover:bg-raisinBlack' : 'bg-raisinBlack text-white hover:bg-lightMeant'}`}
                  >
                    Go to this App
                    <RiArrowRightLine className={`text-[20px] ${selected === service.id ? 'text-meant' : 'bg-raisinBlack text-white'}`} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-[1px] flex w-full bg-gradient-to-r md:from-darkGray from-midGray to-raisinBlack mb-4 md:mt-6 mt-3 text-transparent select-none">
          a
        </div>
      </div>
    </div>
  );
};

export default Service;
