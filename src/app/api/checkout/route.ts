// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { strapiServerFetch } from "@/lib/strapi-lib/strapi-server";

const STRAPI_URL = process.env.STRAPI_URL!;

function makeOrderCode() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `ORD_${y}${m}${day}_${rand}`;
}

async function getMeUserFromCookie() {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("strapi_jwt")?.value;
    if (!jwt) return null;

    const r = await fetch(`${STRAPI_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
        cache: "no-store",
    });

    const data = await r.json().catch(() => null);
    if (!r.ok) return null;

    // Strapi users/me trả về object user, thường có id
    return data as { id: number;[k: string]: unknown };
}

type CourseItem = {
    id: number;
    documentId: string;
    priceSale?: number | null;
    priceOrigin?: number | null;
};

export async function POST(req: NextRequest) {
    try {
        const me = await getMeUserFromCookie();
        if (!me?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { courseDocumentIds } = (await req.json()) as { courseDocumentIds: string[] };

        if (!Array.isArray(courseDocumentIds) || courseDocumentIds.length === 0) {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        // Lấy giá khóa học theo documentId
        const coursesRes = await strapiServerFetch<{ data: CourseItem[] }>("/api/courses", {
            query: {
                filters: { documentId: { $in: courseDocumentIds } },
                fields: ["documentId", "priceOrigin", "priceSale"],
                pagination: { pageSize: Math.max(50, courseDocumentIds.length) },
            },
        });

        const courses = coursesRes.data ?? [];
        if (courses.length !== courseDocumentIds.length) {
            return NextResponse.json({ error: "Some courses not found" }, { status: 400 });
        }

        const items = courses.map((c) => {
            const unitPrice = Number(c.priceSale ?? c.priceOrigin ?? 0);
            return { courseId: c.id, unitPrice, qty: 1, lineTotal: unitPrice };
        });

        const totalAmount = items.reduce((s, it) => s + it.lineTotal, 0);
        if (totalAmount <= 0) return NextResponse.json({ error: "Invalid amount" }, { status: 400 });

        const code = makeOrderCode();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

        // Create order
        const orderRes = await strapiServerFetch<{ data: { id: number } }>("/api/orders", {
            method: "POST",
            body: {
                user: me.id,
                code,
                status: "pending",
                totalAmount,
                currency: "VND",
                paymentProvider: "sepay",
                expiresAt,
            },
        });

        const orderId = orderRes.data.id;

        // Create order-items
        for (const it of items) {
            await strapiServerFetch("/api/order-items", {
                method: "POST",
                body: {
                    order: orderId,
                    course: it.courseId,
                    unitPrice: it.unitPrice,
                    qty: it.qty,
                    lineTotal: it.lineTotal,
                },
            });
        }

        // Sepay: nội dung chuyển khoản nên dùng code để webhook match
        return NextResponse.json(
            {
                orderId,
                orderCode: code,
                amount: totalAmount,
                currency: "VND",
                expiresAt,
                transferContent: code,
            },
            { status: 200 }
        );
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
    }
}
