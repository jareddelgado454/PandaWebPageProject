import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { confirmSignUp, signIn } from 'aws-amplify/auth';

const VerificationCodeModal = ({isOpen, onOpenChange, dataSignIn}) => {

  const [code, setCode] = useState("");


  const handleSignUpConfirmation = async (onClose) => {
    console.log(dataSignIn)
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: dataSignIn.email,
        confirmationCode : code
      });
        
      const response = await signIn({ 
        username : dataSignIn.email, 
        password : dataSignIn.password,
        options: {
          authFlowType: 'USER_SRP_AUTH'
        }
      });
      console.log(response);
      router.replace("/admin-dashboard");
      onClose();

    } catch (error) {
      console.log('error confirming sign up', error);
    }
    console.log(code);
  }

  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} hideCloseButton={true}>
          <ModalContent className='bg-zinc-800 text-white border-[2px] border-gray-700'>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                    <p>Verifying </p>
                </ModalHeader>
                <ModalBody className='w-full flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center justify-center gap-8'>
                      <img
                          src="/panda.png"
                          alt="panga_logo"
                          className='w-[12rem] h-[12rem] drop-shadow-lg'
                      />
                                      
                      <p className='text-left font-bold text-2xl md:text-4xl capitalize'>Check your email</p>
                      <p className='text-zinc-500'>We just mail you with the verification code</p>
                      <input
                          name="code"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          type="text"
                          className='shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          placeholder='Type the code...'  
                      />
                      <Button
                          type='button'
                          className='bg-green-panda text-white font-bold py-2 px-4 rounded-lg w-2/3 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-700 duration-300'
                          onClick={  () => handleSignUpConfirmation(onClose) }
                      >
                            Verify Account
                      </Button>
                  </div>
                    
                </ModalBody>
                <ModalFooter>
                  
                </ModalFooter>
              </>
            )}
          </ModalContent>
      </Modal> 
  )
}

export default VerificationCodeModal