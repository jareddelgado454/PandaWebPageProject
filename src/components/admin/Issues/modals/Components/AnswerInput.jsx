'use client';
import React, { useContext, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa6'
import { client } from '@/contexts/AmplifyContext';
import { AnswerReport } from '@/graphql/issues/mutations/mutation';
import { UserContext } from '@/contexts/user/UserContext';
export default function AnswerInput({ reportId }) {
    const { user } = useContext(UserContext);
    const [text, setText] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const handleSendText = async (e) => {
        e.preventDefault();
        try {
            await client.graphql({
                query: AnswerReport,
                variables: {
                    input: {
                        text,
                        answerUserId: user.id,
                        reportId
                    }
                }
            });
        } catch (error) {
            console.log();
        }
        setText("");
    }

    const handleOnChange = () => {
        setIsPrivate(!isPrivate);
    }
    return (
        <div className='sticky bottom-0 w-full'>
            <div className='bg-white dark:bg-zinc-800 min-h-full p-4'>
                <form onSubmit={handleSendText} className='flex flex-col gap-2 w-full h-full'>
                    <div className='flex justify-center gap-4 items-center w-full h-full'>
                        <textarea
                            type="text"
                            id="input"
                            className='m-0 w-full rounded-lg bg-zinc-200 dark:bg-zinc-900 resize-none border-0 focus:ring-0 focus-visible:ring-0 max-h-[3rem] placeholder-black/50 dark:placeholder-white/50'
                            name="message"
                            onChange={({ target }) => setText(target.value)}
                        />
                        <FaPaperPlane className='dark:text-[#40C48E] text-2xl cursor-pointer' onClick={handleSendText} />
                    </div>
                </form>
            </div>
        </div>
    )
}
