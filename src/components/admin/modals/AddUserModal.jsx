'use client';
import React, { useState } from 'react';
import { Field, Form, Formik } from "formik";
import { signUp } from "aws-amplify/auth";
import { toast } from "react-toastify";
import {
    Modal, ModalHeader, ModalFooter, ModalContent, ModalBody, Button,
} from "@nextui-org/react";
import { handleCreateUserOnDatabase } from "@/api";
import { generateTempoPassword } from '@/utils/GenerateTempoPassword';
const AddUserModal = ({ isOpen, onOpenChange, callback }) => {
    const [isPassordGenerated, setIsPassordGenerated] = useState(false);

    const onHandleSubmit = async (values, { resetForm, setSubmitting }) => {

        setSubmitting(true);
        try {
            await handleCreateUserOnDatabase({
                fullName: values.fullName,
                email: values.email,
                status: values.status,
                temporaryPassword: values.temporaryPassword
            });
            setIsPassordGenerated(false);
            toast.success(`User ${values.fullName} has been created.`);
            resetForm(true);
            callback();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        }
    }

    const handleGeneratePassword = (setFieldValue) => {
        const passwordGenerated = generateTempoPassword();
        setFieldValue('temporaryPassword', passwordGenerated);
        setIsPassordGenerated(!isPassordGenerated);
    }

    return (
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex justify-center items-center">
                            <p className="text-center">Add New Administrator</p>
                        </ModalHeader>
                        <ModalBody className="">
                            <div className={`flex flex-col lg:flex-row gap-8 justify-center w-full`}>
                                <Formik
                                    initialValues={{
                                        fullName: '',
                                        email: '',
                                        temporaryPassword: '',
                                        status: 'inactive',
                                    }}
                                    validateOnChange={false}
                                    onSubmit={onHandleSubmit}
                                >
                                    {({ handleSubmit, setFieldValue, values }) => (
                                        <Form
                                            onSubmit={handleSubmit}
                                            className="flex flex-col gap-4 justify-center items-center w-full"
                                        >
                                            <div className="w-10/12">
                                                <label
                                                    className="block text-gray-700 dark:text-zinc-300 text-md font-bold mb-2 tracking-widest"
                                                    htmlFor="fullName"
                                                >
                                                    fullName
                                                </label>
                                                <Field
                                                    className="bg-zinc-100 shadow appearance-none border rounded-xl h-[40px] py-2 px-3 text-gray-700 dark:text-zinc-200 leading-tight focus:outline-none focus:shadow-outline w-full dark:bg-zinc-800 dark:border-none"
                                                    type="text"
                                                    id="fullName"
                                                    name="fullName"
                                                />
                                            </div>
                                            <div className="w-10/12">
                                                <label
                                                    className="block text-gray-700 dark:text-zinc-300 text-md font-bold mb-2 tracking-widest"
                                                    htmlFor="status"
                                                >
                                                    Status
                                                </label>
                                                <select
                                                    name="status"
                                                    onChange={({ target }) => setFieldValue("status", target.value)}
                                                    className="bg-zinc-100 shadow appearance-none border rounded-xl h-[40px] py-2 px-3 text-gray-700 dark:text-zinc-200 leading-tight focus:outline-none focus:shadow-outline w-full dark:bg-zinc-800 dark:border-none"
                                                    value={values.status}
                                                >
                                                    <option key={1} value="active">active</option>
                                                    <option key={2} value="inactive">inactive</option>
                                                </select>
                                            </div>
                                            <div className="w-10/12">
                                                <label
                                                    className="block text-gray-700 dark:text-zinc-300 text-md font-bold mb-2 tracking-widest"
                                                    htmlFor="Email"
                                                >
                                                    Email
                                                </label>
                                                <Field
                                                    className="bg-zinc-100 shadow appearance-none border rounded-xl h-[40px] w-full py-2 px-3 text-gray-700 dark:text-zinc-300  leading-tight focus:outline-none focus:shadow-outline dark:bg-zinc-800 dark:border-none"
                                                    type="email"
                                                    id="Email"
                                                    name="email"
                                                />
                                            </div>
                                            <div className="w-10/12">
                                                <label
                                                    className="block text-gray-700 dark:text-zinc-300 text-md font-bold mb-2 tracking-widest"
                                                    htmlFor="password"
                                                >
                                                    Password
                                                </label>
                                                {isPassordGenerated ? (
                                                    <Field
                                                        className="bg-zinc-100 shadow appearance-none border rounded-xl h-[40px] w-full py-2 px-3 text-gray-700 dark:text-zinc-300  leading-tight focus:outline-none focus:shadow-outline dark:bg-zinc-800 dark:border-none select-none"
                                                        type="text"
                                                        disabled
                                                        id="password"
                                                        name="temporaryPassword"
                                                    />
                                                ) : (
                                                    <Button
                                                        className='bg-sky-400 text-zinc-50 dark:text-zinc-100 dark:bg-sky-600 tracking-widest w-full font-semibold'
                                                        onClick={() => handleGeneratePassword(setFieldValue)}
                                                    >
                                                        Generate Temporary Passord
                                                    </Button>
                                                )}
                                            </div>
                                            
                                            <div className="w-10/12 ">

                                                <Button
                                                    type="submit"
                                                    className="bg-[#40C48E] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full tracking-widest"
                                                >
                                                    Create
                                                </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
export default AddUserModal;