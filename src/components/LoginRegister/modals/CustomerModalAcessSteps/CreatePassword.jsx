import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { MdArrowForward } from "react-icons/md";


const CreatePassword = ({ email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState({
    password: false,
    confirmPassword: false,
  });

  const handlePasswordSubmit = () => {
    if (password === confirmPassword) {
      console.log("Password created for:", email, password);
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

  const isButtonDisabled = password === "" || confirmPassword === "";

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

      <h4 className="font-jost text-white text-[20px] w-full text-center mt-2">
        Create a password:
      </h4>
      <h4 className="font-jost text-zinc-300 text-[15px] w-full text-center mb-4">
        Password must be at least 10 characters.
      </h4>

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
        disabled={isButtonDisabled}
        className={`w-full flex items-center justify-center text-black font-jost font-semibold text-[16px] py-4 mt-4 ${
          isButtonDisabled ? "bg-zinc-500/60" : "bg-zinc-200"
        }`}
        onPress={handlePasswordSubmit}
      >
        Continue <MdArrowForward className="ml-2" />
      </Button>
    </>
  );
};

export default CreatePassword;