"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import ErrorAlert from "@/components/LoginRegister/modals/ErrorAlert";
import { signUp } from "aws-amplify/auth";
import validationSignUp from "./validationSignUp";
import { handleCreateCustomerOnDataBase, handleCreateTechnicianOnDataBase } from "@/api";
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiUser3Line,
  RiErrorWarningFill,
} from "react-icons/ri";
import VerificationCodeModal from "@/components/LoginRegister/modals/VerificationCodeModal";
import { useDisclosure } from "@nextui-org/react";
import AmplifyContext from "@/contexts/AmplifyContext";
import { TermsAndConditionsModal } from "@/components/home";
const SignUp = () => {
  const status = "active";
  const [showPassword, setShowPassword] = useState(false);
  const [messageDataMissing, setMessageDataMissing] = useState(false);
  const [dataResult, setDataResult] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [dataSignUp, setDataSignUp] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [roleSelected, setRoleSelected] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorPassed, setErrorPassed] = useState("");

  useEffect(() => {
    if (
      dataSignUp.fullName != "" ||
      dataSignUp.email != "" ||
      dataSignUp.password != "" ||
      dataSignUp.confirmPassword != ""
    ) {
      setErrors(validationSignUp(dataSignUp));
    }
  }, [dataSignUp]);

  const {
    isOpen: isVerifyCodeModalOpen,
    onOpen: onVerifyCodeModalOpen,
    onOpenChange: onVerifyCodeModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isErrorAlertModalOpen,
    onOpen: onErrorAlertModalOpen,
    onOpenChange: onErrorAlertModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isTermsConditionsModalOpen,
    onOpen: onTermsConditionsModalOpen,
    onOpenChange: onTermsConditionsModalOpenChange,
  } = useDisclosure();

  const evaluateErrors = () => {
    return (
      (errors.email && dataSignUp.email != "") ||
      (errors.fullName && dataSignUp.fullName != "") ||
      (errors.password && dataSignUp.password != "") ||
      (errors.confirmPassword && dataSignUp.confirmPassword != "")
    );
  };

  const onHandleCreate = async (values) => {
    let isAdded = false;
    if (
      !evaluateErrors() &&
      dataSignUp.fullName !== "" &&
      dataSignUp.email !== "" &&
      dataSignUp.password !== "" &&
      dataSignUp.confirmPassword !== "" &&
      dataSignUp.role !== ""
    ) {
      setMessageDataMissing(false);
      try {
        const { userId, nextStep } = await signUp({
          username: values.email,
          password: values.password,
          options: {
            userAttributes: {
              email: values.email,
              "custom:role": values.role,
              "custom:fullName": values.fullName,
              "custom:status": status,
              "custom:subscription": values.role === "technician" ? "pending" : "",
              "custom:infoCompleted": "false",
              "custom:termsAccepted": isAccepted ? "true" : "false",
              "custom:profileCompleted": "false"
            },
          },
        });
        isAdded = true;
        let returnedData;
        switch (values.role) {
          case 'customer':
            returnedData = await onCreateCustomerToDB(userId, values, isAdded);
            setRoleSelected('customer');
            break;

          case 'technician':
            returnedData = await onCreateTechnicianToDB(userId, values, isAdded);
            setRoleSelected('technician')
            break;

          default:
            return;
        }
        setDataResult(returnedData);
        if (nextStep?.signUpStep === "CONFIRM_SIGN_UP") {
          onVerifyCodeModalOpen();
        }
      } catch (error) {
        console.log(error);
        if (error.name === "UsernameExistsException") {
          setErrorPassed("alreadyExists");
          onErrorAlertModalOpen();
        } else {
          setErrorPassed("unknownError");
          onErrorAlertModalOpen();
        }
      }
    } else {
      setMessageDataMissing(true);
    }
  };
  const onCreateCustomerToDB = async (userId, values, isAdded) => {
    try {
      const { createCustomer } = await handleCreateCustomerOnDataBase({
        id: userId,
        fullName: values.fullName,
        email: values.email,
        status,
      }, isAdded);
      return createCustomer;
    } catch (error) {
      console.error(error);
    }
  }
  const onCreateTechnicianToDB = async (userId, values, isAdded) => {
    try {
      const { createTechnician } = await handleCreateTechnicianOnDataBase({
        id: userId,
        fullName: values.fullName,
        email: values.email,
        status,
      }, isAdded);
      return createTechnician;
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <AmplifyContext>
      <TermsAndConditionsModal isOpen={isTermsConditionsModalOpen} onOpenChange={onTermsConditionsModalOpenChange} setIsAccepted={setIsAccepted} isAccepted={isAccepted} />
      <VerificationCodeModal
        isOpen={isVerifyCodeModalOpen}
        onOpenChange={onVerifyCodeModalOpenChange}
        dataSignIn={{ email: dataSignUp.email, password: dataSignUp.password }}
        resultData={dataResult}
        roleSelected={roleSelected}
      />
      <ErrorAlert
        isOpen={isErrorAlertModalOpen}
        onOpenChange={onErrorAlertModalOpenChange}
        error={errorPassed}
      />
      <div
        className="h-full w-full text-white px-8 pb-4"
      >
        <div className="w-full h-full flex flex-col lg:flex-row gap-4 flex-wrap">
          <div className="w-full">
            <div className="w-full">
              <div className="mb-3">
                <h2 className="text-[30px] font-bold">SIGN-UP</h2>
                <p>enter with your account</p>
              </div>
            </div>
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
          </div>
          <div className="w-full h-full">
            <Formik initialValues={{
              fullName: "",
              email: "",
              password: "",
              confirmPassword: "",
              role: "",
              agreed: false,
            }} onSubmit={onHandleCreate}>
              {({ handleSubmit, setFieldValue }) => (
                <Form
                  onSubmit={handleSubmit}
                  className="flex flex-col xl:flex-row flex-nowrap xl:justify-around justify-center h-full w-full gap-7"
                >
                  <div className="w-full xl:flex-1  flex flex-col  px-4 pt-6 order-2 xl:order-1">
                    <label htmlFor="fullName">
                      Full Name: <span className="text-red-400">*</span>
                    </label>
                    <div className="w-full relative mb-1 text-[17px]">
                      <RiUser3Line
                        className={`absolute left-2 top-4 ${errors.fullName && dataSignUp.fullName != ""
                          ? "text-red-400"
                          : "text-emerald-400"
                          } `}
                      />
                      <Field
                        id="fullName"
                        type="text"
                        name="fullName"
                        onChange={(e) => {
                          setFieldValue("fullName", e.target.value);
                          setDataSignUp({ ...dataSignUp, fullName: e.target.value });
                        }}
                        placeholder="Fullname"
                        className={`py-3 pl-8 pr-4 bg-zinc-700 border-[1px] ${errors.fullName && dataSignUp.fullName != ""
                          ? "border-red-400 focus:border-red-400"
                          : "border-zinc-700"
                          }  focus:border-emerald-500 w-full outline-none rounded-2xl `}
                      />
                    </div>
                    <p className="text-red-400 mb-2 text-[14px]">
                      {dataSignUp.fullName !== "" && errors.fullName ? (
                        errors.fullName
                      ) : (
                        <span className="text-transparent">.</span>
                      )}
                    </p>
                    <label htmlFor="email">
                      Email: <span className="text-red-400">*</span>
                    </label>
                    <div className="w-full relative mb-1 text-[17px]">
                      <RiMailLine
                        className={`absolute left-2 top-4 ${errors.email && dataSignUp.email != ""
                          ? "text-red-500"
                          : "text-emerald-400"
                          } `}
                      />
                      <Field
                        id="email"
                        type="email"
                        name="email"
                        placeholder="example@email.com"
                        onChange={(e) => {
                          setFieldValue("email", e.target.value);
                          setDataSignUp({ ...dataSignUp, email: e.target.value });
                        }}
                        className={`py-3 pl-8 pr-4 bg-zinc-700 border-[1px] ${errors.email && dataSignUp.email != ""
                          ? "border-red-400 focus:border-red-400"
                          : "border-zinc-700 focus:border-emerald-500"
                          }  w-full outline-none rounded-2xl `}
                      />
                    </div>
                    <p className="text-red-400 mb-2 text-[14px]">
                      {dataSignUp.email !== "" && errors.email ? (
                        errors.email
                      ) : (
                        <span className="text-transparent">.</span>
                      )}
                    </p>
                    <label htmlFor="password-grid">
                      Password: <span className="text-red-400">*</span>
                    </label>
                    <div className="w-full relative mb-1 text-[17px]">
                      <RiLockLine
                        className={`absolute left-2 top-4 ${errors.password && dataSignUp.password != ""
                          ? "text-red-500"
                          : "text-emerald-400"
                          } `}
                      />
                      <Field
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        onChange={(e) => {
                          setFieldValue("password", e.target.value);
                          setDataSignUp({ ...dataSignUp, password: e.target.value });
                        }}
                        className={`py-3 px-8 bg-zinc-700 border-[1px] ${errors.password && dataSignUp.password != ""
                          ? "border-red-500 focus:border-red-500"
                          : "border-zinc-700 focus:border-emerald-500"
                          }  w-full outline-none rounded-2xl `}
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
                      {dataSignUp.password !== "" && errors.password ? (
                        errors.password
                      ) : (
                        <span className="text-transparent">.</span>
                      )}
                    </p>
                    <label htmlFor="confirm-password-grid">
                      Confirm Password: <span className="text-red-400">*</span>
                    </label>
                    <div className="w-full relative mb-1 text-[17px]">
                      <RiLockLine
                        className={`absolute left-2 top-4 ${errors.confirmPassword && dataSignUp.confirmPassword != ""
                          ? "text-red-500"
                          : "text-emerald-400"
                          }  `}
                      />
                      <Field
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        onChange={(e) => {
                          setFieldValue("confirmPassword", e.target.value);
                          setDataSignUp({
                            ...dataSignUp,
                            confirmPassword: e.target.value,
                          });
                        }}
                        placeholder="Confirm the password"
                        className={`py-3 px-8 bg-zinc-700 border-[1px] ${errors.confirmPassword && dataSignUp.confirmPassword != ""
                          ? "border-red-500 focus:border-red-500 "
                          : "border-zinc-700 focus:border-emerald-500"
                          }  w-full outline-none rounded-2xl `}
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
                      {dataSignUp.confirmPassword !== "" && errors.confirmPassword ? (
                        errors.confirmPassword
                      ) : (
                        <span className="text-transparent">.</span>
                      )}
                    </p>
                    <button
                      type="submit"
                      disabled={!isAccepted}
                      className={`w-full py-3 text-[19px] ${isAccepted ? 'bg-emerald-500  hover:bg-emerald-500/90' : 'bg-emerald-100/90 text-zinc-950'} transition-colors rounded-lg text-white`}
                    >
                      Create account
                    </button>
                  </div>
                  <div className="w-full xl:w-1/3  flex  px-2 order-1 xl:order-2">
                    <div className="xl:w-[430px] w-full pt-6 flex flex-col">
                      <div className="w-full xl:w-[430px] bg-zinc-700 p-8 rounded-lg mb-6 pb-8 h-auto">
                        <h2 className="text-4xl font-bold mb-3">Account settings</h2>
                        <p className="mb-1">
                          Choose your account type:{" "}
                          <span className="text-red-400">*</span>
                        </p>
                        <Field
                          as="select"
                          id="role"
                          name="role"
                          onChange={(e) => {
                            setFieldValue("role", e.target.value);
                            setDataSignUp({ ...dataSignUp, role: e.target.value });
                          }}
                          className="block w-full bg-zinc-800 text-white py-3 px-4 rounded-lg mb-2"
                          value={dataSignUp.role}
                        >
                          <option className="text-white" value="">
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
                          {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."}
                        </p>

                        <p className="text-[12px] font-light text-gray-100 mb-3">
                          <span className="text-[14px] font-bold text-white">
                            Technician account:
                          </span>
                          {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."}
                        </p>

                        <div className="flex items-center gap-x-2 mb-2">
                          <p className="text-white">
                            Click here to accept the{" "}
                            <span className="text-emerald-300 hover:text-emerald-600 transition-all duration-300 cursor-pointer font-semibold" onClick={() => onTermsConditionsModalOpen()}>
                              Terms and conditions
                            </span>
                          </p>
                        </div>
                        {!isAccepted && <p className="mt-4 text-rose-600">You need to accept our terms and conditions.</p>}
                        {messageDataMissing && (
                          <div className="bg-red-500 text-white flex w-full justify-center gap-x-2 p-4 mt-5">
                            <RiErrorWarningFill className="w-[30%] text-[35px]" />
                            <p>
                              All fields must be completed correctly, you must also
                              select the type of account and accept the terms and
                              conditions
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </AmplifyContext>
  );
};

export default SignUp;
