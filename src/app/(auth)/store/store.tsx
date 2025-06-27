"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Tabs from "@/components/Base/Tab";
import Heading from "@/components/Base/Heading";
import Button from "@/components/Base/Button";
import Container from "@/components/Base/Container";
import BaseImage from "@/components/Base/BaseImage";
import VendorProducts from "@/components/VendorProducts";
import InternalStorePage from "@/components/InternalStorePage";
import { useRouter } from "next/navigation";
import { editStore, generateConnecAccountLink, getCheckMyAccount, getStore, getStoresProducts } from "@/services/vendor";
import { useDispatch } from "react-redux";
import { saveStore } from "@/config/redux/reducers/store";
import { useSelector } from "react-redux";
import { RootState, VendorStoreFormData } from "@/constants/Types";
import { fileToURL, uploadFile } from "@/utility";
import { showNotification } from "@/utility/snackBar";
import { Avatar } from "@/components/Avatar";
import { Divider } from "@mui/material";
import Modal from "@/components/Modal";
import Paragraph from "@/components/Paragraph";

export default function VendorStore() {
  const route = useRouter();
  const [products, setProducts] = useState([]);
  const [width, setWidth] = useState(1440); // Default width
  const store = useSelector((state: RootState) => state?.storeReducer?.store);
  const [isEdit, setIsEdit] = useState(false);
  const [connectModal, setConnectModal] = useState(false);


  const [formData, setFormData] = useState<VendorStoreFormData | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageChange = (
    name: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev: any) => ({ ...prev, [name]: file }));
    }
  };


  const handleClickConnect = async () => {
    console.log('call apI for connect')
    try {
      const response = await generateConnecAccountLink();
      console.log("generate result" );
      window.open(response.url, '_blank', 'noopener,noreferrer');

    } catch (error) {
      console.log(error);
    }
  }

  const getInput = (name: string, event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    if (text) {
      setFormData((prev: any) => ({ ...prev, [name]: text }));
    }
  };

  useEffect(() => {
    if (formData) {
      setFormData({ ...formData, name: store?.name || "" });
    }
  }, [store]);

  let getData = async () => {
    try {
      const fetchStore = await getStore();
      console.log("store : in page", fetchStore);
      if (fetchStore?.result?.length) {
        dispatch(saveStore(fetchStore?.result?.[0]));
        setFormData((prev: any) => ({
          ...prev,
          profile_image: fetchStore?.result?.[0]?.profile_image,
          cover_image: fetchStore?.result?.[0]?.cover_image,
        }));
      } else {
        route.push("/store/create/internal-store");
      }
      const products = await getStoresProducts(fetchStore?.result?.[0]?.id);
      console.log("products : in page", products?.result);
      setProducts(products?.result);
    } catch (err) {
      console.error("Error in fetching store data", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateStore = async (e: any) => {
    const data = { ...store, ...e, ...formData };
    if (formData?.profile_image?.name) {
      try {
        const es = await uploadFile(formData?.profile_image);
        data.profile_image = es?.filename;
        console.log("Profile Image", es);
      } catch (error) {
        console.log("Error in updating store data", error);
      }
    }
    if (formData?.cover_image?.name) {
      try {
        const es = await uploadFile(formData?.cover_image);
        data.cover_image = es?.filename;
        console.log("Cover Image", es);
      } catch (error) {
        console.log("Error in updating store data", error);
      }
    }
    try {
      const response = await editStore(data);
      dispatch(saveStore(data));
      showNotification("success", "Store Updated Successfully");
      setIsEdit(false);
      console.log("Store Update", response);
    } catch (error) {
      showNotification("error", "Error in updating store data");
      console.error("Error in updating store data", error);
    }
  };

  const tabData = [
    {
      label: "Store detail",
      content: (
        <InternalStorePage
          updateStoreHandler={updateStore}
          data={store}
          isButtonVisible={false}
          isUpdate={true}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      ),
    },
  ];

  const handlerAddProduct = async () => {
    console.log('call apI for connect')
    try {
      const response = await getCheckMyAccount({ id_needed: false });
      console.log("check Api result", response);
      if (response.result?.is_have_account) {
        if (store) route.push(`/add-product?store_id=${store?.id}`);
      } else {
        setConnectModal(!response.result?.is_have_account)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div className="relative">

        {isEdit && (
          <div className="absolute top-2 right-2 z-10">
            <div className="flex flex-row gap-2 cursor-pointer rounded shadow items-center align-middle bg-[#d9d9d99d] p-2">
              <BaseImage
                src="/assets/images/camera.png"
                height={30}
                width={30}
                alt="camera"
              />
              <label
                htmlFor="coverImageUpload"
                className="text-white text-sm sm:text-base"
              >
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
        )}
        <div className="overflow-hidden h-[300px] bg-[#f5f5f5]">
          <BaseImage
            style={{ objectFit: "cover" }}
            src={
              fileToURL(formData?.cover_image) ||
              "/assets/images/shop-banner.png"
            }
            height={650}
            width={width}
            alt="Store Banner"
          />
        </div>
      </div>
      <div className="grid justify-center relative">
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 sm:flex-row items-center gap-4">
          <div
            className="rounded-full flex-row items-center gap-4 w-full sm:w-auto"
            style={{ maxWidth: "100%", height: "auto" }}
          >
            <div className="relative w-[150px] h-[150px]">
              <Avatar
                src={
                  fileToURL(formData?.profile_image) ||
                  "/assets/images/placeholder.png"
                }
                alt="store"
                size={150}
                className="object-cover h-full select-none selection:bg-black"
              />
              {isEdit ? (
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
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <Container className="mt-20">
        <div className="flex flex-row justify-center items-center">
          {!isEdit ? (
            <Heading level={1} className="text-black">
              {store?.name || "Store Name"}
            </Heading>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="text"
                defaultValue={formData?.name}
                onChange={(e) => getInput("name", e)}
                maxLength={15}
                className="border rounded p-1 w-[150px] md:w-auto"
              />
            </div>
          )}
        </div>
        <div className="">
          <Tabs
            tabs={tabData}
            type="span"
            className="flex flex-col lg:flex-row border-none w-full lg:w-1/2"
          />
        </div>
        <Divider
          orientation="horizontal"
          className="my-5"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        />
        <div>
          <div className="flex flex-col md:flex-row justify-between gap-3">
            {products.length > 0 ? (
              <Heading level={1} className="text-textsecondary">
                Product List
              </Heading>
            ) : (
              <div />
            )}
            <Button onClick={handlerAddProduct} title="Add More Product" />
          </div>
          {products.length > 0 ? <VendorProducts data={products} /> : null}
        </div>
      </Container>
      <Modal show={connectModal} onClose={() => { setConnectModal(false) }}>
        <div className="bg-white p-5 rounded-md flex gap-6 flex-col">
          <div className="flex gap-3 flex-col">
            <Heading level={2} className="text-primary"> Connect Account</Heading>
            <Paragraph size={5} className="text-black/50">
              You must connect your Stripe account to receive payments
            </Paragraph>
          </div>
          <div className="flex flex-row justify-end">
            <Button onClick={() => { setConnectModal(false) }}>Cancel </Button>
            <Button isPrimary onClick={handleClickConnect}>connect </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
