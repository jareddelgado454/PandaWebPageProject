"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  RiArrowDropRightLine,
  RiMailOpenFill,
  RiAlertFill,
  RiInformationFill,
} from "react-icons/ri";
import { Input, Button } from "@nextui-org/react";
import { updatePricesTechnician } from "@/graphql/users/mutation/technicians";
import { client } from "@/contexts/AmplifyContext";
import { Contexto } from "../layout";
import { handleRetrieveTechnician } from "@/api";

const EspecializationArea = () => {
  const [diagnosisPrice, setDiagnosisPrice] = useState("");
  const [repairPrice, setRepairPrice] = useState("");
  const [updatingPrices, setUpdatingPrices] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(Contexto);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    setLoading(true);
    try {
      const response = await handleRetrieveTechnician(user.sub);
      if (
        response.getTechnician.repairPriceHour &&
        response.getTechnician.diagnosticPrice
      ) {
        setDiagnosisPrice(response.getTechnician.diagnosticPrice);
        setRepairPrice(response.getTechnician.repairPriceHour);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log("user", user);

  const handleUpdatePrices = async () => {
    setUpdatingPrices(true);
    console.log(diagnosisPrice, repairPrice);
    if (diagnosisPrice != "" && repairPrice != "") {
      try {
        const response = await client.graphql({
          query: updatePricesTechnician,
          variables: {
            input: {
              id: user.sub,
              diagnosticPrice: diagnosisPrice,
              repairPriceHour: repairPrice,
            },
          },
        });
        console.log("Se actualizo los precios con exito", response);
        setUpdatingPrices(false);
      } catch (error) {
        console.log(error);
        setUpdatingPrices(false);
      }
    }
  };

  return (
    <div className="w-full h-[calc(100vh-100px)] relative pr-[20px]">
      <div className="w-full h-[calc(100vh-100px)] flex flex-col px-4 bg-zinc-800 rounded-xl pt-4">
        <div className="w-full mb-6">
          <div className="w-[340px] bg-zinc-700 rounded-2xl flex items-center justify-center p-2 ">
            <Link href={"/user"} className="text-zinc-400">
              Technician panel
            </Link>
            <RiArrowDropRightLine className="text-zinc-400 text-[25px] " />
            <Link href={"/user"} className="text-zinc-400">
              Profile
            </Link>
            <RiArrowDropRightLine className="text-zinc-400 text-[25px] " />
            <Link href={"/user/personal-information"} className="text-white">
              Specialization
            </Link>
          </div>
        </div>
        <div className="w-full text-white flex flex-col mb-6">
          <h4 className="w-full text-[24px] font-bold mb-2">
            Your Specialization Area
          </h4>
          <span className="text-gray-300">
            It is necessary that this information be updated. Here you can
            change the prices for diagnosis and repair.
          </span>
        </div>
        <div className="w-full">
          <div className="w-[400px] bg-zinc-900/50 rounded-md p-3">
            <div className="w-full flex text-white items-center gap-x-2 text-[17px] font-semibold mb-2">
              <RiInformationFill className="text-zinc-700 text-[25px]" /> Your
              prices
            </div>
            <div className="w-full flex gap-x-1 text-zinc-400 text-[13px] mb-2">
              <span className="text-red-400">*</span> You need to complete these
              prices
            </div>
            <div className="w-full flex gap-x-2 justify-between items-center mb-3">
              <div className="w-[150px] text-white text-[16px]">
                Diagnosis Price :
              </div>
              {loading ? (
                <div>Loading</div>
              ) : (
                <Input
                  type="number"
                  label=""
                  placeholder="0.00"
                  labelPlacement="outside"
                  className="flex-1"
                  value={diagnosisPrice}
                  onValueChange={setDiagnosisPrice}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
              )}
            </div>
            <div className="w-full flex gap-x-2 justify-between items-center mb-3">
              <div className="w-[150px] text-white text-[16px]">
                Repair Price p / h :
              </div>
              {loading ? (
                <div>Loading</div>
              ) : (
                <Input
                  type="number"
                  label=""
                  placeholder="0.00"
                  labelPlacement="outside"
                  className="flex-1"
                  value={repairPrice}
                  onValueChange={setRepairPrice}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
              )}
            </div>
            <Button
              isDisabled={updatingPrices}
              isLoading={updatingPrices}
              onClick={() => handleUpdatePrices()}
              className="w-full bg-emerald-600 text-white rounded-lg p-3 text-[17px] font-semibold flex items-center justify-center mb-2"
            >
              Set Prices
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EspecializationArea;
