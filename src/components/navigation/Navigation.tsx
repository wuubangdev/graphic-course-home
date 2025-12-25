'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import MenuItem from './MenuItem'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Navigation = () => {
    const router = useRouter();
    const [q, setQ] = useState("");

    function onSearch() {
        const keyword = q.trim();
        if (!keyword) return;

        const url = `/khoa-hoc?search=${encodeURIComponent(keyword)}&page=1`;
        router.push(url);
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") onSearch();
    }
    return (
        <section
            className='w-full px-4 bg-blue-500 z-50'

            style={{
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
            }}
        >
            <div
                className='mx-auto w-[80%]'
            >
                <div className='grid grid-cols-5 px-4'>
                    <div className='flex'>
                        {/* Logo */}
                        <Link href={"/"} className='aspect-video w-2/3 relative cursor-pointer'>
                            <Image
                                alt='logo'
                                src={'/footer/169Log.png'}
                                fill={true}
                                style={{ objectFit: 'contain' }}
                                className='w-full h-full hover:scale-105 duration-300'
                            />
                        </Link>
                    </div>
                    <div className='flex py-6 col-span-2 pr-8'>
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={onKeyDown}
                            type="text"
                            placeholder='Tìm kím sản phẩm'
                            className='bg-white flex-1 border-r-0 rounded-l px-4 py-2 focus:outline-none'
                        />
                        <div
                            onClick={onSearch}
                            className='bg-blue-800 rounded-r border-l-0 flex items-center justify-center px-2'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                className="size-6 text-white hover:text-gray-400 cursor-pointer duration-300"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                    </div>
                    <div className=' flex justify-center gap-1 items-center '>
                        <div className='p-2 rounded-full border-[1px] border-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className='text-white'>
                            <span className='px-2 py-1 hover:text-amber-500 duration-300 cursor-pointer'>Đăng nhập</span>/
                            <span className='px-2 py-1 hover:text-amber-500 duration-300 cursor-pointer'>Đăng ký</span>
                        </div>
                    </div>
                    {/* Right bar */}
                    <div className='flex justify-end items-center '>
                        <div className='cursor-pointer flex border-[1px] border-gray-300 rounded-md px-4 py-2 gap-2 group hover:shadow-sm'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                className="size-6 text-white group-hover:text-amber-500 duration-300"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <span className='text-white group-hover:scale-105 duration-300'>Giỏ hàng</span>
                            <div
                                className='rounded-full aspect-square px-2 flex justify-center duration-300
                                items-center bg-white group-hover:bg-amber-500 group-hover:text-white top-0 right-0 text-sm font-semibold'
                            >0</div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between px-4'>
                    <MenuItem
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>}
                        title='Thông tin về chúng tôi'
                        href='/gioi-thieu'
                    />
                    <MenuItem
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>}
                        title='Các bài viết phổ biến'
                        href='/blog'
                    />
                    <MenuItem
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                        </svg>
                        }
                        title='Sản phẩm mua nhiều'
                        href='#'
                    />
                    <MenuItem
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                        </svg>
                        }
                        title='Sản phẩm khuyến mại'
                        href='#'
                    />
                    <MenuItem
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                        </svg>
                        }
                        title='Hình thức thanh toán'
                        href='#'
                    />
                </div>
            </div>
        </section>
    )
}

export default Navigation