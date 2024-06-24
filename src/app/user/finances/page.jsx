"use client"

import React from "react";
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
  RiCircleFill 
} from "react-icons/ri";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    { name: 'Monday', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Tuesday', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Wednesday', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Thursday', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Friday', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Saturday', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Sunday', uv: 3490, pv: 4300, amt: 2100 },
];

const Finances = () => {
  return (
    <div className="w-full h-[calc(100vh-100px)] relative pr-[20px]">
      <div className="w-full h-[calc(100vh-100px)] flex flex-col px-4 bg-zinc-800/70 rounded-xl pt-4">
        <div className="w-full mb-6">
          <div className="w-[270px] bg-zinc-700/70 rounded-2xl flex items-center justify-center p-2 ">
            <Link href={"/user"} className="text-zinc-400">
              Technician panel
            </Link>
            <RiArrowDropRightLine className="text-zinc-400 text-[25px] " />
            <Link href={"user/finances"} className="text-white">
              Finances
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-4">
          <div className="w-full flex  justify-between items-center py-2 gap-x-4">
            <div className="w-[23%] flex flex-col rounded-xl bg-zinc-900 p-3 shadow-lg">
              <div className="w-[35px] h-[35px] rounded-lg bg-zinc-700/50 flex items-center justify-center mb-2">
                <RiCoinsLine className="text-[25px] text-emerald-400" />
              </div>
              <div className="w-full text-[14px]">Total profits</div>
              <div className="w-full flex justify-between items-center">
                <div className="text-[35px] font-bold">
                  <span className="text-[30px] mr-1">$</span>0
                </div>
                <div className="flex items-center justify-center text-[14px] text-green-300">
                  0.00%
                  <RiArrowUpSFill />
                </div>
              </div>
            </div>
            <div className="w-[23%] flex flex-col rounded-xl bg-zinc-900 p-3 shadow-lg">
              <div className="w-[35px] h-[35px] rounded-lg bg-zinc-700/50 flex items-center justify-center mb-2">
                <RiCoinFill className="text-[25px] text-emerald-400" />
              </div>
              <div className="w-full text-[14px]">Total commissions paid</div>
              <div className="w-full flex justify-between items-center">
                <div className="text-[35px] font-bold">
                  <span className="text-[30px] mr-1">$</span>0
                </div>
                <div className="flex items-center justify-center text-[14px] text-green-300">
                  0.00%
                  <RiArrowUpSFill />
                </div>
              </div>
            </div>
            <div className="w-[23%] flex flex-col rounded-xl bg-zinc-900 p-3 shadow-lg">
              <div className="w-[35px] h-[35px] rounded-lg bg-zinc-700/50 flex items-center justify-center mb-2">
                <RiToolsFill className="text-[25px] text-emerald-400" />
              </div>
              <div className="w-full text-[14px]">
                Repair services performed
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="text-[35px] font-bold">0</div>
                <div className="flex items-center justify-center text-[14px] text-green-300">
                  0.00%
                  <RiArrowUpSFill />
                </div>
              </div>
            </div>
            <div className="w-[23%] flex flex-col rounded-xl bg-zinc-900 p-3 shadow-lg">
              <div className="w-[35px] h-[35px] rounded-lg bg-zinc-700/50 flex items-center justify-center mb-2">
                <RiTruckFill className="text-[25px] text-emerald-400" />
              </div>
              <div className="w-full text-[14px]">
                Towing services performed
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="text-[35px] font-bold">0</div>
                <div className="flex items-center justify-center text-[14px] text-green-300">
                  0.00%
                  <RiArrowUpSFill />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-x-4 justify-between ">
            <div className="flex-1 bg-zinc-900 rounded-lg p-4 flex flex-col shadow-lg">
              <div className="w-full flex justify-between items-center mb-5">
                <div className="flex flex-col">
                  <span className="text-[20px]">Revenue Stream Summary</span>
                  <span className="text-[12px] text-zinc-300">
                    This shows the growth of your income
                  </span>
                </div>
                <div className="border-[1px] border-zinc-700 rounded-xl flex">
                  <div className="bg-zinc-700 px-3 py-2 text-[13px] m-1 rounded-lg cursor-pointer">
                    Weekly
                  </div>
                  <div className=" px-3 py-2 text-[13px] m-1 rounded-lg cursor-pointer">
                    Monthly
                  </div>
                  <div className=" px-3 py-2 text-[13px] m-1 rounded-lg cursor-pointer">
                    Annualy
                  </div>
                </div>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2D"/>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="pv"
                      fill="#459488"
                      shape={<Rectangle />}
                    />
                    <Bar
                      dataKey="uv"
                      fill="#82ca9d"
                      shape={<Rectangle />}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="w-[400px] bg-zinc-900 rounded-lg p-5 flex flex-col shadow-lg">
                <span className="text-[20px]">My Balance</span>
                <span className="text-[12px] text-zinc-300 mb-3">
                    This is my balance report
                </span>
                <div className="text-[35px] font-bold ">
                  <span>$</span> 0.00
                </div>
                <div className="w-full flex items-center gap-x-1 mb-2">
                  <span className="text-green-300">0.00%</span>
                  <div className="w-[16px] h-[16px] bg-green-400 rounded-full flex items-center justify-center mr-1">
                    <RiArrowRightUpLine  className="text-black text-[13px] font-bold"/>
                  </div>
                  <span className="text-[14px]">This month</span>
                </div>
                <div className="flex gap-x-1 items-center justify-center w-full mb-3">
                  <div className="bg-emerald-600 w-[33%] h-[20px]"></div>
                  <div className="bg-emerald-400 w-[33%]  h-[20px]"></div>
                  <div className="bg-zinc-500 w-[33%] h-[20px]"></div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex w-full">
                    <div className="p-1">
                      <RiCircleFill className="text-emerald-600 text-[16px]"/> 
                    </div>
                    <div className="flex-1 flex-col">
                        <span className="text-[14px]">
                          Repair Services
                        </span>
                        <div className="flex w-full justify-between items-center">
                          <span className="text-[18px] font-bold">$0.00</span>
                          <div className="bg-emerald-600 rounded-md flex items-center justify-center py-1 px-3 text-[14px] font-bold">
                            0%
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="p-1">
                      <RiCircleFill className="text-emerald-400 text-[16px]"/> 
                    </div>
                    <div className="flex-1 flex-col">
                        <span className="text-[14px]">
                          Towing Services
                        </span>
                        <div className="flex w-full justify-between items-center">
                          <span className="text-[18px] font-bold">$0.00</span>
                          <div className="bg-emerald-400 rounded-md flex items-center justify-center py-1 px-3 text-[14px] font-bold">
                            0%
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="p-1">
                      <RiCircleFill className="text-zinc-500 text-[16px]"/> 
                    </div>
                    <div className="flex-1 flex-col">
                        <span className="text-[14px]">
                          Commissions Paid
                        </span>
                        <div className="flex w-full justify-between items-center">
                          <span className="text-[18px] font-bold">$0.00</span>
                          <div className="bg-zinc-500 rounded-md flex items-center justify-center py-1 px-3 text-[14px] font-bold">
                            0%
                          </div>
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
