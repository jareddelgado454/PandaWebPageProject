'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { PaymentComponent, ServiceTrackingComponent, TechnicianDetailComponent } from '@/components/customer';
import { client } from '@/contexts/AmplifyContext';
import CancelConfirmModal from '@/components/customer/modals/CancelConfirmModal';
import { useDisclosure } from '@nextui-org/react';
import { getServiceById } from '@/graphql/services/queries/query';
import { updateStatusService } from '@/graphql/services/mutations/mutation';
import { ServiceContext } from '@/contexts/service/ServiceContext';
import { onUpdateServiceGlobal } from '@/graphql/users/customer/subscription';
import RateTechnicianModal from '@/components/customer/modals/RateTechnicianModal';
import { verifyIfCustomerRated } from '@/graphql/users/customer/query';
import { UserContext } from '@/contexts/user/UserContext';
export default function ClientRequest() {
  const { id } = useParams();
  const { setServiceRequest, serviceRequest } = useContext(ServiceContext);
  const { user } = useContext(UserContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const param = useSearchParams().get('paymentStatus');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const [service, setService] = useState(null);
  const [hasRated, setHasRated] = useState(true);
  const {
    isOpen: isRateTechnicianModalOpen,
    onOpen: onRateTechnicianModalOpen,
    onOpenChange: onRateTechnicianModalChange,
  } = useDisclosure();
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
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    const verifyIsRateByCustomer = async() => {
      try {
        const { data } = await client.graphql({
          query: verifyIfCustomerRated,
          variables: { customerId: user?.id }
        });
        if(data?.listRates.length > 0){
          setHasRated(true);
        }
      } catch (error) {
        console.warn(error);
      }
    }
  
    verifyIsRateByCustomer();
    retrieveServiceDetail();
  }, [id, client, user]);
  const onChangeToComplete = async () => {
    try {
      const { data } = await client.graphql({
        query: updateStatusService,
        variables: {
          serviceId: serviceRequest.id,
          status: 'completed'
        }
      });
      if(data && data.updateService ){
        setInterval(() => {
          Cookies.remove("ServiceRequest");
          setServiceRequest(null);
        }, 7000);
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
          const updatedService = data.onUpdateService;
          if (updatedService) {
            setService((prevState) => ({
              ...prevState,
              status: updatedService?.status || prevState?.status,
              completed: updatedService?.completed || prevState?.completed || 'No',
              destLatitude: updatedService?.destLatitude || prevState?.destLatitude || 0,
              destLongitude: updatedService?.destLongitude || prevState?.destLongitude || 0,
              paymentLink: updatedService?.paymentLink || prevState?.paymentLink || '',
              price: updatedService?.price || prevState.price || 0,
              tax: updatedService?.tax || prevState.tax || 0,
              total: updatedService?.total || prevState.total || 0,
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
    if (param == "completed") {
      onChangeToComplete();
    } else if (param == "failed") {
      alert("The payment could not be made satisfactorily");
    }
  }, [param, serviceRequest]);

  useEffect(() => {
    if(!hasRated){
      onRateTechnicianModalOpen();
    }
  }, [hasRated, setHasRated, setServiceRequest]);
  
  return (
    <>
      <CancelConfirmModal isOpen={isOpen} onOpenChange={onOpenChange} service={service} />
      {service && <RateTechnicianModal isOpen={isRateTechnicianModalOpen} onOpenChange={onRateTechnicianModalChange} service={service} technician={service.technicianSelected} />}
      {loading ? (
        <div className='h-full w-full flex justify-center items-center'>
          <div className='loader bg-green-pan' />
        </div>
      ) : error ? (<div>Something went wrong :c</div>) : (
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
                <div className='bg-green-700/15 dark:bg-zinc-700 lg:h-full rounded-lg shadow-md'>
                  <TechnicianDetailComponent technician={service.technicianSelected} status={service.status} />
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
