import CustomCarousel from '@/components/carousel/CustomCarousel'
import { CopyUrlButton } from '@/components/util/CopyUrlButton';
import { fetchLearnPressCourse, LpCourse } from '@/lib/learnpress';
import { extractIdFromSlug, toSlug } from '@/lib/slug';
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
        <section className='w-full'>
            <div
                className='mx-auto container px-4 flex flex-col gap-4'
            >
                <div className='border-t-[1px] border-gray-400 py-8 grid grid-cols-3'>
                    <div className='px-4'>
                        <div className='w-full aspect-video rounded-2xl overflow-hidden'>
                            <CustomCarousel listImage={[course.image, course.image]} />
                        </div>
                        <p className='text-center py-2 italic text-blue-600'>Xem thêm ảnh</p>
                    </div>
                    <div className='col-span-2 grid grid-cols-3'>
                        <div className='col-span-2 px-4 flex flex-col gap-1'>
                            <h4 className='text-gray-400 text-sm'>Sản phẩm</h4>
                            <h2 className='text-2xl font-semibold'>{course?.name || "NAN"}</h2>
                            <div className='flex gap-1 text-gray-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                </svg>
                                <p>Số lượng đã mua: <span className='text-green-400'>{course.count_students}</span></p>
                            </div>
                            <div className='flex gap-1 text-gray-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                                </svg>
                                <p>Mã sản phẩm:
                                    &nbsp;
                                    <span className='text-black'>{toSlug(course.name || "")}</span>
                                </p>
                            </div>
                            <div className='flex gap-1 text-gray-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                                </svg>
                                <p>Thể loại:
                                    &nbsp;
                                    {course?.categories && course?.categories.length > 0 &&
                                        course.categories.map((cat) => (
                                            <span key={cat.id} className='text-blue-600'>{cat.name}; </span>
                                        ))
                                    }
                                </p>
                            </div>
                            <div className='flex gap-1 items-center'>
                                <span className='text-2xl font-semibold'>{course.price_rendered}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    className="size-6 text-gray-400"
                                >
                                    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    className="size-6 text-gray-400"
                                >
                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                </svg>
                            </div>
                            <div className='flex gap-2 items-center py-2'>
                                <div className='text-gray-400 text-lg line-through'>{course.origin_price_rendered}</div>
                                {course.sale_price !== 0 &&
                                    <span className='px-2 py-1 text-white text-sm rounded-md bg-red-700'>Sale</span>
                                }
                            </div>
                            {/* <div className='py-3 border-t-[1px] border-gray-300'>
                                <div className='text-lg font-semibold'>Chọn gói sản phẩm</div>
                                <button
                                    className='border-[1px] rounded-md px-2 text-sm border-gray-300 text-gray-500 mr-1 mt-1'
                                >
                                    Ultra (1 tháng)
                                </button>
                                <button
                                    className='border-[1px] rounded-md px-2 text-sm border-gray-300 text-gray-500 mr-1 mt-1'
                                >
                                    Ultra Không Credit (1 tháng)
                                </button>
                                <button
                                    className='border-[1px] rounded-md px-2 text-sm border-gray-300 text-gray-500 mr-1 mt-1'
                                >
                                    Pro (1 tháng)
                                </button>
                                <button
                                    className='border-[1px] rounded-md px-2 text-sm border-gray-300 text-gray-500 mr-1 mt-1'
                                >
                                    Pro (6 tháng)
                                </button>
                                <button
                                    className='border-[1px] rounded-md px-2 text-sm border-gray-300 text-gray-500 mr-1 mt-1'
                                >
                                    Pro (1 năm)
                                </button>
                            </div> */}
                            <div className='py-3 border-t-[1px] border-gray-300 flex gap-2'>
                                <button
                                    className='border-[1px] rounded-md px-8 py-3 bg-blue-600 text-white flex gap-1
                                    hover:bg-gray-200 hover:text-blue-600 duration-300 cursor-pointer'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                        <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                    </svg>

                                    Mua ngay
                                </button>
                                <button
                                    className='border-[1px] border-blue-500 text-blue-600 rounded-md px-8 py-3 
                                    flex gap-1 hover:bg-blue-400 hover:text-white duration-300 cursor-pointer'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                                    </svg>
                                    Thêm vào giỏ
                                </button>
                            </div>
                        </div>
                        <div>
                            <p className='font-semibold text-lg'>Giới thiệu bạn bè</p>
                            <p className='text-sm italic py-1'>Giảm giá 5% cho bạn bè được giới thiệu.</p>
                            <div className='flex gap-1'>
                                <div className='px-2 py-1 border-[1px] border-gray-400 rounded-md italic text-gray-500'>https://khoahocdohoa.vn</div>
                                <CopyUrlButton />
                                {/* <button className='border-[1px] rounded-md px-2 bg-blue-500 text-white cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                                    </svg>
                                </button> */}
                                {/* <button className='border-[1px] rounded-md border-gray-500 text-blue-500 px-2 cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                                    </svg>

                                </button> */}
                            </div>
                            <span className='text-sm text-blue-500'>Xem chi tiết</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page