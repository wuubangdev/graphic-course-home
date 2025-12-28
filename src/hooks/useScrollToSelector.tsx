"use client";

import { useCallback } from "react";

type Opts = {
    offset?: number; // px, dùng khi có header fixed
    behavior?: ScrollBehavior; // "smooth" | "auto"
};

export function useScrollToSelector(opts: Opts = {}) {
    const { offset = 80, behavior = "smooth" } = opts;

    return useCallback(
        (selector: string) => {
            if (!selector) return;

            const el = document.getElementById(selector);
            if (!el) return;

            const top = el.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({ top, behavior });
        },
        [offset, behavior]
    );
}
