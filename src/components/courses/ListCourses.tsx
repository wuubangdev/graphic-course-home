import React from 'react'
import { Category, fetchCategories } from '@/lib/strapi-lib/api/category';
import { strapiMediaUrl } from '@/lib/strapi-lib/strapi';
import CourseSection from './CourseSection';

const ListCourses = async () => {
    const res = await fetchCategories();
    const categories: Category[] = res.data;
    return (
        <section className='relative'>
            <div className='w-full flex flex-col'>
                {categories.map((category) => {
                    const courses = category.courses.slice(0, category.elementShow);
                    const bgImg = category.setBg ? strapiMediaUrl(category.setBg.url) : null;
                    if (bgImg) {
                        return (
                            <CourseSection
                                key={category.documentId}
                                theme="dark"
                                title={category.title}
                                subtitle={category.description}
                                viewMoreHref="/khoa-hoc"
                                items={courses}
                                backgroundImage={bgImg}
                                selector={category.selector}
                            />
                        )
                    }
                    return (
                        <CourseSection
                            key={category.documentId}
                            theme="light"
                            title={category.title}
                            subtitle={category.description}
                            viewMoreHref="/khoa-hoc"
                            items={courses}
                            selector={category.selector}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default ListCourses