"use client"

import React, { useContext } from 'react'
import { Contexto } from '../layout';
import Link from 'next/link'
import { RiArrowDropRightLine, RiMailOpenFill, RiAlertFill } from "react-icons/ri";
import { BsCalendar2Check } from "react-icons/bs";
import Stripe from 'stripe';
import { useRouter } from 'next/navigation';

const Subscription = () => {
    const { user } = useContext(Contexto);
    console.log("usseeeeeeeeeeeeeeeer", user);
    const router = useRouter();

    const TEST_SECRET_KEY = "sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf";
    const stripe = new Stripe(TEST_SECRET_KEY);

    const handleCreateAccount = async () => {
        try {
            const account = await stripe.accounts.create({
                type: 'express',
                capabilities: {
                    card_payments: {
                      requested: true,
                    },
                    transfers: {
                      requested: true,
                    },
                },
                business_type: 'individual',
                metadata: {technicianId : user.sub},
                email: user.email
              });
            console.log("El proceso fue correcto paso1",account);
            const accountLink = await stripe.accountLinks.create({
                account: account.id,
                refresh_url: 'http://localhost:3000/user', 
                return_url: 'http://localhost:3000/user/subscription', 
                type: 'account_onboarding', 
            });
            console.log("El proceso fue correcto paso2",accountLink);
            if(accountLink.url){
                localStorage.setItem('provisionalStripeAccountId', account.id);
                router.push(accountLink.url);
            }
            
        } catch (error) {
            console.log(error)
        }
    };
  return (
    <div className="w-full h-[calc(100vh-100px)] relative pr-[20px]">
        <div className="w-full h-[calc(100vh-100px)] flex flex-col px-4 bg-zinc-800 rounded-xl pt-4">  
            <div className="w-full mb-6">
                <div className="w-[270px] bg-zinc-700 rounded-2xl flex items-center justify-center p-2 ">
                    <Link href={'/user'} className="text-zinc-400">
                        Technician panel
                    </Link>
                    <RiArrowDropRightLine className="text-zinc-400 text-[25px] " />
                    <Link href={'user/subscription'} className="text-white">
                        Subscription
                    </Link>
                </div>
            </div>
            <div className="w-full text-white flex flex-col mb-6">
                <h4 className="w-full text-[24px] font-bold mb-2">
                    My subscription
                </h4>
                <span className="text-gray-300">
                    Here is the information about your current subscription, expiration, price and benefits.
                </span>
            </div>
            <div className="w-full px-20 flex flex-col justify-center">
                <div className='w-full flex flex-col  gap-y-3'>
                    <div className='w-full bg-zinc-700 text-zinc-200 p-3 text-[15px] flex justify-between items-center shadow-md mb-4'>
                        <div className='flex gap-x-2 items-center'>
                            <RiAlertFill className='text-zinc-500 text-[23px]'/>
                            <span className='text-white font-bold text-[16px]'>Required action:</span>
                            You need to create your account in stripe to be able to receive payments for the services you provide
                        </div>
                        <div onClick={()=>handleCreateAccount()} className='px-3 py-1 bg-emerald-600 text-white rounded-md shadow-sm cursor-pointer'>
                            Create Account
                        </div>
                    </div>
                    <div className=' w-full flex flex-col'>
                        <div className='w-full text-zinc-300 mb-2'>
                            Current Plan
                        </div>
                        <div className='w-full flex items-center justify-between border-b-[1px] pb-3 border-zinc-700 mb-6'>
                            <div className='flex gap-x-3 items-center text-[35px] text-white font-bold'>
                                <BsCalendar2Check className='text-zinc-400' />
                                Free Plan
                            </div>
                            <div className="py-2 px-4 rounded-xl bg-emerald-600 text-white cursor-pointer">
                                Renew Plan
                            </div>
                        </div>
                        <div className='w-full flex '>
                            <div className='w-1/4 flex flex-col py-2 px-8'>
                                <span className='text-[16px] text-zinc-300 mb-3'>Devices</span>
                                <span className='text-[28px] font-semibold text-emerald-300'>3</span>
                                <span className='text-zinc-400'>You can use up to 3 devices with your account</span>
                                <span className='text-emerald-400 font-semibold cursor-pointer'>Device Management</span>
                            </div>
                            <div className='w-1/4 flex flex-col py-2 px-8'>
                                <span className='text-[16px] text-zinc-300 mb-3'>Active devices</span>
                                <span className='text-[28px] font-semibold text-emerald-300'>1 / 3</span>
                                <span className='text-zinc-400'>Currently you have 1 active devices</span>
                                <span className='text-emerald-400 font-semibold cursor-pointer'>Device Management</span>
                            </div>
                            <div className='w-1/4 flex flex-col py-2 px-8'>
                                <span className='text-[16px] text-zinc-300 mb-3'>Renewal date</span>
                                <div className='text-[28px] flex font-semibold text-white items-center gap-x-2'>
                                    	<RiAlertFill className='text-emerald-500 text-[30px]'/> - <span className='text-emerald-400'>.</span> - <span className='text-emerald-400'>.</span> -
                                </div>
                                <span className='text-zinc-400'>Unlimited plan</span>
                            </div>
                            <div className='w-1/4 flex flex-col py-2 px-8'>
                                <span className='text-[16px] text-zinc-300 mb-3'>Renewal Amount</span>
                                <span className='text-[28px] font-semibold text-emerald-300'>$ 0</span>
                                <span className='text-zinc-400'>Free plan</span>
                                <span className='text-emerald-400 font-semibold cursor-pointer'>See past invoices</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Subscription