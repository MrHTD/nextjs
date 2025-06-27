import React from 'react'
import Heading from '../Base/Heading';
import DashboardLeftChart from '../DashboardLeftChart';
import ApprovalCard from '../ApprovalCard';
export default function AdminStatsCards() {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
                    <div className="flex justify-between items-end">
                        <div>
                            <Heading level={4} className="text-black font-medium">Pending Affiliates </Heading>
                            <Heading level={2} className="text-4xl sm:text-5xl font-normal mt-4 sm:mt-6">148</Heading>
                        </div>
                        <div className="flex items-center space-x-1 bottom-0">
                            <Heading level={5} className="bg-[#FF5228] text-white text-sm font-medium px-3 py-1 rounded-full">34</Heading>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
                    <div className="flex justify-between items-end">
                        <div>
                            <Heading level={4} className="text-black font-medium">Pending Affiliates </Heading>
                            <Heading level={2} className="text-4xl sm:text-5xl font-normal mt-4 sm:mt-6">148</Heading>
                        </div>
                        <div className="flex items-center space-x-1 bottom-0">
                            <Heading level={5} className="bg-[#FF5228] text-white text-sm font-medium px-3 py-1 rounded-full">34</Heading>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
                    <div className="flex justify-between items-end">
                        <div>
                            <Heading level={4} className="text-black font-medium">Pending Affiliates </Heading>
                            <Heading level={2} className="text-4xl sm:text-5xl font-normal mt-4 sm:mt-6">148</Heading>
                        </div>
                        <div className="flex items-center space-x-1 bottom-0">
                            <Heading level={5} className="bg-[#FF5228] text-white text-sm font-medium px-3 py-1 rounded-full">34</Heading>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-5">
                    <DashboardLeftChart />
                </div>

                <div className="lg:col-span-1 bg-white shadow-md rounded-lg p-5">
                    <ApprovalCard />
                </div>
            </div>

        </div>
    )
}