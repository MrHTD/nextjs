import React from "react";
import Heading from "../Base/Heading";
import { AiOutlineClose } from "react-icons/ai";
import BaseImage from "../Base/BaseImage";

export default function AffiliateHomeModal({ onClose }: any) {

  return (
    <div className="fixed inset-0 flex items-center align-middle justify-center bg-black bg-opacity-50 z-50">
      <div className="absolute bg-black bg-opacity-50 h-screen w-screen " onClick={onClose} />
      <div className="bg-white rounded-lg p-6 overflow-y-auto relative h-screen lg:w-[70%] lg:max-w-[90%]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          <AiOutlineClose size={20} />
        </button>
        <div>
          <Heading level={2} className="mt-5 mb-8 text-textsecondary font-normal">How Reselling Works?</Heading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center align-middle">
            <div className="col-span-1 flex justify-center items-center h-[60vh] align-middle bg-primary p-8 rounded-lg">
              <BaseImage
                src='/assets/images/video.png'
                height={50}
                width={50}
                alt="video"
              />
            </div>
            <div className="col-span-1 flex flex-col my-6 gap-4 items-center align-middle">
              <div className="flex flex-row justify-start items-center gap-3 border border-inputborder p-4 w-full rounded-lg">
                <BaseImage
                  src='/assets/images/stp1.png'
                  height={20}
                  width={40}
                  alt="video"
                />
                <Heading level={5} className="flex-1 whitespace-normal">Find a product your network will love</Heading>
              </div>
              <div className="flex flex-row justify-start items-center gap-3 border border-inputborder p-4 w-full rounded-lg">
                <BaseImage
                  src='/assets/images/stp2.png'
                  height={20}
                  width={40}
                  alt="video"
                />
                <Heading level={5} className="flex-1 whitespace-normal">Click the  share and earn button</Heading>
              </div>
              <div className="flex flex-row justify-start items-center gap-3 border border-inputborder p-4 w-full rounded-lg">
                <BaseImage
                  src='/assets/images/stp3.png'
                  height={20}
                  width={40}
                  alt="video"
                />
                <Heading level={5} className="flex-1 whitespace-normal">Convince people to purchase shared items</Heading>
              </div>
              <div className="flex flex-row justify-start items-center gap-3 border border-inputborder p-4 w-full rounded-lg">
                <BaseImage
                  src='/assets/images/stp4.png'
                  height={20}
                  width={40}
                  alt="video"
                />
                <Heading level={5} className="flex-1 whitespace-normal">Get Rewards and commissions for each sale</Heading>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
