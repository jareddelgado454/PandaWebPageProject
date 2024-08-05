'use client';
import React, { use, useEffect, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation';
export default function page() {
    const [message, setMessage] = useState("");
    const [count, setCount] = useState(5);
    const param = useSearchParams().get('paymentStatus');
    const serviceId = useSearchParams().get('serviceId');
    useEffect(() => {
        if(count > 0){
            if(param == "successfully"){
                setMessage("Your payment has been accepted.")
            }else {
                setMessage("Something went wrong.");
            }
            const timer = setTimeout(() => {
                setCount(count-1);
            }, 1000);
            return () => clearTimeout(timer);
        }
        if (count === 0) {
            window.location.href = `myapp://service/${serviceId}?paymentStatus=${param}`
        }
    }, [count, param]);
    
  return (
    <div className='text-white container mx-auto h-screen'>
        <div className='flex flex-col justify-center items-center h-full gap-5'>
            <Image
                src="/panda.png"
                width={350}
                height={350}
                className='drop-shadow-lg'
            />
            <p className='2xl:text-2xl font-extrabold text-[#40C48E]'>{message}</p>
            <p className='2xl:text-xl'>Returning to website in: </p>
            <p className='2xl:text-2xl font-extrabold'>{count}</p>
        </div>
    </div>
  )
}
