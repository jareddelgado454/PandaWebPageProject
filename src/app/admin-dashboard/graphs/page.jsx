'use client';
import React, { useEffect, useState } from 'react';
import { listDataToGraphs } from '@/graphql/users/query/user';
import { client } from '@/contexts/AmplifyContext';
import HighRateComponent from '@/components/chartjs/highRate/HighRateComponent';
import MonthlyComponent from '@/components/chartjs/monthlyServices/MonthlyComponent';
import { Progress } from "@nextui-org/react";
const Graphs = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const [data, setData] = useState([]);

  const retrieveUsersData = async () => {
    setLoading(true);

    try {

      const { data } = await client.graphql({
        query: listDataToGraphs
      });
      const combinedData = {
        customers: [...data.listCustomers.items],
        technicians: [...data.listTechnicians.items],
        services: [...data.listServices.items],
      };
      console.log(combinedData)
      setData(combinedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  }
  useEffect(() => {
    retrieveUsersData();
  }, []);

  return (
    <div className='container mx-auto my-10 transition-all h-full px-4'>
      {loading ? (<div></div>) : error ? (<div></div>) : data && (
        <>
          <div className='w-full bg-zinc-800 my-4 rounded-lg h-[14rem] lg:h-[12rem] py-3 px-7'>
            <div className='flex flex-col gap-1'>
              <p className='text-lg font-bold'>Service goal</p>
              <p className='text-gray-400'>total performance this month</p>
              <div className='flex flex-row justify-between'>
                <p>Service request successfully</p>
                <p className='text-2xl font-black text-[#40C48E]'>{data.services.filter((i) => i.status === "completed").length}</p>
              </div>
              <Progress color='success' aria-label="Loading..." value={data.services.length} className="w-full my-2" />
              <div className='flex flex-row justify-between'>
                {/* <p className='text-gray-400'>Monthly target</p>
                <p className='text-lg text-gray-400'>100%</p> */}
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 my-8'>
            <div className='bg-zinc-800 rounded-lg h-[20rem] lg:h-[26rem] p-7 col-span-2'>
              <p className='font-bold text-lg'>Monthly Services</p>
              <MonthlyComponent services={data.services} />
            </div>
            <div className='bg-zinc-800 rounded-lg h-full p-7 flex flex-col gap-4 overflow-auto'>
              <p className='font-bold text-lg'>Technicians with High Rate</p>
              <HighRateComponent technicians={data.technicians} />
            </div>
            <div className='bg-zinc-800 rounded-lg h-full p-7 flex flex-col gap-4 overflow-auto'>
              <p className='font-bold text-lg'>Customers with High Rate</p>
              <HighRateComponent technicians={data.technicians} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Graphs