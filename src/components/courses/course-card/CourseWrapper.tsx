import { fetch8LearnPressCourses, LpCourse } from '@/lib/learnpress';
import React from 'react'
import CourseCard from './CourseCard';
import Link from 'next/link';

interface CourseWrapperProps {
    categoryId?: number;
}

const CourseWrapper: React.FC<CourseWrapperProps> = async ({ categoryId }) => {
    const courses: LpCourse[] = await fetch8LearnPressCourses({
        baseUrl: process.env.WP_BASE_URL!,
        category: categoryId?.toString() || "0",
    });
    return (
        <div>
            <div className='mt-4 grid grid-cols-4 gap-8'>
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
            {courses.length === 8 &&
                <div className='flex justify-center mt-4'>
                    <Link
                        href={"/khoa-hoc?category=" + categoryId}
                        className='py-1 px-4 border border-gray-200 text-white hover:opacity-70
                         duration-200 rounded-2xl bg-blue-600 '>
                        Xem tất cả
                    </Link>
                </div>
            }
        </div>
    )
}

export default CourseWrapper