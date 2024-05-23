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
} from "react-icons/ri";
import { Contexto } from "../layout";
import Image from "next/image";
import defaultProfilePicture from "../../../../public/image/defaultProfilePicture.jpg";
import ServiceRequest from "@/components/serviceRequest/ServiceRequest";
import { getAllRequestServices } from "@/graphql/services/queries/query";
import { ListenService } from "@/graphql/services/subscriptions/subscription";
import { client } from "@/contexts/AmplifyContext";
import { useDisclosure } from "@nextui-org/react";
import ModalDetailRequest from "@/components/serviceRequest/ModalDetailRequest";
import { getPricesTechnician } from "@/graphql/users/query/technician";
import { listenDeleteService } from "@/graphql/services/subscriptions/subscription";
import {Slider} from "@nextui-org/react";

const Requests = () => {
  const {
    isOnline,
    handleChangeStatus,
    user,
    setTechnicianActivityStatus,
    setServiceIdWaitingFor,
  } = useContext(Contexto);
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idSelected, setIdSelected] = useState(null);
  const [addressDistanceSelected, setAddressDistanceSelected] = useState(null);
  const [pricesTechnician, setPricesTechnician] = useState(null);
  const [filter, setFilter] = useState("all");
  const {
    isOpen: isDetailRequestModalOpen,
    onOpen: onDetailRequestModalOpen,
    onOpenChange: onDetailRequestModalOpenChange,
  } = useDisclosure();

  const showDetailRequest = (id) => {
    setIdSelected(id);
    onDetailRequestModalOpen();
  };

  const filteredRequests = () => {
    if (filter === "all") {
      return requests;
    }
    return requests.filter((request) => request.type === filter);
  };

  const retrieveData = async () => {
    try {
      setLoading(true);
      const { data } = await client.graphql({
        query: getAllRequestServices,
      });
      console.log(data);
      setRequests(data.listServices.items);
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
          if (filter === "all" || newRequest.type === filter) {
            setRequests((prevRequests) => [...prevRequests, newRequest]);
          }
          console.log("Nueva request", data);
        },
        error: (error) => {
          console.error("Error in the subscription:", error);
        },
      });
    console.log("createSubscription ", createSubscription);

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
    console.log("deleteSubscription ", deleteSubscription);

    return () => {
      createSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
    };
  }, [filter]);

  return (
    <div className="w-full h-[calc(100vh-100px)] relative pr-[20px]">
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
      <div className="w-full h-[calc(100vh-100px)] flex flex-col px-4 bg-zinc-800 rounded-xl pt-4 pb-3">
        <div className="w-full mb-6">
          <div className="w-[250px] bg-zinc-700 rounded-2xl flex items-center justify-center p-2 ">
            <Link href={"/user"} className="text-zinc-400">
              Technician panel
            </Link>
            <RiArrowDropRightLine className="text-zinc-400 text-[25px] " />
            <Link href={"user/requests"} className="text-white">
              Requests
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col mb-4">
          <span className="w-full text-white text-[30px] font-bold">
            Real-time car repair requests
          </span>
          <span className="w-full text-zinc-400 text-[17px] font-semibold">
            Increase the efficiency of your work, finding here the current
            requests of clients who are looking for technicians immediately.
          </span>
        </div>
        <div className="text-white w-full flex-1 ">
          {isOnline ? (
            <div className="w-full h-[100%] flex gap-x-4">
              <div className="w-[70%] flex flex-col  gap-y-3">
                <div className="w-full bg-zinc-900/60 flex-1 flex-col flex rounded-xl p-4 h-full">
                  <div className="w-full flex justify-between text-white mb-3">
                    <div className="flex flex-col gap-y-3">
                      <div className="flex gap-x-2">
                        <div
                          onClick={() => setFilter("all")}
                          className={`w-[74px] py-1 cursor-pointer ${
                            filter === "all" ? "bg-emerald-500" : ""
                          } text-white font-semibold rounded-lg flex items-center justify-center text-[15px]`}
                        >
                          All
                        </div>
                        <div
                          onClick={() => setFilter("repair")}
                          className={`w-[74px] py-1 cursor-pointer ${
                            filter === "repair" ? "bg-emerald-500" : ""
                          } text-white font-semibold rounded-lg flex items-center justify-center text-[15px]`}
                        >
                          Repair
                        </div>
                        <div
                          onClick={() => setFilter("diagnostic")}
                          className={`w-[80px] py-1 cursor-pointer ${
                            filter === "diagnostic" ? "bg-emerald-500" : ""
                          } text-white font-semibold rounded-lg flex items-center justify-center text-[15px]`}
                        >
                          Diagnostic
                        </div>
                        <div
                          onClick={() => setFilter("towing")}
                          className={`w-[74px] py-1 cursor-pointer ${
                            filter === "towing" ? "bg-emerald-500" : ""
                          } text-white font-semibold rounded-lg flex items-center justify-center text-[15px]`}
                        >
                          Towing
                        </div>
                      </div>
                      <div className="w-full text-zinc-400 mb-2">
                        {requests ? filteredRequests().length : 0} results found
                      </div>
                    </div>
                    <div>
                      <Slider   
                        size="md"
                        step={1}
                        color="success"
                        label="Search ratio (miles)"
                        showSteps={true} 
                        maxValue={5} 
                        minValue={0} 
                        defaultValue={3}
                        className="w-[200px]" 
                      />
                    </div>
                  </div>
                  <div className="w-full flex-1 flex flex-col gap-y-3 overflow-y-auto">
                    {loading ? (
                      <>
                        <div className="w-full rounded-lg h-[80px] bg-zinc-600 animate-pulse"></div>
                        <div className="w-full rounded-lg h-[80px] bg-zinc-700 animate-pulse"></div>
                        <div className="w-full rounded-lg h-[80px] bg-zinc-600 animate-pulse"></div>
                        <div className="w-full rounded-lg h-[80px] bg-zinc-700 animate-pulse"></div>
                      </>
                    ) : (
                      filteredRequests().map((request) => {
                        return (
                          <ServiceRequest
                            key={request.id}
                            id={request.id}
                            request={request}
                            showDetailRequest={showDetailRequest}
                            setAddressDistanceSelected={
                              setAddressDistanceSelected
                            }
                          />
                        );
                      })
                    )}
                  </div>
                </div>
                <div className="w-full h-[50px] bg-zinc-900/60 rounded-xl flex items-center justify-center gap-x-1">
                  <div className="p-2 cursor-pointer h-[40px] w-[40px] rounded-lg flex items-center justify-center ">
                    <RiArrowLeftSLine />
                  </div>
                  <div className="p-2 cursor-pointer h-[40px] w-[40px] rounded-lg flex items-center justify-center">
                    1
                  </div>
                  <div className="p-2 cursor-pointer h-[40px] w-[40px] rounded-lg flex items-center justify-center ">
                    <RiArrowRightSLine />
                  </div>
                </div>
              </div>
              <div className="flex-1 h-full rounded-xl bg-zinc-900/60">
                Information Panel
              </div>
            </div>
          ) : (
            <div className="w-1/2 rounded-md border-[2px] gap-y-3 bg-zinc-900/40 border-zinc-600 p-4 flex flex-col justify-center items-center">
              <span className="flex gap-x-1">
                <RiErrorWarningFill className="w-[35px] text-[35px] text-zinc-600" />{" "}
                In order to access the list of requests and start interacting
                with them, you need to be in Online mode, you can change here
              </span>
              <button
                onClick={() => handleChangeStatus()}
                className="py-2 px-5 rounded-md bg-emerald-500"
              >
                Online Mode
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
