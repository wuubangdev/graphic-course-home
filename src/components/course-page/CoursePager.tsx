"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "antd";

export default function CoursePager({ page, pageCount }: { page: number; pageCount: number }) {
    const router = useRouter();
    const pathname = usePathname();
    const sp = useSearchParams();

    if (pageCount <= 1) return null;

    function go(p: number) {
        const next = Math.max(1, Math.min(pageCount, p));
        const params = new URLSearchParams(sp?.toString());
        params.set("page", String(next));
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex items-center justify-center gap-2">
            <Button type="primary" onClick={() => go(page - 1)} disabled={page <= 1}>
                Trước
            </Button>

            <span className="px-2 text-sm text-slate-600">
                {page} / {pageCount}
            </span>

            <Button type="primary" onClick={() => go(page + 1)} disabled={page >= pageCount}>
                Sau
            </Button>
        </div>
    );
}
