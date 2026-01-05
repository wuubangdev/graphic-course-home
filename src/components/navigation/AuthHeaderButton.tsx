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

function AuthPlaceholder() {
    // Placeholder cố định: server/client render giống nhau
    return (
        <div className="flex justify-center gap-1 items-center">
            <span
                className="flex gap-2 py-2 px-2 text-sm rounded-lg text-white border-[1px] border-white/60
        hover:bg-blue-700 duration-300 cursor-pointer"
            >
                <span className="size-5 inline-block" />
                ...
            </span>
        </div>
    );
}

export default function AuthHeaderButton() {
    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();

    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    async function loadMe() {
        setLoading(true);
        try {
            const r = await fetch("/api/auth/me", { cache: "no-store" });
            if (!r.ok) {
                setUser(null);
                return;
            }
            const d: unknown = await r.json().catch(() => null);
            if (!d || typeof d !== "object") {
                setUser(null);
                return;
            }
            const u = (d as { user?: unknown }).user;
            setUser((u && typeof u === "object" ? (u as AuthUser) : null) ?? null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!mounted) return;
        void loadMe();
    }, [mounted]);

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
            { key: "profile", label: <span>Thông tin cá nhân</span>, onClick: () => router.push("/account") },
            { key: "library", label: <span>Đã mua / Tải về</span>, onClick: () => router.push("/library") },
            { key: "cart", label: <span>Giỏ hàng của tôi</span>, onClick: () => router.push("/cart") },
            { key: "payment", label: <span>Thanh toán</span>, onClick: () => router.push("/payment") },
            { type: "divider" },
            { key: "logout", danger: true, label: <span>Đăng xuất</span>, onClick: logout },
        ];
    }, [user, displayName, router]);

    // SSR + first client render: luôn giống nhau
    if (!mounted || loading) {
        return (
            <>
                {contextHolder}
                <AuthPlaceholder />
            </>
        );
    }

    // Chưa login
    if (!user) {
        return (
            <>
                {contextHolder}
                <Link href="/login" className="flex justify-center gap-1 items-center">
                    <span
                        className="flex gap-2 py-2 px-2 text-sm rounded-lg text-white border-[1px] border-white/60
            hover:bg-blue-700 duration-300 cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                            />
                        </svg>
                        Đăng nhập
                    </span>
                </Link>
            </>
        );
    }

    // Đã login
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
                    <span className="text-white">{user.username || displayName}</span>
                </div>
            </Dropdown>
        </>
    );
}
