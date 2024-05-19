"use client"
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { updateCustomerStatus, updateTechnicianStatus } from '@/graphql/users/mutation';
import { client } from '@/contexts/AmplifyContext';
const EditModal = ({ isOpen, onOpenChange, user, callback, setRecordSelected, typeUser }) => {
  const [selectedStatus, setSelectedStatus] = useState(user.status);

  const handleStatusChange = (event) => {
    console.log(event.target.value)
    setSelectedStatus(event.target.value);

  };
  const handleUpdateStatus = async () => {
    try {
      if (!user) return;

      let query;
      switch (typeUser) {
        case 'customer':
          query = updateCustomerStatus;
          break;
        case 'technician':
          query = updateTechnicianStatus;
          break;
        default:
          return;
      }

      await client.graphql({
        query: query,
        variables: {
          input: {
            id: user.id,
            status: selectedStatus
          }
        },
      });
      setRecordSelected({});
      callback();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal backdrop='opaque' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <p>Update Status</p>
            </ModalHeader>
            <ModalBody>
              <div className='flex flex-col w-full gap-y-6 justify-center items-center'>
                <Select
                  label={`status`}
                  placeholder="Select a status"
                  defaultSelectedKeys={[user.status]}
                  className=" w-full"
                  onChange={handleStatusChange}
                >
                  <SelectItem key="active" value="Active">
                    Active
                  </SelectItem>
                  <SelectItem key="inactive" value="Inactive">
                    Inactive
                  </SelectItem>
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose} >
                Cancel
              </Button>
              <Button onPress={onClose} onClick={() => handleUpdateStatus(user, selectedStatus)} className='bg-emerald-500 text-white'>
                Update
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default EditModal;