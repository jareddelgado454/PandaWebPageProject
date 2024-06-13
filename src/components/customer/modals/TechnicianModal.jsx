import React from 'react';
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import Image from 'next/image';
import { FaRegStar, FaRegStarHalf, FaStar } from 'react-icons/fa6';
import ReactStars from "react-rating-stars-component";
import { calculateRate } from '@/utils/service/AVGRate';
import { formatDistance } from 'date-fns';
export default function TechnicianModal({ isOpen, onOpenChange, technician }) {
  const calculateAverageRate = (items) => {
    if (items.length === 0) return 0; // Manejo de caso donde el array está vacío

    const totalRate = items.reduce((sum, item) => sum + item.rate, 0);
    return totalRate / items.length;
  };
  return (
    <Modal backdrop='opaque' isOpen={isOpen} onOpenChange={onOpenChange} size='lg' placement='center'
      className='bg-white dark:bg-zinc-900 shadow h-full 2xl:max-h-[48rem] overflow-y-scroll'
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        overflowY: 'scroll'
      }}
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
              <p className='text-2xl font-black'>{technician.fullName}</p>
              <p className='text-sm dark:text-gray-400'>{technician.email}</p>
              <div className='flex flex-col gap-1 items-center'>
                <p className='text-xs lg:text-2xl font-bold'>{calculateAverageRate(technician.rate.items)}</p>
                <ReactStars
                  count={5}
                  value={calculateRate(technician.rate)}
                  size={32}
                  edit={false}
                  isHalf={true}
                  emptyIcon={<FaStar />}
                  halfIcon={<FaRegStarHalf />}
                  fullIcon={<FaRegStar />}
                  activeColor="#ffd700"
                />
              </div>
              <p className='w-full text-center text-2xl font-bold'>Last Rates:</p>
              {technician.rate.items.length > 0 ? technician.rate.items.map((single_rate, i) => (
                <div
                  key={i}
                  className='flex flex-col gap-2 w-full'
                >
                  <div className='flex gap-3 w-full'>
                    <Image
                      width={50}
                      height={50}
                      src={single_rate.createdBy.profilePicture ? single_rate.createdBy.profilePicture : `/image/defaultProfilePicture.jpg`}
                      className='rounded-full'
                      alt={`customer_rate_${i}`}
                    />
                    <div className='flex flex-col gap-1'>
                      <p className='font-bold'>{single_rate.createdBy.fullName}</p>
                      <p className='text-sm'>{formatDistance(new Date(single_rate.createdAt), new Date(), { addSuffix: true })}</p>
                    </div>
                  </div>
                  <p className='text-justify line-clamp-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quia labore veritatis modi eos impedit maxime aperiam exercitationem eum assumenda magnam similique nam quaerat at rerum numquam placeat, praesentium sequi.</p>
                  <hr className='my-5' />
                </div>
              )) : <div>There is no rate for this technician yet.</div>}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
