import DOMPurify from "isomorphic-dompurify";

type Props = {
    html: string;
    className?: string;
};

export default function RichContent({ html, className }: Props) {
    const clean = DOMPurify.sanitize(html ?? "", {
        USE_PROFILES: { html: true },
        ADD_ATTR: [
            "style",
            "class",
            "target",
            "rel",
            "loading",
            "decoding",
            "srcset",
            "sizes",
        ],
    });

    const fixed = clean
        // bỏ width/height attribute
        .replaceAll(/(<img\b[^>]*?)\s(width|height)=["'][^"']*["']/gi, "$1")
        // bỏ style trên img
        .replaceAll(/<img\b([^>]*?)\sstyle=["'][^"']*["']([^>]*?)>/gi, "<img$1$2>")
        // QUAN TRỌNG: bỏ sizes để browser tự chọn ảnh lớn theo viewport (mặc định ~100vw)
        .replaceAll(/(<img\b[^>]*?)\s+sizes=["'][^"']*["']/gi, "$1");

    return (
        <article
            className={[
                "rich-content",
                "prose max-w-none 2xl:prose-xl",
                "prose-img:max-w-full prose-img:h-auto prose-img:rounded-lg",
                "prose-figure:max-w-full",
                "prose-table:block prose-table:overflow-x-auto",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            dangerouslySetInnerHTML={{ __html: fixed }}
        />
    );
}
