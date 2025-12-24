import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@/styles/lp-landing.css";

export const metadata: Metadata = {
  title: {
    default: "Khóa học Đồ họa | KHOAHOCDOHOA.COM",
    template: "%s | KHOAHOCDOHOA.COM",
  },
  description:
    "Lộ trình học đồ họa bài bản: Photoshop, Illustrator, 3D, VFX, Motion. Học theo dự án thực tế, có bài tập, file dự án và hỗ trợ Q&A.",
  applicationName: "KHOAHOCDOHOA.COM",
  metadataBase: new URL("https://khoahocdohoa.vn"),
  alternates: {
    canonical: "https://khoahocdohoa.vn",
  },
  openGraph: {
    type: "website",
    url: "https://khoahocdohoa.vn",
    siteName: "KHOAHOCDOHOA.COM",
    title: "Khóa học Đồ họa | KHOAHOCDOHOA.COM",
    description:
      "Học đồ họa theo lộ trình rõ ràng, thực chiến theo dự án, cập nhật liên tục và hỗ trợ Q&A.",
    images: [
      {
        url: "/test.png",
        width: 1200,
        height: 630,
        alt: "KHOAHOCDOHOA.COM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khóa học Đồ họa | KHOAHOCDOHOA.COM",
    description:
      "Lộ trình học đồ họa thực chiến: PS/AI/3D/VFX/Motion. Có bài tập, file dự án và hỗ trợ Q&A.",
    images: ["/test.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <AntdRegistry>
          <Navigation />
          {children}
          <Footer />
        </AntdRegistry>
      </body>
    </html>
  );
}
