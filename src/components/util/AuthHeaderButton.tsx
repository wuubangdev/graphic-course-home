"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown, Avatar, Typography, notification } from "antd";
import type { MenuProps } from "antd";

type AuthUser = {
    id: number | string;
    username?: string;
    email?: string;
};

function getInitial(name?: string) {
    const s = (name || "").trim();
    if (!s) return "U";
    const parts = s.split(/\s+/).filter(Boolean);
    const last = parts[parts.length - 1] || s;
    return (last[0] || "U").toUpperCase();
}

export default function AuthHeaderButton() {
    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<AuthUser | null>(null);

    async function loadMe() {
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
    }

    useEffect(() => {
        loadMe();
    }, []);

    async function logout() {
        try {
            const r = await fetch("/api/auth/logout", { method: "POST" });
            if (!r.ok) throw new Error("logout_failed");

            setUser(null);

            api.success({
                message: "Đăng xuất thành công",
                description: "Bạn đã được đăng xuất khỏi hệ thống.",
                placement: "topRight",
                duration: 2,
            });

            router.refresh();
            router.push("/");
        } catch {
            api.error({
                message: "Đăng xuất thất bại",
                description: "Vui lòng thử lại.",
                placement: "topRight",
                duration: 2,
            });
        }
    }

    const displayName = user?.username || user?.email || "Tài khoản";
    const initial = getInitial(user?.username || user?.email);

    const items: MenuProps["items"] = useMemo(() => {
        if (!user) return [];

        return [
            {
                key: "header",
                label: (
                    <div style={{ padding: "6px 2px" }}>
                        <Typography.Text strong style={{ display: "block" }}>
                            {displayName}
                        </Typography.Text>
                        {user.email && (
                            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                                {user.email}
                            </Typography.Text>
                        )}
                    </div>
                ),
            },
            { type: "divider" },
            {
                key: "profile",
                label: <span>Thông tin cá nhân</span>,
                onClick: () => router.push("/account"),
            },
            {
                key: "library",
                label: <span>Đã mua / Tải về</span>,
                onClick: () => router.push("/library"),
            },
            {
                key: "cart",
                label: <span>Giỏ hàng của tôi</span>,
                onClick: () => router.push("/cart"), // ✅ sửa đúng route
            },
            {
                key: "payment",
                label: <span>Thanh toán</span>,
                onClick: () => router.push("/payment"),
            },

            { type: "divider" },
            {
                key: "logout",
                danger: true,
                label: <span>Đăng xuất</span>,
                onClick: logout,
            },
        ];
    }, [user, displayName, router]);

    if (loading) return null;

    // Chưa login
    if (!user) {
        return (
            <>
                {contextHolder}
                <Link href="/login" className="flex justify-center gap-1 items-center">
                    <span className="py-2 px-4 2xl:py-2 2xl:px-4 rounded-lg text-blue-700 hover:text-white hover:bg-blue-700 duration-300 bg-white cursor-pointer">
                        Đăng nhập
                    </span>
                </Link>
            </>
        );
    }

    // Đã login -> avatar hover dropdown
    return (
        <>
            {contextHolder}
            <Dropdown
                trigger={["hover"]}
                menu={{ items }}
                placement="bottomRight"
                overlayStyle={{ minWidth: 260 }}
                dropdownRender={(menu) => (
                    <div
                        style={{
                            borderRadius: 12,
                            overflow: "hidden",
                            background: "#fff",
                            boxShadow: "0 18px 60px rgba(0,0,0,0.18)",
                            border: "1px solid rgba(0,0,0,0.06)",
                        }}
                    >
                        {menu}
                        {/* <div
                            style={{
                                padding: 10,
                                fontSize: 12,
                                color: "rgba(0,0,0,0.55)",
                                borderTop: "1px solid rgba(0,0,0,0.06)",
                            }}
                        >
                            Đang đăng nhập: <b>{displayName}</b>
                        </div> */}
                    </div>
                )}
            >
                <div className="flex gap-2 items-center cursor-pointer">
                    <Avatar
                        size={34}
                        className="border-white relative"
                        style={{
                            background: "#1e64e9",
                            color: "#fff",
                            fontWeight: 700,
                            border: "1px solid #fff",
                        }}
                    >
                        {initial}
                    </Avatar>
                    <span className="text-white">{user.username}</span>
                </div>
            </Dropdown>
        </>
    );
}
