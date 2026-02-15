import type { Article, ArticleListItem } from "./articleTypes";

import { getArticleByIdFromDb, listArticlesFromDb } from "./articlesDb";
import { getArticleByIdFromLocal, listArticlesFromLocal } from "./articlesLocal";

export async function listArticles(): Promise<ArticleListItem[]> {
  try {
    const db = await listArticlesFromDb();
    if (db && db.length > 0) {
      return db;
    }
  } catch {
    // ignore
  }

  return listArticlesFromLocal();
}

export async function getArticleById(articleId: string): Promise<Article | null> {
  try {
    const db = await getArticleByIdFromDb(articleId);
    if (db) {
      return db;
    }
  } catch {
    // ignore
  }

  return getArticleByIdFromLocal(articleId);
}
