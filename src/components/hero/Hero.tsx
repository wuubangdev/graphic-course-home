import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <section className='w-full pt-44 h-screen'>
            {/* Background */}
            <div className='h-full w-full absolute top-0 left-0 -z-10'>
                <Image
                    alt='bg-hero'
                    src={'/hero/banner_bg.jpg'}
                    fill
                    className='object-fill object-center'
                />
            </div>
            <div
                className='mx-auto container px-4 flex flex-col gap-4'
            >
                <div className='grid grid-cols-4 flex-1 gap-4'>
                    <div className=' bg-amber-400 rounded-2xl'></div>
                    <div className='col-span-2 aspect-video rounded-2xl bg-amber-400'></div>
                    <div className='flex flex-col gap-4'>
                        <div className='aspect-video rounded-2xl bg-amber-400'></div>
                        <div className='aspect-video rounded-2xl bg-amber-400'></div>
                    </div>
                </div>
                <div className='grid grid-cols-4 gap-4'>
                    <div className='aspect-video bg-amber-300 rounded-2xl'></div>
                    <div className='aspect-video bg-amber-300 rounded-2xl'></div>
                    <div className='aspect-video bg-amber-300 rounded-2xl'></div>
                    <div className='aspect-video bg-amber-300 rounded-2xl'></div>
                </div>
            </div>
        </section>
    )
}

export default Hero