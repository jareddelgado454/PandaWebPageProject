import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { FooterSection } from '@/components/home'
export default function layout({ children }) {
  return (
    <div className='relative'>
        {children}
        <Link
          href={'/'}
          className='fixed bottom-6 right-6 bg-green-panda rounded-full p-4 shadow-2xl transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-200 cursor-pointer'
        >
          <FaArrowLeft />
        </Link>
        <FooterSection />
    </div>
  )
}
