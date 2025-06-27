import React from "react";
import Heading from "../Base/Heading";
import BaseImage from "../Base/BaseImage";
import DashboardLeftChart from "../DashboardLeftChart";
import DashboardRightChart from "../DashboardRightChart";

export default function AffiliateStatsCards() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <div className="flex justify-between items-end">
            <div>
              <Heading level={4} className="text-gray-500 font-medium">
                Sales
              </Heading>
              <Heading
                level={2}
                className="text-4xl sm:text-5xl font-normal mt-4 sm:mt-6"
              >
                148
              </Heading>
            </div>
            <div className="mt-2 flex items-center space-x-1 bottom-0">
              <Heading level={5} className="text-green-600 font-medium">
                +9
              </Heading>
              <BaseImage
                src="/assets/images/arrowupright.png"
                alt="Sales increase"
                width={20}
                height={20}
                className="bg-green-500 rounded-md p-1"
              />
            </div>
          </div>
          <div className="flex justify-between mt-2 sm:mt-4">
            <Heading level={5} className="text-paracolor">
              2 Yesterday
            </Heading>
            <Heading level={5} className="text-paracolor">
              7 Today
            </Heading>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <div className="flex justify-between items-end">
            <div>
              <Heading level={4} className="text-gray-500 font-medium">
                Commision
              </Heading>
              <Heading
                level={2} className="text-4xl sm:text-5xl font-normal mt-4 sm:mt-6" >2,341
              <label className="bottom-0 font-normal text-sm sm:text-lg">
                  $
                </label>
              </Heading>
            </div>
            <div className="mt-2 flex items-center space-x-1 bottom-0">
              <Heading level={5} className="text-green-600 font-medium">
                +9
              </Heading>
              <BaseImage
                src="/assets/images/arrowupdown.png"
                alt="Sales increase"
                width={20}
                height={20}
                className="bg-green-500 rounded-md p-1"
              />
            </div>
          </div>
          <div className="flex justify-between mt-2 sm:mt-4">
            <Heading level={5} className="text-paracolor">
              125.8 Yesterday
            </Heading>
            <Heading level={5} className="text-paracolor">
              5.37 Today
            </Heading>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <div className="flex justify-between items-end">
            <div>
              <Heading level={4} className="text-gray-500 font-medium">
                Sale amount
              </Heading>
              <span className="flex flex-row items-end">
                <Heading
                  level={2}
                  className="text-4xl sm:text-5xl font-normal mt-4 sm:mt-6"
                >
                  16.5
                </Heading>
                <label className="bottom-0 font-normal text-sm sm:text-lg">
                  $
                </label>
              </span>
            </div>
            <div className="mt-2 flex items-center space-x-1 bottom-0">
              <Heading level={5} className="text-[#FF3201] font-medium">
                -9
              </Heading>
              <BaseImage
                src="/assets/images/arrowupdown.png"
                alt="Sales increase"
                width={20}
                height={20}
                className="bg-[#FF3201] rounded-md p-1"
              />
            </div>
          </div>
          <div className="flex justify-between mt-2 sm:mt-4">
            <Heading level={5} className="text-paracolor">
              125.8 Yesterday
            </Heading>
            <Heading level={5} className="text-paracolor">
              5.37 Today
            </Heading>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 mt-16 mb-10">
        <div className="w-full lg:w-1/2 p-4 bg-white shadow-lg border rounded-lg">
          <DashboardLeftChart />
        </div>
        <div className="w-full lg:w-1/2 p-4 bg-white shadow-lg border rounded-lg">
          <DashboardRightChart />
        </div>
      </div>
    </div>
  );
}
