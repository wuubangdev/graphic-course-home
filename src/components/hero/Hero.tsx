import Image from 'next/image'
import React from 'react'
import ButtonNav from '../util/ButtonNav'
import Link from 'next/link'

const Hero = () => {
    return (
        <section className='w-full pt-32 h-screen'>
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
                className='mx-auto container px-4 h-screen grid grid-cols-2'
            >
                {/* Left part */}
                <div className='mx-auto w-8/10 flex justify-center items-start relative'>
                    <div className='aspect-square flex flex-col justify-center items-start'>
                        <p className='px-4 py-2 bg-blue-200 text-blue-600 rounded mb-4 font-semibold'>100% Satisfaction Guarantee</p>
                        <h1 className='text-6xl font-semibold mb-5'>
                            Learn <span className='text-blue-600'>Skills</span> From Our Top Instructors
                        </h1>
                        <p className='text-[#39557e]'>
                            Borem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattisBorem ipsum dolor sit amet consectetur adipiscing area we followelit.
                        </p>
                        <div className='flex items-center mt-12 gap-4'>
                            <ButtonNav label={"Explore Courses".toUpperCase()} type='primary' />
                            <div className='flex items-center group cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                    className="size-12 group-hover:text-blue-600 duration-300"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                </svg>
                                <div className='flex flex-col'>
                                    <span className='text-[#39557e]'>Have any question ?</span>
                                    <Link
                                        href={'tel:+123456789'}
                                        target='_blank'
                                        className='text-lg font-semibold group-hover:text-blue-600 duration-300'
                                    >
                                        +84 123 456 789
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='absolute aspect-square top-1/8 -left-1/6 w-1/10 animate-[bounce_3s_ease-in-out_infinite]'>
                        {/* Arrow */}
                        <Image
                            alt='hero-image-icon4'
                            src={'/hero/bshape_01.png'}
                            fill
                            className='object-contain object-center'
                        />
                    </div>
                    <div className='absolute aspect-square top-1/9 right-1/3 w-1/12'>
                        {/* Arrow */}
                        <Image
                            alt='hero-image-icon4'
                            src={'/hero/bshape_02.png'}
                            fill
                            className='object-contain object-center'
                        />
                    </div>
                </div>
                {/* Right part */}
                <div className='mx-auto w-8/10 relative'>
                    <div className='w-full aspect-square relative mt-12'>
                        {/* Ruler */}
                        <Image
                            alt='hero-image-avtar'
                            src={'/hero/banner_img.png'}
                            fill
                            className='object-contain object-center'
                        />
                    </div>
                    <div className='absolute aspect-square top-1/6 left-1/6 w-1/8 animate-[bounce_4s_ease-in-out_infinite]'>
                        {/* Document */}
                        <Image
                            alt='hero-image-icon3'
                            src={'/hero/bshape_03.png'}
                            fill
                            className='object-contain object-center'
                        />
                    </div>
                    <div className='absolute aspect-square top-1/3 -left-1/4 w-1/6'>
                        {/* Arrow */}
                        <Image
                            alt='hero-image-icon4'
                            src={'/hero/bshape_04.png'}
                            fill
                            className='object-contain object-center'
                        />
                    </div>
                    <div className='absolute aspect-square top-1/4 right-0 w-1/8 animate-[bounce_2s_ease-in-out_infinite]'>
                        <Image
                            alt='hero-image-icon5'
                            src={'/hero/bshape_05.png'}
                            fill
                            className='object-contain object-center'
                        />
                    </div>
                    <div className='absolute p-5 top-1/3 left-0 bg-white rounded-xl flex flex-col gap-1 justify-center items-center shadow-lg'>
                        <div className='w-2/3 aspect-square rounded-full bg-green-600 relative'>
                            <Image
                                alt='hero-image-icon4'
                                src={'/hero/group.png'}
                                fill
                                className='object-cover object-center'
                            />
                        </div>
                        <p className='text-[#39557e]'>Total students</p>
                        <p className='font-semibold text-3xl'>15K</p>
                    </div>
                    <div className='absolute p-5 top-1/2 right-0 bg-white rounded-xl flex flex-col justify-center items-center shadow-lg'>
                        <div className='w-1/3 aspect-square rounded-full bg-violet-600 relative'>
                            <Image
                                alt='hero-image-icon4'
                                src={'/hero/graduate.png'}
                                fill
                                className='object-cover object-center'
                            />
                        </div>
                        <p className='text-[#39557e] text-center'>Complete Graduation</p>
                        <p className='font-semibold text-3xl'>34K</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero