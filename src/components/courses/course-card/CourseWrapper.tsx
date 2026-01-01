import React from 'react'
import CourseCard from './CourseCard';
import { Course } from '@/lib/strapi-lib/api/course';

interface CourseWrapperProps {
    courses: Course[];
    isDarkMode?: boolean;
}

const CourseWrapper: React.FC<CourseWrapperProps> = async ({ courses, isDarkMode }) => {

    return (
        <div className='mt-4 grid grid-cols-4 gap-8'>
            {courses.map(course => (
                <CourseCard key={course.id} course={course} isDarkMode={isDarkMode} />
            ))}
        </div>
    )
}

export default CourseWrapper