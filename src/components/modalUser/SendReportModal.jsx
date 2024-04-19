import React from 'react';
import { useRouter } from "next/navigation";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "@nextui-org/react";
import { ReportForm } from './Forms/ReportForm';
function SendReportModal({ isOpen, onOpenChange }) {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-center items-center">
              <p className='capitalize'>Send a report to us</p>
            </ModalHeader>
            <ModalBody className="flex flex-col justify-center">
              <p className='text-justify font-semibold'>
                Do you have any issues related of using our software?. Our technical team is available and we will work to resolve it as soon as possible.
              </p>
              <ReportForm />
            </ModalBody>
            <ModalFooter>
              <Button color="success" variant="light" onPress={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default SendReportModal