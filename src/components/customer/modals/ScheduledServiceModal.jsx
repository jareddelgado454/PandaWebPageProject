'use client';
import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import Image from 'next/image';
import Cookies from 'js-cookie';
import { formatDistance } from 'date-fns';
import { Modal, ModalContent, ModalBody, ModalHeader, Spinner } from "@nextui-org/react";
import { client } from '@/contexts/AmplifyContext';
import { calculateRate } from '@/utils/service/AVGRate';
import { ScheduledServiceContext } from '@/contexts/Scheduled/ScheduledContext';
import { ScheduledMap } from '../components/schedule/ScheduledMap';
import { retrieveScheduledServiceFullDetail } from '@/graphql/schedule/query';
import { ScheduledTracking } from '../components/schedule/ScheduledTracking';
import { ScheduledPayment } from '../components/schedule/ScheduledPayment';
import { onUpdateScheduledService } from '@/graphql/schedule/subscription';
export const ScheduledServiceModal = ({ isOpen, onOpenChange, scheduledServiceId, customerId }) => {
    const userMarkerRef = useRef(null);
    const { setScheduledService, isModalOpen, setIsModalOpen } = useContext(ScheduledServiceContext);
    const [service, setService] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const getScheduledDetail = async () => {
        setService(null);
        setLoading(true);
        try {
            const { data } = await client.graphql({
                query: retrieveScheduledServiceFullDetail,
                variables: {
                    id: scheduledServiceId
                }
            });
            setService(data.getScheduledService);
            Cookies.set(
                "scheduledService",
                JSON.stringify(data.getScheduledService)
            );
            setScheduledService(data.getScheduledService);
            setLoading(false);
        } catch (ex) {
            console.error(ex);
            setError(ex);
            setLoading(false);
        }
    }
    useEffect(() => { getScheduledDetail(); }, [scheduledServiceId, isModalOpen]);

    useEffect(() => {
        if(!customerId) return;

        const subscription = client
          .graphql({
            query: onUpdateScheduledService,
            variables: { serviceId: scheduledServiceId, customerId: customerId }
          })
          .subscribe({
            next: ({ data }) => {
              const updatedService = data.onUpdateScheduledService;
              console.log(updatedService);
              if (updatedService) {
                setService((prevState) => ({
                  ...prevState,
                  status: updatedService?.status || prevState?.status,
                  completed: updatedService?.completed || prevState?.completed || 'No',
                  destLatitude: updatedService?.destLatitude || prevState?.destLatitude || 0,
                  destLongitude: updatedService?.destLongitude || prevState?.destLongitude || 0,
                  price: updatedService?.price || prevState?.price || 0,
                  fee: updatedService.fee || prevState.fee || 0,
                  total: updatedService?.total || prevState?.total || 0,
                }));
              }
            },
            error: (error) => console.warn(error)
          });
    
        return () => {
          subscription.unsubscribe();
        };
    
      }, [scheduledServiceId, isModalOpen, customerId]);
    return (
        <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} placement='center' size='5xl' className='h-[85%]' onClose={() => {setIsModalOpen(false); }}>
            <ModalContent>
                {(onclose) => (
                    <>
                        {loading ? (
                            <div className='flex justify-center items-center h-full'><Spinner size='lg' color='success' /></div>
                        ) : service && (
                            <>
                                <ModalHeader className='flex flex-col items-center my-4'>
                                    <p className='text-xl tracking-wider font-bold'>Service {service.title}</p>
                                </ModalHeader>
                                <ModalBody className='h-[100%] overflow-hidden'>
                                    <div className='grid grid-cols-2 gap-4 h-[30%]'>
                                        <div className='dark:bg-zinc-800 rounded-lg'>
                                            <div className='w-full h-full flex items-center justify-between px-4 py-4 gap-4'>
                                                <Image
                                                    width={150}
                                                    height={150}
                                                    src={`${service.technicianSelected && service.technicianSelected.profilePicture ? service.technicianSelected.profilePicture : '/image/defaultProfilePicture.jpg'}`}
                                                    className='h-28 w-28 rounded-full dark:bg-zinc-900 shadow-md'
                                                    alt="profile_picture_technician_offer"
                                                />
                                                <div className='flex flex-col gap-y-2'>
                                                    <p>Name: {service.technicianSelected.fullName}</p>
                                                    <div className='flex flex-row gap-x-4 items-center'>
                                                        <p>Rate: {calculateRate(service.technicianSelected.rate)}</p>
                                                        <ReactStars
                                                            count={5}
                                                            value={calculateRate(service.technicianSelected.rate)}
                                                            size={22}
                                                            edit={false}
                                                            isHalf={true}
                                                            activeColor="#ffd700"
                                                        />
                                                    </div>
                                                    <p>Technician since: {formatDistance(new Date(), service.technicianSelected.createdAt)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='dark:bg-zinc-800 rounded-lg'>
                                            <ScheduledTracking scheduleService={service} />
                                        </div>
                                    </div>
                                    <div className='dark:bg-zinc-800 rounded-lg h-[85%]'>
                                        <ScheduledMap userMarkerRef={userMarkerRef} />
                                    </div>
                                    <div className='dark:bg-zinc-800 rounded-lg h-'>
                                        {service && <ScheduledPayment scheduledService={service} />}
                                    </div>
                                </ModalBody>
                            </>
                        )}
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
