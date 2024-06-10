'use client';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image'
import { format } from 'date-fns';
import { FaChevronLeft, FaPhone } from 'react-icons/fa6'
import ChatAnswerInput from '@/components/customer/components/Chat/ChatAnswerInput'
import { client } from '@/contexts/AmplifyContext';
import { getChatById } from '@/graphql/chat/query';
import { UserContext } from '@/contexts/user/UserContext';
import { listenToMessages } from '@/graphql/chat/subscription';
import { baseUrl } from '@/utils/CloudFront';
export default function ChatComponent({ setChatActive, chatSelected, setChatSelected }) {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);
    const retrieveMessagesFromChat = async () => {
        setLoading(true);
        try {
            const { data } = await client.graphql({
                query: getChatById,
                variables: {
                    chatId: chatSelected.id
                }
            });
            setMessages(data.getChat.messages.items);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }
    useEffect(() => { retrieveMessagesFromChat() }, [chatSelected]);
    useEffect(() => {
        const subscription = client
            .graphql({ query: listenToMessages, variables: { chatId: chatSelected.id } })
            .subscribe({
                next: ({ data }) => {
                    // Update previous state
                    setMessages((prevMessages) => [...prevMessages, data.onCreateMessage]);
                },
                error: (error) => console.warn(error)
            });

        return () => {
            // Cancel the subscription when this component's life cycle ends
            subscription.unsubscribe();
        };
    }, [chatSelected]);
    return (
        <div className='flex flex-col gap-2 w-full h-full relative'>
            <div id='header' className='w-full bg-green-600/50 dark:bg-zinc-700 p-2 rounded-lg flex flex-row justify-between gap-2'>
                {loading ? (<div>Loading</div>) : error ? (<div>{error}</div>) : chatSelected && (
                    <div className='flex flex-row gap-2'>
                        <div onClick={() => { setChatActive(false); setChatSelected(null) }} className='flex justify-center items-center'>
                            <FaChevronLeft className='cursor-pointer' />
                        </div>
                        <Image
                            src={`${chatSelected.technicianSelected ? chatSelected.technicianSelected.profilePicture : chatSelected.admin.profilePicture ? chatSelected.admin.profilePicture : '/image/defaultProfilePicture.jpg'}`}
                            width={150}
                            height={150}
                            alt='alt_profile_technician_selected'
                            className='w-[3rem] h-[3rem] rounded-full'
                            priority
                        />
                        <div className='flex flex-col'>
                            <p className='font-semibold text-white line-clamp-1'>{chatSelected.technicianSelected ? chatSelected.technicianSelected.fullName : chatSelected.admin.fullName}</p>
                            <p className='text-sm text-white dark:text-white/65'>online</p>
                        </div>
                    </div>
                )}
                <div className='flex justify-center items-center'>
                    <div className='rounded-full p-3 text-white bg-green-800/60 dark:bg-zinc-800'>
                        <FaPhone />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2 justify-end h-full' id="messages">
                {messages.length > 0 ? messages.map((message, i) => (
                    <div
                        key={i}
                        className={`flex ${message.sender === user.id ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`${message.sender === user.id ? 'bg-green-600/50' : 'bg-zinc-900'} min-w-[5rem] rounded-lg p-2`}>
                            <div className='flex flex-row gap-3'>
                                <p className='text-left text-white dark:'>{message.content && message.content}</p>
                                {message.image && (
                                    <Image
                                        src={`${baseUrl}${message.image}`}
                                        width={150}
                                        height={150}
                                        className='rounded-lg md:w-[14rem] md:h-[14rem]'
                                    />
                                )}
                                <div className='relative flex flex-col justify-end'>
                                    <p className='text-xs text-zinc-200'>{format(new Date(message.createdAt), 'h:mm')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : null}
            </div>
            {chatSelected && <ChatAnswerInput chatId={chatSelected.id} senderId={user.id} />}
        </div>
    )
}