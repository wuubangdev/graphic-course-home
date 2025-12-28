import Image from 'next/image'
import React from 'react'
import { fetchHero } from '@/lib/strapi-lib/api/hero';
import type { Hero } from '@/lib/strapi-lib/api/hero';
import CustomCarousel from '../carousel/CustomCarousel';
import { fileUrl } from '@/lib/strapi-lib/strapi-media';
import { strapiMediaUrl } from '@/lib/strapi-lib/strapi';
import Feature from './Feature';

const Hero = async () => {
    const res = await fetchHero();
    const heroData: Hero | null = res.data;
    const listImages = heroData?.listMedia || [];
    const listSingleImages = heroData?.listSingleMedia || [];
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
                className='mx-auto max-w-[1280px] px-4 flex flex-col gap-6'
            >
                <div className='grid grid-cols-3 flex-1 gap-3'>
                    <div className='col-span-2 aspect-[21/9] rounded-lg overflow-hidden'>
                        <CustomCarousel listImage={listImages} />
                    </div>
                    <div className='flex flex-col gap-3'>
                        {listSingleImages.length > 0 && listSingleImages.map((item, i) => {
                            if (i > 1) return null;
                            const seconds = 2 + i * 2;
                            return (
                                <div
                                    key={item.id}
                                    className='aspect-[21/9] overflow-hidden relative rounded-lg animate-[bounceSoft_infinite]'
                                    style={{
                                        animationDuration: `${seconds}s`,
                                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
                                    }}
                                >
                                    <Image alt='carousel' src={fileUrl(item) || "/test.png"} fill style={{ objectFit: 'cover' }}
                                        className='cursor-pointer hover:scale-105 duration-300'
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Feature />
            </div>
        </section>
    )
}

export default Hero