'use client'
import React, { useEffect, useState } from 'react'
import { AddNewCarModal } from '../..';
import { useDisclosure } from '@nextui-org/react';
import { client } from '@/contexts/AmplifyContext';
import { listCarsById } from '@/graphql/users/customer/query';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { baseUrl } from '@/utils/CloudFront';
import { DateFormatter } from '@/utils/parseDate';
export default function DisplayCars() {
  const user = JSON.parse(Cookies.get("currentUser"));
  const {
    isOpen,
    onOpen,
    onOpenChange
  } = useDisclosure();
  const [carSelected, setCarSelected] = useState(null);
  const [cars, setCars] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const retrieveMyCars = async () => {
    try {
      const { data } = await client.graphql({
        query: listCarsById,
        variables: {
          customerId: user.id
        }
      });
      setCars(data.listCars.items);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => { retrieveMyCars(); }, []);
  const onCardClick = (car) => {
    setCarSelected(car);
    setIsEditing(true);
    onOpen();
  }
  return (
    <div className='w-full flex flex-col lg:flex-row gap-2 h-[40vh] md:h-[53vh] 2xl:h-[63vh] relative'>
      <AddNewCarModal isOpen={isOpen} onOpenChange={onOpenChange} callback={retrieveMyCars} car={carSelected} edit={isEditing} />
      <div className={`transition-all duration-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-y-auto`}>
        {cars.map((car, i) => (
          <div
            key={i}
            className={`bg-green-panda dark:bg-zinc-900 w-full h-[12rem] rounded-lg shadow cursor-pointer p-4 overflow-hidden transition ease-in-out  hover:scale-95`}
            onClick={() => onCardClick(car)}
          >
            <div className='w-full h-full flex flex-row gap-5'>
              <Image
                src={`${baseUrl}${car.image}`}
                width={250}
                height={250}
                alt='Car_customer'
                className='w-full md:w-[10rem] h-full rounded-xl object-cover object-center'
              />
              <div className='hidden md:flex flex-col gap-2 justify-center'>
                <div className='flex flex-row gap-2'>
                  <strong className='text-white dark:text-zinc-300'>Brand:</strong><p className='text-white dark:text-zinc-300'> {car.brand}</p>
                </div>
                <div className='flex flex-row gap-2'>
                  <strong className='text-white dark:text-zinc-300'>Model:</strong><p className='text-white dark:text-zinc-300'> {car.model}</p>
                </div>
                <div className='flex flex-row gap-2'>
                  <strong className='text-white dark:text-zinc-300'>Fuel:</strong><p className='text-white dark:text-zinc-300'> {car.year}</p>
                </div>
                <div className='flex flex-row gap-2'>
                  <strong className='text-white dark:text-zinc-300'>Added:</strong><p className='text-white dark:text-zinc-300'> {DateFormatter(car.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='absolute left-0 bottom-0 md:left-2 md:bottom-2'>
        <p className='text-rose-600 cursor-pointer' onClick={() => {onOpen(); setIsEditing(false); setCarSelected(null)}}>Add new car</p>
      </div>
    </div>
  )
}
