<<<<<<< HEAD
import React from 'react'

const videoModal = () => {
  return (
    <div>videoModal</div>
  )
}

export default videoModal
=======
"use client"

import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";

const VideoModal = ({isOpen, onOpenChange}) => {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size='5xl' hideCloseButton={true} placement='center'>
          <ModalContent className='bg-zinc-800 text-white border-[2px] border-gray-700 p-0'>
            {(onClose) => (
              <>
                <ModalBody className='w-full flex flex-col items-center justify-center'>
                  <iframe
                    src="https://www.youtube.com/embed/FDgVR_qyrCw"
                    frameborder="0"
                    allowfullscreen
                    className='w-full lg:h-[600px] md:h-[400px] h-[300px]'
                    title="The Panda App"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />     
                </ModalBody>
              </>
            )}
          </ModalContent>
    </Modal> 
  )
}

export default VideoModal
>>>>>>> develop
