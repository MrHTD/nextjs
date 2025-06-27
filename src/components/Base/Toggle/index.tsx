import React from 'react';

export interface ToggleProps {
    isOn: boolean;
    onToggle: () => void;
    disabled?: boolean;
    className?: string;
}

const Toggle: React.FC<ToggleProps> = ({ isOn, onToggle, disabled = false, className = '' }) => {
    return (
        <button
            type="button"
            onClick={onToggle}
            disabled={disabled}
            className={`relative inline-flex h-6 w-11 items-center rounded-full 
                ${isOn ? 'bg-primary' : 'bg-secondary'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                transition-colors ease-in-out duration-200 ${className}`}
        >
            <span className="sr-only">Toggle Switch</span>
            <span
                className={`${
                    isOn ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition ease-in-out duration-200`}
            />
        </button>
    );
};

export default Toggle;