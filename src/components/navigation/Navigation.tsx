import React from 'react'
import Menu from './Menu'
import RightBar from './RightBar'
import Image from 'next/image'

const Navigation = () => {
    return (
        <section className='fixed top-0 left-0 right-0  px-4 bg-white z-50'
            style={{
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                // backdropFilter: "blur(10px)",
            }}
        >
            <div
                className='mx-auto container grid grid-cols-2'
            >
                {/* Left bar */}
                <div className='flex'>
                    {/* Logo */}
                    <div className='aspect-video h-full relative'>
                        <Image
                            alt='logo'
                            src={'/hero/logo.jpg'}
                            fill={true}
                            style={{ objectFit: 'cover' }}
                            className='w-full h-full'
                        />
                    </div>
                    {/* Menu */}
                    <div className='flex-1 mx-auto'>
                        <Menu />
                    </div>
                </div>
                {/* Right bar */}
                <div className='flex justify-end items-center'>
                    <RightBar />
                </div>
            </div>
        </section>
    )
}

export default Navigation