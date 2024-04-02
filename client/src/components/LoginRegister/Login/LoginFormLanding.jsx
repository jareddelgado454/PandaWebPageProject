"use client"
import React ,{ useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {
    RiMailLine,
    RiLockLine,
    RiEyeLine,
    RiEyeOffLine,
  } from "react-icons/ri";
import { signIn } from 'next-auth/react';

const LoginFormLanding = () => {

    const [showPassword, setShowPassword] = useState(false);

    const initialValue = {
        email: '',
        password: ''
    }
    
    const onHandleSubmit =  async (values) => {
        try {
            const { email, password } = values;
            const result = signIn("credentials", {email, password, callbackUrl:"/admin-dashboard"})
        } catch (error) {
            console.log(error);
        }
    };

        return (
                    <Formik
                      initialValues={initialValue}
                      onSubmit={(values) => onHandleSubmit(values)}
                    >
                      {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit} className="mb-7  w-[80%]">
                          <div className="relative mb-3">
                            <RiMailLine className="absolute left-2 top-4 text-zinc-900" />
                            <Field
                              type="email"
                              name="email"
                              className="py-3 pl-8 pr-4 bg-white w-full outline-none rounded-2xl mb-4"
                              placeholder="E-mail"
                            />
                          </div>
                          <div className="relative mb-4">
                            <RiLockLine className="absolute left-2 top-4 text-zinc-900" />
                            <Field
                              type={showPassword ? "text" : "password"}
                              name="password"
                              className="py-3 px-8 bg-white w-full outline-none rounded-2xl mb-4 "
                              placeholder="Password"
                            />
                            {showPassword ? (
                              <RiEyeLine
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-6 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                              />
                            ) : (
                              <RiEyeOffLine
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-6 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                              />
                            )}
                          </div>
                          <div>
                            <button
                              type="submit"
                              className="bg-zinc-800 hover:bg-zinc-900 cursor-pointer font-bold text-white text-[18px] w-full py-3 px-4 rounded-lg transition-colors delay-50"
                            >
                              Login
                            </button>
                          </div>
                          <span></span>
                        </Form>
                      )}
                    </Formik>
        )
}

export default LoginFormLanding