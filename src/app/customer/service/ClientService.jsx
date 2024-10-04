'use client';
import React, { useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserAttributes } from 'aws-amplify/auth';
import Map from '@/components/Map';
import { SearchMapInput } from '@/components/customer';
import LocationButton from '@/components/customer/components/LocationButton';
import RequestInput from '@/components/customer/components/Map/RequestInput';
import OfferDetails from '@/components/customer/components/Map/OfferDetails';
import CancelService from '@/components/customer/components/Map/CancelService';
import { ServiceContext } from '@/contexts/service/ServiceContext';
export default function ClientService() {
  const userMarkerRef = useRef(null);
  const { serviceRequest } = useContext(ServiceContext)
  const router = useRouter();
  useEffect(() => {
    const retrieveUserFromCognito = async() => {
      try {
        const userC = await fetchUserAttributes();
        if(userC['custom:profileCompleted'] == "false"){
          alert(`¡You need to complete you principal information!`);
          router.replace(`/customer/profile`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  retrieveUserFromCognito();
  }, [router]);
  
  return (
    <div className='w-full h-full p-4'>
      <div className='w-full h-[100vh] md:h-full rounded-lg bg-stone-200 dark:bg-zinc-900 relative overflow-hidden'>
        <div className='flex justify-center items-center h-full'>
          <Map userMarkerRef={userMarkerRef} />
        </div>
        {!serviceRequest?.status && <SearchMapInput userMarkerRef={userMarkerRef} />}
        <div className='absolute top-[50%] left-2 md:bottom-5 md:left-5 z-20'>
          <LocationButton />
        </div>
        <RequestInput />
        <OfferDetails />
        <CancelService />
      </div>
    </div>
  )
}
