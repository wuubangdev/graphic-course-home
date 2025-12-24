export type LpInstructor = {
    avatar: string;
    id: number;
    name: string;
    description: string;
};

export interface LpCourseCategory {
    term_id: number;
    name: string;
    slug: string;
    term_group: number;
    term_taxonomy_id: number;
    taxonomy: string;        // e.g. "course_category"
    description: string;
    parent: number;
    count: number;
    filter: string;          // e.g. "raw"
    id: number;
}

export interface LpCourseMetaData {
    _lp_passing_condition: number;
}

export type LpCourse = {
    id: number;
    name: string;
    image: string;
    content: string;
    excerpt: string;
    count_students: number;
    tags: string[];
    instructor: LpInstructor;
    duration: string;
    categories: LpCourseCategory[];
    price: number;
    price_rendered: string;
    origin_price: string;
    origin_price_rendered: string;
    on_sale: boolean;
    sale_price: number;
    sale_price_rendered: string;
    rating: boolean | number;
    meta_data: LpCourseMetaData;
};

type FetchAllOpts = {
    baseUrl: string; // https://admin.khoahocdohoa.com
    endpoint?: string; // default LearnPress: /wp-json/learnpress/v1/courses
    perPage?: number; // 1..100
    status?: "publish" | "draft" | "any";
    revalidateSeconds?: number;
    category?: string;
    search?: string;
};

type FetchOpts = {
    baseUrl: string; // https://admin.khoahocdohoa.com
    endpoint?: string; // default LearnPress: /wp-json/learnpress/v1/courses
    status?: "publish" | "draft" | "any";
    revalidateSeconds?: number;
    id: number;
};

export async function fetchAllLearnPressCourses(opts: FetchAllOpts) {
    const {
        baseUrl,
        endpoint = "/wp-json/learnpress/v1/courses",
        perPage = 100,
        status = "publish",
        revalidateSeconds = 60,
        category = "",
        search = "",
    } = opts;

    const all: LpCourse[] = [];
    let page = 1;
    let totalPages: number | null = null;

    while (true) {
        const url = new URL(endpoint, baseUrl);
        url.searchParams.set("per_page", String(perPage));
        url.searchParams.set("page", String(page));
        url.searchParams.set("category", String(category));
        url.searchParams.set("search", String(search));

        if (status) url.searchParams.set("status", status);

        const res = await fetch(url.toString(), {
            headers: { Accept: "application/json" },
            next: { revalidate: revalidateSeconds },
        });

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`LearnPress courses ${res.status}: ${text}`);
        }

        // WP REST thường có header tổng số trang
        if (totalPages == null) {
            const tp = res.headers.get("x-wp-totalpages");
            totalPages = tp ? Number(tp) : null;
        }

        const data = (await res.json()) as LpCourse[];

        if (!Array.isArray(data)) {
            throw new Error("Unexpected LearnPress response (expected array).");
        }

        all.push(...data);

        // dừng
        if (totalPages != null) {
            if (page >= totalPages) break;
        } else {
            if (data.length < perPage) break;
        }

        page += 1;
    }

    return all;
}

export async function fetch8LearnPressCourses(opts: FetchAllOpts) {
    const {
        baseUrl,
        endpoint = "/wp-json/learnpress/v1/courses",
        perPage = 100,
        status = "publish",
        revalidateSeconds = 60,
        category = 0,
    } = opts;

    const all: LpCourse[] = [];
    let page = 1;
    let totalPages: number | null = null;

    while (true) {
        const url = new URL(endpoint, baseUrl);
        url.searchParams.set("per_page", String(perPage));
        url.searchParams.set("page", String(page));
        url.searchParams.set("category", String(category));
        if (status) url.searchParams.set("status", status);

        const res = await fetch(url.toString(), {
            headers: { Accept: "application/json" },
            next: { revalidate: revalidateSeconds },
        });

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`LearnPress courses ${res.status}: ${text}`);
        }

        // WP REST thường có header tổng số trang
        if (totalPages == null) {
            const tp = res.headers.get("x-wp-totalpages");
            totalPages = tp ? Number(tp) : null;
        }

        const data = (await res.json()) as LpCourse[];

        if (!Array.isArray(data)) {
            throw new Error("Unexpected LearnPress response (expected array).");
        }

        all.push(...data);

        // dừng
        if (totalPages != null) {
            if (page >= totalPages) break;
        } else {
            if (data.length < perPage) break;
        }

        page += 1;
    }

    return all.slice(0, 8);
}

export async function fetchLearnPressCourse(opts: FetchOpts) {
    const {
        baseUrl,
        endpoint = "/wp-json/learnpress/v1/courses",
        id,
        status = "publish",
        revalidateSeconds = 60,
    } = opts;

    const base = endpoint.replace(/\/+$/, "");
    const url = new URL(`${base}/${encodeURIComponent(String(id))}`, baseUrl);
    if (status && status !== "any") url.searchParams.set("status", status);

    const res = await fetch(url.toString(), {
        headers: { Accept: "application/json" },
        next: { revalidate: revalidateSeconds },
    });

    if (res.status !== 200) {
        console.log(res);
        return {} as LpCourse;
        const text = await res.text().catch(() => "");
        throw new Error(`LearnPress course ${res.status}: ${text}`);
    }

    return (await res.json()) as LpCourse;
}
