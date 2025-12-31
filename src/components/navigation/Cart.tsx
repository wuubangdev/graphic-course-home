'use client'
import React from 'react'
import { useCart } from '../card/CartProvider';
import Link from 'next/link';

const Cart = () => {
    const { totalQty } = useCart();

    return (
        <Link href="/cart" className="flex justify-center items-center relative">
            <div className="cursor-pointer flex items-center text-white border-white border-[1px] rounded-md duration-300 px-2 py-1 gap-2 hover:bg-blue-700 hover:shadow-sm relative">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path d='M16.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M3.71 5.4h15.214c1.378 0 2.373 1.27 1.995 2.548l-1.654 5.6C19.01 14.408 18.196 15 17.27 15H8.112c-.927 0-1.742-.593-1.996-1.452zm0 0L3 3' />
                </svg>
                {/* badge */}
                {totalQty > 0 &&
                    <div
                        className={[
                            "absolute rounded-full aspect-square px-2 flex justify-center items-center",
                            "bg-white text-sm -top-3 -right-3 duration-300",
                            totalQty > 0 ? "text-blue-700" : "text-gray-400",
                        ].join(" ")}
                        aria-label={`Cart items: ${totalQty}`}
                    >
                        {totalQty > 99 ? "99+" : totalQty}
                    </div>
                }
            </div>
        </Link>
    )
}

export default Cart