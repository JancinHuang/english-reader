import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { requireAdmin } from "../_utils";
import { bumpDatasetMeta, getAdminSupabase } from "./_db";

import { validateArticleInput } from "@/lib/articleValidation";

export const runtime = "nodejs";

function safeArrayLength(value: unknown) {
  return Array.isArray(value) ? value.length : 0;
}

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) {
    return denied;
  }

  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from("articles")
    .select("id,title,tags,status,updated_at,content,quiz")
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const items = (data ?? []).map((row) => {
    const r = row as Record<string, unknown>;
    return {
      id: String(r.id ?? ""),
      title: String(r.title ?? ""),
      tags: Array.isArray(r.tags) ? (r.tags as string[]) : [],
      status: r.status === "published" ? "published" : "draft",
      updatedAt: String(r.updated_at ?? ""),
      paragraphCount: safeArrayLength(r.content),
      quizCount: safeArrayLength(r.quiz),
    };
  });

  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) {
    return denied;
  }

  const body = await request.json().catch(() => null);
  const result = validateArticleInput(body);
  if (!result.ok) {
    return NextResponse.json(
      { message: "Invalid article", errors: result.errors },
      { status: 400 },
    );
  }

  const supabase = getAdminSupabase();
  const article = body as {
    id: string;
    title: string;
    tags: string[];
    vocab: unknown[];
    content: unknown[];
    quiz: unknown[];
    status?: "draft" | "published";
  };
  const { error } = await supabase.from("articles").insert({
    id: article.id,
    title: article.title,
    tags: article.tags,
    vocab: article.vocab,
    content: article.content,
    quiz: article.quiz,
    status: article.status ?? "draft",
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  await bumpDatasetMeta();
  return NextResponse.json({ ok: true }, { status: 201 });
}
