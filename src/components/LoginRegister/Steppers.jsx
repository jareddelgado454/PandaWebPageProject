import React from 'react'
import { FaCheck } from 'react-icons/fa6'

export const Steppers = (props) => {
  return (
    <div className='bg-white w-full h-[4rem] md:w-[45rem] md:h-[5.8rem] rounded-lg slide-in-left' style={{
      boxShadow: '0 5px 10px #1e293b'
    }}>
      <div className='w-full h-full flex flex-row justify-center items-center'>
        <div className='flex flex-row items-center gap-0'>
          <div className='relative'>
            <div className={`${ props.step1 || props.step2 || props.step3 ? 'bg-green-panda' : 'bg-zinc-400' }  rounded-full text-white transition-all ease-linear duration-700`}>
              <p className='w-[3rem] h-[3rem] flex items-center justify-center'>
                <FaCheck />
              </p>  
            </div>
            <p className='absolute w-28 -left-7 font-semibold'>
          
            </p>
          </div>
          <div className={`${props.step2 || props.step3 ? 'bg-green-panda' : 'bg-zinc-400'} h-[0.2rem] w-[3rem] md:h-[0.2rem] md:w-32 transition-all ease-linear duration-250`}></div>
        </div>
        <div className='flex flex-row items-center gap-0'>
          <div className='relative'>
            <div className={`${props.step2 || props.step3 ? 'bg-green-panda' : 'bg-zinc-400'} rounded-full text-white transition-all ease-linear duration-700`}>
              <p className='w-[3rem] h-[3rem] flex items-center justify-center'>2</p>
            </div>
          </div>
          <div className={`${props.step3 ? 'bg-green-panda' : 'bg-zinc-400'} h-[0.2rem] w-[3rem] md:h-[0.2rem] md:w-32 transition-all ease-linear duration-250`}></div>
        </div>
        <div className='flex flex-row items-center gap-0'>
          <div className='relative'>
            <div className={`${props.step3 ? 'bg-green-panda' : 'bg-zinc-400'} rounded-full text-white transition-all ease-linear duration-700`}>
              <p className='w-[3rem] h-[3rem] flex items-center justify-center'>
                3
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
