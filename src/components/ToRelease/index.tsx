"use client";
import React, { useState } from "react";
import Heading from "../Base/Heading";
import CalendarInput from "../CalendarInput";
import Dropdown from "../Base/Dropdown";
import { Option } from "@/constants/Types";
import Input from "../Base/Input";
import Button from "../Base/Button";
import BaseImage from "../Base/BaseImage";
import ToReleaseOrderMobileCards from "../ToReleaseOrderMobileCards";
import AutoCompleteDropdown from "../Base/AutoCompleteDropdown";

const options = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
];

export default function ToRelease({ transcationData }: { transcationData: any }) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(transcationData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const currentData = transcationData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="border border-gray-200 shadow-lg bg-white rounded-lg">
      <div className="flex flex-col p-6 relative">
        <div className="flex justify-end absolute sm:relative right-0 top-4 sm:top-0 sm:mb-0 mb-4">
          <Button
            title="Download"
            className="text-xs sm:text-base rounded-lg py-2"
            isPrimary
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          <div className="col-span-1">
            <div className="flex flex-col">
              <Heading
                level={5}
                className="whitespace-normal text-textcolor mb-6 sm:mb-0"
              >
                Order creation date
              </Heading>
              <div className="flex flex-col sm:flex-row gap-1">
                <CalendarInput className="w-full" />
                <CalendarInput className="w-full" />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <Heading
              level={5}
              className="whitespace-normal my-3 sm:my-0 text-textcolor"
            >
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
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-3">
          <div className="col-span-1">
            <Heading
              level={5}
              className="whitespace-normal text-textcolor my-3 sm:my-0"
            >
              Order No / Order ID
            </Heading>
            <Input
              type="identifier"
              prefixIcon="/assets/images/search.png"
              className="w-full"
            />
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>

      <div className="hidden sm:block p-6 overflow-y-scroll">
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-4 text-xs font-medium text-gray-600">
                Order Id
              </th>
              <th className="p-4 text-xs font-medium text-gray-600">
                Product detail
              </th>
              <th className="p-4 text-xs font-medium text-gray-600">
                Quantity
              </th>
              <th className="p-4 text-xs font-medium text-gray-600">
                Payment status
              </th>
              <th className="p-4 text-xs font-medium text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((order: any, index: number) => (
              <tr
                key={`${order.product.id}-${index}`}
                className="border-b border-gray-200"
              >
                <td className="p-4 text-xs text-gray-600">
                  {order.order_id}
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gray-300 flex items-center rounded">
                      <BaseImage
                        src={order.product.product_images}
                        alt="Product Image"
                        width={40}
                        height={40}
                        className="col-span-1"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-800">
                        {order.product?.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-xs text-gray-600">
                  {order.quantity}
                </td>
                <td className="p-4 text-xs text-gray-600">
                  {order.status}
                </td>
                <td className="p-4 text-xs text-gray-600">
                  $ {order.vendor_amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
          <p>Total: {transcationData.length}</p>
          <div className="flex items-center space-x-2">
            <label htmlFor="items-per-page" className="text-gray-600">
              Items per page:
            </label>
            <select
              id="items-per-page"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border-gray-300 rounded text-gray-600"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded text-gray-600 disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded text-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="block sm:hidden">
        <div className="p-6">
          <div className="px-3 mb-1 flex flex-row justify-between">
            <Heading level={5}>Order details</Heading>
            <Heading level={5}>Status</Heading>
          </div>
          {currentData.map((order: any, index: number) => (
            <ToReleaseOrderMobileCards key={index} data={order} />
          ))}
          <div className="mt-4 flex flex-col items-center justify-between text-sm text-gray-600">
            <p>Total: {transcationData.length}</p>
            <div className="flex items-center space-x-2 mt-2">
              <label htmlFor="items-per-page-mobile" className="text-gray-600">
                Items per page:
              </label>
              <select
                id="items-per-page-mobile"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border-gray-300 rounded text-gray-600"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 border rounded text-gray-600 disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 border rounded text-gray-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
