"use client";
import React, { useState } from "react";
import { FiUserPlus, FiClipboard, FiTool, FiTruck, FiDollarSign, FiStar } from "react-icons/fi"; // Iconos para cada paso
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
    <div className="relative w-full pt-16 py-12 flex flex-col items-center gap-5 px-3 md:px-0 bg-darkBlack mb-10">
      <div className="w-[80%] flex flex-col">
        <p className="w-[570px] bg-gradient-to-r from-lightGray to-lightWhite bg-clip-text text-transparent font-black font-chackra text-3xl 2xl:text-6xl mb-10">
          How to use the App
        </p>

        <div className="w-full flex flex-row justify-center items-center">
          <div className="w-1/2 flex flex-col gap-6 relative pl-10">
            <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-meant to-darkBlack"></div>

            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-4 cursor-pointer transition-all ${
                  selectedStep === step.id
                    ? "text-white"
                    : "text-lightGray opacity-50"
                }`}
                onMouseEnter={() => setSelectedStep(step.id)}
              >
                {/* Icono representativo para cada paso */}
                <step.icon
                  size={35}
                  className={`min-w-[24px] min-h-[24px] ${
                    selectedStep === step.id
                      ? "text-meant"
                      : "text-meant opacity-50"
                  }`}
                />
                <p className="text-xl font-medium">{step.title}</p>
              </div>
            ))}
          </div>

          <div className="w-1/2 flex justify-center items-center">
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
