'use client'
import React, { useState } from 'react'

export default function DisplayCars() {
  const [carSelected, setCarSelected] = useState(null)
  const numbers = [1,2,3,4,5,6,7,8,9,10,11,12, 13];
  return (
    <div className='w-full flex flex-col lg:flex-row gap-2 md:h-[53vh] 2xl:h-[63vh]'>
      <div className={`transition-all duration-300 grid grid-cols-3 gap-4 ${carSelected ? 'w-2/4' : 'w-full'} overflow-y-scroll`}>
      {numbers.map((item, i) => (
        <div
          key={i}
          className={`dark:bg-zinc-900 w-full h-[12rem] rounded-lg shadow cursor-pointer`}
          onClick={() => setCarSelected('test')}
        >
          hola
        </div>
      ))}
      </div>
      {carSelected && (
        <div className='w-2/4 h-full dark:bg-zinc-900 p-4 rounded-lg '>
          hola
        </div>
      )}
    </div>
  )
}
