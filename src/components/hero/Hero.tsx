import Image from 'next/image'
import React from 'react'
import { fetchHero } from '@/lib/strapi-lib/api/hero';
import type { Hero } from '@/lib/strapi-lib/api/hero';
import { strapiMediaUrl } from '@/lib/strapi-lib/strapi';
import { Carousel } from 'antd';

const Hero = async () => {
    const res = await fetchHero();
    const heroData: Hero | null = res.data;
    const listImages = heroData?.listMedia || [];
    const mediaBg = heroData?.mediaBg;
    return (
        <section className='w-full py-8 relative overflow-hidden'>
            {/* Background */}
            {mediaBg && (<div className='h-full w-full absolute top-0 left-0 -z-10'>
                <Image
                    alt='bg-hero'
                    src={strapiMediaUrl(mediaBg.url) || '/bg-hero.png'}
                    fill
                    className='object-fill object-center'
                />
            </div>)}
            <div
                className='mx-auto max-w-[1280px] px-4 md:px-0 flex flex-col gap-6'
            >
                <div className='grid grid-cols-5 flex-1 gap-4 items-stretch'>
                    <div className='h-full rounded-lg bg-white'></div>
                    <div className='col-span-4 px-6 py-8 bg-white rounded-lg'>
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
                            <div>
                                <div className="w-full aspect-video rounded-lg bg-blue-500">Item 1</div>
                            </div>
                            <div>
                                <div className="w-full aspect-video rounded-lg bg-red-400">Item 2</div>
                            </div>
                            <div>
                                <div className="w-full aspect-video rounded-lg bg-red-300">Item 3</div>
                            </div>
                        </Carousel>
                    </div>
                    <div className='flex flex-col gap-3'>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero