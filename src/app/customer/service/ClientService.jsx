'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Map from '@/components/Map';
import LocationButton from '@/components/customer/components/LocationButton';
import RequestInput from '@/components/customer/components/Map/RequestInput';
import OfferDetails from '@/components/customer/components/Map/OfferDetails';
import CancelService from '@/components/customer/components/Map/CancelService';
import { fetchUserAttributes } from 'aws-amplify/auth';
export default function ClientService() {
  const router = useRouter();
  useEffect(() => {
    const retrieveUserFromCognito = async() => {
      const userC = await fetchUserAttributes();
      if(userC['custom:profileCompleted'] == "false"){
        alert(`¡You need to complete you principal information!`);
        router.replace(`/customer/profile`);
      }
    }
  retrieveUserFromCognito();
  }, [router]);
  
  return (
    <div className='w-full h-full p-4'>
      <div className='w-full h-[100vh] md:h-full rounded-lg bg-stone-200 dark:bg-zinc-900 relative overflow-hidden'>
        <div className='flex justify-center items-center h-full'>
          <Map />
        </div>
        <div className='absolute top-[50%] left-2 md:bottom-5 md:left-5 z-20'>
          <LocationButton />
        </div>
        <RequestInput />
        <OfferDetails />
        <CancelService />
        {/* <div className='absolute bottom-5 left-0 w-full'>
          <div className='flex justify-between items-center px-2'>

            <div className='dark:bg-zinc-800 bg-white p-4 rounded-lg w-2/4'>
              <input
                type="text"
                className='dark:bg-zinc-900 bg-stone-200 p-2 w-full rounded'
                placeholder='Search'
              />
            </div>
            <p>03</p>
          </div>
        </div> */}
      </div>
    </div>
  )
}
