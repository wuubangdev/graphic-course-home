// src/lib/strapi-server.ts
import "server-only";
import { StrapiError } from "./strapi";

function strapiServerBaseUrl() {
    const base =
        process.env.STRAPI_URL?.replace(/\/+$/, "") ||
        process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/+$/, "");

    if (!base) throw new Error("Missing env STRAPI_URL (or NEXT_PUBLIC_STRAPI_URL)");
    return base;
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
            Object.entries(value as Record<string, unknown>).forEach(([k, v]) => append(`${key}[${k}]`, v));
            return;
        }

        params.append(key, String(value));
    };

    Object.entries(obj).forEach(([k, v]) => append(k, v));
    const s = params.toString();
    return s ? `?${s}` : "";
}

export async function strapiServerFetch<T>(
    path: string,
    opts?: {
        method?: "GET" | "POST" | "PUT" | "DELETE";
        query?: Record<string, unknown>;
        body?: unknown;
    }
): Promise<T> {
    const token = process.env.STRAPI_API_TOKEN;
    if (!token) throw new Error("Missing env STRAPI_API_TOKEN");

    const url = `${strapiServerBaseUrl()}${path}${buildQuery(opts?.query)}`;

    const res = await fetch(url, {
        method: opts?.method ?? "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: opts?.body ? JSON.stringify({ data: opts.body }) : undefined,
        cache: "no-store",
    });

    const text = await res.text();
    let data: unknown = null;
    try {
        data = text ? JSON.parse(text) : null;
    } catch { }

    if (!res.ok) throw new StrapiError(`Strapi server fetch failed: ${res.status}`, res.status, data);
    return data as T;
}
