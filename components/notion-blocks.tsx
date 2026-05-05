import type { RenderBlock } from "@/data/portfolio";

import { NotionRichText } from "@/components/notion-rich-text";

function anchorId(block: RenderBlock) {
  const text = block.richText?.map((item) => item.plain_text).join("").trim() ?? "";

  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || block.id;
}

type NotionBlocksProps = {
  blocks?: RenderBlock[];
};

function renderBlock(block: RenderBlock): React.ReactNode {
  switch (block.type) {
    case "heading_1":
      return (
        <section
          key={block.id}
          id={anchorId(block)}
          className="scroll-mt-28 border-t border-line/80 pt-10 first:border-t-0 first:pt-0"
        >
          <h2 className="font-display text-[2.2rem] leading-tight text-ink lg:text-[2.75rem]">
            <NotionRichText richText={block.richText} />
          </h2>
        </section>
      );
    case "heading_2":
      return (
        <section key={block.id} id={anchorId(block)} className="scroll-mt-20">
          <h3 className="font-display text-[1.65rem] leading-tight text-ink lg:text-[2rem]">
            <NotionRichText richText={block.richText} />
          </h3>
        </section>
      );
    case "heading_3":
      return (
        <section key={block.id} id={anchorId(block)} className="scroll-mt-28">
          <h4 className="text-[1.15rem] font-semibold text-ink">
            <NotionRichText richText={block.richText} />
          </h4>
        </section>
      );
    case "paragraph":
      if (!block.richText?.length && !block.children?.length) {
        return null;
      }
      return (
        <div key={block.id} className="space-y-4">
          {block.richText?.length ? (
            <p className="text-[1.07rem] leading-[1.95] text-ink/74">
              <NotionRichText richText={block.richText} />
            </p>
          ) : null}
          {block.children?.length ? <NotionBlocks blocks={block.children} /> : null}
        </div>
      );
    case "quote":
      return (
        <blockquote
          key={block.id}
          className="rounded-r-[22px] border-l-4 border-accent bg-[#f8f1e4] px-6 py-6 text-[1.12rem] italic leading-[1.9] text-ink/80 shadow-soft"
        >
          <span className="mb-3 block font-display text-4xl leading-none text-accent/65">
            "
          </span>
          <NotionRichText richText={block.richText} />
          {block.children?.length ? (
            <div className="mt-4 space-y-4 border-t border-line/70 pt-4">
              <NotionBlocks blocks={block.children} />
            </div>
          ) : null}
        </blockquote>
      );
    case "callout":
      return (
        <div
          key={block.id}
          className="rounded-[22px] border border-line bg-[#f5efe2] p-5 text-base leading-8 text-ink/74 shadow-soft"
        >
          <div className="flex items-start gap-4">
            <div className="pt-1 text-xl leading-none text-accent">
              {block.calloutIcon ?? "i"}
            </div>
            <div className="min-w-0 flex-1 space-y-4">
              {block.richText?.length ? (
                <div>
                  <NotionRichText richText={block.richText} />
                </div>
              ) : null}
              {block.children?.length ? <NotionBlocks blocks={block.children} /> : null}
            </div>
          </div>
        </div>
      );
    case "divider":
      return <hr key={block.id} className="my-2 border-line" />;
    case "image":
      return block.imageUrl ? (
        <figure key={block.id} className="space-y-4">
          <img
            src={block.imageUrl}
            alt={block.caption?.map((item) => item.plain_text).join("") || "Project image"}
            className="w-full rounded-[24px] border border-line object-cover shadow-soft"
          />
          {block.caption?.length ? (
            <figcaption className="mx-auto max-w-2xl text-center text-sm leading-6 text-ink/56">
              <NotionRichText richText={block.caption} />
            </figcaption>
          ) : null}
        </figure>
      ) : null;
    case "toggle":
      return (
        <details key={block.id} className="rounded-[22px] border border-line bg-white px-5 py-4 shadow-soft">
          <summary className="cursor-pointer list-none font-semibold text-ink">
            <NotionRichText richText={block.richText} />
          </summary>
          {block.children?.length ? (
            <div className="mt-4 space-y-4">
              <NotionBlocks blocks={block.children} />
            </div>
          ) : null}
        </details>
      );
    case "column_list":
      return (
        <div key={block.id} className="grid gap-5 xl:grid-cols-2">
          {block.children?.map((child) => renderBlock(child))}
        </div>
      );
    case "column":
      return (
        <div key={block.id} className="space-y-4 rounded-[20px]">
          <NotionBlocks blocks={block.children} />
        </div>
      );
    default:
      return null;
  }
}

export function NotionBlocks({ blocks = [] }: NotionBlocksProps) {
  const rendered: React.ReactNode[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      const listType = block.type;
      const items: RenderBlock[] = [block];
      let cursor = index + 1;

      while (cursor < blocks.length && blocks[cursor].type === listType) {
        items.push(blocks[cursor]);
        cursor += 1;
      }

      const ListTag = listType === "bulleted_list_item" ? "ul" : "ol";

      rendered.push(
        <ListTag
          key={`${block.id}-list`}
          className={
            listType === "bulleted_list_item"
              ? "list-disc space-y-3 pl-6 text-base leading-8 text-ink/72"
              : "list-decimal space-y-3 pl-6 text-base leading-8 text-ink/72"
          }
        >
          {items.map((item) => (
            <li key={item.id}>
              <NotionRichText richText={item.richText} />
              {item.children?.length ? (
                <div className="mt-3 space-y-3">
                  <NotionBlocks blocks={item.children} />
                </div>
              ) : null}
            </li>
          ))}
        </ListTag>
      );

      index = cursor - 1;
      continue;
    }

    rendered.push(renderBlock(block));
  }

  return <>{rendered}</>;
}
