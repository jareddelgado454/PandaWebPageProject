import React from 'react'
import { Steppers } from '@/components/customer/components/Steppers';
export default function ServiceTracking({ service, setService }) {
  const steps = {
    "service accepted": 1,
    "on the way": 2,
    "in progress": 3,
    "payment": 4,
    "completed": 5
  };

  return (
    <>
      <div className='w-full h-full flex flex-col lg:flex-row gap-2 items-center justify-center'>
        <div className='w-[50%] flex justify-center items-center'>
          {service.status === "cancelled" ? (
            <div className='flex gap-2'><p className='text-lg tracking-wider'>The service has been</p><strong className='text-lg tracking-wider text-rose-600'>cancelled</strong></div>
          ) : <Steppers currentStep={steps[service.status]} service={service} setService={setService} />}
        </div>
        <CustomerInformation service={service} setService={setService} />
      </div>
    </>
  )
}

const CustomerInformation = ({ service }) => {
  const calculateDistance = (coord1, coord2) => {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;

    const R = 6371;
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
    <div className='w-[60%] lg:w-[50%] flex flex-col justify-center gap-4 py-2'>
      <p>Type of service: <strong className='text-[#40C48E]'>{service.type}</strong></p>
      <p>Customer Name: <strong className='text-[#40C48E]'>{service.customer.fullName}</strong></p>
      <p>Car: <strong className='text-[#40C48E]'>{service.car.model}</strong></p>
      {(service.status === 'service accepted' || service.status === 'on the way') ? (
        <div className='text-xs flex flex-row gap-2'>
          <p className='font-bold'>
            {calculateDistance([service.destLatitude, service.destLongitude], [service.originLatitude, service.originLongitude])}
          </p>
          <strong>km</strong> from your location
        </div>
      ) : <strong>In your location</strong>}
    </div>
  );
}