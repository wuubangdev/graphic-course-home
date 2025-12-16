import { Metadata } from "next";
import Link from "next/link";
import { Input, Tag, Pagination } from "antd";
import { fetchBlogPosts } from "@/lib/wp-blog";

export const metadata: Metadata = {
    title: "Blog KHOAHOCDOHOA.COM – Kiến thức 3D, VFX & Game Dev",
    description:
        "Blog KHOAHOCDOHOA.COM chia sẻ kiến thức, case study và kinh nghiệm thực chiến trong 3D, VFX và Game Development cho học viên Việt Nam.",
};

type Props = {
    searchParams?: { page?: string; q?: string };
};

export default async function BlogListPage({ searchParams }: Props) {
    const sp = await searchParams;

    const page = Number(sp?.page || "1");
    const q = sp?.q || "";

    const { posts, total, totalPages } = await fetchBlogPosts({
        page,
        perPage: 9,
        search: q || undefined,
    });

    console.log(q)

    return (
        <div className="bg-[#f5f7fb] min-h-screen">
            {/* Hero */}
            <section className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
                    <div className="grid md:grid-cols-[2fr,1fr] gap-8 items-center">
                        <div className="space-y-4">
                            <p className="text-xs uppercase tracking-[0.25em] text-blue-500">
                                Blog KHOAHOCDOHOA.COM
                            </p>
                            <h1 className="text-3xl md:text-4xl font-bold">
                                Cẩm nang học Đồ họa 3D, VFX &amp; Game Dev cho người Việt.
                            </h1>
                            <p className="text-sm md:text-base text-slate-700">
                                Tổng hợp bài viết hướng dẫn, case study, kinh nghiệm thực chiến
                                giúp bạn xây dựng lộ trình nghề nghiệp rõ ràng trong ngành công
                                nghiệp sáng tạo.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <Tag color="blue">3D</Tag>
                                <Tag color="blue">VFX</Tag>
                                <Tag color="blue">Game Art</Tag>
                                <Tag color="blue">Career Path</Tag>
                            </div>
                        </div>

                        {/* Search box */}
                        <form
                            className="rounded-2xl bg-[#f5f7fb] border border-slate-200 p-4 flex flex-col gap-3"
                            action="/blog"
                        >
                            <label className="text-xs font-medium text-slate-600">
                                Tìm bài viết
                            </label>
                            <Input
                                name="q"
                                placeholder="Nhập từ khóa, ví dụ: Blender, VFX, lộ trình học..."
                                defaultValue={q}
                                allowClear
                            />
                            <button
                                type="submit"
                                className="mt-1 inline-flex items-center justify-center rounded-lg bg-[#0049d9] px-4 py-2 text-sm font-medium text-white hover:bg-[#335eea]"
                            >
                                Tìm kiếm
                            </button>
                            <p className="text-[11px] text-slate-500">
                                Gợi ý: “lộ trình 3D”, “học VFX”, “học game ở đâu”.
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* List */}
            <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Link href={`/blog/${post.slug}`} className="block">
                                <div className="h-44 w-full bg-slate-200 overflow-hidden">
                                    {post.thumbnail ? (
                                        // có thể chuyển sang next/image nếu cấu hình domain
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-xs text-slate-500">
                                            KHOAHOCDOHOA Blog
                                        </div>
                                    )}
                                </div>
                            </Link>

                            <div className="flex flex-1 flex-col p-4 space-y-3">
                                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                                    <span>
                                        {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                                    </span>
                                    {post.categoryNames[0] && (
                                        <>
                                            <span>•</span>
                                            <span>{post.categoryNames[0]}</span>
                                        </>
                                    )}
                                </div>

                                <Link href={`/blog/${post.slug}`}>
                                    <h2 className="text-sm md:text-base font-semibold line-clamp-2 hover:text-[#0049d9]">
                                        {post.title}
                                    </h2>
                                </Link>

                                <p className="text-xs text-slate-700 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto pt-2">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-xs font-semibold text-[#0049d9]"
                                    >
                                        Đọc tiếp →
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Pagination SEO-friendly: /blog?page=2 */}
                {totalPages > 1 && (
                    <div className="flex justify-center">
                        <Pagination
                            current={page}
                            total={total}
                            pageSize={9}
                            showSizeChanger={false}
                            onChange={(p) => {
                                // dùng link tiêu chuẩn cho SEO, không dùng JS navigate ở đây cũng được
                                window.location.href =
                                    p === 1 ? "/blog" : `/blog?page=${p}${q ? `&q=${q}` : ""}`;
                            }}
                        />
                    </div>
                )}
            </main>
        </div>
    );
}
