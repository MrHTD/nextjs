import React from 'react'
import Sidebar from '@/components/Base/Sidebar'
import VendorReports from './reports'

export default function page() {
  return (
    <div className="flex flex-row justify-start bg-backgroundcolor">
      <Sidebar />
      <VendorReports />
    </div>
  )
}
