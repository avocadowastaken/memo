import { MemoCache, MemoCacheOptions } from "./MemoCache";

export interface MemoFn<TKey, TValue> {
  (key: TKey): TValue;

  readonly cache: MemoCache<TKey, TValue>;
}

export function createMemo<TKey, TValue>(
  fn: (key: TKey) => TValue,
  options?: MemoCacheOptions<TKey>
): MemoFn<TKey, TValue> {
  const cache = new MemoCache<TKey, TValue>(options);

  memo.cache = cache;

  return memo;
  function memo(key: TKey): TValue {
    let value = cache.get(key);

    if (value === undefined) {
      value = fn(key);
      cache.prime(key, value);
    }

    return value;
  }
}
