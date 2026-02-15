import { NextResponse } from "next/server";

import { listArticles } from "@/lib/articles";

export const runtime = "nodejs";

export async function GET() {
  const items = await listArticles();
  return NextResponse.json(items);
}
