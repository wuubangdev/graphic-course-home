import React, { Fragment } from 'react'
import { fetchAllCourseCategories, LpCourseCategoryTerm } from '@/lib/course_category';
import CourseWrapper from './course-card/CourseWrapper';

const ListCourses = async () => {
    const categories: LpCourseCategoryTerm[] = await fetchAllCourseCategories({
        baseUrl: process.env.WP_BASE_URL!,
    });
    return (
        <section className='pt-8 pb-24 relative mt-80'>
            <div className='container px-4 mx-auto z-20'>
                {/* Heading */}
                <div className='grid grid-cols-3'>
                    <div className='flex flex-col items-start'>
                        {/* <p className='px-4 py-2 bg-blue-100 text-blue-600 rounded mb-4 font-semibold'>10,000+ Khóa học online khác nhau</p> */}
                        <h1 className='text-3xl font-semibold'>Các <span className='text-blue-600'>Khóa Học</span> Chính</h1>
                    </div>
                    <div className='flex justify-end items-end col-span-2'>
                        <div className='flex gap-9'>
                            {categories.map((category) => {
                                if (category.parent === 0) {
                                    return (
                                        <button
                                            key={category.id}
                                            className='hover:text-blue-600 font-semibold text-gray-600 cursor-pointer duration-300'>
                                            {category.name}
                                        </button>
                                    )
                                }
                            })}

                        </div>
                    </div>
                </div>
                {/* Course List */}
                {categories.map((category) => {
                    if (category.parent === 0) {
                        return (
                            <Fragment key={category.id}>
                                <h2 className='mt-6 font-semibold  px-3 py-1 bg-blue-600 text-white rounded-sm inline-block'>
                                    {category.name}
                                </h2>
                                <CourseWrapper categoryId={category.id} />
                                <hr className='mt-4 border-gray-300' />
                            </Fragment>
                        )
                    }
                })}
            </div>
        </section>
    )
}

export default ListCourses