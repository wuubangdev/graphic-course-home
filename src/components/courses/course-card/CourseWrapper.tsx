import { fetchAllLearnPressCourses, LpCourse } from '@/lib/learnpress';
import React from 'react'
import CourseCard from './CourseCard';

interface CourseWrapperProps {
    categoryId?: number;
}

const CourseWrapper: React.FC<CourseWrapperProps> = async ({ categoryId }) => {
    const courses: LpCourse[] = await fetchAllLearnPressCourses({
        baseUrl: process.env.WP_BASE_URL!,
        category: categoryId?.toString() || "0",
    });
    return (
        <div className='mt-4 grid grid-cols-4 gap-8'>
            {courses.map(course => (
                <CourseCard key={course.id} courseId={course.id} />
            ))}
        </div>
    )
}

export default CourseWrapper