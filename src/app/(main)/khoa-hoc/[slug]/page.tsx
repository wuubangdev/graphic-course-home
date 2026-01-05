import { notFound } from "next/navigation";
import { fetchCourseBySlug, fileUrl } from "@/lib/strapi-lib/api/course";
import Link from "next/link";
import Image from "next/image";
import { toGalleryMedia } from "@/components/course-detail-page/courseMedia";
import CourseGallery from "@/components/course-detail-page/CourseGallery";
import MarkdownRender from "@/components/util/MarkdownRender";
import RelatedCourseRow from "@/components/course-detail-page/RelatedCourseRow";
import ButtonBuy from "@/components/popup/ButtonBuy";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const res = await fetchCourseBySlug(slug);
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
                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
                    {/* LEFT */}
                    <article className="rounded-2xl bg-white p-8 shadow-[0_10px_25px_rgba(0,0,0,0.06)] max-w-none prose-hr:my-2">
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900"
                            style={{ fontWeight: 600 }}
                        >
                            {course.title}
                        </h1>
                        {/* categories tag */}
                        {categories.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {categories.map((c) => (
                                    <Link
                                        key={c.documentId}
                                        href={`/khoa-hoc?category=${encodeURIComponent(c.documentId)}&page=1`}
                                        className="rounded-sm no-underline border border-blue-200 bg-blue-50 px-3 py-1 
                                        text-sm text-blue-700 hover:bg-blue-100"
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
                            <InfoBox label="Skill Level" value={course.level || "—"} />
                            <InfoBox label="Phần mềm" value={`${course.software}`} />
                            <InfoBox
                                label="Thời lượng"
                                value={`${course.duration}`}
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
                                {course.student_products && course.student_products.map((item) =>
                                    <StudentWorkCard
                                        key={item.documentId}
                                        title={item.title}
                                        thumb={item?.thumImage ? fileUrl(item.thumImage, "thumbnail") : null}
                                        fullName={item.users_permissions_user?.fullName || "Tên học viên"}
                                        href={item.slug}
                                    />
                                )}
                            </div>
                        </section>
                    </article>
                    {/* RIGHT SIDEBAR */}
                    <aside className="space-y-6">
                        {/* related courses (có thể fetch thật theo category) */}
                        <div className="rounded-2xl bg-white p-5 shadow-[0_10px_25px_rgba(0,0,0,0.06)]">
                            <div className="text-sm font-semibold text-slate-700">Các khóa liên quan</div>
                            <div className="mt-4 space-y-3">
                                {/* Demo UI row - sau sẽ thay bằng map related */}
                                {course.course_linkeds && course.course_linkeds.map((item) =>
                                    <RelatedCourseRow
                                        key={item.documentId}
                                        title={item.title}
                                        href={item.slug}
                                        thumb={course.thumImage ? fileUrl(course.thumImage, "thumbnail") : null}
                                    />
                                )}
                            </div>
                        </div>
                        {/* categories box */}
                        <div className="rounded-2xl bg-white p-5 shadow-[0_10px_25px_rgba(0,0,0,0.06)] lg:sticky lg:top-6">
                            <div className="text-sm font-semibold text-slate-700">Danh mục</div>
                            <div className="mt-3 space-y-2 text-sm">
                                {categories.length ? (
                                    categories.map((c) => (
                                        <Link
                                            key={c.documentId}
                                            href={`/#${c.selector ?? ""}`}
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
                    </aside>
                </div>
            </div>
            <ButtonBuy
                course={{
                    documentId: course.documentId,
                    title: course.title,
                    price: Number(course.priceSale ?? course.priceOrigin ?? 0),
                    image: course.thumImage ? fileUrl(course.thumImage, "thumbnail") : null,
                }}
            />
        </main>
    );
}

function InfoBox({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-sm bg-slate-100 px-4 py-3">
            <div className="text-xs font-semibold uppercase text-center text-slate-500">{label}</div>
            <div className="mt-1 font-bold uppercase text-center text-slate-900">{value}</div>
        </div>
    );
}

function StudentWorkCard({ thumb, title, fullName, href }:
    { thumb: string | null, title: string, fullName: string, href: string }) {
    return (
        <Link
            href={`/san-pham/${href}`}
            className="overflow-hidden rounded-lg border border-black/10 hover:-translate-y-1 cursor-pointer duration-300 hover:shadow-[0_12px_28px_rgba(0,0,0,0.10)]"
        >
            <div className="w-full aspect-video rounded-lg overflow-hidden relative leading-none">
                {thumb &&
                    <Image
                        src={thumb}
                        alt={title}
                        fill
                        className="object-cover w-full h-full" />
                }
            </div>
            <div className="p-4">
                <div className="font-semibold text-slate-900">{title}</div>
                <div className="mt-1 text-sm text-slate-600">{fullName}</div>
            </div>
        </Link>
    );
}