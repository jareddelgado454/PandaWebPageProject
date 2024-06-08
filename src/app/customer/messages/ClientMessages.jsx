'use client';
import React, { useState } from 'react'
import { ChatCustomerComponent, ContactsComponent } from '@/components/customer';
export default function ClientMessages() {
    const [chatActive, setChatActive] = useState(false);
    const [chatSelected, setChatSelected] = useState(null);
    return (
        <div className='p-4 h-[100vh] md:h-full'>
            <div className='flex flex-col gap-4 lg:flex-row h-full'>
                <div className={`w-full h-[50%] flex-col gap-6 ${chatActive ? 'hidden lg:flex' : 'flex'}`}>
                    <ContactsComponent setChatActive={setChatActive} setChatSelected={setChatSelected} />
                </div>
                <div className='w-full h-full lg:w-[160%] lg:border-l-2 lg:dark:border-zinc-700 px-2'>
                    {chatSelected && <ChatCustomerComponent chatSelected={chatSelected} setChatActive={setChatActive} setChatSelected={setChatSelected} />}
                </div>
            </div>
        </div>
    )
}