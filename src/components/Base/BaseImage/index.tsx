import Image, { StaticImageData } from "next/image";
import React from "react";

interface BaseImageInterface
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string | undefined | StaticImageData;
  alt: string;
  fill?: boolean;
  placeholder?: "empty" | "blur";
  priority?: boolean;
  blurDataURL?: string;
  placeholderImg?: string;
  width?: number;
  height?: number;
  unoptimized?: boolean;
  className?: string;
}

export default function BaseImage({
  src,
  alt,
  fill = false,
  placeholder = "empty",
  priority = true,
  blurDataURL = "",
  placeholderImg,
  unoptimized = false,
  width,
  height,
  className,
  ...rest
}: BaseImageInterface) {
  return (
    <Image
      src={(!src || src === "" ? "/" : src) || placeholderImg || "/"}
      alt={alt}
      fill={fill}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      priority={priority}
      width={width}
      height={height}
      className={className}
      {...rest}
    />
  );
}
