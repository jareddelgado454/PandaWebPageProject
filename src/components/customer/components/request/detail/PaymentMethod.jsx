'use client';
import React from 'react';
import { FaDollarSign } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
export default function PaymentMethod({ service, user }) {
  const router = useRouter();

  const createCheckoutSession = async () => {

    try {
      const { data } = (await client.graphql({
        query: createStripeIntent,
        variables: {
          input: {
            serviceAssignedId: service.id,
            serviceAssignedType: service.type,
            serviceAssignedStripeId: service.technicianSelected.stripeId,
            total: service.total,
            typeAccount: service.technicianSelected.subscription,
            userEmail: user.email
          },
        },
      }))
      router.push(data.createStripeIntent);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  }
  return (
    <div className='h-full w-full flex flex-col lg:flex-row gap-2'>
      <div className='w-full lg:w-[60%] h-full flex justify-center items-center'>
        <div className='flex gap-4 justify-between w-full px-4'>
          <div className='flex flex-col gap-2'>
            <p>{service.type} service: </p>
            <p>Fee: </p>
            <p>Total: </p>
          </div>
          <div className='flex flex-col gap-2'>
            <strong className='text-[#40C48E]'>$ {service.price ? service.price : 0}</strong>
            <strong className='text-[#40C48E]'>$ {service.tax ? service.tax : 0}</strong>
            <strong className='text-[#40C48E]'>$ {service.total ? service.total : 0}</strong>
          </div>
        </div>
      </div>
      <div className='w-full lg:w-[40%] h-full flex justify-center items-center'>
        <div className='border-2 border-white rounded-lg bg-green-700/15 dark:border-zinc-900 dark:bg-zinc-800 p-4 flex flex-col gap-4 w-[80%]'>
          {service.status === "completed" ? <strong>Satisfactorily paid service</strong> : <p>Payment Method: <strong className='text-[#40C48E]'>{service.paymentMethod}</strong></p>}
          {(service.paymentMethod === 'card' && service.status === 'payment') && (
            <button onClick={createCheckoutSession} className='flex gap-1 bg-green-panda dark:bg-indigo-500 rounded-xl p-3 justify-center text-white items-center'>
              <FaDollarSign />
              Pay with Stripe
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
