"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  FilePlus2,
  Pencil,
  Trash2,
} from "lucide-react";

type AdminArticleListItem = {
  id: string;
  title: string;
  tags: string[];
  status: "draft" | "published";
  updatedAt: string;
  paragraphCount: number;
  quizCount: number;
};

export default function Page() {
  const router = useRouter();
  const [items, setItems] = useState<AdminArticleListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "draft" | "published">("all");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/articles", { cache: "no-store" });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { message?: string }
          | null;
        setError(data?.message ?? "加载失败");
        return;
      }
      const data = (await res.json()) as AdminArticleListItem[];
      setItems(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    return items
      .filter((it) => (status === "all" ? true : it.status === status))
      .filter((it) => {
        const k = q.trim().toLowerCase();
        if (!k) return true;
        return (
          it.id.toLowerCase().includes(k) ||
          it.title.toLowerCase().includes(k) ||
          (it.tags ?? []).some((t) => t.toLowerCase().includes(k))
        );
      });
  }, [items, q, status]);

  async function onDelete(id: string) {
    const ok = window.confirm("确定删除这篇文章吗？此操作不可撤销。");
    if (!ok) return;

    const res = await fetch(`/api/admin/articles/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as
        | { message?: string }
        | null;
      window.alert(data?.message ?? "删除失败");
      return;
    }
    await load();
  }

  async function onTogglePublish(it: AdminArticleListItem) {
    const nextStatus = it.status === "published" ? "draft" : "published";
    const res = await fetch(
      `/api/admin/articles/${encodeURIComponent(it.id)}/publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      },
    );
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as
        | { message?: string }
        | null;
      window.alert(data?.message ?? "更新状态失败");
      return;
    }
    await load();
  }

  async function onImport(file: File) {
    const text = await file.text();
    const payload = JSON.parse(text);
    const res = await fetch("/api/admin/articles/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as
        | { message?: string }
        | null;
      window.alert(data?.message ?? "导入失败");
      return;
    }
    await load();
  }

  async function onExport() {
    const res = await fetch("/api/admin/articles/export", { cache: "no-store" });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as
        | { message?: string }
        | null;
      window.alert(data?.message ?? "导出失败");
      return;
    }
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "articles-dataset.json";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs font-medium tracking-wide text-[#A9B6D3]">
            Articles
          </div>
          <h1 className="mt-1 text-2xl font-semibold">文章管理</h1>
          <p className="mt-2 text-sm leading-6 text-[#A9B6D3]">
            新建、编辑、发布/撤回，以及 JSON 导入/导出。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#5B8CFF] px-3 py-2 text-sm font-semibold text-[#0B1220] transition-colors hover:bg-[#4a7bff]"
          >
            <FilePlus2 className="h-4 w-4" aria-hidden="true" />
            新建
          </Link>

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm font-medium text-[#EAF0FF] hover:bg-[#0B1220]">
            <ArrowUpFromLine className="h-4 w-4" aria-hidden="true" />
            导入 JSON
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  void onImport(f);
                }
                e.currentTarget.value = "";
              }}
            />
          </label>

          <button
            type="button"
            onClick={() => void onExport()}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm font-medium text-[#EAF0FF] hover:bg-[#0B1220]"
          >
            <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
            导出 JSON
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-[#0B1220] p-4 sm:grid-cols-[1fr_160px]">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-[#EAF0FF] outline-none focus:border-[#5B8CFF]/60"
          placeholder="搜索：标题 / ID / 标签"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "all" | "draft" | "published")}
          className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-3 py-2 text-sm text-[#EAF0FF] outline-none focus:border-[#5B8CFF]/60"
        >
          <option value="all" className="bg-[#0B1220]">全部状态</option>
          <option value="published" className="bg-[#0B1220]">已发布</option>
          <option value="draft" className="bg-[#0B1220]">草稿</option>
        </select>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-[#FF5B6E]/30 bg-[#FF5B6E]/10 px-4 py-3 text-sm text-[#EAF0FF]">
          {error}
          <button
            type="button"
            onClick={onLogout}
            className="ml-3 underline decoration-[#FF5B6E]/60 underline-offset-2"
          >
            重新登录
          </button>
        </div>
      ) : null}

      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
        <div className="grid grid-cols-[180px_1fr_140px_120px_120px_90px] gap-0 bg-[#0B1220] px-4 py-3 text-xs font-medium text-[#A9B6D3]">
          <div>ID</div>
          <div>标题</div>
          <div>标签</div>
          <div>段落/题目</div>
          <div>状态</div>
          <div className="text-right">操作</div>
        </div>
        <div className="divide-y divide-white/10">
          {loading ? (
            <div className="px-4 py-6 text-sm text-[#A9B6D3]">加载中…</div>
          ) : filtered.length === 0 ? (
            <div className="px-4 py-6 text-sm text-[#A9B6D3]">暂无文章</div>
          ) : (
            filtered.map((it) => (
              <div
                key={it.id}
                className="grid grid-cols-[180px_1fr_140px_120px_120px_90px] items-center gap-0 bg-[#111B2E] px-4 py-3"
              >
                <div className="truncate text-sm text-[#EAF0FF]">{it.id}</div>
                <div className="truncate text-sm text-[#EAF0FF]">{it.title}</div>
                <div className="truncate text-xs text-[#A9B6D3]">
                  {(it.tags ?? []).join(", ")}
                </div>
                <div className="text-xs text-[#A9B6D3]">
                  {it.paragraphCount} / {it.quizCount}
                </div>
                <button
                  type="button"
                  onClick={() => void onTogglePublish(it)}
                  className={
                    "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors " +
                    (it.status === "published"
                      ? "border-[#3DDC97]/30 bg-[#3DDC97]/10 text-[#EAF0FF] hover:bg-[#3DDC97]/15"
                      : "border-white/10 bg-white/5 text-[#A9B6D3] hover:bg-white/10")
                  }
                >
                  {it.status === "published" ? "已发布" : "草稿"}
                </button>
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/articles/${encodeURIComponent(it.id)}`}
                    className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-transparent p-2 text-[#EAF0FF] hover:bg-[#0B1220]"
                    aria-label="编辑"
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => void onDelete(it.id)}
                    className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-transparent p-2 text-[#EAF0FF] hover:bg-[#0B1220]"
                    aria-label="删除"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
