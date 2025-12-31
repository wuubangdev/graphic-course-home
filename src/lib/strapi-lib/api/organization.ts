import { strapiFetch } from "../strapi";
import type { StrapiV5Single } from "../strapi-types";
import type { StrapiV5File } from "../strapi-media";

export type OrganizationItem = {
    id: number;
    title: string;
    filter: string;
    icon?: StrapiV5File | null;
};

export type Organization = {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string | null;
    ogranizations: OrganizationItem[];
};

export async function fetchOrganization() {
    return strapiFetch<StrapiV5Single<Organization>>("/api/organization", {
        query: {
            "populate[ogranizations][populate]": "icon",
        },
        revalidate: 60,
        tags: ["organization"],
    });
}
