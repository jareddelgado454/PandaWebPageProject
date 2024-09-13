'use client';
import React, { useState } from 'react'
import Image from 'next/image'
import { FaBars } from 'react-icons/fa6'
const Navbar = () => {
    const [active, setActive] = useState(false);
    const scrolltoHash = function (element_id) {
        const element = document.getElementById(element_id)
        element?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      }
    return (
        <div className='flex flex-wrap justify-between p-6'>
            <div className='flex flex-row flex-nowrap'>
                <div className='bg-[#303030]/50 w-[5rem] h-[5rem] rounded-full shadow-xl flex justify-center items-center border-[#40c48e] cursor-pointer ease-in-out hover:bg-[#303030]/80 hover:border-2 hover:border-[#40c48e] hover:-translate-y-1 hover:scale-110 duration-300'>
                    <Image src={'/panda.webp'} width={300} height={300} className='w-[3.5rem] h-[3rem] ' alt='panda_logo' />
                </div>
            </div>
            <div className='flex flex-col gap-3 relative items-center justify-center'>
                <div onClick={() => setActive(!active)} className=' bg-[#303030]/50 w-[3rem] h-[3rem] rounded-full shadow-xl flex justify-center items-center border-[#40c48e] cursor-pointer ease-in-out hover:bg-[#303030]/80 hover:border-2 hover:border-[#40c48e] hover:-translate-y-1 hover:scale-110 duration-300 xl:hidden'>
                    <FaBars className='text-white' />
                </div>
                <div
                    className={`absolute ${ active ? 'flex bg-[#303030] rounded-lg' : 'hidden' } xl:relative top-20 right-0 2xl:top-0 xl:flex flex-col xl:flex-row flex-nowrap items-center gap-8 text-white`}
                >
                    <p
                        className='bg-[#303030]/60 h-10 rounded-3xl px-10 flex items-center shadow-2xl border-[#40c48e] cursor-pointer ease-in-out hover:bg-[#303030]/80 hover:border-2 hover:border-[#40c48e] hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300'
                        onClick={() => scrolltoHash('About-section')}
                    >
                        About
                    </p>
                    <p
                        className='bg-[#303030]/60 h-10 rounded-3xl px-10 flex items-center shadow-2xl border-[#40c48e] cursor-pointer ease-in-out hover:bg-[#303030]/80 hover:border-2 hover:border-[#40c48e] hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300'
                        onClick={() => scrolltoHash('Service-Section')}
                    >
                        Services
                    </p>
                    <p
                        className='bg-[#303030]/60 h-10 rounded-3xl px-10 flex items-center shadow-2xl border-[#40c48e] cursor-pointer ease-in-out hover:bg-[#303030]/80 hover:border-2 hover:border-[#40c48e] hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300'
                        onClick={() => scrolltoHash('Team-Section')}
                    >
                        Team
                    </p>
                    <p
                        className='bg-[#303030]/60 h-10 rounded-3xl px-10 flex items-center shadow-2xl border-[#40c48e] cursor-pointer ease-in-out hover:bg-[#303030]/80 hover:border-2 hover:border-[#40c48e] hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300'
                        onClick={() => scrolltoHash('Faq-Section')}
                    >
                        Faq
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Navbar