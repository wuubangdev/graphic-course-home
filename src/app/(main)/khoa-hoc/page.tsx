import { fetchCourses, type Course, type CoursePriceFilter, type CourseSort } from "@/lib/strapi-lib/api/course";
import { fetchCategories } from "@/lib/strapi-lib/api/category";
import CourseFilters from "@/components/course-page/CourseFilters";
import CourseGrid from "@/components/course-page/CourseGrid";

type SearchParams = Record<string, string | string[] | undefined>;

function sp1(sp: SearchParams, key: string): string {
    const v = sp[key];
    if (!v) return "";
    return Array.isArray(v) ? (v[0] ?? "") : v;
}

function toPositiveInt(v: string, fallback: number) {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

function parseEnum<T extends readonly string[]>(
    allowed: T,
    v: string,
    fallback: T[number]
): T[number] {
    return (allowed as readonly string[]).includes(v) ? (v as T[number]) : fallback;
}

// Chỉ cần đảm bảo mảng này khớp đúng union type trong course.ts
const SORTS = ["new", "updated", "price_asc", "price_desc"] as const satisfies readonly CourseSort[];
const PRICES = ["all", "free", "paid"] as const satisfies readonly ("all" | CoursePriceFilter)[];

export default async function CoursesPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const sp = await searchParams;

    const q = sp1(sp, "q");
    const category = sp1(sp, "category") || "all";
    const level = sp1(sp, "level") || "all";

    const priceUI = sp1(sp, "price") || "all";
    const priceParsed = parseEnum(PRICES, priceUI, "all");

    const sortUI = sp1(sp, "sort") || "new";
    const sort = parseEnum(SORTS, sortUI, "new");

    const page = toPositiveInt(sp1(sp, "page"), 1);

    const [courseRes, catRes] = await Promise.all([
        fetchCourses({
            q: q || undefined,
            categoryDocumentId: category !== "all" ? category : undefined,
            level: level !== "all" ? level : undefined, // opts.level là string nên OK
            price: priceParsed === "all" ? undefined : priceParsed, // CoursePriceFilter | undefined
            sort, // CourseSort
            page,
            pageSize: 12,
        }),
        fetchCategories(),
    ]);

    const courses: Course[] = courseRes.data ?? [];
    const pagination = courseRes.meta.pagination;

    const categories = catRes.data ?? [];

    return (
        <main className="min-h-screen">
            <section className="pt-8 mx-auto max-w-[1280px] px-4">
                <div className="py-6 bg-white/70 px-6 rounded-lg">
                    <h1 className="text-2xl font-bold">Tất cả khoá học</h1>
                    <div className="mt-4">
                        <CourseFilters
                            initial={{
                                q,
                                category,
                                level,
                                price: priceParsed, // "all" | "free" | "paid"
                                sort,
                            }}
                            categories={categories.map((c) => ({
                                documentId: c.documentId,
                                title: c.title,
                            }))}
                        />
                    </div>
                </div>
            </section>
            <section className="mx-auto max-w-[1280px] px-4 pt-4 pb-8">
                <div className="py-6 bg-white/70 px-6 rounded-lg">
                    <CourseGrid
                        courses={courses}
                        pagination={{
                            page: pagination?.page ?? page,
                            pageCount: pagination?.pageCount ?? 1,
                            total: pagination?.total ?? courses.length,
                        }}
                    />
                </div>
            </section>
        </main>
    );
}
