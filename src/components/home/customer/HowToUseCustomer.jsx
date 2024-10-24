"use client";
import React, { useState } from "react";
import { FiUserPlus, FiClipboard, FiTool, FiTruck, FiDollarSign, FiStar } from "react-icons/fi";
import Image from "next/image";

const steps = [
  { id: 1, title: "Create your account to get started", image: "/stepsCustomer/createAccountCustomer.png", icon: FiUserPlus },
  { id: 2, title: "Create a Service Request", image: "/stepsCustomer/CreateServiceCustomer.png", icon: FiClipboard },
  { id: 3, title: "Here you can see the diagnosis and repair process that the technician is doing", image: "/stepsCustomer/ServiceFlowCustomer.png", icon: FiTool },
  { id: 4, title: "Once the service is completed, you can make payment, wait for verification", image: "/stepsCustomer/PaymentCustomer.png", icon: FiDollarSign },
  { id: 5, title: "Once payment has been made, you can send a rating and comment to the technician who performed the service.", image: "/stepsCustomer/RatingCustomer.png", icon: FiStar },
];

const HowToUseTechnician = () => {
  const [selectedStep, setSelectedStep] = useState(1);

  return (
    <div className="relative w-full md:pt-16 pt-2 py-12 flex flex-col items-center gap-5 px-3 md:px-0 bg-darkBlack md:mb-10 mb-0">
      <div className="md:w-[80%] w-full flex flex-col">
        <p className="lg:w-[570px] w-full bg-gradient-to-r from-lightGray to-lightWhite bg-clip-text text-transparent font-black font-chackra text-4xl 2xl:text-6xl mb-10">
          How to use the App
        </p>

        <div className="w-full flex flex-col md:flex-row justify-center items-center md:px-0 px-3">
          {/* Lista de pasos con texto */}
          <div className="md:w-1/2 w-full flex flex-col gap-6 relative md:pl-10">
            <div className="absolute hidden md:block top-0 left-0 h-full w-[1px] bg-gradient-to-b from-meant to-darkBlack"></div>

            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex md:flex-row flex-col md:items-center gap-4 cursor-pointer transition-all ${
                  selectedStep === step.id
                    ? "text-white"
                    : "md:text-lightGray md:opacity-50 text-white"  
                }`}
                onMouseEnter={() => setSelectedStep(step.id)}
              >
                <div className="flex items-center gap-4 w-full">
                  <step.icon
                    size={35}
                    className={`md:min-w-[24px] min-w-[22px] md:min-h-[24px] min-h-[22px] ${
                      selectedStep === step.id
                        ? "text-meant"
                        : "md:text-meant md:opacity-50 text-meant"  
                    }`}
                  />
                  <p className="md:text-xl text-lg font-medium">{step.title}</p>
                </div>

                <div className="md:hidden w-full flex justify-center mt-4">
                  <Image
                    src={step.image}
                    alt={`Step ${step.id}`}
                    width={600}
                    height={500}
                    className="object-cover w-[80%]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Imagen a la derecha para pantallas más grandes */}
          <div className="hidden md:flex md:w-1/2 justify-center items-center">
            <Image
              src={steps.find((step) => step.id === selectedStep).image}
              alt={`Step ${selectedStep}`}
              width={600}
              height={500}
              className="object-cover w-[80%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUseTechnician;
