"use client";
import React, { useState, ChangeEvent } from "react";
import BaseImage from "@/components/Base/BaseImage";
import Container from "@/components/Base/Container";
import Heading from "@/components/Base/Heading";
import Input from "@/components/Base/Input";
import Button from "@/components/Base/Button";
import Link from "next/link";

export default function ExternalStore() {
    const [coverImage, setCoverImage] = useState("/assets/images/shop-banner.png");
    const [profileImage, setProfileImage] = useState("/assets/images/placeholder.png");
    const [shopName, setShopName] = useState("iTech");
    const [isEditingName, setIsEditingName] = useState(false);

    const handleCoverImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCoverImage(imageUrl);
        }
    };

    const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setShopName(event.target.value);
    };

    const toggleEditName = () => {
        setIsEditingName(!isEditingName);
    };

    return (
        <div className="mt-8">
            <div
                className="grid justify-center h-[250px] md:h-[350px] relative"
                style={{
                    backgroundImage: `url(${coverImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute bottom-4 right-4">
                    <div className="flex flex-row gap-2 cursor-pointer rounded shadow items-center align-middle bg-[#d9d9d99d] p-2">
                        <BaseImage
                            src="/assets/images/camera.png"
                            height={30}
                            width={30}
                            alt="camera"
                        />
                        <label htmlFor="coverImageUpload" className="text-white">
                            Change Cover
                        </label>
                    </div>
                    <input
                        id="coverImageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="hidden"
                    />
                </div>

                <div className="absolute -bottom-1/4 md:-bottom-1/3 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row items-center gap-4">
                    <div
                        className="rounded-full flex-row items-center gap-4 w-full sm:w-auto"
                        style={{ maxWidth: "100%", height: "auto" }}
                    >
                        <div className="relative">
                            <BaseImage
                                src={profileImage}
                                height={150}
                                width={150}
                                alt="Profile-Pic"
                                className="rounded-full border-2 border-primary object-cover"
                            />
                            <label htmlFor="profileImageUpload">
                                <div className="absolute bottom-2 right-2 cursor-pointer bg-white p-1 rounded-full shadow">
                                    <BaseImage
                                        src="/assets/images/camera.png"
                                        height={20}
                                        width={20}
                                        alt="Edit Profile"
                                    />
                                </div>
                            </label>
                            <input
                                id="profileImageUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleProfileImageChange}
                                className="hidden"
                            />
                        </div>
                        <div className="flex flex-col mt-2 items-center text-center">
                            {!isEditingName ? (
                                <div className="flex items-center gap-2">
                                    <Heading level={1} className="text-sm md:text-lg">
                                        {shopName}
                                    </Heading>
                                    <button onClick={toggleEditName}>
                                        <BaseImage
                                            src="/assets/images/edit-pencil.png"
                                            height={20}
                                            width={20}
                                            alt="Edit Name"
                                        />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={shopName}
                                        onChange={handleNameChange}
                                        className="border rounded p-1 w-full md:w-auto"
                                    />
                                    <button
                                        onClick={toggleEditName}
                                        className="bg-primary text-white p-1 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Container>
                <div className="mt-20 w-full flex justify-start items-start mb-10">
                    <Link href="/store/create">
                        <Heading level={6} className="text-sm md:text-base">
                            ← Back
                        </Heading>
                    </Link>
                </div>
                <div className="border border-[#a3a3a3]"></div>
                <div className="space-y-4 mt-20 mb-4">
                    <Input
                        type="text"
                        label="Store Description"
                        placeholder="Description"
                        labelClassName="text-[1rem]"
                    />
                    <Input
                        label="Store Link:"
                        prefixIcon="/assets/images/link.png"
                        placeholder="Enter your link"
                        labelClassName="text-[1rem]"
                    />

                </div>
                <div className="flex justify-end mb-20">
                    <Link href="/dashboard">
                        <Button
                            title="Continue"
                            isPrimary
                            className="px-20 py-3"
                        />
                    </Link>
                </div>
            </Container>
        </div>
    );
}
