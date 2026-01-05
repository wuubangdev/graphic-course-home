"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { useCart } from "@/components/card/CartProvider";

type Props = {
    footerSelector?: string; // mặc định "#site-footer"
    showAfter?: number; // px scroll để hiện
    course: {
        documentId: string; // CartItem.id
        title: string;
        price: number; // priceSale ?? priceOrigin
        image?: string | null;
    };
};

function formatVnd(n: number) {
    return new Intl.NumberFormat("vi-VN").format(Math.max(0, Math.floor(n || 0)));
}

export default function ButtonBuy({ footerSelector = "#site-footer", showAfter = 420, course }: Props) {
    const router = useRouter();
    const { addItem, items, totalQty } = useCart();
    const [api, contextHolder] = notification.useNotification();

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

        const io = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting), {
            root: null,
            threshold: 0.01,
        });

        io.observe(el);
        return () => io.disconnect();
    }, [footerSelector]);

    const visible = show && !footerInView;

    const inCart = useMemo(() => items.some((x) => x.id === course.documentId), [items, course.documentId]);

    function onAddToCart() {
        addItem({
            id: course.documentId,
            title: course.title,
            price: course.price,
            image: course.image || undefined,
            qty: 1,
        });

        api.success({
            message: inCart ? "Đã có trong giỏ" : "Đã thêm vào giỏ",
            description: course.title,
            placement: "topRight",
            duration: 1.6,
        });
    }

    function onBuyNow() {
        if (!inCart) onAddToCart();
        router.push("/cart");
    }

    return (
        <>
            {contextHolder}

            <div
                className={[
                    "fixed left-1/2 z-50",
                    "bottom-4 md:bottom-6",
                    "transition-all duration-300 ease-out",
                    visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none",
                ].join(" ")}
                style={{ transform: "translateX(-50%)" }}
            >
                <div
                    className={[
                        "max-w-[94vw] w-[860px]",
                        "rounded-2xl",
                        "border border-white/25",
                        "bg-white/75 backdrop-blur-xl",
                        "shadow-[0_18px_60px_rgba(0,0,0,0.18)]",
                        "px-3 py-3 md:px-4",
                    ].join(" ")}
                >
                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Left: price + title */}
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
                                    {formatVnd(course.price)} đ
                                </span>

                                {totalQty > 0 && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/90 px-2.5 py-1 text-xs font-semibold text-white">
                                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                                        Giỏ: {totalQty}
                                    </span>
                                )}
                            </div>

                            <div className="mt-1 truncate text-sm font-semibold text-slate-900">{course.title}</div>
                            <div className="mt-0.5 text-xs text-slate-600">
                                Thanh toán bằng chuyển khoản (Sepay) · Xác nhận tự động
                            </div>
                        </div>

                        {/* Right: actions */}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={onBuyNow}
                                className={[
                                    "group relative overflow-hidden",
                                    "rounded-xl px-4 py-3 md:px-5",
                                    "font-semibold text-white",
                                    "bg-gradient-to-b from-blue-600 to-blue-800",
                                    "shadow-[0_10px_22px_rgba(30,100,233,0.35)]",
                                    "hover:brightness-110 active:scale-[0.99] transition",
                                ].join(" ")}
                            >
                                <span className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                        <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Mua ngay
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={onAddToCart}
                                className={[
                                    "rounded-xl px-4 py-3 md:px-5",
                                    "font-semibold",
                                    "border border-blue-600/60",
                                    "text-blue-700 bg-white",
                                    "hover:bg-blue-600 hover:text-white hover:border-blue-600",
                                    "active:scale-[0.99] transition",
                                ].join(" ")}
                            >
                                <span className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592A3.752 3.752 0 0 0 4.5 17.25c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25Z" />
                                    </svg>
                                    {inCart ? "Đã có" : "Thêm giỏ"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
