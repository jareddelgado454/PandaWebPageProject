'use client';
import React, { useContext, useEffect, useState } from 'react'
import LoadingComponent from '@/components/LoadingComponent';
import Image from 'next/image';
import { UserContext } from '@/contexts/user/UserContext';
import { client } from '@/contexts/AmplifyContext';
import { listMyChatsAsAdmin } from '@/graphql/chat/query';
import { formatDistance } from 'date-fns';
import { RiImageAddLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/utils/CloudFront';

export default function ContactsComponent({ setChatActive, setChatSelected }) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chats, setChats] = useState([]);
  const [filterText, setFilterText] = useState('');
  const retrieveMyChats = async () => {
    setLoading(true);
    try {
      const { data } = await client.graphql({
        query: listMyChatsAsAdmin,
        variables: {
          adminId: user.id
        }
      });
      setChats(data.listChats.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  }

  const filteredChats = chats.filter(chat =>
    chat.customer.fullName.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleChatClick = (chat) => {
    setChatActive(true);
    setChatSelected(chat);
    // Delete parameter `chatId` from URL
    const url = new URL(window.location);
    url.searchParams.delete('chatId');
    window.history.replaceState({}, '', url);
  };
  useEffect(() => {
    if (!user) {
      router.replace("/");
    } else {
      retrieveMyChats();
    }
  }, [user]);
  return (
    <>
      <div className='w-full'>
        <input
          type="text"
          className='bg-zinc-100 dark:bg-zinc-700 dark:text-white dark:line shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='Search a contact'
          value={filterText}
          onChange={({ target }) => setFilterText(target.value)}
        />
      </div>
      {
        loading ? (
          <LoadingComponent />
        ) : error ? (<div className='flex justify-center items-center h-full w-full text-rose-600 text-2xl'>{error}</div>) : (
          <div className='flex flex-col gap-2 w-full overflow-y-auto'>
            {user && filteredChats.length > 0 && filteredChats.map((chat, i) => (
              <div onClick={() => handleChatClick(chat)} key={i} id="chat_customer" className='flex flex-row justify-between gap-2 rounded-lg border-zinc-600 dark:border-zinc-800 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-800 hover:rounded-lg transition-all duration-300 ease-in cursor-pointer p-3 border-b-1'>
                <div className='flex flex-row gap-2'>
                  <Image
                    src={`${chat.customer.profilePicture ? baseUrl+chat.customer.profilePicture : '/image/defaultProfilePicture.jpg'}`}
                    width={100}
                    height={100}
                    alt='technician_profile_picture'
                    className='w-[2.5rem] h-[2.5rem] md:w-[3.8rem] md:h-[3.8rem] rounded-full'
                    priority
                  />
                  <div className='flex flex-col justify-center gap-1'>
                    <p className='font-semibold text-black dark:text-white'>{chat.customer.fullName}</p>
                    <div className='flex flex-row gap-1 items-center'>
                      <p className='text-sm text-zinc-500 dark:text-zinc-400 tracking-wide line-clamp-1'>
                        {chat.messages.items.length > 0 && (chat.messages.items[chat.messages.items.length - 1].sender === user.id && 'Me:')}
                      </p>
                      <div className='text-sm text-zinc-600 dark:text-zinc-400 tracking-wide line-clamp-1'>
                        {chat.messages.items.length > 0 ? (
                          chat.messages.items[chat.messages.items.length - 1].image !== null ? (
                            <div className='flex flex-row gap-1 items-center'><RiImageAddLine /><p>Image</p></div>
                          ) : chat.messages.items[chat.messages.items.length - 1].content
                        ) : 'No messages'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-zinc-300/80 text-xs md:text-base'>{chat.messages.items.length > 0 && formatDistance(new Date(chat.messages.items[chat.messages.items.length - 1].createdAt), new Date(), { addSuffix: true })}</p>
                </div>
              </div>
            ))}
          </div>
        )
      }

    </>
  )
}
