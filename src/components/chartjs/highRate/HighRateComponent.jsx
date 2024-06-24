import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaFaceSmile, FaStar } from 'react-icons/fa6';
function HighRateComponent({ technicians }) {
    const [techniciansSorted, setTechniciansSorted] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (technicians && technicians.length > 0) {
            // Filtrar y ordenar los técnicos por su calificación
            const sortedTechnicians = technicians
                .map(technician => ({
                    ...technician,
                    rate: technician.rate.items.length > 0 ? technician.rate.items[0].rate : 0
                }))
                .filter(technician => technician.rate >= 4)
                .sort((a, b) => b.rate - a.rate);
            setTechniciansSorted(sortedTechnicians);
            setLoading(false);
        }
    }, [technicians]);

    return (
        <div className='flex flex-col gap-4'>
            {
                loading ? (<div>loading</div>) : (
                    <>
                        {techniciansSorted && techniciansSorted.map((technician, i) => (
                            <div key={i} className='bg-white dark:bg-zinc-950 rounded-lg h-[6rem] flex flex-row gap-2 px-4'>
                                <div className='w-1/4 lg:w-2/12 flex justify-center items-center'>
                                    <Image
                                        width={150}
                                        height={150}
                                        priority
                                        src={`${technician.profilePicture ? technician.profilePicture : "/image/defaultProfilePicture.jpg"}`}
                                        alt="technician_profile"
                                        className='rounded-full w-[2.5rem] h-[2rem] lg:w-[4rem] lg:h-[4rem]'
                                    />
                                </div>
                                <div className='w-full flex flex-row justify-between'>
                                    <div className='flex flex-col justify-center gap-2'>
                                        <p className='text-black dark:text-white text-sm lg:text-base font-semibold text-center w-[4.5rem] lg:w-full'>{technician.fullName}</p>
                                        <div className='bg-green-panda w-[3rem] h-[1.7rem] text-sm rounded-2xl flex flex-row items-center justify-center gap-1'>
                                            <div className='flex flex-row gap-1 justify-center items-center'>
                                                <FaStar />
                                                {technician.rate}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-green-500 flex justify-center items-center'>
                                        <FaFaceSmile className='text-lg lg:text-5xl' />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )
            }
        </div>
    )
}

export default HighRateComponent
