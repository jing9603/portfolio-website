# Jessie Li Portfolio

Personal portfolio website for Jessie Li, built with Next.js, TypeScript, Tailwind CSS, and a published-content layer for Notion projects.

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

## Content model

The website no longer reads project content directly from Notion at runtime.

Instead:

- Notion is the editing workspace.
- `npm run sync:notion` is the publishing step.
- `data/published-portfolio.json` is the website-ready project dataset.
- `public/project-assets/` stores downloaded project images for stable deploys.

This avoids broken deployed images caused by expiring Notion file URLs.

## Notion setup

Expected environment variables:

```bash
NOTION_TOKEN=secret_xxx
NOTION_PROJECTS_DATA_SOURCE_ID=281e460f-cee8-8020-a022-000bd3430ddb
NOTION_FEATURED_PROPERTY_NAME=Featured
NOTION_LAST_PUBLISHED_PROPERTY_NAME=Last published
REVALIDATE_SECRET=change-me
```

Use `.env.local` for local secrets. It is already ignored by Git.

Required Notion fields:

- `Name`
- `Slug`
- `Category`
- `Description`
- `Type`
- `Role`
- `Domain`
- `Timespan`
- `Team size`
- `Skill`
- `Tool`
- `Featured`
- `Last published`

Notes:

- `Featured` should be a checkbox property.
- `Last published` should be either a `Date` property or a `Rich text` property.
- Only projects with `Featured = true` are published into the website dataset.

## Publish from Notion

When you want Notion edits to appear on the website:

1. Update the project page and metadata in Notion.
2. Make sure `Featured` is checked for every project that should be pulled into the site.
3. Run the sync script:

```bash
PATH="$PWD/.tools/bin:$PATH" ./.tools/bin/npm run sync:notion
```

What the script does:

- queries Notion for projects where `Featured = true`
- fetches each project page and its child blocks
- downloads cover images and inline Notion images into `public/project-assets/<slug>/`
- removes stale asset folders for projects that are no longer published
- writes the final website dataset to `data/published-portfolio.json`
- updates the Notion `Last published` field for each published project

After the sync:

1. review the content changes locally
2. commit the updated JSON and downloaded assets
3. push to GitHub
4. let Vercel deploy the new commit

## Deploy on Vercel

Vercel deploys what is in the repo, not what is currently in Notion.

That means:

- editing Notion alone does not change the live site
- running the sync script locally updates the repo
- pushing the repo triggers the deploy

Typical flow:

1. draft or revise in Notion
2. run `npm run sync:notion`
3. preview locally
4. commit and push
5. Vercel deploys the published content

## Manual refresh

If you want to manually refresh cached routes after a deploy, use the revalidation endpoint:

```bash
curl "http://localhost:3000/api/revalidate?secret=YOUR_REVALIDATE_SECRET"
```

On Vercel, use your deployed domain instead of `localhost:3000`.

What it revalidates:

- `/`
- `/portfolio`
- `/about`
- `/contact`
- all category pages
- all current project pages

## Current structure

- `app/` Next.js App Router pages
- `components/` reusable UI components
- `data/` local published content and site copy
- `scripts/sync-notion-portfolio.mjs` Notion publishing script
- `public/project-assets/` downloaded project images
- `lib/` config and utilities

## Dev server behavior

- Start the dev server once and leave it running while you edit.
- Normal code edits hot-reload automatically.
- Restart only when changing `.env.local`, dependencies, or major config.
- Stop the dev server with `Ctrl + C`.
