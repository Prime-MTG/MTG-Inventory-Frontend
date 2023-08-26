import React from 'react';

interface Props {
    text: string,
    onClick: () => void,
    className?: string,
    disabled?: boolean
}

const Button = ({text, onClick, className, disabled = false}: Props) => {
    const assembleButtonClasses = () => {
        let classes = `flex text-xl px-4 py-1 rounded-md ${className} `;

        if (disabled) {
            classes += 'bg-slate-600 text-gray-400 cursor-not-allowed';
        } else {
            classes += 'bg-slate-800 text-white cursor-pointer hover:bg-slate-600';
        }

        return classes;
    };

    return (
        <button className={assembleButtonClasses()} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
