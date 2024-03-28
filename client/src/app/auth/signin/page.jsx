"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RiGoogleFill,
  RiAppleFill,
  RiFacebookCircleFill,
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiMoneyDollarCircleLine,
  RiSmartphoneLine,
  RiListCheck3,
  RiErrorWarningFill,
} from "react-icons/ri";
import { Hub } from "aws-amplify/utils";
import VerificationCodeModal from "@/components/LoginRegister/modals/VerificationCodeModal";
import { useDisclosure } from "@nextui-org/react";
import { Formik, Form, Field } from 'formik'
import { signInWithRedirect, signIn, signOut, fetchUserAttributes, fetchAuthSession, updateUserAttributes } from 'aws-amplify/auth';
import AmplifyContext from '@/contexts/AmplifyContext';
import { handleCreateUserOnDatabase, handleRetrieveMyUser } from '@/api';
const SignIn = () => {
  const status = "inactive";
  const router = useRouter();
  const {isOpen: isVerifyCodeModalOpen, onOpen: onVerifyCodeModalOpen, onOpenChange: onVerifyCodeModalOpenChange} = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });
  const [dataPassed, setDataPassed] = useState({
    email: "",
    password: "",
  });
  const initialValue = {
    email: "",
    password: "",
  };
  const onHandleSubmit = async (values) => {
    setErrorMessage({
      status: false,
      message: "",
    });
    if (values.email != "" && values.password != "") {
      try {
        const { isSignedIn, nextStep } = await signIn({
          username: values.email,
          password: values.password,
          options: {
            authFlowType: "USER_SRP_AUTH",
          },
        });
        setDataPassed({ email: values.email, password: values.password });
        if (isSignedIn) {
          console.log("Login successfully");
        } else {
          if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
            onVerifyCodeModalOpen();
          } else {
            setError("Error signing in. Please try again.");
          }
        }
      } catch (error) {
        console.log(error);
        if (error.name == "UserNotFoundException") {
          setErrorMessage({
            status: true,
            message: "No account was found registered with this email",
          });
        } else if (error.name == "NotAuthorizedException") {
          setErrorMessage({
            status: true,
            message: "Incorrect username or password.",
          });
        } else {
          setErrorMessage({
            status: true,
            message: "There was an error, try again.",
          });
        }
      }
    } else {
      setErrorMessage({
        status: true,
        message: "You need to complete the fields to be able to log in",
      });
    }
  };
  async function currentAuthenticatedUser() {
    try {
      const { email, family_name, given_name } = await fetchUserAttributes();
      const { tokens } = await fetchAuthSession({ forceRefresh: true });
      const expiredAt = tokens.accessToken.payload.exp;
      const fullName = given_name + family_name;
      return { email, fullName, expiredAt };
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const hubListenerCancel = Hub.listen("auth", async ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
          console.log("user have been signedIn successfully.");
          const { fullName, email, expiredAt } = await currentAuthenticatedUser();
          const cognitoId = payload.data.userId;
          const userExist = await handleRetrieveMyUser(cognitoId);
          if (userExist !== null && userExist !== undefined) {
            console.log("user already in DB. Going to /user");
            Cookies.set("currentUser", JSON.stringify({...userExist, expiredAt}));
            if(userExist.rol === "admin")
            {
              router.replace("/admin-dashboard/");
            } else {
              router.replace("/user/");
            }
          } else {
            if(fullName){
              await updateUserAttributes({
                userAttributes: {
                    'custom:fullName': fullName,
                    'custom:status' : status
                }
              });
            }else{
              await updateUserAttributes({
                userAttributes: {
                    'custom:status' : status
                }
              });
            }
            
            await handleCreateUserOnDatabase({
              fullName,
              email,
              cognitoId,
              status,
            });
            Cookies.set("currentUser", JSON.stringify({...userExist, expiredAt}));
            router.replace("/user");
          }
          console.log("process completed");
          break;
      }
    });
    return () => hubListenerCancel();
  }, []);
  return (
    <AmplifyContext>
      <div className="h-screen w-full text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100%-100px)]">
          <div className="flex flex-col gap-4 justify-center px-4 lg:px-12">
            <div className="my-4">
              <h2 className="text-[30px] font-bold">SIGN-IN</h2>
              <p>enter with your account</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <button
                onClick={() =>
                  signInWithRedirect({
                    provider: "Google",
                    customState: "shopping-cart",
                  })
                }
                className="w-[30%]  bg-zinc-900 hover:bg-zinc-700 hover:shadow-xl transition-colors delay-50  mb-2  hover:text-white text-white rounded-2xl flex gap-x-1 items-center justify-center py-3 px-5"
              >
                <RiGoogleFill className="text-[20px] text-red-400" /> Google
              </button>
              <button
                onClick={() =>
                  signInWithRedirect({
                    provider: "Facebook",
                    customState: "shopping-cart",
                  })
                }
                className="w-[30%] bg-zinc-900 hover:bg-zinc-700 hover:shadow-xl transition-colors delay-50 text-[15px]  mb-2  hover:text-white text-white rounded-2xl flex gap-x-1 items-center justify-center py-3 "
              >
                <RiFacebookCircleFill className="text-[20px] text-blue-400" />{" "}
                Facebook
              </button>
              <button
                onClick={() =>
                  signInWithRedirect({
                    provider: "Apple",
                    customState: "shopping-cart",
                  })
                }
                className="w-[30%] bg-zinc-900 hover:bg-zinc-700 hover:shadow-xl transition-colors delay-50  mb-2  hover:text-white text-white rounded-2xl flex gap-x-1 items-center justify-center py-3 px-5"
              >
                <RiAppleFill className="text-[20px]" /> Apple
              </button>
            </div>
            <p className="w-full text-center text-[18px] font-semibold mb-3">
              or
            </p>

            <div className=" border-transparent flex flex-col border-t-[2px] border-zinc-600 pt-8 pb-4">
              <p className="text-white mb-3">
                You still don't have an account?{" "}
                <Link
                  className="hover:text-emerald-300 text-emerald-400 text-[18px] font-bold hover:font-bold cursor-pointer"
                  href="/auth/signup"
                >
                  Sign up here
                </Link>
              </p>
            </div>
            <Formik
              initialValues={initialValue}
              onSubmit={(values) => onHandleSubmit(values)}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="mb-7  w-full">
                  <div className="relative mb-3">
                    <RiMailLine className="absolute left-2 top-4 text-emerald-400" />
                    <Field
                      type="email"
                      name="email"
                      className="py-3 pl-8 pr-4 bg-zinc-700 border-[1px] border-zinc-700 focus:border-emerald-500 w-full outline-none rounded-2xl mb-4"
                      placeholder="E-mail"
                    />
                  </div>
                  <div className="relative">
                    <RiLockLine className="absolute left-2 top-4 text-emerald-400" />
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="py-3 px-8 bg-zinc-700 border-[1px] border-zinc-700 focus:border-emerald-500  w-full outline-none rounded-2xl mb-4 "
                      placeholder="Password"
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
                  <div className="text-white mb-4">
                    I don't remember my password,{" "}
                    <Link
                      href="/auth/password-recovery"
                      className="text-emerald-400 font-semibold cursor-pointer text-[19px] hover:text-emerald-300"
                    >
                      Recover it
                    </Link>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer font-bold text-white text-[18px] w-full py-3 px-4 rounded-lg transition-colors delay-50 mb-3"
                    >
                      Login
                    </button>
                    {errorMessage.status && (
                      <div className="bg-red-500 w-full text-white text-[16px] flex items-center gap-x-2 p-2 mb-3">
                        <RiErrorWarningFill className="text-[30px]" />
                        <p>{errorMessage.message}</p>
                      </div>
                    )}
                    <button type="button" onClick={signOut}>
                      Logout
                    </button>
                  </div>
                  <span></span>
                </Form>
              )}
            </Formik>
          </div>
          <div className="relative h-full lg:block hidden">
            <div className="absolute top-[40%] left-[5%] z-40 flex flex-col">
              <h3 className="text-[30px] font-bold mb-7">
                Benefit of The Panda
              </h3>
              <div className="flex items-center text-[18px] gap-x-3 font-semibold mb-3">
                <RiMoneyDollarCircleLine className="text-emerald-400 text-[35px]" />
                We provide a source of economic power for mobile mechanics.
              </div>
              <div className="flex items-center text-[18px] gap-x-3 font-semibold mb-3">
                <RiSmartphoneLine className="text-emerald-400 text-[35px]" />
                We are the best customer management tool for mobile mechanics.
              </div>
              <div className="flex items-center text-[18px] gap-x-3 font-semibold mb-3">
                <RiListCheck3 className="text-emerald-400 text-[35px]" />
                We focus on customer acquisition and retention so you don't have
                to.
              </div>
            </div>
            <div className="absolute top-0 w-full h-full bg-zinc-800 opacity-60"></div>
            <img
              src="https://cdna.artstation.com/p/assets/images/images/040/174/900/large/fabian-geyer-wideshotright.jpg?1628083532"
              className="object-cover h-[calc(100%-100px)] md:h-[44rem] xl:h-full"
            />
          </div>
        </div>
        <VerificationCodeModal
          isOpen={isVerifyCodeModalOpen}
          onOpenChange={onVerifyCodeModalOpenChange}
          dataSignIn={dataPassed}
        />
      </div>
    </AmplifyContext>
  );
};

export default SignIn;
