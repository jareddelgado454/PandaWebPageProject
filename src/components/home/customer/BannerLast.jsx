"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiArrowRightLine } from "react-icons/ri";
import { useDisclosure } from "@nextui-org/react";
import VerificationCodeModal from "@/components/LoginRegister/modals/VerificationCodeModal";
import { SigninModal } from '../modals/SigninModal';
import { SignupModal } from '../modals/SignupModal';
import AccessModal from "@/components/LoginRegister/modals/AccessCustomerModal";

const slides = [
  {
    src: "/image/technician4.png",
    header: (
      <h3>
        Connect with skilled, verified technicians for a variety of{" "}
        <span className="highlight">repairs</span> and services in your area.
      </h3>
    ),
    subtitle: "Find",
  },
  {
    src: "/image/technician6.jpg",
    header: (
      <h3>
        Schedule <span className="highlight">appointments</span>at your
        convenience through the app.
      </h3>
    ),
    subtitle: "Booking",
  },
  {
    src: "/image/technician3.webp",
    header: (
      <h3>
        Get upfront <span className="highlight">pricing</span> and stimates for
        services, so there are no surprises.
      </h3>
    ),
    subtitle: "Pricing",
  },
  {
    src: "/image/technician5.jpg",
    header: (
      <h3>
        Pay <span className="highlight">securely</span> through the app after
        the service is completed.
      </h3>
    ),
    subtitle: "Payment",
  },
];

const BannerLast = () => {
  const [dataSignUp, setDataSignIn] = useState({
    email: "",
    password: "",
  });
  const [resultData, setResultData] = useState();
  const {
    isOpen: isSignInModalOpen,
    onOpen: onSignInModalOpen,
    onOpenChange: onSignInModalChange,
  } = useDisclosure();
  const {
    isOpen: isSignUpModalOpen,
    onOpen: onSignUpModalOpen,
    onOpenChange: onSignUpModalChange,
  } = useDisclosure();
  const {
    isOpen: isVerifyCodeModalOpen,
    onOpen: onVerifyCodeModalOpen,
    onOpenChange: onVerifyCodeModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isAccessCustomerModalOpen,
    onOpen: onAccessCustomerModalOpen,
    onOpenChange: onAccessCustomerModalOpenChange,
  } = useDisclosure();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      setProgress(0);
    }, 5000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 2 : 0));
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  return (
    <div className="relative w-full h-[750px] z-10" id="Home-Section">
      <div className="absolute inset-0 z-[-1]">
        <Image
          src={slides[currentSlide].src}
          layout="fill"
          objectFit="cover"
          alt={`Slide ${currentSlide + 1}`}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center">
        {/* Navbar */}
        <div className="w-[80%] flex flex-row items-center py-3 z-20">
          <Link href={"/"} className="flex flex-row gap-2 items-center">
            <Image
              src={"/panda.webp"}
              width={100}
              height={100}
              className="w-[60px] h-[50px]"
              alt="Panda_Logo_web"
            />
            <p className="text-meant text-[25px] font-chackra font-semibold">
              Customer
            </p>
          </Link>
        </div>

        <div className="flex flex-row justify-center items-center w-[80%] relative z-20">
          <div className="w-full flex flex-col gap-2 h-[65%] select-none">
            <p className="text-lightWhite font-black font-chackra tracking-[4px] xl:text-5xl text-4xl 2xl:text-6xl w-[70%]">
              {slides[currentSlide].header}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col items-center absolute bottom-10">
          <div className="flex w-[80%] justify-start mb-12 z-20 gap-4">
            <button
              onClick={onAccessCustomerModalOpen}
              className="flex items-center gap-2 bg-meant text-black py-3 px-6 rounded-lg hover:bg-green-500 transition"
            >
              <span className="font-chackra text-[25px] font-semibold">
                Access
              </span>
              <RiArrowRightLine className="text-[25px]" />
            </button>
          </div>
          <div className=" flex space-x-4 w-[80%] z-20 justify-between">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="flex flex-col items-start cursor-pointer flex-1"
                onClick={() => handleSlideChange(index)}
              >
                <p
                  className={`text-xs font-semibold mb-1 ${
                    index === currentSlide ? "text-meant" : "text-lightGray"
                  }`}
                >
                  {slide.subtitle}
                </p>

                <div
                  className={`relative w-full h-[2px] ${
                    index === currentSlide
                      ? "bg-meant"
                      : "bg-gray-500 opacity-50"
                  }`}
                >
                  {index === currentSlide && (
                    <div
                      className="absolute h-[2px] bg-meant transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AccessModal isOpen={isAccessCustomerModalOpen} onOpenChange={onAccessCustomerModalOpenChange}/>
      {/* <VerificationCodeModal
        isOpen={isVerifyCodeModalOpen}
        onOpenChange={onVerifyCodeModalOpenChange}
        dataSignIn={{ email: dataSignUp.email, password: dataSignUp.password }}
        resultData={resultData}
        roleSelected={"customer"}
      />
      <SigninModal
        isOpen={isSignInModalOpen}
        onOpenChange={onSignInModalChange}
        setDataSignIn={setDataSignIn}
        onOpenVerifyModal={onVerifyCodeModalOpen}
        user={"customer"}
      />
      <SignupModal
        isOpen={isSignUpModalOpen}
        onOpen={onSignUpModalOpen}
        onOpenChange={onSignUpModalChange}
        setDataSignIn={setDataSignIn}
        onOpenVerifyModal={onVerifyCodeModalOpen}
        setResultData={setResultData}
        user={"customer"}
      /> */}
    </div>
  );
};

export default BannerLast;
