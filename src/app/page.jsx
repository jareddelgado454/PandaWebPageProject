import React from 'react';
import { AboutSection, BannerSection, FooterSection, ServiceSection, TeamSection } from '@/components/home';
import { FloatSidebar } from '@/components/home/FloatSidebar';
export default function Page() {
    return (
        <div className='flex-1 h-svh'>
            <FloatSidebar />
            <BannerSection />
            <AboutSection />
            <ServiceSection />
            <TeamSection />
            <FooterSection />
        </div>
    );
}
