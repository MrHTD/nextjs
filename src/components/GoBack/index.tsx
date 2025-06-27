'use client';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import Heading from '../Base/Heading';

export default function GoBackLink({ children, url }: { children?: ReactNode, url?: string }) {
    const router = useRouter();

    const handleClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        router.back();
    };

    return (
        <a href={url || ''} onClick={handleClick}>
            <Heading level={5} className="whitespace-normal text-sm">
                {(children as JSX.Element) || '← Go Back'}
            </Heading>
        </a>
    );
}
