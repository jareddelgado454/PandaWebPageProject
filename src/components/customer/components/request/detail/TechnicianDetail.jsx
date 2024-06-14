'use client';
import React, { useContext } from 'react'
import ReactStars from "react-rating-stars-component";
import Image from 'next/image'
import { FaCommentSms, FaPhoneVolume, FaRegStar, FaRegStarHalf, FaStar } from 'react-icons/fa6'
import { ThirdDateFormatter } from '@/utils/parseDate'
import { calculateRate } from '@/utils/service/AVGRate';
import { client } from '@/contexts/AmplifyContext';
import { createChat } from '@/graphql/chat/mutation';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/contexts/user/UserContext';
import { Button } from '@nextui-org/react';
import { existChatWithTechnicianSelected } from '@/api/service';
export default function TechnicianDetail({ technician, status }) {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const onCreateChat = async () => {
    try {
      const id = await existChatWithTechnicianSelected(user.id, technician.id);

      if (id) {
        router.push(`/customer/messages?chatId=${id}`);
      } else {
        const { data } = await client.graphql({
          query: createChat,
          variables: {
            customerId: user.id,
            technicianId: technician.id
          }
        });
        router.push(`/customer/messages?chatId=${data.createChat.id}`);
      }

    } catch (error) {
      console.log(error);
    }
  }
  const calculateAverageRate = (items) => {
    if (items.length === 0) return 0; // Manejo de caso donde el array está vacío

    const totalRate = items.reduce((sum, item) => sum + item.rate, 0);
    return totalRate / items.length;
  };
  return (
    <div className='w-full h-full p-4'>
      {technician ? (
        <div className='flex flex-col lg:flex-row gap-2 gap-y-4 items-center h-full'>
          <div className='w-full lg:w-[80%] flex flex-row gap-4 items-center'>
            <Image
              src={technician.profilePicture ? technician.profilePicture : `/image/defaultProfilePicture.jpg`}
              alt='image_technician_profile_picture'
              width={100}
              height={100}
              className='rounded-full w-[4.5rem] h-[4.5rem] lg:w-[6.5rem] lg:h-[6.5rem] border-2 border-[#40C48E]'
              priority
            />
            <div className='flex flex-col gap-1 h-full'>
              <p className='text-md lg:text-base 2xl:text-2xl font-semibold text-[#40C48E]'>{technician.fullName}</p>
              <p className='text-xs lg:text-sm text-zinc-500 dark:text-zinc-300'>{ThirdDateFormatter(technician.createdAt)}</p>
              <div className='flex flex-row gap-1 items-center'>

                {technician?.rate.items.length > 0 ? (
                  <>
                    <p className='text-xs lg:text-base'>Rate:</p>
                    <ReactStars
                      count={5}
                      value={calculateRate(technician.rate)}
                      size={22}
                      edit={false}
                      isHalf={true}
                      emptyIcon={<FaStar />}
                      halfIcon={<FaRegStarHalf />}
                      fullIcon={<FaRegStar />}
                      activeColor="#ffd700"
                    />
                    <p>{calculateAverageRate(technician.rate.items)}</p>
                  </>
                ) : (
                  <div>No stars</div>
                )}
              </div>
            </div>
          </div>
          <div className='w-full lg:w-[20%] flex flex-row h-full gap-4 justify-end'>
            {status !== "completed" && (
              <>
                <Button isIconOnly className='bg-white dark:bg-zinc-800 dark:hover:bg-green-panda transition-all duration-300 p-4 w-[3rem] h-[3rem] rounded-full shadow-lg cursor-pointer'>
                  <FaPhoneVolume className='text-lg' />
                </Button>
                <Button isIconOnly onClick={onCreateChat} className='bg-white dark:bg-zinc-800 dark:hover:bg-green-panda transition-all duration-300 p-4 w-[3rem] h-[3rem] rounded-full shadow-lg cursor-pointer'>
                  <FaCommentSms className='text-2xl' />
                </Button>
              </>
            )}
          </div>
        </div>
      ) : (<div className='font-semibold text-2xl dark:text-zinc-400'>No technician assigned yet</div>)}
    </div>
  )
}
