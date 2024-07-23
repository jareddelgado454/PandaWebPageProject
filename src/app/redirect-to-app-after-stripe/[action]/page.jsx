"use client"

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const RedirectingToAppAfterStripe = () => {
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        const appRedirectSuccessUrl = "myapp://(auth)/(complete-information)";
        const appRedirectErrorUrl = "myapp://(auth)/(complete-information)/stripeaccount";

        window.location.href = params.action === "completed" ?  appRedirectSuccessUrl : appRedirectErrorUrl;

        setTimeout(() => {
            window.close();
        }, 3000); 
    }, []);

    return (
        <div className="w-full h-screen bg-zinc-900 text-white flex items-center justify-center">
            <img src="/loading/loading4.gif" className="w-[100px] h-[100px]" alt="Loading" />
        </div>
    );
};

export default RedirectingToAppAfterStripe;