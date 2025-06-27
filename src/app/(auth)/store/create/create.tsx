import React from 'react'
import AuthLeftSide from '@/components/AuthLeftSide'
import Heading from '@/components/Base/Heading'
import Button from '@/components/Base/Button'
import Container from '@/components/Base/Container'
import Link from 'next/link'

export default function CreateStore() {
    return (
        <div className="min-h-screen grid grid-cols-1 w-full md:grid-cols-2">
            <div className="bg-primary flex flex-col items-center justify-center relative overflow-hidden p-8">
                <AuthLeftSide />
            </div>
            <div className="flex flex-col items-center justify-center p-8 gap-6">
                <Container>
                    <Heading level={1} className='whitespace-normal text-textsecondary font-normal text-lg md:text-4xl'>Select Your Store <br />
                        Type</Heading>

                    <div className='flex flex-col md:flex-row gap-4 mt-10'>
                        <Link href="/store/create/external-store">
                            <Button
                                title='External Store'
                                className='px-12'
                            />
                        </Link>
                        <Link href="/store/create/internal-store">
                            <Button
                                title='Internal Store'
                                className='px-12'
                                isPrimary
                            />
                        </Link>
                    </div>
                </Container>
            </div >
        </div >
    )
}
