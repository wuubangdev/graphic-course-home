import { strapiFetch } from "../strapi";
import { StrapiV5File } from "../strapi-media";

export type NavItem = {
    id: number;
    title: string;
    link: string;
    rank: number | null;
    icon?: StrapiV5File | null; // media icon (nếu có)
};

export type NavigationTopResponse = {
    data: {
        id: number;
        documentId: string;
        createdAt: string;
        updatedAt: string;
        publishedAt?: string | null;
        name: string;
        main: NavItem;
        customerIncentives: NavItem;
        contactInfo: NavItem;
    };
    meta: unknown;
};

export function navigationTopQueryWithIcons() {
    // populate nested icon trong component
    return {
        populate: {
            main: { populate: { icon: true } },
            customerIncentives: { populate: { icon: true } },
            contactInfo: { populate: { icon: true } },
        },
    } as const;
}

export async function fetchNavigationTop() {
    return strapiFetch<NavigationTopResponse>("/api/navigation-top", {
        query: navigationTopQueryWithIcons(),
        // tuỳ bạn:
        // cache: "no-store",
        // revalidate: 60,
        tags: ["navigation-top"],
    });
}