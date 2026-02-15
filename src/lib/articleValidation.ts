import type { Article } from "./articleTypes";

export type ArticleWithStatus = Article & {
  status?: "draft" | "published";
};

type ValidationResult = {
  ok: boolean;
  errors: string[];
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

export function validateArticleInput(value: unknown): ValidationResult {
  const errors: string[] = [];
  if (!value || typeof value !== "object") {
    return { ok: false, errors: ["文章必须是对象"] };
  }

  const v = value as Record<string, unknown>;

  if (typeof v.id !== "string" || v.id.trim().length === 0) {
    errors.push("id 必须是非空字符串");
  }
  if (typeof v.title !== "string" || v.title.trim().length === 0) {
    errors.push("title 必须是非空字符串");
  }

  if (!isStringArray(v.tags)) {
    errors.push("tags 必须是字符串数组");
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

  if (v.status !== undefined && v.status !== "draft" && v.status !== "published") {
    errors.push("status 必须是 draft 或 published");
  }

  return { ok: errors.length === 0, errors };
}

export function coerceArticleWithStatus(value: unknown): ArticleWithStatus | null {
  const result = validateArticleInput(value);
  if (!result.ok) {
    return null;
  }
  return value as ArticleWithStatus;
}
