import React from 'react'
import Heading from '../Base/Heading'
import BaseImage from '../Base/BaseImage'
import { RecentOrdersTable } from '@/constants/Data'

export default function ToRecevive() {
    return (
        <div className="w-full">
            <div className="border rounded-lg shadow-sm p-4">
                <Heading level={3} className="text-textsecondary mb-4">To Receive</Heading>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="border-b-2 border-primary">
                                <th className="p-3 text-left font-normal">Products</th>
                                <th className="p-3 text-left font-normal">Bought On</th>
                                <th className="p-3 text-left font-normal">Unit Price</th>
                                <th className="p-3 text-left font-normal">Order ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RecentOrdersTable.map((RecentOrdersTable, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-3 flex items-center">
                                        <div className='flex flex-row space-x-3'>
                                            <div className='bg-gray-200 p-2 rounded-lg'>
                                                <BaseImage
                                                    src={RecentOrdersTable.orderimg}
                                                    alt="Category Img 3"
                                                    width={40}
                                                    height={40}
                                                    className="col-span-1"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium">{RecentOrdersTable.product}</p>
                                                <p className="text-gray-500 text-sm">Color: {RecentOrdersTable.color}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3">{RecentOrdersTable.boughtOn}</td>
                                    <td className="p-3">$ {RecentOrdersTable.price}</td>
                                    <td className="p-3">{RecentOrdersTable.orderId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
}
