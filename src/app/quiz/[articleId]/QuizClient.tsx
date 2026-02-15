"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";

import type { Article } from "@/lib/articleTypes";

import { Container } from "@/components/Container";
import { QuizQuestionCard } from "@/components/QuizQuestionCard";

export default function QuizClient({
  article,
}: {
  article: Article;
}) {
  const initialAnswers = useMemo(() => {
    const entries = article.quiz.map((q) => [q.id, null] as const);
    return Object.fromEntries(entries) as Record<number, string | null>;
  }, [article.quiz]);

  const [answers, setAnswers] = useState<Record<number, string | null>>(
    initialAnswers,
  );

  const answeredCount = article.quiz.reduce(
    (acc, q) => (answers[q.id] ? acc + 1 : acc),
    0,
  );

  const correctCount = article.quiz.reduce(
    (acc, q) => (answers[q.id] === q.correctId ? acc + 1 : acc),
    0,
  );

  const finished = answeredCount === article.quiz.length;

  function reset() {
    setAnswers(initialAnswers);
  }

  return (
    <div className="min-h-dvh bg-white">
      <header className="border-b border-zinc-200 bg-white">
        <Container className="py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <Link
                href={`/read/${article.id}`}
                className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                返回阅读
              </Link>
              <h1 className="mt-3 text-2xl font-semibold leading-tight text-zinc-950 sm:text-3xl">
                测验
              </h1>
              <div className="mt-1 text-sm text-zinc-600">{article.title}</div>
              <div className="mt-3 text-xs text-zinc-500">
                已作答 {answeredCount}/{article.quiz.length}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                重做
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-zinc-950 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
              >
                回首页
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <main className="bg-white">
        <Container className="py-10">
          <div className="grid gap-4">
            {article.quiz.map((q) => (
              <QuizQuestionCard
                key={q.id}
                data={q}
                selectedOptionId={answers[q.id]}
                onSelect={(optionId) =>
                  setAnswers((prev) =>
                    prev[q.id] ? prev : { ...prev, [q.id]: optionId },
                  )
                }
              />
            ))}
          </div>

          <section className="mt-8 rounded-2xl border border-zinc-200 bg-white px-5 py-5 shadow-sm">
            <div className="text-xs font-medium text-zinc-500">结果</div>
            <div className="mt-2 text-sm text-zinc-800">
              得分：{correctCount}/{article.quiz.length}
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/read/${article.id}`}
                className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50"
              >
                回到阅读复盘
              </Link>
              <button
                type="button"
                onClick={reset}
                className="inline-flex w-full items-center justify-center rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
              >
                {finished ? "再做一遍" : "清空作答"}
              </button>
            </div>
          </section>
        </Container>
      </main>
    </div>
  );
}
