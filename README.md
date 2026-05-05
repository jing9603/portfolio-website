# Jessie Li Portfolio

Personal portfolio website for Jessie Li, built with Next.js, TypeScript, Tailwind CSS, Font Awesome, and a Notion-backed content seam.

## Run locally

This project uses a repo-local Node.js install in `.tools/`, so it does not depend on a global Node setup.

Start the dev server:

```bash
PATH="$PWD/.tools/bin:$PATH" ./.tools/bin/npm run dev
```

Create a production build:

```bash
PATH="$PWD/.tools/bin:$PATH" ./.tools/bin/npm run build
```

## Notion

The site is prepared for a Notion-backed portfolio.

Expected environment variables:

```bash
NOTION_TOKEN=secret_xxx
NOTION_PROJECTS_DATA_SOURCE_ID=281e460f-cee8-8020-a022-000bd3430ddb
REVALIDATE_SECRET=change-me
```

Use `.env.local` for local secrets. It is already ignored by Git.

Useful notes:

- The portfolio now reads live content from Notion.
- `Category` and `Slug` are treated as the source of truth for portfolio routing.
- Project detail pages also read live Notion page content and turn headings into the on-page table of contents.
- If a project appears under the wrong tab, update its `Category` value in Notion.
- If you change `.env.local`, restart the dev server.
- If you want to manually refresh cached Notion content, use the revalidation endpoint below.

Manual refresh:

```bash
curl "http://localhost:3000/api/revalidate?secret=YOUR_REVALIDATE_SECRET"
```

On Vercel, use your deployed domain instead of `localhost:3000`.

What it does:

- revalidates `/`
- revalidates `/portfolio`
- revalidates all category pages
- revalidates all current project pages

## Current Structure

- `app/` Next.js App Router pages
- `components/` reusable UI components
- `data/` curated content and portfolio mock data
- `lib/` config, utilities, and Notion integration seam
- `public/images/` local image assets

## Notes

- The project is currently using curated local portfolio content in `data/portfolio.ts`.
- Live Notion mapping can be completed once the final database fields are confirmed.
- Recommended Notion fields for the final version: `Category`, `Slug`, `Impact`, `Published`, and `Cover`.

## Dev Server Behavior

- Start the dev server once and leave it running while you edit.
- Normal code edits hot-reload automatically.
- Restart only when changing `.env.local`, dependencies, or major config.
- Stop the dev server with `Ctrl + C`.

## GitHub and Vercel

Typical flow:

1. create a new GitHub repository
2. commit and push this project to GitHub
3. import the GitHub repo into Vercel
4. add the same environment variables in Vercel
5. deploy
