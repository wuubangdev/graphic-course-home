import { NextRequest, NextResponse } from "next/server";
import { strapiServerFetch } from "@/lib/strapi-lib/strapi-server";

type CoursePreview = {
    id: number;
    documentId: string;
    slug: string;
    title: string;
    priceOrigin?: number | null;
    priceSale?: number | null;
};

function parseIds(body: unknown): string[] | null {
    if (!body || typeof body !== "object") return null;
    if (!("courseDocumentIds" in body)) return null;

    const v = (body as { courseDocumentIds?: unknown }).courseDocumentIds;
    if (!Array.isArray(v) || !v.every((x) => typeof x === "string")) return null;

    return Array.from(new Set(v.map((x) => x.trim()).filter(Boolean)));
}

export async function POST(req: NextRequest) {
    const body: unknown = await req.json().catch(() => null);
    const ids = parseIds(body);

    if (!ids) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    if (ids.length === 0) return NextResponse.json({ items: [], total: 0 }, { status: 200 });

    const res = await strapiServerFetch<{ data: CoursePreview[] }>("/api/courses", {
        query: {
            filters: { documentId: { $in: ids } },
            fields: ["documentId", "slug", "title", "priceOrigin", "priceSale"],
            pagination: { pageSize: Math.max(50, ids.length) },
        },
    });

    const items = res.data ?? [];
    const total = items.reduce((s, c) => s + Number(c.priceSale ?? c.priceOrigin ?? 0), 0);

    return NextResponse.json({ items, total }, { status: 200 });
}
