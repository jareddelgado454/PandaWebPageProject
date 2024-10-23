import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import { signUp } from "aws-amplify/auth";
const CreateAccountTechnician = ({ onSwitchToVerificationCode, goBack, setDataSignIn, isLoading, setIsLoading }) => {
  const [fullName, setFullName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleCreateAccountCustomer = async () => {
    if (password === confirmPassword) {
      setIsLoading(true);
      try {
        const { userId, nextStep } = await signUp({
          username: email,
          password: password,
          options: {
              userAttributes: {
                  email: email,
                  "custom:role": "technician",
                  "custom:fullName": fullName,
                  "custom:status": "active",
                  "custom:termsAccepted": "true",
                  "custom:profileCompleted": "false"
              },
          },
        });
        setDataSignIn({
          userId,
          email,
          fullName,
          password
        });
        setIsLoading(false);
        if (nextStep?.signUpStep === "CONFIRM_SIGN_UP") {
          onSwitchToVerificationCode();
          console.log("necesitas ir a buscar el codigo d everificacion a tu email")
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("Passwords do not match");
    }
  };

  const handleFocus = (field, focused) => {
    setIsFocused({ ...isFocused, [field]: focused });
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setIsPasswordVisible(!isPasswordVisible);
    } else {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }
  };

  const isButtonDisabled = !fullName || email === "" || password === "" || confirmPassword === "";

  return (
    <>
      <div className="flex items-center ">
        <button onClick={goBack} className="p-2">
          <MdArrowBack className="text-white text-2xl" />
        </button>
        <div className="flex flex-grow justify-center">
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

      <h4 className="font-jost text-white text-[20px] w-full mt-2">
        Create your account:
      </h4>
      <h4 className="font-jost text-zinc-300 text-[15px] w-full mb-2">
        Complete all fields correctly.
      </h4>

      {/* Input para el nombre completo */}
      <div className="relative w-full mb-4">
        <label
          className={`font-jost absolute left-3 top-3 transition-all duration-300 text-zinc-300 pointer-events-none ${
            isFocused.fullName || fullName ? 'text-xs top-[2px] text-zinc-500' : 'text-base'
          }`}
        >
          Full Name
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onFocus={() => handleFocus("fullName", true)}
          onBlur={() => handleFocus("fullName", false)}
          className={`w-full p-3 text-white bg-zinc-950/70 rounded-lg border-[2px] outline-none transition-all duration-300 ${
            isFocused.fullName || fullName ? "border-emerald-400" : "border-zinc-600"
          }`}
        />
      </div>

      {/* Input para el email */}
      <div className="relative w-full mb-4">
        <label
          className={`font-jost absolute left-3 top-3 transition-all duration-300 text-zinc-300 pointer-events-none ${
            isFocused.email || email ? 'text-xs top-[2px] text-zinc-500' : 'text-base'
          }`}
        >
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => handleFocus("email", true)}
          onBlur={() => handleFocus("email", false)}
          className={`w-full p-3 text-white bg-zinc-950/70 rounded-lg border-[2px] outline-none transition-all duration-300 ${
            isFocused.email || email ? "border-emerald-400" : "border-zinc-600"
          }`}
        />
      </div>

      {/* Input para la contraseña */}
      <div className="relative w-full mb-4">
        <label
          className={`font-jost absolute left-3 top-3 transition-all duration-300 text-zinc-300 pointer-events-none ${
            isFocused.password || password ? 'text-xs top-[2px] text-zinc-500' : 'text-base'
          }`}
        >
          Password
        </label>
        <input
          type={isPasswordVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => handleFocus("password", true)}
          onBlur={() => handleFocus("password", false)}
          className={`w-full p-3 text-white bg-zinc-950/70 rounded-lg border-[2px] outline-none transition-all duration-300 ${
            isFocused.password || password ? "border-emerald-400" : "border-zinc-600"
          }`}
        />
        {password && (
          <span
            className="font-jost absolute right-3 text-[13px] top-3 text-blue-200 cursor-pointer underline"
            onClick={() => togglePasswordVisibility("password")}
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </span>
        )}
      </div>

      {/* Input para confirmar la contraseña */}
      <div className="relative w-full mb-4">
        <label
          className={`font-jost absolute left-3 top-3 transition-all duration-300 text-zinc-300 pointer-events-none ${
            isFocused.confirmPassword || confirmPassword ? 'text-xs top-[2px] text-zinc-500' : 'text-base'
          }`}
        >
          Confirm Password
        </label>
        <input
          type={isConfirmPasswordVisible ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => handleFocus("confirmPassword", true)}
          onBlur={() => handleFocus("confirmPassword", false)}
          className={`w-full p-3 text-white bg-zinc-950/70 rounded-lg outline-none transition-all duration-300 border-[2px] ${
            isFocused.confirmPassword || confirmPassword ? "border-emerald-400 " : "border-zinc-700"
          }`}
        />
        {confirmPassword && (
          <span
            className="font-jost absolute right-3 top-3 text-[13px] text-blue-200 cursor-pointer underline"
            onClick={() => togglePasswordVisibility("confirmPassword")}
          >
            {isConfirmPasswordVisible ? "Hide" : "Show"}
          </span>
        )}
      </div>

      <Button
        disabled={isButtonDisabled || isLoading}
        className={`w-full flex items-center justify-center text-black font-jost font-semibold text-[16px] py-4 mt-4 ${
          isButtonDisabled ? "bg-zinc-500/60" : "bg-zinc-200"
        }`}
        onPress={handleCreateAccountCustomer}
        isLoading={isLoading}
      >
        Continue <MdArrowForward className="ml-2" />
      </Button>
      <p className="w-full  font-jost mb-2 text-[15px] text-zinc-400">
        By creating an account, you agree to the{" "}
        <span className="text-white cursor-pointer">Terms of Service</span>{" "}
        and{" "}
        <span className="text-white cursor-pointer">
        Privacy Policy
        </span>
        .
      </p>
      <div className="mt-2 mb-6">
        <p className="text-white text-sm">
          You already have an account?{" "}
          <span
            onClick={goBack}
            className="text-meant cursor-pointer font-semibold"
          >
            Sign in
          </span>
        </p>
      </div>
    </>
  );
};

export default CreateAccountTechnician;
