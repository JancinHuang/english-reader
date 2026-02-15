"use client";

import { X } from "lucide-react";

export type TranslatePopoverState = {
  open: boolean;
  anchor: { x: number; y: number };
  text: string;
  loading: boolean;
  error: string | null;
  result:
    | null
    | {
        source: "vocab" | "api";
        translatedText: string;
        phonetic?: string;
        provider?: string;
      };
};

const POPOVER_WIDTH = 360;
const POPOVER_MARGIN = 12;

export function TranslatePopover({
  state,
  onClose,
}: {
  state: TranslatePopoverState;
  onClose: () => void;
}) {
  if (!state.open) {
    return null;
  }

  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 375;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 667;

  const maxWidth = viewportWidth - POPOVER_MARGIN * 2;
  const actualWidth = Math.min(POPOVER_WIDTH, maxWidth);

  let left = state.anchor.x - actualWidth / 2;
  if (left < POPOVER_MARGIN) {
    left = POPOVER_MARGIN;
  } else if (left + actualWidth > viewportWidth - POPOVER_MARGIN) {
    left = viewportWidth - POPOVER_MARGIN - actualWidth;
  }

  const top = Math.min(state.anchor.y + POPOVER_MARGIN, viewportHeight - POPOVER_MARGIN - 150);

  return (
    <>
      <div
        className="fixed inset-0 z-[55] cursor-default"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed z-[60]"
        style={{ top, left, width: actualWidth }}
        role="dialog"
        aria-label="翻译"
      >
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-lg">
          <div className="flex items-start justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <div className="text-xs font-medium text-zinc-500">单词翻译</div>
              <div className="mt-1 truncate text-sm font-semibold text-zinc-950">
                {state.text}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition-colors hover:bg-zinc-50"
              aria-label="关闭"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="px-4 pb-4">
            {state.loading ? (
              <div className="rounded-xl bg-zinc-50 px-3 py-3 text-sm text-zinc-600">
                翻译中…
              </div>
            ) : state.error ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-3 text-sm text-rose-700">
                {state.error}
              </div>
            ) : state.result ? (
              <div className="rounded-xl bg-zinc-50 px-3 py-3">
                {state.result.phonetic ? (
                  <div className="text-xs text-zinc-500">/{state.result.phonetic}/</div>
                ) : null}
                <div className="mt-1 text-sm leading-6 text-zinc-800">
                  {state.result.translatedText}
                </div>
                <div className="mt-2 text-[11px] text-zinc-500">
                  来源：{state.result.source === "vocab" ? "词表" : state.result.provider ?? "API"}
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-zinc-50 px-3 py-3 text-sm text-zinc-600">
                暂无结果
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
