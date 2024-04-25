import { Tooltip } from '@nextui-org/react';
import React from 'react';
import { FaPaperPlane } from 'react-icons/fa6';
export default function ShowComments() {
    const answers = ['1', '2', '3'];
    return (
        <div
            id='answers_admins'
            className=' relative flex flex-col gap-6 flex-nowrap px-4 bg-white rounded-lg 2xl:h-[32.5rem] overflow-y-scroll slide-in-right dark:bg-zinc-800'
        >
            {answers.map((_, i) => (
                <div key={i} className='flex flex-col my-4' id='responses_admin'>
                    <div className='flex gap-2 w-full h-[4rem]'>
                        <Tooltip color='default' content="id: 123456789">
                            <img
                                src='https://f.rpp-noticias.io/2022/05/27/1264852c7zccg4wwaamvbxjpg.jpg'
                                alt='admin_profile_picture'
                                className='w-[3rem] h-[3rem] rounded-full'
                            />
                        </Tooltip>
                        <div>
                            <div className='flex items-center flex-row flex-nowrap gap-2'>
                                <p className='text-sm font-semibold'>Cristiano Ronaldo Dos Santos Aveiro</p>
                                <p className='text-xs text-zinc-400'>4d</p>
                            </div>
                            <p className='text-zinc-400 font-light text-sm'>CrisRonaldo@gmail.com</p>
                        </div>
                    </div>
                    <div className='bg-zinc-100 dark:bg-zinc-700 rounded-md'>
                        <p className='text-sm p-4 text-justify'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere ipsa voluptatibus voluptas nihil saepe dolorum hic odit vero animi incidunt nisi quas repellendus aliquid, ab esse possimus consequuntur adipisci molestiae.
                        </p>
                    </div>
                </div>
            ))}
            <div className='sticky bottom-0 w-full'>
                <div className='bg-white dark:bg-zinc-800 h-[3.5rem]'>
                    <div className='flex justify-center gap-4 items-center w-full h-full'>
                        <input
                            type="text"
                            className='shadow appearance-none border rounded w-10/12 py-2 px-3 dark:text-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            name="message"
                        />
                        <FaPaperPlane className='dark:text-white text-3xl cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    )
}
