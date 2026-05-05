import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { getAllProjects } from "@/data/portfolio";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

async function revalidatePortfolioPaths() {
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/about");
  revalidatePath("/contact");

  const categories = ["ux", "pm", "leadership", "ai-data"];
  for (const category of categories) {
    revalidatePath(`/portfolio/${category}`);
  }

  const projects = await getAllProjects();
  for (const project of projects) {
    revalidatePath(`/portfolio/${project.category}/${project.slug}`);
  }

  return {
    categories: categories.length,
    projects: projects.length
  };
}

export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return unauthorized();
  }

  const result = await revalidatePortfolioPaths();

  return NextResponse.json({
    ok: true,
    message: "Revalidated portfolio content",
    ...result
  });
}

export async function POST(request: Request) {
  let secret: string | undefined;

  try {
    const body = (await request.json()) as { secret?: string };
    secret = body.secret;
  } catch {
    secret = undefined;
  }

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return unauthorized();
  }

  const result = await revalidatePortfolioPaths();

  return NextResponse.json({
    ok: true,
    message: "Revalidated portfolio content",
    ...result
  });
}
