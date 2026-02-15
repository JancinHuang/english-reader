"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ChevronsDownUp, ChevronsUpDown, RotateCcw } from "lucide-react";

import type { Article } from "@/lib/articleTypes";

import { Container } from "@/components/Container";
import { ParagraphBlock } from "@/components/ParagraphBlock";
import { VocabCard } from "@/components/VocabCard";
import { QuizQuestionCard } from "@/components/QuizQuestionCard";
import { TranslatePopover } from "@/components/translation/TranslatePopover";
import { useTranslateInteraction } from "@/hooks/useTranslateInteraction";
import type { TranslateProvider } from "@/lib/translateProviders";

export default function ReaderClient({
  article,
}: {
  article: Article;
}) {
  const initialOpenById = useMemo(() => {
    const entries = article.content.map((p) => [p.id, false] as const);
    return Object.fromEntries(entries) as Record<number, boolean>;
  }, [article.content]);

  const [openById, setOpenById] = useState<Record<number, boolean>>(
    initialOpenById,
  );

  const initialAnswers = useMemo(() => {
    const entries = article.quiz.map((q) => [q.id, null] as const);
    return Object.fromEntries(entries) as Record<number, string | null>;
  }, [article.quiz]);

  const [answers, setAnswers] = useState<Record<number, string | null>>(
    initialAnswers,
  );

  const resolvedArticle = article;

  const t = useTranslateInteraction({ article: resolvedArticle });

  const anyOpen = Object.values(openById).some(Boolean);

  const answeredCount = article.quiz.reduce(
    (acc, q) => (answers[q.id] ? acc + 1 : acc),
    0,
  );

  const correctCount = article.quiz.reduce(
    (acc, q) => (answers[q.id] === q.correctId ? acc + 1 : acc),
    0,
  );

  const finished = answeredCount === article.quiz.length;

  function setAll(open: boolean) {
    const entries = resolvedArticle.content.map((p) => [p.id, open] as const);
    setOpenById(Object.fromEntries(entries) as Record<number, boolean>);
  }

  function resetQuiz() {
    setAnswers(initialAnswers);
  }

  return (
    <div className="min-h-dvh bg-white" {...t.handlers}>
      <header className="border-b border-zinc-200 bg-white">
        <Container className="py-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                返回
              </Link>
              <h1 className="mt-3 text-2xl font-semibold leading-tight text-zinc-950 sm:text-3xl">
                {resolvedArticle.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {resolvedArticle.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2">
                <label className="flex items-center gap-2 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    checked={t.settings.enabled}
                    onChange={(e) => t.setEnabled(e.target.checked)}
                    className="h-4 w-4 rounded border-zinc-300 text-zinc-950"
                  />
                  翻译
                </label>
                <select
                  value={t.settings.provider}
                  onChange={(e) => t.setProvider(e.target.value as TranslateProvider)}
                  className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-700"
                  aria-label="翻译源"
                >
                  <option value="auto">自动</option>
                  <option value="baidu">百度</option>
                  <option value="mymemory">免费</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => setAll(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50"
              >
                <ChevronsUpDown className="h-4 w-4" aria-hidden="true" />
                全部展开
              </button>
              <button
                type="button"
                onClick={() => setAll(false)}
                disabled={!anyOpen}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronsDownUp className="h-4 w-4" aria-hidden="true" />
                全部收起
              </button>

            </div>
          </div>
        </Container>
      </header>

      <main className="bg-white">
        <Container className="py-10">
          <section>
            <h2 className="text-sm font-semibold tracking-wide text-zinc-900">
              核心词汇
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {resolvedArticle.vocab.map((v) => (
                <VocabCard key={v.word} item={v} />
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-sm font-semibold tracking-wide text-zinc-900">
              正文
            </h2>
            <div className="mt-4 grid gap-4">
              {resolvedArticle.content.map((p) => (
                <ParagraphBlock
                  key={p.id}
                  data={p}
                  open={Boolean(openById[p.id])}
                  onToggle={() =>
                    setOpenById((prev) => ({ ...prev, [p.id]: !prev[p.id] }))
                  }
                />
              ))}
            </div>
          </section>

          <div className="mt-16 mb-8 border-t border-zinc-200"></div>

          <section>
            <h2 className="text-lg font-semibold tracking-wide text-zinc-900">
              测验
            </h2>
            <div className="mt-2 text-sm text-zinc-600">
              已作答 {answeredCount}/{resolvedArticle.quiz.length}
            </div>
            <div className="mt-4 grid gap-4">
              {resolvedArticle.quiz.map((q) => (
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
                得分：{correctCount}/{resolvedArticle.quiz.length}
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  {finished ? "再做一遍" : "清空作答"}
                </button>
              </div>
            </section>
          </section>
        </Container>
      </main>

      <TranslatePopover state={t.popover} onClose={t.closePopover} />
    </div>
  );
}
