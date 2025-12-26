"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    Card,
    Typography,
    Input,
    Select,
    Space,
    Skeleton,
    Empty,
    Tag,
    Button,
    Modal,
    Descriptions,
    Divider,
    message,
} from "antd";

type AuthUser = {
    id: number | string;
    username?: string;
    email?: string;
};

type ItemType = "course" | "digital" | "account";

type PurchasedItem = {
    id: string | number;
    type: ItemType;
    title: string;

    // hiển thị phụ
    category?: string; // Photoshop, Netflix, Tools...
    status?: "active" | "expired" | "pending"; // account/subscription
    purchasedAt?: string;

    // link tải / hướng dẫn
    downloadUrl?: string;
    guideUrl?: string;

    // secret / credential (KHÔNG khuyến nghị trả plaintext từ server; xem note bên dưới)
    credential?: {
        username?: string;
        email?: string;
        password?: string;
        note?: string;
    };

    // notes
    notes?: string;
};

// Demo data (thay bằng API thật)
function mockLibrary(): PurchasedItem[] {
    return [
        {
            id: 1,
            type: "course",
            title: "Photoshop Cơ bản – File dự án + tài nguyên",
            category: "Photoshop",
            downloadUrl: "https://example.com/download/ps-course.zip",
            guideUrl: "https://example.com/guide/ps-course",
            notes: "Link tải gồm: file PSD, assets, bài tập.",
        },
        {
            id: 2,
            type: "digital",
            title: "Bộ Plugin Retouch – Tools pack",
            category: "Tools",
            downloadUrl: "https://example.com/download/tools-pack.zip",
            notes: "Giải nén, copy vào thư mục plugins theo hướng dẫn.",
        },
        {
            id: 3,
            type: "account",
            title: "Tài khoản Netflix (1 tháng)",
            category: "Netflix",
            status: "active",
            guideUrl: "https://example.com/guide/netflix",
            credential: { email: "netflix_user@x.com", password: "••••••••", note: "Không đổi pass." },
            notes: "Nếu lỗi đăng nhập, liên hệ hỗ trợ.",
        },
        {
            id: 4,
            type: "account",
            title: "ChatGPT Plus (30 ngày)",
            category: "ChatGPT",
            status: "pending",
            notes: "Đang kích hoạt. Bạn sẽ nhận thông tin trong vòng 24h.",
        },
    ];
}

function typeTag(type: ItemType) {
    if (type === "course") return <Tag color="blue">Khóa học</Tag>;
    if (type === "digital") return <Tag color="geekblue">Sản phẩm số</Tag>;
    return <Tag color="purple">Tài khoản</Tag>;
}

function statusTag(status?: PurchasedItem["status"]) {
    if (!status) return null;
    if (status === "active") return <Tag color="green">Đang hoạt động</Tag>;
    if (status === "expired") return <Tag color="red">Hết hạn</Tag>;
    return <Tag color="gold">Đang xử lý</Tag>;
}

export default function LibraryPage() {
    const [meLoading, setMeLoading] = useState(true);
    const [user, setUser] = useState<AuthUser | null>(null);

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<PurchasedItem[]>([]);

    const [q, setQ] = useState("");
    const [filterType, setFilterType] = useState<"all" | ItemType>("all");
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "expired" | "pending">("all");

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<PurchasedItem | null>(null);

    useEffect(() => {
        (async () => {
            setMeLoading(true);
            try {
                const r = await fetch("/api/auth/me", { cache: "no-store" });
                if (!r.ok) {
                    setUser(null);
                    return;
                }
                const d = (await r.json()) as { ok: boolean; user: AuthUser };
                setUser(d.user ?? null);
            } finally {
                setMeLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                // TODO: thay bằng API thật:
                // const r = await fetch("/api/library", { cache: "no-store" });
                // const d = await r.json();
                // setItems(d.items ?? []);
                setItems(mockLibrary());
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const filtered = useMemo(() => {
        const qq = q.trim().toLowerCase();
        return items.filter((it) => {
            const matchQ = !qq || it.title.toLowerCase().includes(qq) || (it.category || "").toLowerCase().includes(qq);
            const matchType = filterType === "all" || it.type === filterType;
            const matchStatus =
                filterStatus === "all" || (it.status ? it.status === filterStatus : false);
            // nếu lọc status mà item không có status (course/digital) => ẩn
            const okStatus = filterStatus === "all" ? true : it.type === "account" && matchStatus;
            return matchQ && matchType && okStatus;
        });
    }, [items, q, filterType, filterStatus]);

    function openDetail(it: PurchasedItem) {
        setSelected(it);
        setOpen(true);
    }

    async function copy(text?: string) {
        if (!text) return;
        await navigator.clipboard.writeText(text);
        message.success("Đã copy");
    }

    if (meLoading) {
        return (
            <div className="mx-auto w-full max-w-6xl px-4 py-8">
                <Card style={{ borderRadius: 16 }}>
                    <Skeleton active paragraph={{ rows: 6 }} />
                </Card>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="mx-auto w-full max-w-6xl px-4 py-10">
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
        <div className="mx-auto w-full max-w-6xl px-4 py-8">
            {/* Header */}
            <div className="flex flex-col gap-3 items-start md:justify-between">
                <div className="flex flex-col flex-1">
                    <Typography.Title level={4} style={{ margin: 0 }}>
                        Thư viện đã mua
                    </Typography.Title>
                    <Typography.Text type="secondary">
                        Link tải / hướng dẫn / thông tin tài khoản (nếu có).
                    </Typography.Text>
                </div>
                <Space wrap>
                    <Select
                        value={filterType}
                        onChange={setFilterType}
                        style={{ width: 170 }}
                        options={[
                            { value: "all", label: "Tất cả loại" },
                            { value: "course", label: "Khóa học" },
                            { value: "digital", label: "Sản phẩm số" },
                            { value: "account", label: "Tài khoản" },
                        ]}
                    />
                    <Select
                        value={filterStatus}
                        onChange={setFilterStatus}
                        style={{ width: 170 }}
                        options={[
                            { value: "all", label: "Mọi trạng thái" },
                            { value: "active", label: "Đang hoạt động" },
                            { value: "pending", label: "Đang xử lý" },
                            { value: "expired", label: "Hết hạn" },
                        ]}
                    />
                    <Input
                        placeholder="Tìm theo tên hoặc danh mục..."
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        allowClear
                        style={{ width: 280 }}
                    />
                    {/* <Link href="/account">
                        <Button>Thông tin cá nhân</Button>
                    </Link> */}
                </Space>
            </div>

            {/* Grid cards */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i} style={{ borderRadius: 16 }}>
                            <Skeleton active paragraph={{ rows: 3 }} />
                        </Card>
                    ))
                ) : filtered.length === 0 ? (
                    <div className="md:col-span-2 xl:col-span-3">
                        <Card style={{ borderRadius: 16 }}>
                            <Empty description="Chưa có mục phù hợp" />
                        </Card>
                    </div>
                ) : (
                    filtered.map((it) => (
                        <Card
                            key={it.id}
                            style={{ borderRadius: 16 }}
                            bodyStyle={{ padding: 16 }}
                            hoverable
                            onClick={() => openDetail(it)}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <Typography.Title level={5} style={{ margin: 0 }}>
                                    {it.title}
                                </Typography.Title>
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                {typeTag(it.type)}
                                {it.category && <Tag color="cyan">{it.category}</Tag>}
                                {statusTag(it.status)}
                            </div>

                            <div className="mt-3 flex gap-2">
                                {it.downloadUrl && (
                                    <Button
                                        type="primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(it.downloadUrl, "_blank");
                                        }}
                                        block
                                    >
                                        Tải xuống
                                    </Button>
                                )}

                                {!it.downloadUrl && it.guideUrl && (
                                    <Button
                                        type="primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(it.guideUrl!, "_blank");
                                        }}
                                        block
                                    >
                                        Xem hướng dẫn
                                    </Button>
                                )}

                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openDetail(it);
                                    }}
                                    block
                                >
                                    Chi tiết
                                </Button>
                            </div>

                            {it.notes && (
                                <Typography.Text type="secondary" style={{ display: "block", marginTop: 10 }}>
                                    {it.notes.length > 80 ? it.notes.slice(0, 80) + "..." : it.notes}
                                </Typography.Text>
                            )}
                        </Card>
                    ))
                )}
            </div>

            {/* Detail Modal */}
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                title="Chi tiết"
                centered
            >
                {selected && (
                    <>
                        <Typography.Title level={5} style={{ marginTop: 0 }}>
                            {selected.title}
                        </Typography.Title>

                        <div className="flex flex-wrap gap-2">
                            {typeTag(selected.type)}
                            {selected.category && <Tag color="cyan">{selected.category}</Tag>}
                            {statusTag(selected.status)}
                        </div>

                        <Divider />

                        <Descriptions column={1} bordered size="small">
                            <Descriptions.Item label="Loại">{selected.type}</Descriptions.Item>
                            {selected.purchasedAt && (
                                <Descriptions.Item label="Ngày mua">{selected.purchasedAt}</Descriptions.Item>
                            )}
                            {selected.downloadUrl && (
                                <Descriptions.Item label="Link tải">
                                    <Space wrap>
                                        <a href={selected.downloadUrl} target="_blank" rel="noreferrer">
                                            Mở link
                                        </a>
                                        <Button size="small" onClick={() => copy(selected.downloadUrl)}>
                                            Copy
                                        </Button>
                                    </Space>
                                </Descriptions.Item>
                            )}
                            {selected.guideUrl && (
                                <Descriptions.Item label="Hướng dẫn">
                                    <Space wrap>
                                        <a href={selected.guideUrl} target="_blank" rel="noreferrer">
                                            Mở hướng dẫn
                                        </a>
                                        <Button size="small" onClick={() => copy(selected.guideUrl)}>
                                            Copy
                                        </Button>
                                    </Space>
                                </Descriptions.Item>
                            )}
                        </Descriptions>

                        {selected.type === "account" && selected.credential && (
                            <>
                                <Divider />
                                <Typography.Text strong>Thông tin tài khoản</Typography.Text>
                                <div style={{ marginTop: 10 }}>
                                    <Descriptions column={1} bordered size="small">
                                        {selected.credential.email && (
                                            <Descriptions.Item label="Email">
                                                <Space wrap>
                                                    <span>{selected.credential.email}</span>
                                                    <Button size="small" onClick={() => copy(selected.credential?.email)}>
                                                        Copy
                                                    </Button>
                                                </Space>
                                            </Descriptions.Item>
                                        )}
                                        {selected.credential.username && (
                                            <Descriptions.Item label="Username">
                                                <Space wrap>
                                                    <span>{selected.credential.username}</span>
                                                    <Button size="small" onClick={() => copy(selected.credential?.username)}>
                                                        Copy
                                                    </Button>
                                                </Space>
                                            </Descriptions.Item>
                                        )}
                                        {selected.credential.password && (
                                            <Descriptions.Item label="Password">
                                                <Space wrap>
                                                    <span>{selected.credential.password}</span>
                                                    <Button size="small" onClick={() => copy(selected.credential?.password)}>
                                                        Copy
                                                    </Button>
                                                </Space>
                                            </Descriptions.Item>
                                        )}
                                        {selected.credential.note && (
                                            <Descriptions.Item label="Ghi chú">
                                                {selected.credential.note}
                                            </Descriptions.Item>
                                        )}
                                    </Descriptions>
                                </div>
                            </>
                        )}

                        {selected.notes && (
                            <>
                                <Divider />
                                <Typography.Text type="secondary">{selected.notes}</Typography.Text>
                            </>
                        )}

                        <Divider />

                        <Space wrap style={{ width: "100%" }}>
                            {selected.downloadUrl && (
                                <Button type="primary" onClick={() => window.open(selected.downloadUrl!, "_blank")}>
                                    Tải xuống
                                </Button>
                            )}
                            {selected.guideUrl && (
                                <Button onClick={() => window.open(selected.guideUrl!, "_blank")}>
                                    Xem hướng dẫn
                                </Button>
                            )}
                            <Button onClick={() => setOpen(false)}>Đóng</Button>
                        </Space>
                    </>
                )}
            </Modal>
        </div>
    );
}
