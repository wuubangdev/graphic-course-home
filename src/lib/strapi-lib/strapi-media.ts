import { strapiMediaUrl } from "./strapi";

export type StrapiV5FileFormat = {
    ext: string;
    url: string;          // "/uploads/...."
    hash: string;
    mime: string;
    name: string;
    size: number;
    width: number;
    height: number;
    sizeInBytes?: number;
};

export type StrapiV5File = {
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string | null;
    caption?: string | null;
    width?: number | null;
    height?: number | null;
    formats?: {
        large?: StrapiV5FileFormat;
        medium?: StrapiV5FileFormat;
        small?: StrapiV5FileFormat;
        thumbnail?: StrapiV5FileFormat;
    } | null;
    url: string; // "/uploads/...."
    mime: string;
    ext: string;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string | null;
};

export function fileUrl(f: StrapiV5File, size?: "large" | "medium" | "small" | "thumbnail") {
    const picked = size ? f.formats?.[size]?.url : undefined;
    return strapiMediaUrl(picked || f.url);
}

export function fileAlt(f: StrapiV5File) {
    return f.alternativeText || f.caption || f.name || "";
}
