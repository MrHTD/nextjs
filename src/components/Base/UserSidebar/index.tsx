import { profileCardsData } from '@/constants/Data'
import React from 'react'
import Heading from '../Heading'
import Link from 'next/link'

export default function UserSidebar() {
    return (
        <div className='w-1/3 border border-gray-200 rounded-lg shadow-sm p-4 my-4 space-y-4'>
            <div className='space-y-4'>
                {profileCardsData.map((profile) => (
                    <>
                        <div className='flex flex-row space-x-4'>
                            <Heading level={5} className='whitespace-normal text-textsecondary'>Hello,</Heading>
                            <Heading level={6} className="whitespace-normal">{profile.name}</Heading>
                        </div>
                    </>
                ))}
                <div className='space-y-2'>
                    <Link href="/manage-my-account">
                        <Heading level={4} className='text-textsecondary'>Manage My Account</Heading>
                    </Link>
                    <Link href="/my-profile">
                        <Heading level={6} className='text-[#B7B7B7] font-normal'>My Profle</Heading>
                    </Link>
                    <Link href="/my-address">
                        <Heading level={6} className='text-[#B7B7B7] font-normal'>My Address</Heading>
                    </Link>
                    <Link href="/my-payment-options">
                        <Heading level={6} className='text-[#B7B7B7] font-normal'>My payment Options</Heading>
                    </Link>
                </div>
            </div>

            <div>
                <Heading level={4} className='text-textsecondary'>My Orders</Heading>
                <Link href="#">
                    <Heading level={6} className='text-[#B7B7B7] font-normal'>My Reviews</Heading>
                </Link>
            </div>
            <div>
                <Heading level={4} className='text-textsecondary'>My Wishlist & Followed Stores</Heading>
            </div>
        </div>
    )
}
