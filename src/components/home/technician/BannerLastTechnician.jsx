"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiArrowRightLine } from "react-icons/ri";
import { useDisclosure } from "@nextui-org/react";
import { SigninModal } from "../modals/SigninModal";
import { SignupModal } from "../modals/SignupModal";
import VerificationCodeModal from "@/components/LoginRegister/modals/VerificationCodeModal";
import AccessTechnicianModal from "@/components/LoginRegister/modals/AccessTechnicianModal";

// Lista de imágenes y títulos con resaltado
const slides = [
  {
    src: "/image/technician4.png",
    header: (
      <h3>
        Ready to <span className="highlight">revolutionize</span> your auto
        repair career with the Technician App?
      </h3>
    ),
    subtitle: "Main",
  },
  {
    src: "/image/technician6.jpg",
    header: (
      <h3>
        The app connects you with customers who need your{" "}
        <span className="highlight">skills</span>, providing job opportunities.
      </h3>
    ),
    subtitle: "Jobs",
  },
  {
    src: "/image/technician3.webp",
    header: (
      <h3>
        Take <span className="highlight">control</span> of your time with easy
        job booking and appointment management features.
      </h3>
    ),
    subtitle: "Schedule",
  },
  {
    src: "/image/technician5.jpg",
    header: (
      <h3>
        You&apos;re not limited to word-of-mouth referrals. Reach a broader{" "}
        <span className="highlight">audience</span> looking for technicians like
        you.
      </h3>
    ),
    subtitle: "Expand",
  },
];

const BannerLastTechnician = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const [dataSignUp, setDataSignIn] = useState({
    email: "",
    password: "",
  });
  const [resultData, setResultData] = useState();
  const {
    isOpen: isAccessTechnicianOpen,
    onOpen: onAccessTechnicianOpen,
    onOpenChange: onAccessTechnicianOpenChange,
  } = useDisclosure();

  useEffect(() => {
    // Temporizador para cambiar de slide
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      setProgress(0);
    }, 5000);

    // Temporizador para la animación del status bar
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
        {/* Fondo oscuro sobre la imagen con opacidad */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Contenido principal */}
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
              Technician
            </p>
          </Link>
        </div>

        <div className="flex flex-row justify-center items-center w-[80%] relative z-20">
          <div className="w-full flex flex-col gap-2 h-[65%] select-none">
            <p className="text-lightWhite font-black font-chackra tracking-[4px] text-3xl 2xl:text-6xl w-[70%]">
              {slides[currentSlide].header}
            </p>
          </div>
        </div>

        {/* Indicadores de las secciones (Main, Jobs, Schedule, Expand) */}
        <div className="w-full flex flex-col items-center absolute bottom-10">
          <div className="flex w-[80%] justify-start mb-12 z-20 gap-4">
            <button
              onClick={onAccessTechnicianOpen}
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
                {/* Subtítulo del slide */}
                <p
                  className={`text-xs font-semibold mb-1 ${
                    index === currentSlide ? "text-meant" : "text-lightGray"
                  }`}
                >
                  {slide.subtitle}
                </p>

                {/* Línea del indicador */}
                <div
                  className={`relative w-full h-[2px] ${
                    index === currentSlide
                      ? "bg-meant"
                      : "bg-gray-500 opacity-50"
                  }`}
                >
                  {/* Animación de status bar */}
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
      <AccessTechnicianModal isOpen={isAccessTechnicianOpen} onOpenChange={onAccessTechnicianOpenChange}/>
    </div>
  );
};

export default BannerLastTechnician;
