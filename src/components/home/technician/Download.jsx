import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaAppStore, FaGooglePlay } from 'react-icons/fa6'
const Download = () => {
    return (
        <div className='flex flex-col md:flex-row justify-center items-center gap-12 text-[#E6D5C9]'>
            <div className='w-[50%] flex flex-col justify-center items-center gap-8'>
                <FaGooglePlay className='text-4xl xl:text-6xl 2xl:text-9xl' />
                <p className='font-semibold tracking-widest text-center 2xl:text-xl'>Play Store</p>
                <Link href="https://play.google.com/store/apps/details?id=com.panda.technician">
                    <Image src={'/image/google.webp'} width={150} height={150} alt='play_store' className='' />
                </Link>
            </div>
            <div className='w-[50%] flex flex-col justify-center items-center gap-8'>
                <FaAppStore className='text-4xl xl:text-6xl 2xl:text-9xl' />
                <p className='font-semibold tracking-widest text-center 2xl:text-xl'>App Store</p>
                <Link href="https://apps.apple.com/us/app/panda-technician/id1670848100?ign-itscg=30200&ign-itsct=apps_box_promote_link">
                    <Image src={'/image/appstore.png'} width={150} height={150} alt='app_store' className='' />
                </Link>
            </div>
        </div>
    )
}
export default Download