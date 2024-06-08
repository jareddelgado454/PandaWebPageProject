'use client';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import Image from 'next/image';
import { uploadData } from 'aws-amplify/storage';
import { client } from '@/contexts/AmplifyContext';
import { createImageMessage } from '@/graphql/chat/mutation';
import LoadingComponent from '@/components/LoadingComponent';
import { dataURLtoBlob } from '@/utils/photo/BlobImage';
export default function ConfirmImageMessage({ isOpen, onOpenChange, photograph, chatId, senderId }) {
    const [loading, setLoading] = useState(false);
    const sendImageAsMessage = async(image) => {
        try {
            await client.graphql({
                query: createImageMessage,
                variables: {
                    chatId,
                    image: image,
                    content: '',
                    senderId
                }
            });
            console.log('sended');
        } catch (error) {
            console.error(error);
        }
    }
    const handleUpdatePicture = async () => {
        setLoading(true);
        const uniqueId = uuidv4();
        const filename = `messages-pictures/${uniqueId}.jpg`;
        try {
            const result = await uploadData({
                key: filename,
                data: dataURLtoBlob(photograph),
                options: {
                    contentType: "image/png",
                    onProgress: ({ transferredBytes, totalBytes }) => {
                        if (totalBytes) {
                            console.log(
                                `Upload progress ${Math.round(
                                    (transferredBytes / totalBytes) * 100
                                )} %`
                            );
                        }
                    },
                },
            }).result;
            console.log("Succeeded: ", result);
            sendImageAsMessage(filename);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    return (
        <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size='xl' placement='center'
            className='bg-zinc-200 dark:bg-zinc-900 max-h-full'
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <p className='text-center bg-white dark:bg-zinc-800 rounded-lg mx-4 py-4'>Photo from your device</p>
                        </ModalHeader>
                        <ModalBody className='flex justify-center items-center animate__animated'>
                            <Image
                                src={photograph}
                                width={350}
                                height={350}
                                className='rounded-lg'
                                alt='Image to upload'
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button type='button' onClick={handleUpdatePicture} className='text-white bg-green-panda'>
                                {loading ? <LoadingComponent /> : 'Send'}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
