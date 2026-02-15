import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { requireAdmin } from "../../_utils";
import { getAdminSupabase } from "../_db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) {
    return denied;
  }

  const supabase = getAdminSupabase();
  const metaRes = await supabase
    .from("dataset_meta")
    .select("version,updated_at")
    .eq("id", 1)
    .maybeSingle();

  const listRes = await supabase
    .from("articles")
    .select("id,title,tags,status,vocab,content,quiz")
    .order("updated_at", { ascending: false });

  if (metaRes.error) {
    return NextResponse.json({ message: metaRes.error.message }, { status: 500 });
  }
  if (listRes.error) {
    return NextResponse.json({ message: listRes.error.message }, { status: 500 });
  }

  const version = typeof metaRes.data?.version === "number" ? metaRes.data.version : 1;
  const updatedAtISO =
    typeof metaRes.data?.updated_at === "string"
      ? metaRes.data.updated_at
      : new Date().toISOString();

  const payload = {
    version,
    updatedAtISO,
    articles: listRes.data ?? [],
  };

  return NextResponse.json(payload, {
    headers: {
      "Content-Disposition":
        'attachment; filename="articles-dataset.json"',
    },
  });
}
