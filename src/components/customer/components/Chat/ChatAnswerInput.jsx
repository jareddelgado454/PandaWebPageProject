import React from 'react'
import { FaPaperPlane } from 'react-icons/fa6'

export default function ChatAnswerInput() {
    return (
        <div className='absolute bottom-0 w-full'>
            <div className='bg-white dark:bg-zinc-800 min-h-full p-4'>
                <form className='flex justify-center gap-4 items-center w-full h-full'>
                    <textarea
                        type="text"
                        id="input"
                        className='m-0 w-full rounded-lg bg-zinc-200 dark:bg-zinc-900 resize-none border-0 focus:ring-0 focus-visible:ring-0 max-h-[3rem] placeholder-black/50 dark:placeholder-white/50'
                        name="message"
                    />
                    <FaPaperPlane className='dark:text-[#40C48E] text-2xl cursor-pointer' />
                </form>
            </div>
        </div>
    )
}
