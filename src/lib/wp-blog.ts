import he from "he";

const WP_API_BASE =
    process.env.NEXT_PUBLIC_WP_API_BASE ??
    "https://admin.khoahocdohoa.com/wp-json";

export type BlogPostSummary = {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    thumbnail?: string;
    categoryNames: string[];
    publishedAt: string;
};

export type BlogPostDetail = BlogPostSummary & {
    contentHtml: string;
};

// function stripHtml(html: string): string {
//     if (!html) return "";
//     return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
// }

function normalizeWpText(html: string): string {
    if (!html) return "";

    // 1) Bỏ tag HTML
    const noTags = html.replace(/<[^>]+>/g, " ");

    // 2) Decode HTML entities: &#8220; &hellip; ...
    const decoded = he.decode(noTags);

    // 3) Bỏ khoảng trắng dư
    let text = decoded.replace(/\s+/g, " ").trim();

    // 4) Xử lý riêng pattern "[…]" cuối excerpt của WP
    text = text.replace(/\[\s*…\s*\]$/u, "").trim();

    return text;
}


// Lấy danh sách bài viết
export async function fetchBlogPosts(opts?: {
    page?: number;
    perPage?: number;
    search?: string;
}): Promise<{ posts: BlogPostSummary[]; total: number; totalPages: number }> {
    const page = opts?.page ?? 1;
    const perPage = opts?.perPage ?? 9;

    const url = new URL(`${WP_API_BASE}/wp/v2/posts`);
    url.searchParams.set("page", String(page));
    url.searchParams.set("per_page", String(perPage));
    url.searchParams.set("_embed", "1");
    if (opts?.search) url.searchParams.set("search", opts.search);

    const res = await fetch(url.toString(), {
        next: { revalidate: 300 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status}`);
    }

    const raw = (await res.json()) as any[];
    const total = Number(res.headers.get("X-WP-Total") ?? "0");
    const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? "0");

    const posts: BlogPostSummary[] = raw.map((p) => {
        const embedded = p._embedded || {};
        const media = embedded["wp:featuredmedia"]?.[0];
        const terms = embedded["wp:term"]?.flat?.() ?? [];

        return {
            id: p.id,
            slug: p.slug,
            title: normalizeWpText(p.title?.rendered ?? ""),
            excerpt: normalizeWpText(p.excerpt?.rendered ?? ""),
            thumbnail: media?.source_url,
            categoryNames: terms
                .filter((t: any) => t.taxonomy === "category")
                .map((t: any) => t.name),
            publishedAt: p.date,
        };
    });

    return { posts, total, totalPages };
}

// Lấy chi tiết 1 bài theo slug
export async function fetchBlogPostBySlug(
    slug: string,
): Promise<BlogPostDetail | null> {
    const url = new URL(`${WP_API_BASE}/wp/v2/posts`);
    url.searchParams.set("slug", slug);
    url.searchParams.set("_embed", "1");

    const res = await fetch(url.toString(), {
        next: { revalidate: 300 },
    });

    if (!res.ok) return null;

    const list = (await res.json()) as any[];
    const p = list[0];
    if (!p) return null;

    const embedded = p._embedded || {};
    const media = embedded["wp:featuredmedia"]?.[0];
    const terms = embedded["wp:term"]?.flat?.() ?? [];

    const summary: BlogPostSummary = {
        id: p.id,
        slug: p.slug,
        title: normalizeWpText(p.title?.rendered ?? ""),
        excerpt: normalizeWpText(p.excerpt?.rendered ?? ""),
        thumbnail: media?.source_url,
        categoryNames: terms
            .filter((t: any) => t.taxonomy === "category")
            .map((t: any) => t.name),
        publishedAt: p.date,
    };

    return {
        ...summary,
        contentHtml: p.content?.rendered ?? "",
    };
}
