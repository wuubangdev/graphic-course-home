import Link from 'next/link'
import React from 'react'

interface MenuItemProps {
    icon: React.ReactNode
    title: string
    href: string
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, href }) => {
    return (
        <Link href={href} className='text-white flex items-center gap-2 py-4 cursor-pointer group'>
            <div className='group-hover:-translate-y-0.5 duration-300'>{icon}</div>
            <span className='group-hover:-translate-y-1 duration-300'>{title}</span>
        </Link>
    )
}

export default MenuItem