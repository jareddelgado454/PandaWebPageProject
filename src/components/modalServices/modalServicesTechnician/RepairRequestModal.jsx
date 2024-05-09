"use client";

import React from "react";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Accordion,
  AccordionItem,
  Avatar,
} from "@nextui-org/react";
import { RiArrowRightSLine  , RiMapPin2Fill } from "react-icons/ri";
import defaultProfilePicture from "../../../../public/image/defaultProfilePicture.jpg";

const RepairRequestModal = ({ isOpen, onOpenChange }) => {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      isDismissable={false}
      onOpenChange={onOpenChange}
      scrollBehavior='outside'
      size="xl"
    >
      <ModalContent className="dark:bg-zinc-900 dark:text-white border-[1px] border-zinc-800 shadow-lg shadow-zinc-800">
        {(onClose) => (
          <>
            <ModalHeader className="flex ">
              <p>Repair requests:</p>
            </ModalHeader>
            <ModalBody className="flex flex-col justify-center">
              <span className="text-zinc-400">
                Click in the requests to show the details:
              </span>
              <Accordion selectionMode="multiple">
                <AccordionItem
                  key="1"
                  aria-label="Chung Miller"
                  className="border-[1px] border-zinc-700 rounded-lg px-3"
                  startContent={
                    <Image
                      src={defaultProfilePicture}
                      placeholder="blur"
                      quality={100}
                      className="w-[50px] h-[50px] rounded-full object-cover"
                    />
                  }
                  subtitle={
                    <div className="w-full flex gap-x-2">
                      <div className="flex items-center py-1 gap-x-1 text-zinc-400 mr-1"><RiMapPin2Fill className="text-emerald-600 text-[16px]"/>1 miles</div>
                      <div className="py-1 px-2 bg-emerald-600 rounded-md text-white">Motor</div>
                      <div className="py-1 px-2 bg-emerald-600 rounded-md text-white">Tires</div>
                    </div>
                  }
                  title="David Saavedra"
                >
                  <div className="w-full flex flex-col">
                    <span className="text-white font-bold text-[16px]">Description:</span>
                    <div className="bg-zinc-800 rounded-lg p-3 mb-2">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                    <span className="text-white font-bold text-[16px]">Location:</span>
                    <span className="text-zinc-400 font-semibold text-[15px]">298 TX-69 Spur</span>
                    <div className="w-full h-[250px] flex items-center justify-center bg-zinc-800 rounded-lg p-3 mb-3">
                        Map Here :)
                    </div>
                    <div className="w-full flex gap-x-2">
                        <button className="w-1/2 bg-zinc-600 text-white rounded-lg p-3 text-[17px] font-semibold">Decline</button>
                        <button className="w-1/2 bg-emerald-600 text-white rounded-lg p-3 text-[17px] font-semibold flex items-center justify-center">Accept<RiArrowRightSLine  className="text-emerald-200 text-[20px]"/></button>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RepairRequestModal;
