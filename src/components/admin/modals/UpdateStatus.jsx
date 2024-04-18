import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const UpdateStatusModal = ({ isOpen, onOpen, onClose, userData }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpen}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Update Status</ModalHeader>
        <ModalBody>
          {/* Aquí puedes mostrar el formulario para actualizar el estado */}
          <p>User ID: {userData.id}</p>
          <p>User Status: {userData.status}</p>
          {/* Añade aquí los campos y lógica para actualizar el estado */}
        </ModalBody>
        <ModalFooter>
          <Button color="warning" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={() => {/* Lógica para actualizar el estado */}}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdateStatusModal;