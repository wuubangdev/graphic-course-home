import React, { Fragment } from 'react'
import CourseWrapper from './course-card/CourseWrapper';
import { Category, fetchCategories } from '@/lib/strapi-lib/api/category';

const ListCourses = async () => {
    const res = await fetchCategories();
    const categories: Category[] = res.data;
    return (
        <section className='pt-8 pb-24 relative'>
            <div className='w-[80%] px-4 mx-auto z-20'>
                {categories.map((category) => {
                    return (
                        <Fragment key={category.id}>
                            <div className='flex justify-center'>
                                <h2 className='mt-3 font-semibold text-center px-3 py-1 bg-blue-500 text-white rounded-lg'>
                                    {category.title}
                                </h2>
                            </div>
                            <CourseWrapper categoryId={category.id} />
                            <hr className='mt-4 border-gray-300' />
                        </Fragment>
                    )
                })}
            </div>
        </section>
    )
}

export default ListCourses