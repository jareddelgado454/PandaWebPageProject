"use client"

import React, { useEffect, useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import CardSubscription from '../CardSubscription';
import Stripe from "stripe";

const SubscriptionPlan = ({isOpen, onOpenChange, idsPassed}) => {

  const [prices, setPrices] = useState([]);

  const requestPrices = async () => {
    const stripe = new Stripe("sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf");
    const plans = await stripe.prices.list();
    setPrices(plans.data);
    console.log(plans.data)
  } 

  useEffect(()=>{
    requestPrices();
    return () => setPrices([]);
  },[]);

  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} size='4xl' placement='center'>
          <ModalContent className='bg-gray-100 text-zinc-900 border-[2px] border-gray-300 p-0'>
            {(onClose) => (
              <>
                <ModalHeader>

                </ModalHeader>
                <ModalBody className='w-full flex flex-col '>
                    <h2 className='text-[30px] font-extrabold mb-0'>Choose your plan </h2>  
                    <p className='text-gray-700 m-0 p-0 mb-3'>All our subscription plans have their benefits.</p>
                    <div className='w-full flex justify-around'>
                      <CardSubscription freePlan={true} idsPassed={idsPassed}/>
                      {
                        prices.length > 0 && prices.filter((price) => price.nickname === "annual" || price.nickname === "monthly")
                            .sort((a, b) => a.unit_amount - b.unit_amount)
                            .map((price) => {
                              return <CardSubscription key={price.id} freePlan={false} infoPlan = {price} idsPassed={idsPassed} />
                            }
                        )
                      }
                    </div>
                    
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
              </>
            )}
          </ModalContent>
    </Modal> 
  )
}

export default SubscriptionPlan