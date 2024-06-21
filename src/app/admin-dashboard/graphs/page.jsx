'use client';
import React, { useEffect, useState } from 'react';
import { listDataToGraphs } from '@/graphql/users/query/user';
import { client } from '@/contexts/AmplifyContext';
import HighRateComponent from '@/components/chartjs/highRate/HighRateComponent';
import MonthlyComponent from '@/components/chartjs/monthlyServices/MonthlyComponent';
import MonthGoalComponent from '@/components/chartjs/MonthlyGoal/MonthGoalComponent';
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
    <div className='container mx-auto my-10 transition-all px-4 overflow-x-hidden'>
      {loading ? (<div></div>) : error ? (<div></div>) : data && (
        <>
          <MonthGoalComponent services={data.services} />
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 my-8'>
            <div className='bg-zinc-800 rounded-lg h-[20rem] lg:h-[26rem] p-7 col-span-2'>
              <p className='font-bold text-lg mb-5'>Monthly Services</p>
              <MonthlyComponent services={data.services} />
            </div>
            <div className='bg-zinc-800 rounded-lg h-full p-7 flex flex-col gap-4 col-span-2 overflow-auto'>
              <p className='font-bold text-lg'>Technicians with High Rate</p>
              <HighRateComponent technicians={data.technicians} />
            </div>
            <div className='bg-zinc-800 rounded-lg h-full p-7 flex flex-col gap-4 col-span-2 overflow-auto'>
              <p className='font-bold text-lg'>Customers with High Rate</p>
              {/* <HighRateComponent technicians={data.technicians} /> */}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Graphs