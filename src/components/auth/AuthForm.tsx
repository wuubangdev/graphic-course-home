"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Form, Input, Button, Alert, Typography, Space } from "antd";
import Link from "next/link";
import Image from "next/image";
import styles from "./AuthFormAntd.module.css";

type Mode = "login" | "register";

type Props = {
    mode: Mode;
    redirectTo?: string;
};

type LoginValues = {
    identifier: string;
    password: string;
};

type RegisterValues = {
    email: string;
    username?: string;
    password: string;
};

type FormValues = LoginValues | RegisterValues;


export default function AuthFormAntd({ mode, redirectTo = "/" }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    async function onFinish(values: FormValues) {
        setErr(null);
        setLoading(true);

        try {
            const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";

            const payload =
                mode === "login"
                    ? {
                        identifier: (values as LoginValues).identifier.trim(),
                        password: (values as LoginValues).password,
                    }
                    : {
                        email: (values as RegisterValues).email.trim(),
                        username: (
                            (values as RegisterValues).username?.trim() ||
                            (values as RegisterValues).email.split("@")[0] ||
                            ""
                        ).trim(),
                        password: (values as RegisterValues).password,
                    };

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = (await res.json().catch(() => null)) as
                | { ok?: boolean; message?: string }
                | null;

            if (!res.ok || !data?.ok) {
                setErr(data?.message || "Có lỗi xảy ra");
                return;
            }

            router.push(redirectTo);
            router.refresh();
        } catch {
            setErr("Không kết nối được server");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.shell}>
                {/* Left branding (tự ẩn trên mobile bằng CSS) */}
                <aside className={styles.brand} aria-label="Brand panel">
                    <div className={styles.brandTop}>
                        <div className={styles.logoWrap}>
                            {/* ✅ đổi src theo logo của bạn trong /public */}
                            <Image
                                src="/logo.png"
                                alt="KHOAHOCDOHOA"
                                fill
                                className={styles.logoImg}
                            />
                        </div>
                    </div>
                    <div className={styles.hero}>
                        <div className={styles.heroTitle}>
                            {mode === "login" ? "Đăng nhập để mua hàng" : "Tạo tài khoản để bắt đầu"}
                        </div>
                        <div className={styles.heroDesc}>
                            Truy cập khóa học đã mua, tài nguyên bài học, lịch sử thanh toán và hỗ trợ Q&A.
                        </div>

                        <div className={styles.chips}>
                            {["Học thực chiến", "File dự án", "Hỗ trợ Q&A"].map((t) => (
                                <span key={t} className={styles.chip}>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.brandFoot}>
                        Nhanh • Gọn • An toàn
                    </div>
                </aside>

                {/* Right form */}
                <Card className={styles.card} variant="outlined">
                    <Space direction="vertical" size={16} style={{ width: "100%" }}>
                        <div className={styles.header}>
                            <Typography.Title level={3} style={{ margin: 0, textAlign: "center" }}>
                                {mode === "login" ? "Đăng nhập" : "Đăng ký"}
                            </Typography.Title>
                            <Typography.Title level={5} style={{ marginTop: 4, fontSize: 14, textAlign: "center", fontWeight: 400 }}>
                                {mode === "login"
                                    ? "Đăng nhập để tiếp tục mua và học khóa học."
                                    : "Tạo tài khoản mới để bắt đầu."}
                            </Typography.Title>
                        </div>

                        {err && <Alert type="error" message={err} showIcon />}

                        <Form layout="vertical" onFinish={onFinish} requiredMark={false} size="large">
                            {mode === "login" ? (
                                <Form.Item
                                    label="Email/Username"
                                    name="identifier"
                                    rules={[{ required: true, message: "Nhập email hoặc username" }]}
                                >
                                    <Input
                                        placeholder="email@gmail.com hoặc username"
                                        autoComplete="username"
                                        allowClear
                                    />
                                </Form.Item>
                            ) : (
                                <>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            { required: true, message: "Nhập email" },
                                            { type: "email", message: "Email không hợp lệ" },
                                        ]}
                                    >
                                        <Input placeholder="you@email.com" autoComplete="email" allowClear />
                                    </Form.Item>

                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        tooltip="Bỏ trống sẽ tự lấy theo phần trước dấu @ của email"
                                    >
                                        <Input placeholder="vd: changtraibandog" autoComplete="username" allowClear />
                                    </Form.Item>
                                </>
                            )}

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: "Nhập password" },
                                    ...(mode === "register" ? [{ min: 6, message: "Tối thiểu 6 ký tự" }] : []),
                                ]}
                            >
                                <Input.Password
                                    placeholder="••••••••"
                                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                                />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                                className={styles.primaryBtn}
                            >
                                {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
                            </Button>

                            <div className={styles.linksRow}>
                                {mode === "login" ? (
                                    <>
                                        <span>
                                            Chưa có tài khoản? &nbsp;
                                            <Link href="/register" className={styles.link}>
                                                Đăng ký
                                            </Link>
                                        </span>

                                        <Link href="/" className={styles.linkMuted}>
                                            Về trang chủ
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <span>
                                            Đã có tài khoản? &nbsp;
                                            <Link href="/login" className={styles.link}>
                                                Đăng nhập
                                            </Link>
                                        </span>
                                        <Link href="/" className={styles.linkMuted}>
                                            Về trang chủ
                                        </Link>
                                    </>
                                )}
                            </div>
                            <div className={styles.notice}>
                                Bằng việc tiếp tục, bạn đồng ý với điều khoản và chính sách của KHOAHOCDOHOA.
                            </div>
                        </Form>
                    </Space>
                </Card>
            </div>
        </div>
    );
}
