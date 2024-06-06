import React from 'react'
import Link from 'next/link';
import { FaRegComment, FaRegHandPointUp, FaRegIdCard, FaRegRectangleList } from 'react-icons/fa6';
export default function BlockThreeComponente() {
    const numbers = [
        {
            name: "Chats",
            icon: <FaRegComment className='text-[#40C48E] dark:text-[#BCB4B4] text-3xl 2xl:text-5xl group-hover:text-white dark:group-hover:text-[#40C48E]' />,
            description: "List your chats between you and the differents technicians in our platform.",
            link: '/customer/messages'
        },
        {
            name: "Make a service request",
            icon: <FaRegHandPointUp className='text-[#40C48E] dark:text-[#BCB4B4] text-3xl 2xl:text-5xl group-hover:text-white dark:group-hover:text-[#40C48E]' />,
            description: "Make a request and our technicians would love to help you without any problems.",
            link: '/customer/service'
        },
        {
            name: "My requests",
            icon: <FaRegRectangleList className='text-[#40C48E] dark:text-[#BCB4B4] text-3xl 2xl:text-5xl group-hover:text-white dark:group-hover:text-[#40C48E]' />,
            description: "List your services request.",
            link: '/customer/request'
        },
        {
            name: "My information",
            icon: <FaRegIdCard className='text-[#40C48E] dark:text-[#BCB4B4] text-3xl 2xl:text-5xl group-hover:text-white dark:group-hover:text-[#40C48E]' />,
            description: "See your complete information in our platform.",
            link: '/customer/profile'
        },
    ];
    "Chats", "Make a request", "My Requests", "My Information"
    return (
        <div className='flex flex-col w-full gap-4 my-2 py-4 h-full'>
            <p className='p-2 text-zinc-950 dark:text-white font-semibold'>Shortcuts:</p>
            <div className='flex flex-col xl:flex-row gap-5 justify-center items-center w-full h-full px-4'>

                {numbers.map((item, i) => (
                    <Link
                        href={item.link}
                        key={i}
                        className='bg-white dark:bg-zinc-800 dark:hover:bg-zinc-950 hover:bg-[#40C48E] dark:hover:shadow-[0_4px_0px_rgb(0,0,0)] w-[90%] h-[15rem] rounded-lg xl:w-[23rem] xl:h-[92%] cursor-pointer transition-all ease-out hover:-translate-y-2 hover:scale-100 duration-300 group shadow-lg'
                    >
                        <div className='h-full w-full flex flex-col gap-3 justify-center items-center'>
                            {item.icon}
                            <p className='text-[#40C48E] dark:text-[#BCB4B4] group-hover:text-white dark:group-hover:text-[#40C48E] text-center text-md 2xl:text-2xl'>{item.name}</p>
                            <p className='px-1 text-[#40C48E] dark:text-[#BCB4B4] group-hover:text-white dark:group-hover:text-[#40C48E] text-center text-xs 2xl:text-lg'>{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
