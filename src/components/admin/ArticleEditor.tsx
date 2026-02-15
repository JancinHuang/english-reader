"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, FileJson2, Save, Trash2 } from "lucide-react";

type Status = "draft" | "published";

type ArticlePayload = {
  id: string;
  title: string;
  tags: string[];
  status?: Status;
  vocab: unknown[];
  content: unknown[];
  quiz: unknown[];
};

function tryParseJson(text: string):
  | { ok: true; value: unknown }
  | { ok: false; error: string } {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (e: unknown) {
    return { ok: false, error: e instanceof Error ? e.message : "JSON 解析失败" };
  }
}

function formatJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function ArticleEditor({ articleId }: { articleId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(Boolean(articleId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jsonText, setJsonText] = useState(() =>
    formatJson({
      id: "",
      title: "",
      tags: [],
      status: "draft",
      vocab: [],
      content: [],
      quiz: [],
    } satisfies ArticlePayload),
  );

  const parsed = useMemo(() => tryParseJson(jsonText), [jsonText]);

  useEffect(() => {
    if (!articleId) {
      return;
    }
    setError(null);
    setLoading(true);
    void (async () => {
      const res = await fetch(`/api/admin/articles/${encodeURIComponent(articleId)}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { message?: string }
          | null;
        setError(data?.message ?? "加载失败");
        setLoading(false);
        return;
      }
      const data = (await res.json()) as unknown;
      setJsonText(formatJson(data));
      setLoading(false);
    })();
  }, [articleId]);

  function validate(value: unknown): string[] {
    const errors: string[] = [];
    if (!value || typeof value !== "object") {
      return ["文章必须是对象"];
    }
    const v = value as Record<string, unknown>;
    if (typeof v.id !== "string" || v.id.trim().length === 0) {
      errors.push("id 必须是非空字符串");
    }
    if (typeof v.title !== "string" || v.title.trim().length === 0) {
      errors.push("title 必须是非空字符串");
    }
    if (!Array.isArray(v.tags) || !v.tags.every((t) => typeof t === "string")) {
      errors.push("tags 必须是字符串数组");
    }
    if (v.status !== undefined && v.status !== "draft" && v.status !== "published") {
      errors.push("status 必须是 draft 或 published");
    }
    if (!Array.isArray(v.vocab)) {
      errors.push("vocab 必须是数组");
    }
    if (!Array.isArray(v.content)) {
      errors.push("content 必须是数组");
    }
    if (!Array.isArray(v.quiz)) {
      errors.push("quiz 必须是数组");
    }
    return errors;
  }

  async function save(nextStatus?: Status) {
    setError(null);
    const p = parsed;
    if (!p.ok) {
      setError(p.error);
      return;
    }
    const errors = validate(p.value);
    if (errors.length > 0) {
      setError(errors.join("；"));
      return;
    }

    const base = p.value as Record<string, unknown>;
    const payload: Record<string, unknown> = {
      ...base,
      status: nextStatus ?? (base.status as Status | undefined) ?? "draft",
    };

    setSaving(true);
    try {
      const url = articleId
        ? `/api/admin/articles/${encodeURIComponent(articleId)}`
        : "/api/admin/articles";
      const method = articleId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { message?: string }
          | null;
        setError(data?.message ?? "保存失败");
        return;
      }

      router.replace("/admin/articles");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!articleId) return;
    const ok = window.confirm("确定删除这篇文章吗？此操作不可撤销。");
    if (!ok) return;
    const res = await fetch(`/api/admin/articles/${encodeURIComponent(articleId)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as
        | { message?: string }
        | null;
      setError(data?.message ?? "删除失败");
      return;
    }
    router.replace("/admin/articles");
    router.refresh();
  }

  function onFormat() {
    const p = parsed;
    if (!p.ok) {
      setError(p.error);
      return;
    }
    setError(null);
    setJsonText(formatJson(p.value));
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/admin/articles"
            className="inline-flex items-center gap-2 text-sm text-[#A9B6D3] hover:text-[#EAF0FF]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            返回列表
          </Link>
          <h1 className="mt-2 text-2xl font-semibold">
            {articleId ? "编辑文章" : "新建文章"}
          </h1>
          <div className="mt-2 text-sm text-[#A9B6D3]">
            直接编辑与保存文章 JSON（与前台阅读/测验结构兼容）。
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {articleId ? (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm font-medium text-[#EAF0FF] hover:bg-[#0B1220]"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              删除
            </button>
          ) : null}
          <button
            type="button"
            onClick={onFormat}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm font-medium text-[#EAF0FF] hover:bg-[#0B1220]"
          >
            <FileJson2 className="h-4 w-4" aria-hidden="true" />
            格式化
          </button>
          <button
            type="button"
            disabled={saving || loading}
            onClick={() => void save("draft")}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm font-medium text-[#EAF0FF] hover:bg-[#0B1220] disabled:opacity-50"
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            保存草稿
          </button>
          <button
            type="button"
            disabled={saving || loading}
            onClick={() => void save("published")}
            className="inline-flex items-center gap-2 rounded-xl bg-[#3DDC97] px-3 py-2 text-sm font-semibold text-[#0B1220] hover:bg-[#34c687] disabled:opacity-50"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            保存并发布
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-[#FF5B6E]/30 bg-[#FF5B6E]/10 px-4 py-3 text-sm text-[#EAF0FF]">
          {error}
        </div>
      ) : null}

      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
        {loading ? (
          <div className="px-4 py-6 text-sm text-[#A9B6D3]">加载中…</div>
        ) : (
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            spellCheck={false}
            className="h-[520px] w-full resize-none bg-[#0B1220] px-4 py-4 font-mono text-xs leading-5 text-[#EAF0FF] outline-none"
          />
        )}
      </div>

      <div className="mt-3 text-xs text-[#A9B6D3]">
        {parsed.ok ? "JSON 解析成功" : `JSON 错误：${parsed.error}`}
      </div>
    </div>
  );
}
