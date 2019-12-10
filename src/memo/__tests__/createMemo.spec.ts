import { MemoCache } from '../../memo-cache/MemoCache';
import { createMemo } from '../createMemo';

function createCounter<TKey>(): (key: TKey) => number {
  const cache = new Map<TKey, number>();

  return (key: TKey): number => {
    const count = (cache.get(key) || 0) + 1;

    cache.set(key, count);

    return count;
  };
}

it("validates 'fn'", () => {
  expect(() => createMemo(null as any)).toThrowErrorMatchingInlineSnapshot(
    `"Memo: 'fn' expected to be a 'function'."`,
  );
});

it('exposes cache', () => {
  const memo = createMemo(createCounter());

  expect(memo.cache).toBeInstanceOf(MemoCache);
});

it("evaluates 'fn'", () => {
  const fn = jest.fn(createCounter());
  const memo = createMemo(fn);

  expect(fn).toHaveBeenCalledTimes(0);

  expect(memo(1)).toBe(1);
  expect(fn).toHaveBeenCalledTimes(1);

  expect(memo(1)).toBe(1);
  expect(fn).toHaveBeenCalledTimes(1);
});
