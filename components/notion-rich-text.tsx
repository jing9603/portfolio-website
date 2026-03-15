import type { RichTextSpan } from "@/data/portfolio";

type NotionRichTextProps = {
  richText?: RichTextSpan[];
};

export function NotionRichText({ richText = [] }: NotionRichTextProps) {
  return (
    <>
      {richText.map((span, index) => {
        let node: React.ReactNode = span.plain_text;

        if (span.annotations?.code) {
          node = (
            <code className="rounded bg-[#efe7d8] px-1.5 py-0.5 text-[0.92em] text-ink">
              {node}
            </code>
          );
        }

        if (span.annotations?.bold) {
          node = <strong>{node}</strong>;
        }

        if (span.annotations?.italic) {
          node = <em>{node}</em>;
        }

        if (span.annotations?.underline) {
          node = <u>{node}</u>;
        }

        if (span.annotations?.strikethrough) {
          node = <s>{node}</s>;
        }

        if (span.href) {
          node = (
            <a
              href={span.href}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-accent/45 underline-offset-4 transition hover:text-accent"
            >
              {node}
            </a>
          );
        }

        return <span key={`${span.plain_text}-${index}`}>{node}</span>;
      })}
    </>
  );
}
