'use client';
import React from 'react';
import { Modal, ModalContent, ModalBody, DateInput, Button } from "@nextui-org/react";
import { parseAbsoluteToLocal } from '@internationalized/date';
const ScheduledModal = ({ isOpen, onOpenChange, dates, setCurrentStep }) => {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} placement='center' size="5xl" className='min-h-[14rem]'>
        <ModalContent>
                {(onclose) => (
                    <>
                        <ModalBody className='flex flex-col items-center my-4'>
                            <p className='text-xl tracking-wider font-bold'>Select date of service</p>
                            <div className='mt-6 w-full flex flex-col gap-6'>
                                <div className='flex gap-8'>
                                    <DateInput
                                        label={"Schedule Start Date"}
                                        defaultValue={parseAbsoluteToLocal(dates.start.toISOString())}
                                    />
                                    <DateInput
                                        label={"Schedule End Date"}
                                        defaultValue={parseAbsoluteToLocal(dates.end.toISOString())}
                                    />
                                </div>
                                <Button onClick={() => {setCurrentStep(3); onclose();}} color='success' className='text-zinc-100 tracking-widest font-semibold'>
                                    Next Step
                                </Button>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
    </Modal>
  )
}

export default ScheduledModal