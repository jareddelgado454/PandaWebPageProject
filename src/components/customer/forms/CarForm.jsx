'use client';
import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { uploadData } from 'aws-amplify/storage';
import Cookies from 'js-cookie';
import { client } from '@/contexts/AmplifyContext';
import { Progress } from '@nextui-org/react';
import { saveMyCar, updateMyCar } from '@/graphql/users/customer/mutation';
import { dataURLtoBlob } from '@/utils/photo/BlobImage';
import * as Yup from 'yup';
export default function CarForm({ callback, car, edit, onClose, setMyCars }) {
  console.log(car);
  const [percent, setPercent] = useState(0);
  const [photograph, setPhotograph] = useState(null);
  function handleChangePhotograph(event, setFieldValue) {
    const file = event.target.files[0];
    setFieldValue('image', file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setPhotograph(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  const uploadCarImage = async (picture) => {
    const uniqueId = uuidv4();
    const filename = `customer-car-image/${uniqueId}.jpg`;
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
  const handleUpdateCar = async (values, customerId) => {
    try {
      await client.graphql({
        query: updateMyCar,
        variables: {
          input: {
            ...values,
            customerCarsId: customerId,
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateCar = async (values, image, customerId) => {
    try {
      const { data } = await client.graphql({
        query: saveMyCar,
        variables: {
          input: {
            brand: values.brand,
            model: values.model,
            year: values.year,
            customerCarsId: customerId,
            image: image,
            identificationNumber: values.identificationNumber
          }
        }
      });
      setMyCars(prevCars => [...prevCars, data.createCar]);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (values, { resetForm }) => {
    let image;
    try {
      if (photograph) {
        image = await uploadCarImage(dataURLtoBlob(photograph));
      }

      const userParsed = JSON.parse(Cookies.get("currentUser"));
      const {
        id: customerId,
      } = userParsed;
      if (edit) {
        handleUpdateCar({...values}, customerId);
      } else {
        handleCreateCar({...values,}, image, customerId);
      }
      toast.success('Car Uploaded successfully.');
      resetForm();
      setPercent(0);
      setPhotograph(null);
      onClose();
      callback();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Formik
      enableReinitialize
      initialValues={{
        id: car?.id || '',
        brand: car?.brand || '',
        model: car?.model || '',
        year: car?.year || '',
        identificationNumber: car?.identificationNumber || 0,
        image: car?.image || null
      }}
      onSubmit={onSubmit}
      validationSchema={CarFormSchema}
      validateOnBlur={false}
    >
      {({ isValid, handleSubmit, setFieldValue, errors }) => (
        <Form onSubmit={handleSubmit} className='grid grid-cols-1 2xl:grid-cols-2 gap-5 w-full px-2'>
          <div className='mt-4 flex flex-col gap-4 w-full'>
            <label htmlFor="title" className='dark:text-white text-gray-700 text-sm font-bold'>
              Brand of car *
            </label>
            <Field
              type="text"
              name="brand"
              className={`dark:text-white shadow appearance-none border ${errors.brand && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
              <ErrorMessage name="brand" component={() => (<div className="text-red-600">{errors.brand}</div>)} />
          </div>
          <div className='mt-4 flex flex-col gap-4 w-full'>
            <label htmlFor="title" className='dark:text-white text-gray-700 text-sm font-bold'>
              model of car *
            </label>
            <Field
              type="text"
              name="model"
              className={`dark:text-white shadow appearance-none border ${errors.model && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
            <ErrorMessage name="model" component={() => (<div className="text-red-600">{errors.model}</div>)} />
          </div>
          <div className='mt-4 flex flex-col gap-4 w-full'>
            <label htmlFor="title" className='dark:text-white text-gray-700 text-sm font-bold'>
              image of car *
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/jpeg, image/png"
              className={`block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
              file:bg-gray-50 file:border-0
              file:me-4
              file:py-3 file:px-4
              dark:file:bg-neutral-700 dark:file:text-neutral-400
              ${errors.image && 'border-rose-600'}
              `}
              onChange={(event) => {
                handleChangePhotograph(event, setFieldValue);
              }}
            />
            <ErrorMessage name="image" component={() => (<div className="text-red-600">{errors.image}</div>)} />
          </div>
          <div className='mt-4 flex flex-col gap-4 w-full'>
            <label htmlFor="year" className='dark:text-white text-gray-700 text-sm font-bold'>
              year of car *
            </label>
            <Field
              type="text"
              name="year"
              className={`dark:text-white shadow appearance-none border ${errors.year && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
            <ErrorMessage name="year" component={() => (<div className="text-red-600">{errors.year}</div>)} />
          </div>
          <div className='mt-4 flex flex-col gap-4 w-full'>
            <label htmlFor="identifyNumber" className='dark:text-white text-gray-700 text-sm font-bold'>
              Identification Number
            </label>
            <Field
              type="text"
              name="identificationNumber"
              className={`dark:text-white shadow appearance-none border ${errors.identificationNumber && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
            <ErrorMessage name="identificationNumber" component={() => (<div className="text-red-600">{errors.identificationNumber}</div>)} />
          </div>
          <div className='w-full col-span-2'>
            <button
              type='submit'
              disabled={!isValid}
              className={`bg-green-panda px-4 py-2 w-full col-span-2 rounded text-white ${!isValid && 'bg-opacity-50 cursor-not-allowed'}`}
            >
              {
                percent > 1 ? <Progress size="md" color='success' aria-label="Loading..." value={percent} /> : 'Submit'
              }
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

const CarFormSchema = Yup.object().shape({
  brand: Yup.string().required('Required'),
  model: Yup.string().required('Required'),
  year: Yup.string().required('Required'),
  identificationNumber: Yup.string().required('Required'),
  image: Yup.string().required('Required')
});