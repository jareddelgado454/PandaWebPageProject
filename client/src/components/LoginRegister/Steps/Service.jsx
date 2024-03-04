import React from 'react';
import { FaApple, FaArrowRight, FaFacebook, FaGoogle } from 'react-icons/fa6';

export const Service = (props) => {

    const handleChangeStep = () => {
        props.setActiveStep1(false);
        props.setActiveStep2(true);
    }

  return (
    <div className='bg-white w-[21rem] h-2/3 md:w-[45rem] md:h-[29rem] transition-all rounded-lg slide-in-left' style={{
        boxShadow: '0 5px 10px #1e293b'
    }}>
        <div className='flex flex-col items-center justify-center h-full gap-8'>
            <p className='text-center font-bold text-lg'>
                Select a Service to Signup
            </p>
            <button
                type='button'
                className='bg-blue-800 shadow-lg text-white font-bold p-4 rounded w-[20rem] flex flex-row justify-center items-center gap-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300'
            >
                <FaFacebook className='text-xl' />
                Continue with Facebook
            </button>
            <button
                type='button'
                className='bg-white shadow-lg text-rose-600 font-bold p-4 rounded w-[20rem] flex flex-row justify-center items-center gap-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300'
            >
                <FaGoogle className='text-rose-700' />
                Continue with Google
            </button>
            <button
                type='button'
                className='bg-black shadow-lg font-bold text-white p-4 rounded w-[20rem] flex flex-row justify-center items-center gap-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300'
            >
                <FaApple className='text-2xl' />
                Continue with Apple
            </button>
            <button
                onClick={handleChangeStep}
                type='button'
                className='bg-green-panda shadow-lg font-bold text-white p-4 rounded w-[20rem] flex flex-row justify-center items-center gap-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300'
            >
                Continue with Email
                <FaArrowRight />
            </button>
        </div>
    </div>
  )
}