import React from 'react'
import { BannerCustomerSection, DownloadCustomerSection, FooterSection } from '@/components/home'
import BannerLastTechnician from '@/components/home/technician/BannerLastTechnician'
import DescriptionTechnician from '@/components/home/technician/DescriptionTechnician'
import HowToUseTechnician from '@/components/home/technician/HowToUseTechnician'
import DownloadTechnician from '@/components/home/technician/Download'

export default function page() {
  return (
    <div className='flex-1 h-svh bg-darkBlack' >
        <BannerLastTechnician />
        <DescriptionTechnician />
        <HowToUseTechnician />
        <DownloadTechnician />
        <FooterSection />
    </div>
  )
}
