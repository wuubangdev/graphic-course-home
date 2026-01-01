"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { GalleryMedia } from "./courseMedia";

async function captureVideoThumb(url: string, atSeconds = 1): Promise<string | null> {
    return new Promise((resolve) => {
        const v = document.createElement("video");
        v.crossOrigin = "anonymous"; // cần CORS OK
        v.src = url;
        v.muted = true;
        v.playsInline = true;
        v.preload = "metadata";

        const cleanup = () => {
            try {
                v.pause();
                v.removeAttribute("src");
                v.load();
            } catch { }
        };

        v.onloadedmetadata = () => {
            const dur = Number.isFinite(v.duration) ? v.duration : 0;
            const t = dur > 0 ? Math.min(Math.max(atSeconds, 0), Math.max(0, dur - 0.1)) : 0;
            v.currentTime = t;
        };

        v.onseeked = () => {
            try {
                const w = v.videoWidth || 640;
                const h = v.videoHeight || 360;
                const canvas = document.createElement("canvas");
                canvas.width = w;
                canvas.height = h;

                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    cleanup();
                    return resolve(null);
                }

                ctx.drawImage(v, 0, 0, w, h);
                const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
                cleanup();
                resolve(dataUrl);
            } catch {
                cleanup();
                resolve(null);
            }
        };

        v.onerror = () => {
            cleanup();
            resolve(null);
        };
    });
}

export default function CourseGallery({ items }: { items: GalleryMedia[] }) {
    const list = useMemo(() => (items ?? []).filter(Boolean), [items]);
    const [active, setActive] = useState(0);

    const [autoPosters, setAutoPosters] = useState<Record<string, string>>({});
    const [progress, setProgress] = useState(0); // 0..1 của item active

    const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
    const rafRef = useRef<number | null>(null);

    const clamp = (n: number) => Math.max(0, Math.min(list.length - 1, n));
    const go = (idx: number) => setActive(clamp(idx));
    const goNext = () => setActive((p) => (list.length ? (p + 1) % list.length : 0));
    // const goPrev = () => setActive((p) => (list.length ? (p - 1 + list.length) % list.length : 0));

    // generate posters for first few videos
    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            const targets = list
                .filter((m) => m.kind === "video")
                .slice(0, 6) as Array<Extract<GalleryMedia, { kind: "video" }>>;

            for (const v of targets) {
                const src = v.src;
                if (v.poster || autoPosters[src]) continue;

                const thumb = await captureVideoThumb(src, 1);
                if (cancelled) return;
                if (thumb) setAutoPosters((prev) => ({ ...prev, [src]: thumb }));
            }
        };

        run();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list]);

    // autoplay + progress for active item
    useEffect(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        setProgress(0);

        // pause/reset non-active videos
        videoRefs.current.forEach((v, i) => {
            if (!v) return;
            if (i !== active) {
                v.pause();
                v.currentTime = 0;
            }
        });

        const cur = list[active];
        if (!cur || list.length <= 1) return;

        // IMAGE: 3s then next
        if (cur.kind === "image") {
            const durationMs = 3000;
            const start = performance.now();

            const tick = (now: number) => {
                const t = Math.min(1, (now - start) / durationMs);
                setProgress(t);
                if (t >= 1) {
                    goNext();
                    return;
                }
                rafRef.current = requestAnimationFrame(tick);
            };

            rafRef.current = requestAnimationFrame(tick);
            return;
        }

        // VIDEO: progress by timeupdate, ended -> next
        const vEl = videoRefs.current[active];
        if (!vEl) return;

        const update = () => {
            const dur = vEl.duration;
            if (!dur || !Number.isFinite(dur) || dur <= 0) return setProgress(0);
            setProgress(Math.min(1, Math.max(0, vEl.currentTime / dur)));
        };

        const onEnded = () => {
            setProgress(1);
            goNext();
        };

        vEl.addEventListener("timeupdate", update);
        vEl.addEventListener("loadedmetadata", update);
        vEl.addEventListener("ended", onEnded);

        vEl.play().catch(() => { });

        return () => {
            vEl.removeEventListener("timeupdate", update);
            vEl.removeEventListener("loadedmetadata", update);
            vEl.removeEventListener("ended", onEnded);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, list]);

    if (!list.length) return null;

    return (
        <section className="w-full">
            {/* MAIN */}
            <div className="relative overflow-hidden rounded-lg bg-black/5">
                <div
                    className="flex transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${active * 100}%)` }}
                >
                    {list.map((m, idx) => (
                        <div key={idx} className="relative w-full flex-none">
                            <div className="aspect-[16/9] w-full">
                                {m.kind === "image" ? (
                                    <Image
                                        src={m.src}
                                        alt={m.alt}
                                        fill
                                        className="object-cover"
                                        priority={idx === 0}
                                        sizes="(max-width: 1024px) 100vw, 980px"
                                    />
                                ) : (
                                    <video
                                        ref={(el) => {
                                            videoRefs.current[idx] = el;
                                        }}
                                        className="h-full w-full object-cover"
                                        src={m.src}
                                        poster={m.poster || autoPosters[m.src]}
                                        controls
                                        playsInline
                                        preload="metadata"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Prev/Next */}
                {/* {list.length > 1 && (
                    <>
                        <button
                            onClick={goPrev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.12)] hover:bg-white"
                            aria-label="Previous"
                        >
                            ‹
                        </button>
                        <button
                            onClick={goNext}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.12)] hover:bg-white"
                            aria-label="Next"
                        >
                            ›
                        </button>
                    </>
                )} */}
            </div>

            {/* SEGMENTED PROGRESS (chỉ active chạy) */}
            {list.length > 1 && (
                <div className="mt-3 flex justify-center">
                    <div className="flex w-full max-w-[720px] items-center justify-center gap-2 px-2">
                        {list.map((_, idx) => {
                            const isActive = idx === active;
                            const fill = isActive ? progress : 0;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => go(idx)}
                                    className={[
                                        "relative h-1.5 overflow-hidden rounded-full bg-black/10 transition-all duration-300",
                                        isActive ? "w-20" : "w-10",
                                    ].join(" ")}
                                    aria-label={`Go to item ${idx + 1}`}
                                    title={`Item ${idx + 1}`}
                                >
                                    <div
                                        className="h-full rounded-full bg-blue-600 transition-[width] duration-150"
                                        style={{ width: `${Math.round(fill * 100)}%` }}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* CENTER THUMBNAILS */}
            <div className="mt-4 overflow-x-auto pb-2">
                <div className="mx-auto flex w-fit gap-3">
                    {list.map((m, idx) => {
                        const isActive = idx === active;

                        return (
                            <button
                                key={idx}
                                onClick={() => go(idx)}
                                className={[
                                    "relative h-[72px] w-[120px] flex-none overflow-hidden rounded-xl border",
                                    isActive
                                        ? "border-blue-600 ring-2 ring-blue-500/30"
                                        : "border-black/10 hover:border-black/20",
                                    "hover:shadow-[0_0px_18px_rgba(255,255,255,0.18),0_10px_22px_rgba(0,0,0,0.10)]",
                                ].join(" ")}
                                aria-label={`Open media ${idx + 1}`}
                            >
                                {m.kind === "image" ? (
                                    <Image src={m.src} alt={m.alt} fill className="object-cover" sizes="120px" />
                                ) : (
                                    <>
                                        {(() => {
                                            const poster = m.poster || autoPosters[m.src];
                                            return poster ? (
                                                <Image
                                                    src={poster}
                                                    alt={m.title ?? "Video"}
                                                    fill
                                                    className="object-cover"
                                                    sizes="120px"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-black/10" />
                                            );
                                        })()}
                                        <div className="absolute inset-0 grid place-items-center bg-black/20 text-white">
                                            ▶
                                        </div>
                                    </>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
