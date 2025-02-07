"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
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
import { Formik, Form, Field } from "formik";
import {
  signIn,
  fetchUserAttributes,
  fetchAuthSession,
} from "aws-amplify/auth";
import VerificationCodeModal from "@/components/LoginRegister/modals/VerificationCodeModal";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { UserContext } from "@/contexts/user/UserContext";
import Image from "next/image";
import { getCustomerById, getTechnicianById } from "@/api";
import { NewPasswordModal } from "@/components/admin";
const SignIn = () => {
  const { login } = useContext(UserContext);
  const router = useRouter();
  const {
    isOpen: isVerifyCodeModalOpen,
    onOpen: onVerifyCodeModalOpen,
    onOpenChange: onVerifyCodeModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isNewPasswordModalOpen,
    onOpen: onNewPasswordModalOpen,
    onOpenChange: onNewPasswordModalOpenChange,
  } = useDisclosure();
  const { isOpen: isLoadingModalOpen, onOpen: onOpenLoadingModal } =
    useDisclosure();
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
          console.log("Login succesfull");
        } else {
          if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
            onVerifyCodeModalOpen();
          }else if (nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"){
            try {
              onNewPasswordModalOpen();
            } catch (error) {
              console.error(error);
            }
          } else {
            console.log("Error signing in. Please try again.");
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
  const currentAuthenticatedUser = async () => {
    try {
      const data = await fetchUserAttributes();
      const { tokens, userSub } = await fetchAuthSession();
      const expiredAt = tokens.accessToken.payload.exp;
      return { role: data['custom:role'], expiredAt, userSub };
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const hubListenerCancel = Hub.listen("auth", async ({ payload }) => {
      console.log(payload);
      switch (payload.event) {
        case "signedIn":
          onOpenLoadingModal(true);
          const { role, expiredAt, userSub } = await currentAuthenticatedUser();
          if (role === "admin") {
            login({ role, id: userSub }, { token: { expiredAt } })
            router.push("/admin-dashboard/");
          } else if (role === "technician") {
            const data = await getTechnicianById(userSub);
            login({ role, expiredAt, id: userSub, ...data });
            router.push("/user");
          } else if (role === "customer") {
            const data = await getCustomerById(userSub);
            login({ role, id: userSub, ...data }, { token: { expiredAt } });
            router.push("/customer");
          }

        default:
          break;
      }
    });
    return () => hubListenerCancel();
  }, [onOpenLoadingModal, router, login]);
  return (
    <>
      <CheckoutModal
        isOpen={isLoadingModalOpen}
        onOpenChange={onOpenLoadingModal}
      />
      <div className="h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 w-full text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100%-100px)]">
          <div className="flex flex-col gap-4 justify-center px-4 lg:px-12">
            <div className="my-4">
              <h2 className="text-[30px] font-bold">SIGN-IN</h2>
              <p>enter with your account</p>
            </div>

            <div className=" border-transparent flex flex-col border-t-[2px] border-zinc-600 pt-8"/>
            <Formik
              initialValues={initialValue}
              onSubmit={onHandleSubmit}
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
                    {"I don't remember my password,"}{" "}
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
                    {/* <button
                      type="button"
                      className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer font-bold text-white text-[18px] w-full py-3 px-4 rounded-lg transition-colors delay-50 mb-3"
                      onClick={signOut}
                    >
                      Signout
                    </button> */}
                    {errorMessage.status && (
                      <div className="bg-red-500 w-full text-white text-[16px] flex items-center gap-x-2 p-2 mb-3">
                        <RiErrorWarningFill className="text-[30px]" />
                        <p>{errorMessage.message}</p>
                      </div>
                    )}
                  </div>
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
                {
                  "We focus on customer acquisition and retention so you don't have"
                }
                to.
              </div>
            </div>
            <div className="absolute top-0 w-full h-full bg-gradient-to-b from-zinc-900 to-zinc-800 opacity-70"></div>
            <Image
              fill
              alt="background"
              src="/image/wallpaper.jpg"
              className="object-cover h-[calc(100%-100px)] md:h-[44rem] xl:h-full"
            />
          </div>
        </div>
        <VerificationCodeModal
          isOpen={isVerifyCodeModalOpen}
          onOpenChange={onVerifyCodeModalOpenChange}
          dataSignIn={dataPassed}
        />
        <NewPasswordModal
          isOpen={isNewPasswordModalOpen}
          onOpenChange={onNewPasswordModalOpenChange}
        />
      </div>
    </>
  );
};
export default SignIn;

const CheckoutModal = ({ isOpen, onOpenChange }) => {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === "...") {
          return "";
        } else {
          return prevDots + ".";
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton={true}
      classNames={{
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
      }}
    >
      <ModalContent>
        <ModalBody>
          <div className="flex flex-col justify-center items-center w-full h-full py-4 gap-4">
            <div className="flex items-center justify-center">
              <Image
                src="/panda.webp"
                className="w-[6rem] h-[5.5rem]"
                width={100}
                height={100}
                alt="panda_logo"
              />
              <p className="text-2xl font-black tracking-wider text-zinc-800">
                PANDA MARS
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-9">
              <p className="font-semibold text-lg w-[16rem] text-center">
                Please wait while we process your authentication.{dots}
              </p>
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
