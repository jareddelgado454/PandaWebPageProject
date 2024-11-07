'use client';
import React from 'react';
import { Modal, ModalContent, ModalBody, DateInput, Button } from "@nextui-org/react";
import { parseAbsoluteToLocal } from '@internationalized/date';
const ScheduledModal = ({ isOpen, onOpenChange, dates, setDates, setCurrentStep }) => {
    const handleDateChange = (dateObject) => {
        const { year, month, day, hour, minute, second } = dateObject;

        const startDate = new Date(
            year,
            month - 1,
            day,
            hour,
            minute,
            second || 0
        );

        const endDate = new Date(startDate.getTime() + 30 * 60000);
        setDates({ start: startDate, end: endDate });
    };
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
                                        granularity='minute'
                                        hideTimeZone
                                        defaultValue={parseAbsoluteToLocal(dates.start.toISOString())}
                                        onChange={(e) => handleDateChange(e)}
                                    />
                                </div>
                                <Button onClick={() => { setCurrentStep(3); onclose(); }} color='success' className='text-zinc-100 tracking-widest font-semibold'>
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