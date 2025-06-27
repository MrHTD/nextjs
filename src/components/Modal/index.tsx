// components/Modal.tsx
'use client';

import { ReactNode } from 'react';

type ModalProps = {
    show: boolean;
    onClose: () => void;
    children?: ReactNode;
};

export default function Modal({
    show,
    onClose,
    children,
}: ModalProps) {
    if (!show) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center' onClick={onClose}>
            <div className="absolute bg-black/50 h-full w-full" />
            <div className="p-2 z-50 rounded-md">
                { children}
            </div>
        </div>
    );
}
