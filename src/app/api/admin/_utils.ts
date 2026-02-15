import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { isAdminRequest } from "@/lib/adminAuth";

export function requireAdmin(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return null;
}
