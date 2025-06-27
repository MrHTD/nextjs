import { twMerge } from "tailwind-merge";

interface PropsType {
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  className?: string;
  capitalizeFirst?: boolean;
  ellipsis?: boolean;
  lines?: number;
  style?: React.CSSProperties;
  children: JSX.Element | string | (JSX.Element | string)[];
}

const baseClasses = [
  "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold",
  "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold",
  "text-base sm:text-lg md:text-xl lg:text-2xl font-medium",
  "text-sm sm:text-base md:text-lg lg:text-xl font-medium",
  "text-sm sm:text-base md:text-lg font-medium",
  "text-xs sm:text-sm md:text-base lg:text-lg font-medium",
  "text-xs sm:text-sm md:text-base font-medium",
  "text-xs sm:text-sm font-medium",
  "text-xs font-medium",
  "text-xs font-normal",
];

export default function Heading({ level, className, capitalizeFirst = true, ellipsis = false, lines, children, style }: PropsType) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const ellipsisStyle: React.CSSProperties = lines
    ? {
      display: '-webkit-box',
      WebkitLineClamp: lines,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      width: '100%'
    }
    : ellipsis
      ? {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%'
      }
      : {};

  return (
    <Tag
      style={{ ...style, ...ellipsisStyle }}
      className={twMerge(
        baseClasses[level - 1],
        capitalizeFirst ? 'capitalize-first' : 'capitalize',
        'block',
        className
      )}>
      {children}
    </Tag>
  );
}
