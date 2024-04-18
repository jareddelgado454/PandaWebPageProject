import React from 'react';
import {Field, Form, Formik} from "formik";
import {signUp} from "aws-amplify/auth";
import {toast} from "react-toastify";
import {
    Modal, ModalHeader, ModalFooter, ModalContent, ModalBody, Button
} from "@nextui-org/react";
import {handleCreateUserOnDatabase} from "@/api";
const AddUserModal = ({ isOpen, onOpenChange }) => {

    const createUserInCognito = async(values) => {
        let isAdded = false;
        try {
            const signUpResponse = await signUp({
                username: values.email,
                password: values.password,
                options: {
                    userAttributes: {
                        email: values.email,
                        "custom:role": values.role,
                        "custom:fullName": values.fullName,
                        "custom:status": values.status
                    }
                }
            });
            isAdded = true;
            return { signUpResponse, isAdded };
        }catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        }

    }

    const onHandleSubmit = async(values, { resetForm, setSubmitting }) => {

        setSubmitting(true);
        try {
            const { signUpResponse } = await createUserInCognito(values);
            await handleCreateUserOnDatabase({
                fullName: values.fullName,
                email: values.email,
                password: values.password,
                role: values.role,
                status: values.status,
                cognitoId: signUpResponse.userId
            });

            toast.success(`User ${values.fullName} has been created.`);
            resetForm(true);

        }catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        }
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
                                       password: '',
                                       role: 'customer',
                                       status: 'active',
                                   }}
                                   validateOnChange={false}
                                   onSubmit={onHandleSubmit}
                               >
                                   {({ handleSubmit }) => (
                                       <Form
                                           onSubmit={handleSubmit}
                                           className="flex flex-col gap-4 justify-center items-center w-full"
                                       >
                                           <div className="w-10/12">
                                               <label
                                                   className="block text-gray-700 text-md font-bold mb-2"
                                                   htmlFor="fullName"
                                               >
                                                   fullName
                                               </label>
                                               <Field
                                                   className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                                                   type="text"
                                                   id="fullName"
                                                   name="fullName"
                                               />
                                           </div>
                                           <div className="w-10/12">
                                               <label
                                                   className="block text-gray-700 text-md font-bold mb-2"
                                                   htmlFor="Email"
                                               >
                                                   Email
                                               </label>
                                               <Field
                                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                   type="email"
                                                   id="Email"
                                                   name="email"
                                               />
                                           </div>
                                           <div className="w-10/12">
                                               <label
                                                   className="block text-gray-700 text-md font-bold mb-2"
                                                   htmlFor="password"
                                               >
                                                   Password
                                               </label>
                                               <Field
                                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight dark:text-white focus:outline-none focus:shadow-outline"
                                                   type="password"
                                                   id="password"
                                                   name="password"
                                               />
                                           </div>
                                           <div className="w-10/12">
                                               <label
                                                   className="block text-gray-700 text-md font-bold mb-2"
                                                   htmlFor="role"
                                               >
                                                   Role
                                               </label>
                                               <Field
                                                   id="role"
                                                   as="select"
                                                   name="role"
                                                   className="block appearance-none w-full border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none"
                                               >
                                                   <option value="customer">Customer</option>
                                                   <option value="technician">Technician</option>
                                                   <option value="admin">Administrator</option>
                                               </Field>
                                           </div>
                                           <div className="w-10/12 ">

                                               <Button
                                                   type="submit"
                                                   className="bg-[#40C48E] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
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