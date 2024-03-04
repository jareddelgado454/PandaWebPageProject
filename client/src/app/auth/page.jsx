'use client';
import React, { useState } from 'react';
import { Steppers } from '../../components/LoginRegister/Steppers'
import { Service } from '../../components/LoginRegister/Steps/Service';
import { Information } from '@/components/LoginRegister/Steps/Information';
import { Information2 } from '@/components/LoginRegister/Steps/Information2';

const page = () => {
    const [activeStep1, setActiveStep1] = useState(true);
    const [activeStep2, setActiveStep2] = useState(false);
    const [activeStep3, setActiveStep3] = useState(false);
    const [signUpInformation, setSignUpInformation] = useState({
        fullName : "",
        email : "",
        password : "",
        contactNumber : "",
    });

    return (
        <div className='w-full h-screen relative'>
            <img
                className='absolute h-full w-full object-cover bg-center'
                src="https://cdna.artstation.com/p/assets/images/images/040/174/900/large/fabian-geyer-wideshotright.jpg?1628083532"
                alt="background_image"
            />
            <div className='absolute w-full h-full bg-gray-600 opacity-80' />
            <div className='absolute w-full h-full flex flex-col justify-center items-center gap-10 px-4 md:px-0'>
                <Steppers step1={activeStep1} step2={activeStep2} step3={activeStep3} />
                {
                    activeStep1 && <Service setActiveStep1={setActiveStep1} setActiveStep2={setActiveStep2} />
                }
                {
                    activeStep2 && <Information setActiveStep2={setActiveStep2} setActiveStep3={setActiveStep3} signUpInformation={signUpInformation} setSignUpInformation={setSignUpInformation} />
                }
                {
                    activeStep3 && <Information2 signUpInformation={signUpInformation} setSignUpInformation={setSignUpInformation} />
                }
            </div>
        </div>
    )
}

export default page;
