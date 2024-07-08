"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  RiArrowDropRightLine,
  RiMailOpenFill,
  RiAlertFill,
  RiToolsFill,
  RiArrowUpSFill,
  RiCoinsLine,
  RiCoinFill,
  RiTruckFill,
  RiArrowRightUpLine,
  RiCircleFill,
} from "react-icons/ri";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Stripe from "stripe";
import { Contexto } from "../layout";
import { startOfWeek, endOfWeek, isWithinInterval, format } from "date-fns";
import WeeklyChart from "@/components/chartjs/technicianFinancialPanel/WeeklyChart";
import MonthlyChart from "@/components/chartjs/technicianFinancialPanel/MonthlyChart";
import AnnualChart from "@/components/chartjs/technicianFinancialPanel/AnnualyChart";

const Finances = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(Contexto);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [annualData, setAnnualData] = useState([]);
  const [chartMode, setChartMode] = useState("weekly");

  const [finances, setFinances] = useState({
    totalAmount: 0,
    totalCommission: 0,
    totalStripeFee: 0,
    numberRepair:0,
    numberTowing:0,
    serviceTypes: {
      repair: 0,
      towing: 0,
    },
  });

  const [percentages, setPercentages] = useState({
    commissionPercentage: 33,
    repairPercentage: 33,
    towingPercentage: 33,
  });

  const TEST_SECRET_KEY =
    "sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf";
  const stripe = new Stripe(TEST_SECRET_KEY);

  const getPaymentsByTechnician = async (connectAccountId) => {
    let payments = [];
    let hasMore = true;
    let startingAfter = null;

    while (hasMore) {
      const response = await stripe.paymentIntents.list({
        limit: 100,
        starting_after: startingAfter,
        stripeAccount: connectAccountId,
      });

      payments = payments.concat(response.data);
      hasMore = response.has_more;

      if (hasMore) {
        startingAfter = response.data[response.data.length - 1].id;
      }
    }

    return payments;
  };

  const calculateFinances = async (connectAccountId) => {
    let totalAmount = 0;
    let totalCommission = 0;
    let totalStripeFee = 0;
    const serviceTypes = { repair: 0, towing: 0 };
    let numberRepairs = 0;
    let numberTowings = 0;
    const weeklyData = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    };
    const monthlyData = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };
    const annualData = {
      2024 : 0,
      2025: 0 ,
      2026 : 0,
      2027 : 0,
      2028 : 0,
      2029: 0,
      2030 : 0,
      2031 : 0,
      2032 : 0,
      2033 : 0,
      2034: 0,
    };

    const payments = await getPaymentsByTechnician(connectAccountId);
    console.log("paymeeeeents", payments);

    const startOfWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(new Date(), { weekStartsOn: 1 });

    for (const payment of payments) {
      if (payment.status === "succeeded") {
        totalAmount += payment.amount / 100;

        const commission = payment.application_fee_amount / 100;
        console.log("comisiiioooooooooooooon,", commission);
        totalCommission += commission;
        if (payment.metadata) {
          const serviceType = payment.metadata.serviceType;
          if (serviceType === "towing") {
            numberTowings += 1;
            serviceTypes["towing"] =
              serviceTypes["towing"] +
              payment.amount / 100 -
              payment.application_fee_amount / 100;
          } else {
            numberRepairs += 1;
            serviceTypes["repair"] =
              serviceTypes["repair"] +
              payment.amount / 100 -
              payment.application_fee_amount / 100;
          }
        }

        const paymentDate = new Date(payment.created * 1000);

        if (
          isWithinInterval(paymentDate, {
            start: startOfWeekDate,
            end: endOfWeekDate,
          })
        ) {
          const dayOfWeek = format(paymentDate, "EEEE");
          weeklyData[dayOfWeek] += payment.amount / 100;
        }

        const month = format(paymentDate, "MMMM");
        monthlyData[month] += payment.amount / 100;

        const year = format(paymentDate, "yyyy");
        if (!annualData[year]) {
          annualData[year] = 0;
        }
        annualData[year] += payment.amount / 100 - commission;

      }
    }

    setWeeklyData(
      Object.keys(weeklyData).map((day) => ({
        name: day.slice(0, 3),
        amount: parseFloat(weeklyData[day].toFixed(2)),
      }))
    );

    setMonthlyData(
      Object.keys(monthlyData).map((month) => ({
        name: month.slice(0, 3),
        amount: parseFloat(monthlyData[month].toFixed(2)),
      }))
    );

    setAnnualData(Object.keys(annualData).map((year) => ({
      name:year,
      amount: parseFloat(annualData[year].toFixed(2)),
    })));

    return {
      totalAmount: totalAmount.toFixed(2),
      totalCommission: totalCommission.toFixed(2),
      totalStripeFee: totalStripeFee / 100,
      numberRepair: numberRepairs,
      numberTowing: numberTowings,
      serviceTypes: {
        towing: serviceTypes.towing.toFixed(2),
        repair: serviceTypes.repair.toFixed(2),
      },
    };
  };

  const retrieveData = async () => {
    setLoading(true);
    const connectAccountId = user["custom:stripeId"];

    if (connectAccountId && connectAccountId !== "") {
      const calculatedFinances = await calculateFinances(connectAccountId);
      setFinances(calculatedFinances);
      console.log({
        commissionPercentage: Math.round(
          (calculatedFinances.totalCommission * 100) /
            calculatedFinances.totalAmount
        ),
        repairPercentage: Math.round(
          (calculatedFinances.serviceTypes.repair * 100) /
            calculatedFinances.totalAmount
        ),
        towingPercentage: Math.round(
          (calculatedFinances.serviceTypes.towing * 100) /
            calculatedFinances.totalAmount
        ),
      });
      setPercentages({
        commissionPercentage: Math.round(
          (calculatedFinances.totalCommission * 100) /
            calculatedFinances.totalAmount
        ),
        repairPercentage: Math.round(
          (calculatedFinances.serviceTypes.repair * 100) /
            calculatedFinances.totalAmount
        ),
        towingPercentage: Math.round(
          (calculatedFinances.serviceTypes.towing * 100) /
            calculatedFinances.totalAmount
        ),
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div className="w-full sm:h-[calc(100vh-80px)] h-[calc(100vh-120px)] relative sm:px-8 px-3 lg:pl-8 sm:pl-[105px] pl-3 pt-4 pb-4  overflow-y-auto">
        <div className="w-full flex flex-col gap-y-4">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 py-2 gap-4">
            <div className=" flex flex-col rounded-xl dark:bg-zinc-900 bg-white p-3 shadow-lg transition-all">
              <div className="w-[35px] h-[35px] rounded-lg dark:bg-zinc-700/50 bg-emerald-500 flex items-center justify-center mb-2">
                <RiCoinsLine className="text-[25px] dark:text-emerald-400 text-white" />
              </div>
              <div className="w-full text-[14px]">Total profits</div>
              <div className="w-full flex justify-between items-center">
                <div className="text-[35px] font-bold">
                  <span className="text-[30px] mr-1">$</span>
                  {finances.totalAmount}
                </div>
                <div className="flex items-center justify-center text-[14px] dark:text-green-300 text-emerald-600">
                  0.00%
                  <RiArrowUpSFill className="dark:text-green-300 text-emerald-600"/>
                </div>
              </div>
            </div>
            <div className=" flex flex-col rounded-xl dark:bg-zinc-900 bg-white p-3 shadow-lg transition-all">
              <div className="w-[35px] h-[35px] rounded-lg dark:bg-zinc-700/50 bg-emerald-500 flex items-center justify-center mb-2">
                <RiCoinFill className="text-[25px] dark:text-emerald-400 text-white" />
              </div>
              <div className="w-full text-[14px]">Total commissions paid</div>
              <div className="w-full flex justify-between items-center">
                <div className="text-[35px] font-bold">
                  <span className="text-[30px] mr-1">$</span>
                  {finances.totalCommission}
                </div>
                <div className="flex items-center justify-center text-[14px] dark:text-green-300 text-emerald-600">
                  0.00%
                  <RiArrowUpSFill className="dark:text-green-300 text-emerald-600"/>
                </div>
              </div>
            </div>
            <div className=" flex flex-col rounded-xl dark:bg-zinc-900 bg-white p-3 shadow-lg transition-all">
              <div className="w-[35px] h-[35px] rounded-lg dark:bg-zinc-700/50 bg-emerald-500 flex items-center justify-center mb-2">
                <RiToolsFill className="text-[25px] dark:text-emerald-400 text-white" />
              </div>
              <div className="w-full text-[14px]">
                Repair services performed
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="text-[35px] font-bold">
                  {finances.numberRepair}
                </div>
                <div className="flex items-center justify-center text-[14px] dark:text-green-300 text-emerald-600">
                  0.00%
                  <RiArrowUpSFill className="dark:text-green-300 text-emerald-600"/>
                </div>
              </div>
            </div>
            <div className=" flex flex-col rounded-xl dark:bg-zinc-900 bg-white p-3 shadow-lg transition-all">
              <div className="w-[35px] h-[35px] rounded-lg dark:bg-zinc-700/50 bg-emerald-500 flex items-center justify-center mb-2">
                <RiTruckFill className="text-[25px] dark:text-emerald-400 text-white" />
              </div>
              <div className="w-full text-[14px]">
                Towing services performed
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="text-[35px] font-bold">
                  {finances.numberTowing}
                </div>
                <div className="flex items-center justify-center text-[14px] dark:text-green-300 text-emerald-600">
                  0.00%
                  <RiArrowUpSFill className="dark:text-green-300 text-emerald-600"/>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex lg:flex-row flex-col gap-4 justify-between ">
            <div className="flex-1 dark:bg-zinc-900 bg-white rounded-lg p-4 flex flex-col shadow-lg">
              <div className="w-full flex sm:flex-row flex-col  sm:justify-between sm:items-center mb-5 gap-2">
                <div className="flex flex-col ">
                  <span className="text-[20px] dark:font-normal font-bold">Revenue Stream Summary</span>
                  <span className="text-[12px] dark:text-zinc-300 text-zinc-700">
                    This shows the growth of your income
                  </span>
                </div>
                <div className="border-[1px] dark:border-zinc-600 border-emerald-700 dark:bg-transparent bg-emerald-100 rounded-xl flex">
                  <div
                    className={`${
                      chartMode === "weekly" ? "dark:bg-zinc-700 bg-emerald-500 dark:text-white text-white" : ""
                    } transition-all px-3 py-2 text-[13px] m-1 rounded-lg cursor-pointer sm:w-[72px] w-1/3 text-center`}
                    onClick={() => setChartMode("weekly")}
                  >
                    Weekly
                  </div>
                  <div
                    className={` ${
                      chartMode === "monthly" ? "dark:bg-zinc-700 bg-emerald-500 dark:text-white text-white" : ""
                    } transition-all px-3 py-2 text-[13px] m-1 rounded-lg cursor-pointer sm:w-[75px] w-1/3 text-center`}
                    onClick={() => setChartMode("monthly")}
                  >
                    Monthly
                  </div>
                  <div
                    className={` ${
                      chartMode === "annual" ? "dark:bg-zinc-700 bg-emerald-500 dark:text-white text-white" : ""
                    } transition-all px-3 py-2 text-[13px] m-1 rounded-lg cursor-pointer sm:w-[75px] w-1/3 text-center`}
                    onClick={() => setChartMode("annual")}
                  >
                    Annualy
                  </div>
                </div>
              </div>
              <div className="h-[350px] w-full">
                {chartMode === "weekly" ? (
                  <WeeklyChart weeklyData={weeklyData} />
                ) : chartMode === "monthly" ? (
                  <MonthlyChart monthlyData={monthlyData}/>
                ) : (
                  <AnnualChart annualData={annualData}/>
                )}
              </div>
            </div>
            <div className="lg:w-[400px] w-full dark:bg-zinc-900 bg-emerald-600 rounded-lg p-5 flex flex-col shadow-lg">
              <span className="text-[20px] dark:text-white text-white dark:font-normal font-bold">My Balance</span>
              <span className="text-[12px] dark:text-zinc-300 text-zinc-200 mb-3">
                This is my balance report
              </span>
              <div className="text-[35px] font-extrabold dark:text-white text-white">
                <span>$</span>
                {finances.totalAmount}
              </div>
              <div className="w-full flex items-center gap-x-1 mb-2">
                <span className="dark:text-green-300 text-emerald-200">0.00%</span>
                <div className="w-[16px] h-[16px] dark:bg-green-400 bg-emerald-200 rounded-full flex items-center justify-center mr-1">
                  <RiArrowRightUpLine className="text-black  text-[13px] font-bold" />
                </div>
                <span className="text-[14px] dark:text-white text-white">This month</span>
              </div>
              <div className="flex gap-x-1 items-center justify-center w-full mb-3">
                <div
                  className={`dark:bg-emerald-700 bg-emerald-300  h-[20px] transition-all`}
                  style={{ width: `${percentages.repairPercentage}%` }}
                ></div>
                <div
                  className={`dark:bg-emerald-500 bg-zinc-800  h-[20px] transition-all`}
                  style={{ width: `${percentages.towingPercentage}%` }}
                ></div>
                <div
                  className={`dark:bg-zinc-500 bg-white h-[20px] transition-all`}
                  style={{ width: `${percentages.commissionPercentage}%` }}
                ></div>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex w-full">
                  <div className="p-1">
                    <RiCircleFill className="dark:text-emerald-700 text-emerald-300 text-[16px]" />
                  </div>
                  <div className="flex-1 flex-col">
                    <span className="text-[14px] dark:text-white text-zinc-100">Repair Services</span>
                    <div className="flex w-full justify-between items-center">
                      <span className="text-[18px] font-bold text-white">
                        ${finances.serviceTypes.repair}
                      </span>
                      <div className="dark:bg-emerald-700 bg-emerald-300 rounded-md flex items-center justify-center py-1 px-3 text-[14px] font-bold">
                        {percentages.repairPercentage}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full">
                  <div className="p-1">
                    <RiCircleFill className="dark:text-emerald-500 text-zinc-800 text-[16px]" />
                  </div>
                  <div className="flex-1 flex-col">
                    <span className="text-[14px] dark:text-white text-zinc-100">Towing Services</span>
                    <div className="flex w-full justify-between items-center">
                      <span className="text-[18px] font-bold text-white">
                        ${finances.serviceTypes.towing}
                      </span>
                      <div className="dark:bg-emerald-500 bg-zinc-800 dark:text-white text-white rounded-md flex items-center justify-center py-1 px-3 text-[14px] font-bold">
                        {percentages.towingPercentage}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full">
                  <div className="p-1">
                    <RiCircleFill className="dark:text-zinc-500 text-white text-[16px]" />
                  </div>
                  <div className="flex-1 flex-col">
                    <span className="text-[14px] dark:text-white text-zinc-100">Commissions Paid</span>
                    <div className="flex w-full justify-between items-center">
                      <span className="text-[18px] font-bold text-white">
                        ${finances.totalCommission}
                      </span>
                      <div className="dark:bg-zinc-500 bg-white rounded-md flex items-center justify-center py-1 px-3 text-[14px] font-bold">
                        {percentages.commissionPercentage}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Finances;
