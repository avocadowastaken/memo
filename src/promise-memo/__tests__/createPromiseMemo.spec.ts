import { MemoCache } from '../../memo-cache/MemoCache';
import { createPromiseMemo } from '../createPromiseMemo';

function createCounter<TKey>(): (key: TKey) => Promise<number> {
  const cache = new Map<TKey, number>();

  return (key: TKey): Promise<number> => {
    const count = (cache.get(key) || 0) + 1;

    cache.set(key, count);

    return Promise.resolve(count);
  };
}

it("validates 'fn'", () => {
  expect(() =>
    createPromiseMemo(null as any),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Memo: 'fn' expected to be a 'function'."`,
  );
});

it('exposes cache', () => {
  const memo = createPromiseMemo(createCounter());

  expect(memo.cache).toBeInstanceOf(MemoCache);
});

it("evaluates 'fn' and wraps result with Promise", async () => {
  const fn = jest.fn(createCounter());
  const memo = createPromiseMemo(fn);

  expect(fn).toHaveBeenCalledTimes(0);

  for (let i = 0; i < 5; i++) {
    expect(memo(1)).toBeInstanceOf(Promise);
    await expect(memo(1)).resolves.toBe(1);
  }

  expect(fn).toHaveBeenCalledTimes(1);
});

it('removes rejected values', async () => {
  const fn = jest.fn(key =>
    key < 3 ? Promise.resolve(key) : Promise.reject(new Error('Rejected.')),
  );

  const memo = createPromiseMemo<number, number>(fn);

  expect(fn).toHaveBeenCalledTimes(0);

  for (let i = 0; i < 5; i++) {
    if (i < 3) {
      await expect(memo(i)).resolves.toBe(i);
    } else {
      await expect(memo(i)).rejects.toEqual(new Error('Rejected.'));
    }
  }
});
