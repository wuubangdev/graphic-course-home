import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';

interface CustomCarouselImageProps {
    listImage: string[];
}

const CustomCarouselImage: React.FC<CustomCarouselImageProps> = ({ listImage }) => (
    <Carousel
        autoplay={{ dotDuration: true }}
        autoplaySpeed={3000}
        arrows
        infinite
        className='w-full h-full'
    >
        {listImage && listImage.map((image, index) => (
            <div key={"crs-" + index} className='w-full aspect-[21/9] relative'>
                <Image alt='carousel' src={image || ""} fill style={{ objectFit: 'cover' }} />
            </div>
        ))}
    </Carousel>
);

export default CustomCarouselImage;