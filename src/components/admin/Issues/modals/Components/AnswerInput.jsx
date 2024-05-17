'use client';
import React, { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa6'
import { client } from '@/contexts/AmplifyContext';
import { AnswerReport } from '@/graphql/issues/mutations/mutation';
import Cookies from 'js-cookie';
export default function AnswerInput({ reportId }) {
    const parsedUser = JSON.parse(Cookies.get("currentUser"));
    const [text, setText] = useState("");
    const handleSendText = async (e) => {
        e.preventDefault();
        try {
            await client.graphql({
                query: AnswerReport,
                variables: {
                    input: {
                        text,
                        answerUserId: parsedUser.id,
                        reportId
                    }
                }
            });
        } catch (error) {
            console.log();
        }
        setText("");
    }
    return (
        <div className='sticky bottom-0 w-full'>
            <div className='bg-white dark:bg-zinc-800 min-h-full p-4'>
                <form onSubmit={handleSendText} className='flex justify-center gap-4 items-center w-full h-full'>
                    <textarea
                        type="text"
                        id="input"
                        className='m-0 w-full rounded-lg bg-zinc-200 dark:bg-zinc-900 resize-none border-0 focus:ring-0 focus-visible:ring-0 max-h-[3rem] placeholder-black/50 dark:placeholder-white/50'
                        name="message"
                        onChange={({ target }) => setText(target.value)}
                    />
                    <FaPaperPlane className='dark:text-[#40C48E] text-2xl cursor-pointer' onClick={handleSendText} />
                </form>
            </div>
        </div>
    )
}
