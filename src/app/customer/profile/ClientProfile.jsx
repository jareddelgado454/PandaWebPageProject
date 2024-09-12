'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Tabs, Tab, useDisclosure } from "@nextui-org/react";
import { CarsComponent, InformationHeader, UpdateInformationModal } from '@/components/customer';
import { client } from '@/contexts/AmplifyContext';
import { retrieveMyInformation } from '@/graphql/users/customer/query';
import { UserContext } from '@/contexts/user/UserContext';
import GearSpinner from '@/components/GearSpinner';
import { formatDistance } from 'date-fns';
export default function ClientProfile() {
    const { user: userSaved } = useContext(UserContext);
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
            const { data } = await client.graphql({
                query: retrieveMyInformation,
                variables: {
                    id: userSaved.id
                }
            });
            setUser(data.getCustomer);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
            console.error(error);
        }
    }
    useEffect(() => {
        if (userSaved && userSaved.id) { // Runs once userSaved.id is detect
            retrieveInfo();
        }
    }, [userSaved]);
    // 
    if (!userSaved || !userSaved.id) {
        return <GearSpinner />;
    }

    return (
        <>
            {loading ? (
                <div className='transition-all absolute w-full h-full flex justify-center items-center top-0'>
                    <div className='loader' />
                </div>
            ) : error ? (<div>{error}</div>) : user && (
                <div className='max-h-full animate__animated animate__fadeInLeft'>
                    <UpdateInformationModal isOpen={isUpdateInformationnModalOpen} onOpenChange={onUpdateInformationnModalChange} customer={user} callback={retrieveInfo} />
                    <InformationHeader user={user} />
                    <div className="flex w-full flex-col my-4 px-4 h-full">
                        <Tabs aria-label="Options">
                            <Tab key="My Profile" title="My Profile">
                                <div className='h-full flex flex-col gap-4'>
                                    <p>Full Name: <strong>{user.fullName ? user.fullName : <span className='text-rose-600'>This is required</span>}</strong></p>
                                    <p>Contact Number: <strong>{user.contactNumber ? `(+1) ${user.contactNumber}` : <span className='text-rose-600'>This is required</span>}</strong></p>
                                    <p>State: <strong>{user.state ? user.state : <span className='text-rose-600'>This is required</span>}</strong></p>
                                    <p>City: <strong>{user.city ? user.city : <span className='text-rose-600'>This is required</span>}</strong></p>
                                    <p>Member since: {formatDistance(new Date(user.createdAt), new Date(), { addSuffix: true })}</p>
                                    <p className='transition-all duration-300 text-[#40C48E] hover:font-bold cursor-pointer' onClick={onUpdateInformationnModalOpen}>You want to edit?</p>
                                </div>
                            </Tab>
                            <Tab key="vehicles" title="My Vehicles" className='h-full'>
                                <CarsComponent />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            )}
        </>
    )
}
