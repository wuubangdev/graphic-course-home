import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  content?: string | null;
};

export default function MarkdownRender({ content }: Props) {
  if (!content) return null;

  return (
    <article className="prose prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: (props) => (
            <h2 className="mt-8 scroll-mt-24 text-2xl font-bold" {...props} />
          ),
          h3: (props) => (
            <h3 className="mt-6 scroll-mt-24 text-xl font-semibold" {...props} />
          ),
          p: (props) => <p className="leading-relaxed" {...props} />,
          blockquote: (props) => (
            <blockquote
              className="border-l-4 border-blue-300 bg-blue-50/60 px-4 py-3 text-slate-700"
              {...props}
            />
          ),
          table: (props) => (
            <div className="my-6 overflow-x-auto">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          th: (props) => (
            <th
              className="border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm"
              {...props}
            />
          ),
          td: (props) => (
            <td className="border border-slate-200 px-3 py-2 align-top text-sm" {...props} />
          ),
          a: (props) => (
            <a
              className="text-blue-600 underline underline-offset-4 hover:text-blue-700"
              {...props}
              target={props.href?.startsWith("#") ? undefined : "_blank"}
              rel={props.href?.startsWith("#") ? undefined : "noreferrer noopener"}
            />
          ),
          hr: () => <hr className="my-2 border-slate-200" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
