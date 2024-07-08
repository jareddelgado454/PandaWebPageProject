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
    <div className="w-full overflow-y-auto sm:h-[calc(100vh-80px)] flex flex-col h-[calc(100vh-120px)] relative  sm:px-8 px-3 lg:pl-8 sm:pl-[105px] pl-2 pt-4 pb-4">
        <div className="w-full mb-6">
          <div className="w-[340px] dark:bg-zinc-800 bg-zinc-300 rounded-2xl flex items-center justify-center p-2 ">
            <Link href={"/user"} className="dark:text-zinc-400 text-zinc-700 text-[14px]">
              Technician panel
            </Link>
            <RiArrowDropRightLine className="dark:text-zinc-400 text-zinc-700 text-[25px] " />
            <Link href={"/user"} className="dark:text-zinc-400 text-zinc-700 text-[14px]">
              Profile
            </Link>
            <RiArrowDropRightLine className="dark:text-zinc-400 text-zinc-700 text-[25px] " />
            <Link href={"/user/personal-information"} className=" text-[14px]">
              Specialization
            </Link>
          </div>
        </div>
        <div className="w-full font-bold flex flex-col mb-6">
          <h4 className="w-full text-[24px] font-bold mb-2">
            Your Specialization Area
          </h4>
          <span className="dark:text-gray-300 text-zinc-700">
            It is necessary that this information be updated. Here you can
            change the prices for diagnosis and repair.
          </span>
        </div>
        <div className="w-full">
          <div className="sm:w-[400px] w-full dark:bg-zinc-900/50 bg-white dark:shadow-none shadow-lg rounded-md p-3">
            <div className="w-full flex  items-center gap-x-2 text-[17px] font-semibold mb-2">
              <RiInformationFill className="text-zinc-700 text-[25px]" /> Your
              prices
            </div>
            <div className="w-full flex gap-x-1 dark:text-zinc-400 text-zinc-700 text-[13px] mb-2">
              <span className="text-red-400">*</span> You need to complete these
              prices
            </div>
            <div className="w-full flex gap-x-2 justify-between items-center mb-3">
              <div className="w-[150px]  text-[16px]">
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
              <div className="w-[150px]  text-[16px]">
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
  );
};

export default EspecializationArea;
