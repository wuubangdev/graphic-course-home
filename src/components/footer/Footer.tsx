import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <section className=' mt-4 pb-1 '>
            <div className='container mx-auto border-t-2 border-black bg-gray-100'>
                {/* Payment */}
                <div className='py-3 flex gap-2 bg-white px-3'>
                    <img alt='momo' src={'/footer/MOMOO.png'} className='hover:scale-105 duration-300 cursor-pointer h-10 w-auto' />
                    <img alt='VNPAY' src={'/footer/VNPAY.png'} className='hover:scale-105 duration-300 cursor-pointer h-10 w-auto' />
                    <img alt='VISA' src={'/footer/visa.png'} className='hover:scale-105 duration-300 cursor-pointer h-10 w-auto' />
                    <img alt='ATM' src={'/footer/atm.png'} className='hover:scale-105 duration-300 cursor-pointer h-10 w-auto' />
                </div>
                {/* Social */}
                <div className='py-3 flex items-center gap-2 border-b-[1px] px-3 border-gray-400'>
                    <img alt='FACEBOOK' src={'/footer/facebook.png'} className='hover:scale-105 duration-300 cursor-pointer h-8 w-auto' />
                    <img alt='ZALO' src={'/footer/zalo.webp'} className='hover:scale-105 duration-300 cursor-pointer h-8 w-auto' />
                    <img alt='YTB' src={'/footer/Youtube.png'} className='hover:scale-105 duration-300 cursor-pointer h-10 w-auto' />
                </div>
                {/* FAQ */}
                <div className='flex w-full py-6'>
                    <div className='w-3/4 grid grid-cols-3 px-4'>
                        {/* Introduction */}
                        <div
                            className='flex flex-col gap-1'
                        >
                            <h3 className='uppercase font-semibold'>Giới thiệu</h3>
                            <span className='hover:opacity-70 hover:underline duration-300 cursor-pointer'>Game bản quyền là gì?</span>
                            <span className='hover:opacity-70 hover:underline duration-300 cursor-pointer'>Giới thiệu Khoá học đồ hoạ</span>
                            <span className='hover:opacity-70 hover:underline duration-300 cursor-pointer'>Điều khoản dịch vụ</span>
                            <span className='hover:opacity-70 hover:underline duration-300 cursor-pointer'>Chính sách bảo mật</span>
                        </div>
                        {/* Account */}
                        <div
                            className='flex flex-col gap-1'
                        >
                            <h3 className='uppercase font-semibold'>Tài khoản</h3>
                            <span className='hover:opacity-70 hover:underline duration-300 cursor-pointer'>Đăng nhập</span>
                            <span className='hover:opacity-70 hover:underline duration-300 cursor-pointer'>Đăng ký</span>
                        </div>
                        {/* Contact */}
                        <div
                            className='flex flex-col gap-1'
                        >
                            <h3 className='uppercase font-semibold'>Liên hệ</h3>
                            <span className='hover:opacity-70 hover:underline duration-300 cursor-pointer'>Hotline tự động</span>
                            <span className='hover:opacity-70 hover:underline duration-300 cursor-pointer'>Liên hệ hỗ trợ</span>
                            <span className='hover:opacity-70 hover:underline duration-300 cursor-pointer'>Chat với CSKH</span>
                        </div>
                    </div>
                    <div className='w-1/4 flex justify-center'>
                        <div className='aspect-square w-1/2 relative overflow-hidden'>
                            <Image src={'/footer/dmca.png'} alt='dmca-logo' fill className='object-cover w-full h-full' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer