import { NextResponse } from "next/server";

import type { TranslateProvider } from "@/lib/translateProviders";
import { translateWithCache } from "@/lib/translateService";

export const runtime = "nodejs";

type Body = {
  text?: string;
  from?: string;
  to?: string;
  provider?: TranslateProvider;
};

function countWords(text: string) {
  const matches = text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g);
  return matches ? matches.length : 0;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Body | null;
  const text = body?.text?.trim() ?? "";
  const from = body?.from ?? "en";
  const to = body?.to ?? "zh-CN";
  const provider = body?.provider ?? "auto";

  if (!text) {
    return NextResponse.json({ message: "Missing text" }, { status: 400 });
  }
  if (text.length > 500) {
    return NextResponse.json({ message: "Text too long" }, { status: 400 });
  }
  if (countWords(text) === 0) {
    return NextResponse.json({ message: "No English words" }, { status: 400 });
  }

  try {
    const { cached, result } = await translateWithCache({ text, from, to, provider });
    return NextResponse.json({ cached, ...result });
  } catch (e: unknown) {
    return NextResponse.json(
      { message: e instanceof Error ? e.message : "Translate failed" },
      { status: 502 },
    );
  }
}
