'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { SecondDateFormatter } from '@/utils/parseDate';
import { client } from '@/contexts/AmplifyContext';
import { UpdateReportStatus } from '@/graphql/issues/mutations/mutation';
import ShowComments from './Components/ShowComments';
import { baseUrl } from '@/utils/CloudFront';
export default function InformationModal({ callback, isOpen, onOpenChange, issueSelected }) {
  const [zoom, setZoom] = useState(false);
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
      className='bg-zinc-200 dark:bg-zinc-900 h-[36rem] overflow-hidden max-h-full 2xl:h-[43rem]'
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <p className='text-center bg-white dark:bg-zinc-800 rounded-lg py-2 mx-4'>{`Issue's Title: ${issueSelected.title}`}</p>
            </ModalHeader>
            <ModalBody className='flex justify-center items-center'>
              <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-x-2 gap-y-10 mt-2 mb-6'>
                <div className={`dark:bg-zinc-800 bg-white rounded-lg slide-in-left transition-all ease-in-out relative overflow-hidden ${zoom ? 'p-0' : 'p-4'}`}>
                  <div className='flex flex-col flex-wrap gap-2'>
                    <div className={`flex gap-x-3 w-full h-[4rem] ${zoom && 'hidden'}`} id='user_report_information'>
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
                    <div className={`w-full mb-5 ${zoom && 'hidden'}`} id='user_report_description'>
                      <p className='text-sm text-justify h-[5rem] overflow-y-scroll max-h-[5rem]'>
                        {issueSelected.description}
                      </p>
                    </div>
                    <div className={`flex justify-center items-center ${zoom && 'absolute h-full w-full'}`}>
                      <Image
                        src={`${issueSelected.image ? `${baseUrl + issueSelected.image}` : '/none.jpg'}`}
                        width={800}
                        height={800}
                        className={`object-cover w-full rounded-lg shadow-md dark:bg-zinc-700 z-50 cursor-pointer ${zoom ? 'h-full' : 'h-[10rem] lg:h-[14rem]'}`}
                        alt='report_image'
                        onClick={() => setZoom(!zoom)}
                      />
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
                {issueSelected.answers ? <ShowComments reportId={issueSelected.id} /> : (<div>No answers yet</div>)}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
