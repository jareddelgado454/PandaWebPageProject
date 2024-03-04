"use client"

import React from 'react';
import { statesUSA } from '@/assets/data/StatesUSA';
import { FaLocationDot } from 'react-icons/fa6';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { cognitoRegister } from '@/app/authUtils/cognitoRegister';
import { createUser } from '@/graphql/users/mutation';
import {client} from "../../../app/admin-dashboard/layout";
import * as Yup from 'yup';

export const Information2 = ({signUpInformation}) => {

  const initialValues = {
    address: '',
    city: '',
    state: '',
    zip: '',
    role: ''
  }

  const onHandleSubmit = async (values) => {
    try {
        const {address, city, state, zip, role} = values
        const registerInformation = {
          ...signUpInformation,
          address : address,
          city : city,
          state : state,
          zipCode : zip,
          rol : role,
          status : "inactive",
          profilePicture:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          subscription:"free",
        }
        console.log(registerInformation);

        const resultCognito = await cognitoRegister({
          email: registerInformation?.email,
          password: registerInformation?.password, 
          fullname: registerInformation?.fullname,
          contactNumber: registerInformation?.contactNumber
        }); 

        const show = {
                  fullName: registerInformation.fullName,
                  email: registerInformation.email,
                  password: registerInformation.password,
                  contactNumber: registerInformation.contactNumber,
                  city: registerInformation.city,
                  state: registerInformation.state,
                  status: registerInformation.status,
                  zipCode: registerInformation.zipCode,
                  subscription: registerInformation.subscription,
                  rol: registerInformation.rol,
                  address: registerInformation.address,
                  cognitoId:resultCognito.userSub,
                  profilePicture: registerInformation.profilePicture,
        }


        const resultDB = await client.graphql(
          {
            query: createUser,
            variables: {
              input : {
                fullName: registerInformation?.fullName,
                email: registerInformation?.email,
                password: registerInformation?.password,
                contactNumber: registerInformation?.contactNumber,
                city: registerInformation?.city,
                state: registerInformation?.state,
                status: registerInformation?.status,
                zipCode: registerInformation?.zipCode,
                subscription: registerInformation?.subscription,
                rol: registerInformation?.rol,
                address: registerInformation?.address,
                cognitoId:resultCognito.userSub,
                profilePicture: registerInformation?.profilePicture,
              }
            },
          }
        ) 

        console.log(resultDB);

    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className='bg-white h-[32rem] overflow-y-auto w-[21rem] md:w-[45rem] md:h-[36rem] transition-all rounded-lg slide-in-left'>
        <div className='my-4'>
            <p className='text-zinc-800 my-8 md:text-4xl font-bold text-center'>Additional Information</p>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => onHandleSubmit(values)}
            >
              {({handleSubmit}) => (
                <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center items-center'>

                  <div class="flex flex-wrap mb-6 w-2/3">
                    <div class="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-address">
                        Address
                      </label>
                      <Field
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        name="address"
                        placeholder='Address'
                      />     
                    </div>
                  </div>

                  <div className='mb-6 flex flex-wrap w-2/3'>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                        City
                      </label>
                      <Field
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        name="city"
                        placeholder='City'
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="states">
                        State
                      </label>
                      <div className="relative">
                        <Field
                          as="select"
                          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="states"
                          name="state"
                        >
                          {statesUSA.map((estado, index) => (
                            <option key={index} value={estado}>{estado}</option>
                          ))}
                        </Field>
                      </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                        Zip
                      </label>
                      <Field
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-zip"
                        name="zip"
                        type="text"
                        placeholder="90210"
                      />
                    </div>
                  </div>

                  <div className='mb-6 w-2/3 px-3'>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="rol-grid">
                        Create account as
                      </label>
                    <Field
                      as="select"
                      id='rol-grid'
                      name="role"
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      defaultValue="customer"      
                    >
                      <option value="customer">Customer</option>
                      <option value="technician">Technician</option>
                    </Field>
                  </div>
                  
                  <div className='mb-6 w-2/3'>
                    <div>
                        <button
                        type="submit"
                        className="bg-green-panda hover:bg-green-400 cursor-pointer font-bold text-white text-[18px] w-full py-3 px-4 rounded-lg transition-colors delay-50"
                        >
                        Create
                        </button>
                    </div>
                  </div>

                </form>
              )}
            </Formik>
        </div>
    </div>
  )
}

const validationSchema = Yup.object().shape({

  address: Yup.string()
    .max(30, 'Too Long!')
    .required(),
  city: Yup.string()
    .max(30, 'Too Long!')
    .required(),
  state: Yup.string()
    .max(30, 'Too Long!')
    .required(),
  zip: Yup.number()
    .required()
    .positive()
    .integer(),
  role: Yup.string()
    .required(),
  contactNumber: Yup.number()
    .required()
    .positive()
    .integer(),

});