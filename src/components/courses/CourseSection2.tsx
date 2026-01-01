// src/components/course/CourseSection.tsx
// Server Component, không antd. Đẹp hơn: card “premium” + hover tinh tế + header gọn + dark overlay chuẩn.

import { Course } from "@/lib/strapi-lib/api/category";
import { strapiMediaUrl } from "@/lib/strapi-lib/strapi";
import Image from "next/image";
import Link from "next/link";

export type CourseItem = {
    id: number | string;
    title: string;
    thumbUrl: string;
    priceOrigin?: number | null;
    priceSale?: number | null;
    href?: string;
    tag?: string; // optional: "HOT", "NEW", "BEST"
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

function CourseCard({ item, theme, index }: { item: Course; theme: "light" | "dark", index: number }) {
    const isDark = theme === "dark";
    const href = item.documentId ?? `/khoa-hoc/${item.id}`;

    const ring = isDark ? "ring-white/12" : "ring-slate-200";
    const base =
        "group relative overflow-hidden rounded-lg ring-1 transition will-change-transform";
    const bg = isDark
        ? "bg-white/6 backdrop-blur hover:bg-white/10 hover:shadow-[0_20px_55px_rgba(0,0,0,0.5)]"
        : "bg-white hover:shadow-[0_16px_40px_rgba(2,6,23,0.12)]";
    const lift = "hover:-translate-y-0.5";
    const title = isDark ? "text-white" : "text-slate-900";
    const sub = isDark ? "text-white/65" : "text-slate-500";

    const percent = calcSalePercent(item.priceOrigin, item.priceSale);
    const isFree = !item.priceSale || item.priceSale <= 0;

    return (
        <Link href={href} className={`${base} ${bg} ${ring} ${lift}`}>
            {/* image */}
            <div className="relative aspect-[21/9] w-full overflow-hidden">
                <Image
                    src={strapiMediaUrl(item.thumImage?.url) || ""}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                />

                <div
                    className={[
                        "absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100",
                        isDark
                            ? "bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                            : "bg-gradient-to-t from-slate-900/35 via-slate-900/5 to-transparent",
                    ].join(" ")}
                />

                <div className="pointer-events-none absolute -left-24 top-0 h-full w-28 rotate-12 bg-white/15 blur-xl opacity-0 transition duration-300 group-hover:opacity-100" />
            </div>

            {/* content */}
            <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                    <div className={`text-xs font-semibold ${sub}`}>#{index + 1}</div>
                    <span
                        className={[
                            "rounded-full px-2 py-1 text-[11px] font-semibold",
                            isDark ? "bg-white/10 text-white/80" : "bg-slate-100 text-slate-600",
                        ].join(" ")}
                    >
                        {isFree ? "Free" : "Pro"}
                    </span>
                </div>

                <h3 className={`mt-2 line-clamp-2 text-[16px] font-semibold ${title}`}>
                    {item.title}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                    <span className={`text-base font-bold ${title}`}>
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
                    {/* tiny underline accent */}
                    {/* <span
                        className={[
                            "ml-auto h-2 flex-1 rounded-full",
                            isDark ? "bg-blue-400/60" : "bg-blue-600/25",
                        ].join(" ")}
                    /> */}
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
    backgroundImage,
    items,
    selector
}: {
    theme?: "light" | "dark";
    title: string;
    subtitle?: string;
    viewMoreHref?: string;
    backgroundImage?: string;
    items: Course[];
    selector: string;
}) {
    const isDark = theme === "dark";

    return (
        <section id={selector} className={isDark ? "relative overflow-hidden" : ""}>
            {/* dark bg */}
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
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/35 via-black/35 to-black/70" />
                    <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl" />
                </>
            )}

            <div className={`relative mx-auto max-w-[1280px] px-4 ${isDark ? "py-14" : "py-10"}`}>
                {/* header (gọn + sang) */}
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <span
                                className={[
                                    "h-9 w-1.5 rounded-full",
                                    isDark ? "bg-blue-400" : "bg-blue-600",
                                ].join(" ")}
                            />
                            <div>
                                <h2 style={{ marginBottom: 8 }} className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                                    {title}
                                </h2>
                                {subtitle && (
                                    <p className={`${isDark ? "text-white/75" : "text-slate-600"}`}>
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {viewMoreHref && (
                        <Link
                            href={viewMoreHref}
                            className={[
                                "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition",
                                "ring-1",
                                isDark
                                    ? "bg-white/10 text-white ring-white/15 hover:bg-white/15"
                                    : "bg-blue-600 text-white ring-blue-600/30 hover:bg-blue-700",
                            ].join(" ")}
                        >
                            Xem thêm <span className="text-white/70">→</span>
                        </Link>
                    )}
                </div>

                {/* grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((it, i) => (
                        <CourseCard key={it.id} item={it} theme={theme} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
