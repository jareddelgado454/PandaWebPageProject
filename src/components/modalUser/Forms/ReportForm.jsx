'use client';
import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { uploadData } from 'aws-amplify/storage';
import { createReport } from '@/graphql/issues/mutations/mutation';
import { client } from '@/contexts/AmplifyContext';
import { Progress } from '@nextui-org/react';
export const ReportForm = () => {
    const [percent, setPercent] = useState(0);
    const [photograph, setPhotograph] = useState(null);
    function handleChangePhotograph(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = async() => {
            setPhotograph(reader.result);
          };
          reader.readAsDataURL(file);
        }
    }
    const dataURLtoBlob = (dataURL) => {
        if (!dataURL) {
            return null;
        }
        var parts = dataURL.split(";base64,");
        var contentType = parts[0].split(":")[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);
        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], { type: contentType });
    };
    const updateReportPicture = async (picture) => {
        const uniqueId = uuidv4();
        const filename = `user-report-issues-image/${uniqueId}.jpg`;
        try {
            const result = await uploadData({
                key: filename,
                data: picture,
                options: {
                    contentType: "image/png",
                    onProgress: ({ transferredBytes, totalBytes }) => {
                        if (totalBytes) {
                            setPercent(Math.round((transferredBytes / totalBytes) * 100));
                        }
                    },
                },
            }).result;
            console.log("Succeeded: ", result);
            return result.key;
        } catch (error) {
            console.log(`Error from here : ${error}`);
        }
    };
    const onSubmit = async (values, { resetForm, setSubmitting }) => {
        let image;
        try {
            if(photograph) {
                image = await updateReportPicture(dataURLtoBlob(photograph));
            }

            const userParsed = JSON.parse(Cookies.get("currentUser"));
            await client.graphql({
                query: createReport,
                variables: {
                    input: {
                        ...values,
                        reportUserId: userParsed.id,
                        image: image,
                        status: "pending",
                        reportCustomerId: userParsed.id
                    }
                }
            })
            toast.success('Report has been sent.');
            resetForm();
            setPercent(0);
            setPhotograph(null);

        } catch (error) {
            console.error(error);
            toast.error('Something went wrong.')
        }
    }
    return (
        <Formik
            initialValues={{
                title: '',
                description: '',
            }}
            onSubmit={onSubmit}
            validationSchema={formSchema}
            validateOnChange
        >
            {({ isValid, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className='mt-4 flex flex-col gap-4'>
                        <label htmlFor="title" className='dark:text-white text-gray-700 text-sm font-bold'>
                            Title of issue *
                        </label>
                        <Field
                            type="text"
                            name="title"
                            className={`dark:text-white shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                    </div>
                    <div className='mt-4 flex flex-col gap-4'>
                        <label htmlFor="description" className='dark:text-white text-gray-700 text-sm font-bold'>
                            Description of issue *
                        </label>
                        <Field
                            type="text"
                            component="textarea" rows="6"
                            name="description"
                            className={`dark:text-white shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                    </div>
                    <div className='mt-4 flex flex-col gap-4 mb-6'>
                        <label htmlFor="image" className='dark:text-white text-gray-700 text-sm font-bold'>
                            Screenshot *optional
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/gif, image/jpeg, image/png"
                            onChange={(event) => {
                                handleChangePhotograph(event);
                            }}
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={!isValid}
                        className={`bg-green-panda px-4 py-2 w-full rounded text-white ${!isValid && 'bg-opacity-50 cursor-not-allowed'}`}
                    >
                        {
                            percent > 1 ? <Progress size="md" color='success' aria-label="Loading..." value={percent} /> : 'Submit'
                        }
                    </button>
                </Form>
            )}
        </Formik>
    )
}

const formSchema = Yup.object().shape({
    title:  Yup.string().required('This field is required.').max(150),
    description: Yup.string().required('This field is required.').max(350),
})