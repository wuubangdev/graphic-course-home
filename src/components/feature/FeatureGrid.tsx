"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Props = { items: string[] };

const COLORS = [
    "bg-amber-400",
    "bg-blue-600",
    "bg-red-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
];

function pickColor(i: number, prev?: string) {
    let c = COLORS[i % COLORS.length];
    if (prev && c === prev) c = COLORS[(i + 1) % COLORS.length];
    return c;
}

export default function FeatureGrid({ items }: Props) {
    const router = useRouter();

    function goSearch(label: string) {
        const keyword = label.trim();
        if (!keyword) return;

        const url = `/khoa-hoc?search=${encodeURIComponent(keyword)}&page=1`;
        router.push(url);
    }

    return (
        <div className="w-full px-4">
            <div className="grid grid-cols-4 grid-flow-row justify-center gap-2 md:grid-cols-8">
                {items.map((label, i) => {
                    const prevColor =
                        i > 0 ? pickColor(i - 1, i > 1 ? pickColor(i - 2) : undefined) : undefined;
                    const bg = pickColor(i, prevColor);
                    return (
                        <button
                            key={`${label}-${i}`}
                            type="button"
                            onClick={() => goSearch(label)}
                            className={[
                                "rounded-lg px-4 py-2 text-center font-semibold text-white cursor-pointer",
                                "transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.99]",
                                bg,
                            ].join(" ")}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
