import React from 'react';
import { Steppers } from '../Steppers';
const steps = {
    "accepted": 1,
    "on the way": 2,
    "in progress": 3,
    "payment": 4,
    "completed": 5
};
export const ScheduledTracking = ({ scheduleService }) => {
    return (
        <>
            <div className='w-full h-full flex flex-col lg:flex-row gap-2 items-center justify-center'>
                <div className='w-[50%] flex justify-center items-center'>
                    <Steppers currentStep={steps[scheduleService.status]} />
                </div>
            </div>
        </>
    )
}
