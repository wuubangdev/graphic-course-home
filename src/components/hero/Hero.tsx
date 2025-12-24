import Image from 'next/image'
import React from 'react'
import LiItem from './LiItem'
import { fetchHero } from '@/lib/strapi-lib/hero';
import type { Hero } from '@/lib/strapi-lib/hero';
import CustomCarousel from '../carousel/CustomCarousel';
import { fileUrl } from '@/lib/strapi-lib/strapi-media';

const Hero = async () => {
    const res = await fetchHero();
    const heroData: Hero | null = res.data;
    const listImages = heroData?.listMedia || [];
    const listSingleImages = heroData?.listSingleMedia || [];
    return (
        <section className='w-full py-8'>
            {/* Background */}
            <div className='h-full w-full absolute top-0 left-0 -z-10'>
                <Image
                    alt='bg-hero'
                    src={'/hero/banner_bg.jpg'}
                    fill
                    className='object-fill object-center'
                />
            </div>
            <div
                className='mx-auto container px-4 flex flex-col gap-3'
            >
                <div className='grid grid-cols-4 flex-1 gap-3'>
                    <div className='rounded-lg bg-white border-[1px] border-gray-300 p-4'>
                        <ul>
                            <li>
                                <LiItem
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                                        <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
                                        <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                                    </svg>
                                    }
                                    title='Khoá học đồ hoạ (2D)'
                                />
                            </li>
                            <li>
                                <LiItem
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
                                    </svg>}
                                    title='Khoá học đồ hoạ (3D)'
                                />
                            </li>
                            <li>
                                <LiItem
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z" clipRule="evenodd" />
                                    </svg>}
                                    title='Khoá học lập trình (Web)'
                                />
                            </li>
                            <li>
                                <LiItem
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M19.5 6h-15v9h15V6Z" />
                                        <path fillRule="evenodd" d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 0 0 6 21h12a.75.75 0 0 0 0-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375Zm0 13.5h17.25a.375.375 0 0 0 .375-.375V4.875a.375.375 0 0 0-.375-.375H3.375A.375.375 0 0 0 3 4.875v11.25c0 .207.168.375.375.375Z" clipRule="evenodd" />
                                    </svg>
                                    }
                                    title='Khoá học AI'
                                />
                            </li>
                            <li>
                                <LiItem
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z" clipRule="evenodd" />
                                    </svg>
                                    }
                                    title='Account'
                                />
                            </li>
                            <li>
                                <LiItem
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M9.375 3a1.875 1.875 0 0 0 0 3.75h1.875v4.5H3.375A1.875 1.875 0 0 1 1.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0 1 12 2.753a3.375 3.375 0 0 1 5.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 1 0-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3ZM11.25 12.75H3v6.75a2.25 2.25 0 0 0 2.25 2.25h6v-9ZM12.75 12.75v9h6.75a2.25 2.25 0 0 0 2.25-2.25v-6.75h-9Z" />
                                    </svg>}
                                    title='Quà tặng & khuyến mãi'
                                />
                            </li>
                        </ul>
                    </div>
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
                <div className='grid grid-cols-4 gap-3'>
                    {listSingleImages.length > 0 && listSingleImages.map((item, i) => {
                        if (i <= 1 || i > 10) return null;
                        const seconds = 2 + i * 1;
                        return (
                            <div
                                key={item.id}
                                className='aspect-[21/9] overflow-hidden relative rounded-lg animate-[bounceSoft_infinite]'
                                style={{
                                    animationDuration: `${seconds}s`,
                                    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                                }}
                            >
                                <Image
                                    alt='carousel'
                                    src={fileUrl(item) || "/test.png"}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className='cursor-pointer hover:scale-105 duration-300'
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Hero