import React, { useEffect } from "react";
import BaseImage from "../Base/BaseImage";
import { AiOutlineClose } from "react-icons/ai";
import CarouselForProduct from "../CarouselForProduct";
import useWindowSize from "@/providers/dimension";



export default function QuickViewModal({
  onClose,
  images
}: any) {

  let { width } = useWindowSize()

  console.log('windows width', width)


  useEffect(() => {
    // Prevent background scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable background scroll when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative flex w-[85%] sm:w-[80%] md:w-[60%] lg:w-[60%] xl:w-[50%] bg-white rounded-xl justify-center items-center overflow-visible">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-textsecondary p-2 rounded-full z-50"
        >
          <AiOutlineClose size={17} />
        </button>
        <CarouselForProduct type="arrow" oneItemFullFrame>
          {images?.map(
            (image: any, index: number) => (
              <div
                key={`${image?.id}-${index}`}
                className="flex relative items-center bg-no-repeat justify-center w-full h-[400px] sm:h-[300px] md:h-[400px] lg:-[400px] xl:h-[500px]"
              >
                <div
                  className="absolute "
                  style={{
                    height: 490, width: width * 50 / 100, padding: 20,
                    backgroundRepeat: "no-repeat", backgroundSize: "contain", overflow: "hidden",
                    maxWidth: 650, justifyContent: "center", alignItems: "center"
                  }}>
                  <BaseImage
                    src={image.url}
                    alt={`Product Image ${index + 1}`}
                    fill
                    className="rounded-md object-contain w-full"
                  />
                </div>
              </div>
            )
          )}
        </CarouselForProduct>
      </div>
    </div>
  );
}