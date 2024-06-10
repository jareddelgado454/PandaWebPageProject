'use client';
import React, { useEffect, useState } from 'react';
import { ChatAdminComponent, ContactsAdminComponent } from '@/components/admin';
import { client } from '@/contexts/AmplifyContext';
import { getCustomerChatById } from '@/graphql/chat/query';
import { useSearchParams } from 'next/navigation';
export default function ClientMessages() {
    const param = useSearchParams().get('chatId');
    const [chatActive, setChatActive] = useState(false);
    const [chatSelected, setChatSelected] = useState(null);
    const retrieveOneChat = async(paramId) => {
        try {
            const { data } = await client.graphql({
                query: getCustomerChatById,
                variables: {
                    chatId: paramId
                }
            });
            setChatSelected(data.getChat);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (param) {
            console.log(param);
            setChatActive(true);
            retrieveOneChat(param);
        }
    }, [param]);
    return (
        <div className='p-4 h-[100vh] md:h-full'>
            <div className='flex flex-col gap-4 lg:flex-row h-full'>
                <div className={`w-full h-[50%] flex-col gap-6 ${chatActive ? 'hidden lg:flex' : 'flex'}`}>
                    <ContactsAdminComponent setChatActive={setChatActive} setChatSelected={setChatSelected} />
                </div>
                <div className='w-full h-full lg:w-[160%] lg:border-l-2 lg:dark:border-zinc-700 px-2'>
                    {chatSelected && <ChatAdminComponent chatSelected={chatSelected} setChatActive={setChatActive} setChatSelected={setChatSelected} />}
                </div>
            </div>
        </div>
    )
}
