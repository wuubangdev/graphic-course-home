"use client";

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 400);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={[
                "fixed bottom-4 right-4 z-50 rounded-full p-3 shadow-lg",
                "bg-blue-600 text-white hover:opacity-90 cursor-pointer",
                "transition-all duration-300 ease-out",
                show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none",
            ].join(" ")}
            aria-label="Scroll to top"
            title="Lên đầu trang"
        >
            {/* icon mũi tên lên */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path
                    fillRule="evenodd"
                    d="M11.47 3.22a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V20.25a.75.75 0 0 1-1.5 0V5.56l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z"
                    clipRule="evenodd"
                />
            </svg>
        </button>
    );
}
