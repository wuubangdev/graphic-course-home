// src/app/api/webhook/sepay/route.ts
import { strapiServerFetch } from "@/lib/strapi-lib/strapi-server";
import { NextRequest, NextResponse } from "next/server";

type SepayWebhookPayload = {
    id: number;
    transferType: "in" | "out";
    transferAmount: number;
    code: string | null;
    referenceCode: string;
    transactionDate: string;
    [k: string]: unknown;
};

function ok() {
    return NextResponse.json({ success: true }, { status: 200 });
}

export async function POST(req: NextRequest) {
    try {
        const auth = req.headers.get("authorization") || "";
        const expected = `Apikey ${process.env.SEPAY_WEBHOOK_APIKEY || ""}`;
        if (!process.env.SEPAY_WEBHOOK_APIKEY || auth !== expected) {
            return NextResponse.json({ success: false }, { status: 401 });
        }

        const payload = (await req.json()) as SepayWebhookPayload;
        if (!payload || payload.transferType !== "in" || !payload.code) return ok();

        // find order by code
        const orderList = await strapiServerFetch<{ data: any[] }>("/api/orders", {
            query: {
                "filters[code][$eq]": payload.code,
                "populate[user]": "true",
                "pagination[pageSize]": "1",
            },
        });

        const order = orderList.data?.[0];
        if (!order) return ok();

        if (order.status === "paid") return ok();

        const orderId: number = order.id;
        const userId: number | null = order.user?.id ?? order.user?.data?.id ?? null;
        if (!userId) return ok();

        // validate amount (optional)
        if (Number(payload.transferAmount) < Number(order.totalAmount)) return ok();

        // update order -> paid
        await strapiServerFetch(`/api/orders/${orderId}`, {
            method: "PUT",
            body: {
                status: "paid",
                paidAt: new Date().toISOString(),
                paymentProvider: "sepay",
                paymentRef: payload.referenceCode || String(payload.id),
                paymentRaw: payload,
            },
        });

        // fetch order-items (populate course)
        const items = await strapiServerFetch<{ data: any[] }>("/api/order-items", {
            query: {
                "filters[order][id][$eq]": String(orderId),
                "populate[course]": "true",
                "pagination[pageSize]": "200",
            },
        });

        for (const it of items.data) {
            const courseId: number | null = it.course?.id ?? it.course?.data?.id ?? null;
            if (!courseId) continue;

            // check purchase exists
            const existed = await strapiServerFetch<{ data: any[] }>("/api/purchases", {
                query: {
                    "filters[user][id][$eq]": String(userId),
                    "filters[course][id][$eq]": String(courseId),
                    "pagination[pageSize]": "1",
                },
            });

            if (existed.data?.length) continue;

            await strapiServerFetch("/api/purchases", {
                method: "POST",
                body: {
                    user: userId,
                    course: courseId,
                    order: orderId,
                    active: true,
                    grantedAt: new Date().toISOString(),
                },
            });
        }

        return ok();
    } catch {
        return NextResponse.json({ success: false }, { status: 200 });
    }
}
