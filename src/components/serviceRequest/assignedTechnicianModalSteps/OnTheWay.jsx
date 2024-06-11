import React, { useEffect, useState, useContext } from "react";
import { MapProvider } from "@/contexts/mapTechnician/MapTechnicianProvider";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import goingLocation from "../../../../public/loading/loading4.gif";
import TechnicianServiceMap from "@/components/technicianMaps/technicianMap/TechnicianServiceMap";
import { Geo } from "@aws-amplify/geo";
import { PlaceTechnicianContext } from "@/contexts/placeTechnician/PlaceTechnicianContext";
import { haversineDistance } from "@/app/user/requests/utils/distance";
import { moveTowards } from "@/app/user/requests/utils/moveTowards";
import {
  handleUpdateStatusService,
  handleUpdateTechnicianLocationInService,
} from "@/api";
import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiMapPin2Fill,
  RiToolsFill,
  RiMoneyDollarCircleFill,
  RiCarFill,
  RiMessage2Fill,
  RiPhoneFill,
} from "react-icons/ri";
import { Contexto } from "@/app/user/layout";

const OnTheWay = ({ isOpen, serviceAssigned, setServiceStatus }) => {
  const { technicianLocation, isLoading, updateTechnicianLocation } =
    useContext(PlaceTechnicianContext);
  const [address, setAddress] = useState(null);
  const [distance, setDistance] = useState(0);
  const [inTheLocation, setInTheLocation] = useState(false);
  const {user} = useContext(Contexto);

  const getAddressFromCoordinates = async (lat, lon) => {
    try {
      const response = await Geo.searchByCoordinates([lon, lat]);

      if (response.label) {
        const addressObtained = response.label.split(",")[0];
        setAddress(addressObtained);
        return address;
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

  const handleStartService = async () => {
    try {
      const response = await handleUpdateStatusService({
        serviceId: serviceAssigned.id,
        status: "in progress"
      });
      setServiceStatus("in progress");
      console.log("Cambiaste el status del servicio correctamente", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateLocation = async () => {
    if (technicianLocation) {
      const customerLocation = [
        serviceAssigned.originLongitude,
        serviceAssigned.originLatitude,
      ];
      const newLocation = moveTowards(
        technicianLocation,
        customerLocation,
        0.1
      );
      try {
        const response = await handleUpdateTechnicianLocationInService({
          id: serviceAssigned.id,
          destLatitude: newLocation[1],
          destLongitude: newLocation[0],
          serviceCustomerId: serviceAssigned.customer.id,
        });
        updateTechnicianLocation(newLocation);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      getAddressFromCoordinates(
        serviceAssigned.originLatitude,
        serviceAssigned.originLongitude
      );
    }
  }, []);

  useEffect(() => {
    if (technicianLocation && serviceAssigned) {
      const distanceInMiles = haversineDistance(
        [serviceAssigned.originLongitude, serviceAssigned.originLatitude],
        technicianLocation
      );
      setDistance(distanceInMiles);
      if (distanceInMiles < 0.1) {
        setInTheLocation(true);
      }
    }
  }, [technicianLocation, serviceAssigned]);

  return (
    <>
      <div className="absolute md:w-[500px] w-[80%] h-[80px] flex justify-center items-center  shadow-lg bg-zinc-800/90 left-1/2 transform -translate-x-1/2 top-3 z-50 rounded-xl">
        <div className="flex flex-col items-center justify-center">
          <div className="w-[40px] h-[40px] border-[2px] flex items-center justify-center border-emerald-400 rounded-full ">
            <div className="w-[30px] h-[30px] bg-emerald-400 rounded-full flex justify-center items-center">
              <RiMapPin2Fill className="text-zinc-700" />
            </div>
          </div>
          <span className="text-zinc-200 text-[14px]">On my Way</span>
        </div>
        <div className=" w-[30px] h-[25px] border-t-[2px] border-emerald-500 opacity-60"></div>
        <div className="flex flex-col items-center justify-center opacity-60">
          <div className="w-[40px] h-[40px] border-[2px] flex items-center justify-center border-emerald-400 rounded-full ">
            <div className="w-[30px] h-[30px] bg-emerald-400 rounded-full flex justify-center items-center">
              <RiToolsFill className="text-zinc-700 text-[20px]" />
            </div>
          </div>
          <span className="text-zinc-200 text-[14px]">On Service</span>
        </div>
        <div className=" w-[30px] h-[25px] border-t-[2px] border-emerald-500 opacity-60"></div>
        <div className="flex flex-col items-center justify-center opacity-60">
          <div className="w-[40px] h-[40px] border-[2px] flex items-center justify-center border-emerald-400 rounded-full ">
            <div className="w-[30px] h-[30px] bg-emerald-400 rounded-full flex justify-center items-center">
              <RiMoneyDollarCircleFill className="text-zinc-700 text-[22px]" />
            </div>
          </div>
          <span className="text-zinc-200 text-[14px]">Payment</span>
        </div>
      </div>
      <MapProvider>
        <TechnicianServiceMap
          customerLocation={{
            lon: serviceAssigned.originLongitude,
            lat: serviceAssigned.originLatitude,
          }}
        />
      </MapProvider>
      <div className="w-full h-[25%] bg-zinc-800 rounded-t-3xl shadowContainer p-4 z-40">
        <div className="w-full flex justify-between items-center mb-2">
          <div className="flex gap-x-2 items-center">
            <span className="text-[25px] font-bold">David Saavedra</span>
            <span className="text-emerald-500 text-[25px]">-</span>
            <span className="text-zinc-300 font-semibold text-[20px]">
              {address && address}
            </span>
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
          <div className="p-1 px-2 text-[14px] rounded-lg bg-zinc-600">
            {serviceAssigned.type}
          </div>
          <div className="w-full text-[16px] flex gap-x-2 items-center border-l-[1px] border-zinc-600 pl-2">
            <RiCarFill className="text-[20px] text-emerald-500" />
            Mercedes A-class Sedan 2018
          </div>
        </div>
        {!inTheLocation ? (
          <div className="w-full flex flex-col items-center justify-center bg-zinc-700 rounded-lg py-2">
            <div className="w-full flex gap-x-3 items-center justify-center">
              <div className="flex ">
                <Image
                  src={goingLocation}
                  quality={100}
                  className="w-[40px] h-[40px]"
                />
              </div>
              <div className="text-[25px] font-bold">
                The customer is waiting for you...
              </div>
            </div>
            <div className="text-center text-[17px]">
              You are{" "}
              <span className="text-[28px] font-bold">
                {Math.floor(distance)} miles
              </span>{" "}
              away
              <Button onClick={() => handleUpdateLocation()} className="mt-4">
                Update Location
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center gap-y-2">
            <div className="w-full text-center text-[25px] font-bold">
              You arrived at the service location
            </div>
            <div className="flex gap-x-3">
              <div className="w-[200px] flex items-center justify-center gap-x-1 py-2 rounded-md border-[2px] cursor pointer border-zinc-500 text-zinc-300 cursor-pointer text-[16px]">
                <RiAlertFill className="text-zinc-500" /> The client isn`t here
              </div>
              <div
                className="w-[200px] flex items-center justify-center gap-x-1 py-2 rounded-md border-[2px] cursor pointer border-emerald-500 text-white bg-emerald-500 cursor-pointer text-[18px]"
                onClick={() => handleStartService()}
              >
                <RiCheckboxCircleFill />
                Start Service
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OnTheWay;
