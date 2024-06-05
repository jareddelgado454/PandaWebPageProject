import React from 'react'
import { NotificationComponent } from '@/components/customer';
import { FaRegComment, FaRegHandPointUp, FaRegIdCard, FaRegRectangleList } from 'react-icons/fa6';
import Link from 'next/link';
export default function Client_Component() {
  return (
    <div className='h-full flex flex-col animate__animated animate__fadeInLeft p-4 overflow-hidden'>
      <div className='flex flex-col 2xl:flex-row gap-2 h-[50%] w-full '>
        <div
          className="transition-all ease-in-out duration-200 shadow w-full lg:w-[70%] h-full col-span-3 2xl:col-span-2 bg-green-700/15 dark:bg-zinc-900 rounded-lg"
        >
          <BlockOneComponent />
        </div>
        <div
          className={`transition-all ease-in-out duration-200 h- col-span-3 2xl:col-span-0 shadow w-full lg:w-[30%] h-[50%] 2xl:h-full bg-green-700/15 dark:bg-zinc-900 rounded-lg overflow-y-scroll p-4 cursor-pointer`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <NotificationComponent />
        </div>
      </div>
      <div className='w-full h-full'>
        <div
          className={`transition-all ease-in-out duration-200 shadow col-span-3 bg-green-700/15 dark:bg-zinc-900 rounded-lg h-full`}
        >
          <BlockTwoComponent />
        </div>
      </div>
    </div>
  )
}

const BlockOneComponent = () => {
  return (
    <div>
      
    </div>
  )
}

const BlockTwoComponent = () => {
  const numbers = [
    {
      name: "Chats",
      icon: <FaRegComment className='text-[#40C48E] dark:text-[#BCB4B4] text-5xl group-hover:text-white dark:group-hover:text-[#40C48E]' />,
      description: "List your chats between you and the differents technicians in our platform.",
      link: '/customer/messages'
    },
    {
      name: "Make a service request",
      icon: <FaRegHandPointUp className='text-[#40C48E] dark:text-[#BCB4B4] text-5xl group-hover:text-white dark:group-hover:text-[#40C48E]' />,
      description: "Make a request and our technicians would love to help you without any problems.",
      link: '/customer/service'
    },
    {
      name: "My requests",
      icon: <FaRegRectangleList className='text-[#40C48E] dark:text-[#BCB4B4] text-5xl group-hover:text-white dark:group-hover:text-[#40C48E]' />,
      description: "List your services request.",
      link: '/customer/request'
    },
    {
      name: "My information",
      icon: <FaRegIdCard className='text-[#40C48E] dark:text-[#BCB4B4] text-5xl group-hover:text-white dark:group-hover:text-[#40C48E]' />,
      description: "See your complete information in our platform.",
      link: '/customer/profile'
    },
  ];
  "Chats", "Make a request", "My Requests", "My Information"
  return (
    <div className='flex flex-col w-full gap-4 my-2 py-4 h-full'>
      <p className='p-2 text-[#40C48E] dark:text-white font-semibold'>Shortcuts:</p>
      <div className='flex flex-col xl:flex-row gap-5 justify-center items-center w-full h-full'>

        {numbers.map((item, i) => (
          <Link
            href={item.link}
            key={i}
            className='bg-white dark:bg-zinc-800 dark:hover:bg-zinc-950 hover:bg-[#40C48E] dark:hover:shadow-[0_4px_0px_rgb(0,0,0)] w-[90%] h-[15rem] rounded-lg xl:w-[23rem] xl:h-[92%] cursor-pointer transition-all ease-out hover:-translate-y-2 hover:scale-100 duration-300 group shadow-lg'
          >
            <div className='h-full w-full flex flex-col gap-3 justify-center items-center'>
              {item.icon}
              <p className='text-[#40C48E] dark:text-[#BCB4B4] text-2xl group-hover:text-white dark:group-hover:text-[#40C48E] text-center'>{item.name}</p>
              <p className='px-1 text-[#40C48E] dark:text-[#BCB4B4] text-lg group-hover:text-white dark:group-hover:text-[#40C48E] text-center'>{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}