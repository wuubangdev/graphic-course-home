import React from 'react'

interface MenuItemProps {
    icon: React.ReactNode
    title: string
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title }) => {
    return (
        <div className='text-white flex gap-2 py-4 cursor-pointer group'>
            <div className='group-hover:-translate-y-0.5 duration-300'>{icon}</div>
            <span className='group-hover:-translate-y-1 duration-300'>{title}</span>
        </div>
    )
}

export default MenuItem