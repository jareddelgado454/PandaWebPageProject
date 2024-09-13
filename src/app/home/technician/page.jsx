import React from 'react'
import { BannerTechnicianSection, DownloadTechnicianSection } from '@/components/home'

export default function page() {
  return (
    <div className='flex-1 p-5 relative overflow-hidden' style={{ background: 'radial-gradient(circle, rgba(39,39,42,1) 4%, rgba(9,9,11,1) 100%)' }}>
        <BannerTechnicianSection />
        <DownloadTechnicianSection />
    </div>
  )
}
