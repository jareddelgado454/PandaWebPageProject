import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from "@nextui-org/react";
import MainServicesEmail from "./CustomerModalAcessSteps/MainServicesEmail";
import CreatePassword from "./CustomerModalAcessSteps/CreatePassword";
import AccessWithPassword from "./CustomerModalAcessSteps/AccessWithPassword";

const Steps = {
    Email: "EMAIL",
    CreatePassword: "CREATE_PASSWORD",
    AccessWithPassword: "ACCESS_WITH_PASSWORD",
};

const AccessModal = ({ isOpen, onOpenChange }) => {
  const [step, setStep] = useState(Steps.Email);
  const [email, setEmail] = useState(""); 

  const handleEmailSubmit = (submittedEmail) => {
    setEmail(submittedEmail);
    const needsPasswordCreation = true; 
    if (needsPasswordCreation) {
      setStep(Steps.CreatePassword);
    } else {
      setStep(Steps.AccessWithPassword);
    }
  };

  const handleModalClose = (isOpen) => {
    if (!isOpen) {
      setEmail("");
      setStep(Steps.Email);
    }
    onOpenChange(isOpen);
  };


  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={handleModalClose}
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-950 to-zinc-950/50 backdrop-opacity-20",
      }}
      size="sm"
      placement="top"
    >
      <ModalContent className="bg-darkBlack border-[1px] border-darkGray">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody>
              {step === Steps.Email && (
                <MainServicesEmail onSubmit={handleEmailSubmit} />
              )}
              {step === Steps.CreatePassword && <CreatePassword email={email} />}
              {step === Steps.AccessWithPassword && (
                <AccessWithPassword email={email} />
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AccessModal;