"use client";

import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "antd";

type RelatedCourseRowProps = {
    title: string; thumb: string | null, href: string
};

export default function RelatedCourseRow({ href, thumb, title }: RelatedCourseRowProps) {
    return (
        <Tooltip
            placement="top"
            mouseEnterDelay={0.1}
            title={
                <div className="max-w-[260px]">
                    <div className="font-semibold line-clamp-2">{title}</div>
                    {/* <div className="opacity-80 text-xs">{href}</div> */}
                </div>
            }
            getPopupContainer={(node) => node.parentElement ?? document.body}
        >
            <Link href={`/khoa-hoc/${href}`} className="flex gap-3 rounded-xl border border-black/10 p-3 hover:bg-slate-50">
                <div className="relative h-12 aspect-video flex-none overflow-hidden rounded-lg bg-slate-200">
                    {thumb ? <Image src={thumb} alt={title} fill className="object-cover" sizes="48px" /> : null}
                </div>
                <div className="min-w-0">
                    <div className="text-sm line-clamp-2 text-slate-900">{title}</div>
                </div>
            </Link>
        </Tooltip>
    );
}
