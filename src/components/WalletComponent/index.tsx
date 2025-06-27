'use client'
import React, { useState, useEffect } from "react";
import Heading from "../Base/Heading";
import BaseImage from "../Base/BaseImage";
import Button from "../Base/Button";
import { showNotification } from "@/utility/snackBar";
import { withdrawToStripe, getWallet } from "@/services/vendor";
import Input from "../Base/Input";
import moment from "moment";

interface Transaction {
    id: string;
    amount: number;
    type: string;
    status: string;
    created_at: string;
}

interface WalletData {
    id: string;
    user_id: string;
    available_balance: number;
    pending_balance: number;
    transactions: Transaction[];
}

const WalletComponent = () => {
    const [walletData, setWalletData] = useState<WalletData | null>(null);
    const [withdrawalAmount, setWithdrawalAmount] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchWalletData = async () => {
        try {
            const response = await getWallet();
            console.log("Wallet Data:", response.result);
            setWalletData(response.result);
        } catch (error: any) {
            showNotification("error", error?.message || "Failed to fetch wallet data");
        }
    };

    useEffect(() => {
        fetchWalletData();
    }, []);

    const handleWithdrawal = async () => {
        if (!withdrawalAmount || parseFloat(withdrawalAmount) <= 0) {
            showNotification("error", "Please enter a valid amount");
            return;
        }

        if (parseFloat(withdrawalAmount) > (walletData?.available_balance || 0)) {
            showNotification("error", "Withdrawal amount cannot exceed available balance");
            return;
        }

        setIsLoading(true);
        try {
            const response = await withdrawToStripe({ amount: parseFloat(withdrawalAmount) });
            showNotification("success", "Withdrawal request submitted successfully");
            setWithdrawalAmount("");
            fetchWalletData(); // Refresh wallet data after withdrawal
        } catch (error: any) {
            showNotification("error", error?.message || "Failed to process withdrawal");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="col-span-2 flex justify-between flex-row gap-3  p-3">
                <div className="flex flex-row justify-between gap-5">
                    <div className="space-y-6 bg-white p-4 rounded-md text-left">
                        <div className="flex flex-row justify-start items-center text-left gap-2">
                            <Heading level={5} className="text-sm font-normal text-left text-bg-gray-200">Available Balance</Heading>
                            <BaseImage
                                src="/assets/images/circlealert.png"
                                width={20}
                                height={8}
                                alt="Circle Alert"
                                className="flex-shrink-0"
                            />
                        </div>
                        <p className="text-textsecondary font-normal text-lg md:text-4xl">
                            $ {walletData?.available_balance || 0}
                        </p>
                    </div>
                    <div className="space-y-6 bg-white p-4 rounded-md text-left">
                        <div className="flex flex-row items-center gap-2 justify-start">
                            <Heading level={5} className="text-sm font-normal text-bg-gray-200">Pending Balance</Heading>
                            <BaseImage
                                src="/assets/images/circlealert.png"
                                width={20}
                                height={8}
                                alt="Circle Alert"
                                className="flex-shrink-0"
                            />
                        </div>
                        <p className="text-textsecondary font-normal text-lg md:text-4xl">
                            $ {walletData?.pending_balance || 0}
                        </p>
                    </div>
                </div>

                <div className="flex flex-row gap-4 w-[50%]">
                    <div className="col-span-1 space-y-6 bg-white p-4 rounded-md text-left w-full">
                        <Heading level={5} className="text-sm font-normal text-bg-gray-200 mb-4">Withdraw Funds</Heading>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <Input
                                    type="number"
                                    value={withdrawalAmount}
                                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                                    placeholder="Enter amount"
                                />
                            </div>
                            <Button
                                isPrimary
                                onClick={handleWithdrawal}
                                className="w-full rounded-md"
                            >
                                {isLoading ? "Processing..." : "Withdraw"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-span-2">
                <div className="bg-white p-4 rounded-md">
                    <Heading level={5} className="text-sm font-normal text-bg-gray-200 mb-4">Recent Transactions</Heading>
                    <div className="space-y-4">
                        {walletData?.transactions?.map((transaction) => (
                            <div key={transaction.id} className="flex justify-between items-center p-3 border-b border-gray-100">
                                <div>
                                    <p className="font-medium text-textsecondary">{transaction.type}</p>
                                    <p className="text-sm text-gray-500">{moment(transaction.created_at).format('YYYY-MM-DD hh:mm A')}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`font-medium ${transaction.type === 'debit' ? 'text-red-500' : 'text-green-500'}`}>
                                        {transaction.type === 'debit' ? '-' : '+'}${transaction.amount}
                                    </p>
                                    <p className="text-sm text-gray-500">{transaction.status}</p>
                                </div>
                            </div>
                        ))}
                        {(!walletData?.transactions || walletData.transactions.length === 0) && (
                            <p className="text-center text-gray-500">No transactions found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletComponent; 