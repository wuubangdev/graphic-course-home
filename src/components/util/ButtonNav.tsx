import React from 'react'

export interface ButtonNavProps {
    label: string;
    type?: 'primary' | 'outline';
}

const ButtonNav: React.FC<ButtonNavProps> = ({ label, type }) => {
    return (
        <button
            className={`border-gray-300 border-[1px] rounded px-4 py-2 cursor-pointer hover:bg-blue-900 duration-300 font-semibold
                ${type === 'primary' ? 'bg-blue-700 text-white border-blue-700' : ''} 
                ${type === 'outline' ? 'bg-white text-[#5a7093] hover:text-white' : ''}`}
        >
            {label}
        </button>
    )
}

export default ButtonNav