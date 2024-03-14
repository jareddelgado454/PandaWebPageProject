"use client";
import { sessionsStatus, isAdmin } from '@/utils/session';
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function AuthGuard(Component) {

  return function WithAuth(props) {

      useEffect(() => {
        const session = sessionsStatus;
        const admin = isAdmin;
    
        if (!session || !admin) {
          redirect("/");
        }
      }, []);

      if(!sessionsStatus && !isAdmin) {
        return null;
      }

      return <Component {...props} />
  };

};