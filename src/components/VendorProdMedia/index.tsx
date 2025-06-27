import { useEffect, useMemo, useRef, useState } from "react";
import Heading from "../Base/Heading";
import Button from "../Base/Button";
import BaseImage from "../Base/BaseImage";
import { fileToURL } from "@/utility";
import { preconnect } from "react-dom";
import { deleteProductImage } from "@/services/vendor";

// Define a type for the props
type ProductMediaProps = {
  getHandler: (handler: File[], selected?: File) => void;
  setPayload: any;
  payload: any;
};

type PayloadFile = {
  url: string;
  id: string;
}

export function ProductMedia({
  getHandler,
  setPayload,
  payload,
}: ProductMediaProps) {
  const galleryHiddenFileInput = useRef<HTMLInputElement>(null);
  const [galleryFile, setGalleryFileUrls] = useState<File[]>([]);
  const galleryUrls: PayloadFile[] = payload?.product_images || [];

  const handleFileInputClick = () => {
    galleryHiddenFileInput.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setGalleryFileUrls((prev) => [...prev, ...filesArray]);
      getHandler([...galleryFile, ...filesArray]);
    }
  };

  const selectImageHandler = (index: number) => {
    getHandler(galleryFile, galleryFile[index]);
  };

  const handleGalleryRemove = (index: number) => {
    setGalleryFileUrls((prev) => prev.filter((_, i) => i !== index));
    if (index > galleryFile.length - 1) {
      deleteProductImage({ image_id : galleryUrls[index - galleryFile.length].id });
      setPayload((prev:any) => ({...prev, product_images: galleryUrls.filter((_, i) => i !== index - galleryFile.length)}));
    }
  };

  return (
    <div className="col-span-1 md:col-span-1 bg-white rounded-md border border-inputborder p-4">
      <Heading level={5} className="text-textsecondary">
        Product Media
      </Heading>
      <div className="border border-dashed border-inputborder rounded-md p-8">
        <div className="p-4 border border-solid border-gray-300 rounded-lg w-full max-w-4xl">
          <div className="grid grid-cols-3 gap-4">
            {[...galleryFile, ...galleryUrls].map((url: File | PayloadFile , index) => (
              <div
                key={index}
                className="border border-gray-300 p-2 rounded-lg w-full flex justify-center items-center relative group"
                style={{
                  position: "relative",
                  aspectRatio: "1/1",
                  overflow: "hidden",
                  borderColor: payload?.selected_image === url ? "#3fac53" : "",
                }}
                onClick={() => selectImageHandler(index)}
              >
                <BaseImage
                  src={fileToURL('url' in url ? url.url : url)}
                  alt={`Uploaded Pic ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-cover rounded-lg"
                  onClick={() => {
                    setPayload((prev: any) => ({
                      ...prev,
                      selected_image: url,
                    }));
                  }}
                />
                <button
                  onClick={() => handleGalleryRemove(index)}
                  className="absolute top-1 right-1 bg-white text-secondary rounded-full hidden group-hover:block"
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "20px",
                    lineHeight: "1",
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              onClick={handleFileInputClick}
              className="border border-gray-300 p-4 rounded-lg flex justify-center items-center text-gray-500 w-16 h-16"
              style={{ aspectRatio: "1/1" }}
            >
              <span className="text-3xl">+</span>
            </button>
          </div>
        </div>
        <Button
          title="Upload images"
          onClick={handleFileInputClick}
          className="mt-4"
        />
        <input
          type="file"
          ref={galleryHiddenFileInput}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept="image/*"
          multiple
        />
      </div>
    </div>
  );
}
