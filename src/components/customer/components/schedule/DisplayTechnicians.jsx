'use client';
import React from 'react'
import Image from 'next/image';
const data = [
    {
        fullName: "Juan Pérez",
        email: "juan.perez@example.com",
        typeScheduled: "Weekdays"
    },
    {
        fullName: "Ana Gómez",
        email: "ana.gomez@example.com",
        typeScheduled: "Weekend"
    },
    {
        fullName: "Carlos Ramirez",
        email: "carlos.ramirez@example.com",
        typeScheduled: "Weekdays"
    },
    {
        fullName: "María López",
        email: "maria.lopez@example.com",
        typeScheduled: "Weekend"
    },
    {
        fullName: "Luis Sánchez",
        email: "luis.sanchez@example.com",
        typeScheduled: "Weekdays"
    },
    {
        fullName: "Juan Pérez",
        email: "juan.perez@example.com",
        typeScheduled: "Weekdays"
    },
    {
        fullName: "Ana Gómez",
        email: "ana.gomez@example.com",
        typeScheduled: "Weekend"
    },
    {
        fullName: "Carlos Ramirez",
        email: "carlos.ramirez@example.com",
        typeScheduled: "Weekdays"
    },
    {
        fullName: "María López",
        email: "maria.lopez@example.com",
        typeScheduled: "Weekend"
    },
    {
        fullName: "Luis Sánchez",
        email: "luis.sanchez@example.com",
        typeScheduled: "Weekdays"
    },
    {
        fullName: "Juan Pérez",
        email: "juan.perez@example.com",
        typeScheduled: "Weekdays"
    },
    {
        fullName: "Ana Gómez",
        email: "ana.gomez@example.com",
        typeScheduled: "Weekend"
    },
    {
        fullName: "Carlos Ramirez",
        email: "carlos.ramirez@example.com",
        typeScheduled: "Weekdays"
    },
    {
        fullName: "María López",
        email: "maria.lopez@example.com",
        typeScheduled: "Weekend"
    },
    {
        fullName: "Luis Sánchez",
        email: "luis.sanchez@example.com",
        typeScheduled: "Weekdays"
    },
    {
        fullName: "Juan Pérez",
        email: "juan.perez@example.com",
        typeScheduled: "Weekdays"
    },
    {
        fullName: "Ana Gómez",
        email: "ana.gomez@example.com",
        typeScheduled: "Weekend"
    },
    {
        fullName: "Carlos Ramirez",
        email: "carlos.ramirez@example.com",
        typeScheduled: "Weekdays"
    },
    {
        fullName: "María López",
        email: "maria.lopez@example.com",
        typeScheduled: "Weekend"
    },
    {
        fullName: "Luis Sánchez",
        email: "luis.sanchez@example.com",
        typeScheduled: "Weekdays"
    }
];
const DisplayTechnicians = ({setCurrentStep}) => {
    return (
        <>
            <p className='tracking-wider text-center text-xl my-4 font-semibold'>Available Technicians</p>
            <div className='flex flex-col md:flex-row px-6 gap-4'>
                <input
                    type="text"
                    className='bg-[#F4F4F5] dark:bg-zinc-700 px-2 rounded-lg shadow-lg h-11 tracking-wider w-[85%]'
                    placeholder='Search a Technician'
                />
                <select className='bg-[#F4F4F5] text-zinc-700 dark:bg-zinc-700 dark:text-[#F4F4F5] px-2 rounded-lg shadow-lg h-11 tracking-wider w-[15%] cursor-pointer'>
                    <option value="1">option 1</option>
                    <option value="2">option 2</option>
                </select>
            </div>
            <div className='grid grid-cols-3 gap-8 py-4 px-6 h-[70%] overflow-y-auto'>
                {data.map((item, i) => (
                    <div onClick={() => setCurrentStep(2)} key={i} className='bg-[#F4F4F5] dark:bg-zinc-700 drop-shadow-md rounded-lg py-2 px-2 transition-transform ease-in-out hover:-translate-y-1 hover:scale-100 duration-300 cursor-pointer'>
                        <div className='w-full h-full flex flex-row gap-1'>
                            <div className='w-[15%] h-full flex justify-center items-center'>
                                <Image
                                    className='rounded-full w-14 h-14'
                                    width={400}
                                    height={400}
                                    alt='technician_profile_picture'
                                    src={'/logo.jpg'}
                                />
                            </div>
                            <div className='flex flex-col gap-y-2 tracking-wider'>
                                <div className='flex gap-2'>
                                    <strong>Name: </strong><p>{item.fullName}</p>
                                </div>
                                <div className='flex gap-2'>
                                    <strong>Rate: </strong><p>4.5</p>
                                </div>
                                <div className='flex gap-2'>
                                    <strong>Schedule Type: </strong><p>{item.typeScheduled}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default DisplayTechnicians;