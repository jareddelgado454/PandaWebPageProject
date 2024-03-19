"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  signInWithRedirect,
  signUp,
} from "aws-amplify/auth";
import validationSignUp from "./validationSignUp";
import {
  RiGoogleFill,
  RiAppleFill,
  RiFacebookCircleFill,
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiUser3Line ,
  RiErrorWarningFill 
} from "react-icons/ri";
import VerificationCodeModal from "@/components/LoginRegister/modals/VerificationCodeModal";
import { useDisclosure } from "@nextui-org/react";
import { handleCreateUserOnDatabase } from "@/api";
const SignUp = () => {
  const status = "inactive";
  const [showPassword, setShowPassword] = useState(false);
  const [messageDataMissing, setMessageDataMissing] = useState(false);
  const [dataSignUp, setDataSignUp] = useState({
    fullName : "",
    email : "",
    password : "",
    confirmPassword : "",
    rol : "",
    agreed: false
  });
  const [errors, setErrors] = useState({});
  let initialValue = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "",
    agreed: false
  };

  const {
    isOpen: isVerifyCodeModalOpen,
    onOpen: onVerifyCodeModalOpen,
    onOpenChange: onVerifyCodeModalOpenChange,
  } = useDisclosure();

  const evaluateErrors = () => {
    return (errors.email && dataSignUp.email !="") || (errors.fullName && dataSignUp.fullName != "") || (errors.password && dataSignUp.password != "") || (errors.confirmPassword && dataSignUp.confirmPassword != "");
  }

  const onHandleCreate = async (values) => {
    try {
      const { userId, nextStep } = await signUp({
        // username: values.email,
        username: values.fullName,
        password: values.password,
        options: {
          userAttributes: {
            email: values.email,
            // "custom:role": values.rol,
          },
        },
      });
      // await handleCreateUserOnDatabase({ ...values, userId, status });
      // console.log("nextStep", nextStep);
      // if (nextStep?.signUpStep == "CONFIRM_SIGN_UP") {
      //   onVerifyCodeModalOpen();
      // }
    } catch (error) {
      if (
        error.message.includes(
          "An account with the given email already exists."
        )
      ) {
        alert(
          "This email address is already registered. Please use a different email address."
        );
      } else {
        console.log("Unknown error occurred:", error);
    console.log(errors);
    console.log(dataSignUp);
    if( !evaluateErrors() && (dataSignUp.fullName != "" && dataSignUp.email != "" && dataSignUp.password != "" && dataSignUp.confirmPassword != "" && dataSignUp.rol != "" && dataSignUp.agreed )){
      console.log("podes registrarte no hay errores")
      setMessageDataMissing(false);
      try {
        const { userId, nextStep } = await signUp({
          username: values.email,
          password: values.password,
          options: {
            userAttributes: {
              email: values.email,
              "custom:role": values.rol,
            },
          },
        });
        await handleCreateUserOnDatabase({ ...values, userId, status });
        console.log("nextStep", nextStep);
        if (nextStep?.signUpStep == "CONFIRM_SIGN_UP") {
          onVerifyCodeModalOpen();
        }
      } catch (error) {
        if (
          error.message.includes(
            "An account with the given email already exists."
          )
        ) {
          alert(
            "This email address is already registered. Please use a different email address."
          );
        } else {
          console.log("Unknown error occurred:", error);
        }
      }
    }else{
      if(dataSignUp.rol == ""){
        console.log("You have not selected an account type ")
      }
      if(!dataSignUp.agreed){
        console.log("You need to agree the terms and conditions ")
      }
      setMessageDataMissing(true);
    }
  };
  return (
    <div className="w-full text-white flex justify-center items-center">
      <div className="container px-4 md:px-0 mx-auto bg-zinc-800">
        <div className="w-full">
          <div className=" flex flex-col border-b-[2px] border-gray-600 mb-6 pb-4 pt-6">
            <p className="text-white mb-3">
              Do you already have an account?{" "}
              <Link
                className="hover:text-emerald-400 text-emerald-300 text-[18px] font-bold hover:font-bold cursor-pointer"
                href="/auth/signin"
              >
                Login here
              </Link>
            </p>
          </div>
          <div className="mb-3">
            <h2 className="text-[30px] font-bold">SIGN-UP</h2>
            <p>enter with your account</p>
          </div>
        </div>
        <Formik initialValues={initialValue} onSubmit={onHandleCreate} >
          {({ handleSubmit, setFieldValue }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row flex-nowrap mb-10 pt-4"
            >
              <div className="w-full md:w-2/4 flex flex-col">
                <div className="w-full flex items-center justify-between mb-4">
                  <button
                    onClick={() => signInWithRedirect({ provider: "Google" })}
                    className="w-[30%]  bg-zinc-900 hover:bg-zinc-700 hover:shadow-xl transition-colors delay-50  mb-2  hover:text-white text-white rounded-2xl flex gap-x-1 items-center justify-center py-3 px-5"
                  >
                    <RiGoogleFill className="text-[20px] text-red-400" /> Google
                  </button>
                  <button
                    onClick={() => signInWithRedirect({ provider: "Facebook" })}
                    className="w-[30%] bg-zinc-900 hover:bg-zinc-700 hover:shadow-xl transition-colors delay-50 text-[15px]  mb-2  hover:text-white text-white rounded-2xl flex gap-x-1 items-center justify-center py-3 "
                  >
                    <RiFacebookCircleFill className="text-[20px] text-blue-400" />{" "}
                    Facebook
                  </button>
                  <button
                    onClick={() => signInWithRedirect({ provider: "Google" })}
                    className="w-[30%] bg-zinc-900 hover:bg-zinc-700 hover:shadow-xl transition-colors delay-50  mb-2  hover:text-white text-white rounded-2xl flex gap-x-1 items-center justify-center py-3 px-5"
                  >
                    <RiAppleFill className="text-[20px]" /> Apple
                  </button>
                </div>
                <div className="w-full flex items-center justify-center mb-3">
                    <h3 className="text-[20px] font-bold text-center">or</h3>
                </div>
                <label htmlFor="fullName">Full Name: <span className="text-red-400">*</span></label>
                <div className="w-full relative mb-1 text-[17px]">
                  <RiUser3Line  className={`absolute left-2 top-4 ${ errors.fullName && dataSignUp.fullName != "" ? "text-red-400" : "text-emerald-400"} `} />
                  <Field
                    id="fullName"
                    type="text"
                    name="fullName"
                    onChange={(e)=>{
                      setFieldValue("fullName", e.target.value);
                      setDataSignUp({...dataSignUp, fullName : e.target.value});
                    }}
                    placeholder="Fullname"
                    className={`py-3 pl-8 pr-4 bg-zinc-700 border-[1px] ${ errors.fullName && dataSignUp.fullName != "" ? "border-red-400 focus:border-red-400" : "border-zinc-700"}  focus:border-emerald-500 w-full outline-none rounded-2xl `}
                  />
                </div>
                <p className="text-red-400 mb-2 text-[14px]">
                    {
                        dataSignUp.fullName !==''  && errors.fullName
                        ?errors.fullName
                        :<span className="text-transparent">.</span>
                    }
                </p>
                <label htmlFor="email">Email: <span className="text-red-400">*</span></label> 
                <div className="w-full relative mb-1 text-[17px]">
                  <RiMailLine className={`absolute left-2 top-4 ${errors.email && dataSignUp.email != "" ? "text-red-500" : "text-emerald-400" } `} />
                  <Field
                    id="email"
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    onChange={(e) => {
                      setFieldValue("email", e.target.value);
                      setDataSignUp({...dataSignUp, email: e.target.value});
                    }}
                    className={`py-3 pl-8 pr-4 bg-zinc-700 border-[1px] ${errors.email && dataSignUp.email != "" ? "border-red-400 focus:border-red-400"  : "border-zinc-700 focus:border-emerald-500"}  w-full outline-none rounded-2xl `}
                  />
                </div>
                <p className="text-red-400 mb-2 text-[14px]">
                    {
                        dataSignUp.email !=='' && errors.email
                        ?errors.email
                        :<span className="text-transparent">.</span>
                    }
                </p>
                <label htmlFor="password-grid">Password: <span className="text-red-400">*</span></label>
                <div className="w-full relative mb-1 text-[17px]">
                  <RiLockLine className={`absolute left-2 top-4 ${errors.password && dataSignUp.password != "" ? "text-red-500" : "text-emerald-400" } `} />
                  <Field
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setFieldValue("password", e.target.value);
                      setDataSignUp({...dataSignUp, password : e.target.value});
                    }}
                    className={`py-3 px-8 bg-zinc-700 border-[1px] ${errors.password && dataSignUp.password != "" ? "border-red-500 focus:border-red-500" : "border-zinc-700 focus:border-emerald-500"}  w-full outline-none rounded-2xl `} 
                  />
                  {showPassword ? (
                      <RiEyeOffLine
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-6 -translate-y-1/2 right-2 hover:cursor-pointer text-emerald-400"
                      />
                      ) : (
                        <RiEyeLine
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute top-6 -translate-y-1/2 right-2 hover:cursor-pointer text-emerald-400"
                        />
                  )}
                
                </div>
                <p className="text-red-400 mb-2 text-[14px]">
                    {
                        dataSignUp.password !==''  && errors.password
                        ?errors.password
                        :<span className="text-transparent">.</span>
                    }
                </p>
                <label htmlFor="confirm-password-grid">
                    Confirm Password: <span className="text-red-400">*</span>
                  </label>
                <div className="w-full relative mb-1 text-[17px]">
                  <RiLockLine className={`absolute left-2 top-4 ${errors.confirmPassword && dataSignUp.confirmPassword != ""  ? "text-red-500" : "text-emerald-400"}  `} />
                  <Field
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    onChange={(e) => {
                      setFieldValue("confirmPassword", e.target.value);
                      setDataSignUp({...dataSignUp, confirmPassword : e.target.value});
                    }}
                    placeholder="Confirm the password"
                    className={`py-3 px-8 bg-zinc-700 border-[1px] ${errors.confirmPassword && dataSignUp.confirmPassword != ""  ? "border-red-500 focus:border-red-500 " : "border-zinc-700 focus:border-emerald-500" }  w-full outline-none rounded-2xl `}
                  />
                  {showPassword ? (
                      <RiEyeOffLine
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-6 -translate-y-1/2 right-2 hover:cursor-pointer text-emerald-400"
                      />
                      ) : (
                        <RiEyeLine
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute top-6 -translate-y-1/2 right-2 hover:cursor-pointer text-emerald-400"
                        />
                  )}
                </div>
                <p className="text-red-400 mb-2 text-[14px]">
                    {
                        dataSignUp.confirmPassword !==''  && errors.confirmPassword
                        ?errors.confirmPassword
                        :<span className="text-transparent">.</span>
                    }
                </p>
              </div>
              <div className="w-full md:w-2/4 flex justify-center items-center">
                <div className="w-[450px] bg-zinc-700 p-5 rounded-md mb-6 pb-8">
                  <h2 className="text-4xl font-bold mb-3">Account settings</h2>
                  <p className="mb-1">
                    Choose your account type:{" "}
                    <span className="text-red-400">*</span>
                  </p>
                  <Field
                    as="select"
                    id="rol"
                    name="rol"
                    onChange = {(e)=>{
                        setFieldValue("rol", e.target.value);
                        setDataSignUp({...dataSignUp, rol : e.target.value})
                    }}
                    className="block w-full bg-zinc-800 text-white py-3 px-4 rounded-lg mb-2"
                  > 
                    <option className="text-white" value="" disabled selected>
                      Select an option
                    </option>
                    <option className="text-white" value="customer">
                      Customer
                    </option>
                    <option className="text-white" value="technician">
                      Technician
                    </option>
                  </Field>

                  <p className="text-[12px] font-light text-gray-100">
                    <span className="text-[14px] font-bold text-white">
                      Customer account:
                    </span>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries.
                  </p>

                  <p className="text-[12px] font-light text-gray-100 mb-3">
                    <span className="text-[14px] font-bold text-white">
                      Technician account:
                    </span>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries.
                  </p>

                  <div className="flex items-center gap-x-2 mb-2">
                        <Field
                             type="radio"
                             name="agreed"
                             value="agreed"
                             checked={dataSignUp.agreed}
                             onChange={(e) => setDataSignUp({ ...dataSignUp, agreed: e.target.checked })}
                             className="rounded border-emerald-400 focus:ring-emerald-400 focus:border-emerald-400"
                         />
                         <p className='text-white'>Check here to accept the <span className='text-emerald-300 cursor-pointer font-semibold'>Terms and conditions</span></p>
                  </div>
                  <button
                    type="submit"
                    className={`w-full py-3 text-[19px] ${(errors.email && dataSignUp.email !="") || (errors.fullName && dataSignUp.fullName != "") || (errors.password && dataSignUp.password != "") || (errors.confirmPassword && dataSignUp.confirmPassword != "") ? "bg-red-500" : "bg-emerald-500"}  hover:bg-emerald-500/90 transition-colors rounded-lg text-white`}
                  >
                    Create account
                  </button>
                  {
                    messageDataMissing && 
                    <div className="bg-red-500 text-white flex w-full justify-center gap-x-2 p-4 mt-5">
                        <RiErrorWarningFill className="w-[30%] text-[35px]" />
                        <p>All fields must be completed correctly, you must also select the type of account and accept the terms and conditions</p>
                    </div>
                  }
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <VerificationCodeModal
        isOpen={isVerifyCodeModalOpen}
        onOpenChange={onVerifyCodeModalOpenChange}
        dataSignIn={{ email: dataSignUp.email, password: dataSignUp.password }}
      />
    </div>
  );
};

export default SignUp;