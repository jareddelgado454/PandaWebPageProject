import React, { useState, useEffect } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { confirmSignUp, signIn, resendSignUpCode, fetchAuthSession } from 'aws-amplify/auth';
import { RiErrorWarningFill,RiRestartLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const VerificationCodeModal = ({isOpen, onOpenChange, dataSignIn, roleSelected, resultData}) => {

  const [code, setCode] = useState("");
  const [errorCode, setErrorCode] = useState({
    status : false,
    message : ""
  });

  const [showResendButton, setShowResendButton] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const router = useRouter();

  useEffect(() => {
    let timer;
    if (!showResendButton && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (!showResendButton && countdown === 0) {
      setShowResendButton(true);
      setCountdown(60);
    }
    return () => clearTimeout(timer);
  }, [showResendButton, countdown]);

  const handleResendSignUpCode = async () => {
    console.log("Resending new signUp Code");
    setErrorCode({
      status : false,
      message : ""
    });
    try {
        const {destination,deliveryMedium,attributeName} = await resendSignUpCode({ username : dataSignIn.email }); 
        console.log(destination,deliveryMedium,attributeName);
        setShowResendButton(false);

    } catch (error) {
        if(error.name == "LimitExceededException"){
            setErrorCode({
              status : true,
              message : "Attempt limit exceeded, please try after some time."
            });
        }else{
            setErrorCode({
              status : true,
              message : "An error ocurred, please try after some time."
            });
        }
    }
  }

  const handleSignUpConfirmation = async (onClose) => {
    setErrorCode({
      status : false,
      message : ""
    })
    console.log(dataSignIn)
    if(code != ""){
        try {
          await confirmSignUp({
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
          setShowResendButton(true);
          setCode("");
          const { tokens } = await fetchAuthSession();
          const expiredAt = tokens.accessToken.payload.exp;
          Cookies.set(
            "currentUser",
            JSON.stringify({ ...resultData, expiredAt })
          );
          if(roleSelected === "technician"){
            router.replace("/user/");
          }else{
            router.replace("/customer/");
          }
          

          console.log(response);
          onClose();

        } catch (error) {
          if(error.name == "CodeMismatchException"){
              setErrorCode({
                  status : true,
                  message : "The verification code you provided is not correct, check again"
              })
          }else if (error.name == 'ExpiredCodeException') {
            setErrorCode({
              status: true,
              message: "The verification code you provided has expired. Please request a new code."
            });
          }else{
            setErrorCode({
              status: true,
              message: "Unknown error."
            });
            console.log(error)
          }
        }
    }else{
        setErrorCode({
            status : true,
            message : "You have not enter any code"
        })
    }
    console.log(code);
  }

  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} hideCloseButton={true}>
          <ModalContent className='bg-zinc-800 text-white border-[2px] border-gray-700 pb-4'>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                    <p>Verifying </p>
                </ModalHeader>
                <ModalBody className='w-full flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center justify-center'>
                      <img
                          src="/panda.png"
                          alt="panga_logo"
                          className='w-[150px] h-[120px] drop-shadow-lg mb-3'
                      />
                                      
                      <p className='text-left font-bold text-2xl md:text-4xl capitalize mb-3'>Check your email</p>
                      <p className='text-zinc-300'>We just mail you with the verification code to</p>
                      <p className='text-white font-bold mb-5'>{ dataSignIn?.email }</p>
                      {
                          errorCode.status && <div className='bg-red-500 w-full text-white text-[16px] flex items-center gap-x-2 p-2 mb-3'>
                              <RiErrorWarningFill className='text-[30px]'/>
                              <p>{errorCode.message}</p>
                          </div>
                      }
                      <input
                          name="code"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          type="text"
                          className='shadow bg-zinc-700 appearance-none rounded-lg w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline mb-4 text-[19px]'
                          placeholder='Type the code...'  
                      />
                      <Button
                          type='button'
                          className='bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors hover:bg-emerald-600 text-[16px] mb-2'
                          onClick={  () => handleSignUpConfirmation(onClose) }
                      >
                            Verify Account
                      </Button>
                      <div className='flex flex-col justify-center'>
                        <p className='text-[15px]  text-gray-200 mb-2'><span className='text-emerald-300'>*</span>You may find your verification code in your <span className='text-emerald-300'>inbox</span> or <span className='text-emerald-300'>spam</span></p>

                        {showResendButton ? (     
                            <button onClick={() => handleResendSignUpCode()} className='flex flex-gap-x-2 items-center justify-center text-emerald-300 hover:text-emerald-400 font-semibold text-[17px] transition-colors'>
                                <RiRestartLine className='text-[20px]'/>
                                <span className='cursor-pointer '>Resend code</span>
                            </button>
                        ) : (
                            <p className='w-full text-center text-white text-[18px] '>You can request a new code in <span className='text-emerald-300 font-semibold'>{countdown} seconds</span></p> 
                        )}
                      </div>
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