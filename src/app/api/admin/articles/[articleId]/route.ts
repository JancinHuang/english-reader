import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { requireAdmin } from "../../_utils";
import { bumpDatasetMeta, getAdminSupabase } from "../_db";

import { validateArticleInput } from "@/lib/articleValidation";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> },
) {
  const denied = requireAdmin(request);
  if (denied) {
    return denied;
  }

  const { articleId } = await params;
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from("articles")
    .select("id,title,tags,status,vocab,content,quiz")
    .eq("id", articleId)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(data);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> },
) {
  const denied = requireAdmin(request);
  if (denied) {
    return denied;
  }

  const { articleId } = await params;
  const body = await request.json().catch(() => null);
  const result = validateArticleInput(body);
  if (!result.ok) {
    return NextResponse.json(
      { message: "Invalid article", errors: result.errors },
      { status: 400 },
    );
  }
  const article = body as {
    id: string;
    title: string;
    tags: string[];
    vocab: unknown[];
    content: unknown[];
    quiz: unknown[];
    status?: "draft" | "published";
  };
  if (article.id !== articleId) {
    return NextResponse.json({ message: "id 不可修改" }, { status: 400 });
  }

  const supabase = getAdminSupabase();
  const { error } = await supabase
    .from("articles")
    .update({
      title: article.title,
      tags: article.tags,
      vocab: article.vocab,
      content: article.content,
      quiz: article.quiz,
      status: article.status ?? "draft",
    })
    .eq("id", articleId);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  await bumpDatasetMeta();
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> },
) {
  const denied = requireAdmin(request);
  if (denied) {
    return denied;
  }

  const { articleId } = await params;
  const supabase = getAdminSupabase();
  const { error } = await supabase.from("articles").delete().eq("id", articleId);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  await bumpDatasetMeta();
  return NextResponse.json({ ok: true });
}
