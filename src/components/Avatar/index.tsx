import BaseImage from "@/components/Base/BaseImage";
import { twMerge } from "tailwind-merge";
import { fileToURL } from "@/utility";

interface AvatarProps {
    src?: string;
    alt?: string;
    size?: number;
    ringColor?: string;
    ringWidth?: number;
    className?: string;
    imageClassName?: string;
}

export const Avatar = ({
    src,
    alt = "avatar",
    size = 160,
    ringColor = "primary",
    ringWidth = 2,
    className,
    imageClassName,
}: AvatarProps) => {
    return (
        <div
            className={twMerge(
                "rounded-full aspect-square flex justify-center items-center overflow-hidden",
                `border-${ringWidth} border-${ringColor}`,
                className
            )}
            style={{ width: size, height: size }}
        >
            <BaseImage
                unoptimized
                src={fileToURL(src) || "/assets/images/placeholder.png"}
                height={size}
                width={size}
                alt={alt}
                className={twMerge("object-cover h-full select-none", imageClassName)}
            />
        </div>
    );
};
