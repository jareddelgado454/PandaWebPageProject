"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import { Button, useDisclosure } from "@nextui-org/react";
import VideoModal from "../modalLanding/VideoModal";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dropdownRef = useRef(null); 
  const menuButtonRef = useRef(null); // Ref para el botón de menú

  const scrolltoHash = (element_id) => {
    const element = document.getElementById(element_id);
    element?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si se hace clic fuera del menú desplegable y fuera del botón de menú, se cierra el menú
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setActive(false); 
      }
    };

    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); 
    };
  }, [active]);

  const handleMenuToggle = () => {
    setActive((prevActive) => !prevActive); // Alterna el estado al hacer clic
  };

  return (
    <div className="flex flex-wrap justify-between py-2 w-[80%] md:mb-0 mb-8">
      <VideoModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="flex flex-row flex-nowrap">
        <div className="bg-zinc-900 w-[4rem] h-[4rem] rounded-full shadow-xl flex justify-center items-center border-[#40c48e] cursor-pointer ease-in-out duration-300">
          <Image
            src={"/panda.webp"}
            width={300}
            height={300}
            className="w-[3.5rem] h-[3rem] "
            alt="panda_logo"
          />
        </div>
      </div>

      <div className="flex items-center xl:hidden">
        <div
          ref={menuButtonRef} // Ref para el botón de menú
          onClick={handleMenuToggle} // Alterna el estado al hacer clic
          className="bg-[#303030]/50 w-[3rem] h-[3rem] rounded-full shadow-xl flex justify-center items-center border-[#40c48e] cursor-pointer ease-in-out hover:bg-[#303030]/80 hover:border-2 hover:border-[#40c48e] hover:-translate-y-1 hover:scale-110 duration-300 z-20"
        >
          <FaBars className="text-white" />
        </div>
      </div>

      {/* Dropdown para pantallas pequeñas */}
      <div
        ref={dropdownRef} // Referencia para detectar clics fuera del dropdown
        className={`absolute top-20 right-0 w-full bg-raisinBlack rounded-lg flex-col items-center gap-6 p-4 transition-all duration-300 z-10 ${
          active ? "flex" : "hidden"
        } xl:hidden`}
      >
        <p
          className="font-jost text-white rounded-3xl px-10 py-2 shadow-2xl text-[17px] cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300"
          onClick={() => scrolltoHash("About-section")}
        >
          About
        </p>
        <p
          className="font-jost text-white rounded-3xl px-10 py-2 shadow-2xl text-[17px] cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300"
          onClick={() => scrolltoHash("Service-Section")}
        >
          Services
        </p>
        <p
          className="font-jost text-white px-10 py-2 shadow-2xl text-[17px] cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300"
          onClick={() => scrolltoHash("Team-Section")}
        >
          Team
        </p>
        <p
          className="font-jost text-white px-10 py-2 shadow-2xl text-[17px] cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300"
          onClick={() => scrolltoHash("Faq-Section")}
        >
          Faq
        </p>

        {/* Botón "Explore now" */}
        <Button
          type="button"
          onClick={onOpen}
          className="bg-meant text-black p-2 px-6 rounded-lg text-[14px] font-bold font-jost cursor-pointer hover:bg-meantDark transition-all"
        >
          Explore now
        </Button>
      </div>

      {/* Navbar para pantallas grandes */}
      <div className="hidden xl:flex flex-row items-center gap-8 text-white">
        <p
          className="font-jost text-white rounded-3xl px-10 py-2 shadow-2xl text-[17px] cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300"
          onClick={() => scrolltoHash("About-section")}
        >
          About
        </p>
        <p
          className="font-jost text-white rounded-3xl px-10 py-2 shadow-2xl text-[17px] cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300"
          onClick={() => scrolltoHash("Service-Section")}
        >
          Services
        </p>
        <p
          className="font-jost text-white px-10 py-2 shadow-2xl text-[17px] cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300"
          onClick={() => scrolltoHash("Team-Section")}
        >
          Team
        </p>
        <p
          className="font-jost text-white px-10 py-2 shadow-2xl text-[17px] cursor-pointer ease-in-out hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300"
          onClick={() => scrolltoHash("Faq-Section")}
        >
          Faq
        </p>

        {/* Botón "Explore now" en pantallas grandes */}
        <Button
          type="button"
          onClick={onOpen}
          className="bg-meant text-black p-2 px-6 rounded-lg text-[14px] font-bold font-jost cursor-pointer hover:bg-meantDark transition-all"
        >
          Explore now
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
