import { strapiFetch } from "../strapi";
import type { StrapiV5Single } from "../strapi-types";
import type { StrapiV5File } from "../strapi-media";

export type HeroSubNavItem = {
    id: number;
    title: string;
    link: string;
    rank: number | null;
    icon?: StrapiV5File | null;
};

export type Hero = {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    listMedia: StrapiV5File[];
    mediaBg?: StrapiV5File | null;
    subNav?: HeroSubNavItem[];
};

export async function fetchHero() {
    return strapiFetch<StrapiV5Single<Hero>>("/api/hero", {
        query: {
            "populate[listMedia]": true,
            "populate[mediaBg]": true,
            "populate[subNav][populate]": "icon",
        },
        revalidate: 60,
        tags: ["hero"],
    });
}
