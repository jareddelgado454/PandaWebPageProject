import React from 'react'
import { FaCheck } from 'react-icons/fa6'

export const Steppers = (props) => {
  return (
    <div className='w-full h-[4rem] md:h-[5.8rem]'>
      <div className='w-full h-full flex flex-row justify-center items-center'>
        <div className='flex flex-row items-center gap-0'>
          <div className='relative'>
            <div className={`${props.step1 || props.step2 || props.step3 ? 'bg-green-panda' : 'bg-zinc-400'}  rounded-full text-white transition-all ease-linear duration-700`} style={{
              boxShadow: '0 5px 10px #40C48E'
            }}>
              <p className='w-[3rem] h-[3rem] flex items-center justify-center'>
                <FaCheck />
              </p>
            </div>
            <div className='absolute w-28 -left-7 font-semibold -bottom-7'>
              <div className='flex flex-col justify-center items-center'>
                <p className='text-xs'>Service accepted</p>
              </div>
            </div>
          </div>
          <div className={`${props.step2 ? 'bg-green-panda' : 'bg-zinc-400'} h-[0.2rem] w-[3rem] md:h-[0.2rem] md:w-12 transition-all ease-linear duration-250`}></div>
        </div>
        <div className='flex flex-row items-center gap-0'>
          <div className='relative'>
            <div className={`${props.step2 || props.step3 ? 'bg-green-panda' : 'bg-zinc-400'} rounded-full text-white transition-all ease-linear duration-700`}>
              <p className='w-[3rem] h-[3rem] flex items-center justify-center'>2</p>
            </div>
            <div className='absolute w-28 -left-7 font-semibold -bottom-7'>
              <div className='flex flex-col justify-center items-center'>
                <p className='text-xs'>On the way</p>
              </div>
            </div>
          </div>
          <div className={`${props.step3 ? 'bg-green-panda' : 'bg-zinc-400'} h-[0.2rem] w-[3rem] md:h-[0.2rem] md:w-12 transition-all ease-linear duration-250`}></div>
        </div>
        <div className='flex flex-row items-center gap-0'>
          <div className='relative'>
            <div className={`${ props.step3 ? 'bg-green-panda' : 'bg-zinc-400'} rounded-full text-white transition-all ease-linear duration-700`}>
              <p className='w-[3rem] h-[3rem] flex items-center justify-center'>3</p>
            </div>
            <div className='absolute w-28 -left-7 font-semibold -bottom-7'>
              <div className='flex flex-col justify-center items-center'>
                <p className='text-xs'>In progress</p>
              </div>
            </div>
          </div>
          <div className={`${props.step3 ? 'bg-green-panda' : 'bg-zinc-400'} h-[0.2rem] w-[3rem] md:h-[0.2rem] md:w-12 transition-all ease-linear duration-250`}></div>
        </div>
        <div className='flex flex-row items-center gap-0'>
          <div className='relative'>
            <div className={`${props.step3 ? 'bg-green-panda' : 'bg-zinc-400'} rounded-full text-white transition-all ease-linear duration-700`}>
              <p className='w-[3rem] h-[3rem] flex items-center justify-center'>
                4
              </p>
            </div>
            <div className='absolute w-28 -left-7 font-semibold -bottom-7'>
              <div className='flex flex-col justify-center items-center'>
                <p className='text-xs'>Completed</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
