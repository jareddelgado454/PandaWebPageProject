"use client"
import React, { useState } from 'react';
import { FaMoneyBill, FaScrewdriverWrench  } from 'react-icons/fa6';
import { RiBarChartGroupedFill } from "react-icons/ri";
import { RiArrowRightLine } from "react-icons/ri";

const DescriptionCustomer = () => {
  const [selected, setSelected] = useState('customerApp');

  const services = [
    {
      id: 'customerApp',
      icon: <RiBarChartGroupedFill  className='text-[35px] transition-colors duration-150' />,
      title: 'The process is fast and transparent',
      description: 'People get in touch directly, without intermediaries, and quickly discuss details',
      link: '/customer-app',
    },
    {
      id: 'technicianApp',
      icon: <FaScrewdriverWrench className='text-[35px] transition-colors duration-150' />,
      title: 'Our specialists are verified',
      description: 'Technicians go through a complete verification process and accredit their skills, to ensure the best possible service',
      link: '/technician-app',
    },
    {
      id: 'elearningApp',
      icon: <FaMoneyBill className='text-[35px] transition-colors duration-150' />,
      title: 'Fair prices',
      description: 'The price will be appropriate so that it is win-win for both parties. Fair pay inspires quality work',
      link: '/elearning-app',
    },
  ];

  return (
    <div className='py-2 px-4 w-full flex flex-col items-center' id="Service-Section">
      <div className='flex justify-center w-[80%] items-center flex-wrap text-lightWhite mb-6'>
        <div className='w-full flex flex-col gap-2 items-end mt-6 mb-16'>
          <p className="bg-gradient-to-r from-lightGray to-lightWhite bg-clip-text text-transparent font-black font-chackra  text-3xl 2xl:text-6xl">
            People stay with us because
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
                  ${selected === service.id ? 'bg-transparent' : 'bg-gradient-to-br from-darkBlack to-raisinBlack scale-[1.01]'}
                `}
              ></div>

              {/* Contenedor principal */}
              <div
                className={`relative z-20 flex flex-col justify-center gap-6 p-6 py-10 rounded-xl transition-all duration-150 
                  ${selected === service.id ? 'bg-meant text-darkBlack scale-110' : 'bg-gradient-to-b from-darkGray to-darkBlack'}
                  min-h-[350px] h-full flex-grow group
                `}
              >
                {/* Ícono y texto con transición */}
                <div className={`transition-colors w-[78px] h-[78px] shadow-lg flex items-center text-darkBlack justify-center rounded-full duration-150 ${selected === service.id ? 'text-meant bg-darkBlack' : ' bg-meant'}`}>
                  <div className={`w-[65px] h-[65px] rounded-full border-[4px]  flex items-center justify-center ${selected === service.id ? 'text-meant bg-darkBlack border-meant' : ' bg-meant border-raisinBlack'}`}>
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
                    <div
                      className='mt-4 flex flex-row items-center text-darkBlack py-3 rounded-full text-[18px] font-bold font-chackra transition-colors duration-150'
                    >
                      Learn more
                      <RiArrowRightLine className='text-darkBlack text-[22px] ml-2'/>
                    </div>
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

export default DescriptionCustomer;
