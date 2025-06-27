"use client";
import React, { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import BaseImage from "../Base/BaseImage";

interface ImageMagnifyProps {
  Imagesrc: string | StaticImageData;
}

const MAGNIFIER_SIZE = 100;
const ZOOM_LEVEL = 2.5;

const ImageMagnify = ({ Imagesrc }: ImageMagnifyProps) => {
  const [zoomable, setZoomable] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    mouseX: 0,
    mouseY: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
    };
    fetchData();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const element = e.currentTarget;
    const { width, height } = element.getBoundingClientRect();
    setImageSize({ width, height });
    setZoomable(true);
    updatePosition(e);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setZoomable(false);
    updatePosition(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updatePosition(e);
  };

  const updatePosition = (e: React.MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setPosition({
      x: -x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      y: -y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      mouseX: x - MAGNIFIER_SIZE / 2,
      mouseY: y - MAGNIFIER_SIZE / 2,
    });
  };
  const imageUrl =
    typeof Imagesrc === "string" ? Imagesrc : (Imagesrc as StaticImageData).src;

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        className="overflow-hidden"
      >
        <BaseImage
          src={imageUrl}
          alt="Product Image"
          style={{ objectFit: "cover" }}
          className="rounded-md "
          fill
        />
        <div
          style={{
            backgroundPosition: `${position.x}px ${position.y}px`,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${
              imageSize.height * ZOOM_LEVEL
            }px`,
            backgroundRepeat: "no-repeat",
            display: zoomable ? "block" : "none",
            top: `${position.mouseY}px`,
            left: `${position.mouseX}px`,
            width: `${MAGNIFIER_SIZE}px`,
            height: `${MAGNIFIER_SIZE}px`,
          }}
          className="z-50 p-28 rounded-full pointer-events-none absolute"
        />
      </div>
    </div>
  );
};

export default ImageMagnify;
