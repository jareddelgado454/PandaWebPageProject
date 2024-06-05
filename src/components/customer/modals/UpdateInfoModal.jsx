import React from 'react';
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import UpdateInformationForm from '../forms/UpdateInformationForm';
export default function UpdateInfoModal({ isOpen, onOpenChange, callback, customer }) {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size='2xl' placement='center'
      className='bg-zinc-200 dark:bg-zinc-900 py-4'
    >
      <ModalContent>
        {(closemodal) => (
          <>
            <ModalBody className='flex flex-col gap-6 items-center justify-center w-full h-full'>
              <p>Update My Information</p>
              <UpdateInformationForm callback={callback} customer={customer} closeModal={closemodal} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
