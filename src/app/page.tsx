import Link from "next/link";
import { BookOpen, CircleHelp } from "lucide-react";

import { listArticles } from "@/lib/articles";

import { Container } from "@/components/Container";

export default async function Home() {
  const articles = await listArticles();

  return (
    <div className="min-h-dvh bg-white">
      <header className="border-b border-zinc-200 bg-white">
        <Container className="py-10">
          <div className="flex flex-col gap-3">
            <div className="text-xs font-medium tracking-wide text-zinc-500">
              English Intensive Reading
            </div>
            <h1 className="text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl">
              英语阅读能力提升
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-600">
              逐段阅读英文原文，按需查看译文，完成后测验验证理解，长按单词即时翻译
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
