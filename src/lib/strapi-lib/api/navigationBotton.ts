import { strapiFetch } from "../strapi";
import { StrapiV5File } from "../strapi-media";

export type NavBottomItem = {
    id: number;
    title: string;
    link: string;
    rank: number | null;
    icon?: StrapiV5File | null; // <-- thêm icon
};

export type NavigationBottomResponse = {
    data: {
        id: number;
        documentId: string;
        createdAt: string;
        updatedAt: string;
        publishedAt?: string | null;
        name: string;
        items: NavBottomItem[]; // <-- items có icon
    };
    meta: unknown;
};

export function navigationBottomQueryWithIcons() {
    return {
        populate: {
            items: { populate: { icon: true } },
        },
    } as const;
}

export async function fetchNavigationBottom() {
    return strapiFetch<NavigationBottomResponse>("/api/navigation-bottom", {
        query: navigationBottomQueryWithIcons(),
        tags: ["navigation-bottom"],
    });
}
