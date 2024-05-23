'use client';
import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from "@nextui-org/react";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { CarsComponent, InformationHeader } from '@/components/customer';
export default function ClientProfile() {
    const [user, setUser] = useState(null);
    const retrieveInfo = async() => {
        const data = await fetchUserAttributes();
        setUser(data);
    }
    useEffect(() => {
      retrieveInfo();
    }, [])
    
    return (
        <div className='max-h-full animate__animated animate__fadeInLeft'>
            <InformationHeader user={user} />
            <div className="flex w-full flex-col my-4 px-4">
                <Tabs aria-label="Options">
                    <Tab key="My Profile" title="My Profile">
                        <div className='h-full flex flex-col gap-4'>
                            <p>Full Name: <strong>{user && user['custom:fullName']  ? user['custom:fullName'] : (user && user.name)}</strong></p>
                            <p>Contact Number: <strong>(+1) 923538579</strong></p>
                            <p>Role: <strong>{user && user['custom:role']}</strong></p>
                            <p>State: <strong></strong></p>
                            <p>City: <strong></strong></p>
                            <p>Member since: <strong></strong></p>
                            <p className='text-[#40C48E] cursor pointer'>You want to edit?</p>
                        </div>
                    </Tab>
                    <Tab key="vehicles" title="My Vehicles">
                        <CarsComponent />
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}
