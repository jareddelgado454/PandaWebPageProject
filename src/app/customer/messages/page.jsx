'use client';
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { format } from 'date-fns';
import { FaChevronLeft, FaPhone } from 'react-icons/fa6'
import ChatAnswerInput from '@/components/customer/components/Chat/ChatAnswerInput'
import { client } from '@/contexts/AmplifyContext';
import { getChatById } from '@/graphql/chat/query';
import { UserContext } from '@/contexts/user/UserContext';
import { listenToMessages } from '@/graphql/chat/subscription';
import { ContactsComponent } from '@/components/customer';

export default function page() {
  const [chatActive, setChatActive] = useState(false);
  const [chatSelected, setChatSelected] = useState(null);
  return (
    <div className='p-4 h-[100vh] md:h-full'>
      <div className='flex flex-col gap-4 lg:flex-row h-full'>
        <div className={`w-full h-[50%] flex-col gap-6 ${chatActive ? 'hidden lg:flex' : 'flex'}`}>
          <ContactsComponent setChatActive={setChatActive} setChatSelected={setChatSelected} />
        </div>
        <div className='w-full h-full lg:w-[160%] lg:border-l-2 lg:dark:border-zinc-700 px-2'>
          {chatSelected && <Chat chatSelected={chatSelected} setChatActive={setChatActive} setChatSelected={setChatSelected} />}
        </div>
      </div>
    </div>
  )
}

const Chat = ({ setChatActive, chatSelected, setChatSelected }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chat, setChat] = useState(null);
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
      setLoading(false);
      setChat(data.getChat);
      setMessages(data.getChat.messages.items);
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
      <div id='header' className='w-full bg-zinc-200 dark:bg-zinc-700 p-2 rounded-lg flex flex-row justify-between gap-2'>
        {loading ? (<div>Loading</div>) : error ? (<div>{error}</div>) : chat && (
          <div className='flex flex-row gap-2'>
            <div onClick={() => {setChatActive(false); setChatSelected(null)}} className='flex justify-center items-center'>
              <FaChevronLeft className='cursor-pointer' />
            </div>
            <Image
              src={`${chat && chat.technicianSelected.profilePicture ? chat.technicianSelected.profilePicture : `/image/defaultProfilePicture.jpg`}`}
              width={50}
              height={50}
              alt='alt_profile_technician_selected'
              className='w-[3rem] h-[3rem] rounded-full'
              priority
            />
            <div className='flex flex-col'>
              <p>{chat.technicianSelected.fullName}</p>
              <p className='text-sm dark:text-zinc-400'>online</p>
            </div>
          </div>
        )}
        <div className='flex justify-center items-center'>
          <div className='rounded-full p-3 dark:bg-zinc-800'>
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
            <div className={`${message.sender === user.id ? 'bg-green-panda' : 'bg-zinc-900'} max-w-[15rem] rounded-lg p-2`}>
              <div className='flex flex-row gap-3'>
                <p className='text-left text-white dark:'>{message.content}</p>
                <div className='relative flex flex-col justify-end'>
                  <p className='text-xs text-zinc-200'>{format(new Date(message.createdAt), 'h:mm')}</p>
                </div>
              </div>
            </div>
          </div>
        )) : null}
      </div>
      {chat && <ChatAnswerInput chatId={chat.id} senderId={user.id} />}
    </div>
  )
}