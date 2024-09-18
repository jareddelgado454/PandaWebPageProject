import React from 'react';
import { Wave } from '../Wave';
import { NavbarSection } from '..';
import Link from 'next/link';
const Banner = () => {
    return (
        <div
            style={{
                backgroundImage: `url('/image/wallpaper.webp')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
            className='h-full w-full z-10 relative'
            id="Home-Section"
        >
            <div className='bg-[#303030]/60 inset-0 w-full h-full'>
                <NavbarSection />
                <div className='flex flex-col justify-center items-center gap-7 h-[65%] w-[100%] 2xl:w-[40%] select-none relative z-10'>
                    <p className='text-[#E6D5C9] font-black tracking-wider text-3xl 2xl:text-6xl text-center'>The Panda M.A.R.S</p>
                    <p className='text-[#E6D5C9]/60 text-sm 2xl:text-base px-16 text-center leading-loose tracking-widest'>
                    Easily find a reliable, friendly, and affordable mobile mechanic near you using <strong className='text-[#40C48E]'>The Panda Mobile Auto Repair Service</strong>
                    </p>
                    <div className='flex flex-row gap-5 group'>
                        <Link href="https://docs.google.com/forms/d/e/1FAIpQLScSmzQFA-dctzv8iXYSACm8-d8Q_5e5VyEcUoNURB8pxlwLTA/viewform" className='border-2 border-[#40c48e] text-white tracking-wider rounded-3xl px-5 py-2 cursor-pointer transition-all ease-in-out group-hover:bg-green-panda group-hover:font-semibold group-hover:-translate-y-1 group-hover:scale-110 duration-300'>
                            Sign Up Form
                        </Link>
                    </div>
                </div>
                <Wave />
            </div>
        </div>
    )
}
export default Banner;