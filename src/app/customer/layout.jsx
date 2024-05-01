import { CustomerBar } from '@/components/customer'
import React from 'react'

export default function layout({children}) {
  return (
    <div className='min-h-screen h-full bg-stone-200'>
        <div className='flex flex-row items-center h-screen px-4 gap-2'>
          <CustomerBar />
          {children}
        </div>
    </div>
  )
}
