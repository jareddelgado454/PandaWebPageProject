'use client';
import React, { useContext, useEffect, useState } from 'react';
import { client } from '@/contexts/AmplifyContext';
import { PlaceContext } from '@/contexts/place/PlaceContext';
import { createService } from '@/graphql/users/customer/mutation';
import { fetchUserAttributes } from 'aws-amplify/auth';

export default function ServiceForm() {
    const { userLocation } = useContext(PlaceContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const retrieveSubFromCognito = async() => {
        try {
            const { sub } = await fetchUserAttributes();
            return sub;
        } catch (error) {
            console.error(error);        
        }
    }
    useEffect(() => { retrieveSubFromCognito(); }, []);

    const onHandleSubmit = async(e) => {
        e.preventDefault();
        const [longitude, latitude] = userLocation;
        const sub = await retrieveSubFromCognito();
        console.log(sub);
        try {
            client.graphql({
                query: createService,
                variables: {
                    input: {
                        title,
                        description,
                        originLatitude: latitude,
                        originLongitude: longitude,
                        serviceCustomerId: sub,
                        status: 'pending',
                        type: 'inmediate'
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='container mx-auto px-4 w-[90%]'>
            <p className='my-4'>Make a service request</p>
            <form className='flex flex-col gap-6' onSubmit={onHandleSubmit}>
                <div className='flex gap-6'>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={({ target }) => setTitle(target.value)}
                        placeholder="Title of service"
                    />
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={({ target }) => setDescription(target.value)}
                        placeholder="Description of service"
                    />
                </div>
                <div className='flex gap-6'>
                    <select placeholder="My cars"
                        className='block appearance-none border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 w-2/4'
                    >
                        <option value="">Hyundai</option>
                        <option value="">Toyota</option>
                    </select>
                    <button type="submit" className='w-2/4 bg-green-panda rounded-lg hover:bg-emerald-700'>
                        Send Request
                    </button>
                </div>
            </form>
        </div>
    )
}
