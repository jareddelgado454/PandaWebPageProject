"use client";

import { RiArrowRightSLine, RiMapPin2Fill, RiCarFill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { getRequestServiceById } from "@/graphql/services/queries/query";
import { client } from '@/contexts/AmplifyContext';
import { Geo } from "@aws-amplify/geo";

const ServiceRequest = ({ id, showDetailRequest }) => {
  const [loading, setLoading] = useState(true);
  const [requestService, setRequestService] = useState(null);
  const [address, setAddress] = useState(null);

  const getAddressFromCoordinates = async(lat, lon) => {
    try {
      const response = await Geo.searchByCoordinates([lon,lat]);
      console.log("Esta es la direccion", response);

      if (response.addressNumber && response.street) {
        const addressObtained = response.street+" "+response.addressNumber;
        console.log(addressObtained);
        setAddress(addressObtained);
        return addressObtained;
      } else {
        throw new Error('No se encontró ninguna dirección para las coordenadas proporcionadas.');
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
      return null;
    }
  }

  const retrieveData = async () => {
    setLoading(true);
    try {
      const { data } = await client.graphql({
        query: getRequestServiceById,
        variables: {
          id: id,
        },
      });
      console.log("esta es la respuesta de cada request service",data);
      setRequestService(data.getService);
      await getAddressFromCoordinates(data.getService.originLatitude, data.getService.originLongitude);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div
      onClick={() => showDetailRequest(id)}
      className="w-full flex border-[1px] border-zinc-600 rounded-lg p-3 cursor-pointer"
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full flex justify-between">
          <div className="flex flex-1 flex-col">
            <div className="w-full flex items-center justify-between gap-x-3 mb-2">
              <div className="flex gap-x-4 items-center">
                <span className="text-[19px] font-bold">{address && address}</span>
                <span className="text-[15px] bg-zinc-700 py-1 px-2 rounded-md text-zinc-300">
                  {
                    requestService.type
                  }
                </span>
                <div className="flex items-center py-1 px-3  gap-x-1 text-zinc-300 ">
                  <RiMapPin2Fill className="text-emerald-600 text-[16px] " />1
                  miles
                </div>
              </div>
            </div>
            <div className="w-full flex ">
              <div className="flex items-center py-1 px-3 border-transparent border-r-[1px] border-r-zinc-500 gap-x-1 text-zinc-200 ">
                <RiCarFill className="text-emerald-600 text-[16px] " />
                Mercedes A-class Sedan 2018
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
          <div className="w-[30px] flex items-center justify-center ">
            <RiArrowRightSLine className="text-zinc-500 text-[30px]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequest;
