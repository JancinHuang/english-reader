import { headers } from "next/headers";

export async function getRequestBaseUrl() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";

  if (!host) {
    return null;
  }

  return `${proto}://${host}`;
}
