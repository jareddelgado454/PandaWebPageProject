import { client } from '@/contexts/AmplifyContext'
import { createMessage } from '@/graphql/chat/mutation';
import React, { useState } from 'react'
import { RiImageAddLine } from 'react-icons/ri';
import { IoSend } from "react-icons/io5";
export default function ChatAnswerInput({ chatId, senderId }) {
    const [message, setMessage] = useState("");
    const onSendMessage = async () => {
        try {
            if (message.trim() === "") return;
            await client.graphql({
                query: createMessage,
                variables: {
                    chatId,
                    content: message,
                    senderId
                }
            });
            setMessage("");
        } catch (error) {
            alert(error);
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSendMessage();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSendMessage();
    };
    return (
        <div className='w-full'>
            <div className='bg-zinc-700 dark:bg-zinc-700 rounded-lg min-h-full p-4'>
                <form onSubmit={handleSubmit} className='flex justify-center gap-3 items-center w-full h-full'>
                    <RiImageAddLine className='transition-all duration-300 rounded text-zinc-900 dark:text-white text-base xl:text-3xl dark:hover:bg-zinc-900 cursor-pointer' />
                    <textarea
                        type="text"
                        id="input"
                        className='m-0 w-full rounded-lg bg-zinc-800 dark:bg-zinc-900 resize-none border-0 focus:ring-0 focus-visible:ring-0 max-h-[3rem] placeholder-black/50 dark:placeholder-white/50 outline-none'
                        name="message"
                        value={message}
                        onChange={({ target }) => setMessage(target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <IoSend className='dark:text-[#40C48E] text-2xl cursor-pointer' onClick={onSendMessage} />
                </form>
            </div>
        </div>
    )
}
