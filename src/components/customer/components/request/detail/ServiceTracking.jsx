'use client';
import React, { useEffect } from 'react'
import { Steppers } from '@/components/customer/components/Steppers';
import { onUpdateServiceCoordinates, onUpdateServiceStatus } from '@/graphql/users/customer/subscription';
import { client } from '@/contexts/AmplifyContext';
import { useDisclosure } from '@nextui-org/react';
import RateTechnicianModal from '@/components/customer/modals/RateTechnicianModal';
export default function ServiceTracking({ service, setService }) {
  const {
    isOpen: isRateTechnicianModalOpen,
    onOpen: onRateTechnicianModalOpen,
    onOpenChange: onRateTechnicianModalChange,
  } = useDisclosure();

  const steps = {
    "service accepted": 1,
    "on the way": 2,
    "in progress": 3,
    "payment": 4,
    "completed": 5
  };
  useEffect(() => {
    const subscription = client
      .graphql({ query: onUpdateServiceStatus, variables: { serviceId: service.id, customerId: service.customer.id } })
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
  useEffect(() => {
    if (service.status === "completed") {
      onRateTechnicianModalOpen();
    }
  }, [service, onRateTechnicianModalOpen]);

  return (
    <>
      <RateTechnicianModal isOpen={isRateTechnicianModalOpen} onOpenChange={onRateTechnicianModalChange} service={service} technician={service.technicianSelected} />
      <div className='w-full h-full flex flex-col lg:flex-row gap-2'>
        <div className='w-[50%] flex justify-center items-center'>
          <Steppers currentStep={steps[service.status]} service={service} setService={setService} />
        </div>
        <CustomerInformation service={service} setService={setService} />
      </div>
    </>
  )
}

const CustomerInformation = ({ service, setService }) => {
  useEffect(() => {
    const subscription = client
      .graphql({ query: onUpdateServiceCoordinates, variables: { serviceId: service.id, customerId: service.customer.id } })
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

    return distance.toFixed(1);
  }
  return (
    <div className='w-[50%] flex flex-col justify-center gap-2 py-2'>
      <p>Type of service: <strong>{service.type}</strong></p>
      <p>Customer Name: <strong>{service.customer.fullName}</strong></p>
      <p>Car: <strong>{service.car.model}</strong></p>
      {(service.status === 'service accepted' && service.status === 'on the way') ? <p className='text-xs'><strong>{calculateDistance([service.destLatitude, service.destLongitude], [service.originLatitude, service.originLongitude])} km</strong> from your location</p> : 'In your location'}
    </div>
  );
}