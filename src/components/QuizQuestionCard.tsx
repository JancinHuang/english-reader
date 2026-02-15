"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export type QuizOption = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: QuizOption[];
  correctId: string;
  analysis: string;
};

function optionClassName({
  selected,
  isCorrect,
  isWrong,
}: {
  selected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
}) {
  const base =
    "w-full rounded-xl border px-4 py-3 text-left text-sm leading-6 transition-colors";

  if (!selected) {
    return base + " border-zinc-200 bg-white hover:bg-zinc-50";
  }

  if (isCorrect) {
    return base + " border-emerald-300 bg-emerald-50 text-emerald-900";
  }

  if (isWrong) {
    return base + " border-rose-300 bg-rose-50 text-rose-900";
  }

  return base + " border-zinc-200 bg-white";
}

export function QuizQuestionCard({
  data,
  selectedOptionId,
  onSelect,
}: {
  data: QuizQuestion;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
}) {
  const answered = selectedOptionId != null;
  const isCorrect = answered && selectedOptionId === data.correctId;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white px-5 py-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="text-xs font-medium text-zinc-500">题目 {data.id}</div>
        {answered ? (
          <div
            className={
              "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium " +
              (isCorrect
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700")
            }
          >
            {isCorrect ? (
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            ) : (
              <XCircle className="h-4 w-4" aria-hidden="true" />
            )}
            <span>{isCorrect ? "正确" : "错误"}</span>
          </div>
        ) : null}
      </div>

      <h3 className="mt-3 text-base font-semibold text-zinc-950">
        {data.question}
      </h3>

      <div className="mt-4 grid gap-3">
        {data.options.map((opt) => {
          const selected = selectedOptionId === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              disabled={answered}
              onClick={() => onSelect(opt.id)}
              className={optionClassName({
                selected,
                isCorrect: selected && opt.id === data.correctId,
                isWrong: selected && opt.id !== data.correctId,
              })}
              aria-pressed={selected}
            >
              <span className="mr-2 font-semibold">{opt.id}.</span>
              <span className="align-middle">{opt.text}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {answered ? (
          <motion.div
            key="analysis"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <div className="text-xs font-medium text-zinc-500">深度解析</div>
              <p className="mt-2 text-sm leading-7 text-zinc-700">
                {data.analysis}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
