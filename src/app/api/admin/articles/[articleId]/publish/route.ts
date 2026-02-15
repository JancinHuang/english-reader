import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { requireAdmin } from "../../../_utils";
import { bumpDatasetMeta, getAdminSupabase } from "../../_db";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> },
) {
  const denied = requireAdmin(request);
  if (denied) {
    return denied;
  }

  const body = (await request.json().catch(() => null)) as
    | { status?: "draft" | "published" }
    | null;

  const status = body?.status;
  if (status !== "draft" && status !== "published") {
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });
  }

  const { articleId } = await params;
  const supabase = getAdminSupabase();
  const { error } = await supabase
    .from("articles")
    .update({ status })
    .eq("id", articleId);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  await bumpDatasetMeta();
  return NextResponse.json({ ok: true });
}
