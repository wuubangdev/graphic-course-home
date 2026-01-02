"use client";
import { useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Select } from "antd";

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

type ValueKey = "documentId" | "slug";

function setQuery(params: URLSearchParams, key: string, val: string) {
    if (!val || val === "all") params.delete(key);
    else params.set(key, val);
}

type Opt = { value: string; label: string };

function buildCategoryOptions(categories: CategoryLite[], key: ValueKey): Opt[] {
    const opts: Opt[] = [{ value: "all", label: "Thể loại (All)" }];
    for (const c of categories) {
        const v = key === "slug" ? c.slug ?? "" : c.documentId;
        if (!v) continue;
        opts.push({ value: v, label: c.title });
    }
    return opts;
}

const levelOptions: Opt[] = [
    { value: "all", label: "Trình độ (All)" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
];

const priceOptions: Opt[] = [
    { value: "all", label: "Miễn phí/ thu phí" },
    { value: "free", label: "Miễn phí" },
    { value: "paid", label: "Trả phí" },
];

const sortOptions: Opt[] = [
    { value: "new", label: "Giá" },
    { value: "updated", label: "Cập nhật gần đây" },
    { value: "price_asc", label: "Giá tăng dần" },
    { value: "price_desc", label: "Giá giảm dần" },
];

function Drop({
    value,
    options,
    placeholder,
    onChange,
}: {
    value: string;
    options: Opt[];
    placeholder?: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="bg-white rounded-md shadow-sm cursor-pointer">
            <Select
                value={value}
                options={options}
                onChange={onChange}
                placeholder={placeholder}
                placement="bottomLeft" // ép dropdown mở xuống
                size="middle"
                showSearch
                optionFilterProp="label"
                dropdownMatchSelectWidth
                className="w-full"
                style={{ height: 40, cursor: 'pointer' }}
                dropdownStyle={{ maxHeight: 360, overflow: "auto" }}
            />
        </div>
    );
}

export default function CourseFilters({
    initial,
    categories,
    categoryValueKey = "documentId",
}: {
    initial: Initial;
    categories: CategoryLite[];
    categoryValueKey?: ValueKey;
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

    const categoryOptions = useMemo(
        () => buildCategoryOptions(categories, categoryValueKey),
        [categories, categoryValueKey]
    );

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
        <div className="rounded-2xl">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                <div className="md:col-span-2">
                    <Drop
                        value={category}
                        options={categoryOptions}
                        onChange={(v) => {
                            setCategory(v);
                            apply({ category: v });
                        }}
                    />
                </div>

                <div className="md:col-span-2">
                    <Drop
                        value={level}
                        options={levelOptions}
                        onChange={(v) => {
                            setLevel(v);
                            apply({ level: v });
                        }}
                    />
                </div>

                <div className="md:col-span-2">
                    <Drop
                        value={price}
                        options={priceOptions}
                        onChange={(v) => {
                            setPrice(v);
                            apply({ price: v });
                        }}
                    />
                </div>

                <div className="md:col-span-2">
                    <Drop
                        value={sort}
                        options={sortOptions}
                        onChange={(v) => {
                            setSort(v);
                            apply({ sort: v });
                        }}
                    />
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                    <Button
                        type="primary"
                        disabled={!canReset}
                        loading={isPending}
                        onClick={reset}
                        style={{ height: 40 }}
                    >
                        Làm mới
                    </Button>
                    <span className="text-xs text-slate-500">{isPending ? "Đang tải..." : " "}</span>
                </div>
            </div>
        </div>
    );
}
