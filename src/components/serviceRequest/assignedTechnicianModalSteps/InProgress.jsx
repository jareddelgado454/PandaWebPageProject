"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  RiAlertFill,
  RiMapPin2Fill,
  RiToolsFill,
  RiMoneyDollarCircleFill,
  RiCheckFill,
} from "react-icons/ri";
import { Select, SelectItem } from "@nextui-org/react";
import { repairTasks } from "@/assets/data/RepairTasks";
import { handleUpdatePaymentLinkService, handleUpdateStatusService, handleUpdateTotalService } from "@/api";
import Stripe from "stripe";
import { Contexto } from "@/app/user/layout";

const InProgress = ({ serviceAssigned, isOpen, setServiceStatus }) => {
  const [values, setValues] = useState(new Set([]));
  const [prices, setPrices] = useState({});
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [isRepairing, setIsRepairing] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const {user} = useContext(Contexto);
  console.log("useeeeeeeeeeeeeeeeer",user);
  console.log("serviceeeee assigned", serviceAssigned);

  const stripe = new Stripe('sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf');

  const handlePriceChange = (key, price) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [key]: parseFloat(price) || 0,
    }));
  };

  const handleDiscountChange = (e) => {
    setDiscount(parseFloat(e.target.value) || 0);
  };

  const handleTaxChange = (e) => {
    setTax(parseFloat(e.target.value) || 0);
  };

  const calculateTotal = () => {
    const subtotal = Array.from(values).reduce((total, key) => {
      return total + (prices[key] || 0);
    }, 0);
    const total = subtotal - discount + (subtotal * tax) / 100;
    return total.toFixed(2);
  };

  const validate = () => {
    if (values.size === 0) {
      setAlertMessage(
        "You need to select at least one item to send the estimate."
      );
      return false;
    }
    for (let key of values) {
      if (!prices[key] || prices[key] <= 0) {
        setAlertMessage(
          "You need to assign a price greater than zero to all selected items."
        );
        return false;
      }
    }
    setAlertMessage("");
    return true;
  };

  const handleSendEstimate = async () => {
    if (validate()) {
      const total = parseFloat(calculateTotal());
      let applicationFeeAmount = 0;
      if (user["custom:subscription"] === "free") {
        applicationFeeAmount = Math.round(total * 10);
      } 
      try {
        const session = await stripe.checkout.sessions.create(
          {
            payment_method_types: ["card"],
            line_items: [
              {
                price_data: {
                  currency: "usd",
                  product_data: {
                    name: "Repair Service",
                  },
                  unit_amount: Math.round(total * 100),
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            payment_intent_data: {
              application_fee_amount: applicationFeeAmount,
              metadata: {
                serviceType: serviceAssigned.type
              } 
            },
            success_url:`https://master.d3dtglewderhtg.amplifyapp.com/customer/request/${serviceAssigned.id}?paymentStatus=completed`,
            cancel_url:`https://master.d3dtglewderhtg.amplifyapp.com/customer/request/${serviceAssigned.id}?paymentStatus=failed`,
            customer_email:"test@gmail.com",
          },
          {
            stripeAccount: user["custom:stripeId"], 
          }
        );

        if(session){
          const response = await handleUpdatePaymentLinkService({
              serviceId: serviceAssigned.id,
              paymentLink: session.url,
          });
          console.log(response);
        }

        const response = await handleUpdateTotalService({
          serviceId: serviceAssigned.id,
          total: total,
        });
        console.log("Aqui la respuesta", response);
        setIsRepairing(true);
      } catch (error) {
        console.log(error);
      }
      console.log("Estimate sent to the database:", {
        items: Array.from(values),
        prices,
        discount,
        tax,
        total: calculateTotal(),
      });
    }
  };

  const finishRepair = async () => {
    try {
      const response = await handleUpdateStatusService({
        serviceId: serviceAssigned.id,
        status: "in progress",
      });
      console.log(response);
      setServiceStatus("payment");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(values.size);
  }, [values]);

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 items-center p-3 gap-y-4 overflow-y-auto">
      <div className="md:w-[500px] sm:w-[80%] w-[95%] h-[80px] flex justify-center items-center shadow-lg bg-zinc-800/90 z-50 rounded-xl mb-4">
        <div className="flex flex-col items-center justify-center">
          <div className="w-[40px] h-[40px] border-[2px] flex items-center justify-center border-emerald-400 rounded-full">
            <div className="w-[30px] h-[30px] bg-emerald-400 rounded-full flex justify-center items-center">
              <RiCheckFill className="text-zinc-700 text-[23px] font-bold" />
            </div>
          </div>
          <span className="text-zinc-200 sm:text-[14px] text-[11px]">On my Way</span>
        </div>
        <div className="w-[30px] h-[25px] border-t-[2px] border-emerald-500 opacity-60"></div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-[40px] h-[40px] border-[2px] flex items-center justify-center border-emerald-400 rounded-full">
            <div className="w-[30px] h-[30px] bg-emerald-400 rounded-full flex justify-center items-center">
              <RiToolsFill className="text-zinc-700 text-[20px]" />
            </div>
          </div>
          <span className="text-zinc-200 sm:text-[14px] text-[11px]">On Service</span>
        </div>
        <div className="w-[30px] h-[25px] border-t-[2px] border-emerald-500 opacity-60"></div>
        <div className="flex flex-col items-center justify-center opacity-60">
          <div className="w-[40px] h-[40px] border-[2px] flex items-center justify-center border-emerald-400 rounded-full">
            <div className="w-[30px] h-[30px] bg-emerald-400 rounded-full flex justify-center items-center">
              <RiMoneyDollarCircleFill className="text-zinc-700 text-[22px]" />
            </div>
          </div>
          <span className="text-zinc-200 sm:text-[14px] text-[11px]">Payment</span>
        </div>
      </div>
      {isRepairing ? (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/image/MakingService.png"
            alt="Reparación en curso"
            className="lg:w-[500px] lg:h-[500px] md:w-[400px] sm:w-[70%] w-[90%] object-cover rounded-lg mb-4"
          />
          <div className="text-zinc-400 lg:text-[22px] md:text-[20px] tex-[16px] mb-4 text-center flex flex-col">
            <span className="text-zinc-200 lg:text-[30px] md:text-[25px] text-[20px] font-bold">Repair in process</span> When you finish press the button to finish the
            payment process
          </div>
          <button
            onClick={() => finishRepair()}
            className="md:w-[200px] w-[90%] text-center px-6 p-2 bg-emerald-600 hover:bg-emerald-700 transition-all rounded-lg cursor-pointer md:text-[18px] text-[16px]"
          >
            Complete repair
          </button>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col text-white px-4 border-b-[2px] border-zinc-800 pb-3">
            <div className="md:text-[23px] text-[19px] font-semibold border-b-[2px] border-zinc-800 mb-4">
              COMPLETE this when you{" "}
              <span className="text-emerald-300">finish the diagnosis</span>
            </div>
            <div className="text-zinc-400 mb-3 md:text-[18px] text-[15px]">
              Select{" "}
              <span className="text-white font-semibold">one or more</span> of
              these options that cover the repair work that can be done to the
              car
            </div>
            <Select
              label="Repairing Diagnosis"
              selectionMode="multiple"
              placeholder="Select what will be repaired"
              selectedKeys={values}
              className="md:w-1/2 w-full text-white"
              onSelectionChange={setValues}
            >
              {repairTasks.map((repairTask) => (
                <SelectItem key={repairTask.key} className="text-white">
                  {repairTask.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="w-full flex flex-col gap-y-2 px-3 border-b-[2px] border-zinc-800 pb-4">
            {values.size === 0 ? (
              <div className="flex items-center text-[17px] text-zinc-500 p-2">
                You have not selected any item (0)
              </div>
            ) : (
              <>
                <ul className="text-white flex flex-col sm:w-1/2 w-full gap-y-2">
                  {Array.from(values).map((key) => {
                    const task = repairTasks.find((task) => task.key == key);
                    return (
                      <li key={key} className="flex flex-col">
                        <span className="text-zinc-300">
                          {task?.label} ($) :
                        </span>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={prices[key] || ""}
                          onChange={(e) =>
                            handlePriceChange(key, e.target.value)
                          }
                          className="text-white bg-zinc-800 p-2 rounded-md"
                        />
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
          <div className="w-full flex flex-col text-white mt-4 px-3">
            <div className="md:w-1/2 w-full flex gap-x-2 items-center">
              <label className="w-1/2 flex flex-col  gap-y-1 text-zinc-300">
                Tax (%) :
                <input
                  type="number"
                  placeholder="Tax"
                  value={tax}
                  onChange={handleTaxChange}
                  className="text-white bg-zinc-800 p-2 rounded-md"
                />
              </label>
              <label className="w-1/2 flex flex-col gap-y-1 text-zinc-300">
                Discount ($) :
                <input
                  type="number"
                  placeholder="Discount"
                  value={discount}
                  onChange={handleDiscountChange}
                  className="text-white bg-zinc-800 p-2 rounded-md"
                />
              </label>
            </div>
            <div className="w-full mt-4">
              <div>
                <span className="text-[18px] font-semibold">
                  Total Estimated:
                </span>{" "}
                {values.size === 0 ? (
                  <span className="text-zinc-400">0.00</span>
                ) : (
                  calculateTotal()
                )}
              </div>
            </div>
          </div>
          {alertMessage && (
            <div className="w-full px-3">
              <div className="bg-red-500 flex items-center gap-x-2 w-full p-2">
                <RiAlertFill className="text-[22px] text-red-300" />
                {alertMessage}
              </div>
            </div>
          )}
          <div className="w-full flex p-3">
            <div
              onClick={() => handleSendEstimate()}
              className="md:w-1/2 w-full px-6 p-2 text-center bg-emerald-600 hover:bg-emerald-700 transition-all rounded-lg cursor-pointer"
            >
              Send Estimated
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InProgress;
