import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import {RiErrorWarningFill} from "react-icons/ri";
import Link from 'next/link';

const ErrorAlert = ({isOpen, onOpenChange, error}) => {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} >
          <ModalContent className='bg-zinc-800 text-white border-[2px] border-gray-700'>
            {(onClose) => (
              <>
                <ModalHeader className="flex items-center gap-x-2">
                    <RiErrorWarningFill className='text-gray-400 text-[25px]'/>
                    <p>Alert</p>
                </ModalHeader>
                <ModalBody className='w-full flex flex-col items-center justify-center'>
                    {
                        error == "alreadyExists"
                        ? (
                            <div className='flex flex-col'>
                                <p>There is <span className='text-emerald-300'>already</span> an account <span className='text-emerald-300'>registered</span> with this email, you can log in with a Google, Facebook, Apple account and fill out the form.</p>
                            </div>
                        )
                        : (<div>Ups! An error has occurred.</div>)
                    }
                </ModalBody>
                <ModalFooter>
                    <Link href="/auth/signin" className='w-[130px] text-center text-[17px] py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-colors text-white'>
                        Log In
                    </Link>
                </ModalFooter>
              </>
            )}
          </ModalContent>
    </Modal> 
  )
}

export default ErrorAlert