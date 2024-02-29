'use client';
import React, { useEffect, useState } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { DonutChart, LineChart } from '@/components/chartjs'
import { listUsersForGraphics } from '@/graphql/users/query';
import { client } from '../layout';
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
      <div className='bg-white h-[5rem] w-full dark:bg-zinc-800 shadow-md flex justify-center items-center'>
        <p className='text-black dark:text-white font-bold text-3xl capitalize tracking-[0.2em]'>Statistics from Entities</p>
      </div>
      <div className='container mx-auto my-10 transition-all overflow-y-auto h-full'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {
            loading ? (<div>cargando graficos...</div>) :
            (
                <>
                  <div className='flex flex-col items-center gap-2'>
                    <p className='text-zinc-800 text-2xl font-bold'>
                      Users Gained
                    </p>
                    <LineChart users={users} />
                  </div>
                  <div className='flex flex-col items-center gap-2'>
                    <p className='text-zinc-800 text-2xl font-bold'>Users per role</p>
                    <DonutChart users={users} />
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