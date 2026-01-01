import { fetchCourses } from "@/lib/strapi-lib/api/course";
import { fetchCategories } from "@/lib/strapi-lib/api/category";
import CourseFilters from "@/components/course-page/CourseFilters";
import CourseGrid from "@/components/course-page/CourseGrid";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function CoursesPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const sp = await searchParams;

    const sp1 = (key: string) => {
        const v = sp[key];
        if (!v) return "";
        return Array.isArray(v) ? (v[0] ?? "") : v;
    };

    const q = sp1("q");
    const category = sp1("category") || "all";
    const level = sp1("level") || "all";
    const price = sp1("price") || "all";
    const sort = sp1("sort") || "new";
    const page = Number(sp1("page") || 1);

    const [courseRes, catRes] = await Promise.all([
        fetchCourses({
            q: q || undefined,
            categoryDocumentId: category !== "all" ? category : undefined,
            level: level !== "all" ? level : undefined,
            price: price !== "all" ? (price as any) : undefined,
            sort: sort as any,
            page,
            pageSize: 12,
        }),
        fetchCategories(),
    ]);

    const courses = courseRes.data ?? [];
    const pagination = (courseRes as any).meta?.pagination; // nếu meta type bạn chưa fix
    const categories = catRes.data ?? [];

    return (
        <main className="min-h-screen">
            <section className="border-b bg-white/70">
                <div className="mx-auto max-w-[1280px] px-4 py-6">
                    <h1 className="text-2xl font-bold">Tất cả khoá học</h1>

                    <div className="mt-4">
                        <CourseFilters
                            initial={{ q, category, level, price, sort }}
                            categories={categories.map((c) => ({ documentId: c.documentId, title: c.title }))}
                        />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-[1280px] px-4 py-8">
                <CourseGrid
                    courses={courses}
                    pagination={{
                        page: pagination?.page ?? page,
                        pageCount: pagination?.pageCount ?? 1,
                        total: pagination?.total ?? courses.length,
                    }}
                />
            </section>
        </main>
    );
}
