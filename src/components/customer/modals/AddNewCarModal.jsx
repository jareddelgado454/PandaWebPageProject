'use client';
import React from 'react';
import { Modal, ModalContent, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import CarForm from '../forms/CarForm';
import { client } from '@/contexts/AmplifyContext';
import { deleteMyCar } from '@/graphql/users/customer/mutation';
export default function AddNewCarModal({ isOpen, onOpenChange, callback, car = {}, edit = false, setMyCars = () => {} }) {
    const onHandleDeleteCard = async() => {
        try {
            if(!car){
                alert('There is no car');
                return;
            }
            const { data } = await client.graphql({
                query: deleteMyCar,
                variables: {
                    carId: car.id
                }
            });
            callback();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' placement='center'
            className='bg-white dark:bg-zinc-900 py-6'
        >
            <ModalContent>
                {(onclose) => (
                    <>
                        <ModalBody className='flex flex-col items-center'>
                            <p className='text-2xl font-semibold'>{edit ? 'Edit my car' : 'Add new car'}</p>
                            <CarForm callback={callback} car={car} edit={edit} onClose={onclose} setMyCars={setMyCars} />
                        </ModalBody>
                        <ModalFooter>
                            <Button type='button' color='danger' onClick={onHandleDeleteCard}>
                                Delete car
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
