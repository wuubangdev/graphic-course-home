import React from 'react'
import CourseCard from './course-card/CourseCard'
import Image from 'next/image'

const ListCourses = () => {
    return (
        <section className='pt-28 pb-24 relative'>
            <div className='container px-4 mx-auto z-20'>
                {/* Heading */}
                <div className='grid grid-cols-3'>
                    <div className='flex flex-col items-start'>
                        <p className='px-4 py-2 bg-blue-100 text-blue-600 rounded mb-4 font-semibold'>10,000+ Khóa học online khác nhau</p>
                        <h1 className='text-4xl font-semibold'>Các <span className='text-blue-600'>Khóa Học</span> Chính</h1>
                    </div>
                    <div className='flex justify-end items-end col-span-2'>
                        <div className='flex gap-9'>
                            <button className='hover:text-blue-600 font-semibold text-gray-600 cursor-pointer duration-300'>Sale/nổi bật</button>
                            <button className='hover:text-blue-600 font-semibold text-gray-600 cursor-pointer duration-300'>Bán chạy nhất</button>
                            <button className='hover:text-blue-600 font-semibold text-gray-600 cursor-pointer duration-300'>Khóa 2D</button>
                            <button className='hover:text-blue-600 font-semibold text-gray-600 cursor-pointer duration-300'>Khóa 3D</button>
                            <button className='hover:text-blue-600 font-semibold text-gray-600 cursor-pointer duration-300'>Khóa Lập Trình</button>
                            <button className='hover:text-blue-600 font-semibold text-gray-600 cursor-pointer duration-300'>Khóa AI</button>
                            <button className='hover:text-blue-600 font-semibold text-gray-600 cursor-pointer duration-300'>Tài Khoản</button>
                        </div>
                    </div>
                </div>
                {/* Course List */}
                <h2 className='mt-6 font-semibold text-xl px-3 py-1 bg-blue-600 text-white rounded-sm inline-block'>Khóa học đang sale nỗi bật</h2>
                <div className='mt-4 grid grid-cols-4 gap-8'>
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </div>
                <hr className='mt-4 border-gray-300' />
                {/*  */}
                <h2 className='mt-6 font-semibold text-xl px-3 py-1 bg-blue-600 text-white rounded-sm inline-block'>Bán chạy nhất</h2>
                <div className='mt-4 grid grid-cols-4 gap-8'>
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </div>
                <hr className='mt-4 border-gray-300' />
                {/*  */}
                <h2 className='mt-6 font-semibold text-xl px-3 py-1 bg-blue-600 text-white rounded-sm inline-block'>Khóa 2D</h2>
                <div className='mt-4 grid grid-cols-4 gap-8'>
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </div>
                <hr className='mt-4 border-gray-300' />
                {/*  */}
                <h2 className='mt-6 font-semibold text-xl px-3 py-1 bg-blue-600 text-white rounded-sm inline-block'>Khóa 3D</h2>
                <div className='mt-4 grid grid-cols-4 gap-8'>
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </div>
                <hr className='mt-4 border-gray-300' />
                {/*  */}
                <h2 className='mt-6 font-semibold text-xl px-3 py-1 bg-blue-600 text-white rounded-sm inline-block'>Khóa Lập Trình</h2>
                <div className='mt-4 grid grid-cols-4 gap-8'>
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </div>
                <hr className='mt-4 border-gray-300' />
                {/*  */}
                <h2 className='mt-6 font-semibold text-xl px-3 py-1 bg-blue-600 text-white rounded-sm inline-block'>Khóa AI</h2>
                <div className='mt-4 grid grid-cols-4 gap-8'>
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </div>
                <hr className='mt-4 border-gray-300' />
                {/*  */}
                <h2 className='mt-6 font-semibold text-xl px-3 py-1 bg-blue-600 text-white rounded-sm inline-block'>Mua Tài Khoản</h2>
                <div className='mt-4 grid grid-cols-4 gap-8'>
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </div>
            </div>
            <div className='absolute aspect-square top-44 left-0 w-1/16 animate-[bounce_3s_ease-in-out_infinite] -z-10'>
                {/* Arrow */}
                <Image
                    alt='hero-image-icon4'
                    src={'/hero/bshape_01.png'}
                    fill
                    className='object-contain object-center'
                />
            </div>
            <div className='absolute aspect-square top-2/3 right-10 w-1/16 animate-[bounce_3s_ease-in-out_infinite] -z-10'>
                {/* Rain */}
                <Image
                    alt='hero-image-icon4'
                    src={'/hero/bshape_02.png'}
                    fill
                    className='object-contain object-center'
                />
            </div>
        </section>
    )
}

export default ListCourses