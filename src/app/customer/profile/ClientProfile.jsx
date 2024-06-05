'use client';
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, useDisclosure } from "@nextui-org/react";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { CarsComponent, InformationHeader, UpdateInformationModal } from '@/components/customer';
import { client } from '@/contexts/AmplifyContext';
import { retrieveMyInformation } from '@/graphql/users/customer/query';
import { SecondDateFormatter } from '@/utils/parseDate';
export default function ClientProfile() {
    const {
        isOpen: isUpdateInformationnModalOpen,
        onOpen: onUpdateInformationnModalOpen,
        onOpenChange: onUpdateInformationnModalChange,
    } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const retrieveInfo = async () => {
        setLoading(true);
        try {
            const { sub: uid, email_verified } = await fetchUserAttributes();
            const { data } = await client.graphql({
                query: retrieveMyInformation,
                variables: {
                    id: uid
                }
            });
            setUser({...data.getCustomer, email_verified});
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
            console.error(error);
        }
    }
    useEffect(() => { retrieveInfo(); }, []);

    return (
        <>
            {loading ? (
                <div className='transition-all absolute w-full h-full flex justify-center items-center top-0'>
                    <div className='loader bg-green-panda' />
                </div>
            ) : error ? (<div>{error}</div>) : user && (
                <div className='max-h-full animate__animated animate__fadeInLeft'>
                    <UpdateInformationModal isOpen={isUpdateInformationnModalOpen} onOpenChange={onUpdateInformationnModalChange} customer={user} callback={retrieveInfo} />
                    <InformationHeader user={user} />
                    <div className="flex w-full flex-col my-4 px-4">
                        <Tabs aria-label="Options">
                            <Tab key="My Profile" title="My Profile">
                                <div className='h-full flex flex-col gap-4'>
                                    <p>Full Name: <strong>{user.fullName}</strong></p>
                                    <p>Contact Number: <strong>{user.contactNumber ? `(+1) ${user.contactNumber}` : 'To fill'}</strong></p>
                                    <p>State: <strong>{user.state ? user.state : 'To fill'}</strong></p>
                                    <p>City: <strong>{user.city ? user.city : 'To fill'}</strong></p>
                                    <p>Member since: {SecondDateFormatter(new Date(user.createdAt))}</p>
                                    <p className='transition-all duration-300 text-[#40C48E] hover:font-bold cursor-pointer' onClick={onUpdateInformationnModalOpen}>You want to edit?</p>
                                </div>
                            </Tab>
                            <Tab key="vehicles" title="My Vehicles">
                                <CarsComponent />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            )}
        </>
    )
}
