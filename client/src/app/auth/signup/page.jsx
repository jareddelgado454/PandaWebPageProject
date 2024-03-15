'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { signInWithRedirect, signUp } from "aws-amplify/auth";
import { RiGoogleFill, RiAppleFill, RiFacebookCircleFill } from "react-icons/ri";
import VerificationCodeModal from '@/components/LoginRegister/modals/VerificationCodeModal';
import { useDisclosure } from "@nextui-org/react";
import { createUser } from '@/graphql/users/mutation/users';
import { client } from '@/app/contexts/AmplifyContext';
const SignUp = () => {
    const [email, setEmail] = useState("");
    let initialValue = {
        fullName: "",
        email : "",
        password : "",
        confirmPassword: "",
        rol : "customer",
        agreed : false
    }
    const {isOpen: isVerifyCodeModalOpen, onOpen: onVerifyCodeModalOpen, onOpenChange: onVerifyCodeModalOpenChange} = useDisclosure();

    const onHandleCreate = async (values) => {
        try {
            
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username : values.email,
                password : values.password,
                options : {
                    userAttributes : {
                        email : values.email,
                        'custom:role' : values.rol
                    },
                }
            });
            
            await handleCreateUserOnDatabase(values, userId);

            console.log("nextStep",nextStep);
            // if(nextStep?.signUpStep == "CONFIRM_SIGN_UP"){
            //     onVerifyCodeModalOpen();
            // }
        } catch (error) {
            if (error.message.includes('An account with the given email already exists.')) {
                alert('This email address is already registered. Please use a different email address.');
            } else {
                console.log("Unknown error occurred:", error);
            }
        }
    }
    const handleCreateUserOnDatabase = async(values, userId) => {
        try {

            await client.graphql({
                query: createUser,
                variables: {
                    input: {
                        email: values.email,
                        rol: values.rol,
                        fullName: values.fullName,
                        status: "active",
                        password: values.password,
                        cognitoId: userId
                    }
                },
                authMode: 'apiKey',
            });

            console.log("added");

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='w-full text-white flex justify-center items-center'>
            <div className='container px-4 md:px-0 mx-auto bg-zinc-800'>
                <div className='w-full'>
                    <div className=" border-transparent flex flex-col border-b-[2px] border-gray-600 mb-6 pb-4">
                        <p className="text-white mb-3">
                        Do you already have an account? <Link className="hover:text-emerald-400 text-emerald-300 text-[18px] font-bold hover:font-bold cursor-pointer" href="/auth/signin" >Login here</Link>
                        </p>
                    </div>
                    <div className='mb-3'>
                        <h2 className='text-[30px] font-bold'>SIGN-UP</h2>
                        <p>enter with your account</p>
                    </div>
                    <div className='w-full flex items-center justify-between'>
                        <button onClick={() => signInWithRedirect({ provider: "Google"})} className="w-[30%]  bg-zinc-900 hover:bg-zinc-700 hover:shadow-xl transition-colors delay-50  mb-2  hover:text-white text-white rounded-2xl flex gap-x-1 items-center justify-center py-3 px-5">
                            <RiGoogleFill className='text-[20px] text-red-400'/> Google
                        </button>   
                        <button onClick={() => signInWithRedirect({ provider: "Facebook"})} className="w-[30%] bg-zinc-900 hover:bg-zinc-700 hover:shadow-xl transition-colors delay-50 text-[15px]  mb-2  hover:text-white text-white rounded-2xl flex gap-x-1 items-center justify-center py-3 ">
                            <RiFacebookCircleFill  className='text-[20px] text-blue-400'/> Facebook
                        </button> 
                        <button onClick={() => signInWithRedirect({ provider: "Google"})} className="w-[30%] bg-zinc-900 hover:bg-zinc-700 hover:shadow-xl transition-colors delay-50  mb-2  hover:text-white text-white rounded-2xl flex gap-x-1 items-center justify-center py-3 px-5">
                            <RiAppleFill className='text-[20px]'/> Apple
                        </button> 
                    </div>
                </div>
                <Formik
                    initialValues={initialValue}
                    onSubmit={onHandleCreate}
                >
                    {({ handleSubmit, setFieldValue }) => (
                        <Form
                            onSubmit={handleSubmit}
                            className='flex flex-col md:flex-row gap-4 flex-nowrap my-10 '
                        >
                            <div className='w-full md:w-2/4 flex flex-col gap-4'>
                                <div className='w-full my-2'>
                                    <label htmlFor="name-grid">
                                        Full Name
                                    </label>
                                    <Field
                                        id="name-grid"
                                        type="text"
                                        name="fullName"
                                        className="my-2 py-3 pl-8 pr-4 bg-zinc-700 border-[1px] border-zinc-700 focus:border-emerald-500 w-full outline-none rounded-2xl mb-4"
                                    />
                                </div>
                                <div className='w-full my-2'>
                                    <label htmlFor="email-grid">
                                        Email
                                    </label>
                                    <Field
                                        id="email-grid"
                                        type="email"
                                        name="email"
                                        onChange={(e) => {
                                            setFieldValue("email", e.target.value);
                                            setEmail(e.target.value);
                                        }}
                                        className="my-2 py-3 pl-8 pr-4 bg-zinc-700 border-[1px] border-zinc-700 focus:border-emerald-500 w-full outline-none rounded-2xl mb-4"
                                    />
                                </div>
                                <div className='w-full my-2'>
                                    <label htmlFor="password-grid">
                                        Password
                                    </label>
                                    <Field
                                        id="password-grid"
                                        type="password"
                                        name="password"
                                        className="my-2 py-3 pl-8 pr-4 bg-zinc-700 border-[1px] border-zinc-700 focus:border-emerald-500 w-full outline-none rounded-2xl mb-4"
                                    />
                                </div>
                                <div className='w-full my-2'>
                                    <label htmlFor="confirm-password-grid">
                                        Confirm Password
                                    </label>
                                    <Field
                                        id="confirm-password-grid"
                                        type="password"
                                        name="confirmPassword"
                                        className="my-2 py-3 pl-8 pr-4 bg-zinc-700 border-[1px] border-zinc-700 focus:border-emerald-500 w-full outline-none rounded-2xl mb-4"
                                    />
                                </div>
                            </div>
                            <div className='w-full md:w-2/4 flex justify-center items-center'>
                                <div className='w-[450px] bg-zinc-700 p-5 rounded-md mb-6 pb-8'>
                                    <h2 className='text-4xl font-bold mb-3'>Account settings</h2>
                                    <p className='mb-1'>Choose your account type: <span className='text-red-400'>*</span></p>
                                    <Field
                                        as="select"
                                        id='rol-grid'
                                        name="rol"
                                        className='block w-full bg-zinc-800 text-white py-3 px-4 rounded-lg mb-2'
                                    >
                                        <option className='text-white' value='customer'>
                                            Customer
                                        </option>
                                        <option className='text-white' value='technician'>
                                            Technician
                                        </option>
                                    </Field>

                                    <p className='text-[12px] font-light text-gray-100'>
                                        <span className='text-[14px] font-bold text-white'>Customer account:</span>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                                    </p>

                                    <p className='text-[12px] font-light text-gray-100 mb-3'>
                                        <span className='text-[14px] font-bold text-white'>Technician account:</span>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                                    </p>

                                    <div className="flex items-center gap-x-2 mb-2">
                                        <Field
                                            type="radio"
                                            name="agreed"
                                            value="agreed"
                                            className="rounded border-emerald-400 focus:ring-emerald-400 focus:border-emerald-400"
                                        />
                                        <p className='text-white'>Check here to accept the <span className='text-emerald-300 cursor-pointer font-semibold'>Terms and conditions</span></p>
                                    </div>

                                    <button
                                        type="submit"
                                        className=' w-full py-3 text-[19px] bg-emerald-500 hover:bg-emerald-500/90 transition-colors rounded-lg text-white'
                                    >Create account</button>

                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <VerificationCodeModal isOpen={isVerifyCodeModalOpen} onOpenChange={onVerifyCodeModalOpenChange} username={email}/>
        </div>
    )
}

export default SignUp;
