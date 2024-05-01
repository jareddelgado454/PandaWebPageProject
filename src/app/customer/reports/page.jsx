'use client';
import { Tooltip } from 'chart.js';
import React, { useState } from 'react';
export default function page() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const [reportSelected, setReportSelected] = useState('hola')
  return (
    <div className='container mx-auto overflow-hidden h-full'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 h-full'>
        <div className='h-full overflow-y-scroll'>
          <div className='grid grid-cols-2 gap-8 '>
            {list.map((item, i) => (
              <div key={i} className="max-w-sm rounded overflow-hidden shadow-lg bg-zinc-200 dark:bg-zinc-900 cursor-pointer">
                <div className="px-6 py-4 h-[10rem]">
                  <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                  <p className="text-gray-500 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
                    quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
                    nihil.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {
          reportSelected ? (
            <div className='max-h-full flex flex-col w-full my-6 gap-6'>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ipsa voluptatem ducimus doloribus repellendus quo iure amet corrupti libero nobis sequi, fugit deserunt iusto beatae hic quas a aspernatur eum?
              </p>
              <div className='w-full h-[12rem] bg-zinc-400 rounded-lg flex justify-center items-center'>
                image
              </div>
              <div>
                <p className='font-bold'>Answers from Admins</p>
                
              </div>
            </div>
          ) : (<div className='flex justify-center items-center w-full'>Select One Report</div>)
        }
      </div>
    </div>
  )
}
