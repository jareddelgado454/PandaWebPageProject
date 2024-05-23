'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PaymentComponent, ServiceTrackingComponent, TechnicianDetailComponent } from '@/components/customer';
import { client } from '@/contexts/AmplifyContext';
import CancelConfirmModal from '@/components/customer/modals/CancelConfirmModal';
import { useDisclosure } from '@nextui-org/react';
import { getServiceById } from '@/graphql/services/queries/query';
export default function ClientRequest() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
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
  useEffect(() => { retrieveServiceDetail() }, []);
  // useEffect(() => {
  //   if(service && service.status === 'cancelled'){
  //     router.replace("/customer")
  //   }
  // }, [service, router]);
  return (
    <>
      <CancelConfirmModal isOpen={isOpen} onOpenChange={onOpenChange} service={service} />
      {loading ? (
        <div className='h-full w-full flex justify-center items-center'>
          <div className='loader bg-green-pan' />
        </div>
      ) : (  
        <div className='container mx-auto px-4 h-full py-4 overflow-hidden'>
          <div className='flex flex-col gap-4 h-full'>
            <div className='flex justify-between'>
              <p>Service id: <strong className='text-[#40C48E]'>{id}</strong></p>
              <p className='text-rose-600 cursor-pointer font-semibold' onClick={onOpen}>
                {service && (service.status === 'service accepted' || service.status === 'on the way'  || service.status === 'in progress') ? 'Cancel Request' : ''}
              </p>
            </div>
            {service && (
              <>
                <div className='bg-zinc-100 dark:bg-zinc-700 h-full rounded-lg shadow-md'>
                  <TechnicianDetailComponent technician={service.technicianSelected} />
                </div>
                <div className='bg-zinc-100 dark:bg-zinc-700 h-full rounded-lg shadow-md'>
                  <ServiceTrackingComponent service={service} setService={setService} />
                </div>
                <div className='bg-zinc-100 dark:bg-zinc-700 h-full rounded-lg shadow-md'>
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
