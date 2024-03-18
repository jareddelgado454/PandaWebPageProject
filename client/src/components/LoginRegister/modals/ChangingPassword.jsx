"use client"

import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import {
  RiGoogleFill,
  RiAppleFill,
  RiFacebookCircleFill,
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine, 
} from "react-icons/ri";
import { confirmResetPassword } from 'aws-amplify/auth';

const ChangingPassword = ({isOpen, onOpenChange, username}) => {
    const [dataForm, setDataForm] = useState(
    {
        code : "",
        password : ""   
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChangePassword = async (onClose) => {
      try {
        const response = await confirmResetPassword({ username:username, confirmationCode : dataForm.code, newPassword : dataForm.password });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} hideCloseButton={true}>
          <ModalContent className='bg-zinc-800 text-white border-[2px] border-gray-700'>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                    <p>Changing password</p>
                </ModalHeader>
                <ModalBody className='w-full flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center justify-center '>
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
                          <div className="relative mb-2">
                            <RiLockLine className="absolute left-2 top-3 text-emerald-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={dataForm.password}
                              onChange={(e) => setDataForm({...dataForm, password: e.target.value})}
                              className="py-2 px-8 bg-zinc-700 border-[1px] border-zinc-700 focus:border-emerald-500  w-full outline-none rounded-2xl mb-4 "
                              placeholder="New password"
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
                          <p>Confirm new password</p>
                          <div className="relative mb-2">
                            <RiLockLine className="absolute left-2 top-3 text-emerald-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="confirmPassword"
                              className="py-2 px-8 bg-zinc-700 border-[1px] border-zinc-700 focus:border-emerald-500  w-full outline-none rounded-2xl mb-4 "
                              placeholder="Confirm new password"
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
                      </div>
                      
                      <Button
                          type='button'
                          className='bg-emerald-500 text-[17px] text-white font-bold py-3 px-5 rounded-lg w-2/3 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-700 duration-300'
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