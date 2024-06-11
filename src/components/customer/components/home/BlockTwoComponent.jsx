'use client';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { formatDistance } from 'date-fns';
import { Skeleton } from "@nextui-org/skeleton";
import { UserContext } from '@/contexts/user/UserContext';
import { client } from '@/contexts/AmplifyContext';
import { listMyServicesHome } from '@/graphql/services/queries/query';
import { baseUrl } from '@/utils/CloudFront';
export default function BlockTwoComponent() {
  const { user } = useContext(UserContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const retrieveMyServices = async () => {
    setLoading(true);
    try {
      const { data } = await client.graphql({
        query: listMyServicesHome,
        variables: {
          customerId: user.id
        }
      });
      setServices(data.listServices.items);
      setLoading(false);
    } catch (e) {
      console.warn(e);
      setError(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    retrieveMyServices();
  }, [user]);
  const numbers = [1, 2, 3]
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <p className='font-semibold text-zinc-950 dark:text-white tracking-wider text-xs 2xl:text-base'>My last 5 request: </p>
      </div>
      {
        loading ? (
          <>
            {numbers.map((_, i) => (
              <div key={i} className='dark:bg-zinc-950/65 bg-white h-[5rem] rounded-lg px-4 py-2 flex flex-row gap-2'>
                <div className='flex justify-center items-center'>
                  <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col justify-center gap-2">
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
              </div>
            ))}
          </>
        ) : error ? (<div>{JSON.stringify(error, null, 2)}</div>) : (
          <>
            {services.map((service, key) => (
              <div key={key} className='dark:bg-zinc-950/65 bg-white h-[6rem] rounded-lg px-4 py-2 shadow-md'>
                <div className='w-full h-full flex flex-row gap-1'>
                  <div className='w-[20%] flex items-center'>
                    <Image
                      src={service.car.image ? `${baseUrl}${service.car.image}` : 'image/car_default.jpg' }
                      width={100}
                      height={100}
                      className='rounded-full w-[2.7rem] h-[2.7rem] 2xl:w-[4rem] 2xl:h-[4rem] object-cover object-center'
                      alt={`car_${service.car.id}`}
                    />
                  </div>
                  <div className='w-[80%] h-full flex flex-col justify-center gap-2'>
                    <div className='flex flex-row justify-between'>
                      <p className='tracking-wider text-xs 2xl:text-base'>{service.title}</p>
                      <p className='tracking-wider text-xs'>{formatDistance(new Date(service.createdAt), new Date(), { addSuffix: true })}</p>
                    </div>
                    <p className='tracking-wider text-xs 2xl:text-base'>status: {service.status}</p>
                    <p className='tracking-wider text-xs 2xl:text-base'>total: ${service.total ? service.total : 0}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )
      }

    </div>
  )
}
