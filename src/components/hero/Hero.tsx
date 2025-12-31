import Image from 'next/image'
import React from 'react'
import { fetchHero } from '@/lib/strapi-lib/api/hero';
import type { Hero } from '@/lib/strapi-lib/api/hero';
import CustomCarousel from '../carousel/CustomCarousel';
import { fileUrl } from '@/lib/strapi-lib/strapi-media';
import { strapiMediaUrl } from '@/lib/strapi-lib/strapi';

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
                className='mx-auto max-w-[1280px] px-4 flex flex-col gap-6'
            >
                <div className='grid grid-cols-3 flex-1 gap-3'>
                    <div className='col-span-2 aspect-[21/9] rounded-lg overflow-hidden'>
                        <CustomCarousel listImage={listImages} />
                    </div>
                    <div className='flex flex-col gap-3'>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero