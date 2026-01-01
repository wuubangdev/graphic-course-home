// src/lib/strapi-lib/api/course.ts
import { strapiFetch, strapiMediaUrl } from "../strapi";
import { StrapiV5File } from "../strapi-media";
import type { StrapiV5Collection, StrapiV5Single } from "../strapi-types";
import type { Category } from "./category";

/** =========================
 * Types
 * ========================= */

export type Course = {
    id: number;
    documentId: string;
    slug: string;
    title: string;
    description: string;
    level: string;
    fakeStudentCount: number;
    priceOrigin: number;
    priceSale: number;
    salePercent: number;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    content?: unknown | null;

    software: string;
    duration: string;

    // media
    subMedia?: StrapiV5File[];
    thumImage?: StrapiV5File | null;
    thumMedia?: StrapiV5File | null;

    // relation (many-to-many)
    categories?: Array<Pick<Category, "id" | "documentId" | "title" | "selector" | "elementShow" | "rank">>;
};

export type CourseSort = "new" | "updated" | "price_asc" | "price_desc";
export type CoursePriceFilter = "free" | "paid";
export type FetchCoursesOpts = {
    page?: number;
    pageSize?: number;

    // NEW
    q?: string; // search title/description
    level?: string; // beginner | intermediate | advanced | ...
    price?: CoursePriceFilter;
    sort?: CourseSort;

    // category filter
    categoryDocumentId?: string; // filter theo category documentId
    categorySlug?: string; // nếu category có slug

    // Backward compatible (OLD)
    search?: string; // alias của q
};

/** =========================
 * Helpers
 * ========================= */
export function fileUrl(f: StrapiV5File, size?: "large" | "medium" | "small" | "thumbnail") {
    const picked = size ? f.formats?.[size]?.url : undefined;
    return strapiMediaUrl(picked || f.url);
}

export function fileAlt(f: StrapiV5File) {
    return f.alternativeText || f.caption || f.name || "";
}

function buildSort(sort?: CourseSort) {
    switch (sort) {
        case "price_asc":
            // ưu tiên giá sale; fallback giá gốc
            return ["priceSale:asc", "priceOrigin:asc", "updatedAt:desc"];
        case "price_desc":
            return ["priceSale:desc", "priceOrigin:desc", "updatedAt:desc"];
        case "updated":
            return ["updatedAt:desc"];
        case "new":
        default:
            // publishedAt có thể null -> fallback createdAt
            return ["publishedAt:desc", "createdAt:desc"];
    }
}

/** =========================
 * API
 * ========================= */
export async function fetchCourses(opts: FetchCoursesOpts = {}) {
    const {
        page = 1,
        pageSize = 12,

        // NEW
        q,
        level,
        price,
        sort,

        categoryDocumentId,
        categorySlug,

        // OLD
        search,
    } = opts;

    const keyword = (q ?? search)?.trim();

    const filters: any = {};

    // search: title OR description
    if (keyword) {
        filters.$or = [{ title: { $containsi: keyword } }, { description: { $containsi: keyword } }];
    }

    // level
    if (level && level !== "all") {
        filters.level = { $eq: level };
    }

    // price
    if (price === "free") {
        // free nếu priceSale==0 OR priceOrigin==0 (tuỳ data bạn)
        filters.$and = [
            ...(filters.$and ?? []),
            {
                $or: [{ priceSale: { $eq: 0 } }, { priceOrigin: { $eq: 0 } }],
            },
        ];
    } else if (price === "paid") {
        filters.$and = [
            ...(filters.$and ?? []),
            {
                $and: [{ priceSale: { $gt: 0 } }, { priceOrigin: { $gt: 0 } }],
            },
        ];
    }

    // category
    if (categoryDocumentId) {
        filters.categories = { documentId: { $eq: categoryDocumentId } };
    } else if (categorySlug) {
        filters.categories = { slug: { $eq: categorySlug } };
    }

    return strapiFetch<StrapiV5Collection<Course>>(`/api/courses`, {
        query: {
            populate: {
                thumImage: true,
                thumMedia: true,
                subMedia: true,
                categories: {
                    fields: ["documentId", "title", "selector", "elementShow", "rank"],
                },
            },
            fields: [
                "documentId",
                "slug",
                "title",
                "description",
                "level",
                "fakeStudentCount",
                "priceOrigin",
                "priceSale",
                "salePercent",
                "software",
                "duration",
                "createdAt",
                "updatedAt",
                "publishedAt",
            ],
            filters: Object.keys(filters).length ? filters : undefined,
            pagination: { page, pageSize },
            sort: buildSort(sort),
        },
        revalidate: 60,
        tags: ["courses"],
    });
}

export async function fetchCourseByDocumentId(documentId: string) {
    return strapiFetch<StrapiV5Single<Course>>(`/api/courses/${documentId}`, {
        query: {
            populate: {
                thumImage: true,
                thumMedia: true,
                subMedia: true,
                categories: {
                    fields: ["documentId", "title", "selector", "elementShow", "rank"],
                },
            },
        },
        revalidate: 60,
        tags: [`course:${documentId}`],
    });
}

/**
 * Nếu bạn có field slug trong collection course thì bật cái này.
 * Không có slug => xóa function.
 */
export async function fetchCourseBySlug(slug: string) {
    return strapiFetch<StrapiV5Collection<Course>>(`/api/courses`, {
        query: {
            filters: { slug: { $eq: slug } },
            populate: {
                thumImage: true,
                thumMedia: true,
                subMedia: true,
                categories: {
                    fields: ["documentId", "title", "selector", "elementShow", "rank"],
                },
            },
            pagination: { page: 1, pageSize: 1 },
        },
        revalidate: 60,
        tags: [`course:slug:${slug}`],
    });
}
