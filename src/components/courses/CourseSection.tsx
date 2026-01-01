import { Course } from "@/lib/strapi-lib/api/course";
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

export function CourseCard({ item, theme }: { item: Course; theme: "light" | "dark" }) {
    const isDark = theme === "dark";
    const href = `/khoa-hoc/${item.slug}`;

    const ring = isDark ? "ring-white/12" : "ring-slate-200";
    const base =
        "group relative overflow-hidden rounded-lg ring-1 transition will-change-transform";
    const bg = isDark
        ? "bg-white/6 backdrop-blur hover:bg-white/10 hover:shadow-[0_20px_55px_rgba(255,255,255,0.5)]"
        : "bg-white hover:shadow-[0_16px_40px_rgba(2,6,23,0.12)]";
    const lift = "hover:-translate-y-3";
    const title = isDark ? "text-white" : "";
    const saleCost = isDark ? "text-white" : "text-[#e75c5a]";
    const sub = "text-[#c5c5c5] text-[15px] font-light";

    const percent = calcSalePercent(item.priceOrigin, item.priceSale);
    const isFree = !item.priceSale || item.priceSale <= 0;

    return (
        <Link href={href} className={`${base} ${bg} ${ring} ${lift} p-3`}>
            {/* image */}
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden">
                <Image
                    src={strapiMediaUrl(item.thumImage?.url) || ""}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
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
            <div className="py-2">
                <h3
                    className={`mt-2 line-clamp-2 text-[16px] ${title}`}
                    style={{ fontWeight: 300 }}
                >
                    {item.title}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                    <span className={`font-bold text-xl ${saleCost}`}>
                        {isFree ? "Miễn phí" : formatVND(item.priceSale)}
                    </span>

                    {!!item.priceOrigin && item.priceOrigin > 0 && (
                        <span
                            className={`text-xs line-through ${sub}`}
                            style={{ fontWeight: 400 }}
                        >
                            {formatVND(item.priceOrigin)}
                        </span>
                    )}
                    {percent !== null && (
                        <span className="rounded-lg bg-red-500 p-1 text-xs text-white text-[12px]">
                            -{percent}%
                        </span>
                    )}
                    <span
                        className={`rounded-lg ml-auto py-1 border-[1px] 
                            ${isDark ? "border-white/40 text-white" : " border-blue-500/60 text-blue-500"} 
                        text-xs font-semibold  text-[12px] px-2`}
                        style={{ fontWeight: 300 }}
                    >
                        Blender
                    </span>
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
        <section id={selector} className={`${isDark ? "relative overflow-hidden" : ""} py-8`}>
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
            <div className={`relative mx-auto max-w-[1280px] rounded-lg ${isDark ? "" : "bg-white"} p-8`}>
                {/* header (gọn + sang) */}
                <div className="mb-2 flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <div>
                                <h2
                                    style={{ marginBottom: 0, fontWeight: 700 }}
                                    className={`text-3xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                                >
                                    {title}
                                </h2>
                                {subtitle && (
                                    <p className={`${isDark ? "text-white/75" : "text-slate-600"} text-lg`}>
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
                                "hover:opacity-60 duration-300 cursor-pointer",
                                isDark
                                    ? " text-white"
                                    : "text-blue-500",
                            ].join(" ")}
                        >
                            Xem tất cả <span className={`${isDark ? " text-white" : "text-blue-500"}`}>→</span>
                        </Link>
                    )}
                </div>

                {/* grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((it) => (
                        <CourseCard key={it.id} item={it} theme={theme} />
                    ))}
                </div>
            </div>
        </section>
    );
}
