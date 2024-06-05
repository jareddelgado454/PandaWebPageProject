'use client';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { PaymentComponent, ServiceTrackingComponent, TechnicianDetailComponent } from '@/components/customer';
import { client } from '@/contexts/AmplifyContext';
import CancelConfirmModal from '@/components/customer/modals/CancelConfirmModal';
import { useDisclosure } from '@nextui-org/react';
import { getServiceById } from '@/graphql/services/queries/query';
import { updateStatusService } from '@/graphql/services/mutations/mutation';
import { ServiceContext } from '@/contexts/service/ServiceContext';
import { onUpdateServiceGlobal } from '@/graphql/users/customer/subscription';
import Cookies from 'js-cookie';
import { UserContext } from '@/contexts/user/UserContext';
export default function ClientRequest() {
  const { setServiceRequest, serviceRequest } = useContext(ServiceContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const param = useSearchParams().get('paymentStatus');
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const { id } = useParams();
  useEffect(() => {
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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    retrieveServiceDetail();
  }, [id, client]);
  const onChangeToComplete = async () => {
    try {
      const { data } = await client.graphql({
        query: updateStatusService,
        variables: {
          serviceId: serviceRequest.id,
          status: 'completed'
        }
      });
      setIsCompleted(true);
      if(data && data.updateService ){
        Cookies.remove("ServiceRequest");
      }
    } catch (error) {
      console.warn(error);
    }
  }
  useEffect(() => {

    const subscription = client
      .graphql({
        query: onUpdateServiceGlobal,
        variables: { serviceId: serviceRequest?.id, customerId: serviceRequest?.customer.id }
      })
      .subscribe({
        next: ({ data }) => {
          console.log(data);
          const updatedService = data.onUpdateService;
          if (updatedService) {
            setService((prevState) => ({
              ...prevState,
              status: updatedService?.status || prevState.status,
              destLatitude: updatedService?.destLatitude || prevState.destLatitude,
              destLongitude: updatedService?.destLongitude || prevState.destLongitude,
              paymentLink: updatedService?.paymentLink || prevState.paymentLink,
              price: updatedService?.price || prevState.price,
              tax: updatedService?.tax || prevState.tax,
              total: updatedService?.total || prevState.total,
            }));
          }
        },
        error: (error) => console.warn(error)
      });

    return () => {
      subscription?.unsubscribe();
    };

  }, [serviceRequest, param]);
  useEffect(() => {
    if (param == "completed" && serviceRequest) {
      onChangeToComplete();
    } else if (param == "failed") {
      alert("The payment could not be made satisfactorily");
    }
  }, [param, serviceRequest]);
  useEffect(() => {
    if (isCompleted) {
      setServiceRequest(null);
    }
  }, [isCompleted, setIsCompleted]);

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
                {service && (service.status === 'service accepted' || service.status === 'on the way' || service.status === 'in progress' || service.status === 'payment') ? 'Cancel Request' : ''}
              </p>
            </div>
            {service && (
              <>
                <div className='bg-green-700/15 dark:bg-zinc-700 h-full rounded-lg shadow-md'>
                  <TechnicianDetailComponent technician={service.technicianSelected} />
                </div>
                <div className='bg-green-700/15 dark:bg-zinc-700 h-full rounded-lg shadow-md'>
                  {service && <ServiceTrackingComponent service={service} setService={setService} />}
                </div>
                <div className='bg-green-700/15 dark:bg-zinc-700 h-full rounded-lg shadow-md'>
                  {service && <PaymentComponent service={service} setService={setService} />}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
