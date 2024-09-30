import React from 'react'
import { BannerCustomerSection, DownloadCustomerSection } from '@/components/home'

export default function customer() {
  return (
    <div className='flex-1 flex-col  relative overflow-hidden' style={{ background: 'radial-gradient(circle, rgba(39,39,42,1) 4%, rgba(9,9,11,1) 100%)' }}>
      <BannerCustomerSection />
      <DownloadCustomerSection />
    </div>
  )
}
