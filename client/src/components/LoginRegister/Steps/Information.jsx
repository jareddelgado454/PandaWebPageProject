import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";

export const Information = (props) => {
    const initialValue = {
        email: "",
        password: "",
    };
    
    const onHandleSubmit = () => {
        props.setActiveStep2(false);
        props.setActiveStep3(true);
    };
    return (
        <div className='bg-white h-[30rem] w-full md:w-[45rem] md:h-[45rem] rounded-lg slide-in-left flex justify-center items-center flex-col' style={{
            boxShadow: '0 5px 10px #1e293b'
        }}>
            <p className='text-zinc-800 my-8 md:text-4xl font-bold'>
                Complete Information
            </p>
            <Formik initialValues={initialValue} onSubmit={onHandleSubmit}>
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="mb-7  w-[80%]">
                <div className="relative mb-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-fullName">
                        FullName
                    </label>
                    <Field
                    type="text"
                    name="fullname"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Fullname"
                    />
                </div>
                <div className="relative mb-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                        email
                    </label>
                    <Field
                    type="email"
                    name="email"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="E-mail"
                    />
                </div>
                <div className="relative mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Password
                    </label>
                    <Field
                    type="text"
                    name="password"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Password"
                    />
                </div>

                <div className="relative mb-4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-confirmPassword">
                        Confirm Password
                    </label>
                    <Field
                    type="text"
                    name="confirmPassword"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Mobile phone"
                    />
                </div>

                <div>
                    <button
                    type="submit"
                    className="bg-green-panda hover:bg-green-400 cursor-pointer font-bold text-white text-[18px] w-full py-3 px-4 rounded-lg transition-colors delay-50"
                    >
                    Continue
                    </button>
                </div>
                </Form>
            )}
            </Formik>
        </div>
    )
}
