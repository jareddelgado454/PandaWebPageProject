"use client"
import React, { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { deleteUserById } from '@/graphql/users/mutation';
import { client } from '@/app/contexts/AmplifyContext';

const DeletaModal = ({ isOpen, onOpenChange, user, callback, setRecordSelected }) => {

    const handleDeleteUserId = async(id, email) => {
        try {
            if(!id && !email) {
                return;
            }
            await client.graphql({
                query: deleteUserById,
                variables: {
                  id: id,
                  email: email
                },
            });
            setRecordSelected({});
            callback();        
        } catch (error) {
            console.log();
        }
    }


    return(
        <Modal backdrop='opaque' isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                    <p>Delete {user.rol} </p>
                </ModalHeader>
                <ModalBody>
                  <div className='flex w-full gap-x-3 justify-center items-center'>
                  <RiAlertFill />
                    Are you sure you want to delete this {user.rol}
                  </div>
                    
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose} >
                    Cancel
                  </Button>
                  <Button onPress={onClose}  onClick={()=>handleDeleteUserId(user.id, user.email)} className='bg-emerald-500 text-white'>
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
      </Modal>
    )
}

export default DeletaModal;