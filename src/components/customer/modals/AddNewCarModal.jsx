import React from 'react';
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import CarForm from '../forms/CarForm';
export default function AddNewCarModal({ isOpen, onOpenChange }) {
    return (
        <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size='3xl' placement='center'
            className='bg-zinc-200 dark:bg-zinc-900'
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalBody className='flex flex-col items-center'>
                            <p>Add new car</p>
                            <CarForm />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
