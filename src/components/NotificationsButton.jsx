'use client';
import React, { useState, useEffect } from 'react';
import { FaRegBell, FaXmark } from 'react-icons/fa6';

export default function NotificationsButton() {
    const [allowed, setAllowed] = useState(false);
    const [unsupported, setUnsupported] = useState(false);

    useEffect(() => {
        const permission = localStorage.getItem('notificationPermission');
        if (permission === "granted") {
            setAllowed(true);
        }
    }, []);

    const handleNotifications = () => {
        if (typeof window !== "undefined" && "Notification" in window) {
            Notification.requestPermission().then((resultado) => {
                if (resultado === "granted") {
                    setAllowed(true);
                    localStorage.setItem('notificationPermission', "granted");
                }
            });
        } else {
            console.warn("La API de Notificaciones no está disponible en este entorno.");
            setUnsupported(true);
        }
    };

    return (
        <>
            <div className='absolute right-2'>
                <div
                    onClick={handleNotifications}
                    className='transition ease-in-out duration-500 bg-white dark:bg-zinc-800 dark:hover:bg-green-panda rounded-full p-3 shadow-lg cursor-pointer hover:-translate-y-1 hover:scale-110'
                >
                    <FaRegBell className='text-xs 2xl:text-lg' />
                </div>
            </div>
            {!allowed && !unsupported && (
                <div className='absolute right-[3.4rem] top-4'>
                    <div className='bg-white dark:bg-green-panda rounded-lg p-2 flex items-center gap-3'>
                        <FaXmark className='cursor-pointer' onClick={() => setAllowed(!allowed)} />
                        <p className='text-xs 2xl:text-base'>Active notifications by clicking here:</p>
                    </div>
                </div>
            )}
            {unsupported && (
                <div className='absolute right-[3.4rem] top-4'>
                    <div className='bg-white dark:bg-green-panda rounded-lg p-2 flex items-center gap-3'>
                        <FaXmark className='cursor-pointer' onClick={() => setUnsupported(false)} />
                        <p className='text-xs 2xl:text-base'>Notifications are not supported on this device.</p>
                    </div>
                </div>
            )}
        </>
    );
}
