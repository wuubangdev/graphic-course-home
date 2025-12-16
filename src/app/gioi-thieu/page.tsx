"use client";

import { Tabs, Collapse, Carousel, Button } from "antd";

const careerTracks = [
    {
        key: "design",
        label: "Thiết kế 2D / UX-UI",
        title: "Lộ trình Thiết kế 2D & UX/UI",
        highlight: "Dành cho bạn đam mê giao diện người dùng, xây dựng thương hiệu và kể chuyện bằng hình ảnh.",
        combos:
            "Combo UX/UI Designer, Combo Graphic Designer, Combo 2D Artist.",
        tools: "Figma, Photoshop, Illustrator, After Effects.",
    },
    {
        key: "3d-vfx",
        label: "3D / VFX",
        title: "Lộ trình 3D Art & VFX",
        highlight:
            "Bước chân vào thế giới điện ảnh và hậu kỳ bom tấn, nơi bạn tạo ra những điều không thể.",
        combos:
            "Combo 3D Artist, Combo 3D Generalist, Combo 3D VFX Artist.",
        tools: "Blender, Maya, Houdini, Nuke, Substance Painter, ZBrush.",
    },
    {
        key: "game-dev",
        label: "Game Development",
        title: "Lộ trình Lập trình & Phát triển Game",
        highlight:
            "Không chỉ chơi game, hãy tạo ra thế giới game của riêng bạn với các công cụ mạnh mẽ nhất.",
        combos:
            "Combo Lập trình Game (Unity), Combo Lập trình Game (Unreal Engine).",
        tools: "Unity, Unreal Engine 5, C++.",
    },
];

const mentors = [
    {
        name: "Nguyễn Văn A",
        title: "Lead 3D Artist @ Sparx* Studio",
        quote: "Tôi giúp bạn tránh những sai lầm mà tôi đã mất 10 năm để nhận ra.",
        linkText: "Xem dự án học viên của A",
    },
    {
        name: "Trần Thị B",
        title: "Senior VFX Artist @ Bad Clay Studio",
        quote:
            "Kỹ xảo không phải là 'thủ thuật', đó là quy trình. Tôi sẽ dạy bạn quy trình đó.",
        linkText: "Xem dự án học viên của B",
    },
    {
        name: "Lê Văn C",
        title: "UI/UX Lead @ (Agency/Game Studio)",
        quote:
            "Thiết kế của bạn phải giải quyết được vấn đề kinh doanh. Đó là điều tôi tập trung.",
        linkText: "Xem dự án học viên của C",
    },
];

const faqItems = [
    {
        key: "1",
        label: "Tôi chưa biết gì về đồ họa, nên bắt đầu từ đâu?",
        children: (
            <p className="text-sm leading-relaxed">
                Nếu bạn là người mới, cách tốt nhất là bắt đầu với một lộ trình có định
                hướng rõ ràng. Tại KHOAHOCDOHOA.COM, chúng tôi khuyên bạn nên bắt đầu
                với Lộ trình Graphic Designer hoặc Lộ trình UX/UI Designer để nắm vững
                nền tảng 2D. Nếu đam mê 3D, Lộ trình 3D Artist (Blender) là lựa chọn
                tuyệt vời. Hãy nhấn vào nút “Nhận tư vấn 1:1” để chúng tôi hiểu rõ hơn
                về mục tiêu của bạn.
            </p>
        ),
    },
    {
        key: "2",
        label: "Phương pháp 'Portfolio Mentoring' hoạt động thế nào?",
        children: (
            <p className="text-sm leading-relaxed">
                Thay vì chỉ xem video và tự học, bạn sẽ được học 1:1 với giảng viên là
                chuyên gia trong ngành. Bạn sẽ thực hiện một dự án portfolio thực tế
                xuyên suốt khóa học và nhận “critique” (phản biện) chi tiết, giúp bạn
                hoàn thiện sản phẩm chuẩn studio – đây chính là tài sản quan trọng nhất
                khi ứng tuyển.
            </p>
        ),
    },
    {
        key: "3",
        label: "Học xong có được hỗ trợ việc làm không?",
        children: (
            <p className="text-sm leading-relaxed">
                Mục tiêu của chúng tôi là 100% học viên có việc làm đúng ngành. Chúng
                tôi có mạng lưới đối tác tuyển dụng rộng lớn (bao gồm Sparx*, Bad Clay,
                VNG...) và sẽ giới thiệu portfolio của bạn trực tiếp đến các studio.
                Portfolio bạn làm trong khóa học chính là CV tốt nhất của bạn.
            </p>
        ),
    },
    {
        key: "4",
        label:
            "KHOAHOCDOHOA.COM có phải là trung tâm đào tạo thiết kế đồ họa uy tín không?",
        children: (
            <p className="text-sm leading-relaxed">
                KHOAHOCDOHOA.COM tự hào là một trong những trung tâm đào tạo thiết kế
                đồ họa chuyên sâu hàng đầu, đặc biệt trong lĩnh vực 3D/VFX và Game Dev.
                Uy tín của chúng tôi được xây dựng dựa trên đội ngũ giảng viên là
                chuyên gia đầu ngành, triết lý đào tạo tập trung vào portfolio thực tế
                và mạng lưới đối tác studio rộng lớn nơi học viên đang làm việc.
            </p>
        ),
    },
];

export default function AboutKhoahocDohoaPage() {
    return (
        <div className="bg-[#f5f7fb] pt-32">
            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-[#0049d9] text-white">
                {/* video nền */}
                <video
                    className="absolute inset-0 h-full w-full object-cover opacity-30"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    {/* TODO: thay src bằng showreel thật của học viên */}
                    <source src="/videos/khoahocdohoa-showreel.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0049d9] via-[#0049d9]/80 to-[#00153a]" />

                <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24">
                    <div className="max-w-3xl space-y-6">
                        <p className="text-xs uppercase tracking-[0.25em] text-blue-100">
                            Trang Giới Thiệu KHOAHOCDOHOA.COM
                        </p>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                            Nơi Biến Đam Mê Đồ Họa Thành Sự Nghiệp Quốc Tế.
                        </h1>
                        <h2 className="text-base md:text-lg text-blue-100 leading-relaxed">
                            Khai phá toàn bộ tiềm năng sáng tạo với hệ sinh thái đào tạo 3D,
                            VFX và Phát triển Game chuyên sâu và toàn diện nhất Việt Nam.
                        </h2>

                        <div className="flex flex-wrap items-center gap-3 pt-4">
                            <Button
                                type="primary"
                                size="large"
                                className="bg-[#ffb100] border-none text-black font-semibold hover:bg-[#ffc54d]"
                                href="/lo-trinh-nghe-nghiep"
                            >
                                Xem lộ trình nghề nghiệp
                            </Button>
                            <Button
                                ghost
                                size="large"
                                className="border-blue-100 text-blue-50 hover:bg-white/10"
                                href="/dang-ky-tu-van"
                            >
                                Nhận tư vấn 1:1 miễn phí
                            </Button>
                        </div>
                    </div>

                    {/* Trust bar */}
                    <div className="mt-10 border border-white/15 bg-white/5 backdrop-blur rounded-2xl px-4 py-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-blue-100 mb-3">
                            Được tin cậy bởi các chuyên gia &amp; học viên đang làm việc tại
                        </p>
                        <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-white/10" />
                                <span>VNG</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-white/10" />
                                <span>GlassEgg</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-white/10" />
                                <span>Sparx* / Virtuos</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-white/10" />
                                <span>Bad Clay Studio</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <main className="max-w-6xl mx-auto px-4 py-12 space-y-16 lg:space-y-20">
                {/* Section 2: Câu chuyện */}
                <section id="cau-chuyen" className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-5">
                        <h2 className="text-2xl md:text-3xl font-bold">
                            Chúng Tôi Từng Giống Như Bạn: “Mắc Kẹt”
                        </h2>
                        <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                            Chúng tôi khởi đầu KHOAHOCDOHOA.COM từ một nỗi trăn trở cá nhân.
                            Là những người đi trước trong ngành, chúng tôi nhận thấy một
                            khoảng cách khổng lồ tại Việt Nam: Tài năng sáng tạo liên tục
                            “mắc kẹt” ở các kỹ năng 2D cơ bản. Các studio 3D/VFX hàng đầu thế
                            giới (đặt tại Việt Nam) vẫn “khát” nhân lực, trong khi hàng ngàn
                            bạn trẻ loay hoay với các khóa học không còn phù hợp, hoặc tự học
                            một mình trong “mê cung” kiến thức 3D phức tạp và dễ bỏ cuộc.
                        </p>
                        <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                            Sứ mệnh của chúng tôi là phá vỡ rào cản đó. Chúng tôi quyết tâm
                            xây dựng một “kho vũ khí” đào tạo toàn diện, từ Blender, Houdini,
                            Nuke đến Unreal Engine 5, để trang bị cho bạn những kỹ năng sẵn
                            sàng cho các dự án bom tấn. Chúng tôi không chỉ dạy “công cụ”,
                            chúng tôi đào tạo “artist” với tư duy và quy trình làm việc chuẩn
                            studio quốc tế.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        {/* TODO: thay hình nhà sáng lập thật */}
                        <div className="relative w-full max-w-sm">
                            <div className="absolute inset-0 rounded-3xl bg-blue-200 blur-2xl opacity-60" />
                            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-slate-900">
                                <img
                                    src="/images/founder-placeholder.jpg"
                                    alt="Nhà sáng lập KHOAHOCDOHOA.COM"
                                    className="h-80 w-full object-cover"
                                />
                                <div className="p-4 text-white">
                                    <p className="text-sm font-semibold">
                                        Nhà sáng lập KHOAHOCDOHOA.COM
                                    </p>
                                    <p className="text-xs text-blue-100">
                                        Hơn 10+ năm kinh nghiệm trong 3D, VFX &amp; Game Art
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: USP */}
                <section id="ly-do" className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Không Chỉ Học. Đây Là Luyện Thi Thực Chiến Cho Studio.
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: "🎯",
                                title: "Hệ sinh thái Toàn diện Nhất",
                                body: "Nắm vững toàn bộ pipeline với danh mục hàng trăm khóa học chuyên sâu về 3D, VFX & Game Dev – từ Modeling đến FX và Dev.",
                            },
                            {
                                icon: "👨‍🏫",
                                title: "Học từ Chuyên gia Đầu ngành",
                                body: "100% giảng viên là Artist/Developer đang làm việc tại các studio hàng đầu, mentor dựa trên kinh nghiệm dự án thực chiến.",
                            },
                            {
                                icon: "📁",
                                title: "Triết lý “Portfolio Mentoring”",
                                body: "Kết thúc khóa học với portfolio chuẩn studio, dựa trên dự án cá nhân được cố vấn sát sao – không phải bài tập rời rạc.",
                            },
                            {
                                icon: "🤝",
                                title: "Cam kết Đầu ra & Kết nối",
                                body: "Kết nối với mạng lưới đối tác tuyển dụng tại các studio 3D, VFX, Game uy tín, tối đa hóa cơ hội việc làm cho học viên.",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-2xl bg-white shadow-sm p-5 flex flex-col gap-3"
                            >
                                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-50 text-lg">
                                    {item.icon}
                                </div>
                                <h3 className="font-semibold text-sm md:text-base">
                                    {item.title}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                                    {item.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 4: Hệ sinh thái khóa học */}
                <section id="lo-trinh" className="space-y-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold">
                            Chọn Lộ trình Nghề nghiệp Của Bạn
                        </h2>
                        <p className="mt-2 text-sm md:text-base text-slate-700">
                            Học đồ họa ở đâu tốt? Bắt đầu từ mục tiêu của bạn. Chúng tôi đã
                            thiết kế các lộ trình (Combos) toàn diện để đưa bạn từ con số 0
                            đến vị trí Junior Artist/Developer.
                        </p>
                    </div>

                    <Tabs
                        defaultActiveKey="design"
                        items={careerTracks.map((track) => ({
                            key: track.key,
                            label: track.label,
                            children: (
                                <div className="grid md:grid-cols-3 gap-6 mt-4">
                                    <div className="md:col-span-2 space-y-3">
                                        <h3 className="text-lg md:text-xl font-semibold">
                                            {track.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                                            {track.highlight}
                                        </p>
                                        <p className="text-sm text-slate-700">
                                            <span className="font-semibold">Các Combo chính:</span>{" "}
                                            {track.combos}
                                        </p>
                                        <p className="text-sm text-slate-700">
                                            <span className="font-semibold">Công cụ chính:</span>{" "}
                                            {track.tools}
                                        </p>
                                    </div>
                                    <div className="md:col-span-1 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex flex-col justify-between">
                                        <div className="space-y-2">
                                            <p className="text-xs uppercase tracking-[0.2em] text-blue-600">
                                                Gợi ý cho bạn
                                            </p>
                                            <p className="text-sm text-slate-800">
                                                Hãy chọn lộ trình phù hợp nhất với mục tiêu 1–3 năm tới
                                                của bạn. Đội ngũ tư vấn sẽ giúp bạn tinh chỉnh kế hoạch
                                                học tập.
                                            </p>
                                        </div>
                                        <Button
                                            type="primary"
                                            className="mt-4 bg-[#0049d9] hover:bg-[#335eea]"
                                            href="/dang-ky-tu-van"
                                        >
                                            Nhận tư vấn lộ trình
                                        </Button>
                                    </div>
                                </div>
                            ),
                        }))}
                    />
                </section>

                {/* Section 5: Đội ngũ giảng viên */}
                <section id="giang-vien" className="space-y-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold">
                            Gặp Gỡ Các Bậc Thầy Của Bạn
                        </h2>
                        <p className="mt-2 text-sm md:text-base text-slate-700">
                            Họ là các Senior &amp; Lead Artist tại các Studio hàng đầu. Hôm
                            nay, họ là Mentor của bạn.
                        </p>
                    </div>

                    <Carousel
                        dots
                        autoplay
                        className="[&_.slick-slide]:px-2 [&_.slick-list]:-mx-2"
                    >
                        {mentors.map((m) => (
                            <div key={m.name}>
                                <div className="grid md:grid-cols-2 gap-6 items-center">
                                    <div className="flex justify-center">
                                        {/* TODO: thay ảnh thật */}
                                        <div className="relative h-64 w-64 rounded-full overflow-hidden shadow-lg bg-slate-900">
                                            <img
                                                src="/images/mentor-placeholder.jpg"
                                                alt={m.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-xs uppercase tracking-[0.25em] text-blue-600">
                                            Mentor tiêu biểu
                                        </p>
                                        <h3 className="text-xl font-semibold">{m.name}</h3>
                                        <p className="text-sm font-medium text-slate-700">
                                            {m.title}
                                        </p>
                                        <p className="text-sm italic text-slate-700">
                                            “{m.quote}”
                                        </p>
                                        <Button type="link" href="/du-an-hoc-vien">
                                            {m.linkText}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </section>

                {/* Section 6: Triết lý đào tạo */}
                <section id="phuong-phap" className="space-y-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold">
                            Học Thật. Làm Thật. Nhận Phản Hồi Thật.
                        </h2>
                        <h3 className="mt-1 text-sm md:text-base font-semibold text-slate-800">
                            Triết lý “Portfolio Mentoring” Độc quyền
                        </h3>
                        <p className="mt-2 text-sm md:text-base text-slate-700 leading-relaxed">
                            Chúng tôi không tin vào lý thuyết suông hay các bài tập rời rạc.
                            Triết lý của KHOAHOCDOHOA.COM là “Portfolio Mentoring”
                            (Cố vấn Dự án). Bạn sẽ không học bằng cách xem video một mình. Bạn
                            sẽ học bằng cách xây dựng một dự án hoàn chỉnh – từ concept đến
                            final render – dưới sự cố vấn 1:1 của giảng viên.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                step: "Bước 1",
                                title: "Nhận Brief (Đề bài)",
                                body: "Nhận brief dự án từ giảng viên, mô phỏng yêu cầu thực tế từ khách hàng hoặc studio.",
                            },
                            {
                                step: "Bước 2",
                                title: "Thực thi & Sửa Lỗi (Critique)",
                                body: "Thực hành, nộp bài và nhận critique chi tiết để tinh chỉnh sản phẩm. Phản hồi của chúng tôi cụ thể và có thể hành động được.",
                            },
                            {
                                step: "Bước 3",
                                title: "Hoàn thiện Portfolio",
                                body: "Kết thúc khóa học với một dự án xịn và quy trình làm việc chuyên nghiệp trong portfolio, sẵn sàng ứng tuyển.",
                            },
                        ].map((s, idx) => (
                            <div
                                key={s.title}
                                className="relative rounded-2xl bg-white shadow-sm p-5 flex flex-col gap-3"
                            >
                                <div className="absolute -top-3 left-4 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                                    {s.step}
                                </div>
                                <h3 className="mt-3 font-semibold text-sm md:text-base">
                                    {s.title}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                                    {s.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 7: Social proof */}
                <section id="thanh-cong" className="space-y-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold">
                            Thành Quả Của Học Viên Là Câu Trả Lời Của Chúng Tôi
                        </h2>
                    </div>

                    {/* 7.1 The Work */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Student Showreel</h3>
                        <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-lg">
                            {/* TODO: nhúng video showreel thực tế */}
                            <video
                                className="h-full w-full object-cover"
                                controls
                                poster="/images/showreel-poster.jpg"
                            >
                                <source
                                    src="/videos/khoahocdohoa-student-showreel-2025.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </div>
                        <p className="text-sm text-slate-700">
                            Xem các tác phẩm 3D/VFX và Game Art ấn tượng được thực hiện bởi
                            chính học viên của chúng tôi. Đây là bằng chứng rõ ràng nhất cho
                            chất lượng đào tạo.
                        </p>
                    </div>

                    {/* 7.2 The People */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Câu chuyện Thành công</h3>
                        <Carousel
                            dots
                            autoplay
                            className="[&_.slick-slide]:px-2 [&_.slick-list]:-mx-2"
                        >
                            <div>
                                <div className="rounded-2xl bg-white shadow-sm p-5 text-sm text-slate-800 leading-relaxed">
                                    “Nguyễn Văn B – Từ sinh viên Xây dựng → Junior VFX Artist tại
                                    Bad Clay Studio sau khi hoàn thành Lộ trình VFX chuyên sâu.”
                                </div>
                            </div>
                            <div>
                                <div className="rounded-2xl bg-white shadow-sm p-5 text-sm text-slate-800 leading-relaxed">
                                    “Trần Thị C – Tăng 200% thu nhập freelance sau 6 tháng học Lộ
                                    trình 3D Blender Commercial, tự tin nhận dự án quốc tế.”
                                </div>
                            </div>
                        </Carousel>
                    </div>

                    {/* 7.3 The Trust */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            Được Tin Tưởng Bởi Các Studio Hàng Đầu
                        </h3>
                        <p className="text-sm text-slate-700">
                            Là một trung tâm dạy 3D VFX chuyên nghiệp, chúng tôi tự hào khi
                            học viên của mình đang làm việc và được săn đón bởi các
                            studio/doanh nghiệp hàng đầu Việt Nam.
                        </p>
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="h-10 w-28 rounded-lg bg-white shadow flex items-center justify-center text-xs">
                                Sparx*
                            </div>
                            <div className="h-10 w-28 rounded-lg bg-white shadow flex items-center justify-center text-xs">
                                Bad Clay
                            </div>
                            <div className="h-10 w-28 rounded-lg bg-white shadow flex items-center justify-center text-xs">
                                VNG
                            </div>
                            <div className="h-10 w-28 rounded-lg bg-white shadow flex items-center justify-center text-xs">
                                GlassEgg
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 8: Final CTA */}
                <section
                    id="cta"
                    className="rounded-3xl bg-gradient-to-r from-[#0049d9] to-[#001f6b] text-white p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between"
                >
                    <div className="space-y-2 max-w-xl">
                        <h2 className="text-2xl md:text-3xl font-bold">
                            Bạn Đã Sẵn Sàng Bắt Đầu Sự Nghiệp Của Mình?
                        </h2>
                        <h3 className="text-sm md:text-base text-blue-100">
                            Hành trình của bạn trong ngành công nghiệp sáng tạo bắt đầu từ
                            đây. Hãy để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ tư
                            vấn 1:1 miễn phí về lộ trình phù hợp nhất cho bạn.
                        </h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button
                            type="primary"
                            size="large"
                            className="bg-[#ffb100] border-none text-black font-semibold hover:bg-[#ffc54d]"
                            href="/dang-ky-tu-van"
                        >
                            Đăng ký tư vấn 1:1
                        </Button>
                        <Button
                            ghost
                            size="large"
                            className="border-blue-100 text-blue-50 hover:bg-white/10"
                            href="/lo-trinh-nghe-nghiep"
                        >
                            Xem các lộ trình hiện có
                        </Button>
                    </div>
                </section>

                {/* Section 9: FAQ */}
                <section id="faq" className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold">Câu hỏi thường gặp</h2>
                    <Collapse accordion items={faqItems} />
                </section>
            </main>
        </div>
    );
}
