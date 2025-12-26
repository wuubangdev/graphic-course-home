"use client";

import React, { useMemo, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import parse, {
    domToReact,
    Element,
    type DOMNode,
    type HTMLReactParserOptions,
} from "html-react-parser";

type Props = {
    html: string;
    className?: string;
};

export default function RichContent({ html, className }: Props) {
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    const reactTree = useMemo(() => {
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
                "id",
            ],
        });

        const fixed = clean
            .replaceAll(/(<img\b[^>]*?)\s(width|height)=["'][^"']*["']/gi, "$1")
            .replaceAll(
                /<img\b([^>]*?)\sstyle=["'][^"']*["']([^>]*?)>/gi,
                "<img$1$2>"
            )
            .replaceAll(/(<img\b[^>]*?)\s+sizes=["'][^"']*["']/gi, "$1");

        const options: HTMLReactParserOptions = {
            replace: (node) => {
                if (node instanceof Element) {
                    if (node.name === "span" && node.attribs?.id === "cta") {
                        // FIX TYPE: ChildNode[] -> DOMNode[]
                        const children = node.children as unknown as DOMNode[];
                        const inner = domToReact(children, options);

                        return (
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-lg bg-blue-500 2xl:px-4 2xl:py-2 
                                px-2 py-1 text-white hover:opacity-90 cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setModalContent(inner);
                                    setOpen(true);
                                }}
                            >
                                {inner}
                            </button>
                        );
                    }
                }
                return undefined;
            },
        };

        return parse(fixed, options);
    }, [html]);

    return (
        <>
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
            >
                {reactTree}
            </article>

            {open && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
                >
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative w-[min(92vw,560px)] rounded-xl bg-white p-5 shadow-xl">
                        <div className="flex items-start justify-between gap-4">
                            <div className="text-lg font-semibold">Mày đăng nhập chưa mà đòi tải</div>
                            <button
                                type="button"
                                className="rounded-md px-2 py-1 text-sm hover:bg-black/5 cursor-pointer"
                                onClick={() => setOpen(false)}
                                aria-label="Đóng"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="mt-3 text-sm leading-6">{modalContent}</div>
                    </div>
                </div>
            )}
        </>
    );
}
