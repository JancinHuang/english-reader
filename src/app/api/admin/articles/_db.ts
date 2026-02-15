import { createSupabaseServiceClient } from "@/lib/supabase";

export function getAdminSupabase() {
  return createSupabaseServiceClient();
}

export async function bumpDatasetMeta() {
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from("dataset_meta")
    .select("id,version")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    return;
  }

  const current = typeof data?.version === "number" ? data.version : 1;
  await supabase
    .from("dataset_meta")
    .upsert({ id: 1, version: current + 1, updated_at: new Date().toISOString() });
}
