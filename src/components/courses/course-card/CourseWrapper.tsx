import React from 'react'
import CourseCard from './CourseCard';
import { Course } from '@/lib/strapi-lib/api/category';

interface CourseWrapperProps {
    courses: Course[]
}

const CourseWrapper: React.FC<CourseWrapperProps> = async ({ courses }) => {

    return (
        <div className='mt-4 grid grid-cols-4 gap-8'>
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    )
}

export default CourseWrapper