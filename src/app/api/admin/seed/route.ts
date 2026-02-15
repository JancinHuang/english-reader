import { NextResponse } from "next/server";

import { createSupabaseServiceClient } from "@/lib/supabase";

import { articles } from "../../../../../data/articles";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ message: "Disabled" }, { status: 403 });
  }

  const expected = process.env.SEED_TOKEN;
  const provided = request.headers.get("x-seed-token");
  if (!expected || !provided || expected !== provided) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseServiceClient();

  const payload = (articles as unknown[]).map((a) => {
    const r = a as Record<string, unknown>;
    return {
      id: String(r.id ?? ""),
      title: String(r.title ?? ""),
      tags: Array.isArray(r.tags) ? (r.tags as string[]) : [],
      vocab: Array.isArray(r.vocab) ? (r.vocab as unknown[]) : [],
      content: Array.isArray(r.content) ? (r.content as unknown[]) : [],
      quiz: Array.isArray(r.quiz) ? (r.quiz as unknown[]) : [],
      status: "published" as const,
    };
  });

  const { error } = await supabase
    .from("articles")
    .upsert(payload, { onConflict: "id" });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ inserted: payload.length });
}
