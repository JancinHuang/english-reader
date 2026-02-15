export type TranslateCacheValue<T> = {
  expiresAtMs: number;
  value: T;
};

export class TranslateCache<T> {
  private map = new Map<string, TranslateCacheValue<T>>();

  constructor(private ttlMs: number) {}

  get(key: string): T | null {
    const hit = this.map.get(key);
    if (!hit) {
      return null;
    }
    if (Date.now() > hit.expiresAtMs) {
      this.map.delete(key);
      return null;
    }
    return hit.value;
  }

  set(key: string, value: T) {
    this.map.set(key, { value, expiresAtMs: Date.now() + this.ttlMs });
  }
}
