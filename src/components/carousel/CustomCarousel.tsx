import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';
import { fileUrl, StrapiV5File } from '@/lib/strapi-lib/strapi-media';

interface CustomCarouselProps {
    listImage: StrapiV5File[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ listImage }) => (
    <Carousel
        autoplay={{ dotDuration: true }}
        autoplaySpeed={3000}
        arrows
        infinite
        className='w-full h-full'
    >
        {listImage && listImage.map((image, index) => (
            <div key={"crs-" + index} className='w-full aspect-[21/9] relative'>
                <Image alt='carousel' src={fileUrl(image) || ""} fill style={{ objectFit: 'cover' }} />
            </div>
        ))}
    </Carousel>
);

export default CustomCarousel;