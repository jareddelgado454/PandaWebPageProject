'use client';
import React, { useState } from 'react'
import { ScheduleSteppers } from '@/components/customer/components/schedule/ScheduleSteppers'
import { ConfirmSchedule, DisplayTechnicians, ServiceScheduleCalendar } from '@/components/customer';
export default function ServiceSchedule() {
    const [currentStep, setCurrentStep] = useState(1);
    const [technicianSelected, setTechnicianSelected] = useState();
    return (
        <div className='h-full my-2'>
            {currentStep === 1 && <DisplayTechnicians setCurrentStep={setCurrentStep} />}
            {currentStep === 2 && <ServiceScheduleCalendar setCurrentStep={setCurrentStep} />}
            {currentStep === 3 && <ConfirmSchedule setCurrentStep={setCurrentStep} />}
            <ScheduleSteppers currentStep={currentStep} />
        </div>
    )
}
