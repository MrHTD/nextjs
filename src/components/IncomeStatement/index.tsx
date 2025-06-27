"use client";
import React, { useEffect, useState } from 'react'
import Heading from '../Base/Heading'
import CalendarInput from '../CalendarInput'
import Dropdown from '../Base/Dropdown';
import Input from '../Base/Input';
import { getStatments } from '@/services/vendor';
import { Option } from '@/constants/Types';
import { IncomeStatementData } from '@/constants/Data';
import AutoCompleteDropdown from '../Base/AutoCompleteDropdown';

const options = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
];
const regions = [
    { label: "Pakistan", value: "Pakistan" },
    { label: "USA", value: "USA" },
    { label: "Canada", value: "Canada" },
];

export default function IncomeStatement() {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [selectedregions, setregionsOption] = useState<Option | null>(null);
    const [statmentData, setstatmentData] = useState<any>([]);

    const getStatmentsHandle = async () => {
        try {
            const response = await getStatments();
            console.log("get Orders Response:", response);
            setstatmentData(response?.result);
        }
        catch (error: any) {
            console.error("get Orders Error:", error?.data.error || error.message);
            throw error;
        }
    }
    useEffect(() => {
        getStatmentsHandle()
    }, [])

    return (
        <div className='border border-gray-200 shadow-lg bg-white rounded-lg w-full'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>

                <div className='col-span-1'>
                    <Heading level={5} className="whitespace-normal text-textcolor">
                        Order creation date
                    </Heading>
                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center align-middle">
                        <CalendarInput
                            className="w-full"
                        />
                        <CalendarInput
                            className="w-full"
                        />
                    </div>
                </div>
                <div className='col-span-1'>
                    <Heading level={5} className="whitespace-normal text-textcolor">
                        Release
                    </Heading>
                    <AutoCompleteDropdown
                        options={options}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        placeholder="Select Region"
                    />
                </div>
            </div>

            <div className='grid grid-cols-2 p-6'>
                <div className='col-span-1'>
                    <Input
                        prefixIcon="/assets/images/search.png"
                    />
                </div>
                <div className='col-span-1'></div>
            </div>
            {/* table data open */}

            <div className="p-6">
                <table className="w-full text-left table-auto border-collapse">
                    <thead>
                        <tr className="border-b border-gray-300 flex flex-wrap">
                            <th className="p-4 text-xs font-medium text-gray-600">Statemnet Number</th>
                            <th className="p-4 text-xs font-medium text-gray-600">Statement Period</th>
                            <th className="p-4 text-xs font-medium text-gray-600">Released Amount</th>
                            <th className="p-4 text-xs font-medium text-gray-600">Released Status</th>
                            <th className="p-4 text-xs font-medium text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statmentData.lenght ?
                                statmentData.map((statment: any) => (
                                    <tr
                                        key={statment.id + statment.date}
                                        className="border-b border-gray-200">
                                        <td className="p-4">
                                            <p className="text-xs text-gray-500">
                                                Order Number: {statment.id}
                                            </p>
                                        </td>
                                        <td className="p-4 text-xs text-gray-600">{statment.date}</td>
                                        <td className="p-4 text-xs text-gray-600">{statment.status}</td>
                                        <td className="text-xs text-gray-600">
                                            <div className='flex justify-center items-center bg-primary text-white rounded-full px-4 py-1'>
                                                <p>$ {statment.amount}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-xs text-gray-600">
                                            <p>Veiw Order Details</p>
                                            <AutoCompleteDropdown
                                                className='border-none text-textsecondary'
                                                options={regions}
                                                selectedOption={selectedregions}
                                                setSelectedOption={setregionsOption}
                                                placeholder="Select Region"
                                            />
                                        </td>
                                    </tr>
                                ))
                            : <p className='text-center my-4 w-full flex items-center'>No Data Found</p>
                        }
                    </tbody>
                </table>
            </div>

            {/* table data close */}


        </div>
    )
}
