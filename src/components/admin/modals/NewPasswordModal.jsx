'use client';
import React, { useState } from 'react';
import { confirmSignIn } from 'aws-amplify/auth';
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import {
    Modal, ModalHeader, ModalFooter, ModalContent, ModalBody, Button,
    Spinner,
} from "@nextui-org/react";
const NewPasswordModal = ({ isOpen, onOpenChange }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const onHandleSubmit = async(values, { resetForm }) =>{
        setLoading(true);
        try {
            await confirmSignIn({ challengeResponse: values.newPassword });
            resetForm();
            toast.success('Password changed successfully.');
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error('something went wrong.')
            setError(error);
            setLoading(false);
        }
    }
    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[\^$*.[\]{}()?\-!"@#%&/,><':;|_~`+=\\]/, 'Password must contain at least one special character')
            .required('New Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });
    return (
        <Modal
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="xl"
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            hideCloseButton={true}
        >
                <ModalContent className='bg-zinc-800 text-zinc-200'>
                    {() => (
                        <>
                            <ModalHeader className="flex justify-center items-center">
                                <p className="text-center tracking-wider">Confirm Password</p>
                            </ModalHeader>
                            <ModalBody>
                                <p className='tracking-wider'>You need to use a new password to signIn into the Administrator Panel</p>
                                <div className={`flex flex-col lg:flex-row gap-8 justify-center w-full`}>
                                    
                                    <Formik
                                        initialValues={{
                                            newPassword: '',
                                            confirmPassword: ''
                                        }}
                                        validationSchema={validationSchema}
                                        validateOnChange={false}
                                        onSubmit={onHandleSubmit}
                                    >
                                        {({ handleSubmit, isValid, errors, touched }) => (
                                            <Form
                                                onSubmit={handleSubmit}
                                                className="flex flex-col gap-4 justify-center items-center w-full"
                                            >
                                                <div className="w-full">
                                                    <label
                                                        className="block text-gray-200 text-md font-bold mb-2 tracking-widest"
                                                        htmlFor="newPassword"
                                                    >
                                                        New Password
                                                    </label>
                                                    <Field
                                                        className="bg-zinc-700 shadow appearance-none rounded-xl h-[40px] py-2 px-3 text-zinc-200 leading-tight focus:outline-none focus:shadow-outline w-full dark:bg-zinc-800 dark:border-none"
                                                        type="password"
                                                        id="newPassword"
                                                        name="newPassword"
                                                    />
                                                    {errors.newPassword && touched.newPassword ? (
                                                        <div className="text-red-500 text-sm">{errors.newPassword}</div>
                                                    ) : null}
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="block text-gray-200 text-md font-bold mb-2 tracking-widest"
                                                        htmlFor="confirmPassword"
                                                    >
                                                        Confirm Password
                                                    </label>
                                                    <Field
                                                        className="bg-zinc-700 shadow appearance-none rounded-xl h-[40px] py-2 px-3 text-zinc-200 leading-tight focus:outline-none focus:shadow-outline w-full dark:bg-zinc-800 dark:border-none"
                                                        type="password"
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                    />
                                                    {errors.confirmPassword && touched.confirmPassword ? (
                                                        <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
                                                    ) : null}
                                                </div>
                                                <div className="w-full">
                                                    {loading ? (
                                                        <div className='flex justify-center items-center'>
                                                            <Spinner color="success" labelColor="success"/>
                                                        </div>
                                                    ) :(
                                                        <Button
                                                            type="submit"
                                                            className={`${isValid ? 'bg-[#40C48E]' : 'bg-zinc-500'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full tracking-widest`}
                                                            disabled={!isValid}
                                                        >
                                                            Set New Password
                                                        </Button>
                                                    )}
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
    )
}

export default NewPasswordModal