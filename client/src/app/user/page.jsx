"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { uploadData } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { FaCamera } from "react-icons/fa6";
import { statesUSA } from '@/assets/data/StatesUSA';
import { getUser } from "@/graphql/users/query";
import { client } from "../page";
import { getUrl } from 'aws-amplify/storage';
import { updateInformation } from "@/graphql/users/mutation/users";
const page = () => {
    const [photograph, setPhotograph] = useState(null);
    const [picture, setPicture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const retrieveOneUser = async() => {
        setLoading(true);
        try {
            
            const { data } = await client.graphql({
                query: getUser,
                variables: {
                    id: "77405e7b-e42f-44f1-ae0e-d5332a863236",
                },
                
            });

            const pic = await getUrl({ key: 'user-profile-pictures/8d6aa1b3-2e29-46c7-a56b-1540f37872e0.jpg' });

            setPicture(pic.url.href);
            console.log(pic.url.href)

            await setUser(data.getUser);
            setLoading(false);
            console.log(data);

        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }
    }

    useEffect(() => { retrieveOneUser();  }, []);    

    function dataURLtoBlob(dataURL) {
        if (!dataURL) {
          return null;
        }
        var parts = dataURL.split(';base64,');
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);
        for (var i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], { type: contentType });
    }
    
    function handleChangePhotograph(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPhotograph(reader.result);
            handleUpdatePicture(dataURLtoBlob(reader.result));
          };
          reader.readAsDataURL(file);
        }
    }
    
    
    const handleUpdatePicture = async(picture) => {
    
        const uniqueId = uuidv4();
        const filename = `user-profile-pictures/${uniqueId}.jpg`;
        try {
            const result = await uploadData({
                key: filename,
                data: picture,
                options: {
                    contentType: "image/png",
                    onProgress: ({ transferredBytes, totalBytes }) => {
                        if (totalBytes) {
                          console.log(
                            `Upload progress ${
                              Math.round((transferredBytes / totalBytes) * 100)
                            } %`
                          );
                        }
                    }
                }
            }).result;
            console.log('Succeeded: ',result);
        } catch (error) {
            console.log(`Error from here : ${ error }`);
        }
    
    }

    const onHandleSubmit = async(values, { setSubmitting }) => {

        setSubmitting(true);

        try {

            await client.graphql({
                query: updateInformation,
                variables: {
                    email: values.email,
                    input: {
                        id: user.id,
                        ...values
                    }
                }
            })

            toast.success("Updated successfully.");

        } catch (error) {
            toast.error(`Error during the process.`);
        }

    }

    return (
        <div className="w-full h-screen relative">
            <img
                src="https://autenticos4x4.com/wp-content/uploads/2019/03/taller-mecanico-reparacion-vehiculos.jpg"
                alt="background_user"
                className="absolute w-full h-full object-cover bg-center"
                loading="eager"
            />
            <div className="absolute w-full h-full bg-gray-600 opacity-80" />
            {
                loading ? (<div>Loading Information</div>) : error ? (<div>{error}</div>) : user &&
                (
                    <div className="absolute w-full h-full flex flex-col md:flex-row justify-center items-center gap-10 px-4 md:px-0 py-4 md:py-0">
                        <div className="w-full overflow-y-auto md:w-2/4 bg-white rounded-lg shadow-lg p-4 h-3/4 relative order-1">
                            <Formik
                                initialValues={{
                                    fullName: user.fullName || '',
                                    email: user.email || '',
                                    address: user.address || '',
                                    city: user.city || '',
                                    state: user.state || '',
                                    zipCode: user.zipCode || 0,
                                    contactNumber: user.contactNumber || 0,
                                }}
                                validationSchema={formSchema}
                                validateOnChange={false}
                                onSubmit={onHandleSubmit}
                            >
                                {({ errors, isValid }) => {
                                    return(
                                        <Form
                                            className="w-full h-full flex flex-col gap-7"
                                            autoComplete="off"
                                        >
                                            <p className="text-xl text-[#40C48E] font-bold my-4">
                                                General Information
                                            </p>
                                            <div className="flex flex-col md:flex-row w-full gap-7 md:gap-12">
                                                <div className="w-full md:w-2/4">
                                                    <label
                                                        htmlFor="grid-fullName"
                                                        className="block text-gray-700 text-sm font-bold mb-2"
                                                    >
                                                    Full Name
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="fullName"
                                                        className={`block appearance-none w-full bg-gray-200 border ${errors.fullName ? 'border-red-600' : 'border-gray-200'} text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                                        id="grid-fullName"
                                                    />
                                                    <ErrorMessage name="fullName" component={() => (<div className="text-red-600">{errors.fullName}</div>)} />
                                                </div>
                                                <div className="w-full md:w-2/4">
                                                    <label
                                                        htmlFor="grid-email"
                                                        className="block text-gray-700 text-sm font-bold mb-2"
                                                    >
                                                    Email
                                                    </label>
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        disabled
                                                        className={`block appearance-none w-full bg-gray-200 border ${errors.email ? 'border-red-600' : 'border-gray-200'} text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                                    />
                                                    <ErrorMessage name="email" component={() => (<div className="text-red-600">{errors.email}</div>)} />
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:flex-row w-full gap-7 md:gap-12">
                                                <div className="w-full md:w-2/4 md:mb-0">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="states"
                                                    >
                                                    State
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="state"
                                                        className={`block appearance-none w-full bg-gray-200 border ${errors.state ? 'border-red-600' : 'border-gray-200'} text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                                    >
                                                        {statesUSA.map((estado, index) => (
                                                            <option key={index} value={estado}>
                                                                {estado}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="state" component={() => (<div className="text-red-600">{errors.state}</div>)} />
                                                </div>
                                                <div className="w-full md:w-2/4 md:mb-0">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="grid-city"
                                                    >
                                                    Address
                                                    </label>
                                                    <Field
                                                        className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.address ? 'border-red-600' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                                        type="text"
                                                        placeholder="address"
                                                        name="address"
                                                    />
                                                    <ErrorMessage name="address" component={() => (<div className="text-red-600">{errors.address}</div>)} />
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:flex-row w-full gap-7 md:gap-12">
                                                <div className="w-full md:w-2/4 md:mb-0">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="grid-zip"
                                                    >
                                                        Zip
                                                    </label>
                                                    <Field
                                                        className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.zipCode ? 'border-red-600' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                                        id="grid-zip"
                                                        type="number"
                                                        placeholder="90210"
                                                        name="zipCode"
                                                    />
                                                    <ErrorMessage name="zipCode" component={() => (<div className="text-red-600">{errors.zipCode}</div>)} />
                                                </div>
                                                <div className="w-full md:w-2/4 md:mb-0">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="grid-city"
                                                    >
                                                        City
                                                    </label>
                                                    <Field
                                                        className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.city ? 'border-red-600' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                                        id="grid-city"
                                                        type="text"
                                                        placeholder="Miami"
                                                        name="city"
                                                    />
                                                    <ErrorMessage name="city" component={() => (<div className="text-red-600">{errors.city}</div>)} />
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:flex-row w-full gap-7 md:gap-12">
                                                <div className="w-full md:w-2/4 md:mb-0">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        htmlFor="grid-contactNumber"
                                                    >
                                                    Contact Number
                                                    </label>
                                                    <Field
                                                        className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.contectNumber ? 'border-red-600' : 'border-gray-200'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                                        id="grid-contactNumber"
                                                        type="text"
                                                        placeholder="90210"
                                                        name="contactNumber"
                                                    />
                                                    <ErrorMessage name="contactNumber" component={() => (<div className="text-red-600">{errors.contactNumber}</div>)} />
                                                </div>
                                            </div>
                                            <div className="w-full pb-5">
                                                <button
                                                    type="submit"
                                                    disabled={!isValid}
                                                    className={`${ !isValid ? 'bg-gray-200' : 'bg-green-panda' } p-3 rounded-lg text-white font-bold w-full transition-all`}
                                                >
                                                    Update Information
                                                </button>
                                            </div>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                        
                        <div className="bg-white rounded-lg shadow-lg p-4 w-full h-2/5 md:w-2/12 md:h-3/4 relative">
                            <div className="flex flex-row md:flex-col gap-6 items-center justify-center mb-10">
                                <div className="relative w-[6rem] h-[6rem] md:w-[12rem] md:h-[12rem] overflow-hidden rounded-full shadow-md group">
                                    <div className="absolute bg-black group-hover:opacity-60 opacity-0 w-full h-full transition-all">
                                        <div className="flex justify-center items-center h-full">
                                        <FaCamera className="text-white text-xl md:text-4xl" />
                                        </div>
                                    </div>
                                    <img
                                        src={picture}
                                        className="rounded-full w-[6rem] h-[6rem] md:w-[12rem] md:h-[12rem] cursor-pointer "
                                        alt="Fotografía de perfil"
                                    />
                                    <input
                                        id="file-upload"
                                        type="file"
                                        name=""
                                        accept="image/gif, image/jpeg, image/png"
                                        className="absolute top-0 right-0 min-w-full min-h-full opacity-0 cursor-pointer bg-center object-cover object-center"
                                        onChange={(event) => {
                                            handleChangePhotograph(event);
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col justify-center items-center gap-5 my-6">
                                    <strong>{user.fullName}</strong>
                                    <p>{user.email}</p>
                                    <div className="flex gap-1">
                                        <strong>Subscription: </strong>
                                        <p className="text-[#40C48E]">{user.subscription}</p>
                                        <span className="text-sky-500 font-bold cursor-pointer">
                                        {" "}
                                        update
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        <strong>Status: </strong><span className="text-[#40C48E]">{user.status}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 -left-0 w-full">
                                <div className="flex flex-col">
                                <Link
                                    href={`/`}
                                    className="rounded-b-lg bg-green-panda h-[2.5rem] md:h-[3.5rem] font-bold text-white flex justify-center items-center"
                                >
                                    Sign Out
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

const formSchema = Yup.object().shape({
    fullName: Yup.string().required('Required').max(50),
    email: Yup.string().email().required('Required'),
    city: Yup.string().required('Required'),
    state:  Yup.string().required('Required'),
    zipCode: Yup.number().required('Required').positive().integer(),
    contactNumber: Yup.number().required('Required').positive().integer()
  });

export default page;