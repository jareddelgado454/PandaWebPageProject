'use client';
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import { client } from '@/contexts/AmplifyContext';
import { listMyChats } from '@/graphql/chat/query';
import { UserContext } from '@/contexts/user/UserContext';
import LoadingComponent from '@/components/LoadingComponent';
import { formatDistance } from 'date-fns';
import { RiImageAddLine } from 'react-icons/ri';
import { baseUrl } from '@/utils/CloudFront';
export default function ListContacts({ setChatActive, setChatSelected }) {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chats, setChats] = useState([]);
    const retrieveMyChats = async () => {
        setLoading(true);
        try {
            const { data } = await client.graphql({
                query: listMyChats,
                variables: {
                    customerId: user.id
                }
            });
            const combinedChats = [
                ...data.listChatsWithTechnicians.items,
                ...data.listChatsWithAdmins.items
            ];
            combinedChats.forEach(chat => {
                chat.messages.items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            });
            setChats(combinedChats);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }
    }
    useEffect(() => { retrieveMyChats(); }, [user]);
    const getProfilePictureSrc = (chat) => {
        if (chat?.technicianSelected?.profilePicture) {
            return chat.technicianSelected.profilePicture;
        }
        if (chat?.admin?.profilePicture) {
            return chat.admin.profilePicture;
        }
        return '/image/defaultProfilePicture.jpg';
    };
    return (
        <>
            <div className='w-full'>
                <input
                    type="text"
                    className='bg-green-600/50 dark:bg-zinc-700 dark:text-white dark:line shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                />
            </div>
            {
                loading ? (
                    <LoadingComponent />
                ) : error ? (<div className='flex justify-center items-center h-full w-full text-rose-600 text-2xl'>{error}</div>) : (
                    <div className='flex flex-col gap-2 w-full overflow-y-auto'>
                        {chats.length > 0 && chats.map((chat, i) => (
                            <div onClick={() => { setChatActive(true); setChatSelected(chat) }} key={i} id="chat_technician" className='flex flex-row justify-between gap-2 dark:hover:bg-zinc-700 hover:rounded-lg transition-all duration-300 ease-in cursor-pointer p-3 border-b-1 border-zinc-300 dark:border-zinc-500'>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src={baseUrl+getProfilePictureSrc(chat)}
                                        width={100}
                                        height={100}
                                        alt='technician_profile_picture'
                                        className='w-[2.5rem] h-[2.5rem] md:w-[3.8rem] md:h-[3.8rem] rounded-full'
                                        priority
                                    />
                                    <div className='flex flex-col justify-center gap-1'>
                                        <p className='font-semibold'>{chat.technicianSelected ? chat.technicianSelected.fullName : chat.admin.fullName}</p>
                                        <div className='flex flex-row gap-1 items-center'>
                                            <p className='text-sm text-zinc-500 dark:text-zinc-400 tracking-wide line-clamp-1'>
                                                {chat.messages.items.length > 0 && (chat.messages.items[chat.messages.items.length - 1].sender === user.id && 'Me:' )}
                                            </p>
                                            <div className='text-sm text-zinc-500 dark:text-zinc-400 tracking-wide line-clamp-1'>{
                                                chat.messages.items.length > 0 ? (
                                                    chat.messages.items[chat.messages.items.length - 1].image !== null ? (
                                                        <div className='flex flex-row gap-1 items-center'><RiImageAddLine /><p>Image</p></div>
                                                    ) : chat.messages.items[chat.messages.items.length - 1].content
                                                ) : 'No messages'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-zinc-500 text-xs md:text-base'>{chat.messages.items.length > 0 && formatDistance(new Date(chat.messages.items[chat.messages.items.length - 1].createdAt), new Date(), { addSuffix: true })}</p>
                                    {/* <div className='flex justify-center items-center'>
                                        <p className='font-light flex justify-center items-center dark:bg-green-panda rounded-full w-[1.5rem] h-[1.5rem] text-xs'>
                                            +1
                                        </p>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }

        </>
    )
}
