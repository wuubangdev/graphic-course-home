// TopUtilityBar.tsx
import Link from "next/link";
import {
    LeftOutlined,
    BookOutlined,
    GiftOutlined,
    PhoneOutlined,
} from "@ant-design/icons";

type TopUtilityBarProps = {
    leftText?: string;
    leftHref?: string;
    items?: { label: string; href: string; icon: React.ReactNode }[];
};

export default function TopUtilityBar({
    leftText = "Kiếm tiền cùng KHOAHOCDOHOA",
    leftHref = "/kiem-tien",
    items = [
        { label: "Hướng dẫn mua hàng", href: "/huong-dan-mua-hang", icon: <BookOutlined /> },
        { label: "Ưu đãi khách hàng", href: "/uu-dai", icon: <GiftOutlined /> },
        { label: "Thông tin liên hệ", href: "/lien-he", icon: <PhoneOutlined /> },
    ],
}: TopUtilityBarProps) {
    return (
        <div className="w-full bg-black/10 text-white">
            <div className="mx-auto flex py-2 max-w-[1280px] items-center justify-between px-8">
                {/* Left */}
                <Link
                    href={leftHref}
                    className="flex items-center gap-2 text-sm font-medium opacity-95 hover:opacity-100"
                >
                    <LeftOutlined style={{ fontSize: 14 }} />
                    <span className="line-clamp-1">{leftText}</span>
                </Link>

                {/* Right */}
                <div className="flex items-center gap-4">
                    {items.map((it) => (
                        <Link
                            key={it.href}
                            href={it.href}
                            className="flex items-center gap-2 text-sm opacity-95 hover:opacity-100"
                        >
                            <span className="text-[14px] leading-none">{it.icon}</span>
                            <span className="hidden sm:inline">{it.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
