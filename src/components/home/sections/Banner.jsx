import React from 'react';
import Image from 'next/image';
import { Wave } from '../Wave';
const Banner = () => {
    return (
        <div
            style={{
                backgroundImage: `url('/image/wallpaper.webp')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
            className='h-full w-full'
        >
            <div className='bg-[#303030]/60 inset-0 w-full h-full'>
                <div className='flex flex-wrap justify-between p-6'>
                    <div className='flex flex-row flex-nowrap'>
                        <div className='bg-[#303030]/50 w-[5rem] h-[5rem] rounded-full shadow-xl flex justify-center items-center border-[#40c48e] cursor-pointer ease-in-out hover:bg-[#303030]/80 hover:border-2 hover:border-[#40c48e] hover:-translate-y-1 hover:scale-110 duration-300'>
                            <Image src={'/panda.webp'} width={300} height={300} className='w-[3.5rem] h-[3rem] ' alt='panda_logo' />
                        </div>
                    </div>
                    <div className='flex flex-row flex-nowrap items-center gap-8 text-white'>
                        <p className='bg-[#303030]/50 h-10 rounded-3xl px-10 flex items-center shadow-2xl border-[#40c48e] cursor-pointer ease-in-out hover:bg-[#303030]/80 hover:border-2 hover:border-[#40c48e] hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300'>Home</p>
                        <p className='bg-[#303030]/50 h-10 rounded-3xl px-10 flex items-center shadow-2xl border-[#40c48e] cursor-pointer ease-in-out hover:bg-[#303030]/80 hover:border-2 hover:border-[#40c48e] hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300'>About</p>
                        <p className='bg-[#303030]/50 h-10 rounded-3xl px-10 flex items-center shadow-2xl border-[#40c48e] cursor-pointer ease-in-out hover:bg-[#303030]/80 hover:border-2 hover:border-[#40c48e] hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300'>Services</p>
                        <p className='bg-[#303030]/50 h-10 rounded-3xl px-10 flex items-center shadow-2xl border-[#40c48e] cursor-pointer ease-in-out hover:bg-[#303030]/80 hover:border-2 hover:border-[#40c48e] hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300'>Faq</p>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-7 h-[65%] w-[50%] 2xl:w-[40%] select-none'>
                    <p className='text-[#E6D5C9] font-black tracking-wider text-5xl 2xl:text-6xl'>The Panda M.A.R.S</p>
                    <p className='text-[#E6D5C9]/60 text-sm 2xl:text-base px-16'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className='flex flex-row gap-5'>
                        <button className='border-2 border-[#40c48e] text-white tracking-wider rounded-3xl px-5 py-2 cursor-pointer transition-all ease-in-out hover:bg-green-panda hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300'
                            type='button'
                        >
                            SignIn
                        </button>
                        <button className='border-2 border-[#40c48e] text-white tracking-wider rounded-3xl px-5 py-2 cursor-pointer transition-all ease-in-out hover:bg-green-panda hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300'
                            type='button'
                        >
                            SignUp
                        </button>
                    </div>
                </div>
                <Wave />
            </div>
        </div>
    )
}
export default Banner;