import type { Course } from "@/lib/strapi-lib/api/course";
import CoursePager from "./CoursePager";
import { CourseCard } from "../courses/CourseSection";

export default function CourseGrid({
    courses,
    pagination,
}: {
    courses: Course[];
    pagination: { page: number; pageCount: number; total: number };
}) {
    if (!courses.length) {
        return (
            <div className="rounded-2xl border bg-white p-10 text-center text-slate-600">
                Không có khoá học phù hợp.
            </div>
        );
    }
    console.log(courses.length)
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {courses.map((c) => (
                    <CourseCard item={c} theme="light" />
                ))}
            </div>
            <CoursePager page={pagination.page} pageCount={pagination.pageCount} />
        </div>
    );
}
