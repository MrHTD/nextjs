import React from 'react';
import BaseImage from '../Base/BaseImage';
import Heading from "../Base/Heading";
import Button from "../Base/Button";
import { ManageAffiliateData } from "@/constants/Data";

export default function AffiliateDetailPage() {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md pb-40 mt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center mb-6 gap-3">
                <div className="flex flex-col md:flex-row items-center">
                    <div className='bg-primary rounded-full pb-1 p-4'>
                        <BaseImage
                            src={ManageAffiliateData[0].imagesrc}
                            alt="Company Logo"
                            className="rounded-full object-cover"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="ml-4">
                        <Heading level={2} className="text-textsecondary font-normal">
                            {ManageAffiliateData[0].storeName}
                        </Heading>
                    </div>
                </div>
                <div className='col-span-1'></div>
                <div className="grid grid-cols-1 justify-center items-center md:grid-cols-2 gap-2 col-span-1 sm:justify-center">
                    <div className="col-span-1">
                        <Button
                            title="Approve"
                            isPrimary
                            className="w-full border-none"
                        />
                    </div>
                    <div className="col-span-1">
                        <Button
                            title="Reject"
                            className="bg-buttoncolor text-white border-none w-full hover:bg-bg-buttoncolor "
                            isPrimary
                        />
                    </div>
                </div>
                <div className="mt-6 mb-4">
                    <Heading level={6} className="text-base ">
                        {ManageAffiliateData[0].vendorName}
                    </Heading>
                    <p className="text-sm text-gray-600">
                        Category: {ManageAffiliateData[0].Category}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className='space-y-6'>
                    <p className="text-black md:text-base text-xs font-normal">
                        Email:{ManageAffiliateData[0].Email}
                    </p>
                    <p className="text-black md:text-base text-xs font-normal mt-2">
                        Phone Number:{ManageAffiliateData[0].Phone}
                    </p>
                </div>
                <div className='space-y-6'>
                    <p className="text-black md:text-base text-xs font-normal">
                        Email:{ManageAffiliateData[0].Email}
                    </p>
                    <p className="text-black font-normal md:text-base text-xs mt-2">
                        Phone Number:{ManageAffiliateData[0].Phone}
                    </p>
                </div>
            </div>
        </div>
    );
}
