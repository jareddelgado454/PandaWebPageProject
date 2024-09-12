import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Spinner } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { fetchAuthSession, fetchUserAttributes, signIn, signInWithRedirect } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FaApple, FaFacebook } from 'react-icons/fa6';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { getCustomerById } from '@/api';
import { UserContext } from '@/contexts/user/UserContext';
export const SigninModal = ({ isOpen, onOpenChange, setDataSignIn, onOpenVerifyModal }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { login } = useContext(UserContext);
    const onHandleSignin = async (values) => {
        setLoading(true);
        try {
            const { nextStep } = await signIn({
                username: values.email,
                password: values.password,
                options: {
                    authFlowType: "USER_SRP_AUTH",
                },
            });
            setDataSignIn({
                email: values.email,
                password: values.password
            });
            if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
                onOpen(false);
                onOpenVerifyModal(true);
            }
        } catch (error) {
            toast.error('Something went wrong.');
            console.error(error);
            setLoading(false);
        }
    }
    const SignInSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required')
    });
    const currentAuthenticatedUser = async () => {
        try {
            const data = await fetchUserAttributes();
            const { tokens, userSub } = await fetchAuthSession();
            const expiredAt = tokens.accessToken.payload.exp;
            return { role: data['custom:role'], expiredAt, userSub };
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const hubListenerCancel = Hub.listen("auth", async ({ payload }) => {
            switch (payload.event) {
                case "signedIn":
                    const { role, expiredAt, userSub } = await currentAuthenticatedUser();
                    if (role === "customer") {
                        const data = await getCustomerById(userSub);
                        login({ role, expiredAt, id: userSub, ...data });
                        setLoading(false);
                        router.push("/customer");
                    }
                default:
                    break;
            }
        });
        return () => hubListenerCancel();
    }, [router, login]);
    return (
        <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size='xl'>
            <ModalContent className='bg-zinc-900' style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                {() => (
                    <>
                        <ModalHeader className='w-full'>
                            <p className='text-center w-full text-2xl text-[#E6D5C9] tracking-widest'>Signin as Customer</p>
                        </ModalHeader>
                        <ModalBody>
                            <Image src={'/panda.webp'} width={150} height={150} alt='Panda_Logo_Web' className='mx-auto' />
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: ''
                                }}
                                onSubmit={onHandleSignin}
                                validationSchema={SignInSchema}
                                validateOnChange
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
                                            <ErrorMessage name="email" component={() => (<div className="text-red-600">{errors.email}</div>)} />
                                        </div>
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
                                        {loading ? (
                                            <div className='flex justify-center items-center w-full h-full'>
                                                <Spinner color="success" />
                                            </div>
                                        ) : (
                                            <Button disabled={!isValid} type='submit' color='success' className={`w-full text-white font-semibold tracking-widest ${!isValid && 'bg-zinc-400'}`}>
                                                Signin
                                            </Button>
                                        )}

                                    </Form>
                                )}
                            </Formik>
                            {!loading && (
                                <>
                                    <div className='flex flex-col gap-4 justify-center items-center text-[#E6D5C9]'>
                                        <p className='text-xl tracking-widest'>or</p>
                                        <button type='button' onClick={() => signInWithRedirect({ provider: "Google" })} className='transition-all duration-250 ease-in-out bg-white hover:bg-zinc-600 hover:text-white rounded-xl py-2 w-[70%] flex justify-center items-center gap-3 text-black font-black'>
                                            <Image src={'/icons/googleIcon.png'} width={50} height={50} className='w-[1rem] h-[1rem]' alt='google_icon_signin' />
                                            Google
                                        </button>
                                        <button type='button' onClick={() => signInWithRedirect({ provider: "Facebook" })} className='transition-all duration-250 ease-in-out bg-[#405996] hover:bg-[#28375e] rounded-xl py-2 w-[70%] flex justify-center items-center gap-3'>
                                            <FaFacebook />
                                            Facebook
                                        </button>
                                        <button type='button' onClick={() => signInWithRedirect({ provider: "Apple" })} className='transition-all duration-250 ease-in-out bg-black hover:bg-zinc-950 rounded-xl py-2 w-[70%] flex justify-center items-center gap-3'>
                                            <FaApple />
                                            Apple
                                        </button>
                                    </div>
                                    <div className='flex flex-col gap-4 justify-center items-center text-[#E6D5C9]'>
                                        <p className='text-xl tracking-widest'>or</p>
                                        <p className='text-[#40C48E] cursor-pointer tracking-widest'>Signup</p>
                                    </div>
                                </>
                            )}

                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
