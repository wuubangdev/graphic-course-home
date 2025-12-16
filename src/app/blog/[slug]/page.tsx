import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, Tag } from "antd";
import { notFound } from "next/navigation";
import { fetchBlogPostBySlug, fetchBlogPosts } from "@/lib/wp-blog";
import { CopyUrlButton } from "@/components/util/CopyUrlButton";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    // Optional: prebuild một số bài phổ biến
    const { posts } = await fetchBlogPosts({ page: 1, perPage: 20 });
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await fetchBlogPostBySlug(slug);

    if (!post) {
        return {
            title: "Bài viết | KHOAHOCDOHOA.COM",
        };
    }

    const canonical = `https://khoahocdohoa.vn/blog/${post.slug}`;

    return {
        title: `${post.title} | KHOAHOCDOHOA.COM`,
        description: post.excerpt,
        alternates: {
            canonical,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: canonical,
            type: "article",
            siteName: "KHOAHOCDOHOA.COM",
            images: post.thumbnail
                ? [{ url: post.thumbnail, alt: post.title }]
                : undefined,
        },
    };
}

export default async function BlogDetailPage({ params }: Props) {
    const { slug } = await params;
    const post = await fetchBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const canonical = `https://khoahocdohoa.vn/blog/${post.slug}`;
    const readingTimeMin = Math.max(
        2,
        Math.round(post.contentHtml.split(/\s+/).length / 250),
    );

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        image: post.thumbnail ? [post.thumbnail] : [],
        description: post.excerpt,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        author: {
            "@type": "Organization",
            name: "KHOAHOCDOHOA.COM",
        },
        publisher: {
            "@type": "Organization",
            name: "KHOAHOCDOHOA.COM",
            logo: {
                "@type": "ImageObject",
                url: "https://khoahocdohoa.vn/logo.png", // thay logo thật
            },
        },
    };

    return (
        <div className="bg-[#f5f7fb] min-h-screen">
            {/* JSON-LD SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-4xl mx-auto px-4 py-8 md:py-10">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { title: <Link href="/">Trang chủ</Link> },
                        { title: <Link href="/blog">Blog</Link> },
                        { title: post.title },
                    ]}
                />

                {/* Header */}
                <article className="mt-6 bg-white rounded-3xl shadow-sm overflow-hidden">
                    {post.thumbnail && (
                        <div className="h-64 w-full bg-slate-200 overflow-hidden">
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    )}

                    <div className="px-5 md:px-8 pt-6 pb-4">
                        <header className="space-y-3">
                            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                <span>
                                    {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                                </span>
                                <span>• {readingTimeMin} phút đọc</span>
                                {post.categoryNames.map((c) => (
                                    <Tag key={c} color="blue">
                                        {c}
                                    </Tag>
                                ))}
                                <CopyUrlButton />
                            </div>

                            <p className="text-sm text-slate-700">{post.excerpt}</p>
                        </header>

                        {/* Nội dung bài viết */}
                        <div className="mt-6 border-t pt-6 prose prose-sm md:prose-base max-w-none prose-img:rounded-xl prose-img:shadow">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.contentHtml,
                                }}
                            />
                        </div>
                    </div>
                </article>

                {/* Khối CTA nhỏ cuối bài để SEO + internal link */}
                <section className="mt-6 rounded-2xl bg-[#0049d9] text-white p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-base md:text-lg font-semibold">
                            Muốn biến kiến thức trong bài viết thành kỹ năng thực tế?
                        </h2>
                        <p className="text-xs md:text-sm text-blue-100">
                            Tham khảo các lộ trình 3D, VFX, Game Dev được thiết kế bài bản
                            cho người mới tại KHOAHOCDOHOA.COM.
                        </p>
                    </div>
                    <Link
                        href="/lo-trinh-nghe-nghiep"
                        className="inline-flex items-center justify-center rounded-lg bg-[#ffb100] px-4 py-2 text-xs md:text-sm font-semibold text-black hover:bg-[#ffc54d]"
                    >
                        Xem lộ trình học phù hợp
                    </Link>
                </section>
            </div>
        </div>
    );
}
