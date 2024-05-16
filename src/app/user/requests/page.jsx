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
  const {
    isOpen: isDetailRequestModalOpen,
    onOpen: onDetailRequestModalOpen,
    onOpenChange: onDetailRequestModalOpenChange,
  } = useDisclosure();

  const showDetailRequest = (id) => {
    setIdSelected(id);
    console.log("abrite hijo de remilputa");
    onDetailRequestModalOpen();
  };

  const retrieveData = async () => {
    try {
      setLoading(true);
      const { data } = await client.graphql({
        query: getAllRequestServices,
      });
      console.log(data);
      setRequests(data.listServices.items);
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
    const subscription = client.graphql({ query: ListenService }).subscribe({
      next: (data) => {
        setRequests((prevRequests) => [
          ...prevRequests,
          data.data.onCreateService,
        ]);
      },
      error: (error) => {
        console.error("Error in the subscription:", error);
      },
    });
    console.log("subscription", subscription);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="w-full h-[calc(100vh-100px)] relative pr-[20px]">
      <ModalDetailRequest
        isOpen={isDetailRequestModalOpen}
        onOpenChange={onDetailRequestModalOpenChange}
        id={idSelected}
        technicianId={user.sub}
        setTechnicianActivityStatus={setTechnicianActivityStatus}
        setServiceIdWaitingFor={setServiceIdWaitingFor}
      />
      <div className="w-full h-[calc(100vh-100px)] flex flex-col px-4 bg-zinc-800 rounded-xl pt-4">
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
        <div className="text-white w-full">
          {isOnline ? (
            <div className="w-full flex flex-col">
              <div className="w-[230px] p-2 text-center mb-3 bg-zinc-900/50 rounded-md font-bold border-[1px] border-zinc-700">
                We are using your location
              </div>
              <div className="w-1/2 bg-zinc-900/40 rounded-lg p-3 ">
                <div className="w-full text-white mb-3">
                  Click on the request to see information and be able to accept
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  {loading ? (
                    <span>Loading...</span>
                  ) : (
                    requests.map((request) => {
                      return (
                        <ServiceRequest
                          key={request.id}
                          id={request.id}
                          showDetailRequest={showDetailRequest}
                        />
                      );
                    })
                  )}
                </div>
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
