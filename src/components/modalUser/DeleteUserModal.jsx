'use client';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "@nextui-org/react";
import { client } from '@/contexts/AmplifyContext';
import { deleteUser } from 'aws-amplify/auth';
import { deleteUserFromDB } from '@/graphql/users/mutation/users';
const DeleteUserModal = ({ isOpen, onOpenChange, user }) => {
    const router = useRouter();
    const [confirmation, setConfirmation] = useState('');
    const onSubmitHandle = async() => {
        try {
            if (confirmation.toLocaleLowerCase() === 'delete') {
                await client.graphql({
                    query: deleteUserFromDB,
                    variables: {
                        id: user.id,
                    },
                    authMode: 'userPool'
                });
                await deleteUser();
                Cookies.remove("");
                router.replace("/"); 
            }
        } catch (error) {
            console.log(error);
        }
    }
    const isDisabled = confirmation.toLocaleLowerCase() !== 'delete';
    return (
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex justify-center items-center">
                            <p>Delete my account</p>
                        </ModalHeader>
                        <ModalBody className="flex flex-col justify-center">
                            <p className='text-justify tracking-wide leading-loose'>
                                Are you sure you want to delete your account? This action cannot be undone.
                                Deleting your account will permanently remove all of your data and information associated with it from our system.
                                You will no longer be able to access your account or any associated services.
                                If you proceed, please type <span className='text-rose-800 font-semibold'>"delete"</span> in the box below to confirm your decision.
                            </p>
                            <input
                                type="text"
                                className='shadow appearance-none border border-rose-600 bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                onChange={({ target }) => setConfirmation(target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <button
                                disabled={isDisabled}
                                className={`bg-rose-600 px-4 py-2 rounded text-white ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={onSubmitHandle}
                            >
                                Action
                            </button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default DeleteUserModal
