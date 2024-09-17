import React from 'react'
import { AboutGenerativeSection, BannerGenerativeSection, TestimonialsGenerativeSection } from '@/components/home'
export default function page() {
  return (
    <div>
      <BannerGenerativeSection />
      <AboutGenerativeSection />
      <TestimonialsGenerativeSection />
    </div>
  )
}