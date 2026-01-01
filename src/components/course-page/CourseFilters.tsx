"use client";

import { useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Initial = {
    q: string;
    category: string;
    level: string;
    price: string;
    sort: string;
};

type CategoryLite = {
    documentId: string;
    title: string;
    slug?: string;
};

function setQuery(params: URLSearchParams, key: string, val: string) {
    if (!val || val === "all") params.delete(key);
    else params.set(key, val);
}

export default function CourseFilters({
    initial,
    categories,
    categoryValueKey = "documentId", // đổi "slug" nếu bạn filter theo slug
}: {
    initial: Initial;
    categories: CategoryLite[];
    categoryValueKey?: "documentId" | "slug";
}) {
    const router = useRouter();
    const pathname = usePathname();
    const sp = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [q, setQ] = useState(initial.q || "");
    const [category, setCategory] = useState(initial.category || "all");
    const [level, setLevel] = useState(initial.level || "all");
    const [price, setPrice] = useState(initial.price || "all");
    const [sort, setSort] = useState(initial.sort || "new");

    const canReset = useMemo(() => {
        return (
            (q?.trim() ?? "") ||
            category !== "all" ||
            level !== "all" ||
            price !== "all" ||
            sort !== "new"
        );
    }, [q, category, level, price, sort]);

    function apply(next?: Partial<Initial>) {
        const params = new URLSearchParams(sp?.toString());

        const nq = (next?.q ?? q).trim();
        const ncat = next?.category ?? category;
        const nlevel = next?.level ?? level;
        const nprice = next?.price ?? price;
        const nsort = next?.sort ?? sort;

        setQuery(params, "q", nq);
        setQuery(params, "category", ncat);
        setQuery(params, "level", nlevel);
        setQuery(params, "price", nprice);
        setQuery(params, "sort", nsort);

        params.set("page", "1");

        startTransition(() => router.push(`${pathname}?${params.toString()}`));
    }

    function reset() {
        setQ("");
        setCategory("all");
        setLevel("all");
        setPrice("all");
        setSort("new");
        startTransition(() => router.push(pathname));
    }

    return (
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                <div className="md:col-span-5">
                    <label className="mb-1 block text-xs font-semibold text-slate-700">Tìm kiếm</label>
                    <div className="flex gap-2">
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && apply({ q })}
                            placeholder="Tên khoá học..."
                            className="h-10 w-full rounded-xl border px-3 text-sm outline-none focus:border-slate-400"
                        />
                        <button
                            disabled={isPending}
                            onClick={() => apply({ q })}
                            className="h-10 shrink-0 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white disabled:opacity-60"
                        >
                            Lọc
                        </button>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="mb-1 block text-xs font-semibold text-slate-700">Danh mục</label>
                    <select
                        value={category}
                        onChange={(e) => {
                            const v = e.target.value;
                            setCategory(v);
                            apply({ category: v });
                        }}
                        className="h-10 w-full rounded-xl border px-3 text-sm outline-none"
                    >
                        <option value="all">Tất cả</option>
                        {categories.map((c) => {
                            const v = categoryValueKey === "slug" ? (c.slug || "") : c.documentId;
                            if (!v) return null;
                            return (
                                <option key={c.documentId} value={v}>
                                    {c.title}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="mb-1 block text-xs font-semibold text-slate-700">Trình độ</label>
                    <select
                        value={level}
                        onChange={(e) => {
                            const v = e.target.value;
                            setLevel(v);
                            apply({ level: v });
                        }}
                        className="h-10 w-full rounded-xl border px-3 text-sm outline-none"
                    >
                        <option value="all">Tất cả</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>

                <div className="md:col-span-1">
                    <label className="mb-1 block text-xs font-semibold text-slate-700">Giá</label>
                    <select
                        value={price}
                        onChange={(e) => {
                            const v = e.target.value;
                            setPrice(v);
                            apply({ price: v });
                        }}
                        className="h-10 w-full rounded-xl border px-3 text-sm outline-none"
                    >
                        <option value="all">All</option>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="mb-1 block text-xs font-semibold text-slate-700">Sắp xếp</label>
                    <select
                        value={sort}
                        onChange={(e) => {
                            const v = e.target.value;
                            setSort(v);
                            apply({ sort: v });
                        }}
                        className="h-10 w-full rounded-xl border px-3 text-sm outline-none"
                    >
                        <option value="new">Mới nhất</option>
                        <option value="updated">Cập nhật gần đây</option>
                        <option value="price_asc">Giá tăng dần</option>
                        <option value="price_desc">Giá giảm dần</option>
                    </select>
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-slate-500">{isPending ? "Đang tải..." : " "}</span>
                <button
                    disabled={!canReset || isPending}
                    onClick={reset}
                    className="rounded-xl border px-3 py-2 text-sm font-semibold disabled:opacity-40"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
