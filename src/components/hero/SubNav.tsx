'use client'
import { useScrollToSelector } from '@/hooks/useScrollToSelector'
import { HeroSubNavItem } from '@/lib/strapi-lib/api/hero'
import { strapiMediaUrl } from '@/lib/strapi-lib/strapi'
import Image from 'next/image'
import React from 'react'

interface SubNavProps {
    subNav: HeroSubNavItem[]
}

const SubNav: React.FC<SubNavProps> = ({ subNav }) => {
    const scrollTo = useScrollToSelector({ offset: 0, behavior: "smooth" });
    return (
        <div className='p-4'>
            <h3 className='text-[15px]' style={{ fontWeight: 600 }}>Thể loại sản phẩm</h3>
            <ul className='flex flex-col gap-1'>
                {subNav && subNav.map((item, i) => {
                    return (
                        <li key={"subnav-item" + i}
                            className='px-2 flex gap-2 py-1 text-sm items-center hover:bg-[#ccc]/30 duration-300 
                            rounded-sm cursor-pointer'
                            onClick={() => scrollTo(item.link)}
                        >
                            <div className='w-5 h-5 relative'>
                                <Image
                                    alt={item.title}
                                    src={strapiMediaUrl(item.icon?.url) || "/test.png"}
                                    fill
                                    className='object-cover'
                                />
                            </div>
                            <span>{item.title}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SubNav