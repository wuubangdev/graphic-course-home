import Image from 'next/image'
import React from 'react'

const CourseCard = () => {
    return (
        <div className='flex flex-col gap-4 relative cursor-pointer hover:-translate-y-1 duration-300'
            style={{
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
            }}
        >
            {/* Thumbnail */}
            <div className='w-full aspect-video relative bg-amber-200'>
                <Image
                    src="/courses/course_thumb01.jpg"
                    alt="Course Thumbnail"
                    fill
                    className='object-cover rounded-t-lg' />
            </div>
            <div className='flex flex-col px-4 gap-3 pb-6 bg-gray-100'>
                {/* Title */}
                <h3 className='text-xl font-semibold'>Bigener Adobe Illustrator for Graphic Design</h3>
                {/* Cost */}
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <span className='text-blue-600 font-semibold'>399.000đ</span>
                        <span className='text-gray-400 line-through'>599.000đ</span>
                    </div>
                    <span>Đã bán 456</span>
                </div>
                {/* Selling */}
                <span className='px-3 py-1 bg-red-700 text-white absolute top-3 right-3 text-sm rounded-sm'>Giảm 80%</span>
            </div>
            {/* Sale */}
        </div>
    )
}

export default CourseCard