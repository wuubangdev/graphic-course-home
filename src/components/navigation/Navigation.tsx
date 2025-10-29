import React from 'react'
import Menu from './Menu'
import RightBar from './RightBar'

const Navigation = () => {
    return (
        <section className='mx-auto container grid grid-cols-2 p-4'>
            {/* Left bar */}
            <div className='flex'>
                {/* Logo */}
                <div className='aspect-video bg-amber-300'>
                    Logo
                </div>
                {/* Menu */}
                <div>
                    <Menu />
                </div>
            </div>
            {/* Right bar */}
            <div className='flex justify-end items-center'>
                <RightBar />
            </div>
        </section>
    )
}

export default Navigation