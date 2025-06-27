import Button from '@/components/Base/Button';
import React from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { twMerge } from 'tailwind-merge'; // Changed to twMerge

const AccountConnectedSuccess = () => {
    return (
        <div
            className="min-h-screen bg-gray-100 flex items-center justify-center p-4"
        >
            <div
                className={twMerge( // Changed to twMerge
                    "bg-white text-gray-900 rounded-xl  p-8 w-full max-w-md",
                    "space-y-6 text-center",
                    "border border-gray-200"
                )}
            >
                <BiCheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-semibold text-green-600">Account Connected!</h1>
                <p className="text-gray-500">
                    Your Stripe account has been successfully connected. You can now start
                    receiving payments.
                </p>
                <Button
                    className={twMerge( // Changed to twMerge
                        "w-full bg-green-500 text-white hover:bg-green-600",
                        "transition-colors duration-200",
                        "shadow-md hover:shadow-lg",
                        "flex items-center justify-center gap-2"
                    )}
                >
                    <a href="/dashboard" className='flex flex-row items-center gap-2'>
                        Go to Dashboard <BsArrowRight className="h-4 w-4" />
                    </a>
                </Button>
                <p className="text-xs text-gray-400 mt-4">
                    You will be redirected to your dashboard. If not, click the button above.
                </p>
            </div>
        </div>
    );
};

export default AccountConnectedSuccess;
