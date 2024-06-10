'use client';
import React, { useEffect, useState } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { DonutChartPerRole, LineChartGained } from '@/components/chartjs'
import { listUsersForGraphics } from '@/graphql/users/query/user';
import { client } from '@/contexts/AmplifyContext';
import HighRateComponent from '@/components/chartjs/highRate/HighRateComponent';
import MonthlyComponent from '@/components/chartjs/monthlyServices/MonthlyComponent';
import {Progress} from "@nextui-org/react";

Chart.register(CategoryScale);

const Graphs = () => {

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  const retrieveData = async() => 
  {
    setLoading(true);

    try {
      
      const { data } = await client.graphql({
        query: listUsersForGraphics
      });
      setUsers(data.listUsers.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <>
      
      <div className='container mx-auto my-10 transition-all h-full px-4'>
        <p className='dark:text-white text-zinc-800 font-semibold text-xl'>ThePanda Analytics</p>
        <div className='w-full bg-zinc-800 my-4 rounded-lg h-[14rem] lg:h-[12rem] py-3 px-7'>
          <div className='flex flex-col gap-1'>
            <p className='text-lg font-bold'>Service goal</p>
            <p className='text-gray-400'>total performance this month</p>
            <div className='flex flex-row justify-between'>
              <p>Service request successfully</p>
              <p className='text-2xl font-black text-[#40C48E]'>366</p>
            </div>
            <Progress color='success' aria-label="Loading..." value={60} className="w-full my-2"/>
            <div className='flex flex-row justify-between'>
              <p className='text-gray-400'>Monthly target</p>
              <p className='text-lg text-gray-400'>100%</p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 my-8'>
          <div className='bg-zinc-800 rounded-lg h-[20rem] lg:h-[26rem] p-7'>
            <p className='font-bold text-lg'>Monthly Services</p>
            <p className='text-2xl my-3 text-[#40C48E]'>+75</p>
            <MonthlyComponent />
          </div>
          <div className='bg-zinc-800 rounded-lg h-[26rem] p-7 flex flex-col gap-4 overflow-auto'>
            <p className='font-bold text-lg'>Technicians with High Rate</p>
            <HighRateComponent />
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4 pb-8'>
          {
            loading ? (<div>cargando graficos...</div>) :
            (
                <>
                  <div className='flex flex-col items-center gap-2'>
                    <LineChartGained users={users} />
                  </div>
                  <div className='flex flex-col items-center gap-2'>
                    <DonutChartPerRole users={users} />
                  </div>
                </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Graphs