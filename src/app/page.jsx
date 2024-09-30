'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { HotKeys } from 'react-hotkeys';
import { AboutSection, BannerSection, FooterSection, ServiceSection, TeamSection } from '@/components/home';
import { FloatSidebar } from '@/components/home/FloatSidebar';
import AskedQuestion from '@/components/home/sections/AskedQuestion';
export default function Page() {
    const router = useRouter();
    const redirectToAdmin = () => {
        router.push('/auth/signin');
    };
    const keyMap = {
        REDIRECT_TO_ADMIN: 'Control+Alt+a',
    };

    const handlers = {
        REDIRECT_TO_ADMIN: (event) => {
            event.preventDefault();
            redirectToAdmin();
        },
    };
    return (
        <HotKeys keyMap={keyMap} handlers={handlers} >
            <div className='flex-1 h-svh bg-darkBlack'>
                <FloatSidebar />
                <BannerSection />
                <AboutSection />
                <ServiceSection />
                <TeamSection />
                <AskedQuestion />
                <FooterSection />
            </div>
        </HotKeys>
    );
}
