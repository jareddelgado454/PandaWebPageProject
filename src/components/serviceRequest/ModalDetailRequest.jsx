"use client";

import React, { useContext, useEffect, useState } from "react";
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
  RiInformationFill,
} from "react-icons/ri";
import defaultProfilePicture from "../../../public/image/defaultProfilePicture.jpg";
import {
  handleCreateOffer,
  handleRetrieveRequestService,
  handleUpdateLocationTechnician,
} from "@/api";
import { Input } from "@nextui-org/react";
import useEmblaCarousel from "embla-carousel-react";
import serviceImage1 from "../../../public/serviceImages/serviceImage1.jpg";
import serviceImage2 from "../../../public/serviceImages/serviceImage2.jpg";
import serviceImage3 from "../../../public/serviceImages/serviceImage3.jpg";
import Link from "next/link";
import { PlaceTechnicianContext } from "@/contexts/placeTechnician/PlaceTechnicianContext";
import MiniTechnicianServiceMap from "../technicianMaps/technicianMap/MiniTechnicianServiceMap";
import { MapProvider } from "@/contexts/mapTechnician/MapTechnicianProvider";

const ModalDetailRequest = ({
  isOpen,
  onOpenChange,
  id,
  technicianId,
  setTechnicianActivityStatus,
  addressDistanceSelected,
  setAddressDistanceSelected,
  pricesTechnician,
}) => {
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(null);
  const [errorPriceMissing, setErrorPriceMissing] = useState(false);
  const [sendingOffer, setSendingOffer] = useState(false);
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const { technicianLocation } = useContext(PlaceTechnicianContext);
  console.log({
    ...isOpen,
    onOpenChange,
    id,
    technicianId,
    setTechnicianActivityStatus,
    addressDistanceSelected,
    setAddressDistanceSelected,
    pricesTechnician,
  });

  const handleAcceptRequest = async () => {
    setSendingOffer(true);
    setErrorPriceMissing(false);
    if (
      pricesTechnician.repairPriceHour != null &&
      pricesTechnician.diagnosticPrice != null
    ) {
      try {
        const response = await handleUpdateLocationTechnician({
          id: technicianId,
          loLatitude: technicianLocation[1],
          loLongitude: technicianLocation[0],
        });
        console.log("Se actualizaron la location del tecnico en db");
        const data = await handleCreateOffer({
          offerTechnicianId: technicianId,
          amount: pricesTechnician.repairPriceHour,
          serviceId: id,
          status: "pending",
          text: "Queres ser tu propio jefe?",
        });
        console.log("Succesfull sended offer", data);
        setSendingOffer(false);
        onOpenChange(false);
        setTechnicianActivityStatus("waitingResponse");
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
      setErrorPriceMissing(false);
      setRequest(null);
      setSendingOffer(false);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setAddressDistanceSelected(null);
    }
  }, [isOpen]);

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="outside"
      size="xl"
    >
      <ModalContent className="dark:bg-zinc-900 dark:text-white border-[1px] dark:border-zinc-800 border-zinc-400 shadow-lg flex flex-col dark:shadow-zinc-800 shadow-zinc-900 pb-4">
        {(onClose) => (
          <>
            <ModalHeader className="flex">
              {loading ? (
                <div className="w-full flex gap-x-2">
                  <div className="w-[100px] h-[25px] dark:bg-zinc-700 bg-zinc-400 rounded-lg animate-pulse"></div>
                  <span className="">-</span>
                  <div className="w-[150px] h-[25px] dark:bg-zinc-700 bg-zinc-400 rounded-lg animate-pulse"></div>
                </div>
              ) : (
                <h4 className="text-[22px]">
                  {request?.type && request?.type}{" "}
                  <span className="text-emerald-400">-</span>{" "}
                  <span className="text-[17px] dark:text-zinc-300 text-zinc-700">
                    {addressDistanceSelected?.address}
                  </span>
                </h4>
              )}
            </ModalHeader>
            <ModalBody className="flex flex-col justify-center overflow-y-auto">
              {loading ? (
                <div className="w-full flex flex-col gap-y-2">
                  <div className="w-full h-[250px] flex items-center justify-center dark:bg-zinc-700 bg-zinc-300 rounded-lg p-3 mb-3 animate-pulse"></div>
                  <div className="h-[25px] w-1/2 mb-2 dark:bg-zinc-700 bg-zinc-400 rounded-md animate-pulse"></div>
                  <div className="h-[25px] w-1/2 mb-2 dark:bg-zinc-600 bg-zinc-300 rounded-md animate-pulse"></div>
                  <div className="h-[25px] w-[150px] mb-2 dark:bg-zinc-700 bg-zinc-400 rounded-md animate-pulse"></div>
                  <div className="w-full h-[100px] flex items-center justify-center dark:bg-zinc-700 bg-zinc-400 rounded-lg p-3 mb-3 animate-pulse"></div>
                </div>
              ) : (
                <>
                  <div className="w-full h-[250px] flex items-center justify-center rounded-lg overflow-hidden dark:bg-zinc-800 bg-zinc-200 border-[1px] dark:border-zinc-700 border-zinc-400">
                    {request?.originLatitude && request?.originLatitude ? (
                      <MapProvider>
                        <MiniTechnicianServiceMap
                          customerLocation={{
                            lon: request?.originLongitude,
                            lat: request?.originLatitude,
                          }}
                        />
                      </MapProvider>
                    ) : (
                      <div>loading map</div>
                    )}
                  </div>
                  <span className="dark:text-zinc-300 text-zinc-800 flex gap-x-1 items-center">
                    <RiMapPinUserFill className="dark:text-emerald-400 text-emerald-600" />
                    You are{" "}
                    <span className="dark:text-emerald-300 text-emerald-600 font-bold">
                      {addressDistanceSelected?.distance} miles
                    </span>{" "}
                    from the location
                  </span>
                  <span className="dark:text-zinc-300 text-zinc-800 flex gap-x-1 items-center">
                    <RiCarFill className="dark:text-emerald-400 text-emerald-600" />
                    {`${request?.car?.model} ${request?.car?.year}`}
                  </span>
                  <div className="w-full flex flex-col ">
                    <span className="font-bold text-[16px]">
                      Description:
                    </span>
                    <div className="dark:bg-zinc-800 bg-zinc-200 rounded-lg p-3 mb-4">
                      {
                        request?.description
                      }
                    </div>
                    {/* <Accordion
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
                              alt="service_image_1"
                            />
                            <Image
                              src={serviceImage2}
                              width={600}
                              height={200}
                              quality={100}
                              className="object-cover embla__slide"
                              alt="service_image_2"
                            />
                            <Image
                              src={serviceImage3}
                              width={600}
                              height={200}
                              quality={100}
                              className="object-cover embla__slide"
                              alt="service_image_3"
                            />
                          </div>
                        </div>
                      </AccordionItem>
                    </Accordion> */}
                    <span className=" font-bold text-[17px] mb-2">
                      Your prices to offer repair services:
                    </span>
                    <div className="w-full flex flex-col gap-x-1  border-b-[1px] border-b-zinc-700 pb-4">
                      <div className="w-full flex  gap-x-1 items-center justify-between mb-3">
                        <span className="dark:text-zinc-300 text-zinc-700 font-semibold text-[16px] w-[200px]">
                          Diagnosis price
                        </span>
                        <Input
                          type="number"
                          label=""
                          placeholder="0.00"
                          labelPlacement="outside"
                          className="w-1/2"
                          value={pricesTechnician?.diagnosticPrice}
                          readOnly
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                $
                              </span>
                            </div>
                          }
                        />
                      </div>
                      {request?.type == "repair" && (
                        <div className="w-full flex  gap-x-1 items-center justify-between mb-3">
                          <span className="dark:text-zinc-300 text-zinc-700 font-semibold text-[16px] w-[200px]">
                            Repair price
                          </span>
                          <Input
                            type="number"
                            label=""
                            placeholder="0.00"
                            labelPlacement="outside"
                            className="w-1/2"
                            value={pricesTechnician?.repairPriceHour}
                            readOnly
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">
                                  $
                                </span>
                              </div>
                            }
                          />
                        </div>
                      )}

                      <div className="w-full p-2 flex items-center gap-x-1 dark:text-zinc-400 text-zinc-600  text-[14px]">
                        <RiInformationFill />
                        You can change this prices in{" "}
                        <Link
                          href={"/user/specialization-area"}
                          className="cursor-pointer dark:text-emerald-400 text-emerald-600 font-bold text-[15px]"
                        >
                          My specializations
                        </Link>
                      </div>
                    </div>
                    {errorPriceMissing && (
                      <div className="p-2 flex items-center gap-x-1 bg-red-500">
                        <RiErrorWarningFill className="text-red-300 text-[25px]" />
                        You need to set a price to be able to submit your offer{" "}
                        <Link
                          href={"/user/specialization-area"}
                          className="cursor-pointer text-white font-bold text-[17px]"
                        >
                          <u>Here.</u>
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </ModalBody>
            <ModalFooter className="w-full h-[80px] flex gap-x-2">
              {!loading && (
                <Button
                  isDisabled={sendingOffer}
                  isLoading={sendingOffer}
                  onClick={() => handleAcceptRequest()}
                  className="w-full bg-emerald-600 text-white rounded-lg p-3 text-[17px] font-semibold flex items-center justify-center"
                >
                  Offer service
                  <RiArrowRightSLine className="text-emerald-200 text-[20px]" />
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDetailRequest;
