import React from 'react'
import Sidebar from '@/components/Base/Sidebar'
import Setting from './Setting'

export default function page() {
    return (
        <div className="flex flex-row justify-start bg-backgroundcolor">
            <Sidebar />
            <Setting />
        </div>
    )
}
