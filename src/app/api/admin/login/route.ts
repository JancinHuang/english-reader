import { NextResponse } from "next/server";

import { createAdminSessionCookie, verifyAdminPassword } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { password?: string }
    | null;

  const password = body?.password;
  if (!password) {
    return NextResponse.json({ message: "Missing password" }, { status: 400 });
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  await createAdminSessionCookie();
  return NextResponse.json({ ok: true });
}
