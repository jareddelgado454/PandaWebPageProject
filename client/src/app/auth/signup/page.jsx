'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
    RiGoogleFill,
    RiAppleFill,
    RiFacebookCircleFill,
    RiMailLine,
    RiLockLine,
    RiEyeLine,
    RiEyeOffLine, 
} from "react-icons/ri";
import { signUp } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import config from '@/amplifyconfiguration.json';
import VerificationCodeModal from '@/components/LoginRegister/modals/VerificationCodeModal';
import SelectAccountModal from '@/components/LoginRegister/modals/SelectAccountModal';
import { useDisclosure } from "@nextui-org/react";
Amplify.configure(config);

const SignUp = () => {

    const [formData, setFormData] = useState({
        email : "",
        password : "",
        role : null,
        agreed : false
    });

    const [providerIdentitySelected, setProviderIdentitySelected] = useState("");

    const {isOpen: isVerifyCodeModalOpen, onOpen: onVerifyCodeModalOpen, onOpenChange: onVerifyCodeModalOpenChange} = useDisclosure();
    const {isOpen: isSelectAccountModalOpen, onOpen: onSelectAccountModalOpen, onOpenChange: onSelectAccountModalOpenChange} = useDisclosure();

    const handleTypeAccount = (providerIdentity) => {
        setProviderIdentitySelected(providerIdentity);
        onSelectAccountModalOpen();
    }

    const handleCreate = async () => {
        try {
            console.log(formData);
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username : formData.email,
                password : formData.password,
                options : {
                    userAttributes : {
                        email : formData.email,
                        'custom:role' : formData.role
                    },
                }
            });
            console.log("holaaaaa");
            console.log("nextStep",nextStep);
            if(nextStep?.signUpStep == "CONFIRM_SIGN_UP"){
                onVerifyCodeModalOpen();
            }
            console.log( isSignUpComplete, userId, nextStep);
        } catch (error) {
            if (error.message.includes('An account with the given email already exists.')) {
                alert('This email address is already registered. Please use a different email address.');
            } else {
                console.log("Unknown error occurred:", error);
            }
        }
    }

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='w-full text-white flex justify-center items-center'>
            <div className='container  flex'>
                <div className='w-1/2'>
                    <div className=" border-transparent flex flex-col border-b-[2px] border-gray-600 mb-6 pb-4">
                      <p className="text-white mb-3">
                        Do you already have an account? <Link className="hover:text-emerald-400 text-emerald-300 text-[18px] font-bold hover:font-bold cursor-pointer" href="/auth/signin" >Login here</Link>
                      </p>
                    </div>
                    <div className='mb-3'>
                        <h2 className='text-[30px] font-bold'>SIGN-UP</h2>
                        <p>enter with your account</p>
                    </div>
                    <div className='w-full flex items-center justify-between'>
                        <button onClick={() => handleTypeAccount("Google")} className="w-[30%]  bg-zinc-900 hover:bg-zinc-700 hover:shadow-xl transition-colors delay-50  mb-2  hover:text-white text-white rounded-2xl flex gap-x-1 items-center justify-center py-3 px-5">
                            <RiGoogleFill className='text-[20px] text-red-400'/> Google
                        </button>   
                        <button onClick={() => signInWithRedirect({ provider: "Facebook", customState: "shopping-cart" })} className="w-[30%] bg-zinc-900 hover:bg-zinc-700 hover:shadow-xl transition-colors delay-50 text-[15px]  mb-2  hover:text-white text-white rounded-2xl flex gap-x-1 items-center justify-center py-3 ">
                            <RiFacebookCircleFill  className='text-[20px] text-blue-400'/> Facebook
                        </button> 
                        <button onClick={() => signInWithRedirect({ provider: "Google", customState: "shopping-cart" })} className="w-[30%] bg-zinc-900 hover:bg-zinc-700 hover:shadow-xl transition-colors delay-50  mb-2  hover:text-white text-white rounded-2xl flex gap-x-1 items-center justify-center py-3 px-5">
                            <RiAppleFill className='text-[20px]'/> Apple
                        </button> 
                    </div>
                    <p className='w-full text-center text-[18px] font-semibold mb-3'>or</p>
                    <form className="mb-7  w-full">
                          <p>Email: <span className='text-red-400'>*</span></p>
                          <div className="relative mb-3">
                            <RiMailLine className="absolute left-2 top-4 text-emerald-400" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={(event) => setFormData({...formData, email : event.target.value})}
                              className="py-3 pl-8 pr-4 bg-zinc-700 border-[1px] border-zinc-700 focus:border-emerald-500 w-full outline-none rounded-2xl mb-4"
                              placeholder="E-mail"
                            />
                          </div>
                          <p>Password: <span className='text-red-400'>*</span></p>
                          <div className="relative mb-4">
                            <RiLockLine className="absolute left-2 top-4 text-emerald-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={formData.password}
                              onChange={(event) => setFormData({...formData, password : event.target.value})}
                              className="py-3 px-8 bg-zinc-700 border-[1px] border-zinc-700 focus:border-emerald-500  w-full outline-none rounded-2xl mb-4 "
                              placeholder="Password"
                            />
                            {showPassword ? (
                              <RiEyeOffLine
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-6 -translate-y-1/2 right-2 hover:cursor-pointer text-emerald-400"
                              />
                            ) : (
                              <RiEyeLine
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-6 -translate-y-1/2 right-2 hover:cursor-pointer text-emerald-400"
                              />
                            )}
                          </div>
                          <p>Confirm the password: <span className='text-red-400'>*</span></p>
                          <div className="relative mb-4">
                            <RiLockLine className="absolute left-2 top-4 text-emerald-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="confirmPassword"
                              className="py-3 px-8 bg-zinc-700 border-[1px] border-zinc-700 focus:border-emerald-500  w-full outline-none rounded-2xl mb-4 "
                              placeholder="Confirm password"
                            />
                            {showPassword ? (
                              <RiEyeOffLine
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-6 -translate-y-1/2 right-2 hover:cursor-pointer text-emerald-400"
                              />
                            ) : (
                              <RiEyeLine
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-6 -translate-y-1/2 right-2 hover:cursor-pointer text-emerald-400"
                              />
                            )}
                          </div>
                    </form>
                </div>
                <div className='w-1/2 flex flex-col justify-center items-center'>
                    <div className='w-[450px] bg-zinc-700 p-5 rounded-md mb-6 pb-8'>
                        <h2 className='text-[30px] font-bold mb-3'>Account settings</h2>
                        <p className='mb-1'>Choose your account type: <span className='text-red-400'>*</span></p>
                        <select
                            value={formData.role}
                            onChange={(event) => setFormData({ ...formData, role:event.target.value })}
                            className='block w-full bg-zinc-800 text-white py-3 px-4 rounded-lg mb-2'
                        >
                            <option className='text-white' value='' disabled>
                                Select an option
                            </option>
                            <option className='text-white' value='customer'>
                                Customer
                            </option>
                            <option className='text-white' value='technician'>
                                Technician
                            </option>
                        </select>

                        <p className='text-[12px] font-light text-gray-100'>
                            <span className='text-[14px] font-bold text-white'>Customer account:</span>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                        </p>

                        <p className='text-[12px] font-light text-gray-100 mb-3'>
                            <span className='text-[14px] font-bold text-white'>Technician account:</span>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                        </p>

                        <div className="flex items-center gap-x-2 mb-2">
                            <input
                                type="checkbox"
                                checked={formData.agreed}
                                onChange={(event) => setFormData({...formData, agreed : !formData.agreed})}
                                className="rounded border-emerald-400 focus:ring-emerald-400 focus:border-emerald-400"
                            />
                            <p className='text-white'>Check here to accept the <span className='text-emerald-300 cursor-pointer font-semibold'>Terms and conditions</span></p>
                        </div>

                        <button onClick={() => handleCreate()}  className=' w-full py-3 text-[19px] bg-emerald-500 hover:bg-emerald-500/90 transition-colors rounded-lg text-white'>Create account</button>

                    </div>
                    <div className='w-[450px] bg-zinc-700 p-5 rounded-md'>
                        hola perri
                    </div>
                </div>
            </div>
            <VerificationCodeModal isOpen={isVerifyCodeModalOpen} onOpenChange={onVerifyCodeModalOpenChange} dataSignIn={{email:formData.email, password : formData.password}}/>
            <SelectAccountModal isOpen={isSelectAccountModalOpen} onOpenChange={onSelectAccountModalOpenChange} providerIdentitySelected = {providerIdentitySelected}/>
        </div>
    )
}

export default SignUp;
