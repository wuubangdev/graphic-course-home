import React from 'react'

interface LiItemProps {
    icon: React.ReactNode
    title: string
}

const LiItem: React.FC<LiItemProps> = ({ icon, title }) => {
    return (
        <div className='flex gap-1 py-2 px-2 cursor-pointer group hover:bg-gray-200 hover:text-black duration-300'>
            <div className=''>{icon}</div>
            <span className=''>{title}</span>
        </div>
    )
}

export default LiItem