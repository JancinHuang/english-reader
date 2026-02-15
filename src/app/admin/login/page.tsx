"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const next = "/admin/articles";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { message?: string }
          | null;
        setError(data?.message ?? "登录失败");
        return;
      }

      router.replace(next);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-4">
        <div className="text-xs font-medium tracking-wide text-[#A9B6D3]">
          Admin Login
        </div>
        <h1 className="mt-1 text-2xl font-semibold">管理员登录</h1>
        <p className="mt-2 text-sm leading-6 text-[#A9B6D3]">
          输入管理员口令进入文章管理后台。
        </p>
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-[#FF5B6E]/30 bg-[#FF5B6E]/10 px-4 py-3 text-sm text-[#EAF0FF]">
          {error}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="grid gap-3">
        <label className="grid gap-2">
          <div className="text-sm font-medium text-[#EAF0FF]">口令</div>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A9B6D3]"
              aria-hidden="true"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-10 py-2.5 text-sm text-[#EAF0FF] outline-none ring-0 placeholder:text-[#A9B6D3]/60 focus:border-[#5B8CFF]/60"
              placeholder="请输入管理员口令"
            />
          </div>
        </label>

        <button
          disabled={!password || loading}
          type="submit"
          className="mt-1 inline-flex items-center justify-center rounded-xl bg-[#5B8CFF] px-4 py-2.5 text-sm font-semibold text-[#0B1220] transition-colors hover:bg-[#4a7bff] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "登录中…" : "登录"}
        </button>
      </form>
    </div>
  );
}
