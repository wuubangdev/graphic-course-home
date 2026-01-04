import { strapiServerFetch } from "@/lib/strapi-lib/strapi-server";
import { NextRequest, NextResponse } from "next/server";

type StrapiList<T> = { data: T[] };

type OrderEntity = {
    id: number;
    code: string;
    status: "pending" | "paid" | "cancelled" | "expired";
    totalAmount: number;
    currency: string;
    paymentProvider?: string | null;
    paymentRef?: string | null;
    paidAt?: string | null;
    expiresAt?: string | null;
    // populated
    user?: { id: number };
    order_items?: Array<{
        id: number;
        qty: number;
        unitPrice: number;
        lineTotal: number;
        course?: { id: number; documentId: string; slug: string; title: string };
    }>;
};

function isExpired(expiresAt?: string | null) {
    if (!expiresAt) return false;
    const t = Date.parse(expiresAt);
    if (Number.isNaN(t)) return false;
    return Date.now() > t;
}

export async function GET(
    _req: NextRequest,
    ctx: { params: Promise<{ code: string }> }
) {
    try {
        const { code } = await ctx.params;
        const orderCode = decodeURIComponent(code).trim();
        if (!orderCode) return NextResponse.json({ error: "Invalid code" }, { status: 400 });

        // Query order theo code
        const res = await strapiServerFetch<StrapiList<OrderEntity>>("/api/orders", {
            query: {
                filters: { code: { $eq: orderCode } },
                pagination: { pageSize: 1 },
                fields: [
                    "code",
                    "status",
                    "totalAmount",
                    "currency",
                    "paymentProvider",
                    "paymentRef",
                    "paidAt",
                    "expiresAt",
                ],
                populate: {
                    order_items: {
                        fields: ["qty", "unitPrice", "lineTotal"],
                        populate: {
                            course: { fields: ["documentId", "slug", "title"] },
                        },
                    },
                    user: { fields: ["id"] },
                },
            },
        });

        const order = res.data?.[0];
        if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

        // FE convenience: expired tự tính (không bắt buộc bạn phải update status trên Strapi)
        const expired = order.status === "pending" && isExpired(order.expiresAt);

        return NextResponse.json(
            {
                ok: true,
                order: {
                    id: order.id,
                    code: order.code,
                    status: expired ? "expired" : order.status,
                    totalAmount: order.totalAmount,
                    currency: order.currency,
                    paymentProvider: order.paymentProvider ?? "sepay",
                    paymentRef: order.paymentRef ?? null,
                    paidAt: order.paidAt ?? null,
                    expiresAt: order.expiresAt ?? null,
                    items:
                        order.order_items?.map((it) => ({
                            id: it.id,
                            qty: it.qty,
                            unitPrice: it.unitPrice,
                            lineTotal: it.lineTotal,
                            course: it.course
                                ? {
                                    documentId: it.course.documentId,
                                    slug: it.course.slug,
                                    title: it.course.title,
                                }
                                : null,
                        })) ?? [],
                },
            },
            { status: 200 }
        );
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
    }
}
