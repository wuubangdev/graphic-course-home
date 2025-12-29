import { strapiFetch } from "../strapi";
import { StrapiV5Single } from "../strapi-types";


export type Contact = {
    id: number;
    documentId: string;
    title: string;
    phone: number | string; // Strapi có thể trả number, UI thường dùng string
    email: string | null;
    facebook: string | null;
    tiktok: string | null;
    instagram: string | null;
    youtube: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
};


export async function fetchContact() {
    return strapiFetch<StrapiV5Single<Contact>>("/api/contact", {
        query: { populate: "*" },
        revalidate: 60,
        tags: ["contact"],
    });
}

/** helper: chuẩn hoá link social (thêm https:// nếu thiếu) */
export function normalizeUrl(url?: string | null) {
    if (!url) return null;
    const u = url.trim();
    if (!u) return null;
    if (u.startsWith("http://") || u.startsWith("https://")) return u;
    return `https://${u}`;
}

/** view-model gọn cho UI */
export type ContactView = {
    email: string | null;
    phone: string | null;
    facebook: string | null;
    tiktok: string | null;
    instagram: string | null;
    youtube: string | null;
};

export async function fetchContactView(): Promise<ContactView> {
    const res = await fetchContact();
    const c = res.data;

    if (!c) {
        return {
            email: null,
            phone: null,
            facebook: null,
            tiktok: null,
            instagram: null,
            youtube: null,
        };
    }

    return {
        email: c.email ?? null,
        phone: c.phone !== null && c.phone !== undefined ? String(c.phone) : null,
        facebook: normalizeUrl(c.facebook),
        tiktok: normalizeUrl(c.tiktok),
        instagram: normalizeUrl(c.instagram),
        youtube: normalizeUrl(c.youtube),
    };
}