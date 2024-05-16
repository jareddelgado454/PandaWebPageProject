import React from 'react'
import { FaDollarSign } from 'react-icons/fa6'

export default function PaymentMethod({ service }) {
  return (
    <div className='h-full w-full flex flex-col lg:flex-row gap-2'>
      <div className='w-[60%] h-full flex justify-center items-center'>
        <div className='flex gap-4 justify-between w-full px-4'>
          <div className='flex flex-col gap-2'>
            <p>Diagnostic: </p>
            <p>Repair service: </p>
            <p>Fee: </p>
            <p>Total: </p>
          </div>
          <div className='flex flex-col gap-2'>
            <strong>$0</strong>
            <strong>$0</strong>
            <strong>$0</strong>
            <strong>$0</strong>
          </div>
        </div>
      </div>
      <div className='w-[40%] h-full flex justify-center items-center'>
        <div className='border-2 rounded-lg dark:border-zinc-900 dark:bg-zinc-800 p-4 flex flex-col gap-4 w-[80%]'>
          <p>Payment Method: <strong>{service.paymentMethod}</strong></p>
          {service.paymentMethod === 'stripe' && (
            <button className='flex gap-1 bg-indigo-500 rounded-xl p-3 justify-center text-white items-center'>
              <FaDollarSign />
              Pay with Stripe
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
