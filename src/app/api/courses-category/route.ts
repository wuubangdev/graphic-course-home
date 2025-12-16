import { fetchAllCourseCategories } from "@/lib/course_category";

export async function GET() {
    const baseUrl = process.env.WP_BASE_URL!;
    const courses = await fetchAllCourseCategories({
        baseUrl,
        endpoint: "/wp-json/learnpress/v1/courses",
        perPage: 100,
    });

    return Response.json({ count: courses.length, courses });
}
