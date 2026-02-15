import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { requireAdmin } from "../../_utils";
import { bumpDatasetMeta, getAdminSupabase } from "../_db";

import { validateArticleInput } from "@/lib/articleValidation";

export const runtime = "nodejs";

type ImportPayload = {
  version?: number;
  updatedAtISO?: string;
  articles?: unknown;
};

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) {
    return denied;
  }

  const body = (await request.json().catch(() => null)) as ImportPayload | null;
  const rawArticles = body?.articles;
  if (!Array.isArray(rawArticles)) {
    return NextResponse.json(
      { message: "Invalid dataset: articles 必须是数组" },
      { status: 400 },
    );
  }

  const errorsByIndex: Array<{ index: number; errors: string[] }> = [];
  const toUpsert: Array<{
    id: string;
    title: string;
    tags: string[];
    vocab: unknown[];
    content: unknown[];
    quiz: unknown[];
    status: "draft" | "published";
  }> = [];

  rawArticles.forEach((a, index) => {
    const r = validateArticleInput(a);
    if (!r.ok) {
      errorsByIndex.push({ index, errors: r.errors });
      return;
    }
    const article = a as {
      id: string;
      title: string;
      tags: string[];
      vocab: unknown[];
      content: unknown[];
      quiz: unknown[];
      status?: "draft" | "published";
    };
    toUpsert.push({
      id: article.id,
      title: article.title,
      tags: article.tags,
      vocab: article.vocab,
      content: article.content,
      quiz: article.quiz,
      status: article.status ?? "draft",
    });
  });

  if (errorsByIndex.length > 0) {
    return NextResponse.json(
      { message: "Invalid articles", errors: errorsByIndex },
      { status: 400 },
    );
  }

  const supabase = getAdminSupabase();
  const { error } = await supabase
    .from("articles")
    .upsert(toUpsert, { onConflict: "id" });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  await bumpDatasetMeta();
  return NextResponse.json({ ok: true, upserted: toUpsert.length });
}
