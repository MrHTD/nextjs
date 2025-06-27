import React from "react";
import Heading from "../Base/Heading";
import { twMerge } from "tailwind-merge";
import { Program } from "@/constants/Types";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { showNotification } from "@/utility/snackBar";
import { deleteAffiliateProgram } from "@/services/affiliate";

type ProgramCardProps = {
  allProgramsData: Program[];
  setAllProgramsData:(e:any)=>void ;
  isLoading: boolean;
  onSelect: (data: any) => void;
};

export default function ProgramCard({
  allProgramsData,
  setAllProgramsData,
  isLoading,
  onSelect,
}: ProgramCardProps) {

  const deleteFromState =(id:string) =>{
    setAllProgramsData(allProgramsData.filter((x:any) => x.id !== id))
  }

  const handlerDeletePrograms = async (id :string) => {
    try {
      const response = await deleteAffiliateProgram({program_id : id });
      showNotification("success", "Affiliate program deleted successfully");
      deleteFromState(id)
      console.log(response);
    } catch (error: any) {
      showNotification(
        "error", "failed to delete program"
      );
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
      {allProgramsData?.length > 0 ? (
        allProgramsData?.map((program: any, key) => (
          <div
            key={key}
            className="flex flex-col gap-3 bg-white p-4 rounded-md shadow-md  cursor-pointer"
            onClick={() => onSelect(program)}
          >
            <div className="flex flex-row justify-between w-full">
              <Heading level={4} className="whitespace-normal">
                {program?.title}
              </Heading>
              <p className="text-xs text-[#656565] truncate">
                {program?.products?.length}
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-2">
              <Heading level={4} className="whitespace-normal font-normal">
                Expired date :
              </Heading>
              <Heading
                level={4}
                className="whitespace-normal font-normal text-textsecondary"
              >
                {moment(program?.end_date).format("DD MMM YYYY")}
              </Heading>
            </div>
            <div className="flex flex-row justify-between">
            <p
              className={twMerge(
                "text-xs",
                program?.is_specific ? "text-primary" : "text-red-400"
              )}
            >
              {program?.is_specific ? "Specific" : "All products"}
            </p>
            <p 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent event bubbling
                handlerDeletePrograms(program?.id);
              }}
              className={twMerge(
                "text-base", "text-red-400"
              )}
            >
             <MdDelete />
            </p>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full col-span-full p-4 text-center">
          <p>No programs available</p>
        </div>
      )}
    </div>
  );
}
