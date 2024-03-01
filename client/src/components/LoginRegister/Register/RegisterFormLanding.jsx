"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  RiMailLine,
  RiUserLine,
  RiPhoneFill,
  RiLockLine,
} from "react-icons/ri";

const RegisterFormLanding = () => {
  const initialValue = {
    email: "",
    password: "",
  };

  const onHandleSubmit = () => {};

  return (
    <Formik initialValues={initialValue} onSubmit={onHandleSubmit}>
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="mb-7  w-[80%]">
          <div className="relative mb-3">
            <RiUserLine className="absolute left-2 top-3 text-zinc-900" />
            <Field
              type="text"
              name="fullname"
              className="py-2 pl-8 pr-4 bg-white w-full outline-none rounded-2xl mb-4"
              placeholder="Fullname"
            />
          </div>
          <div className="relative mb-3">
            <RiMailLine className="absolute left-2 top-3 text-zinc-900" />
            <Field
              type="email"
              name="email"
              className="py-2 pl-8 pr-4 bg-white w-full outline-none rounded-2xl mb-4"
              placeholder="E-mail"
            />
          </div>
          <div className="relative mb-4">
            <RiLockLine className="absolute left-2 top-3 text-zinc-900" />
            <Field
              type="text"
              name="password"
              className="py-2 px-8 bg-white w-full outline-none rounded-2xl mb-4 "
              placeholder="Password"
            />
          </div>

          <div className="relative mb-4">
            <RiLockLine className="absolute left-2 top-3 text-zinc-900" />
            <Field
              type="text"
              name="confirmPassword"
              className="py-2 px-8 bg-white w-full outline-none rounded-2xl mb-4 "
              placeholder="Confirm password"
            />
          </div>

          <div className="relative mb-4">
            <RiPhoneFill className="absolute left-2 top-3 text-zinc-900" />
            <Field
              type="text"
              name="confirmPassword"
              className="py-2 px-8 bg-white w-full outline-none rounded-2xl mb-4 "
              placeholder="Mobile phone"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-zinc-800 hover:bg-zinc-900 cursor-pointer font-bold text-white text-[18px] w-full py-3 px-4 rounded-lg transition-colors delay-50"
            >
              Create account
            </button>
          </div>
          <span></span>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterFormLanding;
