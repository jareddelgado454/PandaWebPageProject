'use client'
import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FaXmark } from 'react-icons/fa6';
import { ScheduledServiceContext } from '@/contexts/Scheduled/ScheduledContext';
import { useDisclosure } from '@nextui-org/react';
import { ScheduledServiceModal } from '../../modals/ScheduledServiceModal';
export const BubbleService = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { scheduledService, setScheduledService, isModalOpen, setIsModalOpen } = useContext(ScheduledServiceContext);
  const onHandleCloseBubble = () => {
    Cookies.remove("scheduledService");
    setScheduledService(null);
  }
  useEffect(() => {
    if(isModalOpen){
      onOpen();
    }
  }, [isModalOpen]);
  
  return (
    <>
      {
        scheduledService && (
          <div onClick={() => {onOpen(); setIsModalOpen(false);}} className='absolute bottom-7 right-7'>
            <div className='h-16 w-16 rounded-full dark:bg-zinc-900 flex justify-center items-center cursor-pointer shadow-lg'>
              S
              <div className='transition ease-in-out duration-300 dark:bg-rose-800 hover:dark:bg-rose-600 p-1 rounded-full absolute -top-2 -right-0 z-30'>
                <FaXmark onClick={onHandleCloseBubble} />
              </div>
            </div>
          </div>
        )
      }
      {scheduledService && <ScheduledServiceModal isOpen={isOpen} onOpenChange={onOpenChange} scheduledServiceId={scheduledService.id} customerId={scheduledService.customerId} />}
    </>
  )
}
