"use client";

import React, { useEffect, useState } from "react";
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
import {
  RiArrowRightSLine,
  RiMapPin2Fill,
  RiAddCircleFill,
  RiMapPinUserFill,
  RiCarFill,
  RiErrorWarningFill,
} from "react-icons/ri";
import defaultProfilePicture from "../../../public/image/defaultProfilePicture.jpg";
import { handleCreateOffer, handleRetrieveRequestService } from "@/api";
import { Input } from "@nextui-org/react";
import useEmblaCarousel from 'embla-carousel-react'
import serviceImage1 from "../../../public/serviceImages/serviceImage1.jpg"
import serviceImage2 from "../../../public/serviceImages/serviceImage2.jpg"
import serviceImage3 from "../../../public/serviceImages/serviceImage3.jpg"

const ModalDetailRequest = ({ isOpen, onOpenChange, id, technicianId, setTechnicianActivityStatus, setServiceIdWaitingFor }) => {
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(null);
  const [priceRepair, setPriceRepair] = useState(0);
  const [errorPriceMissing, setErrorPriceMissing] = useState(false);
  const [sendingOffer, setSendingOffer] = useState(false);
  const [emblaRef] = useEmblaCarousel({ loop: true })

  const handleAcceptRequest = async () => {
    setSendingOffer(true)
    console.log("los deli precios", priceRepair);
    setErrorPriceMissing(false);
    if (priceRepair && priceRepair > 0) {
      try {
        const data = await handleCreateOffer({
          offerTechnicianId: technicianId,
          amount: priceRepair,
          serviceId: id,
          status: "accepted",
          text: "Queres ser tu propio jefe?",
        });
        console.log("Succesfull accepted offer", data);
        setSendingOffer(false);
        onOpenChange(false);
        setTechnicianActivityStatus("waitingResponse");
        setServiceIdWaitingFor(data.createOffer.serviceId);
      } catch (error) {
        console.log(error);
        setSendingOffer(false);
      }
    } else {
      setErrorPriceMissing(true);
      setSendingOffer(false);
    }
  };
  const retrieveData = async () => {
    setLoading(true);
    try {
      const data = await handleRetrieveRequestService(id);
      setRequest(data.getService);
      console.log(id, "dataaaa", data.getService);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(isOpen);
    if (isOpen) {
      retrieveData();
    }
    return () => {
      setPriceRepair("");
      setErrorPriceMissing(false);
      setRequest(null);
      setSendingOffer(false);
    };
  }, [isOpen]);
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="outside"
      size="xl"
    >
      <ModalContent className="dark:bg-zinc-900 dark:text-white border-[1px] border-zinc-800 shadow-lg flex flex-col shadow-zinc-800 pb-4">
        {(onClose) => (
          <>
            <ModalHeader className="flex">
              {loading ? (
                <div>Loading</div>
              ) : (
                <h4 className="text-[22px]">
                  Repair Car <span className="text-emerald-400">-</span>{" "}
                  <span className="text-[17px] text-zinc-300">
                    298 TX-69 Spur
                  </span>
                </h4>
              )}
            </ModalHeader>
            <ModalBody className="flex flex-col justify-center overflow-y-auto">
              {loading ? (
                <div>Loading</div>
              ) : (
                <>
                  <div className="w-full h-[250px] flex items-center justify-center bg-zinc-800 rounded-lg p-3 ">
                    Map Here :)
                  </div>
                  <span className="text-zinc-300 flex gap-x-1 items-center">
                    <RiMapPinUserFill className="text-emerald-400" />
                    You are{" "}
                    <span className="text-emerald-300 font-bold">
                      9 miles
                    </span>{" "}
                    from the location
                  </span>
                  <span className="text-zinc-300 flex gap-x-1 items-center">
                    <RiCarFill className="text-emerald-400" />
                    Mercedes A-class Sedan 2018
                  </span>
                  <div className="w-full flex flex-col ">
                    <span className="text-white font-bold text-[16px]">
                      Description:
                    </span>
                    <div className="bg-zinc-800 rounded-lg p-3 mb-4">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five.
                    </div>
                    <Accordion
                      motionProps={{
                        variants: {
                          enter: {
                            y: 0,
                            opacity: 1,
                            height: "auto",
                            transition: {
                              height: {
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                                duration: 1,
                              },
                              opacity: {
                                easings: "ease",
                                duration: 1,
                              },
                            },
                          },
                          exit: {
                            y: -10,
                            opacity: 0,
                            height: 0,
                            transition: {
                              height: {
                                easings: "ease",
                                duration: 0.25,
                              },
                              opacity: {
                                easings: "ease",
                                duration: 0.3,
                              },
                            },
                          },
                        },
                      }}
                    >
                      <AccordionItem
                        key="1"
                        aria-label="Accordion 1"
                        title="Images:"
                        subtitle="The customer sent these images"
                        className="border-b-[1px] border-zinc-600 w-full mb-5"
                      >
                        <div className="embla bg-red-500 w-full" ref={emblaRef}>
                          <div className="embla__container w-full">
                            <Image 
                              src={serviceImage1}
                              width={600}
                              height={200}
                              quality={100}
                              className="object-cover embla__slide"
                            />
                            <Image 
                              src={serviceImage2}
                              width={600}
                              height={200}
                              quality={100}
                              className="object-cover embla__slide"
                            />
                            <Image 
                              src={serviceImage3}
                              width={600}
                              height={200}
                              quality={100}
                              className="object-cover embla__slide"
                            />
                          </div>
                        </div>
                      </AccordionItem>
                    </Accordion>
                    <span className="text-white font-bold text-[17px]">
                      Set the price to send your offer
                    </span>
                    <div className="w-full flex flex-col gap-x-1  border-b-[1px] border-b-zinc-700 pb-4">
                      <div className="w-full flex  gap-x-1 items-center justify-between mb-3">
                        <span className="text-zinc-300 font-semibold text-[16px] w-[100px]">
                          Repair price
                        </span>
                        <Input
                          type="number"
                          label=""
                          placeholder="0.00"
                          labelPlacement="outside"
                          className="w-1/2"
                          value={priceRepair}
                          onValueChange={setPriceRepair}
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                $
                              </span>
                            </div>
                          }
                        />
                      </div>
                      <div className="md:w-[130px] w-full p-2 flex items-center gap-x-2 border-[1px] rounded-md border-zinc-500 text-zinc-400 cursor-pointer">
                        <RiAddCircleFill />
                        Add price
                      </div>
                    </div>
                    {errorPriceMissing && (
                      <div className="p-2 flex items-center gap-x-2 bg-red-500">
                        <RiErrorWarningFill className="text-red-300 text-[25px]" />
                        You need to set a price to be able to submit your offer
                      </div>
                    )}
                  </div>
                </>
              )}
            </ModalBody>
            <ModalFooter className="w-full h-[80px] flex gap-x-2">
              {/* <button className="w-1/2 bg-zinc-600 text-white rounded-lg p-3 text-[17px] font-semibold">
                Cancel
              </button> */}
              <Button
                isDisabled={sendingOffer}
                isLoading={sendingOffer}
                onClick={() => handleAcceptRequest()}
                className="w-full bg-emerald-600 text-white rounded-lg p-3 text-[17px] font-semibold flex items-center justify-center"
              >
                Offer service
                <RiArrowRightSLine className="text-emerald-200 text-[20px]" />
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDetailRequest;
