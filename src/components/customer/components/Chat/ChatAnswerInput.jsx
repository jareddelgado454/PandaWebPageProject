import React, { useState } from 'react'
import { client } from '@/contexts/AmplifyContext'
import { createMessage } from '@/graphql/chat/mutation';
import { RiImageAddLine } from 'react-icons/ri';
import { IoSend } from "react-icons/io5";
import { useDisclosure } from '@nextui-org/react';
import ConfirmImageMessage from '../../modals/ConfirmImageMessage';
export default function ChatAnswerInput({ chatId, senderId, messageTo }) {
    const {
        isOpen,
        onOpen,
        onOpenChange,
    } = useDisclosure();
    const [message, setMessage] = useState("");
    const [photograph, setPhotograph] = useState(null);
    function handleChangePhotograph(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                setPhotograph(reader.result);
                onOpen();
            };
            reader.readAsDataURL(file);
        }
    }
    const onSendMessage = async () => {
        try {
            if (message.trim() === "") return;
            await client.graphql({
                query: createMessage,
                variables: {
                    chatId,
                    content: message,
                    senderId,
                    messageTo
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
            <div className='bg-zinc-200 dark:bg-zinc-700 rounded-lg min-h-full p-4'>
                <form onSubmit={handleSubmit} className='flex justify-center gap-3 items-center w-full h-full'>
                    <div className='bg-zinc-300 dark:bg-zinc-900 relative w-[3rem] h-[2.2rem] md:w-[3rem] md:h-[2.8rem] overflow-hidden rounded-full shadow-md group'>
                        <input
                            id="file-upload"
                            type="file"
                            name=""
                            accept="image/gif, image/jpeg, image/png"
                            className="absolute top-0 right-0 min-w-full min-h-full opacity-0 cursor-pointer bg-center object-cover object-center"
                            onChange={(event) => {
                                handleChangePhotograph(event);
                            }}
                        />
                        <div className='flex justify-center items-center w-full h-full'>
                            <RiImageAddLine className='transition-all duration-300 rounded text-black dark:text-white text-base xl:text-3xl dark:hover:bg-zinc-950 cursor-pointer' />
                        </div>
                    </div>
                    <textarea
                        type="text"
                        id="input"
                        className='m-0 w-full rounded-lg text-black dark:text-white bg-zinc-300 dark:bg-zinc-900 resize-none border-0 focus:ring-0 focus-visible:ring-0 max-h-[3rem] placeholder-black/50 dark:placeholder-white/50 outline-none'
                        name="message"
                        value={message}
                        onChange={({ target }) => setMessage(target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <IoSend className='text-zinc-800 dark:text-[#40C48E] text-2xl cursor-pointer' onClick={onSendMessage} />
                </form>
            </div>
            <ConfirmImageMessage isOpen={isOpen} onOpenChange={onOpenChange} photograph={photograph} chatId={chatId} senderId={senderId} />
        </div>
    )
}
