import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface MenuItemProps {
    icon: string
    title: string
    href: string
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, href }) => {
    return (
        <Link href={href} className='h-full flex items-center gap-2 py-2 cursor-pointer group'>
            <div className='h-9 w-9 relative'>
                <Image
                    alt={title}
                    src={icon}
                    fill
                    className='object-contain group-hover:-rotate-6 duration-300'
                />
            </div>
            <span className='group-hover:-translate-y-1 duration-300 text-sm'>{title}</span>
        </Link>
    )
}

export default MenuItem