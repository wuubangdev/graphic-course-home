// src/lib/api/feature.ts
import { strapiFetch } from "../strapi";
import type { StrapiV5File } from "../strapi-media";
import { StrapiV5Collection } from "../strapi-types";

export type Feature = {
    id: number;
    documentId: string;
    title: string;
    selector: string;
    rank: number;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    icon?: StrapiV5File | null;
};

export async function fetchFeatures() {
    return strapiFetch<StrapiV5Collection<Feature>>(`/api/features`, {
        query: {
            populate: {
                icon: true,
            },
            sort: ["rank:asc", "id:asc"],
            pagination: {
                page: 1,
                pageSize: 50,
            },
        },
        revalidate: 60,
        tags: ["features"],
    });
}
