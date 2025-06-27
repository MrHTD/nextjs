import React from "react";
import Heading from "../Base/Heading";
import DashboardLeftChart from "../DashboardLeftChart";
import DashboardRightChart from "../DashboardRightChart";

export default function DashboardStatsCards() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <div className="flex justify-between items-end">
            <div>
              <Heading level={4} className="text-black font-medium">
                Sales
              </Heading>
              <Heading
                level={2}
                className="text-4xl sm:text-5xl font-normal mt-4 sm:mt-6"
              >
                148
              </Heading>
            </div>
            <div className="flex items-center space-x-1 bottom-0">
              <Heading
                level={5}
                className="bg-[#FF5228] text-white text-sm font-medium px-3 py-1 rounded-full"
              >
                34
              </Heading>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <div className="flex justify-between items-end">
            <div>
              <Heading level={4} className="text-black font-medium">
                Commision
              </Heading>
              <Heading
                level={2}
                className="text-4xl sm:text-5xl font-normal mt-4 sm:mt-6"
              >
                148
              </Heading>
            </div>
            <div className="flex items-center space-x-1 bottom-0">
              <Heading
                level={5}
                className="bg-[#FF5228] text-white text-sm font-medium px-3 py-1 rounded-full"
              >
                34
              </Heading>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <div className="flex justify-between items-end">
            <div>
              <Heading level={4} className="text-black font-medium">
                Sale amount
              </Heading>
              <Heading
                level={2}
                className="text-4xl sm:text-5xl font-normal mt-4 sm:mt-6"
              >
                148
              </Heading>
            </div>
            <div className="flex items-center space-x-1 bottom-0">
              <Heading
                level={5}
                className="bg-[#FF5228] text-white text-sm font-medium px-3 py-1 rounded-full"
              >
                34
              </Heading>
            </div>
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
