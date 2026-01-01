import { fileUrl, StrapiV5File } from '@/lib/strapi-lib/strapi-media';
import { Carousel } from 'antd'
import Image from 'next/image';
import React from 'react'
interface CustomCarouselProps {
    listImage: StrapiV5File[];
}
const CustomCarouselHero: React.FC<CustomCarouselProps> = ({ listImage }) => {
    return (
        <Carousel
            autoplay={{ dotDuration: true }}
            autoplaySpeed={3000}
            infinite
            dots
            slidesToShow={2}
            slidesToScroll={1}
            draggable
            responsive={[
                { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            ]}
            className="myCarousel"
        >
            {listImage && listImage.map((image, index) => (
                <div key={"crs-" + index} className='w-full aspect-[16/9] relative rounded-lg overflow-hidden'>
                    <Image
                        alt='carousel' src={fileUrl(image) || ""}
                        fill
                        style={{ objectFit: 'cover', borderRadius: 8 }} />
                </div>
            ))}
        </Carousel>
    )
}

export default CustomCarouselHero