import React from 'react'
import Heading from '../Base/Heading'
import { profileCardsData } from '@/constants/Data'

export default function MyAddressPage() {
    return (
        <div>
            <Heading level={1} className='text-textsecondary'>My Address</Heading>

            <div className='border border-gray-200 rounded-lg shadow-sm p-4 my-4'>
                <div className='grid grid-cols-1 md:grid-cols-4 my-6 gap-4'>
                    {profileCardsData.map((profile) => (
                        <>
                            <div className='col-span-1 space-y-4'>
                                <Heading level={5} className='text-textsecondary'>Full Name</Heading>
                                <Heading level={6} className="whitespace-normal">{profile.name}</Heading>
                            </div>
                            <div className='col-span-1 space-y-4'>
                                <Heading level={5} className='text-textsecondary'>Address</Heading>
                                <Heading level={6} className="whitespace-normal">{profile.address}</Heading>
                            </div>
                            <div className='col-span-1 space-y-4'>
                                <Heading level={5} className='text-textsecondary'>Postcode</Heading>
                                <Heading level={6} className="whitespace-normal">{profile.address}</Heading>
                            </div>
                            <div className='col-span-1 space-y-4'>
                                <Heading level={5} className='text-textsecondary'>Phone</Heading>
                                <Heading level={6} className="whitespace-normal">{profile.phone}</Heading>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}
