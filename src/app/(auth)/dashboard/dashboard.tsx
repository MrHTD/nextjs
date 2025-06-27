import React from 'react'
import Heading from '@/components/Base/Heading'
import Container from '@/components/Base/Container'
import VendorDashboardPage from '@/components/VendorDashboard'

export default function VendorDashboard() {
    return (
        <Container>
            <div className="flex flex-col pt-5 mt-10 md:mt-0">
                <Heading level={1} className="text-textsecondary mb-6">
                    Vendor dashboard
                </Heading>
                <VendorDashboardPage />
            </div>
        </Container>
    )
}

