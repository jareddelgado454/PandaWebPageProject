'use client';
import React, { useEffect } from 'react';
import { fetchUserAttributes } from "aws-amplify/auth";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
const AuthLayout = ({children}) => {
  const searchParams = useSearchParams();
  const isAdded = searchParams.has('code')
  const router = useRouter();
  useEffect(() => {
    const retrieveInfoFromSession = async () => {
      try {
        const info = await fetchUserAttributes();
        if (info) {
          const isAdmin = info['custom:role'] === "admin";
          if (isAdmin) {
            router.replace("/admin-dashboard/");
          } else {
            router.replace("/user/");
          }
        } else {
          router.replace("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if(!isAdded){
      retrieveInfoFromSession();
    }
  }, []);
  return (
    <div className='w-full h-screen bg-zinc-800 relative overflow-hidden'>
        <nav className='top-0 w-full p-3 py-4 flex justify-between z-40'>
            <div className="flex gap-x-2 items-center">
                <img src="/panda.png" className="w-[4rem] h-[3rem] drop-shadow-lg" alt="panda_logo" />
                <p className="font-bold drop-shadow-xl tracking-wider text-white">Panda CMS</p> 
            </div>
            <div className='flex items-center justify-around gap-x-4'>
              <Link href="/auth/signin" className='px-5 py-1 font-semibold border-[2px] rounded-lg text-emerald-300 border-emerald-500 bg-transparent text-[18px] hover:bg-emerald-300 hover:border-emerald-300 hover:text-zinc-950 transition delay-50'>
                  Log In 
              </Link>   

              <Link href="/auth/signup" className='px-5 py-1 font-semibold border-[2px] rounded-lg text-white border-emerald-500 bg-emerald-500 text-[18px] hover:bg-emerald-300 hover:border-emerald-300 hover:text-zinc-950 transition delay-50'>
                  Sign Up 
              </Link>  
            </div>    
        </nav>
        {children}
    </div>
  )
}

export default AuthLayout