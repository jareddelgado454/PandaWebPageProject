'use client';
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import ReactStars from "react-rating-stars-component";
import { client } from '@/contexts/AmplifyContext';
import { getNearbyTechnicians } from '@/graphql/services/queries/query';
import { PlaceContext } from '@/contexts/place/PlaceContext';
import { Spinner } from '@nextui-org/react';
import { baseUrl } from '@/utils/CloudFront';
import { calculateRate } from '@/utils/service/AVGRate';
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
const DisplayTechnicians = ({ setCurrentStep, setTechnicianSelected }) => {
    const { userLocation, isLoading } = useContext(PlaceContext);
    const [technicians, setTechnicians] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const retrieveTechnicians = async (location = []) => {
        setLoading(true);
        try {
            const { data } = await client.graphql({
                query: getNearbyTechnicians,
                variables: {
                    lat: location[1],
                    lon: location[0]
                }
            });
            setTechnicians(data.getNearbyTechnicians);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
            setError(error.message);
        }
    }
    useEffect(() => { !isLoading && retrieveTechnicians(userLocation); }, [userLocation]);
    const onSelectTechnician = (technician) => {
        setTechnicianSelected(technician);
        setCurrentStep(2);
    }
    return (
        <>
            <p className='tracking-wider text-center text-xl my-4 font-semibold'>Available Technicians</p>
            <div className='flex flex-col md:flex-row px-6 gap-4'>
                <input
                    type="text"
                    className='bg-[#F4F4F5] dark:bg-zinc-700 px-2 rounded-lg shadow h-11 tracking-wider w-[85%]'
                    placeholder='Search a Technician'
                />
                <select className='bg-[#F4F4F5] text-zinc-700 dark:bg-zinc-700 dark:text-[#F4F4F5] px-2 rounded-lg shadow h-11 tracking-wider w-[15%] cursor-pointer'>
                    <option value="1">option 1</option>
                    <option value="2">option 2</option>
                </select>
            </div>
                {loading ? (
                    <div className='flex justify-center items-center w-full h-[70%]'><Spinner color='success' size='lg' /></div>
                ) : error ? <div>{error}</div> : (
                    <div className='grid grid-cols-3 gap-8 py-4 px-6 h-[70%] overflow-y-auto'>
                        {technicians.map((technician, i) => (
                            <div onClick={() => onSelectTechnician(technician)} key={i} className='bg-[#F4F4F5] dark:bg-zinc-700 drop-shadow-md h-[7rem] rounded-lg py-2 px-2 transition-transform ease-in-out hover:-translate-y-1 hover:scale-100 duration-300 cursor-pointer'>
                                <div className='w-full h-full flex flex-row gap-1'>
                                    <div className='w-[15%] h-full flex justify-center items-center'>
                                        <Image
                                            className='rounded-full w-14 h-14'
                                            width={400}
                                            height={400}
                                            alt='technician_profile_picture'
                                            src={technician.profilePicture !== null ? `${baseUrl + technician.profilePicture}` : '/image/defaultProfilePicture.jpg'}
                                        />
                                    </div>
                                    <div className='flex flex-col gap-y-2 tracking-wider'>
                                        <div className='flex gap-2'>
                                            <strong>Name: </strong><p>{technician.fullName}</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <strong>Rate: </strong><p>{calculateRate(technician.rate)}</p>
                                            <ReactStars
                                                count={5}
                                                value={calculateRate(technician.rate)}
                                                size={22}
                                                edit={false}
                                                isHalf={true}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                        <div className='flex gap-2'>
                                            <strong>Schedule Type: </strong><p>Weekend</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </>
    )
}

export default DisplayTechnicians;