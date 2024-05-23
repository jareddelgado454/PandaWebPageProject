import React from 'react';
import { Avatar, Badge, Button } from "@nextui-org/react";
import { FaBell } from 'react-icons/fa6';

export default function Notification() {
  const numbers = [1, 2, 3, 4, 5, 6]
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <p className='font-semibold'>Notifications</p>
        <Badge content="5" color="primary">
          <FaBell className='text-xl' />
        </Badge>
      </div>
      {numbers.map((item, i) => (
        <div key={i} className='dark:bg-zinc-800 bg-white h-[5rem] rounded-lg p-4'>
          
        </div>
      ))}
    </div>
  )
}
