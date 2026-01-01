import { notFound } from "next/navigation";
import { fetchCourseBySlug, fileUrl } from "@/lib/strapi-lib/api/course";
import Link from "next/link";
import Image from "next/image";
import { toGalleryMedia } from "@/components/course-detail-page/courseMedia";
import CourseGallery from "@/components/course-detail-page/CourseGallery";
import MarkdownRender from "@/components/util/MarkdownRender";

export default async function Page({ params }: { params: { slug: string } }) {
    const res = await fetchCourseBySlug(params.slug);
    const course = res.data?.[0];
    if (!course) notFound();

    // hero input: ưu tiên thumMedia/thumImage trước, sau đó subMedia
    const heroFiles = [
        ...(course.thumMedia ? [course.thumMedia] : []),
        ...(course.thumImage ? [course.thumImage] : []),
        ...(course.subMedia ?? []),
    ];
    const heroItems = toGalleryMedia(heroFiles);

    const categories = course.categories ?? [];

    return (
        <main className="bg-slate-50">
            <div className="mx-auto max-w-[1280px] px-4 py-10">
                {/* HERO */}
                <CourseGallery items={heroItems} />

                {/* BODY */}
                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                    {/* LEFT */}
                    <article className="rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.06)]">
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                            {course.title}
                        </h1>

                        {/* categories tag */}
                        {categories.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {categories.map((c) => (
                                    <Link
                                        key={c.documentId}
                                        href={`/khoa-hoc?category=${encodeURIComponent(c.documentId)}&page=1`}
                                        className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700 hover:bg-blue-100"
                                    >
                                        {c.title}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* short description */}
                        {course.description && (
                            <p className="mt-4 text-base leading-relaxed text-slate-700">
                                {course.description}
                            </p>
                        )}

                        {/* info boxes */}
                        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <InfoBox label="Level" value={course.level || "—"} />
                            <InfoBox label="Học viên" value={`${course.fakeStudentCount ?? 0}+`} />
                            <InfoBox
                                label="Giá"
                                value={
                                    course.priceSale > 0
                                        ? `${formatVnd(course.priceSale)}`
                                        : "Miễn phí"
                                }
                            />
                        </div>

                        {/* CONTENT (tuỳ bạn render Strapi Blocks / Markdown) */}
                        <section className="prose prose-slate mt-8 max-w-none">
                            <MarkdownRender content={(course.content as string) ?? ""} />
                        </section>

                        {/* Student works giống ảnh */}
                        <section className="mt-10">
                            <h2 className="text-2xl font-bold text-slate-900">Sản phẩm của học viên</h2>
                            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <StudentWorkCard />
                                <StudentWorkCard />
                                <StudentWorkCard />
                            </div>
                        </section>
                    </article>

                    {/* RIGHT SIDEBAR */}
                    <aside className="space-y-6">
                        {/* categories box */}
                        <div className="rounded-2xl bg-white p-5 shadow-[0_10px_25px_rgba(0,0,0,0.06)] lg:sticky lg:top-24">
                            <div className="text-sm font-semibold text-slate-700">Danh mục</div>

                            <div className="mt-3 space-y-2 text-sm">
                                {categories.length ? (
                                    categories.map((c) => (
                                        <Link
                                            key={c.documentId}
                                            href={`/${c.selector ?? ""}#${c.selector ?? ""}`}
                                            className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100"
                                        >
                                            {c.title}
                                        </Link>
                                    ))
                                ) : (
                                    <div className="text-slate-500">Chưa có danh mục</div>
                                )}
                            </div>
                        </div>

                        {/* related courses (có thể fetch thật theo category) */}
                        <div className="rounded-2xl bg-white p-5 shadow-[0_10px_25px_rgba(0,0,0,0.06)]">
                            <div className="text-sm font-semibold text-slate-700">Các khóa liên quan</div>
                            <div className="mt-4 space-y-3">
                                {/* Demo UI row - sau sẽ thay bằng map related */}
                                <RelatedCourseRow
                                    title="Khóa học liên quan #1"
                                    thumb={course.thumImage ? fileUrl(course.thumImage, "thumbnail") : null}
                                />
                                <RelatedCourseRow
                                    title="Khóa học liên quan #2"
                                    thumb={course.thumImage ? fileUrl(course.thumImage, "thumbnail") : null}
                                />
                                <RelatedCourseRow
                                    title="Khóa học liên quan #3"
                                    thumb={course.thumImage ? fileUrl(course.thumImage, "thumbnail") : null}
                                />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

function InfoBox({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl bg-slate-100 px-4 py-3">
            <div className="text-xs font-semibold uppercase text-slate-500">{label}</div>
            <div className="mt-1 text-sm font-bold text-slate-900">{value}</div>
        </div>
    );
}

function StudentWorkCard() {
    return (
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white hover:shadow-[0_12px_28px_rgba(0,0,0,0.10)]">
            <div className="aspect-video bg-slate-200" />
            <div className="p-4">
                <div className="font-semibold text-slate-900">Student Work</div>
                <div className="mt-1 text-sm text-slate-600">Tên học viên</div>
            </div>
        </div>
    );
}

function RelatedCourseRow({ title, thumb }: { title: string; thumb: string | null }) {
    return (
        <div className="flex gap-3 rounded-xl border border-black/10 p-3 hover:bg-slate-50">
            <div className="relative h-12 w-12 flex-none overflow-hidden rounded-lg bg-slate-200">
                {thumb ? <Image src={thumb} alt={title} fill className="object-cover" sizes="48px" /> : null}
            </div>
            <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-900">{title}</div>
                <div className="mt-1 text-xs text-slate-600">Blender / 3D</div>
            </div>
        </div>
    );
}

function formatVnd(n: number) {
    if (!n || n <= 0) return "0đ";
    return new Intl.NumberFormat("vi-VN").format(n) + "đ";
}
