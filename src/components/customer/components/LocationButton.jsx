'use client'
import React from 'react';
import { FaLocationCrosshairs } from 'react-icons/fa6';

export default function LocationButton() {
    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(`Ubicación obtenida: Latitud ${latitude}, Longitud ${longitude}`);
                    localStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }));
                },
                (error) => {
                    console.error('Error al obtener la ubicación:', error.message);
                }
            );
        } else {
            console.error('El navegador no soporta la geolocalización.');
        }
    };
    return (
        <div className='flex flex-col gap-2 items-center'>
            <div onClick={handleLocationClick} className='group bg-stone-200 hover:bg-green-panda w-[3rem] h-[3rem] rounded flex justify-center items-center cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300'>
                <FaLocationCrosshairs className='text-xl group-hover:text-white' />
            </div>
            <p className='text-sm'>Location</p>
        </div>
    )
}
