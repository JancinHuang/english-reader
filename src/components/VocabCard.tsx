export type VocabCardItem = {
  word: string;
  phonetic: string;
  cn: string;
};

export function VocabCard({ item }: { item: VocabCardItem }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="truncate text-base font-semibold text-zinc-950">
            {item.word}
          </span>
          <div className="mt-0.5 text-xs text-zinc-500">{item.phonetic}</div>
        </div>
      </div>
      <div className="mt-2 text-sm text-zinc-700">{item.cn}</div>
    </div>
  );
}
