'use client';
import React, { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import ServiceForm from './ServiceForm';
export default function RequestInput() {
    const [isInputActive, setIsInputActive] = useState(false);
    return (
        <>
            <div className={`transtion-all duration-300 absolute ${isInputActive ? 'bottom-[13rem]' : 'bottom-0 delay-[10ms]'} left-[48%] transform w-full`}>
                <div className='w-[3rem] h-[3rem] bg-white dark:bg-zinc-900 rounded-t-full cursor-pointer' onClick={() => setIsInputActive(!isInputActive)}>
                    <div className='flex justify-center items-center w-full h-full'>
                        <FaArrowUp className={`transition-all duration-250 ${isInputActive ? 'rotate-180' : 'rotate-0'}`} />
                    </div>
                </div>

            </div>
            <div className='flex items-center justify-center h-[220px]'>
                <div className={`dark:bg-zinc-900 rounded-t-lg bg-white absolute shadow transition-all ${isInputActive ? '-bottom-0 h-[220px] duration-500' : '-bottom-6 h-0 delay-[73ms] duration-700'} w-[80%]`}>
                    <ServiceForm />
                </div>
            </div>
        </>
    )
}
