import crypto from "crypto";

export type TranslateProvider = "auto" | "baidu" | "mymemory";

export type TranslateResult = {
  provider: Exclude<TranslateProvider, "auto">;
  from: string;
  to: string;
  text: string;
  translatedText: string;
};

function hasBaiduConfig() {
  return Boolean(process.env.BAIDU_TRANSLATE_APP_ID && process.env.BAIDU_TRANSLATE_KEY);
}

async function translateWithMyMemory(text: string, from: string, to: string): Promise<TranslateResult> {
  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", text);
  url.searchParams.set("langpair", `${from}|${to}`);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`MyMemory error: ${res.status}`);
  }
  const data = (await res.json()) as unknown;
  const r = data as Record<string, unknown>;
  const responseData = (r.responseData ?? null) as Record<string, unknown> | null;
  const translatedText = String(responseData?.translatedText ?? "").trim();
  if (!translatedText) {
    throw new Error("MyMemory empty response");
  }
  return {
    provider: "mymemory",
    from,
    to,
    text,
    translatedText,
  };
}

async function translateWithBaidu(text: string, from: string, to: string): Promise<TranslateResult> {
  const appid = process.env.BAIDU_TRANSLATE_APP_ID;
  const key = process.env.BAIDU_TRANSLATE_KEY;

  if (!appid || !key) {
    throw new Error("Baidu translate not configured");
  }

  // 1. 语言代码映射：百度要求中文必须用 'zh'
  const mapLang = (l: string) => {
    const lang = l.toLowerCase();
    if (lang === "zh-cn" || lang === "cn" || lang === "zh-tw" || lang === "zh-hk") return "zh";
    if (lang === "en-us" || lang === "en-gb") return "en";
    return l;
  };

  const baiduFrom = mapLang(from);
  const baiduTo = mapLang(to);

  // 2. 预处理文本，确保签名和请求内容完全一致
  const q = text.trim();
  const salt = String(Date.now());

  // 3. 计算签名：appid + q + salt + key
  const sign = crypto
    .createHash("md5")
    .update(`${appid}${q}${salt}${key}`)
    .digest("hex");

  const url = new URL("https://fanyi-api.baidu.com/api/trans/vip/translate");
  url.searchParams.set("q", q);
  url.searchParams.set("from", baiduFrom);
  url.searchParams.set("to", baiduTo);
  url.searchParams.set("appid", appid);
  url.searchParams.set("salt", salt);
  url.searchParams.set("sign", sign);

  const res = await fetch(url, { cache: "no-store" });
  
  if (!res.ok) {
    throw new Error(`Baidu network error: ${res.status}`);
  }

  const data = (await res.json().catch(() => null)) as any;

  // 4. 错误处理
  if (data?.error_code) {
    // 如果是 54003 代表频率过快，标准版账号 QPS=1
    throw new Error(`Baidu error_code: ${data.error_code}, msg: ${data.error_msg}`);
  }

  const transResult = data?.trans_result;
  const translatedText = Array.isArray(transResult) && transResult[0] 
    ? String(transResult[0].dst).trim() 
    : "";

  if (!translatedText) {
    throw new Error("Baidu empty response");
  }

  return {
    provider: "baidu",
    from,
    to,
    text: q,
    translatedText,
  };
}

export async function translateText(
  text: string,
  from: string,
  to: string,
  provider: TranslateProvider,
): Promise<TranslateResult> {
  const cleaned = text.trim();
  if (!cleaned) {
    throw new Error("Empty text");
  }

  if (provider === "baidu") {
    return translateWithBaidu(cleaned, from, to);
  }

  if (provider === "mymemory") {
    return translateWithMyMemory(cleaned, from, to);
  }

  if (hasBaiduConfig()) {
    try {
      return await translateWithBaidu(cleaned, from, to);
    } catch {
      return translateWithMyMemory(cleaned, from, to);
    }
  }

  return translateWithMyMemory(cleaned, from, to);
}
