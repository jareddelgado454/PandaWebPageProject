'use client';
import React, { useContext } from 'react'
import { FaXmark } from 'react-icons/fa6';
import { ServiceContext } from '@/contexts/service/ServiceContext';
import { Tooltip } from '@nextui-org/react';
import { client } from '@/contexts/AmplifyContext';
import { DeleteMyRequest } from '@/graphql/services/mutations/mutation';
import Cookies from 'js-cookie';
export default function CancelService() {
    const { serviceRequest, setServiceRequest } = useContext(ServiceContext);
    const deleteMyServiceRequest = async() => {
        try {
            await client.graphql({
                query: DeleteMyRequest,
                variables: {
                    serviceId: serviceRequest.id,
                    serviceCustomerId: serviceRequest.customer.id
                }
            });
            Cookies.remove("ServiceRequest");
            setServiceRequest(null);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            {serviceRequest && serviceRequest.status === 'pending' && (
                <div className='absolute top-5 right-5 z-10 '>
                    <Tooltip className='warning' closeDelay={2000} content="Delete Request">
                        <div className='bg-white  shadow-lg dark:bg-zinc-800 w-[4rem] h-[4rem] p-2 rounded-full cursor-pointer flex justify-center items-center group' onClick={() => deleteMyServiceRequest()}>
                            <FaXmark className='text-2xl text-rose-600 group-hover:text-rose-800 transition-all' />
                        </div>
                    </Tooltip>
                </div>
            )}
        </>
    )
}
