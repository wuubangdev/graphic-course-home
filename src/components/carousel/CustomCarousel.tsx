import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';


const CustomCarousel: React.FC = () => (
    <Carousel
        autoplay={{ dotDuration: true }}
        autoplaySpeed={5000}
        arrows
        infinite
        className='w-full h-full'
    >
        <div className='w-full aspect-video relative'>
            <Image alt='carousel' src={'/test.png'} fill objectFit='cover' />
        </div>
        <div className='w-full aspect-video relative'>
            <Image alt='carousel' src={'/test.png'} fill objectFit='cover' />
        </div>
        <div className='w-full aspect-video relative'>
            <Image alt='carousel' src={'/test.png'} fill objectFit='cover' />
        </div>
        <div className='w-full aspect-video relative'>
            <Image alt='carousel' src={'/test.png'} fill objectFit='cover' />
        </div>
    </Carousel>
);

export default CustomCarousel;