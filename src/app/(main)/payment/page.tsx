"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Typography, Divider, Input, Form, Space, Tag, notification, Skeleton, Button } from "antd";
import { useCart } from "@/components/card/CartProvider";
import PayNowButton from "@/components/util/PayNowButton";

function formatVnd(n: number) {
    return new Intl.NumberFormat("vi-VN").format(Math.max(0, Math.floor(n || 0)));
}

function formatCountdown(ms: number) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
}

type CheckoutRes = {
    orderId: number;
    orderCode: string;
    amount: number;
    currency: "VND" | string;
    expiresAt: string;
    transferContent: string;
};

type OrderStatusRes = {
    ok: boolean;
    order: {
        code: string;
        status: "pending" | "paid" | "cancelled" | "expired";
        totalAmount: number;
        currency: string;
        expiresAt?: string | null;
        paidAt?: string | null;
    };
};

function parseISO(s: string | null | undefined) {
    if (!s) return null;
    const t = Date.parse(s);
    return Number.isNaN(t) ? null : t;
}

export default function PaymentPage() {
    const router = useRouter();
    const { items, clear } = useCart();
    const [api, contextHolder] = notification.useNotification();

    const courseDocumentIds = useMemo(() => Array.from(new Set(items.map((x) => x.id))), [items]);

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<CheckoutRes | null>(null);
    const [leftMs, setLeftMs] = useState<number>(0);

    const bankAcc = process.env.NEXT_PUBLIC_SEPAY_BANK_ACC || "";
    const bankName = process.env.NEXT_PUBLIC_SEPAY_BANK_NAME || "";

    const qrUrl = useMemo(() => {
        if (!order) return "";
        if (!bankAcc || !bankName) return "";
        const des = encodeURIComponent(order.transferContent);
        return `https://qr.sepay.vn/img?acc=${encodeURIComponent(bankAcc)}&bank=${encodeURIComponent(
            bankName
        )}&amount=${encodeURIComponent(String(order.amount))}&des=${des}`;
    }, [order, bankAcc, bankName]);

    const expired = !!order && leftMs <= 0;

    async function createOrder() {
        if (courseDocumentIds.length === 0) return;

        setLoading(true);
        try {
            const r = await fetch("/api/checkout", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ courseDocumentIds }),
            });

            const data: unknown = await r.json().catch(() => null);

            if (r.status === 401) {
                api.error({
                    message: "Chưa đăng nhập",
                    description: "Bạn cần đăng nhập để thanh toán.",
                    placement: "topRight",
                    duration: 2.5,
                });
                router.push("/cart");
                return;
            }

            if (!r.ok || !data || typeof data !== "object") {
                api.error({ message: "Tạo đơn thất bại", placement: "topRight", duration: 2 });
                return;
            }

            const o = data as CheckoutRes;
            setOrder(o);

            const exp = parseISO(o.expiresAt);
            setLeftMs(exp ? Math.max(0, exp - Date.now()) : 0);

            api.success({ message: "Đã tạo đơn thanh toán", placement: "topRight", duration: 1.2 });
        } finally {
            setLoading(false);
        }
    }

    // tạo order ngay khi vào trang
    useEffect(() => {
        if (courseDocumentIds.length === 0) {
            setLoading(false);
            setOrder(null);
            return;
        }
        void createOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseDocumentIds.join("|")]);

    // countdown theo expiresAt thật
    useEffect(() => {
        if (!order) return;
        const exp = parseISO(order.expiresAt);
        if (!exp) return;

        const t = setInterval(() => setLeftMs(Math.max(0, exp - Date.now())), 250);
        return () => clearInterval(t);
    }, [order]);

    // poll trạng thái order
    useEffect(() => {
        if (!order) return;
        if (expired) return;

        let alive = true;
        const timer = setInterval(async () => {
            try {
                const r = await fetch(`/api/orders/${encodeURIComponent(order.orderCode)}`, { cache: "no-store" });
                const data: unknown = await r.json().catch(() => null);
                if (!alive) return;
                if (!r.ok || !data || typeof data !== "object") return;

                const s = data as OrderStatusRes;
                if (!s.ok) return;

                if (s.order.status === "paid") {
                    api.success({
                        message: "Thanh toán thành công",
                        description: `Đơn ${s.order.code} đã được ghi nhận.`,
                        placement: "topRight",
                        duration: 2,
                    });
                    clear();
                    router.push("/library");
                }
            } catch {
                // ignore
            }
        }, 3000);

        return () => {
            alive = false;
            clearInterval(timer);
        };
    }, [order, expired, api, clear, router]);

    // bắn noti hết hạn 1 lần
    const [expiredNoti, setExpiredNoti] = useState(false);
    useEffect(() => {
        if (!expired) return;
        if (expiredNoti) return;
        setExpiredNoti(true);
        api.error({
            message: "Hết hạn thanh toán",
            description: "Phiên thanh toán đã hết hạn. Bấm 'Tạo lại đơn' hoặc quay lại giỏ hàng.",
            placement: "topRight",
            duration: 3,
        });
    }, [expired, expiredNoti, api]);

    if (items.length === 0) {
        return (
            <div className="mx-auto w-full max-w-6xl px-4 py-10">
                <Card style={{ borderRadius: 16 }}>
                    <Typography.Title level={4} style={{ marginTop: 0 }}>
                        Không có sản phẩm để thanh toán
                    </Typography.Title>
                    <Link href="/cart">Quay lại giỏ hàng</Link>
                </Card>
            </div>
        );
    }

    return (
        <>
            {contextHolder}

            <div className="mx-auto w-full max-w-6xl px-4 py-8">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                            Thanh toán
                        </Typography.Title>
                        <Typography.Text type="secondary">
                            Mã đơn: <b>{order?.orderCode || "..."}</b>
                        </Typography.Text>
                    </div>

                    <div className="flex items-center gap-2">
                        <Tag color={expired ? "red" : "blue"}>Hết hạn sau: {formatCountdown(leftMs)}</Tag>
                        <Link href="/cart">Quay lại giỏ hàng</Link>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* LEFT */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <Card style={{ borderRadius: 16 }} bodyStyle={{ padding: 16 }}>
                            <Typography.Title level={5} style={{ marginTop: 0 }}>
                                Thông tin đơn hàng
                            </Typography.Title>

                            {loading || !order ? (
                                <Skeleton active />
                            ) : (
                                <>
                                    <div className="flex items-center justify-between">
                                        <Typography.Text type="secondary">Tổng cộng</Typography.Text>
                                        <Typography.Text strong style={{ fontSize: 18 }}>
                                            {formatVnd(order.amount)} đ
                                        </Typography.Text>
                                    </div>

                                    {expired && (
                                        <div className="mt-2 text-sm" style={{ color: "#cf1322" }}>
                                            Phiên thanh toán đã hết hạn. Vui lòng tạo lại đơn.
                                        </div>
                                    )}

                                    <div className="mt-4 flex gap-2">
                                        <Button disabled={loading} onClick={() => router.push("/cart")}>
                                            Về giỏ hàng
                                        </Button>
                                        <Button
                                            type="primary"
                                            disabled={loading}
                                            onClick={async () => {
                                                setExpiredNoti(false);
                                                await createOrder();
                                            }}
                                        >
                                            Tạo lại đơn
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Card>

                        <Card style={{ borderRadius: 16 }} bodyStyle={{ padding: 16 }}>
                            <Typography.Title level={5} style={{ marginTop: 0 }}>
                                Thông tin người nhận
                            </Typography.Title>

                            <Form layout="vertical" requiredMark={false} size="large">
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true }]}>
                                        <Input placeholder="Nguyễn Văn A" />
                                    </Form.Item>
                                    <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true }]}>
                                        <Input placeholder="09xx xxx xxx" />
                                    </Form.Item>
                                </div>

                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <Form.Item label="Email nhận thông tin" name="email" rules={[{ required: true }]}>
                                        <Input placeholder="you@email.com" />
                                    </Form.Item>
                                    <Form.Item label="Ghi chú" name="note">
                                        <Input placeholder="Ví dụ: gửi info tài khoản qua email..." />
                                    </Form.Item>
                                </div>

                                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                                    Hệ thống sẽ tự cập nhật khi Sepay bắn webhook (polling mỗi 3s).
                                </Typography.Text>
                            </Form>
                        </Card>
                    </div>

                    {/* RIGHT */}
                    <Card style={{ borderRadius: 16 }} bodyStyle={{ padding: 16 }}>
                        <Typography.Title level={5} style={{ marginTop: 0 }}>
                            Quét QR để thanh toán (Sepay)
                        </Typography.Title>

                        {loading || !order ? (
                            <Skeleton active />
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                {!bankAcc || !bankName ? (
                                    <div
                                        className="rounded-md px-4 py-3 w-full"
                                        style={{
                                            background: "rgba(250,173,20,0.12)",
                                            border: "1px solid rgba(250,173,20,0.35)",
                                        }}
                                    >
                                        <Typography.Text>
                                            Thiếu env QR: <b>NEXT_PUBLIC_SEPAY_BANK_ACC</b> / <b>NEXT_PUBLIC_SEPAY_BANK_NAME</b>
                                        </Typography.Text>
                                    </div>
                                ) : (
                                    <img
                                        src={qrUrl}
                                        alt="Sepay QR"
                                        width={240}
                                        height={240}
                                        style={{
                                            borderRadius: 14,
                                            border: "1px solid rgba(0,0,0,0.08)",
                                            boxShadow: "0 12px 40px rgba(0,0,0,0.10)",
                                            background: "#fff",
                                        }}
                                    />
                                )}

                                <div className="w-full">
                                    <div className="flex items-center justify-between">
                                        <Typography.Text type="secondary">Số tiền</Typography.Text>
                                        <Typography.Text strong>{formatVnd(order.amount)} đ</Typography.Text>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Typography.Text type="secondary">Nội dung</Typography.Text>
                                        <Typography.Text strong>{order.transferContent}</Typography.Text>
                                    </div>
                                </div>

                                <Divider style={{ margin: "12px 0" }} />

                                <Space direction="vertical" style={{ width: "100%" }} size={10}>
                                    <PayNowButton
                                        disabled={expired}
                                        className="w-full justify-center"
                                        onClick={() => {
                                            api.info({
                                                message: "Chờ webhook",
                                                description: "Sau khi chuyển khoản, hệ thống sẽ tự ghi nhận khi nhận webhook.",
                                                placement: "topRight",
                                                duration: 2,
                                            });
                                        }}
                                    />

                                    <button
                                        type="button"
                                        disabled={expired}
                                        onClick={async () => {
                                            if (expired || !order) return;
                                            await navigator.clipboard.writeText(order.transferContent);
                                            api.success({
                                                message: "Đã copy nội dung chuyển khoản",
                                                description: order.transferContent,
                                                placement: "topRight",
                                                duration: 2,
                                            });
                                        }}
                                        className={[
                                            "border-[1px] rounded-md px-8 py-3 bg-white text-blue-700 flex gap-1 justify-center",
                                            "hover:bg-blue-50 duration-300 cursor-pointer",
                                            expired ? "opacity-50 cursor-not-allowed hover:bg-white" : "",
                                        ].join(" ")}
                                    >
                                        Copy nội dung chuyển khoản
                                    </button>
                                </Space>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
}
