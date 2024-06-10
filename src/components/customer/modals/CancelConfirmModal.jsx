'use client';
import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import { Modal, ModalContent, ModalBody, Button } from "@nextui-org/react";
import { ServiceContext } from '@/contexts/service/ServiceContext';
import { OnChangeStatusServiceByCustomer } from '@/graphql/services/mutations/mutation';
import { client } from '@/contexts/AmplifyContext';
import { useRouter } from 'next/navigation';
export default function CancelConfirmModal({ isOpen, onOpenChange, service }) {
    const router = useRouter();
    const { setServiceRequest } = useContext(ServiceContext);
    const onHandleCancelService = async () => {
      try {
        await client.graphql({
          query: OnChangeStatusServiceByCustomer,
          variables: {
            customerId: service.customer.id,
            input: {
              id: service.id,
              status: 'cancelled'
            }
          }
        });
        Cookies.remove('ServiceRequest');
        setServiceRequest(null);
        router.replace("/customer");
        return;
      } catch (error) {
        console.error(error);
      }
    }
    return (
        <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size='sm' placement='center'
            className='bg-zinc-200 dark:bg-zinc-900'
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalBody className='flex flex-col justify-center items-center my-7'>
                            <p>You want to cancel the service?</p>
                            <Button onClick={onHandleCancelService} color='danger'>Cancel service</Button>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
