"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import googleIcon from "../../../public/icons/googleIcon.png";
import { FaFacebookF, FaApple } from "react-icons/fa6";
import { RiMailLine, RiUser3Fill, RiQuestionLine } from "react-icons/ri";
import { signInWithRedirect } from "aws-amplify/auth";

const AuthOption = ({ isOpen, onOpenChange, mode }) => {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="md"
      placement="center"
    >
      <ModalContent className="bg-zinc-900 text-white border-[2px] border-gray-700">
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center gap-x-2 pt-8 pr-8 pl-8">
              Accessing
            </ModalHeader>
            <ModalBody className="w-full flex flex-col items-center justify-center pt-6 pr-8 pl-8 pb-8">
              <div className=" w-full flex flex-col">
                <div
                  onClick={() =>
                    signInWithRedirect({
                      provider: "Google",
                      customState: "shopping-cart",
                    })
                  }
                  className="w-full py-3 px-4  hover:bg-zinc-800 transition-colors flex items-center gap-x-3 border-[1px] border-gray-600 rounded-3xl text-[18px] mb-3 cursor-pointer shadow-md"
                >
                  <div className="w-[28px] h-[28px] flex items-center justify-center ">
                    <Image
                      src={googleIcon}
                      className="w-[30px] h-[30px]"
                      placeholder="blur"
                      sizes="100vw"
                      quality={100}
                    />
                  </div>{" "}
                  Continue with Google
                </div>
                <div
                  onClick={() =>
                    signInWithRedirect({
                      provider: "Apple",
                      customState: "shopping-cart",
                    })
                  }
                  className="w-full py-3 px-4  hover:bg-zinc-800 transition-colors flex items-center gap-x-3 border-[1px] border-gray-600 rounded-3xl text-[18px] mb-3 cursor-pointer shadow-md"
                >
                  <FaApple className="text-[28px] font text-gray-200" />{" "}
                  Continue with Apple
                </div>
                <div
                  onClick={() =>
                    signInWithRedirect({
                      provider: "Facebook",
                      customState: "shopping-cart",
                    })
                  }
                  className="w-full py-3 px-4  hover:bg-zinc-800 transition-colors flex items-center gap-x-3 border-[1px] border-gray-600 rounded-3xl text-[18px] mb-3 cursor-pointer shadow-md"
                >
                  <div className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-blue-600">
                    <FaFacebookF className="text-[22px] font text-gray-200" />
                  </div>{" "}
                  Continue with Facebook
                </div>
                <Link
                  href={"/auth/signin"}
                  className="w-full py-3 px-4 0 hover:bg-zinc-800 transition-colors flex items-center gap-x-3 border-[1px] border-gray-600 rounded-3xl text-[18px] mb-3 cursor-pointer shadow-md"
                >
                  <RiMailLine className="text-[28px] font text-gray-300" />{" "}
                  Continue with email
                </Link>
                <div className="w-full flex text-center justify-center mb-3">
                  or
                </div>
                <Link
                  href={"/guest"}
                  className="w-full py-3 px-4   hover:bg-zinc-800 transition-colors flex items-center gap-x-3 border-[1px] border-gray-600 rounded-3xl text-[18px] text-gray-200 mb-3 cursor-pointer shadow-md"
                >
                  <RiQuestionLine className="text-[28px] font text-gray-500" />{" "}
                  Continue as a guest
                </Link>
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AuthOption;
