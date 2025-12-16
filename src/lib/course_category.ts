

export type LpCourseCategoryTerm = {
    id: number;
    count: number;
    description: string;
    name: string;
    parent: number;
};

export type FetchAllCategoriesOpts = {
    baseUrl: string; // https://admin.khoahocdohoa.com
    endpoint?: string; // default: /wp-json/wp/v2/course_category
    perPage?: number; // 1..100
    pageStart?: number; // default 1
    search?: string;
    parent?: number; // filter by parent id
    hideEmpty?: boolean; // true => hide_empty=1
    revalidateSeconds?: number;
};

export async function fetchAllCourseCategories(opts: FetchAllCategoriesOpts) {
    const {
        baseUrl,
        endpoint = "/wp-json/wp/v2/course_category",
        perPage = 100,
        pageStart = 1,
        search,
        parent,
        hideEmpty,
        revalidateSeconds = 60,
    } = opts;

    const all: LpCourseCategoryTerm[] = [];
    let page = pageStart;
    let totalPages: number | null = null;

    while (true) {
        const url = new URL(endpoint, baseUrl);
        url.searchParams.set("per_page", String(perPage));
        url.searchParams.set("page", String(page));
        if (search) url.searchParams.set("search", search);
        if (typeof parent === "number") url.searchParams.set("parent", String(parent));
        if (hideEmpty === true) url.searchParams.set("hide_empty", "1");

        const res = await fetch(url.toString(), {
            headers: { Accept: "application/json" },
            next: { revalidate: revalidateSeconds },
        });

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`Course categories ${res.status}: ${text}`);
        }

        if (totalPages == null) {
            const tp = res.headers.get("x-wp-totalpages");
            totalPages = tp ? Number(tp) : null;
        }

        const data = (await res.json()) as LpCourseCategoryTerm[];
        if (!Array.isArray(data)) {
            throw new Error("Unexpected WP taxonomy response (expected array).");
        }

        all.push(...data);

        if (totalPages != null) {
            if (page >= totalPages) break;
        } else {
            if (data.length < perPage) break;
        }

        page += 1;
    }

    return all;
}