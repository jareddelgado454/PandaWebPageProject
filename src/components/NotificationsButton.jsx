'use client';
import React, { useState } from 'react';
import { FaRegBell, FaXmark } from 'react-icons/fa6';
export default function NotificationsButton() {
    const [allowed, setAllowed] = useState(false);
    const handleNotifications = () => {
        Notification.requestPermission().then((resultado) => {
            resultado === "granted" && setAllowed(true);
            localStorage.setItem('notificationPermission', "granted")
        })
    }
    return (
        <>
            <div className='absolute right-2'>
                <div
                    onClick={handleNotifications}
                    className='transition ease-in-out duration-500 bg-white dark:bg-zinc-800 dark:hover:bg-green-panda rounded-full p-3 shadow-lg cursor-pointer hover:-translate-y-1 hover:scale-110'
                >
                    <FaRegBell className='text-lg' />
                </div>
            </div>
            {!allowed && (
                <div className='absolute right-[3.4rem] top-4'>
                    <div className='bg-white dark:bg-green-panda rounded-lg p-2 flex items-center gap-3'>
                        <FaXmark className='cursor-pointer' onClick={() => setAllowed(!allowed)} />
                        <p>Allow us to send you notifications with clicking here:</p>
                    </div>
                </div>
            )}
        </>
    )
}
