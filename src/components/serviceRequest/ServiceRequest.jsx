"use client";

import { RiArrowRightSLine, RiMapPin2Fill, RiCarFill } from "react-icons/ri";
import React, { useContext, useEffect, useState } from "react";
import { Geo } from "@aws-amplify/geo";
import { PlaceTechnicianContext } from "@/contexts/placeTechnician/PlaceTechnicianContext";
import { haversineDistance } from "@/app/user/requests/utils/distance";

const ServiceRequest = ({
  id,
  showDetailRequest,
  request,
  setAddressDistanceSelected,
}) => {
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const { technicianLocation } = useContext(PlaceTechnicianContext);
  const [distance, setDistance] = useState(null);

  const getAddressFromCoordinates = async (lat, lon) => {
    try {
      const response = await Geo.searchByCoordinates([lon, lat]);
      console.log("Esta es la direccion", response);

      if (response.label) {
        const addressObtained = response.label.split(",")[0];
        setAddress(addressObtained);
        return addressObtained;
      } else {
        throw new Error(
          "No se encontró ninguna dirección para las coordenadas proporcionadas."
        );
      }
    } catch (error) {
      console.error("Error al obtener la dirección:", error);
      return null;
    }
  };

  const retrieveDistanceAndAddress = async () => {
    setLoading(true);
    try {
      await getAddressFromCoordinates(
        request.originLatitude,
        request.originLongitude
      );
      if (technicianLocation && request) {
        const dist = haversineDistance(technicianLocation, [
          request.originLongitude,
          request.originLatitude,
        ]);
        setDistance(Math.round(dist));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    retrieveDistanceAndAddress();
  }, []);

  const handleClickOpen = () => {
    setAddressDistanceSelected({ address: address, distance: distance });
    showDetailRequest(id);
  };

  return (
    <div
      onClick={handleClickOpen}
      className="w-full flex border-[1px] border-zinc-700 bg-zinc-900/70 rounded-lg p-3 cursor-pointer"
    >
      {loading ? (
        <div className="w-full flex-col">
          <div className="w-full flex items-center justify-between gap-x-3 mb-2">
            <div className="w-full flex gap-x-4 items-center">
              <span className="h-[30px] font-bold w-1/2 bg-zinc-600 rounded-md animate-pulse"></span>
              <span className="h-[30px] w-[50px] bg-zinc-700 py-1 px-2 rounded-md animate-pulse"></span>
            </div>
          </div>
          <div className="w-full flex ">
            <div className="flex h-[30px] w-1/3 items-center py-1 px-3 rounded-lg bg-zinc-500 gap-x-1 animate-pulse "></div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-between">
          <div className="flex gap-x-4 items-center">
            <div className="h-[50px] px-3 rounded-xl bg-zinc-700 flex items-center justify-center relative">
              <RiMapPin2Fill className="text-emerald-500 text-[16px] absolute -top-2 -right-2" />
              <span className="text-[25px] flex gap-x-1 items-center font-bold mr-1">5</span>miles
            </div>
            <div className="flex flex-1 flex-col">
              <div className="w-full flex items-center justify-between gap-x-3 mb-2">
                <div className="flex gap-x-2 items-center">
                  <span className="text-[19px] font-bold uppercase">
                    {request.type}
                  </span>
                  <span className="text-zinc-600 text-[25px] font-bold">-</span>
                  <span className="text-[15px] bg-zinc-700 py-1 px-2 rounded-md text-zinc-300">
                    {address && address}
                  </span>
                </div>
              </div>
              <div className="w-full flex ">
                <div className="flex items-center py-1 px-3 border-transparent border-r-[1px] border-r-zinc-500 gap-x-1 text-zinc-200 ">
                  <RiCarFill className="text-emerald-600 text-[16px] " />
                  {`${request?.car?.model} ${request?.car?.year}`}
                </div>
                <div className="flex px-3 gap-x-3">
                  <div className="py-1 px-2 bg-emerald-600 rounded-md text-white">
                    Motor
                  </div>
                  <div className="py-1 px-2 bg-emerald-600 rounded-md text-white">
                    Tires
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[30px] flex items-center justify-center ">
            <RiArrowRightSLine className="text-zinc-500 text-[30px]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequest;
