import Link from 'next/link';
import React from 'react'

const Label = ({ label, hasItems }: { label: string, hasItems?: boolean }) => (
    <div className='flex items-center gap-1 px-3 py-9 group cursor-pointer font-medium'>
        <span className='group-hover:text-blue-600 duration-300'>{label}</span>
        {hasItems &&
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                className="size-4 group-hover:rotate-180 transition-transform duration-300"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        }
    </div>
);


export interface DropdownProps {
    label: string;
    value?: string;
    items?: Array<{ label: string; value: string }>;
}

const Dropdown: React.FC<DropdownProps> = ({ label, items, value }) => {

    return (
        <li
            className='relative group'
        >
            {value ? <Link href={value}><Label label={label} /></Link> : <span><Label label={label} hasItems={true} /></span>}
            <ul className='absolute scale-y-0 group-hover:scale-y-100 group-hover:opacity-100 opacity-0 bg-white py-4 rounded-md duration-300 origin-top'
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
            >
                {items && items.length > 0 && items.map((item, index) => (
                    <li key={index} className='whitespace-nowrap hover:translate-x-1 pl-4 pr-6 duration-300 hover:text-blue-600'>
                        {item.value ? <Link href={item.value} className='block px-3 py-2'>{item.label}</Link> : <span className='block px-3 py-2'>{item.label}</span>}
                    </li>
                ))}
            </ul>
        </li>
    )
}

export default Dropdown