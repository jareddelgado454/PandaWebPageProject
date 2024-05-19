'use client';
import React, { useContext, useEffect } from 'react'
import { Steppers } from '@/components/customer/components/Steppers';
import { ServiceContext } from '@/contexts/service/ServiceContext';
import { onUpdateServiceStatus } from '@/graphql/users/customer/subscription';
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
      .graphql({ query: onUpdateServiceStatus, variables: { serviceId: serviceRequest && serviceRequest.id } })
      .subscribe({
        next: ({ data }) => {
          // Update previous state
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
  const meterToKilometer = (meter) => {
    var km = meter / 1000;
    return km.toFixed(1);
  }
  function calculateDistance(coord1, coord2) {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;

    const lat1Rad = lat1 * Math.PI / 180;
    const lon1Rad = lon1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const lon2Rad = lon2 * Math.PI / 180;

    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    const distancia = Math.sqrt(dLat * dLat + dLon * dLon) * 6371;

    const km = meterToKilometer(distancia);

    return km;
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
          <p className='text-xs'><strong>{calculateDistance([service.destLongitude, service.destLatitude], [service.originLongitude, service.originLatitude])} km</strong> from your location</p>
        </div>
      </div>
    </>
  )
}
