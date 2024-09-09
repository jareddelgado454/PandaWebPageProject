import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6'

export default function Footer() {
  return (
    <div className='bg-zinc-900/50 py-8'>
        <div className='flex flex-col gap-4 justify-center items-center'>
            <div className='flex flex-row gap-4 justify-center items-center'>
                <FaFacebook className='transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-100 cursor-pointer text-2xl' color='#0068C8'/>
                <FaYoutube className='transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-100 cursor-pointer text-2xl' color='#881337'/>
                <FaXTwitter className='transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-100 cursor-pointer text-2xl text-black'/>
                <FaLinkedin className='transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-100 cursor-pointer text-2xl' color='#075985'/>
                <FaTiktok className='transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-100 cursor-pointer text-2xl text-black'/>
                <FaInstagram className='transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-100 cursor-pointer text-2xl' color='#ef4444'/>
            </div>
            <p className='text-[#C0B2A9] font-semibold tracking-wider text-xs xl:text-base leading-loose text-center'>Email us at contact@panda-mars.com   |   7600 Chevy Chase Dr, Austin, TX 78752   |   Call or text us at (737) 366-6773</p>
            <div className='flex gap-2 tracking-wider flex-wrap justify-center items-center'>
                <p className='text-[#C0B2A9] w-full text-center text-xs xl:text-base leading-loose'>© 2024 The Panda M.A.R.S. LLC. All rights reserved.</p>
                <Link href={"/politics/privacy"} className='text-[#40C48E] hover:text-[#40C48E]/50 text-xs xl:text-base underline cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-100 duration-100'>
                    Privacy Policy
                </Link>
                <Link href={"/politics/terms"} className='text-[#40C48E] hover:text-[#40C48E]/50 text-xs xl:text-base underline cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-100 duration-100'>
                    Terms and Conditions
                </Link>
            </div>
        </div>
    </div>
  )
}
