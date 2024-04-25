'use client';
import React from 'react';
import Image from 'next/image';
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { SecondDateFormatter } from '@/utils/parseDate';
import { client } from '@/contexts/AmplifyContext';
import { UpdateReportStatus } from '@/graphql/issues/mutations/mutation';
import ShowComments from './Components/ShowComments';
export default function InformationModal({ callback, isOpen, onOpenChange, issueSelected }) {
  const handleUpdateStatus = async(id, status) => {
    await client.graphql({
      query: UpdateReportStatus,
      variables: {
        input: {
          id,
          status
        }
      }
    });
    callback();
  }
  return (
    <Modal backdrop='opaque' isOpen={isOpen} onOpenChange={onOpenChange} size='5xl' placement='center'
      className='bg-zinc-200 dark:bg-zinc-900 h-[36rem] max-h-full overflow-y-scroll 2xl:h-[42rem]'
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <p className='text-center'>{`Issue's Title: ${issueSelected.title}`}</p>
            </ModalHeader>
            <ModalBody className='flex justify-center items-center'>
              <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-x-2 gap-y-10 mt-2 mb-6'>
                <div className='dark:bg-zinc-800 bg-white rounded-lg p-4 slide-in-left'>
                  <div className='flex flex-col flex-wrap gap-2 pr-5'>
                    <div className='flex gap-x-3 w-full h-[4rem]' id='user_report_information'>
                      <Image
                        width={50} height={50}
                        className='w-[3rem] h-[3rem] object-cover object-center rounded-full'
                        src={`${issueSelected.user.profilePicture}`} alt='user_profile_picture'
                      />
                      <div className='flex flex-col w-full gap-1'>
                        <div className='flex flex-row flex-nowrap items-center gap-2'>
                          <p className='text-xs font-semibold'>{issueSelected.user.fullName}</p>
                          <p className='text-xs text-zinc-400'>{SecondDateFormatter(new Date(issueSelected.createdAt))}</p>
                        </div>
                        <p className='text-zinc-400 font-light text-xs'>{issueSelected.user.email}</p>
                      </div>
                    </div>
                    <div className='w-full mb-5' id='user_report_description'>
                      <p className='text-sm text-justify'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit nihil laborum a necessitatibus, quaerat incidunt rerum quos accusantium sit quia possimus dolores tempora enim ipsam nulla. Quas libero unde sint.
                      </p>
                    </div>
                    <div className='flex justify-center items-center'>
                      <div className='w-full h-[10rem] lg:h-[14rem] shadow-md rounded-sm dark:bg-zinc-700'>
                        <p className='flex justify-center items-center h-full'>
                          Photo
                        </p>
                      </div>
                    </div>
                    <div className='my-2'>
                      <p className='mb-2 text-sm'>Actions:</p>
                      <div className='flex flex-row flex-nowrap gap-4'>
                        <p
                          className={`p-2 text-xs ${issueSelected.status === 'solved' ? 'bg-emerald-700 text-green-300 rounded-lg  cursor-not-allowed' : 'cursor-pointer'}`}
                          onClick={() => handleUpdateStatus(issueSelected.id, "solved")}
                        >Solved</p>
                        <p
                          className={`p-2 text-xs ${issueSelected.status === 'pending' ? 'bg-amber-600 text-amber-300 rounded-lg cursor-not-allowed' : 'cursor-pointer' }`}
                          onClick={() => handleUpdateStatus(issueSelected.id, "pending")}  
                        >
                            Pending
                          </p>
                        <p
                          className={`p-2 text-xs ${issueSelected.status === 'processed' ? 'bg-indigo-600 text-indigo-300 rounded-lg cursor-not-allowed' : 'cursor-pointer'}`}
                          onClick={() => handleUpdateStatus(issueSelected.id, "processed")}
                        >
                            Processed
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
