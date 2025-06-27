import React from 'react'
import Heading from '../Base/Heading'
import { profileCardsData } from '@/constants/Data'

export default function MyProfilePage() {
    return (
        <div className='w-full'>
            <Heading level={1} className='text-textsecondary'>My Profile</Heading>
            <div className='border border-gray-200 rounded-lg shadow-sm p-4 my-4'>
                <div className='grid grid-cols-1 md:grid-cols-3 my-6 gap-4'>
                    {profileCardsData.map((profile) => (
                        <>
                            <div className='col-span-1 space-y-4'>
                                <Heading level={5} className='text-textsecondary'>Full Name</Heading>
                                <Heading level={6} className="whitespace-normal">{profile.name}</Heading>
                            </div>
                            <div className='col-span-1 space-y-4'>
                                <Heading level={5} className='text-textsecondary'>Email</Heading>
                                <Heading level={6} className="whitespace-normal">{profile.email}</Heading>
                            </div>
                            <div className='col-span-1 space-y-4'>
                                <Heading level={5} className='text-textsecondary'>Mobile</Heading>
                                <Heading level={6} className="whitespace-normal">{profile.phone}</Heading>
                            </div>
                        </>
                    ))}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 my-6 gap-4'>
                    {profileCardsData.map((profile) => (
                        <>
                            <div className='col-span-1 space-y-4'>
                                <Heading level={5} className='text-textsecondary'>Birthday</Heading>
                                <Heading level={6} className="whitespace-normal">{profile.birthday}</Heading>
                            </div>
                            <div className='col-span-1 space-y-4'>
                                <Heading level={5} className='text-textsecondary'>Gender</Heading>
                                <Heading level={6} className="whitespace-normal">{profile.Gender}</Heading>
                            </div>
                            <div className='col-span-1'>

                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}
