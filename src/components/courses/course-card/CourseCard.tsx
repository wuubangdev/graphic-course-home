import { fetchLearnPressCourse, LpCourse } from '@/lib/learnpress'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CourseCardProps {
    courseId?: number;
}

const CourseCard: React.FC<CourseCardProps> = async ({ courseId }) => {
    const course: LpCourse = await fetchLearnPressCourse({
        baseUrl: process.env.WP_BASE_URL!,
        id: courseId || 0,
    });
    return (
        <Link href={'/123'} className='flex flex-col relative cursor-pointer hover:-translate-y-1 duration-300'
            style={{
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
            }}
        >
            {/* Thumbnail */}
            <div className='w-full aspect-[21/9] relative bg-amber-200'>
                <Image
                    src={course?.image || "/test.png"}
                    alt="Course Thumbnail"
                    fill
                    className='object-cover rounded-t-lg' />
            </div>
            <div className='flex flex-col px-4 gap-1 pb-6 bg-gray-100'>
                {/* Title */}
                <h3 className='text-lg pt-3 font-semibold'>{course?.name ?? "Bigener Adobe Illustrator for Graphic Design"}</h3>
                <span>{course?.excerpt}</span>
                {/* Cost */}
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <span className='text-blue-600 font-semibold'>{course?.origin_price_rendered || "600.000d"}</span>
                        <span className='text-gray-400 line-through'>{course?.price_rendered || "599.000d"}</span>
                    </div>
                    <span>Đã bán {course?.count_students || 0}</span>
                </div>
                {/* Selling */}
                <span className='px-3 py-1 bg-red-700 text-white absolute top-3 right-3 text-sm rounded-sm'>Giảm 80%</span>
            </div>
            {/* Sale */}
        </Link>
    )
}

export default CourseCard