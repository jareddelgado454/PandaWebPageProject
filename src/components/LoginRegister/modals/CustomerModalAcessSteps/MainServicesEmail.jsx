import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { MdArrowForward } from "react-icons/md";
import { FaApple, FaFacebook } from "react-icons/fa";
import Image from "next/image";
import { signInWithRedirect } from "aws-amplify/auth";

const MainServicesEmail = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = () => {
    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");
    onSubmit(email);
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center">
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
      <h4 className="font-jost text-white text-[20px] w-full text-center">
        Login or create an account with:
      </h4>

      <div className="flex flex-col justify-around mt-4 space-y-3">
        <Button
          className="font-jost flex items-center bg-raisinBlack text-white py-6"
          onPress={() => {
            signInWithRedirect({provider:"Google"})
          }}
        >
          <Image
            src="/icons/googleIcon.png"
            width={20}
            height={20}
            alt="google"
            className="mr-1"
          />
          <h4 className="flex flex-1 text-center justify-center text-[16px]">
            Continue with Google
          </h4>
        </Button>
        <Button
          className="font-jost flex items-cente bg-raisinBlack text-white py-6"
          onPress={() => {
            signInWithRedirect({provider:"Apple"})
          }}
        >
          <FaApple className="mr-2 text-[22px]" />
          <h4 className="flex flex-1 text-center justify-center text-[16px]">
            Continue with Apple
          </h4>
        </Button>
        <Button
          className="font-jost flex items-center bg-raisinBlack text-white py-6"
          onPress={() => {
            signInWithRedirect({provider:"Facebook"})
          }}
        >
          <FaFacebook className="mr-2 text-[22px] text-blue-500" />
          <h4 className="flex flex-1 text-center justify-center text-[16px]">
            Continue with Facebook
          </h4>
        </Button>
      </div>

      <div className="flex items-center my-4">
        <div className="flex-grow border-b border-gray-600"></div>
        <span className="mx-2 text-white">or</span>
        <div className="flex-grow border-b border-gray-600"></div>
      </div>

      {/* Input para el email */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del email
        className={`w-full p-3 text-white bg-zinc-950/70 rounded-lg border-[1px] ${
          errorMessage ? "border-red-500" : "border-zinc-600"
        }`}
      />
      {/* Mensaje de error */}
      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}

      {/* Botón continuar */}
      <Button
        className="w-full flex items-center justify-center bg-zinc-200 text-black font-jost font-semibold text-[16px] py-4 mb-3"
        onPress={handleContinue}
      >
        Continue <MdArrowForward className="ml-2" />
      </Button>
      <p className="w-full text-center font-jost mb-6 text-[15px] text-zinc-400">
        By creating an account, you agree to the{" "}
        <span className="text-white cursor-pointer">Terms of Service</span>{" "}
        and{" "}
        <span className="text-white cursor-pointer">
        Privacy Policy
        </span>
        .
      </p>
    </>
  );
};

export default MainServicesEmail;
