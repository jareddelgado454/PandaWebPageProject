import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import {
  RiArrowDropRightLine,
  RiMailOpenFill,
  RiAlertFill,
  RiErrorWarningFill,
  RiArrowRightSLine,
  RiMapPin2Fill,
  RiToolsFill,
  RiMoneyDollarCircleFill ,
  RiCarFill,
  RiMessage2Fill,
  RiPhoneFill 
} from "react-icons/ri";
import TechnicianServiceMap from "../technicianMaps/technicianMap/TechnicianServiceMap";
import { MapProvider } from "@/contexts/mapTechnician/MapTechnicianProvider";

const AssignedTechnicianModal = ({ isOpen, onOpenChange }) => {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      hideCloseButton={true}
      size="4xl"
    >
      <ModalContent className="bg-zinc-200 text-white border-[2px] border-gray-600 h-[100vh]">
        {(onClose) => (
          <>
            <ModalBody className="w-full h-[100%] flex-col gap-0 items-center justify-center p-0 bg-zinc-200 relative">
              <div className="absolute md:w-[500px] w-[80%] h-[80px] flex justify-center items-center  shadow-lg bg-zinc-800/90 left-1/2 transform -translate-x-1/2 top-3 z-50 rounded-xl">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-[40px] h-[40px] border-[2px] flex items-center justify-center border-emerald-400 rounded-full ">
                      <div className="w-[30px] h-[30px] bg-emerald-400 rounded-full flex justify-center items-center">
                        <RiMapPin2Fill className="text-zinc-700"/>
                      </div>
                    </div>
                    <span className="text-zinc-200 text-[14px]">On my Way</span>
                </div>
                <div className=" w-[30px] h-[25px] border-t-[2px] border-emerald-500 opacity-60"></div>
                <div className="flex flex-col items-center justify-center opacity-60">
                    <div className="w-[40px] h-[40px] border-[2px] flex items-center justify-center border-emerald-400 rounded-full ">
                      <div className="w-[30px] h-[30px] bg-emerald-400 rounded-full flex justify-center items-center">
                        <RiToolsFill className="text-zinc-700 text-[20px]"/>
                      </div>
                    </div>
                    <span className="text-zinc-200 text-[14px]">On Service</span>
                </div>
                <div className=" w-[30px] h-[25px] border-t-[2px] border-emerald-500 opacity-60"></div>
                <div className="flex flex-col items-center justify-center opacity-60">
                    <div className="w-[40px] h-[40px] border-[2px] flex items-center justify-center border-emerald-400 rounded-full ">
                      <div className="w-[30px] h-[30px] bg-emerald-400 rounded-full flex justify-center items-center">
                        <RiMoneyDollarCircleFill  className="text-zinc-700 text-[22px]"/>
                      </div>
                    </div>
                    <span className="text-zinc-200 text-[14px]">Payment</span>
                </div>
              </div>
              <MapProvider>
                <TechnicianServiceMap />
              </MapProvider>
              <div className="w-full h-[25%] bg-zinc-800 rounded-t-3xl shadowContainer p-4 z-40">
                <div className="w-full flex justify-between items-center mb-2">
                  <div className="flex gap-x-2 items-center">
                    <span className="text-[25px] font-bold">David Saavedra</span>
                    <span className="text-emerald-500 text-[25px]">-</span>
                    <span className="text-zinc-300 font-semibold text-[20px]">1798 W 33rd St</span>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <div className=" w-[45px] h-[45px] flex justify-center items-center rounded-full bg-emerald-500">
                      <RiPhoneFill className="text-[25px] text-emerald-100" />
                    </div>
                    <div className=" w-[45px] h-[45px] flex justify-center items-center rounded-full bg-emerald-500">
                      <RiMessage2Fill className="text-[25px] text-emerald-100" />
                    </div>
                  </div>
                </div>
                <div className="flex mb-4 gap-x-2 ">
                    <div className="p-1 text-[14px] rounded-lg bg-zinc-600">
                        Diagnosis
                    </div>
                    <div className="w-full text-[16px] flex gap-x-2 items-center border-l-[1px] border-zinc-600 pl-2">
                      <RiCarFill className="text-[20px] text-emerald-500"/>
                      Mercedes A-class Sedan 2018
                    </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center bg-zinc-700 rounded-lg py-2">
                  <div className="w-full flex gap-x-3 items-center justify-center">
                      <div className="flex ">
                          <img src="./loading/loading4.gif" alt="loading" className="w-[40px] h-[40px]"/>
                      </div>
                      <div className="text-[25px] font-bold">
                          The customer is waiting for you...
                      </div>
                  </div>
                  <div className="text-center text-[17px]">
                      You are <span className="text-[28px] font-bold">4 miles</span> away
                  </div> 
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AssignedTechnicianModal;
