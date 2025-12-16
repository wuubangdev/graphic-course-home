import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';

interface CustomCarouselProps {
    listImage: string[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ listImage }) => (
    <Carousel
        autoplay={{ dotDuration: true }}
        autoplaySpeed={5000}
        arrows
        infinite
        className='w-full h-full'
    >
        {listImage && listImage.map((imageUrl, index) => (
            <div key={"crs-" + index} className='w-full aspect-video relative'>
                <Image alt='carousel' src={imageUrl} fill objectFit='cover' />
            </div>
        ))}

    </Carousel>
);

export default CustomCarousel;