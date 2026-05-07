import { readFileSync } from "node:fs";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const NOTION_API_BASE = "https://api.notion.com";
const NOTION_VERSION = "2026-03-11";
const ROOT = process.cwd();
const DATA_PATH = path.join(ROOT, "data", "published-portfolio.json");
const ASSET_ROOT = path.join(ROOT, "public", "project-assets");
const protectedEnvKeys = new Set(Object.keys(process.env));

loadEnvFile(path.join(ROOT, ".env"));
loadEnvFile(path.join(ROOT, ".env.local"));

const FEATURED_PROPERTY = process.env.NOTION_FEATURED_PROPERTY_NAME ?? "Featured";
const LAST_PUBLISHED_PROPERTY =
  process.env.NOTION_LAST_PUBLISHED_PROPERTY_NAME ?? "Last published";

const REQUIRED_ENV = ["NOTION_TOKEN", "NOTION_PROJECTS_DATA_SOURCE_ID"];
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

const notionToken = process.env.NOTION_TOKEN;
const notionDataSourceId = process.env.NOTION_PROJECTS_DATA_SOURCE_ID;

function loadEnvFile(filePath) {
  try {
    const contents = readTextFileSync(filePath);
    for (const rawLine of contents.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) {
        continue;
      }

      const equalsIndex = line.indexOf("=");
      if (equalsIndex <= 0) {
        continue;
      }

      const key = line.slice(0, equalsIndex).trim();
      let value = line.slice(equalsIndex + 1).trim();

      if (
        (value.startsWith("\"") && value.endsWith("\"")) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!protectedEnvKeys.has(key)) {
        process.env[key] = value;
      }
    }
  } catch {
    // Optional env file.
  }
}

function readTextFileSync(filePath) {
  return readFileSync(filePath, "utf8");
}

async function notionFetch(pathname, init = {}) {
  const response = await fetch(`${NOTION_API_BASE}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${notionToken}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...(init.headers ?? {})
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Notion request failed (${response.status}): ${body}`);
  }

  return response.json();
}

function getPlainText(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  return items.map((item) => item?.plain_text ?? "").join("").trim();
}

function getPropertyText(property) {
  if (!property) {
    return "";
  }

  if (property.type === "title") {
    return getPlainText(property.title);
  }

  if (property.type === "rich_text") {
    return getPlainText(property.rich_text);
  }

  return "";
}

function getPropertyMultiSelect(property) {
  if (!property || property.type !== "multi_select") {
    return [];
  }

  return property.multi_select.map((item) => item.name);
}

function getPropertyNumberLikeText(property) {
  if (!property) {
    return "";
  }

  if (property.type === "number") {
    return property.number != null ? String(property.number) : "";
  }

  if (property.type === "rich_text") {
    return getPlainText(property.rich_text);
  }

  return "";
}

function mapCategory(categoryName) {
  switch (categoryName) {
    case "UX":
      return "ux";
    case "PM":
      return "pm";
    case "Leadership & Activity":
      return "leadership";
    case "AI & Data":
      return "ai-data";
    default:
      return "pm";
  }
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

function initialSections(project) {
  return [
    {
      id: "overview",
      title: "Overview",
      level: 1,
      content: [project.description]
    },
    {
      id: "impact",
      title: "Impact",
      level: 1,
      content: [project.impact]
    }
  ];
}

function mapRichText(items) {
  if (!items?.length) {
    return [];
  }

  return items.map((item) => ({
    plain_text: item.plain_text ?? "",
    href: item.href ?? null,
    annotations: item.annotations
  }));
}

function extractSectionsFromRenderBlocks(blocks, fallbackDescription, fallbackImpact) {
  const sections = [];
  let currentSection = null;

  for (const block of blocks) {
    if (block.type === "heading_1" || block.type === "heading_2" || block.type === "heading_3") {
      const title = getPlainText(block.richText);
      if (!title || block.type === "heading_3") {
        continue;
      }

      currentSection = {
        id: slugify(title),
        title,
        level: block.type === "heading_1" ? 1 : 2,
        content: []
      };
      sections.push(currentSection);
    } else if (
      block.type === "paragraph" ||
      block.type === "quote" ||
      block.type === "callout" ||
      block.type === "toggle"
    ) {
      const text = getPlainText(block.richText);
      if (!text) {
        if (block.children?.length) {
          const childSections = extractSectionsFromRenderBlocks(
            block.children,
            fallbackDescription,
            fallbackImpact
          );
          if (!currentSection && childSections.length > 0) {
            currentSection = childSections[0];
          }
        }
        continue;
      }

      if (!currentSection) {
        currentSection = {
          id: "overview",
          title: "Overview",
          level: 1,
          content: []
        };
        sections.push(currentSection);
      }

      currentSection.content.push(text);
    } else if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      const text = getPlainText(block.richText);
      if (!text) {
        continue;
      }

      if (!currentSection) {
        currentSection = {
          id: "overview",
          title: "Overview",
          level: 1,
          content: []
        };
        sections.push(currentSection);
      }

      currentSection.content.push(`- ${text}`);
    }

    if (block.children?.length) {
      const childSections = extractSectionsFromRenderBlocks(
        block.children,
        fallbackDescription,
        fallbackImpact
      );

      for (const childSection of childSections) {
        if (!sections.find((section) => section.id === childSection.id)) {
          sections.push(childSection);
        }
      }
    }
  }

  const normalized = sections.filter((section) => section.content.length > 0);
  return normalized.length > 0
    ? normalized
    : initialSections({
        title: "",
        description: fallbackDescription,
        impact: fallbackImpact
      });
}

function projectEnrichment(slug) {
  const map = {
    "evoya-experience-evolving-journey": {
      organization: "Revvity",
      impact:
        "Helped shape a complex healthcare platform into a more coherent product direction with stronger evidence, usability, and delivery alignment.",
      heroLabel: "Healthcare SaaS | Product strategy | Workflow modernization"
    },
    "tissot-t-touch-connect-localisation-fitness-wearable-design": {
      organization: "Huawei",
      impact:
        "Balanced global product intent with local user expectations to support launch readiness in a constrained product environment.",
      heroLabel: "Wearables | Localization | Product experience"
    },
    "smart-symptom-check-strategic-ux-regulated-healthcare": {
      organization: "JST Healthcare Solutions",
      impact:
        "Helped align product decisions and workflow redesign around clinical value, usability, and regulatory realities.",
      heroLabel: "Digital health | Regulated UX | Clinical workflows"
    },
    "dearpaw-from-concept-to-trusted-pet-care-ai": {
      organization: "DearPaw",
      impact:
        "Combined product positioning, evidence-based iteration, and practical AI application into an end-to-end startup build.",
      heroLabel: "AI-enabled startup | MVP | Product strategy"
    },
    "esc-empowering-user-through-adaptive-keyword": {
      organization: "Academic Research Project",
      impact:
        "Connected front-end implementation, adaptive keyword support, and user research into a focused search experience improvement.",
      heroLabel: "Search systems | Research | Front-end implementation"
    }
  };

  return map[slug];
}

async function queryFeaturedProjects() {
  const pages = [];
  let nextCursor = null;

  do {
    const response = await notionFetch(`/v1/data_sources/${notionDataSourceId}/query`, {
      method: "POST",
      body: JSON.stringify({
        filter: {
          property: FEATURED_PROPERTY,
          checkbox: {
            equals: true
          }
        },
        page_size: 100,
        start_cursor: nextCursor ?? undefined
      })
    });

    pages.push(...response.results);
    nextCursor = response.has_more ? response.next_cursor : null;
  } while (nextCursor);

  return pages;
}

async function fetchBlockChildren(blockId) {
  const children = [];
  let nextCursor = null;

  do {
    const query = new URLSearchParams({
      page_size: "100"
    });

    if (nextCursor) {
      query.set("start_cursor", nextCursor);
    }

    const response = await notionFetch(`/v1/blocks/${blockId}/children?${query.toString()}`);
    children.push(...response.results);
    nextCursor = response.has_more ? response.next_cursor : null;
  } while (nextCursor);

  return children;
}

function guessExtension(url, contentType) {
  const fromType = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/svg+xml": ".svg",
    "image/avif": ".avif"
  };

  if (contentType && fromType[contentType.split(";")[0].trim()]) {
    return fromType[contentType.split(";")[0].trim()];
  }

  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname);
    if (ext) {
      return ext.toLowerCase();
    }
  } catch {
    // Ignore malformed URLs.
  }

  return ".bin";
}

async function downloadAsset(url, destinationBasePath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Asset download failed (${response.status}) for ${url}`);
  }

  const contentType = response.headers.get("content-type") ?? undefined;
  const extension = guessExtension(url, contentType);
  const destinationPath = `${destinationBasePath}${extension}`;

  await mkdir(path.dirname(destinationPath), { recursive: true });
  const arrayBuffer = await response.arrayBuffer();
  await writeFile(destinationPath, Buffer.from(arrayBuffer));

  return destinationPath;
}

function getPageCoverUrl(page) {
  if (!page.cover) {
    return undefined;
  }

  if (page.cover.type === "file") {
    return page.cover.file?.url;
  }

  if (page.cover.type === "external") {
    return page.cover.external?.url;
  }

  return undefined;
}

function getImageUrl(imageBlock) {
  if (imageBlock?.type === "external") {
    return imageBlock.external?.url;
  }

  if (imageBlock?.type === "file") {
    return imageBlock.file?.url;
  }

  return undefined;
}

async function mapBlock(block, context) {
  if (block.type === "divider") {
    return { id: block.id, type: "divider" };
  }

  if (block.type === "image") {
    const imageBlock = block.image;
    const imageUrl = getImageUrl(imageBlock);
    let publishedImageUrl;

    if (imageUrl) {
      context.imageCounter += 1;
      const destination = path.join(
        context.assetDirectory,
        `block-${String(context.imageCounter).padStart(2, "0")}`
      );
      const downloaded = await downloadAsset(imageUrl, destination);
      publishedImageUrl = toPublicPath(downloaded);
    }

    return {
      id: block.id,
      type: "image",
      imageUrl: publishedImageUrl,
      caption: mapRichText(imageBlock?.caption)
    };
  }

  if (block.type === "column_list") {
    const columns = await fetchBlockChildren(block.id);
    const mappedColumns = await Promise.all(columns.map((column) => mapBlock(column, context)));

    return {
      id: block.id,
      type: "column_list",
      children: mappedColumns.filter(Boolean)
    };
  }

  if (block.type === "column") {
    const children = await fetchBlockChildren(block.id);
    const mappedChildren = await Promise.all(children.map((child) => mapBlock(child, context)));

    return {
      id: block.id,
      type: "column",
      children: mappedChildren.filter(Boolean)
    };
  }

  const richTextBlockTypes = new Set([
    "paragraph",
    "heading_1",
    "heading_2",
    "heading_3",
    "bulleted_list_item",
    "numbered_list_item",
    "quote",
    "callout",
    "toggle"
  ]);

  if (richTextBlockTypes.has(block.type)) {
    const value = block[block.type];
    let children;

    if (block.has_children) {
      const childBlocks = await fetchBlockChildren(block.id);
      const mappedChildren = await Promise.all(
        childBlocks.map((child) => mapBlock(child, context))
      );
      children = mappedChildren.filter(Boolean);
    }

    return {
      id: block.id,
      type: block.type,
      richText: mapRichText(value?.rich_text),
      calloutIcon:
        block.type === "callout"
          ? value?.icon?.emoji ??
            (value?.icon?.type === "external"
              ? "↗"
              : value?.icon?.type === "file"
                ? "•"
                : undefined)
          : undefined,
      children
    };
  }

  return null;
}

function toPublicPath(filePath) {
  const publicRoot = path.join(ROOT, "public");
  const relative = path.relative(publicRoot, filePath).split(path.sep).join("/");
  return `/${relative}`;
}

async function cleanupStaleAssetDirectories(activeSlugs) {
  await mkdir(ASSET_ROOT, { recursive: true });
  const entries = await readdir(ASSET_ROOT, { withFileTypes: true });
  const removed = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    if (activeSlugs.has(entry.name)) {
      continue;
    }

    await rm(path.join(ASSET_ROOT, entry.name), { recursive: true, force: true });
    removed.push(entry.name);
  }

  return removed.sort();
}

async function updateLastPublished(page, publishedAt) {
  const property = page.properties?.[LAST_PUBLISHED_PROPERTY];
  if (!property) {
    throw new Error(
      `Missing Notion property "${LAST_PUBLISHED_PROPERTY}" on page "${page.id}".`
    );
  }

  let propertyValue;

  if (property.type === "date") {
    propertyValue = {
      date: {
        start: publishedAt
      }
    };
  } else if (property.type === "rich_text") {
    propertyValue = {
      rich_text: [
        {
          type: "text",
          text: {
            content: publishedAt
          }
        }
      ]
    };
  } else {
    throw new Error(
      `Unsupported "${LAST_PUBLISHED_PROPERTY}" property type "${property.type}". Use a Date or Rich text field.`
    );
  }

  await notionFetch(`/v1/pages/${page.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      properties: {
        [LAST_PUBLISHED_PROPERTY]: propertyValue
      }
    })
  });
}

async function publishProject(page, publishedAt) {
  const properties = page.properties ?? {};
  const title = getPropertyText(properties.Name);
  const slug = getPropertyText(properties.Slug) || slugify(title);
  const enrichment = projectEnrichment(slug);
  const categoryName = properties.Category?.select?.name ?? "PM";
  const description = getPropertyText(properties.Description);
  const impact = enrichment?.impact ?? description;
  const assetDirectory = path.join(ASSET_ROOT, slug);

  await rm(assetDirectory, { recursive: true, force: true });
  await mkdir(assetDirectory, { recursive: true });

  let coverImage;
  const sourceCoverUrl = getPageCoverUrl(page);
  if (sourceCoverUrl) {
    const downloaded = await downloadAsset(sourceCoverUrl, path.join(assetDirectory, "cover"));
    coverImage = toPublicPath(downloaded);
  }

  const rootBlocks = await fetchBlockChildren(page.id);
  const context = {
    assetDirectory,
    imageCounter: 0
  };
  const blocks = (await Promise.all(rootBlocks.map((block) => mapBlock(block, context)))).filter(
    Boolean
  );

  return {
    id: page.id,
    notionUrl: page.url,
    publicUrl: page.public_url ?? undefined,
    slug,
    title,
    coverImage,
    category: mapCategory(categoryName),
    type: properties.Type?.select?.name ?? "Project",
    organization: enrichment?.organization ?? titleFromSlug(slug),
    role: getPropertyText(properties.Role) || undefined,
    domain: getPropertyText(properties.Domain) || undefined,
    timespan: getPropertyText(properties["Timespan"]),
    teamSize: getPropertyNumberLikeText(properties["Team size"]),
    description,
    impact,
    skills: getPropertyMultiSelect(properties.Skill),
    tools: getPropertyMultiSelect(properties.Tool),
    featured: properties[FEATURED_PROPERTY]?.checkbox ?? false,
    heroLabel:
      enrichment?.heroLabel ??
      `${categoryName} | ${properties.Type?.select?.name ?? "Project"}`,
    sections: extractSectionsFromRenderBlocks(blocks, description, impact),
    blocks,
    lastPublished: publishedAt
  };
}

async function main() {
  const publishedAt = new Date().toISOString();
  const pages = await queryFeaturedProjects();
  const publishedProjects = [];
  const lastPublishedFailures = [];
  const lastPublishedSuccesses = [];

  for (const page of pages) {
    const project = await publishProject(page, publishedAt);
    publishedProjects.push(project);

    try {
      await updateLastPublished(page, publishedAt);
      lastPublishedSuccesses.push(project.slug);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      lastPublishedFailures.push({
        slug: project.slug,
        message
      });
    }
  }

  const staleAssetDirectoriesRemoved = await cleanupStaleAssetDirectories(
    new Set(publishedProjects.map((project) => project.slug))
  );

  await mkdir(path.dirname(DATA_PATH), { recursive: true });
  await writeFile(DATA_PATH, `${JSON.stringify(publishedProjects, null, 2)}\n`, "utf8");

  console.log(
    `Saved ${publishedProjects.length} featured project(s) to ${path.relative(ROOT, DATA_PATH)}`
  );
  console.log("");
  console.log(`Sync completed at ${publishedAt}`);
  console.log(
    `Published projects (${publishedProjects.length}): ${publishedProjects.map((project) => project.slug).join(", ")}`
  );
  console.log(
    `Stale asset cleanup (${staleAssetDirectoriesRemoved.length}): ${
      staleAssetDirectoriesRemoved.length > 0
        ? staleAssetDirectoriesRemoved.join(", ")
        : "none"
    }`
  );

  if (lastPublishedSuccesses.length > 0) {
    console.log(
      `${LAST_PUBLISHED_PROPERTY} updated (${lastPublishedSuccesses.length}): ${lastPublishedSuccesses.join(", ")}`
    );
  }

  if (lastPublishedFailures.length > 0) {
    console.warn(`${LAST_PUBLISHED_PROPERTY} failed (${lastPublishedFailures.length}):`);
    for (const failure of lastPublishedFailures) {
      console.warn(`- ${failure.slug}: ${failure.message}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
