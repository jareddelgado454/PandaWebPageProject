import React, { useState, useEffect, useContext } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  fetchAuthSession,
  fetchUserAttributes,
  signIn,
} from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { UserContext } from "@/contexts/user/UserContext";
import { useRouter } from "next/navigation";
import { getCustomerById, getTechnicianById } from "@/api";

const AccessWithEmail = ({
  onSwitchToVerificationCode,
  onSwitchToCreateAccount,
  goBack,
  setDataSignIn,
  isLoading,
  setIsLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(UserContext);
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    console.log("Login tryng");
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (password.trim() === "") {
      setErrorMessage("Please enter a password.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    try {
      const { nextStep } = await signIn({
        username: email,
        password: password,
        options: {
          authFlowType: "USER_SRP_AUTH",
        },
      });
      setDataSignIn({
        email,
        password,
      });
      if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
        setIsLoading(false);
        onSwitchToVerificationCode();
        toast.error("Please confirm your sign-up.");
        return;
      } else if(nextStep?.signInStep === "DONE") {
          console.log("iniciando sesion");
          const { role, expiredAt, userSub } = await currentAuthenticatedUser();
          const data = await getCustomerById(userSub);
          login({ role, expiredAt, id: userSub, ...data });
          setIsLoading(false);
          router.push("/customer");
      }

      // login({ email });
    } catch (error) {
      toast.error("Something went wrong. Please check your credentials.");
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (email && password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const currentAuthenticatedUser = async () => {
    try {
      const data = await fetchUserAttributes();
      const { tokens, userSub } = await fetchAuthSession();
      const expiredAt = tokens.accessToken.payload.exp;
      return { role: data["custom:role"], expiredAt, userSub };
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const hubListenerCancel = Hub.listen("auth", async ({ payload }) => {
  //     switch (payload.event) {
  //       case "signedIn":
  //         const { role, expiredAt, userSub } = await currentAuthenticatedUser();
  //         const data = await getCustomerById(userSub);
  //         login({ role, expiredAt, id: userSub, ...data });
  //         setIsLoading(false);
  //         router.push("/customer");
  //       default:
  //         break;
  //     }
  //   });
  //   return () => hubListenerCancel();
  // }, [router, login]);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goBack}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900"
        >
          <FaArrowLeft className="text-white" />
        </button>

        <div className="flex flex-row justify-center items-center mx-auto">
          <Image
            src="/panda.webp"
            width={45}
            height={45}
            alt="Logo"
            quality={100}
            className="mr-1"
          />
          <h3 className="text-emerald-400 font-chackra font-semibold text-[27px]">
            The Panda
          </h3>
        </div>
      </div>

      <p className="text-white mb-4">Enter your email and password</p>

      {/* Input Email */}
      <div className="relative w-full mb-4">
        <label
          className={`absolute left-3 -top-2.5 transition-all duration-300 px-1 pointer-events-none text-sm
            ${
              isEmailFocused || email
                ? "text-emerald-400 bg-zinc-950"
                : "text-gray-500 translate-y-7"
            } 
            ${errorMessage ? "text-red-500" : ""}`}
        >
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          className={`w-full outline-none p-2.5 bg-zinc-950/70 text-white rounded-lg border-2 transition-all duration-300
            ${isEmailFocused ? "border-emerald-400" : "border-zinc-600"} 
            ${errorMessage ? "border-red-500" : ""}`}
          style={{
            minHeight: "48px",
            lineHeight: "24px",
          }}
        />
      </div>

      {/* Input Password con ícono de mostrar/ocultar */}
      <div className="relative w-full mb-4">
        <label
          className={`absolute left-3 -top-2.5 transition-all duration-300 px-1 pointer-events-none text-sm
            ${
              isPasswordFocused || password
                ? "text-emerald-400 bg-zinc-950"
                : "text-gray-500 translate-y-7"
            } 
            ${errorMessage ? "text-red-500" : ""}`}
        >
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          className={`w-full outline-none p-2.5 bg-zinc-950/70 text-white rounded-lg border-2 transition-all duration-300
            ${isPasswordFocused ? "border-emerald-400" : "border-zinc-600"} 
            ${errorMessage ? "border-red-500" : ""}`}
          style={{
            minHeight: "48px",
            lineHeight: "24px",
          }}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-2"
        >
          {showPassword ? (
            <FaEyeSlash className="text-white" />
          ) : (
            <FaEye className="text-white" />
          )}
        </button>
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <Button
        className={`w-full flex items-center justify-center font-jost font-semibold text-[16px] py-4 mt-4 ${
          isButtonDisabled
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-zinc-200 text-black"
        }`}
        onPress={handleLogin}
        disabled={isButtonDisabled}
        isLoading={isLoading}
      >
        Log in
      </Button>

      {/* Enlace para crear cuenta */}
      <div className="mt-4 mb-6">
        <p
          className="text-white cursor-pointer"
          onClick={onSwitchToCreateAccount}
        >
          Don't have an account? <span className="text-meant">Sign up</span>
        </p>
      </div>
    </>
  );
};

export default AccessWithEmail;
