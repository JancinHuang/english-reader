import type { Article, ArticleListItem } from "./articleTypes";

import { articles } from "../../data/articles";

export function listArticlesFromLocal(): ArticleListItem[] {
  return (articles as Article[]).map((a) => ({
    id: a.id,
    title: a.title,
    tags: a.tags,
    paragraphCount: a.content.length,
    quizCount: a.quiz.length,
  }));
}

export function getArticleByIdFromLocal(articleId: string): Article | null {
  const found = (articles as Article[]).find((a) => a.id === articleId);
  return found ?? null;
}
