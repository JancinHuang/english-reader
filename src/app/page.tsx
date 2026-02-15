import Link from "next/link";
import { BookOpen, CircleHelp } from "lucide-react";

import type { ArticleListItem } from "@/lib/articleTypes";
import { getRequestBaseUrl } from "@/lib/requestBaseUrl";

import { Container } from "@/components/Container";

export default async function Home() {
  const baseUrl = (await getRequestBaseUrl()) ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/articles`, {
    cache: "no-store",
  });
  const articles = (await res.json()) as ArticleListItem[];

  return (
    <div className="min-h-dvh bg-white">
      <header className="border-b border-zinc-200 bg-white">
        <Container className="py-10">
          <div className="flex flex-col gap-3">
            <div className="text-xs font-medium tracking-wide text-zinc-500">
              English Intensive Reading
            </div>
            <h1 className="text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl">
              逐段精读 + 交互式译文 + 即时测验
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-600">
              读文章时尽量先理解英文；遇到卡点再展开译文。最后用选择题快速验证理解，并查看深度解析。
            </p>
          </div>
        </Container>
      </header>

      <main className="bg-white">
        <Container className="py-10">
          <div className="grid gap-4">
            {articles.map((article) => (
              <section
                key={article.id}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {article.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold text-zinc-950">
                    {article.title}
                  </h2>
                  <div className="text-sm text-zinc-600">
                    {article.paragraphCount} 段 · {article.quizCount} 题
                  </div>

                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/read/${article.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                    >
                      <BookOpen className="h-4 w-4" aria-hidden="true" />
                      开始阅读
                    </Link>
                    <Link
                      href={`/quiz/${article.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50"
                    >
                      <CircleHelp className="h-4 w-4" aria-hidden="true" />
                      直接测验
                    </Link>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}
