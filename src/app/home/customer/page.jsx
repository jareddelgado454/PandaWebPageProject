import React from 'react'
import { BannerCustomerSection, DownloadCustomerSection, FooterSection } from '@/components/home'
import BannerLast from '@/components/home/customer/BannerLast'
import DescriptionCustomer from '@/components/home/customer/DescriptionCustomer'
import HowToUseCustomer from '@/components/home/customer/HowToUseCustomer'

export default function customer() {
  return (
    <div className='flex-1 h-svh bg-darkBlack' >
      {/* <BannerCustomerSection /> */}
      <BannerLast />
      <DescriptionCustomer />
      <HowToUseCustomer />
      <DownloadCustomerSection />
      <FooterSection />
    </div>
  )
}
