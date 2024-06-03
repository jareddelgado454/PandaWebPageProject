'use client';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { client } from '@/contexts/AmplifyContext';
import { UserContext } from '@/contexts/user/UserContext';
import { listMyServices } from '@/graphql/services/queries/query';
import { DateFormatter } from '@/utils/parseDate';
export default function ClientListRequests() {
  const { user } = useContext(UserContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState('CreatedAt');
  const retrieveMyServices = async () => {
    setLoading(true);
    try {
      const { data } = await client.graphql({
        query: listMyServices,
        variables: {
          customerId: user.id
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
  const sortServicesByDate = () => {

  }
  return (
    <div className='h-full relative'>
      <div className='p-4 h-full overflow-y-auto'>
        <div className='flex flex-row justify-between'>
          <p className='font-semibold'>My Requests</p>
          <select className='rounded-lg p-2' name="">
            <option value="1">Select to sort</option>
            <option value="1">Created At</option>
            <option value="1">Status</option>
            <option value="1">Type of service</option>
          </select>
        </div>
        <div className='my-8 grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {loading ? (
            <div>Retrieving services...</div>
          ) : (services.map((service, i) => (
            <Link
              href={`/customer/request/${service.id}`}
              key={i}
              className={`group text-white  dark:bg-zinc-900 h-[18rem] rounded-lg p-4 shadow-lg transition-all ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer ${service.status === 'completed' && 'border-t-8 border-t-[#40C48E] hover:bg-green-panda'} ${(service.status === 'pending' || service.status === 'service accepted' || service.status === 'in progress' || service.status === 'payment') && 'border-t-8 border-t-blue-600 hover:bg-blue-600'} ${service.status === 'cancelled' && 'border-t-8 border-t-rose-600 hover:bg-rose-600'}`}>
              <div className='flex flex-col gap-4 justify-center h-full'>
                <p className='text-[#4d4e62] dark:text-[#BCB4B4] group-hover:text-white'>id: <strong>{service.id}</strong></p>
                <p className='text-[#4d4e62] dark:text-[#BCB4B4] group-hover:text-white'>title: <strong>{service.title}</strong></p>
                <p className='text-[#4d4e62] dark:text-[#BCB4B4] group-hover:text-white'>cost: <strong>{service.price}</strong></p>
                <p className='text-[#4d4e62] dark:text-[#BCB4B4] group-hover:text-white'>status: <strong>{service.status}</strong></p>
                <p className='text-[#4d4e62] dark:text-[#BCB4B4] group-hover:text-white'>Type of service: <strong>{service.type}</strong></p>
                <p className='text-[#4d4e62] dark:text-[#BCB4B4] group-hover:text-white'>Created at: <strong>{DateFormatter(service.createdAt)}</strong></p>
              </div>
            </Link>
          )))}
        </div>
      </div>
    </div>
  )
}
