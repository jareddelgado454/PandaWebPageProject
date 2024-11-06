'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Geo } from "@aws-amplify/geo";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { parseAbsoluteToLocal } from '@internationalized/date'
import { Button, DateInput, Input, Select, SelectItem, Spinner } from '@nextui-org/react'
import { client } from '@/contexts/AmplifyContext';
import { listCarsById, retrieveMyInformation } from '@/graphql/users/customer/query';
import { UserContext } from '@/contexts/user/UserContext';
import { PlaceContext } from '@/contexts/place/PlaceContext';
import { createScheduleDService } from '@/graphql/schedule/mutation';
import { getCustomerRates } from '@/api/customer';
import { calculateRate } from '@/utils/service/AVGRate';
import { toast } from 'react-toastify';
const ScheduleForm = ({ dates, carSelected, setCarSelected, technicianSelectedId, setIsSuccessed }) => {
  const { user } = useContext(UserContext);
  const { userLocation } = useContext(PlaceContext);
  const [customer, setCustomer] = useState();
  const [myCars, setMyCars] = useState([]);
  const [rate, setRate] = useState(0);
  const [currentAddres, setCurrentAddres] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const retrieveCustomerInformation = async () => {
    try {
      const { data } = await client.graphql({
        query: retrieveMyInformation,
        variables: {
          id: user.id
        }
      });
      setCustomer(data.getCustomer);
    } catch (error) {
      console.error(error);
    }
  }
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
  useEffect(() => { retrieveMyCars(); retrieveCustomerInformation(); }, [user]);
  useEffect(() => {
    (async () => {
      if (customer && customer.id) {
        const rates = await getCustomerRates(customer.id);
        setRate(calculateRate(rates));
      }
    })();
  }, [customer]);
  useEffect(() => {
    (async () => {
      if (!userLocation) return;
      const response = await Geo.searchByCoordinates([
        userLocation[0],
        userLocation[1],
      ]);
      if (response) {
        const addressArray = response.label;
        const newAddres = addressArray
          ?.split(",")
          .slice(0, addressArray.split(",").length - 1)
          .toString();
        setCurrentAddres(newAddres);
      }
    })();
  }, [userLocation]);
  const onHandleSubmit = async (values, { resetForm }) => {
    const [longitude, latitude] = userLocation;
    setLoading(true);
    try {
      await client.graphql({
        query: createScheduleDService,
        variables: {
          input: {
            ...values,
            status: 'pending',
            originLatitude: latitude,
            originLongitude: longitude,
            customerId: customer.id,
            technicianOfferedId: technicianSelectedId,
            dateScheduled: dates.start,
            customer: {
              id: customer.id,
              fullName: customer.fullName,
              profilePicture: customer.profilePicture,
              rate
            },
            car: {
              id: carSelected.id,
              brand: carSelected.brand,
              model: carSelected.model,
              identificationNumber: carSelected.identificationNumber,
              year: carSelected.year,
              image: carSelected.image
            }
          }
        }
      });
      resetForm();
      setLoading(false);
      setIsSuccessed(true);
      console.log('sended');
    } catch (error) {
      console.error(error);
      setError(error.message);
      toast.error(error.message);
    }
  }
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        type: '',
        car: '',
        address: currentAddres || '',
        paymentMethod: 'card',
        type: ''
      }}
      validationSchema={validationSchema}
      validateOnChange
      onSubmit={onHandleSubmit}
      enableReinitialize
    >
      {({ errors, touched, setFieldValue, isValid }) => (
        <Form className='w-full h-full flex flex-col gap-10 p-6'>
          <p className='text-center font-bold tracking-widest text-3xl'>Scheduled Service Information</p>
          <div className='flex gap-4'>
            <Field name="title">
              {({ field }) => (
                <Input {...field} label="Title" color={touched.title && errors.title && "danger"} isInvalid={touched.title && errors.title} errorMessage={errors.title} />
              )}
            </Field>
            <Field name="description">
              {({ field }) => (
                <Input {...field} label="Description" color={touched.description && errors.description && "danger"} isInvalid={touched.description && errors.description} errorMessage={errors.description} />
              )}
            </Field>
          </div>
          <div className='flex gap-4'>
            <Field name="address">
              {({ field }) => (
                <Input {...field} label="Address" color={errors.address && "danger"} isInvalid={touched.address && errors.address} errorMessage={errors.address} />
              )}
            </Field>
            <DateInput
              label={"Schedule Start Date"}
              granularity="minute"
              defaultValue={parseAbsoluteToLocal(dates.start.toISOString())}
              isReadOnly
            />

          </div>
          <div className='flex gap-4'>
            <Field name="car">
              {({ field }) => (
                <Select
                  {...field}
                  label="Select your car"
                  onChange={(e) => {
                    const selectedCar = myCars.find(car => car.id === e.target.value);
                    setCarSelected(selectedCar);
                    setFieldValue("car", e.target.value);
                  }}
                  isInvalid={touched.car && errors.car}
                  errorMessage={errors.car}
                >
                  {myCars.map((car) => (
                    <SelectItem key={car.id} value={car.id}>
                      {car.brand}
                    </SelectItem>
                  ))}
                </Select>
              )}
            </Field>
            <Field name="paymentMethod">
              {({ field }) => (
                <Select
                  {...field}
                  label="Payment Method"
                  isInvalid={touched.paymentMethod && errors.paymentMethod}
                  errorMessage={errors.paymentMethod}
                >
                  <SelectItem key="card">
                    Card
                  </SelectItem>
                </Select>
              )}
            </Field>
          </div>
          <div className='flex gap-4'>
            <Field name="type">
              {({ field }) => (
                <Select
                  {...field}
                  className='w-[50%]'
                  label="Type of Service"
                  isInvalid={touched.type && errors.type}
                  errorMessage={errors.type}
                >
                  <SelectItem key="repair">
                    Repair
                  </SelectItem>
                  <SelectItem key="towing">
                    Towing
                  </SelectItem>
                  <SelectItem key="diagnostic">
                    Diagnostic
                  </SelectItem>
                </Select>
              )}
            </Field>
          </div>
          {loading ? <Spinner color="success"/> : (
            <Button isDisabled={!isValid} type='submit' color='success' className='font-bold tracking-widest text-white'>
              Confirm
            </Button>
          )}
        </Form>
      )}


    </Formik>
  )
}

export default ScheduleForm;

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  address: Yup.string().required('Address is required'),
  car: Yup.string().required('Please select a car'),
  paymentMethod: Yup.string().required('Please select a payment method'),
  type: Yup.string().required('Please select a type of service'),
});