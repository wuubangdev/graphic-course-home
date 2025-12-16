import { fetchAllLearnPressCourses } from "@/lib/learnpress";

export async function GET() {
    const baseUrl = process.env.WP_BASE_URL!;
    const courses = await fetchAllLearnPressCourses({
        baseUrl,
        endpoint: "/wp-json/learnpress/v1/courses",
        perPage: 100,
        status: "publish",
        revalidateSeconds: 60,
        category: "42,27",
    });

    return Response.json({ count: courses.length, courses });
}
