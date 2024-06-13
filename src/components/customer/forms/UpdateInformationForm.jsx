'use client';
import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button } from '@nextui-org/react';
import { client } from '@/contexts/AmplifyContext';
import { updateMyInformation } from '@/graphql/users/customer/mutation';
import { toast } from 'react-toastify';
import { updateUserAttributes } from 'aws-amplify/auth';
export default function UpdateInformationForm({ callback, customer, closeModal }) {
    const onHandleUpdateInformationSubmit = async(values) => {
        try {
            await client.graphql({
                query: updateMyInformation,
                variables: {
                    input: {
                        ...values
                    }
                }
            });
            callback();
            await handleUpdateCustomAttribute();
            closeModal();
            toast.success(`Your information has been updated.`);
        } catch (error) {
            console.error(error);
        }
    }
    const handleUpdateCustomAttribute = async() => {
        try {
            await updateUserAttributes({
              userAttributes: {
                ['custom:profileCompleted']: "true"
              },
            });
            //setIsAgreed(true);
            toast.success(`Accepted Succesfully`);
          } catch (error) {
            console.error(error);
          }
    }
    return (
        <Formik
            initialValues={{
                id: customer.id || '',
                fullName: customer.fullName || '',
                contactNumber: customer.contactNumber || '',
                state: customer.state || '',
                city: customer.city || '',
                address: customer.address || '',
                zipCode: customer.zipCode || 0
            }}
            onSubmit={onHandleUpdateInformationSubmit}
        >
            {({ isValid, handleSubmit }) => (
                <Form
                    onSubmit={handleSubmit}
                    className='flex flex-row w-full gap-6 flex-wrap'
                >
                    <div className='flex flex-row gap-6 w-full'>
                        <div className='flex flex-col gap-6 w-full'>
                            <label htmlFor="fullName">
                                FullName *
                            </label>
                            <Field
                                type="text"
                                name="fullName"
                                className={`dark:text-white shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            />
                        </div>
                        <div className='flex flex-col gap-6 w-full'>
                            <label htmlFor="fullName">
                                contactNumber *
                            </label>
                            <Field
                                type="text"
                                name="contactNumber"
                                className={`dark:text-white shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            />
                        </div>
                    </div>
                    <div className='flex flex-row gap-6 w-full'>
                        <div className='flex flex-col gap-6 w-full'>
                            <label htmlFor="fullName">
                                State *
                            </label>
                            <Field
                                type="text"
                                name="state"
                                className={`dark:text-white shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            />
                        </div>
                        <div className='flex flex-col gap-6 w-full'>
                            <label htmlFor="fullName">
                                City *
                            </label>
                            <Field
                                type="text"
                                name="city"
                                className={`dark:text-white shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            />
                        </div>
                    </div>
                    <div className='flex flex-row gap-6 w-full'>
                        <div className='flex flex-col gap-6 w-full'>
                            <label htmlFor="fullName">
                                Address *
                            </label>
                            <Field
                                type="text"
                                name="address"
                                className={`dark:text-white shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            />
                        </div>
                        <div className='flex flex-col gap-6 w-full'>
                            <label htmlFor="fullName">
                                Zipcode *
                            </label>
                            <Field
                                type="text"
                                name="zipCode"
                                className={`dark:text-white shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            />
                        </div>
                    </div>
                    <Button type='submit' color='success' className='w-full text-white font-semibold tracking-widest'>
                        Update
                    </Button>
                </Form>
            )}
        </Formik>
    )
}
