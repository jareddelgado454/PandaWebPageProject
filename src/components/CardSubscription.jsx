import React from 'react'
import { RiTimer2Line,RiCheckboxCircleFill  } from "react-icons/ri";
import { Stripe } from "stripe";
import { useRouter } from 'next/navigation';

const CardSubscription = ({freePlan, infoPlan}) => {
    const router = useRouter();
    const handleClick = async () => {
        const stripe = new Stripe("sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf");
        if(freePlan){
            console.log("free plan bro");
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
                }); 
                router.push(checkout?.url);
                console.log(checkout);   
            } catch (error) {
                console.log(error);
            }       
        }
    }
  return (
    <div className={`${freePlan ? "bg-emerald-500 text-white" : "bg-white text-black"}  rounded-xl shadow-lg flex flex-col  w-[250px] p-3 px-5`}>
        <span className='flex gap-x-1 text-[15px] mb-2' ><RiTimer2Line className='text-[18px]'/>  Unlimited</span>
        <h4 className=' text-[25px] font-semibold mb-2'>{freePlan ? "Comissioned" : "Pay Plan"}</h4>
        <p className='font-extrabold mb-4 text-[18px]'>{freePlan ? "FREE" : `$ ${infoPlan?.unit_amount/100}.00`}</p>
        <div className='mb-3'>
            <span className='flex gapx-x-3 text-[15px] mb-3'><RiCheckboxCircleFill className='text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 '/> Jkafjals </span>
            <span className='flex gapx-x-3 text-[15px] mb-3'><RiCheckboxCircleFill className='text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 '/> Jkafjals jfaskdasg .</span>
            <span className='flex gapx-x-3 text-[15px] mb-3'><RiCheckboxCircleFill className='text-[15px] min-w-[22px] h-[22px] pt-1 mr-2 '/> Jkafjals jfaskdasg kajsdg ioasdv ajhsdasj faksjd ahmgsdv asd.</span>
        </div>
        <button onClick={() => handleClick()} className={`${freePlan ? "bg-white text-emerald-800" : "bg-emerald-500 text-white"} w-full rounded-xl text-center py-3`} >Select plan</button>
    </div>
  )
}

export default CardSubscription