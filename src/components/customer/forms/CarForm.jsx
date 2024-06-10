'use client';
import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { uploadData } from 'aws-amplify/storage';
import Cookies from 'js-cookie';
import { client } from '@/contexts/AmplifyContext';
import { Progress } from '@nextui-org/react';
import { saveMyCar, updateMyCar } from '@/graphql/users/customer/mutation';
export default function CarForm({ callback, car, edit, onClose, setMyCars }) {
  const [percent, setPercent] = useState(0);
  const [photograph, setPhotograph] = useState(null);
  function handleChangePhotograph(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
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
    console.log(values);
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
  }
  const handleCreateCar = async (values, image, customerId) => {
    try {
      const { data } = await client.graphql({
        query: saveMyCar,
        variables: {
          input: {
            brand: values.brand,
            model:values.model,
            year: values.year,
            customerCarsId: customerId,
            image: image
          }
        }
      });
      setMyCars(prevCars => [...prevCars, data.createCar]);
    } catch (error) {
      console.log(error);
    }
  }
  const onSubmit = async (values, { resetForm }) => {
    let image;
    try {
      if (photograph) {
        image = await updateReportPicture(dataURLtoBlob(photograph));
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
        year: car?.year || ''
      }}
      onSubmit={onSubmit}
      validateOnBlur={false}
    >
      {({ isValid, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className='grid grid-cols-1 2xl:grid-cols-2 gap-5 w-full px-2'>
          <div className='mt-4 flex flex-col gap-4 w-full'>
            <label htmlFor="title" className='dark:text-white text-gray-700 text-sm font-bold'>
              Brand of car *
            </label>
            <Field
              type="text"
              name="brand"
              className={`dark:text-white shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
          </div>
          <div className='mt-4 flex flex-col gap-4 w-full'>
            <label htmlFor="title" className='dark:text-white text-gray-700 text-sm font-bold'>
              model of car *
            </label>
            <Field
              type="text"
              name="model"
              className={`dark:text-white shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
          </div>
          <div className='mt-4 flex flex-col gap-4 w-full'>
            <label htmlFor="title" className='dark:text-white text-gray-700 text-sm font-bold'>
              image of car *
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/gif, image/jpeg, image/png"
              className='block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
              file:bg-gray-50 file:border-0
              file:me-4
              file:py-3 file:px-4
              dark:file:bg-neutral-700 dark:file:text-neutral-400
              '
              onChange={(event) => {
                handleChangePhotograph(event);
              }}
            />
          </div>
          <div className='mt-4 flex flex-col gap-4 w-full'>
            <label htmlFor="year" className='dark:text-white text-gray-700 text-sm font-bold'>
              year of car *
            </label>
            <Field
              type="text"
              name="year"
              className={`dark:text-white shadow appearance-none border ${!isValid && 'border-rose-600'} bg-transparent rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
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
