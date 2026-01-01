import Image from 'next/image'
import React from 'react'
import { fetchHero } from '@/lib/strapi-lib/api/hero';
import type { Hero, HeroSubNavItem } from '@/lib/strapi-lib/api/hero';
import { strapiMediaUrl } from '@/lib/strapi-lib/strapi';
import CustomCarouselHero from '../carousel/CustomCarouselHero';
import SubNav from './SubNav';

const Hero = async () => {
    const res = await fetchHero();
    const heroData: Hero | null = res.data;
    const listImages = heroData?.listMedia || [];
    const mediaBg = heroData?.mediaBg;
    const subNav = heroData?.subNav as HeroSubNavItem[] || [];
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
                <div className='grid grid-cols-1 md:grid-cols-5 flex-1 gap-y-4 sm:gap-4 items-stretch'>
                    <div className='h-full w-full rounded-lg bg-white'>
                        <SubNav subNav={subNav} />
                    </div>
                    <div className='col-span-4 px-4 pt-6 pb-4 bg-white rounded-lg'>
                        <CustomCarouselHero listImage={listImages} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero