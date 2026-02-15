"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type ParagraphBlockData = {
  id: number;
  en: string;
  cn: string;
};

export function ParagraphBlock({
  data,
  open,
  onToggle,
}: {
  data: ParagraphBlockData;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white px-5 py-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="text-xs font-medium text-zinc-500">段落 {data.id}</div>
      </div>

      <p className="mt-3 font-serif text-lg leading-8 text-zinc-950 no-select">{data.en}</p>

      <div className="mt-4">
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50"
          aria-expanded={open}
          aria-controls={`translation-${data.id}`}
        >
          <span>{open ? "收起译文" : "显示译文"}</span>
          <ChevronDown
            className={
              "h-4 w-4 text-zinc-500 transition-transform " +
              (open ? "rotate-180" : "rotate-0")
            }
            aria-hidden="true"
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={`translation-${data.id}`}
            key="translation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-xl bg-zinc-50 px-4 py-3">
              <div className="text-xs font-medium text-zinc-500">中文译文</div>
              <p className="mt-2 font-sans text-[15px] leading-7 text-zinc-600">
                {data.cn}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

