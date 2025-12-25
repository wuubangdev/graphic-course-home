"use client";

import { useEffect, useState } from "react";

type Props = {
    footerSelector?: string;   // mặc định "footer"
    showAfter?: number;        // px scroll để hiện
};

export default function ButtonBuy({ footerSelector = "#site-footer", showAfter = 300 }: Props) {
    const [show, setShow] = useState(false);
    const [footerInView, setFooterInView] = useState(false);

    // hiện khi scroll đủ
    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > showAfter);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [showAfter]);

    // ẩn khi footer vào viewport
    useEffect(() => {
        const el = document.querySelector(footerSelector);
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => setFooterInView(entry.isIntersecting),
            { root: null, threshold: 0.01 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [footerSelector]);

    const visible = show && !footerInView;

    return (
        <div
            className={[
                "fixed left-1/2 z-50",
                "bottom-4 md:bottom-6",
                "transition-all duration-300 ease-out",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none",
            ].join(" ")}
            style={{ transform: "translateX(-50%)" }} // tránh class -translate-x-1/2 bị ảnh hưởng bởi translate-y
        >
            <div
                className={[
                    "flex items-center gap-3 p-2",
                    "rounded-2xl border border-white/30",
                    "bg-white/80 backdrop-blur",
                    "shadow-lg",
                    "max-w-[92vw]",
                ].join(" ")}
            >
                <button
                    className="flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.99] transition"
                >
                    {/* icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                        <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                        <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Z" clipRule="evenodd" />
                    </svg>
                    Mua ngay
                </button>

                <button
                    className="flex items-center gap-2 rounded-xl px-5 py-3 font-semibold border border-blue-500 text-blue-600 bg-white hover:bg-blue-600 hover:text-white active:scale-[0.99] transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592A3.752 3.752 0 0 0 4.5 17.25c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25Z" />
                    </svg>
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
}