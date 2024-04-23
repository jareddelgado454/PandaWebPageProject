import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import Image from 'next/image';
import ShowComments from './Components/ShowComments';
export default function InformationModal({ isOpen, onOpenChange, issueSelected }) {
  console.log(issueSelected);
  return (
    <Modal backdrop='opaque' isOpen={isOpen} onOpenChange={onOpenChange} size='5xl'>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <p className='text-center'>{`Issue's Title: ${issueSelected.title}`}</p>
            </ModalHeader>
            <ModalBody className='flex justify-center items-center'>
              <div className='grid grid-cols-1 lg:grid-cols-2 w-full mt-2 mb-6'>
                <div className='border-r-[1.5px] slide-in-left'>
                  <div className='flex flex-col flex-wrap gap-2 pr-5'>
                    <div className='flex gap-x-3 w-full h-[4rem]' id='user_report_information'>
                      <Image
                        width={50} height={50}
                        className='w-[3rem] h-[3rem] object-cover object-center rounded-full'
                        src={`${issueSelected.user.profilePicture}`} alt='user_profile_picture'
                      />
                      <div className='flex flex-col w-full'>
                        <p className='font-semibold'>{issueSelected.user.fullName}</p>
                        <p className='text-zinc-400 font-light text-sm'>{issueSelected.user.email}</p>
                      </div>
                    </div>
                    <div className='w-full mb-5' id='user_report_description'>
                      <p className='text-justify'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit nihil laborum a necessitatibus, quaerat incidunt rerum quos accusantium sit quia possimus dolores tempora enim ipsam nulla. Quas libero unde sint.
                      </p>
                    </div>
                    <div className='flex justify-center items-center'>
                      <div className='w-full h-[14rem] shadow-md rounded-sm dark:bg-zinc-800'>
                        <p className='flex justify-center items-center h-full'>
                          Photo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <ShowComments />
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
