import { strapiFetch } from "../strapi";
import type { StrapiV5Single } from "../strapi-types";
import type { StrapiV5File } from "../strapi-media";

export type Hero = {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    listMedia: StrapiV5File[];
    listSingleMedia: StrapiV5File[];
    mediaBg?: StrapiV5File;
};

export async function fetchHero() {
    return strapiFetch<StrapiV5Single<Hero>>(`/api/hero`, {
        query: {
            populate: {
                listMedia: true,
                listSingleMedia: true,
                mediaBg: true,
            },
        },
        revalidate: 60,
        tags: ["hero"],
    });
}
