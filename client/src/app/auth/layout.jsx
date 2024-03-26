'use client';
import React, { useEffect } from 'react';
import { fetchUserAttributes } from "aws-amplify/auth";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import LandingNavBar from '@/components/LandingNavBar';
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
    <div className='h-full'>
      {children}
    </div>
  )
}

export default AuthLayout