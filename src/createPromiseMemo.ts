import { assertFn } from './internal/assertFn';
import { MemoCacheOptions } from './MemoCache';
import { PromiseMemoCache } from './PromiseMemoCache';

export interface PromiseMemoFn<TKey, TValue> {
  (key: TKey): Promise<TValue>;

  readonly cache: PromiseMemoCache<TKey, TValue>;
}

export function createPromiseMemo<TKey, TValue>(
  fn: (key: TKey) => Promise<TValue>,
  options?: MemoCacheOptions<TKey>,
): PromiseMemoFn<TKey, TValue> {
  assertFn(fn);

  const cache = new PromiseMemoCache<TKey, TValue>(options);

  memo.cache = cache;

  return memo;

  function memo(key: TKey): Promise<TValue> {
    let value = cache.get(key);

    if (value === undefined) {
      cache.prime(key, fn(key));
      value = cache.get(key);
    }

    return value as Promise<TValue>;
  }
}
