import React from 'react'
import BaseImage from '../Base/BaseImage'
import Heading from '../Base/Heading'
import Button from '../Base/Button'

export default function SettingPage() {
    return (
        <div>
            <div className='mb-5'>
                <div className="bg-[#FFE3A3] p-4 rounded-md flex flex-col md:flex-row items-center gap-2 my-10">
                    <BaseImage
                        src="/assets/images/circlealert.png"
                        width={25}
                        height={12}
                        alt="Circle Alert"
                        className="flex-shrink-0"
                    />
                    <p className="text-center md:text-left text-sm md:text-base">
                        To withdraw earnings, please update your tax information. For more
                        details, read our FAQs.
                    </p>
                </div>
                <div className="border border-[primary] p-4 space-y-5 rounded-md flex flex-col items-center  justify-center">
                    <Heading
                        level={3}
                        className="text-center whitespace-pre-line text-textsecondary"
                    >
                        To withdraw earnings, first you need to set up a withdrawal method.
                    </Heading>
                    <p className="text-center text-paracolor font-medium text-sm md:text-base">
                        It may take up to 3 days to activate your withdrawal method
                    </p>
                    <Button isPrimary title="Add a Method" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2 rounded-md">
                <div className="col-span-1 bg-white p-4 rounded-md text-left space-y-4">
                    <Heading level={3} className="text-textsecondary">
                        Withdrawal schedule
                    </Heading>
                    <p className="text-paracolor text-sm">
                        You haven&apost set up a schedule yet. You&aposll be able to set it
                        up once you've added a withdrawal method.
                    </p>
                </div>
                <div className="col-span-1 bg-white p-4 rounded-md text-left space-y-4">
                    <Heading level={3} className="text-textsecondary">
                        Last withdrawal
                    </Heading>
                    <p className="text-paracolor text-sm">
                        You haven't set up a schedule yet. You'll be able to set it up once
                        you've added a withdrawal method.
                    </p>
                </div>
            </div>
            <div className="mt-5 grid-cols-1 bg-white rounded-md flex-row md:flex justify-between items-center p-4">
                <div>
                    <Heading level={3} className="text-textsecondary mb-2">
                        Withdrawal methods
                    </Heading>
                    <p className="text-paracolor text-sm mb-2">
                        You haven't set up any withdrawal methods yet.
                    </p>
                </div>
                <Button isPrimary title="Add a Method" />
            </div>
        </div>
    )
}
