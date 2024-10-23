import React from "react";
import { Wave } from "../Wave";
import { NavbarSection } from "..";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url('/image/LandingMainBack.png')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="md:h-full h-auto w-full relative "
      id="Home-Section"
    >
      {/* Degradado que cubre la imagen de fondo y cambia según el tamaño */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-darkGray md:bg-gradient-to-br" />

      <div className="bg-darkBlack/30 inset-0 w-full h-full flex flex-col items-center relative z-10">
        <NavbarSection />

        {/* Contenido del banner */}
        <div className="flex flex-col md:flex-row justify-center items-center w-full xl:w-[80%] h-full">
          {/* Texto a la izquierda en pantallas grandes, arriba en pantallas pequeñas */}
          <div className="w-full md:w-1/2 flex flex-col xl:pl-0 pl-8 gap-2 xl:h-[65%] h-auto select-none">
            <p className="text-lightWhite mb-6 font-bold font-chackra tracking-wider text-md 2xl:text-lg">
              Easily find a reliable mobile mechanic near you
            </p>
            <p className="bg-gradient-to-r from-lightWhite to-midGray bg-clip-text text-transparent font-black font-chackra tracking-[3px] text-2xl 2xl:text-4xl w-full xl:w-[420px]">
              Mobile Auto repairs
            </p>
            <p className="text-meant font-black font-chackra tracking-[4px] text-4xl lg:text-4xl xl:text-6xl">
              The Panda M.A.R.S.
            </p>
            <p className="bg-gradient-to-r from-midGray to-lightWhite bg-clip-text text-transparent font-black font-chackra tracking-[3px] text-2xl 2xl:text-4xl w-[300px]">
              and services!
            </p>

            <div className="h-[1px] flex w-full bg-gradient-to-r from-lightGray to-raisinBlack mb-6 mt-6"></div>

            <div className="flex flex-row gap-5 group">
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLScSmzQFA-dctzv8iXYSACm8-d8Q_5e5VyEcUoNURB8pxlwLTA/viewform"
                className="border-2 border-[#40c48e] text-darkBlack font-jost font-semibold rounded-3xl px-8 py-2 cursor-pointer transition-all ease-in-out bg-meant hover:font-semibold hover:-translate-y-1 hover:scale-110 duration-300"
              >
                Sign Up Form
              </Link>
            </div>
          </div>

          {/* Imagen a la derecha en pantallas grandes, abajo en pantallas pequeñas */}
          <div className="w-full md:w-1/2 hidden md:flex items-center justify-center">
            <Image
              src={"/mainImageLading.png"}
              alt={`panda`}
              width={600}
              height={500}
              className="object-cover w-[80%]"
            />
          </div>
        </div>

        {/* Imagen se muestra en pantallas pequeñas debajo del texto */}
        <div className="w-full flex md:hidden items-center justify-center mt-4 md:mb-0 mb-8">
          <Image
            src={"/mainImageLading.png"}
            alt={`panda`}
            width={600}
            height={500}
            className="object-cover w-[80%]"
          />
        </div>

        <Wave />
      </div>
    </div>
  );
};

export default Banner;
