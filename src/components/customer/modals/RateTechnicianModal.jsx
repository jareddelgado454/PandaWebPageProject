'use client';
import React, { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import Image from 'next/image';
import { FaRegStar, FaRegStarHalf, FaStar } from 'react-icons/fa6';
import { Modal, ModalContent, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { client } from '@/contexts/AmplifyContext';
import { createTechnicianRate } from '@/graphql/services/mutations/mutation';
export default function RateTechnicianModal({ isOpen, onOpenChange, service, technician }) {
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState("");

    const onRateTechnician = async(onClose) => {
        try {
            await client.graphql({
                query: createTechnicianRate,
                variables: {
                    rate,
                    comment,
                    technicianId: technician.id,
                    customerId: service.customer.id
                }
            });
            setRate(0);
            setComment("");
            onClose();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size='md' placement='center'
            className='bg-white dark:bg-zinc-900'
        >
            <ModalContent>
                {(onclose) => (
                    <>
                        <ModalBody className='flex flex-col items-center my-4'>

                            <Image
                                width={150}
                                height={150}
                                alt='technician_profile_picture'
                                className='rounded-full w-[8rem] h-[8rem]'
                                priority
                                src={technician?.profilePicture ? technician.profilePicture : '/image/defaultProfilePicture.jpg'}
                            />
                            <div>
                                <ReactStars
                                    count={5}
                                    size={32}
                                    onChange={(rating) => setRate(rating)}
                                    isHalf={true}
                                    emptyIcon={<FaStar />}
                                    halfIcon={<FaRegStarHalf />}
                                    fullIcon={<FaRegStar />}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <div className='flex flex-row gap-2 justify-center items-center'>
                                <strong className='text-xl'>Rate</strong><p className='text-xl'>{technician.fullName}</p>
                            </div>
                            <div className='w-[70%]'>
                                <textarea
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline'
                                    placeholder={`Leave comments to our technician ${technician.fullName}`}
                                    rows={6}
                                    value={comment}
                                    onChange={({ target }) => setComment(target.value)}
                                >

                                </textarea>
                            </div>
                        </ModalBody>
                        <ModalFooter className=''>
                            <Button onClick={() => onRateTechnician(onclose)} color='success' className='text-white' >Submit</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
