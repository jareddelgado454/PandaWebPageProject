'use client';
import React, { useContext, useEffect, useState } from 'react';
import { PaymentComponent, ServiceTrackingComponent, TechnicianDetailComponent } from '@/components/customer';
import { client } from '@/contexts/AmplifyContext';
import { getServiceById } from '@/graphql/service/query';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { ServiceContext } from '@/contexts/service/ServiceContext';
export default function ClientRequest() {
  const router = useRouter();
  const { setServiceRequest } = useContext(ServiceContext);
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState(null);
  const { id } = useParams();
  const retrieveServiceDetail = async () => {
    setLoading(true);
    try {
      const { data } = await client.graphql({
        query: getServiceById,
        variables: {
          serviceId: id
        }
      });
      setService(data.getService);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  useEffect(() => { retrieveServiceDetail() }, [id]);
  const onHandleCancelService = () => {
    Cookies.remove('ServiceRequest');
    setServiceRequest(null);
    useRouter();
  }
  return (
    <>
      {loading ? (
        <div className='h-full w-full flex justify-center items-center'>
          <div className='loader bg-green-pan' />
        </div>
      ) : (
        <div className='container mx-auto px-4 h-full py-4 overflow-hidden'>
          <div className='flex flex-col gap-4 h-full'>
            <div className='flex justify-between'>
              <p>Service id: <strong className='text-[#40C48E]'>{id}</strong></p>
              <p className='text-rose-600 cursor-pointer'>Cancel Service</p>
            </div>
            {service && (
              <>
                <div className='bg-zinc-200 dark:bg-zinc-700 h-full rounded-lg shadow'>
                  <TechnicianDetailComponent technician={service.technicianSelected} />
                </div>
                <div className='bg-zinc-200 dark:bg-zinc-700 h-full rounded-lg shadow'>
                  <ServiceTrackingComponent service={service} />
                </div>
                <div className='bg-zinc-200 dark:bg-zinc-700 h-full rounded-lg shadow'>
                  <PaymentComponent service={service} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
