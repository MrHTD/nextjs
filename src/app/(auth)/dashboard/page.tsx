import React from 'react'
import Sidebar from '@/components/Base/Sidebar'
import VendorDashboard from './dashboard'

export default function page() {
  return (
    <div className="flex flex-row justify-start bg-backgroundcolor">
      <Sidebar />
      <VendorDashboard />
    </div>
  )
}
