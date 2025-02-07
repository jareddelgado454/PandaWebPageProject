'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaPhone } from 'react-icons/fa6';
import { format } from 'date-fns';
import { UserContext } from '@/contexts/user/UserContext';
import { listenToMessages } from '@/graphql/chat/subscription';
import ChatAnswerInput from '@/components/customer/components/Chat/ChatAnswerInput';
import { client } from '@/contexts/AmplifyContext';
import { getCustomerChatById } from '@/graphql/chat/query';
import { baseUrl } from '@/utils/CloudFront';
export default function ChatComponent({ setChatActive, chatSelected, setChatSelected }) {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const retrieveMessagesFromChat = async () => {
        setLoading(true);
        try {
            const { data } = await client.graphql({
                query: getCustomerChatById,
                variables: {
                    chatId: chatSelected.id
                }
            });
            setLoading(false);
            setChat(data.getChat);
            setMessages(data.getChat.messages.items);
            scrollToBottom();
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
                    scrollToBottom();
                },
                error: (error) => console.warn(error)
            });

        return () => {
            // Cancel the subscription when this component's life cycle ends
            subscription.unsubscribe();
        };
    }, [chatSelected]);
    const handleChatClick = () => {
        setChatActive(false);
        setChatSelected(null)
        const url = new URL(window.location);
        url.searchParams.delete('chatId');
        window.history.replaceState({}, '', url);
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    return (
        <div className='flex flex-col gap-2 w-full h-full relative'>
            <div id='header' className='w-full bg-zinc-200 dark:bg-zinc-700 p-2 rounded-lg flex flex-row justify-between gap-2'>
                {loading ? (<div>Loading</div>) : error ? (<div>{error}</div>) : chat && (
                    <div className='flex flex-row gap-2'>
                        <div onClick={handleChatClick} className='flex justify-center items-center'>
                            <FaChevronLeft className='cursor-pointer text-black dark:text-white' />
                        </div>
                        {chat.customer ? (
                            <Image
                                src={`${chat && chat.customer.profilePicture ? baseUrl+chat.customer.profilePicture : `/image/defaultProfilePicture.jpg`}`}
                                width={50}
                                height={50}
                                alt='alt_profile_customer_selected'
                                className='w-[3rem] h-[3rem] rounded-full'
                                priority
                            />
                        ) : (
                            <Image
                                src={`${chat && chat.technician.profilePicture ? baseUrl+chat.technician.profilePicture : `/image/defaultProfilePicture.jpg`}`}
                                width={50}
                                height={50}
                                alt='alt_profile_customer_selected'
                                className='w-[3rem] h-[3rem] rounded-full'
                                priority
                            />
                        )}
                        <div className='flex flex-col'>
                            <p className='text-black dark:text-white font-semibold'>{chat.customer ? chat.customer.fullName : chat.technician.fullName}</p>
                            <p className='text-sm text-zinc-700 dark:text-zinc-400'>online</p>
                        </div>
                    </div>
                )}
                {/* <div className='flex justify-center items-center'>
                    <div className='rounded-full p-3 bg-zinc-800 dark:bg-zinc-800'>
                        <FaPhone />
                    </div>
                </div> */}
            </div>
            <div className='flex flex-col gap-2 justify-end h-full' id="messages"
                style={{
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                    overflowY: 'scroll'
                }}
                ref={messagesContainerRef}
            >
                {messages.length > 0 ? messages.map((message, i) => (
                    <div
                        key={i}
                        className={`flex ${message.sender === user.id ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`${message.sender === user.id ? 'bg-green-600/50 dark:bg-green-800' : 'bg-zinc-900'} max-w-[25rem] rounded-lg p-2`}>
                            <div className='flex flex-row gap-3'>
                                <p className='text-left text-white'>{message.content && message.content}</p>
                                {message.image && (
                                    <Image
                                        src={`${baseUrl}${message.image}`}
                                        width={250}
                                        height={250}
                                        alt={`image_message_${message.id}`}
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
                <div ref={messagesEndRef} />
            </div>
            {chat && <ChatAnswerInput chatId={chat.id} senderId={user.id} messageTo={chat.customer ? chat.customer.id : chat.technician.id} />}
        </div>
    )
}
