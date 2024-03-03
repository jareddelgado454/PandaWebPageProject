import React from 'react';
import { statesUSA } from '@/assets/data/StatesUSA';
import Link from 'next/link';
export const Information2 = () => {
  return (
    <div className='bg-white w-[21rem] md:w-[45rem] md:h-[32rem] transition-all rounded-lg slide-in-left'>
        <div className='my-4'>
            <p className='text-zinc-800 my-8 md:text-4xl font-bold text-center'>Additional Information</p>
            <form className='w-full flex flex-col justify-center items-center'>

              <div class="flex flex-wrap mb-6 w-2/3">
                <div class="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-address">
                    Address
                  </label>
                  <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      placeholder='Address'
                    />     
                </div>
              </div>

              <div className='mb-6 flex flex-wrap w-2/3'>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    City
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder='City'
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="states">
                    State
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="states"
                    >
                      {statesUSA.map((estado, index) => (
                        <option key={index} value={estado}>{estado}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                    Zip
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-zip"
                    type="text"
                    placeholder="90210"
                  />
                </div>
              </div>

              <div className='mb-6 w-2/3 px-3'>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="rol-grid">
                    Zip
                  </label>
                <select
                  id='rol-grid'
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Customer</option>
                  <option value="">Technician</option>
                </select>
              </div>
              
              <div className='mb-6 w-2/3'>
                <div>
                    <Link
                    href={`/user`}
                    className="bg-green-panda hover:bg-green-400 cursor-pointer font-bold text-white text-[18px] w-full py-3 px-4 rounded-lg transition-colors delay-50"
                    >
                    Create
                    </Link>
                </div>
              </div>

            </form>
        </div>
    </div>
  )
}