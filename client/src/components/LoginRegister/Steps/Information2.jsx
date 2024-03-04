'use client';
import React from 'react';
import { Field, Formik, Form } from 'formik';
import { statesUSA } from '@/assets/data/StatesUSA';
import { client } from '@/app/admin-dashboard/layout';
import { createUser } from '@/graphql/users/mutation';
import * as Yup from 'yup';
export const Information2 = () => {

  const executeMutation = async() => {
    await client.graphql({
      query: createUser,
      variables: {
        input: 
        {
          fullName: "test",
          email: "test@gmail.com",
          password: "test",
          contactNumber: "123456789",
          city: "Miami",
          state: "florida",
          status: "active",
          zipCode: "123",
          subscription:"free",
          rol:"admin"
        }
      },
    });
  }

  const onHandleSubmit = () => {
    console.log('cliked');
    executeMutation();

  }
  return (
    <div className='bg-white h-[32rem] overflow-y-auto w-[21rem] md:w-[45rem] md:h-[36rem] transition-all rounded-lg slide-in-left'>
        <div className='my-4'>
            <p className='text-zinc-800 my-8 md:text-4xl font-bold text-center'>Additional Information</p>
            <Formik
              initialValues={{
                address: '',
                city: '',
                state: '',
                zip: '',
                role: '',
                contactNumber: 0
              }}
              onSubmit={onHandleSubmit}
              validationSchema={validationSchema}
            >
              {({isValid, handleSubmit}) => {
                return(
                  <Form className='w-full flex flex-col justify-center items-center' onSubmit={handleSubmit}>
                    <div class="flex flex-wrap mb-6 w-2/3">
                      <div class="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">
                          Address
                        </label>
                        <Field
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          placeholder='Address'
                          name="address"
                        />  
                      </div>
                    </div>

                    <div className='mb-6 flex flex-wrap w-2/3'>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                          City
                        </label>
                        <Field
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          placeholder='City'
                          name="city"
                        />
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="states">
                          State
                        </label>
                        <div className="relative">
                          <select
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="states"
                          >
                            {statesUSA.map((estado, index) => (
                              <option key={index} value={estado}>{estado}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                          Zip
                        </label>
                        <Field
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-zip"
                          type="text"
                          placeholder="90210"
                          name="zip"
                        />
                      </div>
                    </div>

                    <div className='mb-6 w-2/3 px-3'>
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="rol-grid">
                        Role
                      </label>
                      <Field
                        as="select"
                        id='rol-grid'
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="role"
                      >
                        <option value="">Customer</option>
                        <option value="">Technician</option>
                      </Field>
                    </div>

                    <div className='mb-6 w-2/3 px-3'>
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="number-grid">
                        ContactNumber
                      </label>
                      <Field
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="number-zip"
                        type="number"
                        placeholder="(+1)"
                        name="contactNumber"
                      />
                    </div>
                    <button 
                      disabled={!isValid}
                      type='submit'
                      className="bg-green-panda hover:bg-green-400 cursor-pointer font-bold text-white text-[18px] w-2/3 text-center py-3 px-4 rounded-lg transition-colors delay-50"
                    >
                      crear
                    </button>
                    {/* <Link
                      href={`/user`}
                      className="bg-green-panda hover:bg-green-400 cursor-pointer font-bold text-white text-[18px] w-2/3 text-center py-3 px-4 rounded-lg transition-colors delay-50"
                    >
                      Create
                    </Link> */}
                  </Form>
                )
              }}
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