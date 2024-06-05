'use client'
import { MapContext } from '@/contexts/map/MapContext';
import { PlaceContext } from '@/contexts/place/PlaceContext';
import React, { useContext } from 'react';
import { FaLocationCrosshairs } from 'react-icons/fa6';

export default function LocationButton() {
    const { map, isMapReady } = useContext(MapContext);
    const { userLocation } = useContext(PlaceContext);
    const handleLocationClick = () => {
        if(!isMapReady) throw new Error('Map is not ready.');
        if(!userLocation) throw new Error('There is not location from user.');

        map.flyTo({
            center: userLocation,
            zoom: 16,
            duration: 3000,
            easing: (t) => t,
        });
    };
    return (
        <div className='flex flex-col gap-2 items-center'>
            <div onClick={handleLocationClick} className='group dark:bg-zinc-800 bg-white hover:bg-green-panda w-[4rem] h-[4rem] rounded-full flex justify-center items-center cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300'>
                <FaLocationCrosshairs className='text-2xl group-hover:text-white' />
            </div>
        </div>
    )
}
