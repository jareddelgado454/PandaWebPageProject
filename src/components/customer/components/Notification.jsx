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
          <Avatar
            radius="md"
            size="lg"
            src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
          />
        </Badge>
        <FaBell className='text-xl' />
      </div>
      {numbers.map((item, i) => (
        <div key={i} className='dark:bg-zinc-800 bg-white h-[5rem] rounded-lg p-4'>
          hello
        </div>
      ))}
    </div>
  )
}
