import React from 'react'
import Heading from '../Base/Heading'
import { profileCardsData, RecentOrdersTable } from '@/constants/Data'
import Button from '../Base/Button'

export default function ManageMyAccountPage() {
    return (
        <div className="w-full">
            <Heading level={1} className='text-textsecondary'>Manage My Account</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Personal Profile Card */}
                {profileCardsData.map((profile) => (
                    <>

                        <div className="col-span-1 my-6">
                            <div className="bg-white h-full space-y-7 p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
                                <Heading level={4} className="text-textsecondary">Personal Profile</Heading>
                                <div>
                                    <Heading level={6} className="whitespace-normal">{profile.name}</Heading>
                                    <Heading level={6} className="whitespace-normal">{profile.email}</Heading>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 my-6">
                            <div className="bg-white h-full space-y-7 p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
                                <Heading level={4} className="text-textsecondary">Address Book</Heading>
                                <div>
                                    <Heading level={6} className="whitespace-normal text-primary">DEFAULT SHIPPING ADDRESS</Heading>
                                </div>
                                <div>
                                    <Heading level={6} className="whitespace-normal">Maaz</Heading>
                                    <Heading level={6} className="whitespace-normal">{profile.address}</Heading>
                                    <Heading level={6} className="whitespace-normal">{profile.phone}</Heading>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 my-6">
                            <div className="bg-white h-full space-y-7 p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
                                <div>
                                </div>
                                <div>
                                    <Heading level={6} className="whitespace-normal text-primary">DEFAULT BILLING ADDRESS</Heading>
                                </div>
                                <div>
                                    <Heading level={6} className="whitespace-normal">Maaz</Heading>
                                    <Heading level={6} className="whitespace-normal">{profile.address}</Heading>
                                    <Heading level={6} className="whitespace-normal">{profile.phone}</Heading>
                                </div>
                            </div>
                        </div>
                    </>

                ))}
            </div>




            <div className="border rounded-lg shadow-sm p-4">
                <Heading level={3} className="text-textsecondary mb-4">Recent Orders</Heading>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="border-b-2 border-primary">
                                <th className="p-3 text-left font-normal">Products</th>
                                <th className="p-3 text-left font-normal">Bought On</th>
                                <th className="p-3 text-left font-normal">Unit Price</th>
                                <th className="p-3 text-left font-normal">Order ID</th>
                                <th className="p-3 text-left font-normal">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RecentOrdersTable.map((RecentOrdersTable, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-3 flex items-center">
                                        <input type="checkbox" className="mr-3" />
                                        <div>
                                            <p className="font-medium">{RecentOrdersTable.product}</p>
                                            <p className="text-gray-500 text-sm">Color: {RecentOrdersTable.color}</p>
                                        </div>
                                    </td>
                                    <td className="p-3">{RecentOrdersTable.boughtOn}</td>
                                    <td className="p-3">$ {RecentOrdersTable.price}</td>
                                    <td className="p-3">{RecentOrdersTable.orderId}</td>
                                    <td className="p-3">
                                        <Button
                                            title="Manage"
                                            isPrimary
                                            className="font-normal"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
}
