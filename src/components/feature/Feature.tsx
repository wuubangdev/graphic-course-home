import React from 'react'

const Feature = () => {
    return (
        <section className='pt-8'>
            <div className='w-[80%] px-4 mx-auto'>
                <div className='grid grid-cols-5 gap-4'>
                    <div
                        className='hover:-translate-y-0.5 duration-300 cursor-pointer px-8 py-6 text-xl text-center font-semibold bg-amber-400 rounded-lg text-white'
                    >
                        Đồ hoạ
                    </div>
                    <div
                        className='hover:-translate-y-0.5 duration-300 cursor-pointer px-8 py-6 text-xl text-center font-semibold bg-blue-600 rounded-lg text-white'
                    >
                        AI
                    </div>
                    <div
                        className='hover:-translate-y-0.5 duration-300 cursor-pointer px-8 py-6 text-xl text-center font-semibold bg-red-400 rounded-lg text-white'
                    >
                        Lập trình
                    </div>
                    <div
                        className='hover:-translate-y-0.5 duration-300 cursor-pointer px-8 py-6 text-xl text-center font-semibold bg-green-400 rounded-lg text-white'
                    >
                        Tài khoản
                    </div>
                    <div
                        className='hover:-translate-y-0.5 duration-300 cursor-pointer px-8 py-6 text-xl text-center font-semibold bg-blue-400 rounded-lg text-white'
                    >
                        Làm việc
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Feature;