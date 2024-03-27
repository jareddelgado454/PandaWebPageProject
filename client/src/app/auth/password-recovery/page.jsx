"use client"
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import Link from 'next/link'
import {
    RiMailLine,
    RiMoneyDollarCircleLine,
    RiSmartphoneLine,
    RiListCheck3,
    RiErrorWarningFill
  } from "react-icons/ri";
import { resetPassword } from 'aws-amplify/auth';
import ChangingPassword from '@/components/LoginRegister/modals/ChangingPassword';
import { useDisclosure } from '@nextui-org/react';
const RecoveryPassword = () => {

    const [emailPassed, setEmailPassed] = useState("");
    const [errorMessage, setErrorMessage] = useState({
        status : false,
        message : ""
    });

    const initialValue = {
        email: ''
    }

    const {isOpen: isChangePasswordModalOpen, onOpen: onChangePasswordModalOpen, onOpenChange: onChangePasswordModalOpenChange} = useDisclosure();

    const onHandleSubmit = async (values) => {
        setErrorMessage({
            status : false,
            message : ""
        })
        if(values.email != ""){
          try {
            const output = await resetPassword({ username : values.email });
            setEmailPassed(values.email);
            handleResetPasswordNextSteps(output);
          } catch (error) {
            console.log(error)
              if(error.name == "UserNotFoundException"){
                  setErrorMessage({
                      status : true,
                      message : "No account was found registered with this email"
                  })
              }else{
                  setErrorMessage({
                    status : true,
                    message : "An error ocurred, please try again later"
                  })
              }
          }
        } else {
          setErrorMessage({
              status : true,
              message : "You did not enter any email"
          })
        }
        
    }

    const handleResetPasswordNextSteps = (output) => {
        const { nextStep } = output;
        switch (nextStep.resetPasswordStep) {
          case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
            const codeDeliveryDetails = nextStep.codeDeliveryDetails;
            console.log(
              `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
            );
            onChangePasswordModalOpen();
            break;
          case 'DONE':
            console.log('Successfully reset password.');
            break;
        }
    }

  return (
    <div className='w-full text-white flex justify-center items-center'>
            <div className='w-full flex h-full'>
                <div className='w-1/2 flex justify-center items-center'>
                  <div className='w-[500px]'>
                    <div className='mb-5'>
                        <h2 className='text-[30px] font-bold'>Have you <span className='text-emerald-400'>forgotten</span> the password?</h2>
                        <p>Enter the email address with which you registered at The Panda</p>
                    </div>
                    {
                        errorMessage.status && <div className='bg-red-500 w-full text-white text-[16px] flex items-center gap-x-2 p-2 mb-3'>
                            <RiErrorWarningFill className='text-[30px]'/>
                            <p>{errorMessage.message}</p>
                         </div>
                    }
                    <Formik
                      initialValues={initialValue}
                      onSubmit={(values) => onHandleSubmit(values)}
                    >
                      {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit} className="mb-7  w-full">
                          <p>Email: <span className='text-red-400'>*</span> </p>
                          <div className="relative mb-3">
                            <RiMailLine className="absolute left-2 top-4 text-emerald-400" />
                            <Field
                              type="email"
                              name="email"
                              className="py-3 pl-8 pr-4 bg-zinc-700 border-[1px] border-zinc-700 focus:border-emerald-500 w-full outline-none rounded-2xl mb-4"
                              placeholder="Write your email"
                            />
                          </div>     
                          <div >
                            <button
                              type="submit"
                              className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer font-bold text-white text-[18px] w-full py-3 px-4 rounded-lg transition-colors delay-50"
                            >
                                Restore password
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                    <div className=" border-transparent flex flex-col border-t-[2px] border-zinc-600 pt-8 pb-4">
                      <p className="text-white mb-3">
                        You still don't have an account? <Link className="hover:text-emerald-300 text-emerald-400 text-[18px] font-bold hover:font-bold cursor-pointer" href="/auth/signup" >Sign up here</Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='w-1/2 flex flex-col justify-center items-center'>
                    <div className='relative'>
                        <div className='absolute top-[40%] left-[5%] z-40 flex flex-col'>
                              <h3 className='text-[30px] font-bold mb-7'>Benefit of The Panda</h3>
                              <div className='flex items-center text-[18px] gap-x-3 font-semibold mb-3'>
                                  <RiMoneyDollarCircleLine className='text-emerald-400 text-[35px]'/>
                                  We provide a source of economic power for mobile mechanics.
                              </div>
                              <div className='flex items-center text-[18px] gap-x-3 font-semibold mb-3'>
                                  <RiSmartphoneLine className='text-emerald-400 text-[35px]'/>
                                  We are the best customer management tool for mobile mechanics.
                              </div>
                              <div className='flex items-center text-[18px] gap-x-3 font-semibold mb-3'>
                                  <RiListCheck3  className='text-emerald-400 text-[35px]'/>
                                  We focus on customer acquisition and retention so you don't have to.
                              </div>
                        </div>
                        <div className='absolute top-0 w-full h-full bg-zinc-800 opacity-60'></div> 
                        <img src='https://cdna.artstation.com/p/assets/images/images/040/174/900/large/fabian-geyer-wideshotright.jpg?1628083532' className='object-cover' style={{ height: 'calc(100vh - 80px)' }} />              
                    </div>
                </div>
            </div>
            <ChangingPassword isOpen={isChangePasswordModalOpen} onOpenChange={onChangePasswordModalOpenChange} username={emailPassed}/> 
      </div>
  )
}

export default RecoveryPassword