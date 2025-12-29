// src/components/course/CourseSection.tsx
// Server Component (không antd). Dùng Tailwind + next/image + next/link.

import { Course } from "@/lib/strapi-lib/api/category";
import { strapiMediaUrl } from "@/lib/strapi-lib/strapi";
import Image from "next/image";
import Link from "next/link";

export type CourseItem = {
    id: number | string;
    title: string;
    thumbUrl: string; // absolute hoặc relative đều được
    priceOrigin?: number | null;
    priceSale?: number | null;
    href?: string; // optional override
};

function formatVND(n?: number | null) {
    if (!n || n <= 0) return "Miễn phí";
    return new Intl.NumberFormat("vi-VN").format(n) + "đ";
}

function calcSalePercent(origin?: number | null, sale?: number | null) {
    if (!origin || origin <= 0) return null;
    if (!sale || sale <= 0) return 100;
    const p = Math.round(((origin - sale) / origin) * 100);
    return Math.max(0, Math.min(100, p));
}

function CourseCard({ item, theme, index }: {
    item: Course;
    theme: "light" | "dark";
    index: number;

}) {
    const isDark = theme === "dark";
    const href = item.title ?? `/khoa-hoc/${item.id}`;

    const card =
        "group overflow-hidden rounded-lg transition will-change-transform";
    const cardLight =
        "bg-white ring-1 ring-slate-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(2,6,23,0.12)]";
    const cardDark =
        "bg-white/6 ring-1 ring-white/12 backdrop-blur hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_18px_44px_rgba(0,0,0,0.45)]";

    const title = isDark ? "text-white" : "text-slate-900";
    const sub = isDark ? "text-white/60" : "text-slate-500";
    const percent = calcSalePercent(item.priceOrigin, item.priceSale);
    const isFree = !item.priceSale || item.priceSale <= 0;

    return (
        <Link href={href} className={`${card} ${isDark ? cardDark : cardLight}`}>
            <div className="relative aspect-[21/9] w-full overflow-hidden">
                <Image
                    src={strapiMediaUrl(item.thumImage?.url) || './test.png'}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
                {isDark && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                )}
            </div>

            <div className="p-4">
                <div className={`text-xs font-semibold ${sub}`}>#{index}</div>
                <h3 className={`mt-1 line-clamp-2 text-base font-semibold ${title}`}>
                    {item.title}
                </h3>

                <div className="mt-2 flex items-center gap-2">
                    <span className={`text-base font-semibold ${title}`}>
                        {isFree ? "Miễn phí" : formatVND(item.priceSale)}
                    </span>

                    {!!item.priceOrigin && item.priceOrigin > 0 && (
                        <span className={`text-sm line-through ${sub}`}>
                            {formatVND(item.priceOrigin)}
                        </span>
                    )}

                    {percent !== null && (
                        <span className="ml-auto rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
                            -{percent}%
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default function CourseSection({
    theme = "light",
    title,
    subtitle,
    viewMoreHref,
    backgroundImage, // dùng cho theme="dark"
    items,
}: {
    theme?: "light" | "dark";
    title: string;
    subtitle?: string;
    viewMoreHref?: string;
    backgroundImage?: string; // url bg
    items: Course[];
}) {
    const isDark = theme === "dark";
    return (
        <section className={isDark ? "relative overflow-hidden" : ""}>
            {/* Dark background layer */}
            {isDark && (
                <>
                    <div className="absolute inset-0">
                        {backgroundImage ? (
                            <Image
                                src={backgroundImage}
                                alt="Background"
                                fill
                                className="object-cover"
                                priority={false}
                            />
                        ) : (
                            <div className="h-full w-full bg-slate-950" />
                        )}
                    </div>
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-950/35 via-black/40 to-black/70" />
                </>
            )}

            <div
                className={`relative mx-auto max-w-6xl px-4 ${isDark ? "py-14" : "py-10"
                    }`}
            >
                {/* Header */}
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <h2 className={`text-2xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                            {title}
                        </h2>
                        {subtitle && (
                            <p className={`mt-1 text-sm ${isDark ? "text-white/75" : "text-slate-600"}`}>
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {viewMoreHref && (
                        <Link
                            href={viewMoreHref}
                            className={[
                                "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition",
                                isDark
                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                    : "bg-blue-600 text-white hover:bg-blue-700",
                            ].join(" ")}
                        >
                            Xem thêm
                        </Link>
                    )}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((it, i) => (
                        <CourseCard key={it.id} item={it} theme={theme} index={i + 1} />
                    ))}
                </div>
            </div>
        </section>
    );
}
