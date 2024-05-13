"use client"

import React, {useState, useEffect, useContext, createContext } from 'react'
import UserSidebar from '@/components/userComponents/userSideBar/UserSideBar'
import { client } from "@/contexts/AmplifyContext";
import { getUserIdByCognitoID } from "@/graphql/custom-queries";
// import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import { updateRol } from "@/graphql/users/mutation/users";
import { updateUserAttributes, fetchUserAttributes } from "aws-amplify/auth";
import UserNavBar from '@/components/userComponents/userNavBar/UserNavBar';

export const Contexto = createContext();

const UserLayout = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(null)

    const handleChangeStatus = async() => {
        try {
          const attributes = await updateUserAttributes({
            userAttributes: {
              ["custom:isOnline"]: isOnline ? "false" : "true",
            },
          });
          setIsOnline(!isOnline);
        } catch (error) {
          console.log(error)
        }
    }

    const retrieveOneUser = async () => {
        setLoading(true);
        try {
            const userInfo = await fetchUserAttributes();
            setUser({ ...userInfo });
            console.log("Este es el coos del tecnico",userInfo.sub);
            setIsOnline(userInfo["custom:isOnline"] === "true" ? true : false);
            setLoading(false);
    
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }
    useEffect(() => { retrieveOneUser(); }, []);

    return (
            <div className='w-full h-screen bg-zinc-900'>
                {/* <CustomModal isOpen={isCustomModalOpen} onOpenChange={onOpenCustomModalChange} user={user} callback={retrieveOneUser} /> */}
                {loading ? (<div className='text-white'></div>) : user &&
                    (
                        <div className="w-full h-full flex justify-center items-center p-0">
                            <UserSidebar user={user}/>
                            <div className='flex-1 flex flex-col h-screen'>
                                <UserNavBar user={user} isOnline={isOnline} handleChangeStatus={handleChangeStatus}/>
                                <Contexto.Provider value={{ user, loading, isOnline, handleChangeStatus, retrieveOneUser }}>
                                    {children}
                                </Contexto.Provider>
                            </div>
                        </div>
                    )
                }          
            </div>
    )
}

export default UserLayout;


// const CustomModal = ({ isOpen, onOpenChange, user, callback }) => {

//     const onHandleSubmit = async (values, { setSubmitting }) => {
//         setSubmitting(true);
//         try {
//             if (!user) return;
//             await client.graphql({
//                 query: updateRol,
//                 variables: {
//                     email: user.email,
//                     input: {
//                         id: user.dbId,
//                         rol: values.rol,
//                         subscription: values.rol === "technician" ? "pending" : "",
//                     }
//                 }
//             })
//             onOpenChange(false);
//             await updateCustomRol(values.rol);
//             callback();
//             toast.success("Updated successfully.");

//         } catch (error) {
//             toast.error(`Error during the process.`);
//         }
//     };
//     const updateCustomRol = async (rol) => {
//         try {
//             await updateUserAttributes({
//                 userAttributes: {
//                     'custom:role': rol,
//                     'custom:subscription': rol === "technician" ? "pending" : "",
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     return (
//         <>
//             {
//                 user && (
//                     <Modal
//                         isOpen={isOpen}
//                         onOpenChange={onOpenChange}
//                         isDismissable={false}
//                         isKeyboardDismissDisabled={true}
//                         hideCloseButton={true}
//                         classNames={{
//                             backdrop: 'bg-[#292f46]/50 backdrop-opacity-40'
//                         }}
//                     >
//                         <ModalContent>
//                             <>
//                                 <ModalHeader className="flex flex-col gap-1 text-center">¡Attention!</ModalHeader>
//                                 <ModalBody>
//                                     <p className="tracking-widest text-justify">
//                                         You have to complete your general information to use our app. (obligatory)
//                                     </p>
//                                     <p className="tracking-widest text-justify">
//                                         Please, select the type of user you are going to be in our application.
//                                     </p>
//                                 </ModalBody>
//                                 <ModalBody>
//                                     <Formik
//                                         initialValues={{
//                                             rol: 'customer'
//                                         }}
//                                         onSubmit={onHandleSubmit}
//                                     >
//                                         {({ handleSubmit }) => (
//                                             <Form onSubmit={handleSubmit} className="flex flex-col gap-8">
//                                                 <Field
//                                                     as="select"
//                                                     name="rol"
//                                                     className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none"
//                                                 >
//                                                     <option value="customer">Customer</option>
//                                                     <option value="technician">Technician</option>
//                                                 </Field>

//                                                 <button
//                                                     type="submit"
//                                                     className="bg-green-panda hover:bg-green-400 text-white font-bold py-2 px-4 rounded transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
//                                                 >
//                                                     Update
//                                                 </button>
//                                             </Form>
//                                         )}
//                                     </Formik>
//                                 </ModalBody>
//                             </>
//                         </ModalContent>
//                     </Modal>
//                 )
//             }
//         </>
//     );
// };