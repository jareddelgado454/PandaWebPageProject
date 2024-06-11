import React, { useEffect, useState, useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
} from "@nextui-org/react";
import OnTheWay from "./assignedTechnicianModalSteps/OnTheWay";
import InProgress from "./assignedTechnicianModalSteps/InProgress";
import Payment from "./assignedTechnicianModalSteps/Payment";
import { ServiceAssignedContext } from "@/contexts/serviceAssigned/ServiceAssignedContext";
import Completed from "./assignedTechnicianModalSteps/Completed";

const AssignedTechnicianModal = ({ isOpen, onOpenChange }) => {
  const [serviceStatus, setServiceStatus] = useState(null);
  const { serviceAssigned } = useContext(ServiceAssignedContext);

  useEffect(() => {
    if (serviceAssigned) {
      setServiceStatus(serviceAssigned.status);
    }
  }, [serviceAssigned]);

  const renderStep = () => {
    if (!serviceStatus) {
      return <div className="text-white">Loading...</div>;
    }
    switch (serviceStatus) {
      case "on the way":
        return <OnTheWay isOpen={isOpen} serviceAssigned={serviceAssigned} setServiceStatus={setServiceStatus}/>;
      case "in progress":
        return <InProgress isOpen={isOpen} serviceAssigned={serviceAssigned} setServiceStatus={setServiceStatus}/>;
      case "payment":
        return <Payment isOpen={isOpen} serviceAssigned={serviceAssigned} onOpenChange={onOpenChange}/>;
      case "completed" : 
        return <Completed isOpoen={isOpen} onOpenChange={onOpenChange}/>
      default:
        return <OnTheWay isOpen={isOpen} serviceAssigned={serviceAssigned} />;
    }
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      hideCloseButton={true}
      size="4xl"
    >
      <ModalContent className="bg-zinc-200 text-white border-[2px] border-gray-600 h-[100vh]">
        {(onClose) => (
          <>
            <ModalBody className="w-full h-[100%] flex-col gap-0 items-center justify-center p-0 bg-zinc-200 relative">
              {renderStep()}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AssignedTechnicianModal;
