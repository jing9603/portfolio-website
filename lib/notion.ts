import { Client } from "@notionhq/client";

const notionToken = process.env.NOTION_TOKEN;
const notionDataSourceId = process.env.NOTION_PROJECTS_DATA_SOURCE_ID;

export const notion =
  notionToken && notionDataSourceId
    ? new Client({ auth: notionToken })
    : null;

export async function getNotionProjects() {
  if (!notion || !notionDataSourceId) {
    return null;
  }

  // This is the seam for live Notion data once credentials are added.
  // The current site uses curated local content until the final mapping is approved.
  return notion.dataSources.query({
    data_source_id: notionDataSourceId
  });
}
