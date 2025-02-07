import React from 'react';
import { FaCheck } from 'react-icons/fa6';
export const Steppers = ({ currentStep }) => {
  return (
    <div className='w-full h-[4rem] md:h-[5.8rem]'>
      <div className='w-full h-full flex flex-row justify-center items-center'>
        {['Service accepted', 'On the way', 'In progress', 'payment', 'Completed'].map((step, index) => {
          const stepNumber = index + 1;
          return (
            <React.Fragment key={index}>
              <div className='flex flex-row items-center gap-0'>
                <div className='relative'>
                  <div className={`${currentStep >= stepNumber ? 'bg-green-panda' : 'bg-zinc-400'} rounded-full text-white transition-all ease-linear duration-700`} style={{ boxShadow: currentStep >= stepNumber ? '0 5px 10px #40C48E' : 'none' }}>
                    <p className='w-[3rem] h-[3rem] flex items-center justify-center'>
                      {currentStep >= stepNumber ? <FaCheck /> : stepNumber}
                    </p>
                  </div>
                  <div className='absolute w-28 -left-7 font-semibold -bottom-7'>
                    <div className='flex flex-col justify-center items-center'>
                      <p className='text-xs'>{step}</p>
                    </div>
                  </div>
                </div>
                {stepNumber < 5 && (
                  <div className={`${currentStep > stepNumber ? 'bg-green-panda' : 'bg-zinc-400'} h-[0.2rem] w-[3rem] md:h-[0.2rem] md:w-12 transition-all ease-linear duration-250`}></div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};