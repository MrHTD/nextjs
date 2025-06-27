import React from 'react'
import Heading from '../Base/Heading'
import { profileCardsData } from '@/constants/Data'

export default function MyPaymentOptionsPage() {
    return (
        <div className='w-full'>
            <Heading level={1} className='text-textsecondary'>My Payment Options</Heading>
            <div className='border border-gray-200 rounded-lg shadow-sm p-4 my-4'>
                <div className='grid grid-cols-1 md:grid-cols-3 my-6 gap-4'>
                    {profileCardsData.map((profile) => (
                        <>
                            <div className='col-span-1 space-y-4'>
                                <Heading level={5} className='text-textsecondary'>Type</Heading>
                                <Heading level={4} className="whitespace-normal text-[#222357]">{profile.CardType}</Heading>
                            </div>
                            <div className='col-span-1 space-y-4'>
                                <Heading level={5} className='text-textsecondary'>Card Number</Heading>
                                <Heading level={6} className="whitespace-normal">{profile.CardNumber}</Heading>
                            </div>
                            <div className='col-span-1 space-y-4'>
                                <Heading level={5} className='text-textsecondary'>Expiry Date</Heading>
                                <Heading level={6} className="whitespace-normal">{profile.cardExpiry}</Heading>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}
