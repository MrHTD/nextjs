// import React from "react";
// import Heading from "../Base/Heading";
// import { RecentOrdersTable } from "@/constants/Data";
// import Button from "../Base/Button";
// import BaseImage from "../Base/BaseImage";
// import { useQuery } from "@tanstack/react-query";
// import api from "@/services";
// import { OrdersList } from "@/constants/Enum";
// import { twMerge } from "tailwind-merge";

// type ApiResponse = {
//   success: boolean;
//   message: string;
//   token: string;
//   result: any[];
// };

// // SYCODE
// const getStoreProductfn = async (): Promise<ApiResponse> => {
//   return await api.get("GET_MY_ORDERS");
// };

export default function UsersAllOrders() {
  // const { data: orders } = useQuery({
  //   queryKey: ["USER_ORDERS"],
  //   queryFn: getStoreProductfn,
  // });

  // console.log("orders Data : ", orders);
  // const data = orders?.result || [];

  // console.log("updated - orders", data);
  return (<div>
    User Orders
  </div>)
  // return (
  //   <div className="w-full">
  //     <div className="border rounded-lg shadow-sm p-4">
  //       <Heading level={3} className="text-textsecondary mb-4">
  //         Recent Orders
  //       </Heading>
  //       <div className="overflow-x-auto">
  //         <table className="table-auto w-full">
  //           <thead>
  //             <tr className="border-b-2 border-primary">
  //               <th className="p-3 text-left font-normal">Products</th>
  //               <th className="p-3 text-left font-normal">Bought On</th>
  //               <th className="p-3 text-left font-normal">Unit Price</th>
  //               <th className="p-3 text-left font-normal">Order ID</th>
  //               <th className="p-3 text-left font-normal">Manage</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {RecentOrdersTable.map((d, index) => (
  //               <tr key={index} className="border-b">
  //                 <td className="p-3 flex items-center">
  //                   <div className="flex flex-row space-x-3">
  //                     <div className="bg-gray-200 p-2 rounded-lg">
  //                       <BaseImage
  //                         src={d?.product?.image}
  //                         alt="Category Img 3"
  //                         width={40}
  //                         height={40}
  //                         className="col-span-1"
  //                       />
  //                     </div>
  //                     <div>
  //                       <p className="font-medium">{d?.product?.name}</p>
  //                       <p className="text-gray-500 text-sm">
  //                         Color: {d?.color}
  //                       </p>
  //                     </div>
  //                   </div>
  //                 </td>
  //                 <td className="p-3">{d?.delivery_date}</td>
  //                 <td className="p-3">{d?.product?.price}</td>
  //                 <td className="p-3">{d?.id}</td>
  //                 <td className="p-3">
  //                   <div
  //                     className={twMerge(
  //                       "px-3 rounded-full  h-5 truncate",
  //                       d.status === OrdersList.CANCELED &&
  //                         "bg-red-500",
  //                       d.status === OrdersList.COMPLETED &&
  //                         "bg-green-500",
  //                       d.status === OrdersList.PENDING &&
  //                         "bg-gray-500",
  //                       d.status === OrdersList.DISPATCHED &&
  //                         "bg-blue-500",
  //                       d.status === OrdersList.SHIPPED &&
  //                         "bg-[#00BAE3]",
  //                       d.status === OrdersList.ACCEPTED &&
  //                         "bg-[#EAD72B]"
  //                     )}
  //                     >
  //                       {d?.status}   
  //                   </div>
  //                   {/* <Button title="Manage" isPrimary className="font-normal" /> */}
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </div>
  // );
}
