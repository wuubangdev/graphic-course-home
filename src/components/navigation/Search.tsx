'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Search = () => {
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
        <div className='flex items-center py-6 col-span-2'>
            <div className='bg-white flex flex-1 rounded-lg py-2 pl-4 border-gray-300 overflow-hidden text-sm'>
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onKeyDown={onKeyDown}
                    type="text"
                    placeholder='Nhập từ khoá tại đây...'
                    className='bg-white flex-1 rounded-lg px-4 2xl:py-2 focus:outline-none'
                />
                <div
                    onClick={onSearch}
                    className=' flex border-l-[2px] border-blue-500 items-center justify-center px-4 duration-300'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                        className="size-6 text-blue-500 hover:text-gray-600 cursor-pointer duration-300"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Search