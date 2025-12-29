import { strapiFetch, strapiMediaUrl } from "../strapi";
import { StrapiV5File } from "../strapi-media";
import { StrapiV5Collection } from "../strapi-types";

export type PaymentMethod = {
    id: number;
    documentId: string;
    title: string;
    account: string | null;
    link: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    icon?: StrapiV5File | null;
};

export async function fetchPaymentMethods() {
    return strapiFetch<StrapiV5Collection<PaymentMethod>>("/api/payment-methods", {
        query: {
            populate: "*",
            sort: ["id:asc"],
            pagination: { page: 1, pageSize: 100 },
        },
        revalidate: 60,
        tags: ["payment-methods"],
    });
}

/** View-model gọn để render footer/header */
export type PaymentMethodView = {
    id: number;
    title: string;
    account: string | null;
    link: string | null;
    iconUrl: string | null; // absolute url
    iconThumbUrl: string | null; // absolute url
};

export async function fetchPaymentMethodsView(): Promise<PaymentMethodView[]> {
    const res = await fetchPaymentMethods();

    return (res.data ?? []).map((m) => {
        const icon = m.icon ?? null;
        const thumb = icon?.formats?.thumbnail?.url ?? null;

        return {
            id: m.id,
            title: m.title,
            account: m.account ?? null,
            link: m.link ?? null,
            iconUrl: strapiMediaUrl(icon?.url) ?? null,
            iconThumbUrl: strapiMediaUrl(thumb) ?? null,
        };
    });
}