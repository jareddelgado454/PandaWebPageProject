'use client';
import { client } from '@/contexts/AmplifyContext';
import { listMyServices } from '@/graphql/services/queries/query';
import { DateFormatter } from '@/utils/parseDate';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
export default function ClientListRequests() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const userParsed = Cookies.get("currentUser") && JSON.parse(Cookies.get("currentUser"));
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const retrieveMyServices = async () => {
    setLoading(true);
    try {
      const { data } = await client.graphql({
        query: listMyServices,
        variables: {
          customerId: userParsed.id
        }
      });
      setServices(data.listServices.items);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  useEffect(() => { retrieveMyServices() }, []);

  return (
    <div className='h-full relative'>
      <div className='p-4 h-full overflow-y-auto'>
        <p className='font-semibold'>My Requests</p>
        <div className='my-8 grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {loading ? (
            <div>Retrieving services...</div>
          ) : (services.map((service, i) => (
            <Link href={`/customer/request/${service.id}`} key={i} className='group bg-green-panda text-white dark:bg-zinc-900 h-[18rem] rounded-lg p-4 shadow-lg transition-all ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer dark:hover:bg-green-panda'>
              <div className='flex flex-col gap-4 justify-center h-full'>
                <p>id: <strong>{service.id}</strong></p>
                <p>title: <strong>{service.title}</strong></p>
                <p>cost: <strong>{service.price}</strong></p>
                <p>Type of service: <strong>{service.type}</strong></p>
                <p>Created at: <strong>{DateFormatter(service.createdAt)}</strong></p>
              </div>
            </Link>
          )))}
        </div>
      </div>
    </div>
  )
}
