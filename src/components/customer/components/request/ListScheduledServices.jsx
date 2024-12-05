'use client';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {Switch, useDisclosure} from "@nextui-org/react";
import { client } from '@/contexts/AmplifyContext';
import { UserContext } from '@/contexts/user/UserContext';
import { retrieveCustomerScheduledServices } from '@/graphql/schedule/query';
import { getTimeMessage } from '@/utils/parseDate';
import { ScheduledServiceContext } from '@/contexts/Scheduled/ScheduledContext';
import { isBefore } from 'date-fns';
const ListScheduledServices = () => {
    const { user } = useContext(UserContext);
    const { setScheduledService, setIsModalOpen } = useContext(ScheduledServiceContext);
    const [scheduledServices, setScheduledServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hide, setHide] = useState(true);
    const retrieveMyServices = async () => {
        setLoading(true);
        try {
            const { data } = await client.graphql({
                query: retrieveCustomerScheduledServices,
                variables: {
                    customerId: user.id
                }
            });
            const scheduledServices = data.listScheduledServices.items;
            const sortedScheduledServices = scheduledServices.sort((a, b) => new Date(b.scheduledStartDate) - new Date(a.scheduledStartDate));
            setScheduledServices(sortedScheduledServices);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {retrieveMyServices()}, []);

    const filteredScheduledServices = useMemo(() => {
        if (!hide) return scheduledServices;
        const now = new Date();
        return scheduledServices.filter(service => new Date(service.scheduledStartDate) > now);
    }, [scheduledServices, hide]);

    const onOpenModal = (service) => {
        setScheduledService(service);
        setIsModalOpen(true);
    }
    return (
        <>
            
            <div className='flex flex-row justify-between'>
                <p className='font-semibold'>My Scheduled Services Requests</p>
            </div>
            <div className='my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8'>
                {loading ? (
                    <div>Retrieving services...</div>
                ) : (
                    filteredScheduledServices.map((service, i) => (
                        <div
                            onClick={() => isBefore(new Date(), service.scheduledStartDate) && onOpenModal(service)}
                            key={i}
                            className={`group text-white  dark:bg-zinc-900 h-[18rem] rounded-lg p-4 shadow-lg transition-all ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 ${isBefore(new Date(), service.scheduledStartDate) ? "border-t-8 border-t-[#40C48E] cursor-pointer" : "border-t-8 border-t-zinc-500 cursor-not-allowed"}`}>
                            <div className='flex flex-col gap-4 justify-center h-full'>
                                <p className='text-[#4d4e62] dark:text-[#BCB4B4] group-hover:text-white'>id: <strong>{service.id}</strong></p>
                                <p className='text-[#4d4e62] dark:text-[#BCB4B4] group-hover:text-white'>title: <strong>{service.title}</strong></p>
                                <p className='text-[#4d4e62] dark:text-[#BCB4B4] group-hover:text-white'>status: <strong>{service.offerStatus !== "pending" ? service.status : "Waiting to be accepted"}</strong></p>
                                <p className='text-[#4d4e62] dark:text-[#BCB4B4] group-hover:text-white'>Type of service: <strong>{service.type}</strong></p>
                                <p className='text-[#4d4e62] dark:text-[#BCB4B4] group-hover:text-white'>Scheduled at: <strong>{getTimeMessage(service.scheduledStartDate)}</strong></p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className='absolute bottom-7 left-7'>
                <div className='dark:bg-zinc-900 p-2 rounded-lg shadow-lg flex justify-center items-center w-full'>
                    <Switch isSelected={hide} onValueChange={setHide} color='success' aria-label='Hide past scheduled services'>
                        {hide ? "Show" : "Hide"} past scheduled services
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default ListScheduledServices