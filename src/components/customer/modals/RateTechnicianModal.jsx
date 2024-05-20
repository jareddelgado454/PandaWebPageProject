import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Modal, ModalContent, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import Image from 'next/image';
import { FaRegStar, FaRegStarHalf, FaStar } from 'react-icons/fa6';
export default function RateTechnicianModal({ isOpen, onOpenChange, technician }) {
    return (
        <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size='sm' placement='center'
            className='bg-zinc-200 dark:bg-zinc-900'
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalBody className='flex flex-col items-center my-4'>

                            <Image
                                width={150}
                                height={150}
                                alt='technician_profile_picture'
                                className='rounded-full w-[8rem] h-[8rem]'
                                src={technician.profilePicture ? technician.profilePicture : '/image/defaultProfilePicture.jpg'}
                            />
                            <div>
                                <ReactStars
                                    count={5}
                                    size={32}
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
                        </ModalBody>
                        <ModalFooter className=''>
                            <Button color='success' className='text-white' >Submit</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
