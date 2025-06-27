import React from 'react'
import Container from '@/components/Base/Container'
import Heading from '@/components/Base/Heading'
import SettingPage from '@/components/SettingPage/SettingPage'

export default function Setting() {
    return (
        <div>
            <Container className='my-6'>
                <div className="flex flex-col pt-5 mt-10 md:mt-0">
                    <Heading level={1} className="text-textsecondary mb-4">
                        Settings
                    </Heading>
                    <SettingPage />
                </div>
            </Container>
        </div>
    )
}
