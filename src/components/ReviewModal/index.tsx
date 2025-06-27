import React, { useState, useRef } from "react";
import Heading from "../Base/Heading";
import Button from "../Base/Button";
import { AiOutlineClose } from "react-icons/ai";

export default function ReviewModal({
  onClose,
  payload,
  setPayload,
  setImage,
  handleSubmit,
}: any) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImage(file);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          <AiOutlineClose size={20} />
        </button>
        <Heading level={2} className="mb-2">
          Reply Review
        </Heading>
        <textarea
          placeholder="Write a review"
          className="w-full border border-[#ACACAC] focus:outline-primary rounded-md p-3 h-24 mb-4 resize-none"
          value={payload.comment}
          onChange={(e) => setPayload({ ...payload, comment: e.target.value })}
        ></textarea>
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">
            Attach Media (Optional)
          </label>
          <div
            className="border border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer"
            onClick={handleFileClick}
          >
            <div className="text-[#ACACAC]">📷</div>
            <p className="text-xs text-[#ACACAC]">Click here to add image(s)</p>
            {selectedFile && (
              <p className="text-sm text-gray-700 mt-2">{selectedFile.name}</p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <Button
          title="Submit"
          className="w-full"
          isPrimary
          onClick={() => {
            handleSubmit();
            onClose();
          }}
        />
      </div>
    </div>
  );
}
