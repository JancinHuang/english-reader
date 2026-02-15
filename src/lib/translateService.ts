import type { TranslateProvider, TranslateResult } from "./translateProviders";
import { translateText } from "./translateProviders";
import { TranslateCache } from "./translateCache";

declare global {
  var __translateCache: TranslateCache<TranslateResult> | undefined;
}

function getCache() {
  if (!globalThis.__translateCache) {
    globalThis.__translateCache = new TranslateCache<TranslateResult>(10 * 60 * 1000);
  }
  return globalThis.__translateCache;
}

export async function translateWithCache(params: {
  text: string;
  from: string;
  to: string;
  provider: TranslateProvider;
}): Promise<{ cached: boolean; result: TranslateResult }> {
  const key = `${params.provider}|${params.from}|${params.to}|${params.text.trim()}`;
  const cache = getCache();
  const hit = cache.get(key);
  if (hit) {
    return { cached: true, result: hit };
  }
  const result = await translateText(params.text, params.from, params.to, params.provider);
  cache.set(key, result);
  return { cached: false, result };
}
