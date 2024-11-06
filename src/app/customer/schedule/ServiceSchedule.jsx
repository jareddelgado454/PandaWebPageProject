'use client';
import React, { useState } from 'react'
import { ScheduleSteppers } from '@/components/customer/components/schedule/ScheduleSteppers'
import { ConfirmSchedule, DisplayTechnicians, ServiceScheduleCalendar } from '@/components/customer';
import { Button } from '@nextui-org/react';
export default function ServiceSchedule() {
    const [currentStep, setCurrentStep] = useState(1);
    const [technicianSelected, setTechnicianSelected] = useState();
    const [dates, setDates] = useState({
        start: new Date(),
        end: new Date(),
    });
    return (
        <div className='h-full my-2'>
            {currentStep === 1 && <DisplayTechnicians setCurrentStep={setCurrentStep} setTechnicianSelected={setTechnicianSelected} />}
            {currentStep === 2 && <ServiceScheduleCalendar setCurrentStep={setCurrentStep} dates={dates} setDates={setDates} technicianSelectedId={technicianSelected.id} />}
            {currentStep === 3 && <ConfirmSchedule setCurrentStep={setCurrentStep} technicianSelected={technicianSelected} dates={dates} />}
            <ScheduleSteppers currentStep={currentStep}  />
            <div className='absolute left-5 bottom-5'>
                {currentStep !== 1 && <Button onClick={() => setCurrentStep(currentStep - 1)} color='success'>Back</Button> }
            </div>
        </div>
    )
}
