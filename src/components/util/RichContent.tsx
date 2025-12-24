import DOMPurify from "isomorphic-dompurify";

type Props = {
    html: string;
    className?: string;
};

export default function RichContent({ html, className }: Props) {
    const clean = DOMPurify.sanitize(html ?? "", {
        USE_PROFILES: { html: true },
        ADD_ATTR: ["style", "class", "target", "rel", "loading", "decoding"],
    });

    return (
        <article className={["rich-content", className].filter(Boolean).join(" ")}>
            <div dangerouslySetInnerHTML={{ __html: clean }} />
        </article>
    );
}
