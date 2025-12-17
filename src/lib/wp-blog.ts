import he from "he";

const WP_API_BASE =
    process.env.NEXT_PUBLIC_WP_API_BASE ?? "https://admin.khoahocdohoa.com/wp-json";

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

// --- WP REST minimal types (đủ dùng cho code này) ---
type WpRendered = { rendered?: string };

type WpMedia = {
    source_url?: string;
};

type WpTerm = {
    taxonomy?: string;
    name?: string;
};

type WpEmbedded = {
    "wp:featuredmedia"?: WpMedia[];
    "wp:term"?: WpTerm[][];
};

type WpPost = {
    id: number;
    slug: string;
    date: string;
    title?: WpRendered;
    excerpt?: WpRendered;
    content?: WpRendered;
    _embedded?: WpEmbedded;
};

function normalizeWpText(html: string): string {
    if (!html) return "";

    const noTags = html.replace(/<[^>]+>/g, " ");
    const decoded = he.decode(noTags);
    let text = decoded.replace(/\s+/g, " ").trim();
    text = text.replace(/\[\s*…\s*\]$/u, "").trim();

    return text;
}

function toSummary(p: WpPost): BlogPostSummary {
    const embedded = p._embedded;

    const media = embedded?.["wp:featuredmedia"]?.[0];
    const termGroups = embedded?.["wp:term"] ?? [];
    const terms = termGroups.flat();

    const categoryNames = terms
        .filter((t) => t.taxonomy === "category")
        .map((t) => t.name ?? "")
        .filter(Boolean);

    return {
        id: p.id,
        slug: p.slug,
        title: normalizeWpText(p.title?.rendered ?? ""),
        excerpt: normalizeWpText(p.excerpt?.rendered ?? ""),
        thumbnail: media?.source_url,
        categoryNames,
        publishedAt: p.date,
    };
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

    const raw = (await res.json()) as unknown as WpPost[];
    const total = Number(res.headers.get("X-WP-Total") ?? "0");
    const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? "0");

    const posts: BlogPostSummary[] = raw.map(toSummary);

    return { posts, total, totalPages };
}

// Lấy chi tiết 1 bài theo slug
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPostDetail | null> {
    const url = new URL(`${WP_API_BASE}/wp/v2/posts`);
    url.searchParams.set("slug", slug);
    url.searchParams.set("_embed", "1");

    const res = await fetch(url.toString(), {
        next: { revalidate: 300 },
    });

    if (!res.ok) return null;

    const list = (await res.json()) as unknown as WpPost[];
    const p = list[0];
    if (!p) return null;

    const summary = toSummary(p);

    return {
        ...summary,
        contentHtml: p.content?.rendered ?? "",
    };
}
