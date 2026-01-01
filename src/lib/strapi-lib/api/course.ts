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
    //
    software: string;
    duration: string;

    // media
    subMedia?: StrapiV5File[];
    thumImage?: StrapiV5File | null;
    thumMedia?: StrapiV5File | null;

    // relation (many-to-many)
    categories?: Array<
        Pick<Category, "id" | "documentId" | "title" | "selector" | "elementShow" | "rank">
    >;
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

/** =========================
 * API
 * ========================= */
export async function fetchCourses(opts: {
    page?: number;
    pageSize?: number;
    search?: string;
    categoryDocumentId?: string; // filter theo category documentId
} = {}) {
    const { page = 1, pageSize = 12, search, categoryDocumentId } = opts;

    const baseFilters: Record<string, unknown> = {};

    if (search) {
        baseFilters.title = { $containsi: search };
    }

    if (categoryDocumentId) {
        baseFilters.categories = { documentId: { $eq: categoryDocumentId } };
    }

    return strapiFetch<StrapiV5Collection<Course>>(`/api/courses`, {
        query: {
            populate: {
                thumImage: true,
                thumMedia: true,
                subMedia: true,
                categories: {
                    fields: ["id", "documentId", "title", "selector", "elementShow", "rank"],
                },
            },
            fields: [
                "id",
                "documentId",
                "title",
                "description",
                "level",
                "fakeStudentCount",
                "priceOrigin",
                "priceSale",
                "salePercent",
                "createdAt",
                "updatedAt",
                "publishedAt",
            ],
            filters: Object.keys(baseFilters).length ? baseFilters : undefined,
            pagination: { page, pageSize },
            sort: ["updatedAt:desc"],
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
                    fields: ["id", "documentId", "title", "selector", "elementShow", "rank"],
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
                    fields: ["id", "documentId", "title", "selector", "elementShow", "rank"],
                },
            },
            pagination: { page: 1, pageSize: 1 },
        },
        revalidate: 60,
        tags: [`course:slug:${slug}`],
    });
}
