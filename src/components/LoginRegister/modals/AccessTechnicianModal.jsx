import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import MainServicesEmailTechnician from "./TechnicianModalAccessSteps/MainServicesEmailTechnician";
import CreateAccountTechnician from "./TechnicianModalAccessSteps/CreateAccountTechnician";
import VerificationCodeTechnician from "./TechnicianModalAccessSteps/VerificationCodeTechnician";
import AccessWithEmailTechnician from "./TechnicianModalAccessSteps/AccessWithEmailTechnician";

const Steps = {
  Email: "EMAIL",
  CreatePassword: "CREATE_PASSWORD",
  AccessWithEmail: "ACCESS_WITH_EMAIL",
  VerificationCode: "VERIFICATION_CODE",
};

const AccessTechnicianModal = ({ isOpen, onOpenChange }) => {
  const [step, setStep] = useState(Steps.Email);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSignIn, setDataSignIn] = useState({
    email: "",
    password: "",
  });
  const [resultData, setResultData] = useState();

  const handleAccessWithEmail = () => {
    setStep(Steps.AccessWithEmail);
  };

  const handleCreateAccount = () => {
    setStep(Steps.CreatePassword);
  };

  const handleVerificationCode = () => {
    setStep(Steps.VerificationCode);
  };

  // const handleEmailSubmit = async (submittedEmail) => {
  //   setEmail(submittedEmail);
  //   const needsPasswordCreation = true;
  //   if (needsPasswordCreation) {
  //     setStep(Steps.CreatePassword);
  //   } else {
  //     setStep(Steps.AccessWithPassword);
  //   }
  // };

  const handleModalClose = (isOpen) => {
    if (!isOpen && !isLoading) {
      setStep(Steps.Email);
      onOpenChange(isOpen);
    }
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={handleModalClose}
      isDismissable={!isLoading && step !== Steps.VerificationCode}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-950 to-zinc-950/50 backdrop-opacity-20",
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
                <MainServicesEmailTechnician
                  onHandleAccessWithEmail={handleAccessWithEmail}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )}
              {step === Steps.CreatePassword && (
                <CreateAccountTechnician
                  goBack={() => setStep(Steps.AccessWithEmail)}
                  onSwitchToVerificationCode={handleVerificationCode}
                  setResultData={setResultData}
                  setDataSignIn={setDataSignIn}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )}
              {step === Steps.AccessWithEmail && (
                <AccessWithEmailTechnician
                  onSwitchToCreateAccount={handleCreateAccount}
                  goBack={() => setStep(Steps.Email)}
                  onSwitchToVerificationCode={handleVerificationCode}
                  setDataSignIn={setDataSignIn}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )}
              {step === Steps.VerificationCode && (
                <VerificationCodeTechnician
                  dataSignIn={dataSignIn}
                  resultData={resultData}
                  handleModalClose={handleModalClose}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AccessTechnicianModal;
