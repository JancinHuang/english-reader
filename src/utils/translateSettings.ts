import type { TranslateProvider } from "@/lib/translateProviders";

export type TranslateSettings = {
  enabled: boolean;
  provider: TranslateProvider;
};

const LS_ENABLED = "eir.translate.enabled";
const LS_PROVIDER = "eir.translate.provider";

export function readTranslateSettings(): TranslateSettings {
  if (typeof window === "undefined") {
    return { enabled: true, provider: "auto" };
  }
  const enabled = window.localStorage.getItem(LS_ENABLED);
  const provider =
    (window.localStorage.getItem(LS_PROVIDER) as TranslateProvider | null) ??
    "auto";

  return {
    enabled: enabled === null ? true : enabled === "true",
    provider:
      provider === "auto" || provider === "baidu" || provider === "mymemory"
        ? provider
        : "auto",
  };
}

export function writeTranslateSettings(next: TranslateSettings) {
  window.localStorage.setItem(LS_ENABLED, String(next.enabled));
  window.localStorage.setItem(LS_PROVIDER, next.provider);
}
