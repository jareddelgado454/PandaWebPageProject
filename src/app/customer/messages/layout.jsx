import React from 'react'
import { ContactsComponent } from '@/components/customer'
export default function layout({ children }) {
    return (
        <div className='p-4 h-full'>
            <div className='flex flex-col gap-4 lg:flex-row h-full'>
                <div className='w-full flex flex-col gap-6'>
                    <ContactsComponent />
                </div>
                <div className='w-full lg:w-[160%] border-l-2 dark:border-zinc-700 px-2'>
                    { children }
                </div>
            </div>
        </div>
    )
}
