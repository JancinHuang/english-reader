import ReaderClient from "./ReaderClient";

import { notFound } from "next/navigation";

import type { Article } from "@/lib/articleTypes";
import { getRequestBaseUrl } from "@/lib/requestBaseUrl";

export default async function Page({
  params,
}: {
  params: { articleId: string } | Promise<{ articleId: string }>;
}) {
  const { articleId } = await Promise.resolve(params);
  const baseUrl = (await getRequestBaseUrl()) ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/articles/${articleId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const article = (await res.json()) as Article;
  return <ReaderClient article={article} />;
}
