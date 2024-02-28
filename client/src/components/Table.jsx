"use client";
import React, { useState } from 'react';
import {
    FaTrashCan,
    FaPencil,
    FaPersonCircleCheck,
    FaPersonCircleMinus
} from 'react-icons/fa6';
import { useDisclosure } from "@nextui-org/react";
import { CustomerModal } from './admin/Customer/CustomerModal';

export const Table = ({ item }) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [mode, setMode] = useState('create');

    const handleOpenModal = (mode) => {
        
        onOpen();
        setMode(mode);

    }

  return (
    <div className="relative overflow-x-auto rounded-lg shadow-lg p-6 bg-white dark:bg-zinc-800">
        <table id="myTable" className="w-full text-sm text-left rtl:text-right  transition-all">
            <thead className="text-xs text-gray-700 dark:text-white uppercase rounded-full bg-zinc-200 dark:bg-zinc-800" >
                <tr>
                    <th scope="col" className="px-6 py-3 w-20 rounded-l-lg">
                        IMAGE
                    </th>
                    <th scope="col" className="px-6 py-3">
                        FULL NAME
                    </th>
                    <th scope="col" className="px-6 py-3">
                        MAIL
                    </th>
                    <th scope="col" className="px-6 py-3 w-20">
                        STATUS
                    </th>
                    <th scope="col" className="px-6 py-3">
                        CONTACT NUMBER
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-r-lg">
                        ACTIONS
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    item.map((user, i) => (
                        <tr className={`bg-white border-b text-gray-700 dark:bg-zinc-800 dark:border-[#40C48E] dark:text-white dark:font-medium`}
                            key={i}
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                <img
                                    src={user.profilePicture ? user.profilePicture : '/image/defaultProfilePicture.jpg'}
                                    alt="logo_image"
                                    className='w-[2rem] h-[2rem] rounded-lg object-cover bg-center'
                                />
                            </th>
                            <td className="px-6 py-4">
                                {user.fullName}
                            </td>
                            <td className="px-6 py-4">
                                {user.email}
                            </td>
                            <td className="px-6 py-4">
                                <div>
                                    <p
                                        className={`py-1 font-medium rounded-2xl brightness-125 w-20 flex justify-center ${user.status === 'active' ? 'bg-emerald-700 text-green-500' : 'bg-rose-700 text-rose-300'}`}
                                    >
                                        {user.status}
                                    </p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {user.contactNumber}
                            </td>
                            <td className="px-6 py-4">
                                <div className='flex gap-4'>
                                    <button
                                        type='button'
                                        className='bg-rose-500 p-2 rounded text-white'
                                    >
                                        <FaTrashCan />
                                    </button>
                                    <button
                                        type='button'
                                        className='bg-yellow-400 p-2 rounded text-white'
                                        onClick={() => handleOpenModal('edit')}
                                    >
                                        <FaPencil />
                                    </button>
                                    {
                                        user.status === "active" ? (
                                            <button
                                                type='button'
                                            >
                                                <FaPersonCircleCheck className='text-2xl text-emerald-400' />
                                            </button>

                                        ) : (

                                            <button
                                                type='button'
                                            >
                                                <FaPersonCircleMinus className='text-2xl text-rose-600' />
                                            </button>
                                        )
                                    }
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            <CustomerModal isOpen={isOpen} onOpenChange={onOpenChange} mode={mode} />
        </table>
    </div>
  )
}