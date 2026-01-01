// src/lib/strapi-lib/api/category.ts
import { strapiFetch } from "../strapi";
import { StrapiV5File } from "../strapi-media";
import { StrapiV5Collection } from "../strapi-types";
import { Course } from "./course";


export type Category = {
    id: number;
    documentId: string;
    title: string;
    description: string;
    selector: string;
    elementShow: number;
    setBg?: StrapiV5File | null;
    rank: number;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    courses: Course[];
};

export async function fetchCategories() {
    return strapiFetch<StrapiV5Collection<Category>>(`/api/categories`, {
        query: {
            populate: {
                setBg: true,
                courses: {
                    populate: {
                        // subMedia: true,
                        thumImage: true,
                        // thumMedia: true,
                        //category: true, // nếu muốn lấy luôn category trong course
                    }
                },
            },
            sort: ["rank:asc", "id:asc"],
            pagination: { page: 1, pageSize: 50 },
        },
        revalidate: 60,
        tags: ["categories"],
    });
}
