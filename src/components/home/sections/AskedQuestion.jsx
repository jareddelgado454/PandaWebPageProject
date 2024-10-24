"use client";
import React, { useState } from "react";
import { faq } from "@/assets/data/Faq";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi"; // Iconos de flechas

const AskedQuestion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === faq.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? faq.length - 1 : prevIndex - 1
    );
  };

  const getPositionClass = (index) => {
    if (index === currentIndex) return "scale-100 opacity-100 z-10";
    if (index === (currentIndex + 1) % faq.length)
      return "scale-90 opacity-50 translate-x-[100%] z-0";
    if (index === (currentIndex - 1 + faq.length) % faq.length)
      return "scale-90 opacity-50 -translate-x-[100%] z-0";
    return "opacity-0 scale-75"; // Ocultar otros
  };

  return (
    <div className="relative w-full pt-16 py-12 flex flex-col items-center gap-5 px-3 md:px-0 bg-darkBlack mb-10">
      <div className="md:w-[80%] w-full flex flex-col">
        <p className="md:w-[200px] w-full md:text-left text-center bg-gradient-to-r from-lightWhite to-midGray bg-clip-text text-transparent font-semibold text-md xl:text-lg">
          Frequent asked
        </p>
        <p className="md:w-[300px] w-full md:text-left text-center bg-gradient-to-r from-midGray to-lightWhite bg-clip-text text-transparent font-black font-chackra text-4xl 2xl:text-6xl">
          Questions
        </p>

        {/* Slider container */}
        <div className="relative w-full overflow-hidden h-[24rem] flex items-center justify-center">
          {/* Botón para la flecha izquierda */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-meant/70 hover:bg-meant/80 rounded-full transition-all"
          >
            <FiArrowLeft className="text-darkBlack text-2xl" />
          </button>

          {/* Contenedor de las preguntas (slider con opacidad) */}
          <div className="relative flex justify-center items-center w-full h-full">
            {faq.map((item, i) => (
              <div
                key={i}
                className={`absolute transform transition-all duration-500 ease-in-out p-0 h-[18rem] w-[60%] ${getPositionClass(
                  i
                )}`}
              >
                {/* Div detrás para el borde personalizado */}
                <div className="absolute inset-0 -z-10 w-[calc(100%+2px)] h-[calc(100%+2px)] bg-gradient-to-br from-midGray to-raisinBlack rounded-lg pointer-events-none"></div>

                {/* Contenido de la tarjeta */}
                <div className="p-4 bg-gradient-to-b from-raisinBlack to-darkBlack rounded-lg shadow-md h-full">
                  <div className="text-left mt-2 flex flex-col items-start justify-start gap-2 h-full">
                    {/* Número en la parte superior izquierda */}
                    <span className="text-meant text-[30px] font-bold font-chackra mb-4">
                      {/* Calcular el número correctamente */}
                      {i === currentIndex
                        ? currentIndex + 1
                        : i === (currentIndex + 1) % faq.length
                        ? (currentIndex + 2) % faq.length || faq.length
                        : i === (currentIndex - 1 + faq.length) % faq.length
                        ? currentIndex || faq.length
                        : ""}
                        .
                    </span>
                    <h2 className="text-[12px] md:text-[27px] font-chackra font-semibold text-lightWhite">
                      {item.question}
                    </h2>
                    <p className="text-zinc-300 leading-relaxed font-jost text-[11px] md:text-[19px]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón para la flecha derecha */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-meant/70 hover:bg-meant/80 rounded-full"
          >
            <FiArrowRight className="text-darkBlack text-2xl" />
          </button>
        </div>

        {/* Indicadores de puntos */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-darkBlack">
          {faq.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-green-panda" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AskedQuestion;
