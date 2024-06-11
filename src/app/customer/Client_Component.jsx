'use client';
import React, { useEffect, useState } from 'react'
import { fetchUserAttributes, updateUserAttributes } from 'aws-amplify/auth';
import { toast } from 'react-toastify';
import { BlockOneComponent, BlockTreeComponent, BlockTwoComponent } from '@/components/customer';
import { TermsAndConditionsModal } from '@/components/home';
import { useDisclosure } from '@nextui-org/react';
export default function Client_Component() {
  const {
    isOpen,
    onOpen,
    onOpenChange,
  } = useDisclosure();
  const [isAgreed, setIsAgreed] = useState(true);
  const retrieveUser = async () => {
    try {
      const data = await fetchUserAttributes();
      setIsAgreed(data['custom:termsAccepted']);
    } catch (error) {
      console.warn(error);
    }
  }
  useEffect(() => { retrieveUser() }, [retrieveUser]);

  useEffect(() => {
    if (isAgreed == "false") {
      setIsAgreed(false);
      onOpen(true);
    }
  }, [isAgreed]);

  const updateCustomAttribute = async () => {
    try {
      await updateUserAttributes({
        userAttributes: {
          ['custom:termsAccepted']: "true"
        },
      });
      setIsAgreed(true);
      toast.success(`Accepted Succesfully`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='h-full flex flex-col p-4 overflow-hidden animate__animated animate__fadeInLeft'>
      <TermsAndConditionsModal isOpen={isOpen} onOpenChange={onOpenChange} obligatory={isAgreed ? true : false} callback={updateCustomAttribute} />
      <div className='flex flex-col md:flex-row gap-2 h-[50%] w-full '>
        <div
          className="transition-all ease-in-out duration-200 shadow w-full lg:w-[70%] h-full col-span-3 2xl:col-span-2 bg-green-700/15 dark:bg-zinc-900 rounded-lg"
        >
          <BlockOneComponent />
        </div>
        <div
          className={`transition-all ease-in-out duration-200 col-span-3 2xl:col-span-0 shadow w-full lg:w-[30%] 2xl:h-full bg-green-700/15 dark:bg-zinc-900 rounded-lg overflow-y-scroll p-4 cursor-pointer`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <BlockTwoComponent />
        </div>
      </div>
      <div className='w-full h-[60%]'>
        <div
          className={`transition-all ease-in-out duration-200 shadow col-span-3 bg-green-700/15 dark:bg-zinc-900 rounded-lg h-full`}
        >
          <BlockTreeComponent />
        </div>
      </div>
    </div>
  )
}