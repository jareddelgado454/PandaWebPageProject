import React from 'react';
import { FaCheck } from 'react-icons/fa6';

export const ScheduleSteppers = ({ currentStep }) => {
  return (
    <div className='w-full h-[4rem] md:h-[5.8rem]'>
      <div className='w-full h-full flex flex-row justify-center items-center'>
        {['Select a technician', 'Check Available','Confirmation'].map((step, index) => {
          const stepNumber = index + 1;
          return (
            <React.Fragment key={index}>
              <div className='flex flex-row items-center gap-0'>
                <div className='relative'>
                  <div className={`${currentStep >= stepNumber ? 'bg-green-panda' : 'bg-zinc-400'} rounded-full text-white transition-all ease-linear duration-700`} style={{ boxShadow: currentStep >= stepNumber ? '0 5px 10px #40C48E' : 'none' }}>
                    <p className='w-[2rem] h-[2rem] flex items-center justify-center'>
                      {currentStep >= stepNumber ? <FaCheck /> : stepNumber}
                    </p>
                  </div>
                  <div className='absolute w-32 -right-12 font-semibold -bottom-7'>
                    <div className='flex flex-col justify-center items-center'>
                      <p className='text-xs text-center tracking-wider'>{step}</p>
                    </div>
                  </div>
                </div>
                {stepNumber < 3 && (
                  <div className={`${currentStep > stepNumber ? 'bg-green-panda' : 'bg-zinc-400'} h-[0.2rem] w-[3rem] md:h-[0.2rem] md:w-12 xl:w-40 transition-all ease-linear duration-250`}></div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};