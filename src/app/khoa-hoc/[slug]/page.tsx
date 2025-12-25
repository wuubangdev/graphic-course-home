import ButtonBuy from '@/components/popup/ButtonBuy';
import RichContent from '@/components/util/RichContent';
import { fetchLearnPressCourse, LpCourse } from '@/lib/learnpress';
import { extractIdFromSlug, toSlug } from '@/lib/slug';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'


type Props = {
    params: { slug: string };
};

const page = async ({ params }: Props) => {
    const { slug } = await params;
    const id = extractIdFromSlug(slug);
    if (!id) {
        // slug không đúng format, cho 404
        notFound();
    }

    const course: LpCourse = await fetchLearnPressCourse({
        baseUrl: process.env.WP_BASE_URL!,
        id: id || 0,
    });

    return (
        <div className='w-full'>
            <section className="relative overflow-hidden bg-[#0049d9] text-white min-h-screen">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0049d9] via-[#0049d9]/60 to-[#00153a]" />
                <div className="relative max-w-6xl mx-auto px-4 py-12">
                    <div className="max-w-3xl space-y-2">
                        <p className="text-xs uppercase tracking-[0.25em] text-blue-100">
                            Trang Giới Thiệu
                        </p>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                            {course?.name || "NAN"}
                        </h1>
                        <h2 className="text-base md:text-lg text-blue-100 leading-relaxed">
                            Khai phá toàn bộ tiềm năng sáng tạo với hệ sinh thái đào tạo 3D,
                            VFX và Phát triển Game chuyên sâu và toàn diện nhất Việt Nam.
                        </h2>
                        <div className='w-1/2 aspect-[21/9] relative mb-6'>
                            <Image alt='carousel' src={course.image || ""} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex gap-1 items-center'>
                                <span className='text-2xl font-semibold'>{course.price_rendered}</span>
                            </div>
                            <div className='flex gap-2 items-end'>
                                <div className='text-gray-400 text-2xl line-through'>{course.origin_price_rendered}</div>
                                {course.sale_price !== 0 &&
                                    <span className='px-2 py-1 text-white text-sm rounded-md bg-red-700'>Sale</span>
                                }
                            </div>
                        </div>
                        <div className='py-3 border-t-[1px] border-gray-300 flex gap-2'>
                            <button
                                className='border-[1px] rounded-md px-8 py-3 bg-blue-600 text-white flex gap-1
                                    hover:bg-blue-400 duration-300 cursor-pointer'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                    <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                </svg>
                                Mua ngay
                            </button>
                            <button
                                className='border-[1px] border-blue-500 text-blue-600 rounded-md px-8 py-3 
                                    flex gap-1 hover:bg-blue-400 bg-white hover:text-white duration-300 cursor-pointer'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                                </svg>
                                Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 border border-white/15 bg-white/5 backdrop-blur rounded-2xl px-4 py-4">
                        {/* <p className="text-xs uppercase tracking-[0.25em] text-blue-100 mb-3">
                            Các thống kê nỗi bật
                        </p> */}
                        <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm">
                            <div className='flex gap-1 text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                </svg>
                                <p>Số lượng đã mua: <span className='text-white'>{course.count_students}</span></p>
                            </div>
                            <div className='flex gap-1 text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                                </svg>
                                <p>Mã sản phẩm:
                                    &nbsp;
                                    <span className='text-white'>{toSlug(course.name || "")}</span>
                                </p>
                            </div>
                            <div className='flex gap-1 text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                                </svg>
                                <p>Thể loại:
                                    &nbsp;
                                    {course?.categories && course?.categories.length > 0 &&
                                        course.categories.map((cat) => (
                                            <span key={cat.id} className='text-white'>{cat.name}; </span>
                                        ))
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <main className="max-w-6xl mx-auto px-4 py-6 space-y-16 lg:space-y-20">
                <RichContent html={course?.content || ""} />
            </main>
            <ButtonBuy />
        </div>
    )
}

export default page