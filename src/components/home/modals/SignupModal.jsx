import React from 'react';
import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import Link from 'next/link';
import Image from 'next/image';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { handleCreateCustomerOnDataBase, handleCreateTechnicianOnDataBase } from '@/api';
import { signUp } from 'aws-amplify/auth';
export const SignupModal = ({ isOpen, onOpenChange, onOpen, setDataSignIn, onOpenVerifyModal, setResultData, user }) => {
    const SignupSchema = Yup.object().shape({
        fullName: Yup.string().required('Full name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        privacyAccepted: Yup.boolean().oneOf([true], 'You must accept the privacy policy'),
        termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
    });
    const onCreateCustomerToDB = async (userId, values, isAdded) => {
        try {
            const { createCustomer } = await handleCreateCustomerOnDataBase({
                id: userId,
                fullName: values.fullName,
                email: values.email,
                status: "active",
            }, isAdded);
            return createCustomer;
        } catch (error) {
            console.error(error);
        }
    }
    const onCreateTechnicianToDB = async (userId, values, isAdded) => {
        try {
          const { createTechnician } = await handleCreateTechnicianOnDataBase({
            id: userId,
            fullName: values.fullName,
            email: values.email,
            status: "active"
          }, isAdded);
          return createTechnician;
        } catch (error) {
          console.error(error);
        }
      }
    const onHandleSignup = async (values) => {
        try {
            const { userId, nextStep } = await signUp({
                username: values.email,
                password: values.password,
                options: {
                    userAttributes: {
                        email: values.email,
                        "custom:role": user,
                        "custom:fullName": values.fullName,
                        "custom:status": "active",
                        "custom:termsAccepted": values.privacyAccepted && values.termsAccepted ? "true" : "false",
                        "custom:profileCompleted": "false"
                    },
                },
            });
            let isAdded = true;
            let returnedData;
            const dataObject = {
                fullName: values.fullName,
                email: values.email
            }
            setDataSignIn({
                email: values.email,
                password: values.password
            });
            switch (user) {
                case 'customer':
                    returnedData = await onCreateCustomerToDB(userId, dataObject, isAdded);
                    setResultData({...returnedData})
                    break;
      
                case 'technician':
                  returnedData = await onCreateTechnicianToDB(userId, values, isAdded);
                  setResultData({...returnedData})
                  break;
      
                default:
                  return;
            }
            
            if (nextStep?.signUpStep === "CONFIRM_SIGN_UP") {
                onOpen(false);
                onOpenVerifyModal(true);
            }
        } catch (error) {
            toast.error('Something went wrong.');
            console.error(error);
        }
    }
    return (
        <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size='xl'>
            <ModalContent className='h-[80vh] bg-zinc-900 overflow-y-scroll' style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                {() => (
                    <>
                        <ModalHeader className='w-full'>
                            <p className='text-center w-full text-2xl text-[#E6D5C9] tracking-widest capitalize'>Signup as {user}</p>
                        </ModalHeader>
                        <ModalBody>
                            <Image src={'/panda.webp'} width={150} height={150} alt='Panda_Logo_Web' className='mx-auto' />
                            <Formik
                                initialValues={{
                                    fullName: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: '',
                                    privacyAccepted: false,
                                    termsAccepted: false,
                                }}
                                onSubmit={onHandleSignup}
                                validationSchema={SignupSchema}
                                validateOnChange={false}
                            >
                                {({ handleSubmit, errors, isValid }) => (
                                    <Form
                                        onSubmit={handleSubmit}
                                        className='flex flex-row w-full gap-6 flex-wrap text-[#E6D5C9]'
                                    >
                                        <div className='flex flex-col gap-4 w-full'>
                                            <label htmlFor="email">
                                                Email *
                                            </label>
                                            <Field
                                                type="email"
                                                name="email"
                                                className={`text-[#E6D5C9] shadow appearance-none bg-zinc-800 ${errors.email && 'border border-rose-600'} bg-transparent rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
                                            />
                                        </div>
                                        <ErrorMessage name="email" component={() => (<div className="text-red-600">{errors.email}</div>)} />
                                        <div className='flex flex-col gap-4 w-full'>
                                            <label htmlFor="email">
                                                Fullname *
                                            </label>
                                            <Field
                                                type="text"
                                                name="fullName"
                                                className={`text-[#E6D5C9] shadow appearance-none bg-zinc-800 ${errors.fullName && 'border border-rose-600'} bg-transparent rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
                                            />
                                            <ErrorMessage name="fullName" component={() => (<div className="text-red-600">{errors.fullName}</div>)} />
                                        </div>
                                        <div className='flex flex-col xl:flex-row gap-2 w-full'>
                                            <div className='flex flex-col gap-4 w-full'>
                                                <label htmlFor="password">
                                                    password *
                                                </label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    className={`text-[#E6D5C9] shadow appearance-none bg-zinc-800 ${errors.password && 'border border-rose-600'} bg-transparent rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
                                                />
                                                <ErrorMessage name="password" component={() => (<div className="text-red-600">{errors.password}</div>)} />
                                            </div>
                                            <div className='flex flex-col gap-4 w-full'>
                                                <label htmlFor="password">
                                                    Confirm Password *
                                                </label>
                                                <Field
                                                    type="password"
                                                    name="confirmPassword"
                                                    className={`text-[#E6D5C9] shadow appearance-none bg-zinc-800 ${errors.confirmPassword && 'border border-rose-600'} bg-transparent rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
                                                />
                                                <ErrorMessage name="confirmPassword" component={() => (<div className="text-red-600">{errors.confirmPassword}</div>)} />
                                            </div>
                                        </div>
                                        <div className='flex flex-row gap-3'>
                                            <Field type="checkbox" name="privacyAccepted" />
                                            <p>Yes, I agree to the {`Panda's`} <Link href={'/politics/privacy'} className='text-[#40C48E]' rel="noopener noreferrer" target="_blank">Privacy Policy</Link></p>
                                        </div>
                                        <ErrorMessage name="privacyAccepted" component={() => (<div className="text-red-600 text-xs">{errors.privacyAccepted}</div>)} />
                                        <div className='flex flex-row gap-3'>
                                            <Field type="checkbox" name="termsAccepted" />
                                            <p>Yes, I agree to the {`Panda's`} <Link href={'/politics/terms'} className='text-[#40C48E]' rel="noopener noreferrer" target="_blank">Terms & Conditions</Link></p>
                                        </div>
                                        <ErrorMessage name="termsAccepted" component={() => (<div className="text-red-600 text-xs">{errors.termsAccepted}</div>)} />
                                        <Button disabled={!isValid} type='submit' color='success' className={`w-full text-white font-semibold tracking-widest ${!isValid && 'bg-zinc-400'}`}>
                                            Signup
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
