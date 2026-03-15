import "server-only";

const NOTION_API_BASE = "https://api.notion.com";
const NOTION_VERSION = "2026-03-11";

export async function notionFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = process.env.NOTION_TOKEN;

  if (!token) {
    throw new Error("Missing NOTION_TOKEN");
  }

  const response = await fetch(`${NOTION_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    next: {
      revalidate: 3600
    }
  });

  if (!response.ok) {
    throw new Error(`Notion request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
