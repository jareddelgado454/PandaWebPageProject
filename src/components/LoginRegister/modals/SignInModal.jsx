"use client"

import React, {useState} from 'react'
import Link from 'next/link';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { signIn } from 'aws-amplify/auth';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {
    RiGoogleFill,
    RiAppleFill,
    RiFacebookCircleFill,
    RiMailLine,
    RiLockLine,
    RiEyeLine,
    RiEyeOffLine, 
} from "react-icons/ri";
import { signInWithRedirect, signOut, getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";

const SignInModal = ({isOpen,onOpenChange}) => {

    const [showPassword, setShowPassword] = useState(false);

    const initialValue = {
        email: '',
        password: ''
    }

    const onHandleSubmit = async (values) => {
      console.log(values);
        try {
          const { isSignedIn, nextStep } = await signIn({ 
            username : values.email , 
            password : values.password,
            options: {
              authFlowType: 'USER_SRP_AUTH'
            }
          });
          if (isSignedIn) {
            console.log("Login successfully");
          } else {
            if (nextStep?.signInStep === 'CONFIRM_SIGN_UP') {
              console.log("necesita confirmar su correo");
            } else {
              setError('Error signing in. Please try again.');
            }
          }
        } catch (error) {
          console.log('Error signing in', error);
        }
    }

  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className='bg-zinc-800 text-white border-[2px] border-gray-700'>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                    <p>Login with</p>
                </ModalHeader>
                <ModalBody className='w-full flex flex-col items-center justify-center'>
                    <div className='w-full flex items-center justify-around'>
                        <button onClick={() => signInWithRedirect({ provider: "Google", customState: "shopping-cart" })} className="w-[30%]  bg-zinc-900 hover:bg-zinc-700 hover:shadow-xl transition-colors delay-50  mb-2  hover:text-white text-white rounded-2xl flex gap-x-1 items-center justify-center py-2 px-5">
                            <RiGoogleFill className='text-[20px] text-red-400'/> Google
                        </button>   
                        <button onClick={() => signInWithRedirect({ provider: "Facebook", customState: "shopping-cart" })} className="w-[30%] bg-zinc-900 hover:bg-zinc-700 hover:shadow-xl transition-colors delay-50 text-[15px]  mb-2  hover:text-white text-white rounded-2xl flex gap-x-1 items-center justify-center py-2 ">
                            <RiFacebookCircleFill  className='text-[20px] text-blue-400'/> Facebook
                        </button> 
                        <button onClick={() => signInWithRedirect({ provider: "Google", customState: "shopping-cart" })} className="w-[30%] bg-zinc-900 hover:bg-zinc-700 hover:shadow-xl transition-colors delay-50  mb-2  hover:text-white text-white rounded-2xl flex gap-x-1 items-center justify-center py-2 px-5">
                            <RiAppleFill className='text-[20px]'/> Apple
                        </button> 
                    </div>
                    <p className='w-full text-center text-[18px] font-semiabold mb-3'>or</p>
                    <Formik
                      initialValues={initialValue}
                      onSubmit={(values) => onHandleSubmit(values)}
                    >
                      {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit} className="mb-7  w-[90%]">
                          <div className="relative mb-3">
                            <RiMailLine className="absolute left-2 top-4 text-emerald-400" />
                            <Field
                              type="email"
                              name="email"
                              className="py-3 pl-8 pr-4 bg-zinc-700 border-[1px] border-zinc-700 focus:border-emerald-500 w-full outline-none rounded-2xl mb-4"
                              placeholder="E-mail"
                            />
                          </div>
                          <div className="relative mb-4">
                            <RiLockLine className="absolute left-2 top-4 text-emerald-400" />
                            <Field
                              type={showPassword ? "text" : "password"}
                              name="password"
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
                          <div>
                            <button
                              type="submit"
                              className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer font-bold text-white text-[18px] w-full py-3 px-4 rounded-lg transition-colors delay-50"
                            >
                              Login
                            </button>
                          </div>
                          <span></span>
                        </Form>
                      )}
                    </Formik>
                    <p className="text-white mb-3 font-bold hover:text-emerald-300 hover:font-bold cursor-pointer transition-colors">
                      Have you forgotten the password?
                    </p>
                    <div className=" border-transparent border-r-[1px] border-r-white/10 flex flex-col items-center justify-center text-center px-8 ">
                      <p className="text-white mb-3">
                        {"Don't have an accsount?"} <Link className="hover:text-emerald-300 text-[18px] font-bold hover:font-bold cursor-pointer" href="/auth" >Sign up for free</Link>
                      </p>
                    </div>
                    
                </ModalBody>
                <ModalFooter>
                  
                </ModalFooter>
              </>
            )}
          </ModalContent>
      </Modal>
  )
}

export default SignInModal