"use client"

import React, { useEffect, useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import validationPasswordRecovery from '@/app/auth/password-recovery/validationPasswordRecovery';
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine, 
  RiErrorWarningFill
} from "react-icons/ri";
import { confirmResetPassword } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

const ChangingPassword = ({isOpen, onOpenChange, username}) => {
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState({
        status : false,
        message : ""
    })
    const router = useRouter();
    const [dataForm, setDataForm] = useState(
    {
        code : "",
        password : "",
        confirmPassword : ""   
    });

    useEffect(()=>{
         if(dataForm.password != "" || dataForm.confirmPassword !="" ){
            setErrors(validationPasswordRecovery(dataForm));
         }   
    },[dataForm]);

    const [showPassword, setShowPassword] = useState(false);
    const evaluateErrors = () => {
        return (errors.password && dataForm.password != "") || (errors.confirmPassword && dataForm.confirmPassword != "")
    }

    const handleChangePassword = async (onClose) => {
      setErrorMessage({
        status : false,
        message : ""
      })
      if( !evaluateErrors() && (dataForm.password != "" && dataForm.confirmPassword != "" && dataForm.code != "")){
          try {
            await confirmResetPassword({ username:username, confirmationCode : dataForm.code, newPassword : dataForm.password });
            onClose();
            toast.success("Password changed successfully.");
            router.push("/auth/signin");
          } catch (error) {
              console.log(error)
              if(error.name == "ExpiredCodeException"){
                  setErrorMessage({
                    status : true,
                    message : "The code to change your password has expired, re-enter your email to request a new one"
                  })
              }else if(error.name == "CodeMismatchException"){
                  setErrorMessage({
                    status : true,
                    message : "The code you have provided is not correct, check your inbox or spam box to find the code"
                  })
              }else if(error.name == "LimitExceededException"){
                  setErrorMessage({
                    status : true,
                    message : "Attempt limit exceeded, please try after some time"
                  })
              }
          }
      }else{
          setErrorMessage({
              status : true,
              message : "All fields must be filled out and completed correctly"
          })
      }   
    }

  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} hideCloseButton={true}>
          <ModalContent className='bg-zinc-800 text-white border-[2px] border-gray-700'>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col ">
                    <p>Changing password</p>
                </ModalHeader>
                <ModalBody className='w-full flex flex-col items-center justify-center'>
                    <div className=' w-full flex flex-col items-center justify-center '>
                      <RiCheckboxCircleLine className='text-emerald-400 text-[50px] mb-3'/>                                      
                      <p className='text-left font-bold text-[35px] mb-3'>
                       Restore your password
                      </p>
                      <p className='text-zinc-300 font-semibold'>We just sent an email with the verification code to:</p>
                      <p className='text-white mb-4 font-semibold'>{username}</p>
                      <div className='w-full flex flex-col'>
                          <p>Verification Code</p>
                          <div className="relative mb-2">
                            <RiMailLine className="absolute left-2 top-3 text-emerald-400" />
                            <input
                              type="text"
                              name="code"
                              value={dataForm.code}
                              onChange={(e) => setDataForm({...dataForm, code : e.target.value})}
                              className="py-2 pl-8 pr-4 bg-zinc-700 border-[1px] border-zinc-700 focus:border-emerald-500 w-full outline-none rounded-2xl mb-4"
                              placeholder="Verification Code"
                            />
                          </div>
                          <p>New password</p>
                          <div className="relative w-full">
                            <RiLockLine className={`absolute left-2 top-3 ${errors.password && dataForm.password != "" ? "text-red-500" : "text-emerald-400"}`} />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={dataForm.password}
                              onChange={(e) => setDataForm({...dataForm, password: e.target.value})}
                              className={`py-2 px-8 bg-zinc-700 border-[1px] ${errors.password && dataForm.password != "" ? "border-red-500 focus:border-red-500" : "border-zinc-700 focus:border-emerald-500" }  w-full outline-none rounded-2xl `}
                              placeholder="New password"
                            />
                            {showPassword ? (
                              <RiEyeOffLine
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute top-5 -translate-y-1/2 right-2 hover:cursor-pointer ${errors.password && dataForm.password != "" ? "text-red-500" : "text-emerald-400"}`}
                              />
                            ) : (
                              <RiEyeLine
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute top-5 -translate-y-1/2 right-2 hover:cursor-pointer ${errors.password && dataForm.password != "" ? "text-red-500" : "text-emerald-400"}`}
                              />
                            )}
                          </div>
                          <p className="text-red-400 text-[14px]">
                            {
                              dataForm.password !=='' && errors.password
                              ?errors.password
                              :<span className="text-transparent">.</span>
                            }
                          </p>

                          <p>Confirm new password</p>
                          <div className="relative w-full">
                            <RiLockLine className={`absolute left-2 top-3 ${errors.confirmPassword && dataForm.confirmPassword != "" ? "text-red-500" : "text-emerald-400"} `} />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={dataForm.confirmPassword}
                              onChange={(e)=> setDataForm({...dataForm, confirmPassword : e.target.value}) }
                              className={`py-2 px-8 bg-zinc-700 border-[1px] ${errors.confirmPassword && dataForm.confirmPassword != "" ? "border-red-500 focus:border-red-500" : "border-zinc-700 focus:border-emerald-500" }   w-full outline-none rounded-2xl `}
                              placeholder="Confirm new password"
                            />
                            {showPassword ? (
                              <RiEyeOffLine
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute top-5 -translate-y-1/2 right-2 hover:cursor-pointer ${errors.confirmPassword && dataForm.confirmPassword != "" ? "text-red-500" : "text-emerald-400"}`}
                              />
                            ) : (
                              <RiEyeLine
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute top-5 -translate-y-1/2 right-2 hover:cursor-pointer ${errors.confirmPassword && dataForm.confirmPassword != "" ? "text-red-500" : "text-emerald-400"}`}
                              />
                            )}
                          </div>
                          <p className="text-red-400 text-[14px] mb-1">
                            {
                              dataForm.confirmPassword !==''  && errors.confirmPassword
                              ?errors.confirmPassword
                              :<span className="text-transparent">.</span>
                            }
                          </p>
                      </div>
                      
                      {
                        errorMessage.status && <div className="bg-red-500 text-white flex w-full justify-center gap-x-2 p-3  mb-2">
                            <RiErrorWarningFill className=" text-[35px]" />
                            <p>{errorMessage.message}</p>
                        </div>
                      }

                      <Button
                          type='button'
                          className='bg-emerald-500 text-[18px] w-full text-white font-bold py-6  rounded-lg  transition-colors  hover:bg-emerald-500 '
                          onClick={  () => handleChangePassword(onClose) }
                      >
                            Restore password
                      </Button>
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

export default ChangingPassword