'use client';
import React, { useEffect } from 'react';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf');
import { FaDollarSign } from 'react-icons/fa6';
import { useRouter, useSearchParams } from 'next/navigation';
import { client } from '@/contexts/AmplifyContext';
import { updateStatusService } from '@/graphql/services/mutations/mutation';
import { onUpdatePaymentService } from '@/graphql/users/customer/subscription';
export default function PaymentMethod({ service, setService }) {
  const router = useRouter();
  const param = useSearchParams().get('isSuccess');
  async function createCheckoutSession() {
    router.push(service.paymentLink);
  }
  const onChangeToComplete = async() => {
    try {
      await client.graphql({
        query: updateStatusService,
        variables: {
          serviceId: service.id,
          status: 'completed'
        }
      })
    } catch (error) {
      console.warn(error);
    }
  }
  useEffect(() => {
    if(!param) return;
    onChangeToComplete();
  }, [param]);
  
  useEffect(() => {
    const subscription = client
      .graphql({
        query: onUpdatePaymentService,
        variables: { serviceId: service.id, customerId: service.customer.id }
      })
      .subscribe({
        next: ({ data }) => {
          console.log(data);
          setService((prevState) => ({
            ...prevState,
            paymentLink: data.onUpdateService.paymentLink !== null ? data.onUpdateService.paymentLink : prevState.paymentLink,
            price: data.onUpdateService.price !== null ? data.onUpdateService.price : prevState.price,
            tax: data.onUpdateService.tax !== null ? data.onUpdateService.tax : prevState.tax,
            total: data.onUpdateService.total !== null ? data.onUpdateService.total : prevState.total,
          }));
        },
        error: (error) => console.warn(error)
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <div className='h-full w-full flex flex-col lg:flex-row gap-2'>
      <div className='w-[60%] h-full flex justify-center items-center'>
        <div className='flex gap-4 justify-between w-full px-4'>
          <div className='flex flex-col gap-2'>
            <p>{service.type} service: </p>
            <p>Fee: </p>
            <p>Total: </p>
          </div>
          <div className='flex flex-col gap-2'>
            <strong>$ {service.price ? service.price : 0}</strong>
            <strong>$ {service.tax ? service.tax : 0}</strong>
            <strong>$ {service.total ? service.total : 0}</strong>
          </div>
        </div>
      </div>
      <div className='w-[40%] h-full flex justify-center items-center'>
        <div className='border-2 rounded-lg bg-white dark:border-zinc-900 dark:bg-zinc-800 p-4 flex flex-col gap-4 w-[80%]'>
          {service.status === "completed" ? <strong>Satisfactorily paid service</strong> : <p>Payment Method: <strong>{service.paymentMethod}</strong></p>}
          {(service.paymentMethod === 'card' && service.status === 'payment') && (
            <button onClick={createCheckoutSession} className='flex gap-1 bg-indigo-500 rounded-xl p-3 justify-center text-white items-center'>
              <FaDollarSign />
              Pay with Stripe
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
