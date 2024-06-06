'use client';
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import { client } from '@/contexts/AmplifyContext';
import { listMyChats } from '@/graphql/chat/query';
import { UserContext } from '@/contexts/user/UserContext';
import LoadingComponent from '@/components/LoadingComponent';
import Link from 'next/link';
import { formatDistance } from 'date-fns';
export default function ListContacts() {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chats, setChats] = useState([]);
    const retrieveMyChats = async () => {
        setLoading(true);
        console.log(user);
        try {
            const { data } = await client.graphql({
                query: listMyChats,
                variables: {
                    customerId: user.id
                }
            });
            setChats(data.listChats.items);
            setLoading(false);
            console.log(data);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }
    }
    useEffect(() => { retrieveMyChats() }, []);

    return (
        <>
            <div className='w-full'>
                <input
                    type="text"
                    className='bg-zinc-100 dark:bg-zinc-700 dark:text-white dark:line shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    placeholder='Search a technician...'
                />
            </div>
            {
                loading ? (
                    <LoadingComponent />
                ) : error ? (<div className='flex justify-center items-center h-full w-full text-rose-600 text-2xl'>{error}</div>) : (
                    <div className='flex flex-col gap-2 w-full overflow-y-auto'>
                        {chats.length > 0 && chats.map((chat, i) => (
                            <Link href={`/customer/messages/${chat.id}`} key={i} id="chat_technician" className='flex flex-row justify-between gap-2 dark:hover:bg-zinc-700 hover:rounded-lg transition-all duration-300 ease-in cursor-pointer p-3 border-b-1 border-zinc-300 dark:border-zinc-500'>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src={`${ chat.technicianSelected.profilePicture ? chat.technicianSelected.profilePicture : '/image/defaultProfilePicture.jpg' }`}
                                        width={100}
                                        height={100}
                                        alt='technician_profile_picture'
                                        className='w-[3.5rem] h-[3.5] rounded-full'
                                    />
                                    <div className='flex flex-col justify-center gap-1'>
                                        <p className='font-semibold'>{chat.technicianSelected.fullName}</p>
                                        <p className='text-sm text-zinc-500 dark:text-zinc-400 tracking-wide line-clamp-1'>{chat.messages.items.length > 0 ? chat.messages.items[chat.messages.items.length - 1].content : 'No messages'}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-zinc-500'>{chat.messages.items.length > 0 && formatDistance(new Date(chat.messages.items[chat.messages.items.length - 1].createdAt), new Date(), { addSuffix: true })}</p>
                                    {/* <div className='flex justify-center items-center'>
                                        <p className='font-light flex justify-center items-center dark:bg-green-panda rounded-full w-[1.5rem] h-[1.5rem] text-xs'>
                                            +1
                                        </p>
                                    </div> */}
                                </div>
                            </Link>
                        ))}
                    </div>
                )
            }

        </>
    )
}
