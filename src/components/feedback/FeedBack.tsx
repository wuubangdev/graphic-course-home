import Image from 'next/image'
import React from 'react'

const FeedBack = () => {
    return (
        <section className='py-28 relative'>
            <div className='container px-4 mx-auto z-20'>
                <div className='grid grid-cols-2'>
                    <div className='w-full flex justify-end px-6'>
                        <div className='w-1/2 aspect-[4/5] relative'>
                            <Image
                                src='/feedback/std1.jpg'
                                alt='Feedback Background'
                                layout='fill'
                                objectFit='cover'
                                quality={100}
                                className='rounded-[10rem] z-10'
                            />
                            <div className='absolute aspect-square top-0 -left-12 w-1/3'>
                                {/* Rain */}
                                <Image
                                    alt='hero-image-icon4'
                                    src={'/feedback/testi_shape01.svg'}
                                    fill
                                    className='object-contain object-center'
                                />
                            </div>
                            <div className='absolute aspect-square top-0 -right-12 w-1/4 animate-pulse'>
                                {/* Rain */}
                                <Image
                                    alt='hero-image-icon4'
                                    src={'/feedback/testi_shape02.svg'}
                                    fill
                                    className='object-contain object-center'
                                />
                            </div>
                            <div className='absolute aspect-square bottom-0 left-0 w-1/4 animate-[spin_3s_infinite] z-20'>
                                {/* Rain */}
                                <Image
                                    alt='hero-image-icon4'
                                    src={'/feedback/testi_shape03.svg'}
                                    fill
                                    className='object-contain object-center'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center gap-12 md:px-24 px-6'>
                        {/* Heading */}
                        <h1 className='text-white text-4xl font-semibold'>Nhận xét của học viên <br /> về chúng tôi</h1>
                        <div className='flex flex-col'>
                            <div className='relative top-0 left-0 w-18 h-16 mb-4'>
                                <Image
                                    src='/feedback/quote.png'
                                    alt='Feedback Background'
                                    layout='fill'
                                    objectFit='contain'
                                    quality={100}
                                />
                            </div>
                            <p className='text-white mb-6 font-semibold'>“ when an unknown printer took a galley of type and scrambled to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.”</p>
                            <hr className='border-[1px] border-gray-400/40' />
                            <div className='flex flex-col mt-6'>
                                <span className='font-semibold text-xl text-white'>Le Vu Bang</span>
                                <span className='text-gray-400'>Web Developer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute top-0 left-0 w-full h-full -z-10'>
                <Image
                    src='/feedback/feedback-bg.jpg'
                    alt='Feedback Background'
                    layout='fill'
                    objectFit='cover'
                    quality={100}
                />
            </div>
        </section>
    )
}

export default FeedBack