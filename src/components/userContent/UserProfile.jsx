"use client"
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateUserAttributes } from "aws-amplify/auth";
import { updateInformation } from "@/graphql/users/mutation/users";
import { toast } from 'react-toastify';
import { statesUSA } from '@/assets/data/StatesUSA';
import * as Yup from 'yup';

const UserProfile = ({user, retrieveOneUser}) => {

    const onHandleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            await updateUserAttributes({
                userAttributes: {
                    'custom:fullName': values.fullName,
                    'custom:address': values.address,
                    'custom:city': values.city,
                    'custom:state': values.state,
                    'custom:phoneNumber': values.contactNumber,
                    'custom:zipCode': values.zipCode
                }
            });
            await client.graphql({
                query: updateInformation,
                variables: {
                    email: values.email,
                    input: {
                        id: user.id,
                        ...values
                    }
                }
            })
            await retrieveOneUser();
            toast.success("Updated successfully.");
        } catch (error) {
            console.log(error);
            toast.error(`Error during the process.`);
        }
    }

  return (
      <Formik
        initialValues={{
          fullName: user["custom:fullName"] || "",
          email: user.email || "",
          address: user["custom:address"] || "",
          city: user["custom:city"] || "",
          state: user["custom:state"] || "",
          zipCode: user["custom:zipCode"] || 0,
          contactNumber: user["custom:phoneNumber"] || 0,
          status: "active",
        }}
        validationSchema={formSchema}
        validateOnChange={false}
        onSubmit={onHandleSubmit}
      >
        {({ errors, isValid }) => {
          return (
            <Form
              className="w-full h-full flex flex-col gap-7"
              autoComplete="off"
            >
              <div className="flex flex-col md:flex-row w-full gap-7 md:gap-12">
                <div className="w-full md:w-2/4">
                  <label
                    htmlFor="grid-fullName"
                    className="block text-gray-300 text-sm font-bold mb-2"
                  >
                    Full Name
                  </label>
                  <Field
                    type="text"
                    name="fullName"
                    className={`block appearance-none w-full bg-zinc-700 border ${
                      errors.fullName ? "border-red-600" : "border-zinc-700"
                    } text-white py-3 px-4 rounded-lg leading-tight focus:outline-none  focus:border-emerald-500`}
                    id="grid-fullName"
                  />
                  <ErrorMessage
                    name="fullName"
                    component={() => (
                      <div className="text-red-600">{errors.fullName}</div>
                    )}
                  />
                </div>
                <div className="w-full md:w-2/4">
                  <label
                    htmlFor="grid-email"
                    className="block text-gray-300 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    disabled
                    className={`block appearance-none w-full bg-zinc-700 border ${
                      errors.email ? "border-red-600" : "border-zinc-700"
                    } text-white py-3 px-4 rounded-lg leading-tight focus:outline-none  focus:border-emerald-500`}
                  />
                  <ErrorMessage
                    name="email"
                    component={() => (
                      <div className="text-red-600">{errors.email}</div>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row w-full gap-7 md:gap-12">
                <div className="w-full md:w-2/4 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
                    htmlFor="states"
                  >
                    State
                  </label>
                  <Field
                    as="select"
                    name="state"
                    className={`block appearance-none w-full bg-zinc-700 border ${
                      errors.state ? "border-red-600" : "border-zinc-700"
                    } text-white py-3 px-4 rounded-lg leading-tight focus:outline-none  focus:border-emerald-500`}
                  >
                    {statesUSA.map((estado, index) => (
                      <option key={index} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="state"
                    component={() => (
                      <div className="text-red-600">{errors.state}</div>
                    )}
                  />
                </div>
                <div className="w-full md:w-2/4 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
                    htmlFor="grid-city"
                  >
                    Address
                  </label>
                  <Field
                    className={`appearance-none block w-full bg-zinc-700 text-white border ${
                      errors.address ? "border-red-600" : "border-zinc-700"
                    } rounded-lg py-3 px-4 leading-tight focus:outline-none  focus:border-emerald-500`}
                    type="text"
                    placeholder="Complete your address"
                    name="address"
                  />
                  <ErrorMessage
                    name="address"
                    component={() => (
                      <div className="text-red-600">{errors.address}</div>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row w-full gap-7 md:gap-12">
                <div className="w-full md:w-2/4 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
                    htmlFor="grid-zip"
                  >
                    Zip
                  </label>
                  <Field
                    className={`appearance-none block w-full bg-zinc-700 text-white border ${
                      errors.zipCode ? "border-red-600" : "border-zinc-700"
                    } rounded-lg py-3 px-4 leading-tight focus:outline-none  focus:border-emerald-500`}
                    id="grid-zip"
                    type="text"
                    placeholder="90210"
                    name="zipCode"
                  />
                  <ErrorMessage
                    name="zipCode"
                    component={() => (
                      <div className="text-red-600">{errors.zipCode}</div>
                    )}
                  />
                </div>
                <div className="w-full md:w-2/4 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
                    htmlFor="grid-city"
                  >
                    City
                  </label>
                  <Field
                    className={`appearance-none block w-full bg-zinc-700 text-white border ${
                      errors.city ? "border-red-600" : "border-zinc-700"
                    } rounded-lg py-3 px-4 leading-tight focus:outline-none  focus:border-emerald-500`}
                    id="grid-city"
                    type="text"
                    placeholder="Complete your city"
                    name="city"
                  />
                  <ErrorMessage
                    name="city"
                    component={() => (
                      <div className="text-red-600">{errors.city}</div>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row w-full gap-7 md:gap-12">
                <div className="w-full md:w-2/4 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
                    htmlFor="grid-contactNumber"
                  >
                    Contact Number
                  </label>
                  <Field
                    className={`appearance-none block w-full bg-zinc-700 text-white border ${
                      errors.contectNumber
                        ? "border-red-600"
                        : "border-zinc-700"
                    } rounded-lg py-3 px-4 leading-tight focus:outline-none  focus:border-emerald-500`}
                    id="grid-contactNumber"
                    type="text"
                    placeholder="90210"
                    name="contactNumber"
                  />
                  <ErrorMessage
                    name="contactNumber"
                    component={() => (
                      <div className="text-red-600">{errors.contactNumber}</div>
                    )}
                  />
                </div>
              </div>
              <div className="w-full pb-5">
                <button
                  type="submit"
                  disabled={!isValid}
                  className={`${
                    !isValid ? "bg-gray-200" : "bg-emerald-500"
                  } p-3 rounded-lg text-white font-bold w-full transition-all ease-in-out delay-150 hover:-translate-y-1 hover:scale-95 duration-300`}
                >
                  Update Information
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
  );
};

export default UserProfile;


const formSchema = Yup.object().shape({
    fullName: Yup.string().required('Required').max(50),
    email: Yup.string().email().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    zipCode: Yup.number().required('Required').positive().integer(),
    contactNumber: Yup.number().required('Required').positive().integer()
});