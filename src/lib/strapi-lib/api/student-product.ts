// src/lib/strapi-lib/api/student-product.ts
import { strapiFetch, strapiMediaUrl } from "../strapi";
import type { StrapiV5Collection, StrapiV5Single } from "../strapi-types";
import { StrapiV5File } from "../strapi-media";

/** =========================
 * Types
 * ========================= */

export type StudentProduct = {
    id: number;
    documentId: string;

    title: string;
    slug: string;

    createdAt: string;
    updatedAt: string;
    publishedAt?: string;

    // media
    thumImage?: StrapiV5File | null;

    // nếu sau này có thêm field thì add tiếp ở đây
};

export type StudentProductSort = "title_asc" | "title_desc" | "new" | "updated";

export type FetchStudentProductsOpts = {
    page?: number;
    pageSize?: number;

    q?: string; // search title/slug
    sort?: StudentProductSort;

    // Backward compatible
    search?: string; // alias của q
};

/** =========================
 * Helpers
 * ========================= */

export function fileUrl(
    f: StrapiV5File,
    size?: "large" | "medium" | "small" | "thumbnail"
) {
    const picked = size ? f.formats?.[size]?.url : undefined;
    return strapiMediaUrl(picked || f.url);
}

export function fileAlt(f: StrapiV5File) {
    return f.alternativeText || f.caption || f.name || "";
}

function buildSort(sort?: StudentProductSort) {
    switch (sort) {
        case "title_asc":
            return ["title:asc"] as const;
        case "title_desc":
            return ["title:desc"] as const;
        case "updated":
            return ["updatedAt:desc"] as const;
        case "new":
        default:
            return ["publishedAt:desc", "createdAt:desc"] as const;
    }
}

/**
 * Minimal type-safe Strapi filter builder (NO any)
 */
type StrapiScalar = string | number | boolean | null;
type StrapiOp = { $eq: StrapiScalar } | { $containsi: string };
type StrapiFilter =
    | StrapiOp
    | { $or: StrapiFilter[] }
    | { $and: StrapiFilter[] }
    | { [field: string]: StrapiFilter };

type StrapiFilters = {
    $or?: StrapiFilter[];
    $and?: StrapiFilter[];
    title?: StrapiFilter;
    slug?: StrapiFilter;
};

/** =========================
 * API
 * ========================= */

export async function fetchStudentProducts(opts: FetchStudentProductsOpts = {}) {
    const {
        page = 1,
        pageSize = 25,
        q,
        sort,
        search,
    } = opts;

    const keyword = (q ?? search)?.trim();
    const filters: StrapiFilters = {};

    // search: title OR slug
    if (keyword) {
        filters.$or = [
            { title: { $containsi: keyword } },
            { slug: { $containsi: keyword } },
        ];
    }

    const hasFilters = Object.keys(filters).length > 0;

    return strapiFetch<StrapiV5Collection<StudentProduct>>(`/api/student-products`, {
        query: {
            populate: { thumImage: true },
            fields: ["documentId", "title", "slug", "createdAt", "updatedAt", "publishedAt"],
            filters: hasFilters ? filters : undefined,
            pagination: { page, pageSize },
            sort: buildSort(sort),
        },
        revalidate: 60,
        tags: ["student-products"],
    });
}

export async function fetchStudentProductByDocumentId(documentId: string) {
    return strapiFetch<StrapiV5Single<StudentProduct>>(`/api/student-products/${documentId}`, {
        query: {
            populate: { thumImage: true },
        },
        revalidate: 60,
        tags: [`student-product:${documentId}`],
    });
}

export async function fetchStudentProductBySlug(slug: string) {
    return strapiFetch<StrapiV5Collection<StudentProduct>>(`/api/student-products`, {
        query: {
            filters: { slug: { $eq: slug } },
            populate: { thumImage: true },
            pagination: { page: 1, pageSize: 1 },
        },
        revalidate: 60,
        tags: [`student-product:slug:${slug}`],
    });
}
