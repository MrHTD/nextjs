import React from "react";
import Heading from "@/components/Base/Heading";
import Dropdown from "@/components/Base/Dropdown";
import Button from "@/components/Base/Button";
import { Option } from "@/constants/Types";
import AutoCompleteDropdown from "../Base/AutoCompleteDropdown";

interface UpdateStatusModalProps {
  modalRef: React.RefObject<HTMLDivElement>;
  options: Option[];
  selectedOption: Option | null;
  closeModal: () => void;
  setSelectedOption: (option: Option | null) => void;
  handlerDeliveryStatus: () => void;
}

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  modalRef,
  options,
  selectedOption,
  closeModal,
  setSelectedOption,
  handlerDeliveryStatus,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className=" absolute top-0 left-0 bg-opacity-50 bg-black h-full w-full z-0 " onClick={(e) => { e.stopPropagation(); closeModal() }} />
      <div ref={modalRef} className="bg-white p-4 rounded-md w-96 z-10" >
        <Heading level={5} className="text-center mb-6">
          Update Delivery Status
        </Heading>
        <AutoCompleteDropdown
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          placeholder="Select Delivery Status"
          className="text-xs"
        />
        <Button
          title="Update"
          onClick={handlerDeliveryStatus}
          className="mt-4 w-full"
          isPrimary
        />
      </div>
    </div>
  );
};

export default UpdateStatusModal;
