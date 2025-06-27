'use client'
import { useRouter } from 'next/navigation';

interface BackButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export const BackButton = (props: BackButtonProps) => {
    const router = useRouter();

    return (
        <div {...props}
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
            {props.children || '← Go Back'}
        </div>
    );
};