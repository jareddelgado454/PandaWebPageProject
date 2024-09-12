import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Download = () => {
    return (
        <div className='flex flex-col justify-center items-center gap-12'>
            <div className='flex flex-col xl:flex-row justify-center items-center gap-12 w-full'>
                <Link href="https://apps.apple.com/us/app/panda-customer/id1670849690?ign-itscg=30200&ign-itsct=apps_box_link"
                    className='xl:w-[80%] xl:h-[34rem]'
                >
                    <Image src={'/image/appstore.png'} width={650} height={650} className='w-full h-full xl:pl-16' />
                </Link>
                <Image src={'/qr/customerApple.png'} width={650} height={650} className='xl:w-[20%] xl:h-[18rem]' />
            </div>
            <div className='flex flex-col xl:flex-row gap-12 w-full items-center justify-center'>
                <Image src={'/image/google.webp'} width={650} height={650} className='xl:w-[20%] xl:h-[6rem]' />
                <Link href="https://play.google.com/store/apps/details?id=com.panda.technician" className='bg-green-panda rounded-2xl px-4 py-2 h-[3rem] font-semibold flex justify-center items-center'>
                    Panda Customer App
                </Link>
            </div>
        </div>
    )
}

export default Download