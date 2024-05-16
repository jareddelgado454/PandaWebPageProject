'use client';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { client } from '@/contexts/AmplifyContext';
import { PlaceContext } from '@/contexts/place/PlaceContext';
import { createService } from '@/graphql/users/customer/mutation';
import { ServiceContext } from '@/contexts/service/ServiceContext';
import Link from 'next/link';

export default function ServiceForm() {
    const { userLocation } = useContext(PlaceContext);
    const { serviceRequest, setServiceRequest } =useContext(ServiceContext);
    const [service, setService] = useState({});

    const retrieveSubFromCognito = async () => {
        try {
            const { sub } = await fetchUserAttributes();
            return sub;
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => { retrieveSubFromCognito(); }, []);

    useLayoutEffect(() => {
        const savedService = Cookies.get("ServiceRequest");
        
        if (savedService) {
            try {
                const parsedService = JSON.parse(savedService);
                setService(parsedService);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    }, []);

    const onHandleSubmit = async (values) => {
        const [longitude, latitude] = userLocation;
        console.log(values);
        const sub = await retrieveSubFromCognito();
        try {
            const { data } = await client.graphql({
                query: createService,
                variables: {
                    input: {
                        title: values.title,
                        description: values.description,
                        originLatitude: latitude,
                        originLongitude: longitude,
                        serviceCustomerId: sub,
                        status: 'pending',
                        type: 'inmediate',
                        car: values.car
                    }
                }
            });
            setServiceRequest(data.createService);
            Cookies.set(
                "ServiceRequest",
                JSON.stringify(data.createService)
            );
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { setService(serviceRequest); }, [setServiceRequest]);

    return (
        <div className='relative h-full overflow-hidden'>
            <div className={`container mx-auto px-4 w-[90%] ${service && service.status === 'in progress' && 'hidden'}`}>
                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        car: ''
                    }}
                    onSubmit={onHandleSubmit}
                    validationSchema={formSchema}
                >
                    {({ handleSubmit, errors, isValid, setFieldValue }) => (
                        <Form className={`flex flex-col gap-6 ${(status === 'pending' || service && service.status === 'pending') && 'opacity-25'}`} onSubmit={handleSubmit}>
                            <p className='my-4'>Make a service request</p>
                            <div className='flex gap-6'>
                                <div className='flex flex-col gap-2 w-full'>
                                    <Field
                                        name='title'
                                        type="text"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ${errors.title && 'border-red-600'}`}
                                        placeholder="Title of service"
                                    />
                                    <ErrorMessage name="title" component={() => (<div className="text-red-600 text-sm">{errors.title}</div>)} />
                                </div>
                                <div className='flex flex-col gap-2 w-full'>
                                    <Field
                                        name='description'
                                        type="text"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ${errors.description && 'border-red-600'}`}
                                        placeholder="Description of service"
                                    />
                                    <ErrorMessage name="description" component={() => (<div className="text-red-600 text-sm">{errors.description}</div>)} />
                                </div>
                            </div>
                            <div className='flex gap-6'>
                                <Field
                                    as='select'
                                    className='block appearance-none border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 w-2/4'
                                    placeholder="My cars"
                                    onChange={({ target }) => setFieldValue('car', target.value)}
                                >
                                    <option value="Hyundai">Hyundai</option>
                                    <option value="Toyota">Toyota</option>
                                </Field>
                                <button disabled={!isValid} type="submit" className={`w-2/4 rounded-lg ${!isValid ? 'bg-gray-200 dark:bg-stone-800 text-gray-300' : 'bg-green-panda hover:bg-emerald-700 text-white'}  font-semibold`}>
                                    Send Request
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            {
                (service && service.status === 'pending') && (
                    <div className='transition-all absolute w-full h-full flex justify-center items-center bg-white/35 top-0'>
                        <div className='loader bg-green-pan' />
                    </div>
                )
            }
            {
                (service && service.status === 'in progress' && (
                    <div className='w-full h-full flex flex-col gap-4 justify-center items-center'>
                        <p className='font-semibold'>You already have a service petition. Click here to see full detail:</p>
                        <Link href={`/customer/request/${serviceRequest.id}`} className='bg-green-panda rounded px-2 py-2 shadow-lg text-white'>Service Detail</Link>
                    </div>
                ))
            }
        </div>
    )
}

const formSchema = Yup.object().shape({
    title: Yup.string().required('Required').max(50),
    description: Yup.string().required('Required').max(1000),
});