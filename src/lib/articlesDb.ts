import type { Article, ArticleListItem } from "./articleTypes";

import { createSupabaseServerClient } from "./supabase";

type ArticleRow = {
  id: string;
  title: string;
  tags: string[];
  vocab: unknown;
  content: unknown;
  quiz: unknown;
};

function safeArrayLength(value: unknown) {
  return Array.isArray(value) ? value.length : 0;
}

export async function listArticlesFromDb(): Promise<ArticleListItem[] | null> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("articles")
    .select("id,title,tags,content,quiz")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    return null;
  }

  return (data as Array<Pick<ArticleRow, "id" | "title" | "tags" | "content" | "quiz">>).map(
    (row) => ({
      id: row.id,
      title: row.title,
      tags: row.tags ?? [],
      paragraphCount: safeArrayLength(row.content),
      quizCount: safeArrayLength(row.quiz),
    }),
  );
}

export async function getArticleByIdFromDb(
  articleId: string,
): Promise<Article | null> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("articles")
    .select("id,title,tags,vocab,content,quiz")
    .eq("id", articleId)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const row = data as ArticleRow;
  return {
    id: row.id,
    title: row.title,
    tags: row.tags ?? [],
    vocab: Array.isArray(row.vocab) ? (row.vocab as Article["vocab"]) : [],
    content: Array.isArray(row.content) ? (row.content as Article["content"]) : [],
    quiz: Array.isArray(row.quiz) ? (row.quiz as Article["quiz"]) : [],
  };
}
