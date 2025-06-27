import React, { useEffect } from "react";
import Heading from "../Base/Heading";
import BaseImage from "../Base/BaseImage";
import ToRelease from "../ToRelease";
import { getOrderTransaction } from "@/services/vendor";

interface EarningProps {
  title?: string;
  balance?: number;
  pending?: number;
}

const Earnings = (prop: EarningProps) => {
  const { title = "", balance, pending } = prop;
  const [transcationData, setTranscationData] = React.useState<any[]>([]);

  const getOrderTranscationHandle = async () => {
    try {
      const response = await getOrderTransaction();
      console.log("get Orders Response:", response);
      setTranscationData(response?.result);
    } catch (error: any) {
      console.error("get Orders Error:", error?.data.error || error.message);
      throw error;
    }
  }

  useEffect(()=>{
    getOrderTranscationHandle()
  },[])

  return (
    <div className="gap-4 mb-10">
      {/* <div className="bg-[#FFE3A3] p-4 rounded-md flex flex-col md:flex-row items-center gap-2 my-10">
        <BaseImage
          src="/assets/images/circlealert.png"
          width={25}
          height={12}
          alt="Circle Alert"
          className="flex-shrink-0"
        />
        <p className="text-center md:text-left text-sm ">
          Dear seller, your item price credit includes the Lazada co-fund program subsidies such as Lazada Bonus, Coins.
          Please let us know if you have any improvement ideas on this or other finance topics. Click here to give your feedback.
        </p>
      </div> */}
      <div className="grid grid-cols-2 mb-2 gap-4">
        <div className="col-span-1 space-y-6 bg-white p-4 rounded-md text-left">
          <div className="flex flex-row justify-start items-center text-left gap-2">
            <Heading level={5} className="text-sm font-normal text-left text-bg-gray-200">Total amount</Heading>
            <BaseImage
              src="/assets/images/circlealert.png"
              width={20}
              height={8}
              alt="Circle Alert"
              className="flex-shrink-0"
            />
          </div>
          <p className="text-textsecondary font-normal text-lg md:text-4xl">
            $ {balance}
          </p>
        </div>
        <div className="col-span-1 space-y-6  bg-white p-4 rounded-md text-left">
          <div className="flex flex-row items-center gap-2 justify-start">
            <Heading level={5} className="text-sm font-normal text-bg-gray-200">Pending</Heading>
            <BaseImage
              src="/assets/images/circlealert.png"
              width={20}
              height={8}
              alt="Circle Alert"
              className="flex-shrink-0"
            />
          </div>
          <p className="text-textsecondary font-normal text-lg md:text-4xl">
            $ {pending}
          </p>
        </div>
        </div>

      <ToRelease transcationData={transcationData} />

    </div>
  );
};

export default Earnings;
