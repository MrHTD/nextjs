import React from 'react'
import Heading from '@/components/Base/Heading'
import Container from '@/components/Base/Container'
import VendorReportsPage from '@/components/VendorReportsPage'

export default function VendorReports() {
    return (
        <Container>
            <div className="flex flex-col pt-5 mt-10 md:mt-0">
                <Heading level={1} className="text-textsecondary mb-4">
                    Vendor reports
                </Heading>
                <VendorReportsPage />
            </div>
        </Container>
    )
}

