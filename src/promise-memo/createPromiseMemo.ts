import { assertFn } from "../internal/assertFn";
import { MemoCacheOptions } from "../memo-cache/MemoCache";
import { MemoFn, createMemo } from "../memo/createMemo";

export function createPromiseMemo<TKey, TValue>(
  fn: (key: TKey) => Promise<TValue>,
  options?: MemoCacheOptions<TKey>,
): MemoFn<TKey, Promise<TValue>> {
  assertFn(fn);

  const memo = createMemo(
    key =>
      Promise.resolve(fn(key)).catch(error => {
        memo.cache.clear(key);

        return Promise.reject(error);
      }),
    options,
  );

  return memo;
}
