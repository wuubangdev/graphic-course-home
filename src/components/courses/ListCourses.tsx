import React from 'react'
import CourseWrapper from './course-card/CourseWrapper';
import { Category, fetchCategories } from '@/lib/strapi-lib/api/category';
import Link from 'next/link';

const ListCourses = async () => {
    const res = await fetchCategories();
    const categories: Category[] = res.data;
    return (
        <section className='py-6 relative'>
            <div className='max-w-[1280px] px-4 mx-auto z-20 flex flex-col gap-4'>
                {categories.map((category) => {
                    const courses = category.courses.slice(0, category.elementShow);
                    return (
                        <div key={category.documentId} className='py-6'>
                            <div className='flex justify-between'>
                                <div>
                                    <h1 style={{ fontWeight: 700 }} className='mt-3 text-xl'>
                                        {category.title}
                                    </h1>
                                    <p>{category.description}</p>
                                </div>
                                <div>
                                    <Link
                                        href={`/courses/${category.documentId}`}
                                        className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 duration-300'
                                    >
                                        Xem thêm
                                    </Link>
                                </div>
                            </div>
                            <CourseWrapper courses={courses} />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default ListCourses