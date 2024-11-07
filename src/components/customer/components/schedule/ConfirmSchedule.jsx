'use client';
import { formatDistance } from 'date-fns';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { ScheduleForm, SuccessCheckComponent } from '../..';
import { baseUrl } from '@/utils/CloudFront';
import { useRouter } from 'next/navigation';
const ConfirmSchedule = ({ setCurrentStep, technicianSelected, dates }) => {
  const router = useRouter();
  const [carSelected, setCarSelected] = useState();
  const [isSuccessed, setIsSuccessed] = useState(false);
  useEffect(() => {
    if (!technicianSelected) {
      setCurrentStep(1);
    }
  }, []);
  useEffect(() => {
    if (isSuccessed) {
      setTimeout(() => {
        router.replace('/customer/');
        setIsSuccessed(false);
      }, 5000);
    }
  }, [isSuccessed]);

  return (
    <div className='p-4 flex flex-col md:flex-row gap-4 h-[85%]'>
      <div className='bg-white dark:bg-zinc-900 shadow-lg rounded-lg w-[80%]'>
        {isSuccessed ? <SuccessCheckComponent message="Your scheduled service petition has been sended." /> : (
          <ScheduleForm
            dates={dates}
            carSelected={carSelected}
            setCarSelected={setCarSelected}
            technicianSelectedId={technicianSelected.id}
            setIsSuccessed={setIsSuccessed}
          />
        )}
      </div>
      <div className='flex flex-col gap-4 w-[20%]'>
        <div className='bg-white dark:bg-zinc-900 shadow-lg rounded-lg h-[50%] w-full py-2'>
          <div className='flex flex-col gap-4 justify-center items-center h-full'>
            {carSelected ? (
              <>
                <Image
                  className='h-32 w-32 dark:bg-zinc-800 rounded-full'
                  width={400}
                  height={400}
                  alt='car_image'
                  src={baseUrl + carSelected.image}
                />
                <div className='tracking-wider text-sm flex flex-col gap-2'>
                  <div className='flex flex-row gap-2'>
                    <p>Car brand:</p><strong>{carSelected.brand}</strong>
                  </div>
                  <div className='flex flex-row gap-2'>
                    <p>Car model:</p><strong>{carSelected.model}</strong>
                  </div>
                  <div className='flex flex-row gap-2'>
                    <p>Car year:</p><strong>{carSelected.year}</strong>
                  </div>
                </div>
              </>
            ) : (<div>Select a car</div>)}
          </div>
        </div>
        <div className='bg-white dark:bg-zinc-900 shadow-lg rounded-lg h-[50%] w-full py-2'>
          <div className='flex flex-col gap-4 justify-center items-center h-full'>
            <Image
              className='h-32 w-32 dark:bg-zinc-800 rounded-full'
              width={400}
              height={400}
              alt='technician_profile_picture'
              src={technicianSelected.profilePicture !== null ? `${baseUrl + technicianSelected.profilePicture}` : '/image/defaultProfilePicture.jpg'}
            />
            <div className='tracking-wider flex flex-col gap-2 justify-center items-center text-center text-sm'>
              <div className='flex flex-row gap-2'>
                <p>FullName: </p><strong>{technicianSelected.fullName}</strong>
              </div>
              <div className='flex flex-row gap-2'>
                <p>Certifications: </p><strong>+5</strong>
              </div>
              <div className='flex flex-row gap-2 text-center'>
                <p>Technician since: </p><strong>{formatDistance(
                  new Date(technicianSelected.createdAt),
                  new Date(),
                  { addSuffix: true }
                )}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmSchedule