'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Tabs, Tab } from "@nextui-org/react";
import { fetchUserAttributes } from 'aws-amplify/auth';
export default function page() {
    const [user, setUser] = useState(null);
    const retrieveInfo = async() => {
        const data = await fetchUserAttributes();
        setUser(data);
        console.log(data);
    }
    useEffect(() => {
      retrieveInfo();
    }, [])
    
    return (
        <div>
            <div
                className="bg-cover h-[18vh] w-full md:w-full bg-fixed bg-bottom rounded-t-lg bg-zinc-300 dark:bg-zinc-800 contrast-125 relative"
            >
                <div className='absolute top-3'>
                    <div className='flex items-center gap-5 h-full px-8'>
                        <Image
                            src={`https://d3nqi6yd86hstw.cloudfront.net/public/user-profile-pictures/ded0fd80-2ab7-4a57-92eb-4440987a358f.jpg`}
                            width={400}
                            height={400}
                            className='rounded-full h-[9rem] w-[9rem]'
                            alt='profile_customer_picture'
                        />
                        <div className='flex flex-col gap-2'>
                            <p>Welcome back, <strong className='text-[#40C48E]'>{user && user.name}</strong></p>
                            <p className='text-gray-500'>{user && user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-col my-4 px-4">
                <Tabs aria-label="Options">
                    <Tab key="My Profile" title="My Profile">
                        <div className='h-full flex flex-col gap-4'>
                            <p>Full Name: <strong>{user && user.name}</strong></p>
                            <p>Contact Number: <strong>(+1) 923538579</strong></p>
                            <p>Role: <strong>{user && user['custom:role']}</strong></p>
                            <p className='text-[#40C48E] cursor pointer'>You want to edit?</p>
                        </div>
                    </Tab>
                    <Tab key="vehicles" title="My Vehicles">
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci a eos eius, odit aperiam necessitatibus quia enim fuga itaque accusantium numquam et dolor maxime, vel accusamus provident officiis consequatur esse.
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}
