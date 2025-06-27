"use client";
import React, { useState, ChangeEvent, useMemo, useEffect } from "react";
import BaseImage from "@/components/Base/BaseImage";
import Container from "@/components/Base/Container";
import Heading from "@/components/Base/Heading";
import InternalStorePage from "@/components/InternalStorePage";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fileToURL, uploadFile } from "@/utility";
import { showNotification } from "@/utility/snackBar";
import { createInternalStore } from "@/services/vendor";
import { VendorStoreFormData } from "@/constants/Types";
import { setStoreCookie } from "@/config/redux/reducers/store";
import { useDispatch } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { Avatar } from "@/components/Avatar";

export default function InternalStore() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [width, setWidth] = useState(1440); // Default width
  const [formData, setFormData] = useState<VendorStoreFormData | null>({
    name: "Shop Name",
    category_id: "",
    description: "",
    address: "",
    type: "internal",
    opening_time: "",
    closing_time: "",
    opening_days: "",
    closing_days: "",
    pickup_location: "",
    default_delivery_location: "",
    email: "",
    phone: "",
    whatsappNumber: "",
  });
  const dispatch = useDispatch();

  const handleImageChange = (
    name: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev: any) => ({ ...prev, [name]: file }));
    }
  };

  const getInput = (
    name: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handlerGetVal = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const toggleEditName = () => {
    setIsEditingName(!isEditingName);
  };
  const route = useRouter();
  const InternalStoreHandler = async (payload: VendorStoreFormData) => {
    const data = { ...formData, ...payload };
    // setFormData(data);
    console.log("data on internal store page", data, payload, formData);
    const checkList = [
      "name",
      "cover_image",
      "profile_image",
      "category_id",
      "description",
      "address",
    ] as const;
    const emptyFields = checkList.find((field) => !data[field]);

    if (emptyFields) {
      showNotification("error", `Please fill ${emptyFields} field `);
      return;
    }
    data.type = "internal";
    try {
      if (data.cover_image) {
        const es = await uploadFile(formData?.cover_image);
        data.cover_image = es?.filename;
        console.log("coverImage IMage", data);
      }
      if (data.profile_image) {
        const es = await uploadFile(formData?.profile_image); // file
        data.profile_image = es?.filename;
        console.log("profile IMage", data);
      }
      console.log("payload after upload", data);
    } catch (e) {
      console.log("Error in uploading file", e);
      showNotification("error", "Error in uploading file");
      throw console.error("Error in uploading file", e);
    }
    // > create internal store < //
    // console.log("data before call", data);
    createInternalStore(data)
      .then((res) => {
        console.log("Internal Store created successfully!", res);
        console.log("Signup successful!", res);
        showNotification("success", "Create Store successfully");
        dispatch(setStoreCookie());
        route.replace("/dashboard");
      })
      .catch((error) => {
        console.error(
          "Internal Store creation failed error:",
          error?.data.error || error.message
        );
        showNotification("error", error?.data.error || error.message);
      });
  };
  const cover_image = useMemo(() => {
    if (formData?.cover_image) {
      return fileToURL(formData?.cover_image);
    }
    return "/assets/images/shop-banner.png";
  }, [formData?.cover_image]);
  return (
    <div className="">
      <div className="relative">

        <div className="absolute top-2 right-2 z-10">
          <div className="flex flex-row gap-2 cursor-pointer rounded shadow items-center align-middle bg-[#d9d9d99d] p-2">
            <BaseImage
              src="/assets/images/camera.png"
              height={30}
              width={30}
              alt="camera"
            />
            <label htmlFor="coverImageUpload" className="text-white text-sm sm:text-base">
              Change Cover
            </label>
          </div>
          <input
            id="coverImageUpload"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange("cover_image", e)}
            className="hidden"
          />
        </div>
        <div className="overflow-hidden h-[150px] md:[200px] lg:h-[300px] bg-[#f5f5f5]">
          <BaseImage
            style={{ objectFit: 'cover' , height: '100%' }}
            src={ cover_image }
            height={650}
            width={width}
            alt='Store Banner'
          />
        </div>
      </div>
      <div className="grid justify-center relative" >
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 sm:flex-row items-center gap-4">
          <div
            className="rounded-full flex-row items-center gap-4 w-full sm:w-auto"
            style={{ maxWidth: "100%", height: "auto" }}
          >
            <div className="relative w-[150px] h-[150px]">
              <Avatar src={fileToURL(formData?.profile_image) || "/assets/images/placeholder.png"}
                alt="store"
                size={150}
                className="object-cover h-full select-none selection:bg-black"
              />
              <>
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
                  onChange={(e) => handleImageChange("profile_image", e)}
                  className="hidden"
                />
              </>
              <div className="flex my-3 items-center gap-2">
                <input
                  type="text"
                  defaultValue={formData?.name}
                  onChange={(e) => getInput("name", e)}
                  maxLength={15}
                  className="border rounded p-1 w-[150px] md:w-auto"
                />
              </div>
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
        <InternalStorePage InternalStoreHandler={InternalStoreHandler} />
      </Container>
    </div>
  );
}
