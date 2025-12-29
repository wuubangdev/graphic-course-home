import { formatPriceVND } from '@/function/formatPriceVND';
import { toSlug } from '@/lib/slug';
import { Course } from '@/lib/strapi-lib/api/category';
import { strapiMediaUrl } from '@/lib/strapi-lib/strapi';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CourseCardProps {
    course: Course;
    isDarkMode?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = async ({ course, isDarkMode }) => {
    return (
        <Link href={`khoa-hoc/${toSlug(course?.title || "123")}-${course.id}.html`}
            className='flex flex-col relative cursor-pointer hover:-translate-y-1 duration-300 rounded-lg'
        >
            {/* Thumbnail */}
            <div className='w-full aspect-[21/9] relative bg-amber-200 rounded-md overflow-hidden'>
                <Image
                    src={strapiMediaUrl(course.thumImage?.url) || "/test.png"}
                    // src={"/test.png"}
                    alt="Course Thumbnail"
                    fill
                    className='object-cover rounded-md' />
            </div>
            <div className='flex flex-col pb-6 flex-1'>
                {/* Title */}
                <h3 style={{ fontWeight: 600 }} className={`${isDarkMode ? 'text-white' : 'text-black'} pt-3 font-semibold line-clamp-2`}>{course?.title ?? "Bigener Adobe Illustrator for Graphic Design"}</h3>
                {/* <span>{course?.description}</span> */}
                {/* Cost */}
                <div className='flex justify-between flex-1 items-end'>
                    <div className='flex gap-2 items-end'>
                        <span className={`${isDarkMode ? 'text-[#e89191]' : 'text-[#f34848]'} font-semibold`}>{formatPriceVND(course?.priceSale || "0đ")}</span>
                        {/* <span
                            className={`${isDarkMode ? 'text-white' : 'text-black'} text-[#f34848] font-semibold`}
                        >{formatPriceVND(course?.priceSale || "0đ")}</span> */}
                        <span className='text-gray-400 line-through'>{formatPriceVND(course?.priceOrigin || "0đ")}</span>
                        {course?.salePercent &&
                            <span className='p-1 rounded-md text-[0.8rem] text-white bg-red-500'>-{course?.salePercent}%</span>}
                    </div>
                    {/* <span>Đã bán {course?.fakeStudentCount || 0}</span> */}
                </div>
            </div>
            {/* Sale */}
        </Link>
    )
}

export default CourseCard