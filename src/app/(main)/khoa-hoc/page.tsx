import { fetchAllLearnPressCourses, LpCourse } from "@/lib/learnpress";

type SP = Record<string, string | string[] | undefined>;

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<SP>;
}) {
    const sp = await searchParams;
    const category = typeof sp.cat === "string" ? sp.cat : "";
    const search = typeof sp.search === "string" ? sp.search : "";
    const data: LpCourse[] = await fetchAllLearnPressCourses({
        baseUrl: process.env.WP_BASE_URL!,
        category: category || "",
        search: search || "",
    });
    const courses = data;
    console.log("courses", courses);

    return <section className='pt-8 pb-24 relative'>
        <div className='container px-4 mx-auto z-20'>
            <div className='w-full'>
                {/* {courses.length === 0 ? <p>Đang tải...</p> :
                    <div className='mt-4 grid grid-cols-4 gap-8'>
                        {courses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                } */}
            </div>
        </div>
    </section>;
}
