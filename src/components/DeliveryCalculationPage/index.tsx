"use client";
import React, { useRef, useState } from 'react'
import BaseImage from '@/components/Base/BaseImage'
import Heading from '@/components/Base/Heading'
import Input from '@/components/Base/Input'
import CountryDropdown from '../Countrydropdown'
import DeliveryCalculationModal from '../DeliveryCalculationModal';
import RadioButtonLanguage from '../RadioButtonLanguage';
import { CiCircleQuestion } from 'react-icons/ci'
import { Country } from '@/constants/Types'
import Image from 'next/image';

const countryData = [
    { name: "Pakistan", code: "92", flag: "/assets/icons/countryflags/pak.png" },
    {
        name: "United States",
        code: "1",
        flag: "/assets/icons/countryflags/usa.png",
    },
    {
        name: "United Kingdom",
        code: "44",
        flag: "/assets/icons/countryflags/brit.png",
    },
];

export default function DeliveryCalculationPage() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [galleryFileUrls, setGalleryFileUrls] = useState<string[]>([]);
    const [selectedModalValues, setSelectedModalValues] = useState<string>('');
    const galleryHiddenFileInput = useRef<HTMLInputElement>(null);

    const handleFileInputClick = (
        inputRef: React.RefObject<HTMLInputElement>
    ) => {
        inputRef.current?.click();
    };

    const handleGalleryRemove = (index: number) => {
        setGalleryFileUrls((prev) => prev.filter((_, i) => i !== index));
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const filesArray = Array.from(files);
            filesArray.forEach((file) => {
                const url = URL.createObjectURL(file);
                setGalleryFileUrls((prev) => [...prev, url]);
            });
        }
    };

    return (
        <div className='w-full'>
            <div className='grid grid-cols-1 lg:grid-cols-3 w-full gap-4 mt-16 justify-center text-center items-center'>
                <div className='col-span-1 lg:w-3/4 w-full flex flex-col space-y-6 justify-center text-center items-center'>
                    <BaseImage
                        src="/assets/images/Deliveryprocess1.png"
                        height={60}
                        width={60}
                        alt='Delivery Process 1'
                    />
                    <Heading level={4} className='whitespace-normal text-textsecondary font-normal'>Create an inquiry in 3-5
                        minutes by filling out the form
                        below</Heading>
                </div>
                <div className='col-span-1 lg:w-3/4 w-full flex flex-col gap-4 justify-center text-center items-center'>
                    <BaseImage
                        src="/assets/images/Deliveryprocess2.png"
                        height={60}
                        width={60}
                        alt='Delivery Process 1'
                    />
                    <Heading level={4} className='whitespace-normal text-textsecondary font-normal'>Suppliers receive your inquiry
                        and will send you their proposals</Heading>
                </div>
                <div className='col-span-1 lg:w-3/4 w-full flex flex-col space-y-6 justify-center text-center items-center'>
                    <BaseImage
                        src="/assets/images/Deliveryprocess3.png"
                        height={60}
                        width={60}
                        alt='Delivery Process 1'
                    />
                    <Heading level={4} className='whitespace-normal text-textsecondary font-normal'>You Choose the best price and
                        conditions to yourself</Heading>
                </div>
            </div>
            <div className='mt-16 space-y-3'>
                <div className='flex flex-col md:flex-row justify-center items-center gap-2'>
                    <Heading level={5} className='whitespace-normal text-textcolor'>Make a detailed description of the characteristics of the products you are looking for.</Heading>
                    <CiCircleQuestion size={24} className='black' />
                </div>
                <textarea
                    placeholder="Inform suppliers of your detailed requirements. You can list: color, size, material, etc."
                    className="w-full border border-[#ACACAC] focus:outline-primary rounded-md p-3 h-24 mb-4 resize-none"
                ></textarea>
                <div className='gap-2 w-full justify-start items-start '>
                    <RadioButtonLanguage />
                </div>
                <div className='mt-16'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 justify-start items-start mt-6 gap-10'>
                        <div className='col-span-1'>
                            <Input
                                type='text'
                                label='Enter your full name'
                                placeholder='Name'
                                labelClassName="text-[1rem] text-textcolor"
                                required
                            />
                        </div>
                        <div className='col-span-1'>
                            <Input
                                type='text'
                                label='City (Select from the list)'
                                prefixIcon="/assets/images/search.png"
                                placeholder="Enter the city"
                                labelClassName="text-[1rem] items-start text-textcolor"
                                required
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 mt-6 gap-10'>
                        <div className='col-span-1'>
                            <Input
                                type='email'
                                label='E-mail address'
                                placeholder='abc@mail.com'
                                labelClassName="text-[1rem] text-textcolor"
                                required
                            />
                        </div>
                        <div className='col-span-1 space-y-2'>
                            <Heading level={5} className='text-textcolor'>Phone number</Heading>
                            <CountryDropdown
                                countryList={countryData}
                                selectedCountry={selectedCountry}
                                setSelectedCountry={setSelectedCountry}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-center items-center align-middle mt-16'>
                    <div className='w-full'>
                        <div className='flex flex-row gap-2 mb-10'>
                            <Image
                                src="/assets/images/clicknow.png"
                                height={40}
                                width={45}
                                alt='Click Now'
                                className='cursor-pointer'
                                onClick={() => { console.log("Pressed"); setIsModalOpen(true) }}
                            />
                            {isModalOpen && (
                                <DeliveryCalculationModal onClose={() => setIsModalOpen(false)} onSubmit={setSelectedModalValues} />
                            )}
                            <Input
                                value={selectedModalValues}
                                type='text'
                            />
                        </div>
                        <Heading level={5} className="font-normal text-start mb-4 whitespace-normal text-textsecondary">
                            Attach images/documents, this will help suppliers to better understand
                            your requirements
                        </Heading>
                        <div className="w-full text-center md:text-start space-y-7 mb-10">
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 w-full gap-4">
                                    {galleryFileUrls.map((url, index) => (
                                        <div
                                            key={index}
                                            className="border-dashed border-4 border-primary p-2 rounded-lg w-full flex justify-center items-center relative group"
                                            style={{
                                                position: "relative",
                                                aspectRatio: "1/1",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <BaseImage
                                                src={url}
                                                alt={`Uploaded Pic ${index + 1}`}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                            <button
                                                onClick={() => handleGalleryRemove(index)}
                                                className="absolute top-1 right-1 bg-white text-secondary rounded-full hidden group-hover:block"
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    fontSize: "20px",
                                                    lineHeight: "1",
                                                    paddingBottom: 7,
                                                }}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => handleFileInputClick(galleryHiddenFileInput)}
                                        className="border-dashed border-4 border-primary p-2 rounded-lg flex justify-center items-center text-gray-500"
                                        style={{ aspectRatio: "1/1" }}
                                    >
                                        <span className="text-3xl text-primary">+</span>
                                    </button>
                                    <input
                                        type="file"
                                        ref={galleryHiddenFileInput}
                                        onChange={(e) => handleFileChange(e)}
                                        style={{ display: "none" }}
                                        accept="image/*"
                                        multiple
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4 gap-2">
                            <div className='gap-2 space-x-3'>
                                <input type="checkbox" className="mt-1 w-4 h-4 bg-primary text-primary rounded-full p-2 accent-primary marker:text-white" required defaultChecked={true} />
                                <label className="text-sm text-textsecondary font-normal">
                                    Make deals safe & guaranteed
                                </label>
                            </div>
                            <div className='gap-2 space-x-3'>
                                <input type="checkbox" className=" w-4 h-4 bg-primary text-primary rounded-full p-2 accent-primary marker:text-white" required defaultChecked={true} />
                                <label className="text-sm text-textsecondary font-normal">
                                    I agree with user agreement and the Privacy Policy
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
