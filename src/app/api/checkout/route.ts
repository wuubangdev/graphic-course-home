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

function getErrorMessage(e: unknown) {
    if (e instanceof Error) return e.message;
    if (typeof e === "string") return e;
    try {
        return JSON.stringify(e);
    } catch {
        return "Server error";
    }
}

async function getMeUserFromCookie() {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("strapi_jwt")?.value;
    if (!jwt) return null;

    const r = await fetch(`${STRAPI_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
        cache: "no-store",
    });

    const data: unknown = await r.json().catch(() => null);
    if (!r.ok || !data || typeof data !== "object") return null;

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
        // Parse body ONCE
        const raw = await req.text();
        let body: unknown = null;

        try {
            body = raw ? JSON.parse(raw) : null;
        } catch {
            console.error("[CHECKOUT] Invalid JSON:", raw);
            return NextResponse.json({ error: "Invalid JSON", where: "parse_body" }, { status: 400 });
        }

        console.log("[CHECKOUT] body:", body);

        // Auth
        const me = await getMeUserFromCookie();
        if (!me?.id) return NextResponse.json({ error: "Unauthorized", where: "auth" }, { status: 401 });

        // Validate payload
        const courseDocumentIds =
            body && typeof body === "object" && "courseDocumentIds" in body
                ? (body as { courseDocumentIds?: unknown }).courseDocumentIds
                : null;

        if (!Array.isArray(courseDocumentIds) || courseDocumentIds.length === 0) {
            return NextResponse.json(
                {
                    error: "Invalid payload",
                    where: "validate_courseDocumentIds",
                    hint: "courseDocumentIds must be string[]",
                },
                { status: 400 }
            );
        }

        const onlyStrings = courseDocumentIds.every((x) => typeof x === "string" && x.trim().length > 0);
        if (!onlyStrings) {
            return NextResponse.json(
                {
                    error: "Invalid payload",
                    where: "validate_courseDocumentIds",
                    hint: "courseDocumentIds must be string[]",
                },
                { status: 400 }
            );
        }

        const uniqueIds = Array.from(new Set(courseDocumentIds.map((x) => String(x).trim())));

        // Fetch courses
        const coursesRes = await strapiServerFetch<{ data: CourseItem[] }>("/api/courses", {
            query: {
                filters: { documentId: { $in: uniqueIds } },
                fields: ["documentId", "priceOrigin", "priceSale"],
                pagination: { pageSize: Math.max(50, uniqueIds.length) },
            },
        });

        const courses = coursesRes?.data ?? [];
        if (courses.length !== uniqueIds.length) {
            return NextResponse.json(
                { error: "Some courses not found", where: "fetch_courses", found: courses.length, expected: uniqueIds.length },
                { status: 400 }
            );
        }

        // Build line items
        const items = courses.map((c) => {
            const unitPrice = Number(c.priceSale ?? c.priceOrigin ?? 0);
            return { courseId: c.id, unitPrice, qty: 1, lineTotal: unitPrice };
        });

        const totalAmount = items.reduce((s, it) => s + it.lineTotal, 0);
        if (!(totalAmount > 0)) {
            return NextResponse.json({ error: "Invalid amount", where: "calc_total", totalAmount }, { status: 400 });
        }

        const code = makeOrderCode();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

        /**
         * IMPORTANT:
         * Your strapiServerFetch (wrapper) is already wrapping POST body as { data: body }.
         * Therefore DO NOT send { data: {...} } here, otherwise Strapi sees nested "data"
         * and throws: "Invalid key data".
         */
        const orderPayload = {
            user: me.id, // if your Orders model uses users_permissions_user instead, change this key
            code,
            order_status: "pending",
            totalAmount,
            currency: "VND",
            paymentProvider: "sepay",
            expiresAt,
        };

        const orderRes = await strapiServerFetch<any>("/api/orders", {
            method: "POST",
            body: orderPayload,
        });

        const orderId: number | undefined = orderRes?.data?.id;
        if (!orderId) {
            console.error("[CHECKOUT] Create order failed:", orderRes);
            return NextResponse.json({ error: "Create order failed", where: "create_order", debug: orderRes }, { status: 502 });
        }

        // Create order items (also NO nested data)
        for (const it of items) {
            const itemRes = await strapiServerFetch<any>("/api/order-items", {
                method: "POST",
                body: {
                    order: orderId,
                    course: it.courseId,
                    unitPrice: it.unitPrice,
                    qty: it.qty,
                    lineTotal: it.lineTotal,
                },
            });

            if (!itemRes?.data?.id) {
                console.error("[CHECKOUT] Create order-item failed:", itemRes);
                return NextResponse.json(
                    { error: "Create order-item failed", where: "create_order_item", debug: itemRes },
                    { status: 502 }
                );
            }
        }

        return NextResponse.json(
            { orderId, orderCode: code, amount: totalAmount, currency: "VND", expiresAt, transferContent: code },
            { status: 200 }
        );
    } catch (e: any) {
        const status = typeof e?.status === "number" ? e.status : 500;
        const details = e?.details ?? null;

        console.error("[CHECKOUT] FAIL:", status, details ? JSON.stringify(details, null, 2) : e);

        return NextResponse.json(
            { error: getErrorMessage(e), where: "checkout_route", details },
            { status }
        );
    }
}
