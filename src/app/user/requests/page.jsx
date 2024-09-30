"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  RiArrowDropRightLine,
  RiMailOpenFill,
  RiAlertFill,
  RiErrorWarningFill,
  RiArrowRightSLine,
  RiMapPin2Fill,
  RiCarFill,
  RiArrowLeftSLine,
  RiSearchLine,
  RiSpeakLine,
  RiToolsFill,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";
import { Contexto } from "../layout";
import Image from "next/image";
import noServices4 from "../../../../public/image/noServices4.png";
import noServicesLight from "../../../../public/image/noServicesLight.png";
import defaultProfilePicture from "../../../../public/image/defaultProfilePicture.jpg";
import ServiceRequest from "@/components/serviceRequest/ServiceRequest";
import { getAllRequestServices } from "@/graphql/services/queries/query";
import { ListenService } from "@/graphql/services/subscriptions/subscription";
import { client } from "@/contexts/AmplifyContext";
import { useDisclosure } from "@nextui-org/react";
import ModalDetailRequest from "@/components/serviceRequest/ModalDetailRequest";
import { getPricesTechnician } from "@/graphql/users/query/technician";
import { listenDeleteService } from "@/graphql/services/subscriptions/subscription";
import { Slider } from "@nextui-org/react";
import { PlaceTechnicianContext } from "@/contexts/placeTechnician/PlaceTechnicianContext";
import { haversineDistance } from "./utils/distance";

const Requests = () => {
  const {
    isOnline,
    handleChangeStatus,
    user,
    setTechnicianActivityStatus,
    setServiceIdWaitingFor,
    theme
  } = useContext(Contexto);
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idSelected, setIdSelected] = useState(null);
  const [addressDistanceSelected, setAddressDistanceSelected] = useState(null);
  const [maxDistanceFilterSelected, setMaxFilterSelected] = useState(20);
  const [pricesTechnician, setPricesTechnician] = useState(null);
  const { technicianLocation } = useContext(PlaceTechnicianContext);
  const [filter, setFilter] = useState("all");
  const {
    isOpen: isDetailRequestModalOpen,
    onOpen: onDetailRequestModalOpen,
    onOpenChange: onDetailRequestModalOpenChange,
  } = useDisclosure();

  const showDetailRequest = (id) => {
    console.log("id de lo que abris", id);
    setIdSelected(id);
    onDetailRequestModalOpen();
  };

  const filteredRequests = () => {
    if (!requests) return [];

    return requests.filter((request) => {

      if (request.status !== 'pending' || request.technicianAssigned) {
        return false;
      }

      const distance = haversineDistance(technicianLocation, [
        request.originLongitude,
        request.originLatitude,
      ]);
      const isWithinDistance = distance <= maxDistanceFilterSelected;

      if (filter === "all") {
        return isWithinDistance;
      }
      return request.type === filter && isWithinDistance;
    });
  };

  const retrieveData = async () => {
    try {
      setLoading(true);
      const { data } = await client.graphql({
        query: getAllRequestServices,
      });
      setRequests(data.listServices.items);
      console.log("All serviceees",data.listServices.items)
      const response = await client.graphql({
        query: getPricesTechnician,
        variables: {
          id: user.sub,
        },
      });
      setPricesTechnician(response.data.getTechnician);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    const createSubscription = client
      .graphql({ query: ListenService })
      .subscribe({
        next: (data) => {
          const newRequest = data.data.onCreateService;
          console.log("data nueva suscripcion", data);
          const distance = haversineDistance(technicianLocation, [
            newRequest.originLongitude,
            newRequest.originLatitude,
          ]);
          console.log(distance, "disntanceeeeeeeeeeeeeeee");
          if (
            (filter === "all" || newRequest.type === filter) &&
            distance <= maxDistanceFilterSelected
          ) {
            setRequests((prevRequests) => [...prevRequests, newRequest]);
          }
        },
        error: (error) => {
          console.error("Error in the subscription:", error);
        },
      });

    const deleteSubscription = client
      .graphql({ query: listenDeleteService })
      .subscribe({
        next: (data) => {
          const deletedServiceId = data.data.onDeleteService.id;
          setRequests((prevRequests) =>
            prevRequests.filter((request) => request.id !== deletedServiceId)
          );
        },
        error: (error) => {
          console.error("Error in the subscription:", error);
        },
      });

    return () => {
      createSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
    };
  }, [filter]);

  return (
    <div className="w-full sm:h-[calc(100vh-80px)] h-[calc(100vh-120px)] relative sm:px-8 px-0 lg:pl-8 sm:pl-[105px] pl-0 pt-4 pb-4 ">
      <ModalDetailRequest
        isOpen={isDetailRequestModalOpen}
        onOpenChange={onDetailRequestModalOpenChange}
        id={idSelected}
        technicianId={user.sub}
        setTechnicianActivityStatus={setTechnicianActivityStatus}
        setServiceIdWaitingFor={setServiceIdWaitingFor}
        addressDistanceSelected={addressDistanceSelected}
        setAddressDistanceSelected={setAddressDistanceSelected}
        pricesTechnician={pricesTechnician}
      />
      <div className="w-full mb-3">
        <div className="w-[250px] dark:bg-zinc-800 bg-zinc-300 rounded-2xl flex items-center justify-center p-2 ">
          <Link href={"/user"} className="dark:text-zinc-400 text-zinc-600 text-[14px]">
            Technician panel
          </Link>
          <RiArrowDropRightLine className="dark:text-zinc-400 text-zinc-600 text-[25px] " />
          <Link href={"user/requests"} className=" text-[14px]">
            Requests
          </Link>
        </div>
      </div>
      <div className=" w-full sm:h-[calc(100vh-180px)] h-[calc(100vh-190px)] ">
        {isOnline ? (
          <div className="w-full flex-1 h-full flex gap-x-4 ">
            <div className="w-full dark:bg-zinc-900 bg-white dark:shadow-none sm:shadow-lg flex-1 flex-col flex  sm:rounded-xl rounded-none px-4 pt-4 h-full">
              <div className="w-full flex justify-between  mb-3">
                <div className="md:w-[320px] w-full flex flex-col gap-y-3">
                  <div className="flex gap-x-2 p-1 rounded-xl border-[2px] dark:border-zinc-600 border-zinc-300">
                    <div
                      onClick={() => setFilter("all")}
                      className={`md:w-[74px] w-1/4 py-1 cursor-pointer ${
                        filter === "all" ? " bg-emerald-600 text-white" : ""
                      }  font-semibold rounded-lg flex items-center justify-center text-[15px] transition-all`}
                    >
                      All
                    </div>
                    <div
                      onClick={() => setFilter("repair")}
                      className={`md:w-[74px] w-1/4 py-1 cursor-pointer ${
                        filter === "repair" ? "bg-emerald-600 text-white" : ""
                      }  font-semibold rounded-lg flex items-center justify-center text-[14px] transition-all`}
                    >
                      Repair
                    </div>
                    <div
                      onClick={() => setFilter("diagnostic")}
                      className={`md:w-[82px] w-1/4 py-1 cursor-pointer ${
                        filter === "diagnostic" ? "bg-emerald-600 text-white" : ""
                      }  font-semibold rounded-lg flex items-center justify-center text-[13px] transition-all`}
                    >
                      Diagnostic
                    </div>
                    <div
                      onClick={() => setFilter("towing")}
                      className={`md:w-[74px] w-1/4 py-1 cursor-pointer ${
                        filter === "towing" ? "bg-emerald-600 text-white" : ""
                      }  font-semibold rounded-lg flex items-center justify-center text-[14px] transition-all`}
                    >
                      Towing
                    </div>
                  </div>
                  <div className="w-full dark:text-zinc-400 text-zinc-700 mb-2">
                    {requests ? filteredRequests().length : 0} results found
                  </div>
                </div>
                <div className="md:block hidden">
                  <Slider
                    size="md"
                    step={10}
                    color="success"
                    label="Search ratio (miles)"
                    showSteps={true}
                    maxValue={50}
                    minValue={10}
                    defaultValue={20}
                    value={maxDistanceFilterSelected}
                    onChange={setMaxFilterSelected}
                    className="md:w-[200px] w-[100px]"
                  />
                </div>
              </div>
              <div className={`w-full flex flex-col  gap-y-3  sm:h-[calc(100vh-300px)] h-[calc(100vh-320px)] overflow-y-auto ${filteredRequests() && filteredRequests().length < 1 ? "justify-center items-center" : "" } `}>
                {loading ? (
                  <>
                    <div className="w-full rounded-lg min-h-[50px] h-[80px] dark:bg-zinc-600 bg-zinc-300 animate-pulse"></div>
                    <div className="w-full rounded-lg min-h-[50px] h-[80px] dark:bg-zinc-700 bg-zinc-400 animate-pulse"></div>
                    <div className="w-full rounded-lg min-h-[50px] h-[80px] dark:bg-zinc-600 bg-zinc-300 animate-pulse"></div>
                    <div className="w-full rounded-lg min-h-[50px] h-[80px] dark:bg-zinc-700 bg-zinc-400 animate-pulse"></div>
                  </>
                ) : (
                  filteredRequests() && filteredRequests().length > 0 ? (filteredRequests()?.map((request) => {
                    return (
                      <ServiceRequest
                        key={request.id}
                        id={request.id}
                        request={request}
                        showDetailRequest={showDetailRequest}
                        setAddressDistanceSelected={setAddressDistanceSelected}
                      />
                    );
                  })
                ):(
                  <div className="flex flex-col gap-y-2">
                    <Image
                      alt="noServices"
                      src={theme === "dark" ? noServices4 : noServicesLight}
                      placeholder="blur"
                      quality={100}
                      sizes="100vw"
                      className="object-cover md:w-[320px] md:h-[320px] md:min-h-[320px] w-[250px] h-[250px] min-h-[250px]"
                    />
                    <span className="md:w-[320px] w-[250px] text-center dark:text-zinc-600 text-zinc-400 text-[18px] font-bold">We found no new requests</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[320px] items-center p-3 overflow-y-auto xl:flex flex-col hidden h-full rounded-xl dark:bg-zinc-900 bg-white dark:shadow-none shadow-lg">
              <div className="w-[80%] text-center text-[20px] font-bold p-2 bg-emerald-600 mb-6 text-white shadow-lg">LEARN THE PROCESS</div>
              <div className="w-full flex items-center justify-center mb-4">
                  <div className="text-[30px] w-[40px] text-center font-bold">
                    1  
                  </div>
                  <div className="flex-1 pr-3">
                    <div className="text-[22px] font-bold">SEARCH</div>
                    <div className="text-[12px]">Find among the repair requests, to start.</div>
                  </div>
                  <div className="min-w-[45px] w-[45px] h-[45px] rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <RiSearchLine className="text-[25px] font-bold" />
                  </div>    
              </div>
              <div className="w-full flex items-center justify-center mb-4">
                  <div className="text-[30px] w-[40px] text-center font-bold">
                    2  
                  </div>
                  <div className="flex-1 pr-3">
                    <div className="text-[22px] font-bold">OFFER</div>
                    <div className="text-[12px]">Choose from requests and make an offer.</div>
                  </div>
                  <div className="min-w-[45px] w-[45px] h-[45px] rounded-full bg-zinc-700 text-white flex items-center justify-center shadow-md">
                    <RiSpeakLine  className="text-[25px] font-bold" />
                  </div>    
              </div>
              <div className="w-full flex items-center justify-center mb-4">
                  <div className="text-[30px] w-[40px] text-center font-bold">
                    3  
                  </div>
                  <div className="flex-1 pr-3">
                    <div className="text-[22px] font-bold">REPAIR</div>
                    <div className="text-[12px]">If you were assigned to the service, perform diagnosis and repair.</div>
                  </div>
                  <div className="min-w-[45px] w-[45px] h-[45px] rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <RiToolsFill  className="text-[25px] font-bold" />
                  </div>    
              </div>
              <div className="w-full flex items-center justify-center mb-4">
                  <div className="text-[30px] w-[40px] text-center font-bold">
                    4  
                  </div>
                  <div className="flex-1 pr-3">
                    <div className="text-[22px] font-bold">PAYMENT</div>
                    <div className="text-[12px]">Receive payment through stripe.</div>
                  </div>
                  <div className="min-w-[45px] w-[45px] h-[45px] rounded-full bg-zinc-700 text-white flex items-center justify-center shadow-md">
                    <RiMoneyDollarCircleLine   className="text-[30px] font-bold" />
                  </div>    
              </div>
            </div>
          </div>
        ) : (
          <div className="md:w-1/2 w-full rounded-md border-[2px] gap-y-3 dark:bg-zinc-900/40 bg-zinc-300 dark:border-zinc-600 border-zinc-400 p-4 flex flex-col justify-center items-center">
            <span className="flex gap-x-1">
              <RiErrorWarningFill className="w-[35px] text-[35px] text-zinc-600" />{" "}
              In order to access the list of requests and start interacting with
              them, you need to be in Online mode, you can change here
            </span>
            <button
              onClick={() => handleChangeStatus()}
              className="py-2 px-5 rounded-md dark:bg-emerald-500 bg-emerald-600 text-white"
            >
              Online Mode
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
