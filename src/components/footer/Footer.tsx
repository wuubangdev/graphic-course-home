'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Row, Col, Typography, Space, Button, Divider } from "antd";
import {
    FacebookFilled,
    InstagramFilled,
    MailOutlined,
    PhoneOutlined,
    WhatsAppOutlined,
    YoutubeFilled,
    TikTokFilled,
} from "@ant-design/icons";
import { fetchPaymentMethodsView, PaymentMethodView } from "@/lib/strapi-lib/api/payment-method";
import { ContactView, fetchContactView } from "@/lib/strapi-lib/api/contact";

const { Title, Text } = Typography;

const quickLinks = [
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Khóa học", href: "/khoa-hoc" },
    { label: "Bài viết", href: "/blog" },
    { label: "FAQ", href: "/faq" },
];

const policyLinks = [
    { label: "Điều khoản dịch vụ", href: "/dieu-khoan" },
    { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
    { label: "Hoàn tiền", href: "/hoan-tien" },
    { label: "Hình thức thanh toán", href: "/thanh-toan" },
];

const payments = [
    { alt: "MoMo", src: "/footer/momo.png" },
    { alt: "VISA", src: "/footer/visa.png" },
    { alt: "ATM", src: "/footer/atm.png" },
];

export default function Footer() {
    const [paymentsMethods, setPaymentMethods] = React.useState<PaymentMethodView[]>([]);
    const [contactInfo, setContactInfo] = React.useState<ContactView>();
    React.useEffect(() => {
        fetchPaymentMethodsView().then((methods) => setPaymentMethods(methods));
    }, []);

    React.useEffect(() => {
        fetchContactView().then((contact) => setContactInfo(contact));
    }, []);
    return (
        <footer
            id="site-footer"
            style={{
                background:
                    "linear-gradient(180deg, rgba(26,94,255,1) 0%, rgba(7,23,74,1) 55%, rgba(3,10,28,1) 100%)",
            }}
            className="relative text-white"
        >
            {/* subtle top border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="mx-auto max-w-[1280px] px-4 pt-14 pb-4">
                {/* Simple CTA strip (gọn nhưng “đắt”) */}
                <div className="mb-10 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur">
                    <Row align="middle" gutter={[12, 12]}>
                        <Col xs={24} md={16}>
                            <Title level={4} style={{ margin: 0, color: "white" }}>
                                Nhận tư vấn lộ trình 1:1 miễn phí
                            </Title>
                            <Text style={{ color: "rgba(255,255,255,0.75)" }}>
                                Nói rõ mục tiêu của bạn, bên mình đưa roadmap học + dự án phù hợp.
                            </Text>
                        </Col>
                        <Col xs={24} md={8} className="md:text-right">
                            <Space wrap>
                                <Button
                                    type="primary"
                                    size="large"
                                    className="!rounded-xl"
                                    href="/lo-trinh"
                                >
                                    Xem lộ trình
                                </Button>
                                <Button
                                    size="large"
                                    className="!rounded-xl !border-white/25 !bg-white/10 !text-white hover:!bg-white/15"
                                    href="/lien-he"
                                >
                                    Liên hệ ngay
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </div>

                {/* Main grid */}
                <Row gutter={[28, 28]} align="stretch">
                    {/* Brand */}
                    <Col xs={24} md={9} className="flex">
                        <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5">
                            <Link href="/" className="w-full flex justify-center">
                                <div className="relative w-3/7 aspect-video">
                                    <Image
                                        src="/footer/169Log.png"
                                        alt="KhoaHocDoHoa"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </Link>
                            <p className="text-center">
                                Nơi biến đam mê đồ hoạ thành sự nghiệp. Tập trung thực chiến, ra sản phẩm.
                            </p>
                            <div className="mt-4 space-y-2">
                                <a
                                    href={`mailto:${contactInfo?.email ?? "khoadohoavn@gmail.com"}`}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/90 hover:bg-white/10"
                                >
                                    <MailOutlined />
                                    <span className="font-semibold">{contactInfo?.email ?? "khoadohoavn@gmail.com"}</span>
                                </a>
                                <a
                                    href={`tel:${contactInfo?.phone ?? "+84123456789"}`}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/90 hover:bg-white/10"
                                >
                                    <PhoneOutlined />
                                    <span className="font-semibold">{contactInfo?.phone ?? "+84 123 456 789"}</span>
                                </a>
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-8">
                                <a className="text-white/90 hover:text-white" href={contactInfo?.facebook ?? "#"} aria-label="Facebook">
                                    <FacebookFilled style={{ fontSize: 28, color: "white" }} className="hover:opacity-80 duration-300" />
                                </a>
                                <a className="text-white/90 hover:text-white" href={contactInfo?.instagram ?? "#"} aria-label="Instagram">
                                    <InstagramFilled style={{ fontSize: 28, color: "white" }} className="hover:opacity-80 duration-300" />
                                </a>
                                <a className="text-white/90 hover:text-white" href={contactInfo?.youtube ?? "#"} aria-label="YouTube">
                                    <YoutubeFilled style={{ fontSize: 28, color: "white" }} className="hover:opacity-80 duration-300" />
                                </a>
                                <a className="text-white/90 hover:text-white" href={contactInfo?.tiktok ?? "#"} aria-label="TikTok">
                                    <TikTokFilled style={{ fontSize: 28, color: "white" }} className="hover:opacity-80 duration-300" />
                                </a>
                            </div>
                        </div>
                    </Col>

                    {/* Links */}
                    <Col xs={24} md={8} className="flex">
                        <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5">
                            <Title level={5} style={{ marginTop: 0, color: "white" }}>
                                Điều hướng
                            </Title>

                            <div className="grid grid-cols-2 gap-2">
                                {quickLinks.map((l) => (
                                    <Link
                                        key={l.href}
                                        href={l.href}
                                        className="rounded-xl py-2 text-white/80 hover:bg-white/10 hover:text-white"
                                    >
                                        {l.label}
                                    </Link>
                                ))}
                            </div>

                            <Divider style={{ borderColor: "rgba(255,255,255,0.12)", margin: "14px 0" }} />

                            <Title level={5} style={{ marginTop: 0, color: "white" }}>
                                Chính sách
                            </Title>

                            <div className="space-y-1">
                                {policyLinks.map((l) => (
                                    <Link
                                        key={l.href}
                                        href={l.href}
                                        className="flex items-center justify-between rounded-xl py-2 text-white/80 hover:bg-white/10 hover:text-white"
                                    >
                                        <span>{l.label}</span>
                                        <span className="text-white/40">→</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </Col>

                    {/* Payment + Support */}
                    <Col xs={24} md={7} className="flex">
                        <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5">
                            <Title level={5} style={{ marginBottom: 12, color: "white" }}>
                                Thanh toán
                            </Title>

                            <div className="flex flex-wrap gap-3">
                                {paymentsMethods.length > 0
                                    ? paymentsMethods.map((pm) => (
                                        <div
                                            key={pm.id}
                                            className="flex items-center gap-2 rounded-xl border border-white/10 
                                            bg-white/5 px-3 py-2 hover:opacity-70 duration-300 cursor-default"
                                        >
                                            {pm.iconThumbUrl ? (
                                                <Image
                                                    src={pm.iconThumbUrl}
                                                    alt={pm.title}
                                                    width={32}
                                                    height={32}
                                                    className="object-contain"
                                                />
                                            ) : (
                                                <div className="h-8 w-8 bg-white/10" />
                                            )}
                                            <span className="text-sm">{pm.title}</span>
                                        </div>
                                    ))
                                    : payments.map((p) => (
                                        <div
                                            key={p.alt}
                                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                                        >
                                            <Image
                                                src={p.src}
                                                alt={p.alt}
                                                width={32}
                                                height={32}
                                                className="object-contain"
                                            />
                                            <span className="text-sm">{p.alt}</span>
                                        </div>))}
                            </div>

                            <Divider style={{ borderColor: "rgba(255,255,255,0.12)", margin: "14px 0" }} />

                            <Title level={5} style={{ marginBottom: 12, color: "white" }}>
                                Hỗ trợ nhanh
                            </Title>

                            <Button
                                block
                                size="large"
                                className="!rounded-xl !border-white/20 !bg-white/10 !text-white hover:!bg-white/15"
                                icon={<WhatsAppOutlined />}
                                href="/cskh"
                            >
                                Chat CSKH
                            </Button>

                            <Text className="mt-3 block" style={{ color: "rgba(255,255,255,0.65)" }}>
                                Thời gian phản hồi thường trong 5–15 phút.
                            </Text>
                        </div>
                    </Col>
                </Row>

                {/* Bottom */}
                <Divider style={{ borderColor: "rgba(255,255,255,0.12)", marginTop: 22 }} />
                <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-white/70 md:flex-row md:text-left">
                    <p>© {new Date().getFullYear()} KhoaHocDoHoa. All rights reserved.</p>
                    <div className="flex items-center gap-3">
                        <Link className="hover:text-white" href="/dieu-khoan">
                            Điều khoản
                        </Link>
                        <span className="text-white/30">•</span>
                        <Link className="hover:text-white" href="/chinh-sach-bao-mat">
                            Bảo mật
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
