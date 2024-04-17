'use client';
import React from 'react';
import { updatePassword } from 'aws-amplify/auth';
import * as Yup from 'yup';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { ErrorMessage, Field, Form, Formik } from 'formik';
const ChagePasswordModal = ({ isOpen, onOpenChange }) => {
    const onChangePasswordHandle = async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true);
        try {
            const oldPassword = values.oldPassword;
            const newPassword = values.newPassword;
            if (newPassword === confirmPassword) {
                await updatePassword({ oldPassword, newPassword });
                toast.success('Password changed succesfully :D');
                resetForm();
            } else {
                console.log('not equals')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex justify-center items-center">
                            <p>Change my password</p>
                        </ModalHeader>
                        <ModalBody className="flex flex-col justify-center">
                            <p>
                                You are about to change your password. Make sure to use a new more secure one.
                            </p>
                            <Formik
                                initialValues={{
                                    oldPassword: '',
                                    newPassword: '',
                                    confirmPassword: '',
                                }}
                                validationSchema={formSchema}
                                onSubmit={onChangePasswordHandle}
                                validateOnChange={true}
                            >
                                {({ handleSubmit, errors, isValid }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div className='my-2'>
                                            <label htmlFor="oldPassword">
                                                Old Password
                                            </label>
                                            <Field
                                                type="password"
                                                className={`shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                                name='oldPassword'
                                            />
                                            <ErrorMessage name="oldPassword" component={() => (<div className="text-red-600">{errors.oldPassword}</div>)} />
                                        </div>
                                        <div className='my-2'>
                                            <label htmlFor="ConfirmPassword">
                                                New Password
                                            </label>
                                            <Field
                                                type="password"
                                                className={`shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                                name="newPassword"
                                            />
                                            <ErrorMessage name="newPassword" component={() => (<div className="text-red-600">{errors.newPassword}</div>)} />
                                        </div>
                                        <div className='my-2'>
                                            <label htmlFor="ConfirmPassword">
                                                Confirm your new password
                                            </label>
                                            <Field
                                                type="password"
                                                className={`shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                                name='confirmPassword'
                                            />
                                            <ErrorMessage name="confirmPassword" component={() => (<div className="text-red-600">{errors.confirmPassword}</div>)} />
                                        </div>
                                        <button
                                            type=''
                                            disabled={!isValid}
                                            className={`bg-green-panda px-4 py-2 w-full rounded text-white ${!isValid && 'bg-opacity-50 cursor-not-allowed'}`}
                                        >
                                            Change
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

const formSchema = Yup.object().shape({
    oldPassword: Yup.string().required(),
    newPassword: Yup.string().required('Obligatory')
        .matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
            'New password must contain at least one capital letter, one number, and one special character.'
        ),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('newPassword'), null], 'Both password must coincide.')
});

export default ChagePasswordModal;