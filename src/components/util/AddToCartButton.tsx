"use client";

import { notification } from "antd";
import { AddToCartPayload } from "../card/cartTypes";
import { useCart } from "../card/CartProvider";

type Props = {
    item: AddToCartPayload;
    className?: string;
};

export default function AddToCartButton({ item, className }: Props) {
    const { addItem } = useCart();
    const [api, contextHolder] = notification.useNotification();

    return (
        <>
            {contextHolder}
            <button
                type="button"
                onClick={() => {
                    addItem(item);
                    api.success({
                        message: "Đã thêm vào giỏ",
                        description: item.title,
                        placement: "topRight",
                        duration: 2,
                    });
                }}
                className={[
                    // layout
                    "group inline-flex items-center justify-center gap-2",
                    // size
                    "h-12 px-6 2xl:h-12 2xl:px-7",
                    // shape & border
                    "rounded-md border border-blue-600/40",
                    // colors
                    "bg-blue-600 text-blue-700",
                    // hover/active
                    "hover:bg-blue-700 hover:text-white",
                    "active:translate-y-[1px]",
                    // shadow
                    "shadow-sm hover:shadow-md border-white",
                    // focus
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/35",
                    // transition
                    "transition-all duration-300 cursor-pointer",
                    className ?? "",
                ].join(" ")}
                aria-label="Add to cart"
            >
                <span className="relative flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-[20px] 2xl:size-[22px] transition-transform duration-300 group-hover:scale-110"
                    >
                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                    </svg>
                </span>
                <span className="font-semibold tracking-wide">Thêm vào giỏ</span>
            </button>
        </>
    );
}
