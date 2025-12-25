// src/lib/strapi.ts
export function strapiBaseUrl() {
    const base = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/+$/, "");
    if (!base) throw new Error("Missing env NEXT_PUBLIC_STRAPI_URL");
    return base;
}

export function strapiMediaUrl(url?: string | null) {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${strapiBaseUrl()}${url}`; // "/uploads/.." -> "https://..../uploads/.."
}

export class StrapiError extends Error {
    status: number;
    details?: unknown;
    constructor(message: string, status: number, details?: unknown) {
        super(message);
        this.name = "StrapiError";
        this.status = status;
        this.details = details;
    }
}

function buildQuery(obj: Record<string, unknown> = {}) {
    const params = new URLSearchParams();

    const append = (key: string, value: unknown) => {
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
            value.forEach((v, i) => append(`${key}[${i}]`, v));
            return;
        }
        if (typeof value === "object") {
            Object.entries(value).forEach(([k, v]) => append(`${key}[${k}]`, v));
            return;
        }

        params.append(key, String(value));
    };

    Object.entries(obj).forEach(([k, v]) => append(k, v));
    const s = params.toString();
    return s ? `?${s}` : "";
}

export async function strapiFetch<T>(
    path: string,
    opts?: {
        query?: Record<string, unknown>;
        cache?: RequestCache;
        revalidate?: number;
        tags?: string[];
    }
): Promise<T> {
    const url = `${strapiBaseUrl()}${path}${buildQuery(opts?.query)}`;

    // console.log("[STRAPI]", url);

    const res = await fetch(url, {
        cache: opts?.cache,
        next:
            opts?.revalidate || opts?.tags
                ? { revalidate: opts?.revalidate, tags: opts?.tags }
                : undefined,
        headers: { Accept: "application/json" },
    });

    const text = await res.text();
    let data: unknown = null;
    try {
        data = text ? JSON.parse(text) : null;
    } catch { }

    if (!res.ok) {
        throw new StrapiError(
            `Strapi fetch failed: ${res.status}`,
            res.status,
            data
        );
    }
    return data as T;
}
