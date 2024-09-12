import React from 'react'
import { FooterSection } from '@/components/home'

export default function layout({ children }) {
  return (
    <div>
        {children}
        <FooterSection />
    </div>
  )
}
