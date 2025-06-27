"use client";
import React, { useEffect, useState } from "react";
import BaseImage from "../Base/BaseImage";
import Heading from "../Base/Heading";
import Button from "../Base/Button";
import { LuBadgeDollarSign, LuWallet } from "react-icons/lu";
import {
  MdOutlinePermContactCalendar,
  MdOutlineRocketLaunch,
} from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { IoBusOutline, IoSettingsOutline, IoStorefrontOutline } from "react-icons/io5";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { BsBox2 } from "react-icons/bs";
import { BiCoinStack } from "react-icons/bi";
import { FiMessageCircle } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiDiscountPercentLine, RiTeamLine } from "react-icons/ri";
import Link from "next/link";
import { getDashboard } from "@/services/vendor";
import { showNotification } from "@/utility/snackBar";
import { useSelector } from "react-redux";
import { RootState } from "@/config/redux";
import DisableLink from "../DisableLinks";
import { listenForNotifications } from "@/config/firebase/notifListener";

interface DashboardData {
  profile_image?: string;
  name?: string;
  website_link?: string;
  no_of_orders?: number;
  sales?: number;
}

export default function VendorDashboardPage() {
  const [dashboard, setDashboardData] = useState<DashboardData | null>(null);
  const store = useSelector((state: RootState) => state?.storeReducer?.store);

  useEffect(() => {
    getDashboard()
      .then((res) => {
        setDashboardData(res?.result);
      })
      .catch((error) => {
        console.error(
          "Dashboard data fetch failed error:",
          error?.data.error || error.message
        );
        showNotification("error", "Dashboard data fetch failed ");
      });
      listenForNotifications()
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2 bg-white p-4 pl-8 rounded-lg">
          <div className="flex flex-col md:flex-row gap-6 justify-start items-center">
            <BaseImage
              src={dashboard?.profile_image || "/assets/images/storeimg.png"}
              height={100}
              width={100}
              alt="Store Image"
              className="w-[100px] h-[100px] object-cover rounded-full border-2 border-primary"
            />
            <div className="flex flex-col text-center md:text-left">
              <Heading level={2} className="text-textsecondary">
                {dashboard?.name || "Store Name"}
              </Heading>
              <p className="text-sm text-gray-400">
                {dashboard?.website_link || `https://mawrid.user.devxonic.com`}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row mt-8 mb-6 gap-4">
            <Button
              onClick={async () => {
                await navigator.clipboard.writeText(`https://mawrid.user.devxonic.com/seller-info?store_id=${store?.id}`);
                showNotification('success', 'link is save in your clipboard')
              }}
              title="Copy Link"
              className="bg-white border border-gray-100 text-textsecondary"
            />
            <Button
              onClick={async () => {
                await navigator.share({
                  title: "Visit out strore for Amazing perchases",
                  url: `https://mawrid.user.devxonic.com/seller-info?store_id=${store?.id}`
                });
              }}
              title="Share Now"
              className="bg-textsecondary text-white border-none"
            />
          </div>
        </div>

        <div
          className="col-span-1 rounded-lg flex flex-col justify-between"
          style={{
            backgroundImage: "url(/assets/images/dashboardbg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col p-4 md:p-8 space-y-4 md:space-y-8">
            <div className="flex flex-col gap-2 md:gap-4">
              <Heading level={4} className="text-white font-normal">
                No of orders
              </Heading>
              <Heading
                level={2}
                className="text-2xl md:text-4xl text-white font-normal"
              >
                {String(dashboard?.no_of_orders || 0)}
              </Heading>
            </div>
          </div>
          <div className="flex items-end p-4 md:p-8">
            <Link href={'/orders'}>
              <Heading
                level={6}
                capitalizeFirst={true}
                className="text-white font-normal underline"
              >
                View more
              </Heading>
            </Link>
          </div>
        </div>

        <div
          className="col-span-1 rounded-lg flex flex-col justify-between"
          style={{
            backgroundImage: "url(/assets/images/dashboardbg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col p-4 md:p-8 space-y-4 md:space-y-8">
            <div className="flex flex-col gap-2 md:gap-4">
              <Heading level={4} className="text-white font-normal">
                Sales
              </Heading>
              <Heading
                level={2}
                className="text-2xl md:text-4xl text-white font-normal"
              >
                $ {dashboard?.sales?.toString() || "0"}
              </Heading>
            </div>
          </div>
          <div className="flex items-end p-4 md:p-8">
            <Link href={"/payments"}>
              <Heading level={6} className="text-white font-normal underline">
                View more
              </Heading>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Heading
          level={2}
          className="font-normal whitespace-normal text-textsecondary"
        >
          All app
        </Heading>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-8 space-y-6">
        <div className="col-span-1 flex flex-col gap-4 justify-end items-center">
          <Link
            href="/store"
            className="flex flex-col items-center justify-center align-middle space-y-2"
          >
            <IoStorefrontOutline className="text-primary " size={28} />
            <Heading level={5} className="text-textsecondary">
              Store
            </Heading>
          </Link>
        </div>
        <div className="col-span-1 flex flex-col gap-4 justify-center items-center">
          <Link
            href="/payments"
            className="flex flex-col items-center justify-center align-bottom space-y-2"
          >
            <LuWallet className="text-primary" size={28} />
            <Heading level={5} className="text-textsecondary">
              Wallet
            </Heading>
          </Link>
        </div>
        <div className="col-span-1 flex flex-col gap-4 justify-center items-center">
          <Link
            href="/messages"
            className="flex flex-col items-center justify-center align-middle space-y-2"
          >
            <FiMessageCircle className="text-primary" size={28} />
            <Heading level={5} className="text-textsecondary">
              Messages
            </Heading>
          </Link>
        </div>
        <div className="col-span-1 flex flex-col gap-4 justify-center items-center">
          <Link
            href="/reports"
            className="flex flex-col items-center justify-center align-middle space-y-2"
          >
            <TbReportAnalytics className="text-primary" size={28} />
            <Heading level={5} className="text-textsecondary">
              Reports
            </Heading>
          </Link>
        </div>
        <div className="col-span-1 flex flex-col gap-4 justify-center items-center">
          <Link
            href="/settings"
            className="flex flex-col items-center justify-center align-middle space-y-2"
          >
            <IoSettingsOutline className="text-primary" size={28} />
            <Heading level={5} className="text-textsecondary">
              Settings
            </Heading>
          </Link>
        </div>
        <div className="col-span-1 flex flex-col gap-4 justify-center items-center">
          <Link
            href={`/add-product?store_id=${store?.id}`}
            className="flex flex-col items-center justify-center align-middle space-y-2"
          >
            <BsBox2 className="text-primary" size={28} />
            <Heading level={5} className="text-textsecondary">
              Add Product
            </Heading>
          </Link>
        </div>
      </div>
    </div>
  );
}
