import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer id="site-footer" className='pt-28 pb-1 bg-blue-900 text-[#b2bdcd]'>
            <div className='container mx-auto px-4 text-center'>
                <div className='grid grid-cols-3'>
                    <div className='flex flex-col items-center gap-2'>
                        <Link href={'/'} className='w-1/2 aspect-video relative cursor-pointer overflow-hidden'>
                            <Image
                                alt='logo'
                                src={'/footer/169Log.png'}
                                fill={true}
                                style={{ objectFit: 'contain' }}
                                className='w-full h-full hover:scale-105 duration-300'
                            />
                        </Link>
                        {/* <p className='text-justify'>when an unknown printer took galley of type and scrambled it to make pspecimen bookt has.</p> */}
                        <p className='text-justify text-white font-semibold cursor-pointer hover:text-red-700 hover:translate-x-1 duration-300'>khoahocdohoa@gmail.com</p>
                        <p className='text-justify text-white font-semibold cursor-pointer hover:text-red-700 hover:translate-x-1 duration-300'>+84 123 456 789</p>
                        <div className='flex items-center gap-3'>
                            <Link href={""} target='_blank' className='group' >
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256" className='scale-75 group-hover:scale-90 duration-500'>
                                    <g fill="#ffffff" fillRule="nonzero" stroke="none"
                                        strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
                                        strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none"
                                        fontSize="none">
                                        <g transform="scale(5.33333,5.33333)">
                                            <path d="M20.5,46c-1.378,0 -2.5,-1.121 -2.5,-2.5v-17.5l-4.45,0.003c-1.367,0 -2.489,-1.11 -2.501,-2.476l-0.029,-3.003c-0.006,-0.673 0.25,-1.306 0.724,-1.783c0.472,-0.478 1.103,-0.741 1.776,-0.741h4.48v-4.5c0,-6.746 3.442,-10.462 9.691,-10.462c2.472,0 4.63,0.175 4.65,0.177c0.965,0.086 1.691,0.88 1.691,1.847v4.57c0,1.022 -0.832,1.854 -1.854,1.854h-2.908c-1.217,0 -2.208,0.99 -2.208,2.208l-0.056,4.306h4.438c0.713,0 1.393,0.306 1.867,0.838c0.474,0.532 0.699,1.243 0.616,1.951l-0.349,3c-0.146,1.261 -1.214,2.211 -2.482,2.211h-4.096v17.5c0,1.379 -1.122,2.5 -2.5,2.5z"></path></g></g>
                                </svg>
                            </Link>
                            <Link href={""} target='_blank' className='group' >
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256" className='scale-75 group-hover:scale-90 duration-500'>
                                    <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
                                        strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" ><g transform="scale(5.12,5.12)"><path d="M8,3.00977c-3.47,0 -5.99023,2.07945 -5.99023,4.93945c0,2.87 2.58023,5.04102 5.99023,5.04102c3.47,0 5.99023,-2.11961 5.99023,-5.09961c-0.16,-2.87 -2.63023,-4.88086 -5.99023,-4.88086zM3,15c-0.55,0 -1,0.45 -1,1v29c0,0.55 0.45,1 1,1h10c0.55,0 1,-0.45 1,-1v-29c0,-0.55 -0.45,-1 -1,-1zM18,15c-0.55,0 -1,0.45 -1,1v29c0,0.55 0.45,1 1,1h9c0.552,0 1,-0.448 1,-1v-15v-0.25v-0.25c0,-2.37 1.82062,-4.30047 4.14063,-4.48047c0.12,-0.02 0.23938,-0.01953 0.35938,-0.01953c0.12,0 0.23938,-0.00047 0.35938,0.01953c2.32,0.18 4.14063,2.11047 4.14063,4.48047v15.5c0,0.552 0.448,1 1,1h9c0.55,0 1,-0.45 1,-1v-17c0,-6.47 -3.47094,-13 -11.21094,-13c-3.52,0 -6.17906,1.36023 -7.78906,2.49023v-1.49023c0,-0.55 -0.45,-1 -1,-1z"></path></g></g>
                                </svg>
                            </Link>
                            <Link href={""} target='_blank' className='group' >
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0,0,256,256" className='scale-75 group-hover:scale-90 duration-500'>
                                    <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray=""
                                        strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none"><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,8.96 -5.88,16.54 -14,19.08v-5.08c0,-1.71 -0.72,-3.24 -1.86,-4.34c5.24,-0.95 7.86,-4 7.86,-9.66c0,-2.45 -0.5,-4.39 -1.48,-5.9c0.44,-1.71 0.7,-4.14 -0.52,-6.1c-2.36,0 -4.01,1.39 -4.98,2.53c-1.45,-0.35 -3.12,-0.53 -5.02,-0.53c-1.8,0 -3.46,0.2 -4.94,0.61c-0.96,-1.15 -2.64,-2.61 -5.06,-2.61c-1.42,2.28 -0.84,4.74 -0.3,6.12c-1.08,1.51 -1.7,3.45 -1.7,5.88c0,5.66 2.62,8.71 7.86,9.66c-0.67,0.65 -1.19,1.44 -1.51,2.34h-2.35c-1.44,0 -2,-0.64 -2.77,-1.68c-0.77,-1.04 -1.6,-1.74 -2.59,-2.03c-0.53,-0.06 -0.89,0.37 -0.42,0.75c1.57,1.13 1.68,2.98 2.31,4.19c0.57,1.09 1.75,1.77 3.08,1.77h2.39v4.08c-8.12,-2.54 -14,-10.12 -14,-19.08c0,-11.05 8.95,-20 20,-20c11.05,0 20,8.95 20,20z"></path></g></g>
                                </svg>
                            </Link>
                            <Link href={""} target='_blank' className='group' >
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256" className='scale-75 group-hover:scale-90 duration-500'>
                                    <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0"
                                        fontFamily="none" fontWeight="none" fontSize="none" ><g transform="scale(5.12,5.12)"><path d="M16,3c-7.17,0 -13,5.83 -13,13v18c0,7.17 5.83,13 13,13h18c7.17,0 13,-5.83 13,-13v-18c0,-7.17 -5.83,-13 -13,-13zM37,11c1.1,0 2,0.9 2,2c0,1.1 -0.9,2 -2,2c-1.1,0 -2,-0.9 -2,-2c0,-1.1 0.9,-2 2,-2zM25,14c6.07,0 11,4.93 11,11c0,6.07 -4.93,11 -11,11c-6.07,0 -11,-4.93 -11,-11c0,-6.07 4.93,-11 11,-11zM25,16c-4.96,0 -9,4.04 -9,9c0,4.96 4.04,9 9,9c4.96,0 9,-4.04 9,-9c0,-4.96 -4.04,-9 -9,-9z"></path></g></g>
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                        <h2 className='text-2xl font-semibold mb-2 text-white'>CHÍNH SÁCH & BẢO MẬT</h2>
                        <ul className='flex flex-col'>
                            <li className='cursor-pointer hover:text-white text-lg duration-300'>Giới thiệu về trang web</li>
                            <li className='cursor-pointer hover:text-white text-lg duration-300'>Điều khoản dịch vụ</li>
                            <li className='cursor-pointer hover:text-white text-lg duration-300'>Chính sách bảo mật</li>
                            <li className='cursor-pointer hover:text-white text-lg duration-300'>Liên hệ hỗ trợ</li>
                            <li className='cursor-pointer hover:text-white text-lg duration-300'>Chat với CSKH</li>
                        </ul>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <h2 className='text-2xl font-semibold mb-3 text-white uppercase'>Hỗ trợ thanh toán</h2>
                        <div className='flex gap-2 justify-between'>
                            <div className='grid grid-cols-4 gap-4'>
                                <div className='rounded-lg overflow-hidden hover:scale-115 duration-300'>
                                    <Image src='/footer/momo.png' alt='momo' width={38} height={38} className='cursor-pointer' />
                                </div>
                                <div className='bg-white rounded-lg overflow-hidden hover:scale-115 duration-300'>
                                    <Image src='/footer/visa.png' alt='visa' width={38} height={38} className='cursor-pointer' />
                                </div>
                                <div className='rounded-lg overflow-hidden hover:scale-115 duration-300'>
                                    <Image src='/footer/atm.png' alt='atm' width={38} height={38} className='cursor-pointer' />
                                </div>
                                <div className='rounded-lg overflow-hidden hover:scale-115 duration-300 h-[38px]'>
                                    <Image src='/footer/atm.png' alt='atm' width={38} height={38} className='cursor-pointer' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className='mt-6 pt-2 border-t-[1px] border-dashed border-gray-100/30'>&copy; 2024 Graphic Course. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer