"use client"

import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import {
  RiDownloadFill,
  RiStarFill
} from "react-icons/ri";
import Link from 'next/link';

const DownloadApp = ({isOpen, onOpenChange, mode}) => {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size='5xl' scrollBehavior='outside'>
          <ModalContent className='bg-zinc-800 text-white border-[2px] border-gray-700'>
            {(onClose) => (
              <>
                <ModalHeader className="flex items-center gap-x-2">
                <div className="flex gap-x-3 mb-5">
                    <div className="rounded-3xl w-[80px] h-[80px] overflow-hidden bg-white">
                       <img src="/panda.png" alt="logo" className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex flex-col">
                       <h4 className="text-white h-[40px] text-[20px] font-light">The Panda <span className='text-emerald-400 uppercase font-bold'>{mode}</span> App</h4>
                       <div className="flex gap-x-1">
                           <RiStarFill className="text-yellow-400 text-[30px]"/>
                           <RiStarFill className="text-yellow-400 text-[30px]"/>
                           <RiStarFill className="text-yellow-400 text-[30px]"/>
                           <RiStarFill className="text-yellow-400 text-[30px]"/>
                           <RiStarFill className="text-yellow-400 text-[30px]"/>
                       </div>
                    </div>
                </div>
                </ModalHeader>
                <ModalBody className='w-full flex flex-col items-center justify-center'>
                  <div className='w-full flex'>
                      <div className='w-1/2 flex flex-col'>
                        <h2 className="text-[50px] text-white font-bold mb-2">Get the App for Apple</h2>
                        <p className="text-[20px] text-gray-200 mb-8">Scan the QR code with your smartphone camera.</p>
                      </div>
                      {
                        mode == "customer"
                        ?(
                          <div className='w-1/2 overflow-hidden flex items-center justify-center'>
                              <div className='w-[90%] border-[4px] border-emerald-400'>

                              </div>
                          </div>
                        )
                        :(
                          <div className='w-1/2'>
                              technician
                          </div>
                        )
                      }
                  </div>
                  
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

export default DownloadApp