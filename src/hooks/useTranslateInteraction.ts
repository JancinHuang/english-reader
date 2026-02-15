"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Article } from "@/lib/articleTypes";
import type { TranslateProvider } from "@/lib/translateProviders";

import type { TranslatePopoverState } from "@/components/translation/TranslatePopover";
import { getWordAtPoint, normalizeWord } from "@/utils/translateDom";
import type { TranslateSettings } from "@/utils/translateSettings";
import { readTranslateSettings, writeTranslateSettings } from "@/utils/translateSettings";

export function useTranslateInteraction(params: { article: Article }) {
  const { article } = params;
  const [settings, setSettings] = useState<TranslateSettings>(() => ({ enabled: true, provider: "auto" }));
  const settingsRef = useRef<TranslateSettings>(settings);
  const [popover, setPopover] = useState<TranslatePopoverState>({
    open: false,
    anchor: { x: 0, y: 0 },
    text: "",
    loading: false,
    error: null,
    result: null,
  });

  const vocabIndex = useMemo(() => {
    const map = new Map<string, { cn: string; phonetic: string }>();
    for (const v of article.vocab) {
      map.set(normalizeWord(v.word), { cn: v.cn, phonetic: v.phonetic });
    }
    return map;
  }, [article.vocab]);

  useEffect(() => {
    const s = readTranslateSettings();
    setSettings(s);
    settingsRef.current = s;
  }, []);

  function updateSettings(next: TranslateSettings) {
    setSettings(next);
    settingsRef.current = next;
    writeTranslateSettings(next);
  }

  const longPressTimer = useRef<number | null>(null);
  const startPoint = useRef<{ x: number; y: number } | null>(null);
  const clientCache = useRef(new Map<string, { at: number; translatedText: string; provider: string }>());
  const isLongPressing = useRef(false);

  function closePopover() {
    setPopover((p) => ({ ...p, open: false, loading: false }));
  }

  async function translateViaApi(text: string) {
    const provider = settingsRef.current.provider;
    const cacheKey = `${provider}|${text.trim()}`;
    const cached = clientCache.current.get(cacheKey);
    if (cached && Date.now() - cached.at < 10 * 60 * 1000) {
      return { translatedText: cached.translatedText, provider: cached.provider };
    }
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, from: "en", to: "zh-CN", provider }),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as
        | { message?: string }
        | null;
      throw new Error(data?.message ?? "翻译失败");
    }
    const data = (await res.json()) as unknown;
    const r = data as Record<string, unknown>;
    const result = {
      translatedText: String(r.translatedText ?? ""),
      provider: String(r.provider ?? "api"),
    };
    clientCache.current.set(cacheKey, { at: Date.now(), ...result });
    return result;
  }

  async function openWord(word: string, anchor: { x: number; y: number }) {
    const normalized = normalizeWord(word);
    if (!normalized) {
      return;
    }

    const vocabHit = vocabIndex.get(normalized);
    if (vocabHit) {
      setPopover({
        open: true,
        anchor,
        text: normalized,
        loading: false,
        error: null,
        result: {
          source: "vocab",
          translatedText: vocabHit.cn,
          phonetic: vocabHit.phonetic,
        },
      });
      return;
    }

    setPopover({
      open: true,
      anchor,
      text: normalized,
      loading: true,
      error: null,
      result: null,
    });

    try {
      const r = await translateViaApi(normalized);
      setPopover((p) => ({
        ...p,
        loading: false,
        error: null,
        result: {
          source: "api",
          translatedText: r.translatedText,
          provider: r.provider,
        },
      }));
    } catch (e: unknown) {
      setPopover((p) => ({
        ...p,
        loading: false,
        error: e instanceof Error ? e.message : "翻译失败",
        result: null,
      }));
    }
  }

  function clearTimers() {
    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }

  function onPointerStart(x: number, y: number) {
    clearTimers();
    startPoint.current = { x, y };
    isLongPressing.current = false;
    longPressTimer.current = window.setTimeout(() => {
      const s = settingsRef.current;
      if (!s.enabled) {
        return;
      }
      const found = getWordAtPoint(x, y);
      if (!found.word) {
        return;
      }
      isLongPressing.current = true;
      const rect = found.rect;
      const anchor = rect
        ? { x: rect.left + rect.width / 2, y: rect.bottom }
        : { x, y };
      void openWord(found.word, anchor);
    }, 500);
  }

  function onPointerMove(x: number, y: number) {
    const start = startPoint.current;
    if (!start) {
      return;
    }
    const dx = x - start.x;
    const dy = y - start.y;
    if (Math.hypot(dx, dy) > 12) {
      if (longPressTimer.current) {
        window.clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    }
  }

  function onPointerEnd() {
    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    startPoint.current = null;
  }

  useEffect(() => {
    const el = document.documentElement;

    function handleTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      onPointerStart(t.clientX, t.clientY);
    }

    function handleTouchMove(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      onPointerMove(t.clientX, t.clientY);
    }

    function handleTouchEnd(e: TouchEvent) {
      if (isLongPressing.current) {
        e.preventDefault();
      }
      onPointerEnd();
    }

    function handleMouseDown(e: MouseEvent) {
      if (e.button !== 0) return;
      onPointerStart(e.clientX, e.clientY);
    }

    function handleMouseMove(e: MouseEvent) {
      onPointerMove(e.clientX, e.clientY);
    }

    function handleMouseUp() {
      onPointerEnd();
    }

    function handleContextMenu(e: MouseEvent) {
      if (isLongPressing.current) {
        e.preventDefault();
      }
    }

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: false });
    el.addEventListener("touchcancel", onPointerEnd, { passive: true });
    el.addEventListener("mousedown", handleMouseDown, { passive: true });
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseup", handleMouseUp, { passive: true });
    el.addEventListener("contextmenu", handleContextMenu);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchcancel", onPointerEnd);
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("contextmenu", handleContextMenu);
      clearTimers();
    };
  }, []);

  const handlers = {
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopover();
      }
    },
  };

  return {
    settings,
    setEnabled: (enabled: boolean) => updateSettings({ ...settingsRef.current, enabled }),
    setProvider: (provider: TranslateProvider) => updateSettings({ ...settingsRef.current, provider }),
    popover,
    closePopover,
    handlers,
  };
}
