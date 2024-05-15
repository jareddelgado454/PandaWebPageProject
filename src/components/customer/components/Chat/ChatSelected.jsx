import Image from 'next/image'
import React from 'react'
import { FaPhone } from 'react-icons/fa6'
import ChatAnswerInput from './ChatAnswerInput'

export default function ChatSelected() {
    return (
        <div className='flex flex-col gap-2 w-full h-full relative'>
            <div id='header' className='w-full dark:bg-zinc-700 p-2 rounded-lg flex flex-row justify-between gap-2'>
                <div className='flex flex-row gap-2'>
                    <Image
                        src={`/logo.jpg`}
                        width={50}
                        height={50}
                        alt='alt_profile_technician_selected'
                        className='w-[3rem] h-[3rem] rounded-full'
                    />
                    <div className='flex flex-col'>
                        <p>Elio David Saavedra Sanchez</p>
                        <p className='text-sm dark:text-zinc-400'>online</p>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='rounded-full p-3 dark:bg-zinc-800'>
                        <FaPhone />
                    </div>
                </div>
            </div>
            <ChatAnswerInput />
        </div>
    )
}
