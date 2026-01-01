"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CoursePager({ page, pageCount }: { page: number; pageCount: number }) {
    const router = useRouter();
    const pathname = usePathname();
    const sp = useSearchParams();

    if (pageCount <= 1) return null;

    function go(p: number) {
        const params = new URLSearchParams(sp?.toString());
        params.set("page", String(p));
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={() => go(page - 1)}
                disabled={page <= 1}
                className="rounded-xl border px-3 py-2 text-sm font-semibold disabled:opacity-40"
            >
                Trước
            </button>

            <span className="px-2 text-sm text-slate-600">
                {page} / {pageCount}
            </span>

            <button
                onClick={() => go(page + 1)}
                disabled={page >= pageCount}
                className="rounded-xl border px-3 py-2 text-sm font-semibold disabled:opacity-40"
            >
                Sau
            </button>
        </div>
    );
}
