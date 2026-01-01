import { fileAlt, fileUrl } from "@/lib/strapi-lib/api/course";
import { StrapiV5File } from "@/lib/strapi-lib/strapi-media";

export type GalleryMedia =
    | { kind: "image"; src: string; alt: string }
    | { kind: "video"; src: string; title?: string; poster?: string };

export function toGalleryMedia(files?: StrapiV5File[] | null): GalleryMedia[] {
    if (!files?.length) return [];

    return files
        .map((f) => {
            const mime = (f.mime || "").toLowerCase();

            if (mime.startsWith("image/")) {
                return {
                    kind: "image" as const,
                    src: fileUrl(f, "large") ?? fileUrl(f),
                    alt: fileAlt(f),
                };
            }

            if (mime.startsWith("video/")) {
                return {
                    kind: "video" as const,
                    src: fileUrl(f),
                    title: fileAlt(f) || f.name,
                    // poster sẽ được generate ở client (CourseGallery)
                };
            }

            return null;
        })
        .filter(Boolean) as GalleryMedia[];
}
