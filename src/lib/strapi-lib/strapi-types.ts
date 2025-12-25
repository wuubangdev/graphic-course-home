export type StrapiV5Meta = { meta?: unknown };

// Single type: { data: T | null, meta: {} }
export type StrapiV5Single<T> = {
    data: T | null;
    meta?: unknown;
};

// Collection type: { data: T[], meta: { pagination?... } }
export type StrapiV5Collection<T> = {
    data: T[];
    meta?: unknown;
};

export const unwrapSingle = <T>(res: StrapiV5Single<T>) => res.data;
export const unwrapCollection = <T>(res: StrapiV5Collection<T>) => res.data;