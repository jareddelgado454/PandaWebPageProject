import React from 'react'
import { Steppers } from '@/components/LoginRegister/Steppers';
export default function ServiceTracking({ service }) {
  console.log(service);
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
  return (
    <div className='w-full h-full flex flex-col lg:flex-row gap-2'>
      <div className='w-[50%] flex justify-center items-center'>
        <Steppers step1 step2 />
      </div>
      <div className='w-[50%] flex flex-col justify-center gap-2 py-2'>
        <p>Type of service: <strong>{service.type}</strong></p>
        <p>Customer Name: <strong>{service.customer.fullName}</strong></p>
        <p>Car: <strong>Hyundai</strong></p>
        <p className='text-xs'><strong>{calculateDistance([service.destLongitude, service.destLatitude], [service.originLongitude, service.originLatitude])} km</strong> from your location</p>
      </div>
    </div>
  )
}
