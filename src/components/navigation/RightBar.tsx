import React from 'react'
import ButtonNav from '../util/ButtonNav'

const RightBar = () => {
    return (
        <div className='flex gap-3'>
            <div className='flex'>
                <input type="text" placeholder='Search For Couse...' className='border border-r-0 border-gray-300 rounded-l px-4 py-2 focus:outline-none' />
                <div className='border border-gray-300 rounded-r border-l-0 flex items-center justify-center px-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                        className="size-6 text-gray-400 hover:text-blue-600 cursor-pointer duration-300"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
            </div>
            <div className='flex items-center gap-2 ml-2 border-l-2 border-gray-300 pl-4'>
                <div className='pt-2 pr-4 relative cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                        className="size-9"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <div className='absolute rounded-full aspect-square bg-blue-600 px-2 flex justify-center items-center text-white top-0 right-0 text-sm'>0</div>
                </div>
                <ButtonNav label="Log In" type="outline" />
                <ButtonNav label="Try For Free" type="primary" />
            </div>
        </div>
    )
}

export default RightBar