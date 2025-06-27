import { twMerge } from "tailwind-merge";

interface PropsType {
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
  capitalizeFirst?: boolean;
  ellipsis?: boolean;
  lines?: number;
  style?: React.CSSProperties;
  children: JSX.Element | string | (JSX.Element | string)[];
}

const baseClasses = [
  "text-2xl md:text-3xl lg:text-4xl font-normal leading-relaxed",     // size 1: XXLarge paragraph
  "text-xl md:text-2xl lg:text-3xl font-normal leading-relaxed",      // size 2: XLarge paragraph
  "text-lg md:text-xl lg:text-2xl font-normal leading-relaxed",       // size 3: Large paragraph
  "text-base md:text-lg lg:text-xl font-normal leading-relaxed",      // size 4: Medium-large paragraph
  "text-base md:text-lg font-normal leading-relaxed",                 // size 5: Medium paragraph
  "text-base font-normal leading-relaxed",                           // size 6: Base paragraph
  "text-sm md:text-base font-normal leading-relaxed",                // size 7: Small-medium paragraph
  "text-sm font-normal leading-normal",                              // size 8: Small paragraph
  "text-xs md:text-sm font-normal leading-normal",                   // size 9: Extra small paragraph
  "text-xs font-normal leading-normal",                              // size 10: Tiny paragraph
  "text-[10px] md:text-xs font-normal leading-tight",               // size 11: Micro paragraph
  "text-[8px] md:text-[10px] font-normal leading-tight",            // size 12: Nano paragraph
];

export default function Paragraph({ 
  size, 
  className, 
  capitalizeFirst = false, 
  ellipsis = false, 
  lines, 
  children, 
  style 
}: PropsType) {
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
    <p
      style={{ ...style, ...ellipsisStyle }}
      className={twMerge(
        baseClasses[size - 1],
        capitalizeFirst ? 'capitalize-first' : '',
        className
      )}
    >
      {children}
    </p>
  );
}
