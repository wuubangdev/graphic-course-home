"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    Avatar,
    Button,
    Card,
    Descriptions,
    Space,
    Typography,
    Skeleton,
    Tag,
    message,
} from "antd";

type AuthUser = {
    id: number | string;
    username?: string;
    email?: string;
    confirmed?: boolean;
    blocked?: boolean;
    createdAt?: string;
};

function getInitial(name?: string) {
    const s = (name || "").trim();
    if (!s) return "U";
    const parts = s.split(/\s+/).filter(Boolean);
    const last = parts[parts.length - 1] || s;
    return (last[0] || "U").toUpperCase();
}

export default function AccountPage() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const r = await fetch("/api/auth/me", { cache: "no-store" });
                if (!r.ok) {
                    setUser(null);
                    return;
                }
                const d = (await r.json()) as { ok: boolean; user: AuthUser };
                setUser(d.user ?? null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const displayName = useMemo(
        () => user?.username || user?.email || "Tài khoản",
        [user]
    );

    const statusTag = useMemo(() => {
        if (!user) return null;
        if (user.blocked) return <Tag color="red">Bị khóa</Tag>;
        if (user.confirmed === false) return <Tag color="gold">Chưa xác minh</Tag>;
        return <Tag color="green">Hoạt động</Tag>;
    }, [user]);

    if (loading) {
        return (
            <div className="mx-auto w-full max-w-5xl px-4 py-8">
                <Card style={{ borderRadius: 16 }}>
                    <Skeleton active paragraph={{ rows: 6 }} />
                </Card>
            </div>
        );
    }

    // middleware đã chặn rồi, nhưng vẫn handle fallback
    if (!user) {
        return (
            <div className="mx-auto w-full max-w-5xl px-4 py-10">
                <Card style={{ borderRadius: 16 }}>
                    <Typography.Title level={4} style={{ marginTop: 0 }}>
                        Bạn chưa đăng nhập
                    </Typography.Title>
                    <Link href="/login">Đi tới đăng nhập</Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <Space size={12} align="center">
                    <Avatar
                        size={52}
                        style={{
                            background: "#1e64e9",
                            fontWeight: 800,
                        }}
                    >
                        {getInitial(displayName)}
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                            <Typography.Title level={4} style={{ margin: 0 }}>
                                {displayName}
                            </Typography.Title>
                            {statusTag}
                        </div>
                        <Typography.Text type="secondary">
                            Quản lý thông tin tài khoản và truy cập khóa học.
                        </Typography.Text>
                    </div>
                </Space>

                <Space wrap>
                    <Button
                        onClick={() => message.info("Chức năng cập nhật hồ sơ sẽ cắm API sau.")}
                    >
                        Chỉnh sửa
                    </Button>
                    <Link href="/library">
                        <Button type="primary">Sản phẩm đã mua</Button>
                    </Link>
                </Space>
            </div>

            {/* Content */}
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Card style={{ borderRadius: 16 }} className="lg:col-span-2">
                    <Typography.Title level={5} style={{ marginTop: 0 }}>
                        Thông tin cá nhân
                    </Typography.Title>

                    <Descriptions
                        column={1}
                        size="middle"
                        labelStyle={{ width: 160, color: "rgba(0,0,0,0.65)" }}
                        contentStyle={{ fontWeight: 600 }}
                        bordered
                    >
                        <Descriptions.Item label="Username">
                            {user.username || "-"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {user.email || "-"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            {user.blocked ? "Bị khóa" : "Hoạt động"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Xác minh">
                            {user.confirmed === false ? "Chưa xác minh" : "Đã xác minh / N/A"}
                        </Descriptions.Item>
                    </Descriptions>

                    <div className="mt-4">
                        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                            Gợi ý: Bạn có thể thêm trang đổi mật khẩu sau khi cắm endpoint riêng trong Strapi.
                        </Typography.Text>
                    </div>
                </Card>

                <Card style={{ borderRadius: 16 }}>
                    <Typography.Title level={5} style={{ marginTop: 0 }}>
                        Hành động nhanh
                    </Typography.Title>

                    <div className="flex flex-col gap-2">
                        <Link href="/library">
                            <Button block type="primary">
                                Vào sản phẩm đã mua
                            </Button>
                        </Link>
                        <Button
                            block
                            onClick={() => message.info("Chức năng hóa đơn/lịch sử thanh toán sẽ cắm sau.")}
                        >
                            Lịch sử thanh toán
                        </Button>
                        <Button
                            block
                            danger
                            onClick={async () => {
                                await fetch("/api/auth/logout", { method: "POST" });
                                window.location.href = "/";
                            }}
                        >
                            Đăng xuất
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
