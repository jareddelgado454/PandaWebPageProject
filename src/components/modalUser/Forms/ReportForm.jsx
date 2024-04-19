'use client';
import React from 'react';
import { client } from '@/contexts/AmplifyContext';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { createReport } from '@/graphql/issues/mutations/mutation';
import Cookies from 'js-cookie';
export const ReportForm = () => {
    const onSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            const userParsed = JSON.parse(Cookies.get("currentUser"));
            await client.graphql({
                query: createReport,
                variables: {
                    input: {
                        ...values,
                        reportUserId: userParsed.id,
                        status: "unsolved"
                    }
                }
            })
            toast.success('Report sended.');
            resetForm();

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Formik
            initialValues={{
                title: '',
                description: '',
                image: '',
            }}
            onSubmit={onSubmit}
        >
            {({ isValid, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className='mt-4 flex flex-col gap-4'>
                        <label htmlFor="title" className='text-gray-700 text-sm font-bold'>
                            Title of issue *
                        </label>
                        <Field
                            type="text"
                            name="title"
                            className={`shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                    </div>
                    <div className='mt-4 flex flex-col gap-4'>
                        <label htmlFor="description" className='text-gray-700 text-sm font-bold'>
                            Description of issue *
                        </label>
                        <Field
                            type="text"
                            component="textarea" rows="6"
                            name="description"
                            className={`shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                    </div>
                    <div className='mt-4 flex flex-col gap-4 mb-6'>
                        <label htmlFor="image" className='text-gray-700 text-sm font-bold'>
                            Screenshot *optional
                        </label>
                        <input className="text-sm text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700" id="file_input" type="file" />
                    </div>
                    <button
                        type='submit'
                        disabled={!isValid}
                        className={`bg-green-panda px-4 py-2 w-full rounded text-white ${!isValid && 'bg-opacity-50 cursor-not-allowed'}`}
                    >
                        Submit Report
                    </button>
                </Form>
            )}
        </Formik>
    )
}
