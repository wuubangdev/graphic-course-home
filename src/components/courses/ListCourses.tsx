import React from 'react'
import CourseWrapper from './course-card/CourseWrapper';
import { Category, fetchCategories } from '@/lib/strapi-lib/api/category';
import Link from 'next/link';
import Image from 'next/image';
import { strapiMediaUrl } from '@/lib/strapi-lib/strapi';

const ListCourses = async () => {
    const res = await fetchCategories();
    const categories: Category[] = res.data;
    return (
        <section className='relative'>
            <div className='w-full flex flex-col'>
                {categories.map((category) => {
                    const courses = category.courses.slice(0, category.elementShow);
                    const bgImg = category.setBg ? strapiMediaUrl(category.setBg.url) : null;
                    return (
                        <div id={category.selector} key={category.documentId}
                            className='py-6 relative'
                        >
                            {category.setBg &&
                                <>
                                    <div className='absolute inset-0 -z-20'>
                                        <Image
                                            alt='bg-hero'
                                            src={bgImg || ""}
                                            fill
                                            className='object-cover'
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black/80 -z-10"></div>
                                </>
                            }
                            <div
                                className='py-6 w-full max-w-[1280px] mx-auto px-4 z-20'
                            >
                                <div className='flex justify-between'>
                                    <div className={`${bgImg ? 'text-white' : 'text-black'}`}>
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
                                <CourseWrapper courses={courses} isDarkMode={bgImg ? true : false} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default ListCourses