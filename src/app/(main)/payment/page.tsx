"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Typography, Divider, Input, Form, Space, Tag, notification } from "antd";
import { useCart } from "@/components/card/CartProvider";
import PayNowButton from "@/components/util/PayNowButton";

function formatVnd(n: number) {
    return new Intl.NumberFormat("vi-VN").format(n);
}

function formatCountdown(ms: number) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
}

// QR mock (pattern) để demo UI
function QRMock({ text }: { text: string }) {
    const size = 220;
    const cells = 29;

    let h = 2166136261;
    for (let i = 0; i < text.length; i++) h = (h ^ text.charCodeAt(i)) * 16777619;

    const blocks: { x: number; y: number }[] = [];
    for (let y = 0; y < cells; y++) {
        for (let x = 0; x < cells; x++) {
            const inFinder =
                (x < 7 && y < 7) ||
                (x > cells - 8 && y < 7) ||
                (x < 7 && y > cells - 8);
            if (inFinder) continue;

            const v = (h + x * 131 + y * 193) >>> 0;
            if (v % 5 === 0) blocks.push({ x, y });
        }
    }

    return (
        <div
            style={{
                width: size,
                height: size,
                background: "#fff",
                borderRadius: 14,
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.10)",
                padding: 10,
            }}
        >
            <svg width={size - 20} height={size - 20} viewBox={`0 0 ${cells} ${cells}`}>
                <rect x="0" y="0" width="7" height="7" fill="#000" opacity="0.9" />
                <rect x={cells - 7} y="0" width="7" height="7" fill="#000" opacity="0.9" />
                <rect x="0" y={cells - 7} width="7" height="7" fill="#000" opacity="0.9" />
                {blocks.map((b, i) => (
                    <rect key={i} x={b.x} y={b.y} width="1" height="1" fill="#000" opacity="0.85" />
                ))}
            </svg>
        </div>
    );
}

export default function PaymentPage() {
    const router = useRouter();
    const { items, totalPrice, totalQty, clear } = useCart();
    const [api, contextHolder] = notification.useNotification();

    const EXPIRE_MS = 10 * 60 * 1000; // 10 phút
    const [leftMs, setLeftMs] = useState(EXPIRE_MS);

    const orderCode = useMemo(() => {
        const ts = Date.now().toString().slice(-8);
        return `KHDH-${ts}`;
    }, []);

    const qrPayload = useMemo(() => {
        return `PAY|${orderCode}|AMOUNT=${totalPrice}|QTY=${totalQty}`;
    }, [orderCode, totalPrice, totalQty]);

    useEffect(() => {
        const start = Date.now();
        const t = setInterval(() => {
            const elapsed = Date.now() - start;
            setLeftMs(EXPIRE_MS - elapsed);
        }, 250);
        return () => clearInterval(t);
    }, []);

    const expired = leftMs <= 0;

    // bắn noti hết hạn 1 lần
    const [expiredNoti, setExpiredNoti] = useState(false);
    useEffect(() => {
        if (!expired) return;
        if (expiredNoti) return;
        setExpiredNoti(true);

        api.error({
            message: "Hết hạn thanh toán",
            description: "Phiên thanh toán đã hết hạn. Vui lòng quay lại giỏ hàng để tạo lại.",
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
                            Mã đơn: <b>{orderCode}</b>
                        </Typography.Text>
                    </div>

                    <div className="flex items-center gap-2">
                        <Tag color={expired ? "red" : "blue"}>Hết hạn sau: {formatCountdown(leftMs)}</Tag>
                        <Link href="/cart" className="text-white/90 hover:text-white">
                            Quay lại giỏ hàng
                        </Link>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* LEFT */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <Card style={{ borderRadius: 16 }} bodyStyle={{ padding: 16 }}>
                            <Typography.Title level={5} style={{ marginTop: 0 }}>
                                Thông tin sản phẩm
                            </Typography.Title>

                            <div className="flex flex-col gap-3">
                                {items.map((it) => (
                                    <div key={it.id} className="flex items-start justify-between gap-4">
                                        <div>
                                            <Typography.Text strong style={{ display: "block" }}>
                                                {it.title}
                                            </Typography.Text>
                                            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                                                {formatVnd(it.price)} đ × {it.qty}
                                            </Typography.Text>
                                        </div>
                                        <Typography.Text strong>{formatVnd(it.price * it.qty)} đ</Typography.Text>
                                    </div>
                                ))}
                            </div>

                            <Divider />

                            <div className="flex items-center justify-between">
                                <Typography.Text type="secondary">Tổng cộng</Typography.Text>
                                <Typography.Text strong style={{ fontSize: 18 }}>
                                    {formatVnd(totalPrice)} đ
                                </Typography.Text>
                            </div>

                            {expired && (
                                <div className="mt-2 text-sm" style={{ color: "#cf1322" }}>
                                    Phiên thanh toán đã hết hạn. Vui lòng quay lại giỏ hàng để tạo lại.
                                </div>
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
                                    Với sản phẩm tài khoản (Netflix/ChatGPT/Gemini), thông tin sẽ được gửi theo email sau khi xác nhận thanh toán.
                                </Typography.Text>
                            </Form>
                        </Card>
                    </div>

                    {/* RIGHT */}
                    <Card style={{ borderRadius: 16 }} bodyStyle={{ padding: 16 }}>
                        <Typography.Title level={5} style={{ marginTop: 0 }}>
                            Quét QR để thanh toán
                        </Typography.Title>

                        <div className="flex flex-col items-center gap-3">
                            <QRMock text={qrPayload} />

                            <div className="w-full">
                                <div className="flex items-center justify-between">
                                    <Typography.Text type="secondary">Số tiền</Typography.Text>
                                    <Typography.Text strong>{formatVnd(totalPrice)} đ</Typography.Text>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Typography.Text type="secondary">Nội dung</Typography.Text>
                                    <Typography.Text strong>{orderCode}</Typography.Text>
                                </div>
                            </div>

                            <Divider style={{ margin: "12px 0" }} />

                            <Space direction="vertical" style={{ width: "100%" }} size={10}>
                                <div
                                    className="rounded-md px-4 py-3"
                                    style={{
                                        background: "rgba(30,100,233,0.06)",
                                        border: "1px solid rgba(30,100,233,0.18)",
                                    }}
                                >
                                    <Typography.Text>Đây là giao diện mock, chưa gọi API.</Typography.Text>
                                </div>

                                <PayNowButton
                                    disabled={expired}
                                    className="w-full justify-center"
                                    onClick={() => {
                                        if (expired) return;

                                        api.success({
                                            message: "Thanh toán thành công (Mock)",
                                            description: "Đơn hàng sẽ được ghi nhận và cập nhật vào thư viện đã mua.",
                                            placement: "topRight",
                                            duration: 2.2,
                                        });

                                        clear();
                                        setTimeout(() => router.push("/library"), 600);
                                    }}
                                />

                                <button
                                    type="button"
                                    disabled={expired}
                                    onClick={async () => {
                                        if (expired) return;
                                        await navigator.clipboard.writeText(orderCode);
                                        api.success({
                                            message: "Đã copy nội dung chuyển khoản",
                                            description: orderCode,
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
                    </Card>
                </div>
            </div>
        </>
    );
}
