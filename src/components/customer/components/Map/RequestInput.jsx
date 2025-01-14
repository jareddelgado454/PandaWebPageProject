'use client';
import React, { useContext, useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import Cookies from 'js-cookie';
import { ServiceContext } from '@/contexts/service/ServiceContext';
import { client } from '@/contexts/AmplifyContext';
import { onDeleteMyService } from '@/graphql/services/subscriptions/subscription';
import ServiceForm from './ServiceForm';
export default function RequestInput() {
    const { serviceRequest, setServiceRequest } = useContext(ServiceContext);
    const [isInputActive, setIsInputActive] = useState(false);
    useEffect(() => {
        if (!serviceRequest) return;
        const subscription = client
            .graphql({
                query: onDeleteMyService,
                variables: { serviceId: serviceRequest.id }
            })
            .subscribe({
                next: ({ data }) => {
                    const deletedService = data.onDeleteService;
                    if (deletedService) {
                        Cookies.remove("ServiceRequest");
                        setServiceRequest(null);
                    }
                },
                error: (error) => console.warn(error)
            });
        return () => {
            subscription?.unsubscribe();
        };
    }, [serviceRequest]);
    return (
        <>
            <div className={`transtion-all duration-300 absolute ${isInputActive ? 'bottom-[13rem] md:bottom-[26rem] lg:bottom-[13rem]' : 'bottom-0 delay-[10ms]'} left-[48%] transform w-full`}>
                <div className='w-[3rem] h-[3rem] bg-white dark:bg-zinc-900 rounded-t-full cursor-pointer' onClick={() => setIsInputActive(!isInputActive)}>
                    <div className='flex justify-center items-center w-full h-full'>
                        <FaArrowUp className={`transition-all duration-250 ${isInputActive ? 'rotate-180' : 'rotate-0'}`} />
                    </div>
                </div>

            </div>
            <div className='flex items-center justify-center h-[230px]'>
                <div className={`dark:bg-zinc-900 rounded-t-lg bg-white absolute shadow transition-all ${isInputActive ? '-bottom-0 h-[220px] md:h-[420px] lg:h-[220px] duration-500' : '-bottom-6 h-0 delay-[73ms] duration-700'} w-full lg:w-[80%] overflow-hidden`}>
                    <ServiceForm />
                </div>
            </div>
        </>
    )
}
