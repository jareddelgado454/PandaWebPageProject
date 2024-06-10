import React from 'react';
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';
export default function TechnicianModal({ isOpen, onOpenChange, technician }) {
  return (
    <Modal backdrop='opaque' isOpen={isOpen} onOpenChange={onOpenChange} size='sm' placement='center'
      className='bg-zinc-200 dark:bg-zinc-900 h-[24rem]'
    >
      <ModalContent>
        {() => (
          <>
            <ModalBody className='flex flex-col justify-center items-center animate__animated'>
              <Image
                src={`/image/defaultProfilePicture.jpg`}
                alt='image_technician_profile_picture'
                width={200}
                height={200}
                className='rounded-full w-[4.5rem] h-[4.5rem] lg:w-[8.5rem] lg:h-[8.5rem] border-2 border-[#40C48E]'
              />
              <p className='text-lg'>{technician.fullName}</p>
              <p className='text-sm dark:text-gray-400'>{technician.email}</p>
              <div className='flex flex-row gap-1 items-center'>
                <p className='text-xs lg:text-base'>Rate: 4.5</p> <FaStar className='text-amber-500' /><FaStar className='text-amber-500' /><FaStar className='text-amber-500' /><FaStar className='text-amber-500' />
              </div>
              <p>{`(+1) ${technician.contactNumber}`}</p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
