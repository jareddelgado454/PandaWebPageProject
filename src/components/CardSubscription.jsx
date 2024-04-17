import React from 'react'
import { RiTimer2Line,RiCheckboxCircleFill  } from "react-icons/ri";
import { Stripe } from "stripe";
import { useRouter } from 'next/navigation';
import { RiVipCrownFill } from "react-icons/ri";
import { updateUserAttributes } from 'aws-amplify/auth';
import { updateSubscriptionAndFee } from '@/graphql/users/mutation/users';
import { client } from "@/contexts/AmplifyContext";

const CardSubscription = ({freePlan, infoPlan, idsPassed}) => {
    const router = useRouter();
    const handleClick = async () => {
        const stripe = new Stripe("sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf");
        if(freePlan){
            try {
                console.log("hola")
                await updateUserAttributes({
                    userAttributes: {
                        'custom:subscription':"free",
                        'custom:fee':"10",
                    }
                });
                console.log("subscription cognitooooooooo updated");
                console.log(idsPassed);
                const { data } = await client.graphql({
                    query: updateSubscriptionAndFee,
                    variables: {
                        id: idsPassed?.idDatabase,
                        subscription: "free",
                        fee: 10,
                    },
                });   
                console.log("subscription databaseeeeeee updated");
            } catch (error) {
                console.log("error free subscription",error);
            }        
        }else{
            try {
                const priceId = infoPlan.id
                const checkout =  await stripe.checkout.sessions.create({
                    mode : "subscription",
                    payment_method_types : ["card"],
                    line_items : [
                        {
                            price : priceId,
                            quantity : 1,
                        }
                    ],
                    success_url : "http://localhost:3000/user",
                    cancel_url : "http://localhost:3000/user",
                    metadata : idsPassed ? {...idsPassed} : {},
                }); 
                router.push(checkout?.url);
                console.log(checkout);   
            } catch (error) {
                console.log(error);
            }       
        }
    }
  return (
    <div className={`${freePlan ? "bg-emerald-500 text-white" : "bg-white text-black relative"}  rounded-xl shadow-lg flex flex-col  w-[250px] p-3 px-5`}>
        {  
            freePlan ? "" : <div className="absolute -top-2 -right-2 bg-zinc-700 rounded-full px-4 py-2 text-gray-200 text-[13px]">-15%</div>
        }
        <span className='flex gap-x-1 text-[15px] mb-2' ><RiTimer2Line className='text-[18px]'/> {  freePlan ? "Unlimited" : infoPlan?.nickname === "monthly" ? "1mo" : "1yr" }</span>
        <h4 className=' text-[25px] font-semibold mb-2'>{freePlan ? "Comissioned" : infoPlan?.nickname === "monthly" ? "Monthly Plan" : "Annual Plan"}</h4>
        <p className='font-extrabold mb-4 text-[18px] flex flex-col'> <del className="text-gray-400 font-normal text-[13px]">{freePlan ? "" : infoPlan?.nickname === "monthly" ? "$540.00" : "$5400.00"}</del> {freePlan ? "FREE" : `$ ${infoPlan?.unit_amount/100}.00`}</p>
        <div className='mb-3'>
            <span className='flex gapx-x-3 text-[15px] mb-3'>{freePlan ? <RiCheckboxCircleFill className='text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 '/> : <RiVipCrownFill className='text-[15px] text-emerald-600 min-w-[22px] h-[22px] pt-1 mr-2 '/> } Jkafjals </span>
            <span className='flex gapx-x-3 text-[15px] mb-3'>{freePlan ? <RiCheckboxCircleFill className='text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 '/> : <RiVipCrownFill className='text-[15px] text-emerald-600 min-w-[22px] h-[22px] pt-1 mr-2 '/> } Jkafjals jfaskdasg .</span>
            <span className='flex gapx-x-3 text-[15px] mb-3'>{freePlan ? <RiCheckboxCircleFill className='text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 '/> : <RiVipCrownFill className='text-[15px] text-emerald-600 min-w-[22px] h-[22px] pt-1 mr-2 '/> } Jkafjals jfaskdasg kajsdg ioasdv ajhsdasj faksjd ahmgsdv asd.</span>
        </div>
        <button onClick={() => handleClick()} className={`${freePlan ? "bg-white text-emerald-800" : "bg-emerald-500 text-white"} w-full rounded-xl text-center py-3`} >Select plan</button>
    </div>
  )
}

export default CardSubscription