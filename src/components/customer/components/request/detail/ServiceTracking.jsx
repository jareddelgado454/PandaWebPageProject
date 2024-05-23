'use client';
import React, { useContext, useEffect } from 'react'
import { Steppers } from '@/components/customer/components/Steppers';
import { ServiceContext } from '@/contexts/service/ServiceContext';
import { onUpdateService } from '@/graphql/users/customer/subscription';
import { client } from '@/contexts/AmplifyContext';
import { useDisclosure } from '@nextui-org/react';
import RateTechnicianModal from '@/components/customer/modals/RateTechnicianModal';
export default function ServiceTracking({ service, setService }) {
  const { serviceRequest } = useContext(ServiceContext);
  const {
    isOpen: isRateTechnicianModalOpen,
    onOpen: onRateTechnicianModalOpen,
    onOpenChange: onRateTechnicianModalChange,
  } = useDisclosure();
  useEffect(() => {
    const subscription = client
      .graphql({ query: onUpdateService, variables: { serviceId: serviceRequest && serviceRequest.id, customerId: serviceRequest && serviceRequest.serviceCustomerId } })
      .subscribe({
        next: ({ data }) => {
          // Update previous state
          console.log(data);
          setService((prevState) => ({
            ...prevState,
            ...data.onUpdateService
          }))
        },
        error: (error) => console.warn(error)
      });

    return () => {
      // Cancel the subscription when this component's life cycle ends
      subscription.unsubscribe();
    };
  }, []);

  const calculateDistance = (coord1, coord2) => {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
  
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    const distance = R * c;
  
    return distance.toFixed(1); // Redondear a 1 decimal
  }
  const steps = {
    "service accepted": 1,
    "on the way": 2,
    "in progress": 3,
    "completed": 4
  };
  useEffect(() => {
    if(service.status === "completed") {
      onRateTechnicianModalOpen();
    }
  }, [service, onRateTechnicianModalOpen]);
  return (
    <>
      <RateTechnicianModal isOpen={isRateTechnicianModalOpen} onOpenChange={onRateTechnicianModalChange} technician={service.technicianSelected} />
      <div className='w-full h-full flex flex-col lg:flex-row gap-2'>
        <div className='w-[50%] flex justify-center items-center'>
          <Steppers currentStep={steps[service.status]} />
        </div>
        <div className='w-[50%] flex flex-col justify-center gap-2 py-2'>
          <p>Type of service: <strong>{service.type}</strong></p>
          <p>Customer Name: <strong>{service.customer.fullName}</strong></p>
          <p>Car: <strong>{service.car.model}</strong></p>
          <p className='text-xs'><strong>{calculateDistance([service.destLatitude, service.destLongitude], [service.originLatitude, service.originLongitude])} km</strong> from your location</p>
        </div>
      </div>
    </>
  )
}
