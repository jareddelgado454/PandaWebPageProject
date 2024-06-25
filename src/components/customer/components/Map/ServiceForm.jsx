'use client';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { FaCreditCard, FaMoneyBill } from 'react-icons/fa6';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { client } from '@/contexts/AmplifyContext';
import { PlaceContext } from '@/contexts/place/PlaceContext';
import { createService } from '@/graphql/users/customer/mutation';
import { ServiceContext } from '@/contexts/service/ServiceContext';
import { listCarsById } from '@/graphql/users/customer/query';
import { useDisclosure } from '@nextui-org/react';
import { AddNewCarModal } from '../..';
import { UserContext } from '@/contexts/user/UserContext';
export default function ServiceForm() {
    const { user } = useContext(UserContext);
    const { userLocation } = useContext(PlaceContext);
    const { serviceRequest, setServiceRequest } = useContext(ServiceContext);
    const [service, setService] = useState({});
    const [myCars, setMyCars] = useState([]);
    const {
        isOpen,
        onOpen,
        onOpenChange
    } = useDisclosure();
    const retrieveMyCars = async () => {
        try {
            const { data } = await client.graphql({
                query: listCarsById,
                variables: {
                    customerId: user.id
                }
            });
            setMyCars(data.listCars.items);
        } catch (error) {
            console.error(error);
        }
    }

    const retrieveSubFromCognito = async () => {
        try {
            const { sub } = await fetchUserAttributes();
            return sub;
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => { retrieveSubFromCognito(); retrieveMyCars(); }, [user]);

    useEffect(() => {
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

    const onHandleSubmit = async (values, { resetForm }) => {
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
                        type: values.type,
                        paymentMethod: values.paymentMethod,
                        serviceCarId: values.car
                    }
                }
            });
            setServiceRequest(data.createService);
            Cookies.set(
                "ServiceRequest",
                JSON.stringify(data.createService)
            );
            resetForm();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { setService(serviceRequest); }, [setServiceRequest]);

    return (
        <div className='relative h-full'>
            <AddNewCarModal isOpen={isOpen} onOpenChange={onOpenChange} callback={retrieveMyCars} setMyCars={setMyCars} />
            <div className={`container mx-auto px-4 py-4 w-full lg:w-[90%] h-full overflow-y-scroll ${service && (service.status === 'service accepted' || service.status === 'on the way' || service.status === 'in progress' || service.status === 'payment') && 'hidden'}`} style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              overflowY: 'scroll'
            }}>
                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        car: '',
                        type: 'repair',
                        paymentMethod: 'card'
                    }}
                    onSubmit={onHandleSubmit}
                    validationSchema={formSchema}
                    validateOnChange={false}
                >
                    {({ handleSubmit, errors, isValid, setFieldValue, values }) => (
                        <Form className={`grid grid-cols-1 2xl:grid-cols-3 gap-6 h-full ${(service && (service.status === 'service accepted' || service.status === 'pending')) && 'opacity-25'}`} onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-4 justify-center'>
                                <div className='flex flex-col gap-2 w-full justify-center'>
                                    <label htmlFor="title">Title of service *</label>
                                    <Field
                                        name='title'
                                        type="text"
                                        className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ${errors.title && 'border-red-600'}`}
                                        placeholder="Title of service"
                                    />
                                    <ErrorMessage name="title" component={() => (<div className="text-red-600 text-sm">{errors.title}</div>)} />
                                </div>
                                <div className='flex flex-col gap-2 w-full'>
                                    <label htmlFor="description">Description of service *</label>
                                    <Field
                                        name='description'
                                        type="text"
                                        className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline ${errors.description && 'border-red-600'}`}
                                        placeholder="Description of service"
                                    />
                                    <ErrorMessage name="description" component={() => (<div className="text-red-600 text-sm">{errors.description}</div>)} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-6 justify-center'>
                                <div className='flex flex-col gap-3 justify-center'>
                                    <label htmlFor="car">Select car *</label>
                                    {myCars.length > 0 ? (
                                        <Field
                                            as='select'
                                            name='car'
                                            className='block appearance-none border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 w-full'
                                            placeholder="My cars"
                                        >
                                            <option value="default">Choose a car</option>
                                            {myCars.map((car, i) => (
                                                <option key={i} value={car.id}>{car.brand}</option>
                                            ))}
                                        </Field>
                                    ) : (
                                        <div className='h-10'>
                                            <p className='text-rose-600 cursor-pointer font-semibold' onClick={onOpen}>Click to add your car</p>
                                        </div>
                                    )}
                                    <label htmlFor="car">Select type of service *</label>
                                    <Field
                                        as='select'
                                        name='type'
                                        className='block appearance-none border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 w-full'
                                        placeholder="My cars"
                                    >
                                        <option value="repair">Repair</option>
                                        <option value="towing">Towing</option>
                                        <option value="diagnostic">Diagnostic</option>
                                    </Field>
                                </div>
                            </div>
                            <div className='flex flex-col gap-6 justify-center'>
                                <div className='flex flex-col gap-4 justify-center'>
                                    <div className='flex flex-col gap-2 w-full h-full'>
                                        <div className='flex flex-row gap-2'>
                                            <label htmlFor="paymentMethod">Payment method</label>
                                            {values.paymentMethod === 'card' && <FaCreditCard className='text-xl flex justify-center items-center h-full ' />}
                                        </div>
                                        <Field
                                            as='select'
                                            name='paymentMethod'
                                            className='block appearance-none border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 w-full'
                                            placeholder="My cars"
                                            onChange={({ target }) => setFieldValue('paymentMethod', target.value)}
                                        >
                                            <option value="card">Pay with card</option>
                                        </Field>
                                    </div>
                                    <button disabled={!isValid} type="submit" className={`w-full h-[50%] rounded-lg py-2 transition-all duration-300 ${!isValid ? 'bg-gray-200 dark:bg-stone-800 text-gray-300' : 'bg-green-panda hover:bg-emerald-700 text-white'}  font-semibold`}>
                                        Send Request
                                    </button>
                                </div>
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
                (service && (service.status !== 'completed') && (
                    <div className='w-full h-full flex flex-col gap-4 justify-center items-center'>
                        <p className='font-semibold'>You already have a service petition. Click here to see full detail:</p>
                        <Link href={`/customer/request/${service.id}`} className='bg-green-panda rounded px-2 py-2 shadow-lg text-white'>Service Detail</Link>
                    </div>
                ))
            }
        </div>
    )
}

const formSchema = Yup.object().shape({
    title: Yup.string().required('Required').max(50),
    description: Yup.string().required('Required').max(1000),
    car: Yup.string().required()
});