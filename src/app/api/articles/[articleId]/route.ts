import { NextResponse } from "next/server";

import { getArticleById } from "@/lib/articles";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ articleId: string }> },
) {
  const { articleId } = await params;
  const article = await getArticleById(articleId);
  if (!article) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(article);
}
