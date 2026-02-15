"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { BookText, LogOut } from "lucide-react";

function NavItem({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={
        "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors " +
        (active
          ? "bg-[#162443] text-[#EAF0FF]"
          : "text-[#A9B6D3] hover:bg-[#111B2E] hover:text-[#EAF0FF]")
      }
    >
      <span className="text-[#5B8CFF]">{icon}</span>
      {label}
    </Link>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  if (pathname === "/admin/login") {
    return (
      <div className="min-h-dvh bg-[#0B1220] text-[#EAF0FF]">
        <div className="mx-auto flex min-h-dvh w-full max-w-[520px] items-center px-4 py-10">
          <div className="w-full rounded-2xl border border-white/10 bg-[#111B2E] p-6">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#0B1220] text-[#EAF0FF]">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-[#111B2E] p-4">
          <div className="mb-4">
            <div className="text-xs font-medium tracking-wide text-[#A9B6D3]">
              Article Admin
            </div>
            <div className="mt-1 text-lg font-semibold">文章管理后台</div>
          </div>
          <div className="grid gap-1">
            <NavItem
              href="/admin/articles"
              label="文章管理"
              icon={<BookText className="h-4 w-4" aria-hidden="true" />}
            />
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm font-medium text-[#A9B6D3] transition-colors hover:bg-[#0B1220] hover:text-[#EAF0FF]"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            退出登录
          </button>
        </aside>
        <main className="rounded-2xl border border-white/10 bg-[#111B2E] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
