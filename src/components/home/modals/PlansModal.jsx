import React from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import Image from 'next/image';
export const PlansModal = ({ isOpen, onOpenChange }) => {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size='3xl'>
            <ModalContent className='bg-zinc-900' style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                {() => (
                    <>
                        <ModalHeader className='w-full'>
                            <p className='text-center w-full text-2xl text-[#E6D5C9] tracking-widest'>Our Plans & Prices</p>
                        </ModalHeader>
                        <ModalBody className='text-[#E6D5C9]'>
                            <Image src={'/panda.webp'} width={150} height={150} alt='Panda_Logo_Web' className='mx-auto' />
                            <div className='flex flex-col xl:flex-row justify-center items-center gap-4'>
                                <div className='w-[50%] flex flex-col gap-4 justify-center items-center'>
                                    <div className='bg-zinc-700 rounded-lg p-2 w-full h-full'>
                                        <p className='text-center tracking-wider font-semibold'>Business</p>
                                        <p className='text-center text-[#40C48E]'>Free to use</p>
                                    </div>
                                    <div className='bg-zinc-700 rounded-lg h-[16rem] w-full flex flex-col gap-3 justify-center items-center px-4'>
                                        <p className='text-center tracking-wider leading-relaxed'>Recommendation for individuals or companies who plan to do less business with The Panda</p>
                                        <p className='text-[#40C48E] text-sm'>* Technicians will pay 10% commission</p>
                                    </div>
                                </div>
                                <div className='w-[50%] flex flex-col gap-4 justify-center items-center'>
                                    <div className='bg-zinc-700 rounded-lg p-2 w-full h-full'>
                                        <p className='text-center tracking-wider font-semibold'>Business Pro</p>
                                        <p className='text-center text-[#40C48E]'>$5000 Anually</p>
                                    </div>
                                    <div className='bg-zinc-700 rounded-lg h-[16rem] w-full flex flex-col gap-3 justify-center items-center px-4'>
                                        <p className='text-center tracking-wider leading-relaxed'>Recommended for individuals or companies who plan to do a large amount of business with The Panda</p>
                                        <p className='text-[#40C48E] text-sm'>* Technicians will pay no commission</p>
                                        <p className='text-[#40C48E] text-sm'>* Pay monthly at $500 per month</p>
                                        <p className='text-[#40C48E] text-sm'>* Annual billing will give best value</p>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
  )
}
