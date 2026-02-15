import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { isAdminRequestEdge } from "@/lib/adminAuthEdge";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/");

  if (!isAdminPath) {
    return NextResponse.next();
  }

  const isLogin = pathname === "/admin/login";
  if (isLogin) {
    return NextResponse.next();
  }

  if (!(await isAdminRequestEdge(request))) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
