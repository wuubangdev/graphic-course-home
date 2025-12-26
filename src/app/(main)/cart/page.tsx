"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Typography, Button, Empty, Space, InputNumber, Divider, notification } from "antd";
import { useCart } from "@/components/card/CartProvider";

function formatVnd(n: number) {
    return new Intl.NumberFormat("vi-VN").format(n);
}

export default function CartPage() {
    const router = useRouter();
    const { items, totalPrice, totalQty, setQty, removeItem, clear } = useCart();
    const [api, contextHolder] = notification.useNotification();

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
                                api.warning({
                                    message: "Đã xóa giỏ hàng",
                                    placement: "topRight",
                                    duration: 2,
                                });
                            }}
                        >
                            Xóa giỏ hàng
                        </Button>
                    </Space>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <Card style={{ borderRadius: 16 }} className="lg:col-span-2" bodyStyle={{ padding: 16 }}>
                        {items.length === 0 ? (
                            <Empty description="Giỏ hàng trống" />
                        ) : (
                            <div className="flex flex-col gap-12">
                                {items.map((it) => (
                                    <div key={it.id} className="flex items-start justify-between gap-4">
                                        <div style={{ flex: 1 }}>
                                            <Typography.Text strong style={{ display: "block" }}>
                                                {it.title}
                                            </Typography.Text>
                                            <Typography.Text type="secondary">{formatVnd(it.price)} đ</Typography.Text>

                                            <div className="mt-3 flex items-center gap-10">
                                                <div className="flex items-center gap-2">
                                                    <span style={{ color: "rgba(0,0,0,0.55)" }}>Số lượng</span>
                                                    <InputNumber
                                                        min={1}
                                                        max={999}
                                                        value={it.qty}
                                                        onChange={(v) => setQty(it.id, Number(v || 1))}
                                                    />
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
                                            <Typography.Text strong>{formatVnd(it.price * it.qty)} đ</Typography.Text>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>

                    <Card style={{ borderRadius: 16 }} bodyStyle={{ padding: 16 }}>
                        <Typography.Title level={5} style={{ marginTop: 0 }}>
                            Tóm tắt
                        </Typography.Title>

                        <div className="flex items-center justify-between">
                            <Typography.Text type="secondary">Tạm tính</Typography.Text>
                            <Typography.Text strong>{formatVnd(totalPrice)} đ</Typography.Text>
                        </div>

                        <Divider />

                        <Button
                            type="primary"
                            block
                            disabled={items.length === 0}
                            onClick={() => {
                                api.success({
                                    message: "Chuyển sang thanh toán",
                                    placement: "topRight",
                                    duration: 1.2,
                                });
                                router.push("/payment");
                            }}
                        >
                            Thanh toán
                        </Button>

                        <Button
                            block
                            className="mt-2"
                            disabled={items.length === 0}
                            onClick={() =>
                                api.info({
                                    message: "Mock",
                                    description: "Chức năng mã giảm giá sẽ cắm API sau.",
                                    placement: "topRight",
                                    duration: 2,
                                })
                            }
                        >
                            Áp mã giảm giá (Mock)
                        </Button>

                        <div style={{ marginTop: 10, fontSize: 12, color: "rgba(0,0,0,0.55)" }}>
                            Hiện tại chỉ là mock, chưa gọi API.
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
