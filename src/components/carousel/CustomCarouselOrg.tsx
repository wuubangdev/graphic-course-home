import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';
import { OrganizationItem } from '@/lib/strapi-lib/api/organization';
import { strapiMediaUrl } from '@/lib/strapi-lib/strapi';

interface CustomCarouselOrgProps {
    listOrg: OrganizationItem[];
}

const CustomCarouselOrg: React.FC<CustomCarouselOrgProps> = ({ listOrg }) => (
    <Carousel
        autoplay
        autoplaySpeed={3000}
        infinite
        arrows
        dots={false}
        slidesToShow={8}
        slidesToScroll={1}
        draggable
        responsive={[
            { breakpoint: 640, settings: { slidesToShow: 4, slidesToScroll: 1 } },
        ]}
        className="myCarouselOrg"
    >
        {listOrg && listOrg.map((item, index) => (
            <div key={"crs-" + index} className='w-full flex flex-col justify-center items-center gap-2'>
                <div className='w-full flex justify-center mb-3'>
                    <div
                        className='w-16 aspect-[1/1] relative rounded-lg overflow-hidden'
                    >
                        <Image
                            alt='carousel' src={strapiMediaUrl(item.icon?.url) || "/test.png"}
                            fill
                            style={{ objectFit: 'cover', borderRadius: 8 }}
                        />
                    </div>
                </div>
                <div className='text-center'>{item.title}</div>
            </div>
        ))}
    </Carousel>
);

export default CustomCarouselOrg;