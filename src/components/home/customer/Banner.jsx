'use client';
import React, { useState } from 'react'
import Image from 'next/image'
import { useDisclosure } from '@nextui-org/react';
import { SigninModal } from '../modals/SigninModal';
import { SignupModal } from '../modals/SignupModal';
import VerificationCodeModal from '@/components/LoginRegister/modals/VerificationCodeModal';
import { signOut } from 'aws-amplify/auth';
const banner = () => {
    const [dataSignUp, setDataSignIn] = useState({
        email: '',
        password: ''
    });
    const [resultData, setResultData] = useState();
    const {
        isOpen: isSignInModalOpen,
        onOpen: onSignInModalOpen,
        onOpenChange: onSignInModalChange,
    } = useDisclosure();
    const {
        isOpen: isSignUpModalOpen,
        onOpen: onSignUpModalOpen,
        onOpenChange: onSignUpModalChange,
    } = useDisclosure();
    const {
        isOpen: isVerifyCodeModalOpen,
        onOpen: onVerifyCodeModalOpen,
        onOpenChange: onVerifyCodeModalOpenChange,
    } = useDisclosure();
    return (
        <div className='h-screen'>
            <VerificationCodeModal
                isOpen={isVerifyCodeModalOpen}
                onOpenChange={onVerifyCodeModalOpenChange}
                dataSignIn={{ email: dataSignUp.email, password: dataSignUp.password }}
                resultData={resultData}
                roleSelected={"customer"}
            />
            <SigninModal isOpen={isSignInModalOpen} onOpenChange={onSignInModalChange} setDataSignIn={setDataSignIn} onOpenVerifyModal={onVerifyCodeModalOpen} />
            <SignupModal isOpen={isSignUpModalOpen} onOpen={onSignUpModalOpen} onOpenChange={onSignUpModalChange} setDataSignIn={setDataSignIn} onOpenVerifyModal={onVerifyCodeModalOpen} setResultData={setResultData} />
            <div className='flex flex-row items-center'>
                <div className='flex flex-row gap-2 items-center'>
                    <Image src={'/panda.webp'} width={200} height={200} className='w-[5rem] h-[4rem]' alt='Panda_Logo_web' />
                    <p className='text-[#E6D5C9] text-2xl tracking-widest font-semibold'>Panda</p>
                </div>

            </div>
            <div className='flex flex-col justify-center items-center gap-7 h-[65%] w-[100%] 2xl:w-[40%] select-none'>
                <p className='text-[#E6D5C9] font-black tracking-wider text-3xl 2xl:text-6xl text-center'>Customer App</p>
                <p className='text-[#E6D5C9]/60 text-sm 2xl:text-base px-16 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className='flex flex-row gap-5'>
                    <button className='border-2 border-[#40c48e] text-white tracking-wider rounded-3xl px-5 py-2 cursor-pointer transition-all ease-in-out hover:bg-green-panda hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300'
                        type='button'
                        onClick={onSignInModalOpen}
                    >
                        SignIn
                    </button>
                    <button className='border-2 border-[#40c48e] text-white tracking-wider rounded-3xl px-5 py-2 cursor-pointer transition-all ease-in-out hover:bg-green-panda hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300'
                        type='button'
                        onClick={onSignUpModalOpen}
                    >
                        SignUp
                    </button>
                    {/* <button className='border-2 border-[#40c48e] text-white tracking-wider rounded-3xl px-5 py-2 cursor-pointer transition-all ease-in-out hover:bg-green-panda hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300'
                        type='button'
                        onClick={signOut}
                    >
                        Logout
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default banner