"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Typography, Button, Empty, Space, InputNumber, Divider, notification, Skeleton } from "antd";
import { useCart } from "@/components/card/CartProvider";

function formatVnd(n: number) {
    return new Intl.NumberFormat("vi-VN").format(Math.max(0, Math.floor(n || 0)));
}

type CoursePreview = {
    id: number;
    documentId: string;
    slug: string;
    title: string;
    priceOrigin?: number | null;
    priceSale?: number | null;
};

type PreviewRes = { items: CoursePreview[]; total: number };

export default function CartPage() {
    const router = useRouter();
    const { items, totalQty, setQty, removeItem, clear } = useCart();
    const [api, contextHolder] = notification.useNotification();

    // khóa qty=1 cho khóa học (không cho tăng số lượng)
    useEffect(() => {
        for (const it of items) {
            if (it.qty !== 1) setQty(it.id, 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items.map((x) => `${x.id}:${x.qty}`).join("|")]);

    const courseDocumentIds = useMemo(() => Array.from(new Set(items.map((x) => x.id))), [items]);

    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<CoursePreview[]>([]);

    useEffect(() => {
        let alive = true;

        async function run() {
            if (courseDocumentIds.length === 0) {
                setPreview([]);
                return;
            }
            setLoading(true);
            try {
                const r = await fetch("/api/cart/preview", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ courseDocumentIds }),
                });

                const data: unknown = await r.json().catch(() => null);
                if (!alive) return;

                const arr = data && typeof data === "object" ? (data as PreviewRes).items : [];
                setPreview(Array.isArray(arr) ? arr : []);
            } finally {
                if (alive) setLoading(false);
            }
        }

        run();
        return () => {
            alive = false;
        };
    }, [courseDocumentIds]);

    const rowMap = useMemo(() => {
        const qtyMap = new Map(items.map((x) => [x.id, Math.max(1, Math.floor(x.qty || 1))]));
        return preview.map((c) => {
            const unit = Number(c.priceSale ?? c.priceOrigin ?? 0);
            const qty = qtyMap.get(c.documentId) ?? 1;
            return {
                id: c.documentId, // = CartItem.id
                slug: c.slug,
                title: c.title,
                unitPrice: unit,
                qty,
                lineTotal: unit * qty,
            };
        });
    }, [preview, items]);

    const totalPrice = useMemo(() => rowMap.reduce((s, x) => s + x.lineTotal, 0), [rowMap]);

    return (
        <>
            {contextHolder}

            <div className="mx-auto w-full max-w-6xl px-4 py-8">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                            Giỏ hàng
                        </Typography.Title>
                        <Typography.Text type="secondary">
                            {totalQty > 0 ? `Bạn có ${totalQty} sản phẩm` : "Chưa có sản phẩm nào"}
                        </Typography.Text>
                    </div>

                    <Space wrap>
                        <Link href="/library">
                            <Button>Thư viện đã mua</Button>
                        </Link>

                        <Button
                            danger
                            disabled={items.length === 0}
                            onClick={() => {
                                clear();
                                api.warning({ message: "Đã xóa giỏ hàng", placement: "topRight", duration: 2 });
                            }}
                        >
                            Xóa giỏ hàng
                        </Button>
                    </Space>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <Card
                        style={{ borderRadius: 16 }}
                        className="lg:col-span-2"
                        styles={{ body: { padding: 16 } }}
                    >
                        {items.length === 0 ? (
                            <Empty description="Giỏ hàng trống" />
                        ) : loading ? (
                            <Skeleton active />
                        ) : rowMap.length === 0 ? (
                            <Empty description="Không tải được thông tin khóa học" />
                        ) : (
                            <div className="flex flex-col gap-12">
                                {rowMap.map((it) => (
                                    <div key={it.id} className="flex items-start justify-between gap-4">
                                        <div style={{ flex: 1 }}>
                                            <Typography.Text strong style={{ display: "block" }}>
                                                <Link href={`/khoa-hoc/${it.slug}`}>{it.title}</Link>
                                            </Typography.Text>
                                            <Typography.Text type="secondary">{formatVnd(it.unitPrice)} đ</Typography.Text>

                                            <div className="mt-3 flex items-center gap-10">
                                                <div className="flex items-center gap-2">
                                                    <span style={{ color: "rgba(0,0,0,0.55)" }}>Số lượng</span>
                                                    <InputNumber min={1} max={1} value={1} disabled />
                                                </div>

                                                <Button
                                                    danger
                                                    type="link"
                                                    onClick={() => {
                                                        removeItem(it.id);
                                                        api.info({
                                                            message: "Đã xóa khỏi giỏ",
                                                            description: it.title,
                                                            placement: "topRight",
                                                            duration: 2,
                                                        });
                                                    }}
                                                >
                                                    Xóa
                                                </Button>
                                            </div>
                                        </div>

                                        <div style={{ minWidth: 120, textAlign: "right" }}>
                                            <Typography.Text strong>{formatVnd(it.lineTotal)} đ</Typography.Text>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>

                    <Card style={{ borderRadius: 16 }} styles={{ body: { padding: 16 } }}>
                        <Typography.Title level={5} style={{ marginTop: 0 }}>
                            Tóm tắt
                        </Typography.Title>

                        <div className="flex items-center justify-between">
                            <Typography.Text type="secondary">Tạm tính</Typography.Text>
                            <Typography.Text strong>{formatVnd(totalPrice)} đ</Typography.Text>
                        </div>

                        <Divider />

                        <Button type="primary" block disabled={rowMap.length === 0} onClick={() => router.push("/payment")}>
                            Thanh toán
                        </Button>

                        <div style={{ marginTop: 10, fontSize: 12, color: "rgba(0,0,0,0.55)" }}>
                            Giá hiển thị lấy từ Strapi (preview), không dùng giá lưu local.
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
