"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import { updateUserAttributes, fetchUserAttributes } from "aws-amplify/auth";
import { toast } from 'react-toastify';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { updateRol } from "@/graphql/users/mutation/users";
import { getUserIdByCognitoID } from "@/graphql/custom-queries";
import { client } from "@/contexts/AmplifyContext";
import { SideBar, UserProfile, UserInformation, CustomerContent, TechnicianContent } from '@/components/userContent/index'
const Page = () => {
    const { isOpen: isCustomModalOpen, onOpen: onCustomModalOpen, onOpenChange: onOpenCustomModalChange } = useDisclosure();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const retrieveOneUser = async () => {
        setLoading(true);
        try {
            const info = await fetchUserAttributes();
            const { data } = await client.graphql({
                query: getUserIdByCognitoID,
                variables: {
                    cognitoId: info.sub,
                },
            });
            const userId = data.listUsers.items[0].id;
            await setUser({ ...info, id: userId });
            setLoading(false);

        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }
    useEffect(() => { retrieveOneUser(); }, []);
    useEffect(() => {
        if (user && !user['custom:role']) {
            handleUserSelected(user);
        }
    }, [user]);
    const handleUserSelected = (user) => {
        onCustomModalOpen(true);
        setUser(user);
    }
    return (
        <div className="w-full h-screen relative">
            <CustomModal isOpen={isCustomModalOpen} onOpenChange={onOpenCustomModalChange} user={user} callback={retrieveOneUser} />
            <img
                src="https://autenticos4x4.com/wp-content/uploads/2019/03/taller-mecanico-reparacion-vehiculos.jpg"
                className="absolute w-full h-full object-cover bg-center"
                loading="eager"
                alt="background_user"
            />
            <div className="absolute w-full h-full bg-zinc-700 opacity-80" />
            {loading ? (<div>Loading Information</div>) : error ? (<div>{error}</div>) : user &&
                (
                    <div className="w-full h-full flex flex-col md:flex-row justify-center items-center gap-10 px-4 md:px-0 py-4 md:py-0">
                        <UserInformation user={user} />
                        { 
                            user['custom:role'] === "technician" 
                                ?  <TechnicianContent user={user} retrieveOneUser={retrieveOneUser}/>
                                :  <CustomerContent user={user} retrieveOneUser={retrieveOneUser}/>
                        }
                        <SideBar user={user} />
                    </div>
                )
            }
            
        </div>
    );
};

const CustomModal = ({ isOpen, onOpenChange, user, callback }) => {

    const onHandleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            if (!user) return;
            await client.graphql({
                query: updateRol,
                variables: {
                    email: user.email,
                    input: {
                        id: user.dbId,
                        rol: values.rol,
                        subscription: values.rol === "technician" ? "pending" : "",
                    }
                }
            })
            onOpenChange(false);
            await updateCustomRol(values.rol);
            callback();
            toast.success("Updated successfully.");

        } catch (error) {
            toast.error(`Error during the process.`);
        }
    };
    const updateCustomRol = async (rol) => {
        try {
            await updateUserAttributes({
                userAttributes: {
                    'custom:role': rol,
                    'custom:subscription': rol === "technician" ? "pending" : "",
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {
                user && (

                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                        hideCloseButton={true}
                        classNames={{
                            backdrop: 'bg-[#292f46]/50 backdrop-opacity-40'
                        }}
                    >
                        <ModalContent>
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-center">¡Attention!</ModalHeader>
                                <ModalBody>
                                    <p className="tracking-widest text-justify">
                                        You have to complete your general information to use our app. (obligatory)
                                    </p>
                                    <p className="tracking-widest text-justify">
                                        Please, select the type of user you are going to be in our application.
                                    </p>
                                </ModalBody>
                                <ModalBody>
                                    <Formik
                                        initialValues={{
                                            rol: 'customer'
                                        }}
                                        onSubmit={onHandleSubmit}
                                    >
                                        {({ handleSubmit }) => (
                                            <Form onSubmit={handleSubmit} className="flex flex-col gap-8">
                                                <Field
                                                    as="select"
                                                    name="rol"
                                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none"
                                                >
                                                    <option value="customer">Customer</option>
                                                    <option value="technician">Technician</option>
                                                </Field>

                                                <button
                                                    type="submit"
                                                    className="bg-green-panda hover:bg-green-400 text-white font-bold py-2 px-4 rounded transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                                                >
                                                    Update
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>
                                </ModalBody>
                            </>
                        </ModalContent>
                    </Modal>
                )
            }
        </>
    );
};

export default Page;